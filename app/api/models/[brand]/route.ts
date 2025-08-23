import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export const revalidate = 3600;
const CACHE_DURATION = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: { brand: string } }
) {
  const brand = params.brand;

  if (!brand || typeof brand !== "string") {
    return NextResponse.json(
      { error: "Brand parameter is required" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("phone_models")
      .select("id, brand, model, price, available")
      .eq("brand", brand);

    if (error) {
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${
          CACHE_DURATION * 2
        }`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
