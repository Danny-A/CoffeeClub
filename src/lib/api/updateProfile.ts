import { User as GraphQLUser } from "@/lib/graphql/types";

import { graphqlFetch } from "../graphql/client";
import { UpdateProfileMutation } from "../graphql/generated/graphql";
import { UpdateProfileDocument } from "../graphql/generated/graphql";
import { ProfilesUpdateInput } from "../graphql/generated/graphql";
import { Exact } from "../graphql/generated/graphql";

export type Profile = {
  id: string;
  display_name?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
  location?: string | null;
  instagram?: string | null;
  url?: string | null;
  created_at?: string | null;
};

export const updateProfile = async (
  updates: Partial<Profile>,
  user: GraphQLUser | null,
) => {
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
};
