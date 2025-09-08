import { supabase } from "@/utils/supabase/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { brand: string } }
) {
  const { brand } = await params;

  try {
    const { data, error } = await supabase
      .from("phone_models")
      .select("id, brand, model, price, available")
      .eq("brand", brand);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
