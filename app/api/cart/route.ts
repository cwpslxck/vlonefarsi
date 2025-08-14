import { createServerSupabaseClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";

// Common error responses
const UNAUTHORIZED_RESPONSE = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
const INTERNAL_ERROR_RESPONSE = NextResponse.json(
  { error: "Internal server error" },
  { status: 500 }
);

// Shared authentication logic
async function authenticateAndGetSupabase(): Promise<
  { user: User; supabase: any } | { error: NextResponse }
> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return { error: UNAUTHORIZED_RESPONSE };
    }

    const supabase = createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(authToken);

    if (error || !user) {
      return { error: UNAUTHORIZED_RESPONSE };
    }

    return { user, supabase };
  } catch (err) {
    console.error("Auth error:", err);
    return { error: UNAUTHORIZED_RESPONSE };
  }
}

export async function GET() {
  const authResult = await authenticateAndGetSupabase();
  if ("error" in authResult) return authResult.error;

  const { user, supabase } = authResult;

  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select(
        `
        id,
        quantity,
        design:design_id (id, name, image_url),
        phone_model:phone_model_id (id, brand, model, price)
      `
      )
      .eq("user_id", user.id);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("GET - Unexpected error:", error);
    return INTERNAL_ERROR_RESPONSE;
  }
}

export async function POST(req: Request) {
  const authResult = await authenticateAndGetSupabase();
  if ("error" in authResult) return authResult.error;

  const { user, supabase } = authResult;

  try {
    const { design_id, phone_model_id, quantity = 1 } = await req.json();

    if (!design_id || !phone_model_id) {
      return NextResponse.json(
        { error: "design_id and phone_model_id are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("cart_items").upsert(
      {
        user_id: user.id,
        design_id,
        phone_model_id,
        quantity,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,design_id,phone_model_id",
      }
    );

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST - Unexpected error:", error);
    return INTERNAL_ERROR_RESPONSE;
  }
}

export async function DELETE(req: Request) {
  const authResult = await authenticateAndGetSupabase();
  if ("error" in authResult) return authResult.error;

  const { user, supabase } = authResult;

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE - Unexpected error:", error);
    return INTERNAL_ERROR_RESPONSE;
  }
}

export async function PATCH(req: Request) {
  const authResult = await authenticateAndGetSupabase();
  if ("error" in authResult) return authResult.error;

  const { user, supabase } = authResult;

  try {
    const { id, quantity } = await req.json();

    if (!id || quantity === undefined) {
      return NextResponse.json(
        { error: "ID and quantity are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH - Unexpected error:", error);
    return INTERNAL_ERROR_RESPONSE;
  }
}
