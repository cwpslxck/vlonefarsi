import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export const revalidate = 3600;
const CACHE_CONTROL = `public, s-maxage=3600, stale-while-revalidate=7200`;

export async function GET(
  _req: Request,
  { params }: { params: { brand: string } }
) {
  try {
    const { data, error } = await supabase
      .from("phone_models")
      .select("id, brand, model, price, available")
      .eq("brand", params.brand);

    if (error) {
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? [], {
      headers: { "Cache-Control": CACHE_CONTROL },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
