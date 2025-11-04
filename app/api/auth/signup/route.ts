import { NextResponse } from "next/server";
import { createUser } from "@/lib/supabase-auth";
import { signupSchema, validateData } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = validateData(signupSchema, body);
    const { email, password, firstName, lastName, phone } = validatedData;

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

    // Supabase handles session automatically via cookies
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }

      if (error.message.startsWith("Validation failed:")) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
