import { database } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: products, error } = await database.from("products").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await database.from("products").insert([body]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
