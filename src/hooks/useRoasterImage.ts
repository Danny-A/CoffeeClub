import { createClient } from "@/lib/supabase/client";

export function useRoasterImage() {
  const supabase = createClient();

  const uploadRoasterImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
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

  return {
    uploadRoasterImage,
  };
}
