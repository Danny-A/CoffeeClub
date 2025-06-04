import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/lib/supabase/client";

export function useRoasterImage() {
  const supabase = createClient();

  const uploadRoasterImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload new image
    const { error: uploadError } = await supabase.storage
      .from("roasters")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("roasters")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const deleteRoasterImage = async (url: string) => {
    // Extract the file name from the public URL
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];

    if (!fileName) return;

    const { error } = await supabase.storage.from("roasters").remove([
      fileName,
    ]);

    if (error) throw error;
  };

  return {
    uploadRoasterImage,
    deleteRoasterImage,
  };
}
