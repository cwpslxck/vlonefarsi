import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

const INITIAL_PAGE_SIZE = 6;
const SUBSEQUENT_PAGE_SIZE = 4;
const CACHE_DURATION = 3600;

export const revalidate = 3600;
const CACHE_CONTROL = `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${
  CACHE_DURATION * 2
}`;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = url.searchParams.get("limit");
  const page = url.searchParams.get("page");

  try {
    if (limit) {
      const limitNumber = parseInt(limit, 10);
      if (isNaN(limitNumber) || limitNumber <= 0) {
        return NextResponse.json(
          { error: "Invalid limit parameter" },
          { status: 400 }
        );
      }

      const { data, error } = await supabase.rpc("get_random_designs", {
        row_limit: limitNumber,
      });

      if (error) {
        return NextResponse.json(
          { error: "Database error", details: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { data: data ?? [], type: "limited", isRandom: true },
        { headers: { "Cache-Control": CACHE_CONTROL } }
      );
    }

    const pageParam = page ? parseInt(page, 10) : 0;
    if (isNaN(pageParam) || pageParam < 0) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }

    const pageSize = pageParam === 0 ? INITIAL_PAGE_SIZE : SUBSEQUENT_PAGE_SIZE;

    const { data, error } = await supabase
      .from("designs")
      .select("*")
      .range(pageParam, pageParam + pageSize - 1)
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data: data ?? [],
        nextPage:
          data && data.length === pageSize ? pageParam + pageSize : undefined,
        type: "paginated",
      },
      { headers: { "Cache-Control": CACHE_CONTROL } }
    );
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
