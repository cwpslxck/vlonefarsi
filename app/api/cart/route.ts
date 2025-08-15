import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

const createErrorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const createSuccessResponse = (data?: any) =>
  NextResponse.json(data ?? { success: true });

async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return { error: createErrorResponse("Unauthorized", 401) };
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(authToken);

    if (error || !user) {
      return { error: createErrorResponse("Unauthorized", 401) };
    }

    return { user };
  } catch (err) {
    console.error("Auth error:", err);
    return { error: createErrorResponse("Authentication failed", 401) };
  }
}

export async function GET() {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { user } = authResult;

  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        id,
        quantity,
        design:design_id(id, name, image_url),
        phone_model:phone_model_id(id, brand, model, price)
      `
      )
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return createErrorResponse("Failed to fetch cart items", 500);
    }

    const response = NextResponse.json(data || []);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("GET error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function POST(req: Request) {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { user } = authResult;

  try {
    const { design_id, phone_model_id, quantity = 1 } = await req.json();

    if (!design_id || !phone_model_id || quantity < 1) {
      return createErrorResponse(
        "Invalid input: design_id, phone_model_id are required and quantity must be positive",
        400
      );
    }

    const { error } = await supabase.from("cart_items").upsert(
      {
        user_id: user.id,
        design_id,
        phone_model_id,
        quantity: Math.floor(quantity),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,design_id,phone_model_id",
        ignoreDuplicates: false,
      }
    );

    if (error) {
      console.error("Database error:", error);
      return createErrorResponse("Failed to add item to cart", 500);
    }

    return createSuccessResponse();
  } catch (error) {
    console.error("POST error:", error);

    if (error instanceof SyntaxError) {
      return createErrorResponse("Invalid JSON format", 400);
    }

    return createErrorResponse("Internal server error", 500);
  }
}

export async function PATCH(req: Request) {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { user } = authResult;

  try {
    const { id, quantity } = await req.json();

    if (!id || typeof quantity !== "number" || quantity < 1) {
      return createErrorResponse(
        "Invalid input: id is required and quantity must be a positive number",
        400
      );
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({
        quantity: Math.floor(quantity),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id")
      .single();

    if (error) {
      console.error("Database error:", error);
      return createErrorResponse(
        error.code === "PGRST116"
          ? "Cart item not found"
          : "Failed to update cart item",
        error.code === "PGRST116" ? 404 : 500
      );
    }

    return createSuccessResponse();
  } catch (error) {
    console.error("PATCH error:", error);

    if (error instanceof SyntaxError) {
      return createErrorResponse("Invalid JSON format", 400);
    }

    return createErrorResponse("Internal server error", 500);
  }
}

export async function DELETE(req: Request) {
  const authResult = await getAuthenticatedUser();
  if ("error" in authResult) return authResult.error;

  const { user } = authResult;

  try {
    const { id } = await req.json();

    if (!id) {
      return createErrorResponse("Item ID is required", 400);
    }

    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)
      .select("id")
      .single();

    if (error) {
      console.error("Database error:", error);
      return createErrorResponse(
        error.code === "PGRST116"
          ? "Cart item not found"
          : "Failed to delete cart item",
        error.code === "PGRST116" ? 404 : 500
      );
    }

    return createSuccessResponse();
  } catch (error) {
    console.error("DELETE error:", error);

    if (error instanceof SyntaxError) {
      return createErrorResponse("Invalid JSON format", 400);
    }

    return createErrorResponse("Internal server error", 500);
  }
}
