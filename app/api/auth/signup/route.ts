import { NextResponse } from "next/server";
import { createUser, setUserSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, phone } =
      await request.json();

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await createUser({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Set session
    await setUserSession(user.id);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof Error && error.message === "User already exists") {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
