import { NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = await createServerComponentClient();
    
    // Test Supabase connection by checking if we can query
    const { error } = await supabase.from('products').select('id').limit(1);

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned, which is fine
      throw error;
    }

      return NextResponse.json({
        status: "healthy",
        database: "connected",
      provider: "supabase",
        timestamp: new Date().toISOString(),
      });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "error",
        provider: "supabase",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
