import { NextResponse } from "next/server";
import {
  getCartItems,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "@/lib/db";
import {
  addToCartSchema,
  updateCartSchema,
  validateData,
} from "@/lib/validation";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

async function getSessionId(): Promise<string> {
  // First check if user is authenticated
  const user = await getCurrentUser();
  if (user) {
    console.log("getSessionId - Using user ID:", user._id);
    return user._id;
  }

  // If not authenticated, use anonymous session
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("session_id")?.value;

  console.log("getSessionId - Cookie session ID:", sessionId);

  if (!sessionId) {
    // Generate a random session ID
    sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    console.log("getSessionId - Generated new session ID:", sessionId);
  }

  return sessionId;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    const sessionId = await getSessionId();
    console.log(
      "GET /api/cart - User:",
      user ? user._id : "anonymous",
      "Session ID:",
      sessionId
    );

    const cartItems = await getCartItems(sessionId);
    console.log("GET /api/cart - Found cart items:", cartItems.length);

    const response = NextResponse.json(cartItems);

    // Only set session_id cookie for anonymous users
    if (!user) {
      response.cookies.set("session_id", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = validateData(addToCartSchema, body);
    const { productId, quantity = 1 } = validatedData;
    const user = await getCurrentUser();
    const sessionId = await getSessionId();

    console.log(
      "POST /api/cart - User:",
      user ? user._id : "anonymous",
      "Session ID:",
      sessionId,
      "Product ID:",
      productId,
      "Quantity:",
      quantity
    );

    await addToCart(sessionId, productId, quantity);

    const response = NextResponse.json({ success: true });

    // Only set session_id cookie for anonymous users
    if (!user) {
      response.cookies.set("session_id", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);

    if (
      error instanceof Error &&
      error.message.startsWith("Validation failed:")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log("PUT /api/cart - Request body:", body);

    const validatedData = validateData(updateCartSchema, body);
    const { productId, quantity } = validatedData;
    const sessionId = await getSessionId();

    console.log(
      "PUT /api/cart - Session ID:",
      sessionId,
      "Product ID:",
      productId,
      "Quantity:",
      quantity
    );

    try {
      await updateCartItemQuantity(sessionId, productId, quantity);
      return NextResponse.json({ success: true });
    } catch (dbError) {
      console.error("Database error in updateCartItemQuantity:", dbError);
      throw dbError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error("Error updating cart:", error);

    if (
      error instanceof Error &&
      error.message.startsWith("Validation failed:")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Returning error response:", errorMessage);

    return NextResponse.json(
      { error: `Failed to update cart: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const clearAll = searchParams.get("clearAll");
    const sessionId = await getSessionId();

    if (clearAll === "true") {
      await clearCart(sessionId);
    } else if (productId) {
      await removeFromCart(sessionId, productId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
