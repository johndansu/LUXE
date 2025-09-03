import { NextResponse } from "next/server";
import { getCurrentUser, getUserSession } from "@/lib/auth";
import {
  getCartItems,
  createOrder,
  addOrderItem,
  clearCart,
  getProductById,
} from "@/lib/db";
import { cookies } from "next/headers";

async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) {
    sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  return sessionId;
}

export async function POST(request: Request) {
  try {
    const { shippingAddress, billingAddress, paymentMethod } =
      await request.json();
    const sessionId = await getSessionId();
    const userId = await getUserSession();

    // Get cart items
    const cartItems = await getCartItems(sessionId);

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of cartItems) {
      if (item.product) {
        subtotal += item.product.price * item.quantity;
      }
    }

    const shippingCost = 0; // Free shipping for now
    const taxRate = 0.08; // 8% tax
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + shippingCost + taxAmount;

    // Create addresses if user is logged in
    let shippingAddressId, billingAddressId;

    if (userId && shippingAddress) {
      // In a real implementation, you'd save the addresses to the database
      // For now, we'll just use the provided addresses
      shippingAddressId = 1; // Placeholder
    }

    if (userId && billingAddress) {
      billingAddressId = 1; // Placeholder
    }

    // Create order
    const order = await createOrder({
      user_id: userId || undefined,
      session_id: sessionId,
      subtotal,
      shipping_cost: shippingCost,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      shipping_address_id: shippingAddressId?.toString(),
      billing_address_id: billingAddressId?.toString(),
    });

    // Add order items
    for (const item of cartItems) {
      if (item.product) {
        await addOrderItem({
          order_id: order._id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        });
      }
    }

    // Clear cart
    await clearCart(sessionId);

    return NextResponse.json({
      orderId: order._id,
      total: totalAmount,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
