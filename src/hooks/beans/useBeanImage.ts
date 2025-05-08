import { createClient } from "@/lib/supabase/client";

export function useBeanImage() {
  const supabase = createClient();

  const uploadBeanImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload new image
    const { error: uploadError } = await supabase.storage
      .from("beans")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("beans")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  return {
    uploadBeanImage,
  };
}
