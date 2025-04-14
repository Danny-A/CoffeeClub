import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/auth/useAuth";
import { Profile, updateProfile } from "@/lib/api/updateProfile";
import { createClient } from "@/lib/supabase/client";

export function useProfile() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      return updateProfile(updates, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const uploadProfileImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload new image
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    // After successful upload, get the current profile to find the old image URL
    const { data: profileData } = await supabase
      .from("profiles")
      .select("profile_image_url")
      .eq("id", user?.id)
      .single();

    if (profileData?.profile_image_url) {
      // Extract the file path from the old URL
      const oldFilePath = profileData.profile_image_url.split("/").pop();
      if (oldFilePath) {
        // Delete the old image
        await supabase.storage
          .from("avatars")
          .remove([oldFilePath]);
      }
    }

    return data.publicUrl;
  };

  return {
    updateProfile: updateProfileMutation.mutate,
    uploadProfileImage,
  };
}
