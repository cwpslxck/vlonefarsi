import { createServerSupabaseClient } from "@/utils/supabase/server";

export const revalidate = 3600; // cache 1 ساعت

export async function GET(
  req: Request,
  { params }: { params: { brand: string } }
) {
  const brand = params.brand;
  const supabase = createServerSupabaseClient();

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

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
