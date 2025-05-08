import { createClient } from "@/lib/supabase/client";

export function useRecipeImage() {
  const supabase = createClient();

  const uploadRecipeImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("recipes")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("recipes").getPublicUrl(filePath);
    return data.publicUrl;
  };

  return { uploadRecipeImage };
}
