import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export const revalidate = 0;
const createErrorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const createSuccessResponse = (data?: any) =>
  NextResponse.json(data ?? { success: true });

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) return { error: createErrorResponse("Unauthorized", 401) };

  const { data, error } = await supabase.auth.getUser(authToken);
  if (error || !data.user) {
    return { error: createErrorResponse("Unauthorized", 401) };
  }

  return { user: data.user };
}

export async function GET() {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      design:design_id(id, name, image_url),
      phone_model:phone_model_id(id, brand, model, price)
    `
    )
    .eq("user_id", authResult.user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return createErrorResponse("Failed to fetch cart items", 500);
  }

  return NextResponse.json(data || [], {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: Request) {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { design_id, phone_model_id } = await req.json();
  if (!design_id || !phone_model_id) {
    return createErrorResponse("Invalid input", 400);
  }

  const { error } = await supabase.from("cart_items").insert({
    user_id: authResult.user.id,
    design_id,
    phone_model_id,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return createErrorResponse("Failed to add item to cart", 500);
  }

  return createSuccessResponse();
}

export async function DELETE(req: Request) {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { id } = await req.json();
  if (!id) return createErrorResponse("Item ID is required", 400);

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id)
    .eq("user_id", authResult.user.id)
    .select("id")
    .single();

  if (error) {
    return createErrorResponse(
      error.code === "PGRST116"
        ? "Cart item not found"
        : "Failed to delete cart item",
      error.code === "PGRST116" ? 404 : 500
    );
  }

  return createSuccessResponse();
}
