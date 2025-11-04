import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase-auth";
import { getOrderById, getOrderItems } from "@/lib/supabase-db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    const resolvedParams = await params;
    const orderId = resolvedParams.id;

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if user owns this order
    if (order.user_id !== user._id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const orderItems = await getOrderItems(orderId);

    return NextResponse.json({
      ...order,
      items: orderItems,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
