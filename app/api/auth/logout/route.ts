import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/supabase-auth";

export async function POST() {
  try {
    await clearUserSession();

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
