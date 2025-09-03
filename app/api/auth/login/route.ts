import { NextResponse } from "next/server";
import { authenticateUser, setUserSession } from "@/lib/auth";
import { loginSchema, validateData } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = validateData(loginSchema, body);
    const { email, password } = validatedData;

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Set session
    await setUserSession(user._id);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Login error:", error);

    if (
      error instanceof Error &&
      error.message.startsWith("Validation failed:")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
