import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { graphqlFetch } from "@/lib/graphql/client";
import {
  CreateRoasterDocument,
  CreateRoasterMutation,
  CreateRoasterMutationVariables,
  RoastersInsertInput,
} from "@/lib/graphql/generated/graphql";
import { generateSlug } from "@/utils/slug";

export type CreateRoasterInput = {
  name: string;
  description?: string;
  location_country?: string;
  location_city?: string;
  location_state?: string;
  url?: string;
  instagram?: string;
  logo_url?: string | null;
  profile_image_url?: string | null;
  is_published?: boolean;
};

export function useCreateRoaster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateRoasterInput) => {
      const id = uuidv4();
      const slug = generateSlug(input.name, id);

      const response = await graphqlFetch<
        CreateRoasterMutation,
        CreateRoasterMutationVariables
      >(CreateRoasterDocument, {
        variables: {
          input: {
            id,
            name: input.name,
            description: input.description,
            location_country: input.location_country,
            location_city: input.location_city,
            location_state: input.location_state,
            url: input.url,
            instagram: input.instagram,
            logo_url: input.logo_url,
            profile_image_url: input.profile_image_url,
            is_published: input.is_published,
            slug,
          } satisfies RoastersInsertInput,
        },
      });

      if (!response.data?.insertIntoroastersCollection?.records[0]) {
        throw new Error("Failed to create roaster");
      }

      return response.data.insertIntoroastersCollection.records[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roasters"] });
    },
  });
}
