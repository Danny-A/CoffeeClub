import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/auth/useAuth";
import { graphqlFetch } from "@/lib/graphql/client";
import {
  Exact,
  ProfilesUpdateInput,
  UpdateProfileDocument,
  UpdateProfileMutation,
} from "@/lib/graphql/generated/graphql";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  display_name?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
  location?: string | null;
  instagram?: string | null;
  url?: string | null;
  created_at?: string | null;
};

export function useProfile() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user?.id) throw new Error("No user ID");

      const variables = {
        id: user.id,
        updates: {
          display_name: updates.display_name,
          bio: updates.bio,
          location: updates.location,
          instagram: updates.instagram,
          url: updates.url,
          profile_image_url: updates.profile_image_url,
          updated_at: new Date().toISOString(),
        },
      };

      const response = await graphqlFetch<
        UpdateProfileMutation,
        Exact<{ id: string; updates: ProfilesUpdateInput }>
      >(UpdateProfileDocument, {
        variables,
      });

      if (!response.data?.updateprofilesCollection?.affectedCount) {
        throw new Error(
          "No records were updated. This could mean the profile doesn't exist or the update failed.",
        );
      }

      return response.data.updateprofilesCollection.records[0];
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

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  return {
    updateProfile: updateProfileMutation.mutate,
    uploadProfileImage,
  };
}
