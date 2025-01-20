import { database } from "./supabase";

export async function uploadProductImage(file: File): Promise<string | null> {
  const filePatch = `${Date.now()}`;

  const { data, error } = await database.storage
    .from("products")
    .upload(filePatch, file);

  if (error) {
    console.error("Error Uploading Image: ", error.message);
    return null;
  }

  const { data: publicUrlData } = database.storage
    .from("products")
    .getPublicUrl(filePatch);

  return publicUrlData.publicUrl;
}
