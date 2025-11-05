import { NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/supabase-auth";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email } = body;

    // Get current user to verify authentication
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Validate input
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = await createServerComponentClient();

    // Update profile in Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        email: email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentUser._id)
      .select()
      .single();

    if (profileError) {
      console.error('Error updating profile:', profileError);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    // If email changed, update Supabase Auth email
    if (email !== currentUser.email) {
      const { error: authError } = await supabase.auth.updateUser({
        email: email,
      });

      if (authError) {
        console.error('Error updating auth email:', authError);
        // Don't fail the request if email update fails, but log it
      }
    }

    return NextResponse.json({
      user: {
        _id: profile.id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone || undefined,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

