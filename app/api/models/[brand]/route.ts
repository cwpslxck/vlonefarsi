import { supabase } from "@/utils/supabase/client";

export const revalidate = 0; // هیچ وقت کش نشه

export async function GET(
  _req: Request,
  context: { params: Promise<{ brand: string }> }
) {
  const { brand } = await context.params;

  const { data, error } = await supabase
    .from("phone_models")
    .select("id, brand, model, price, available")
    .eq("brand", brand);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
