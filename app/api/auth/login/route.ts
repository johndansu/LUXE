import { NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { loginSchema, validateData } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = validateData(loginSchema, body);
    const { email, password } = validatedData;

    // Create Supabase client with cookie handling
    const supabase = await createServerComponentClient();

    // Sign in with Supabase Auth (this sets cookies automatically)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Failed to load user profile" },
        { status: 500 }
      );
    }

    const user = {
      _id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone || undefined,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    };

    // Supabase cookies are automatically set by createServerClient
    // Return the user data - cookies are handled by Supabase SSR
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
