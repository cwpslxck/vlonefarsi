import { createServerSupabaseClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return { user: null, error: "No auth token found" };
    }

    const supabase = createServerSupabaseClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(authToken);

    if (error || !user) {
      return { user: null, error: error?.message || "User not found" };
    }

    return { user, error: null };
  } catch (err) {
    console.error("Auth error:", err);
    return { user: null, error: "Authentication failed" };
  }
}

export async function GET() {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      console.log("GET - Auth failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET - User authenticated:", user.id);

    const supabase = createServerSupabaseClient();
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      console.log("POST - Auth failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { design_id, phone_model_id, quantity = 1 } = body;

    if (!design_id || !phone_model_id) {
      return NextResponse.json(
        { error: "design_id and phone_model_id are required" },
        { status: 400 }
      );
    }

    console.log("POST - Adding item:", {
      user_id: user.id,
      design_id,
      phone_model_id,
      quantity,
    });

    const supabase = createServerSupabaseClient();
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      console.log("DELETE - Auth failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    console.log("DELETE - Removing item:", { id, user_id: user.id });

    const supabase = createServerSupabaseClient();
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      console.log("PATCH - Auth failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, quantity } = await req.json();

    if (!id || quantity === undefined) {
      return NextResponse.json(
        { error: "ID and quantity are required" },
        { status: 400 }
      );
    }

    console.log("PATCH - Updating item:", { id, quantity, user_id: user.id });

    const supabase = createServerSupabaseClient();
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
