import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

const PAGE_SIZE = 8;

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "0", 10);

  if (isNaN(page) || page < 0) {
    return NextResponse.json(
      { error: "Invalid page parameter" },
      { status: 400 }
    );
  }

  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      data: data || [],
      nextPage: data && data.length === PAGE_SIZE ? page + 1 : null,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
