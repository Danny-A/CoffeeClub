import { graphqlFetch } from "@/lib/graphql/client";
import {
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
} from "@/lib/graphql/generated/graphql";
import { UpdateProfileDocument } from "@/lib/graphql/generated/graphql";
import { User as GraphQLUser } from "@/lib/graphql/types";

export type Profile = {
  id: string;
  username?: string | null;
  display_name?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
  location?: string | null;
  instagram?: string | null;
  url?: string | null;
  created_at?: string | null;
};

export const updateProfile = async (
  input: Partial<Profile>,
  user: GraphQLUser | null,
) => {
  if (!user?.id) throw new Error("No user ID");

  const variables = {
    id: user.id,
    set: {
      username: input.username,
      display_name: input.display_name,
      bio: input.bio,
      location: input.location,
      instagram: input.instagram,
      url: input.url,
      profile_image_url: input.profile_image_url,
      updated_at: new Date().toISOString(),
    },
  };

  const response = await graphqlFetch<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, {
    variables,
  });

  if (!response.data?.updateprofilesCollection?.affectedCount) {
    throw new Error(
      "No records were updated. This could mean the profile doesn't exist or the update failed.",
    );
  }

  return response.data.updateprofilesCollection.records[0];
};
