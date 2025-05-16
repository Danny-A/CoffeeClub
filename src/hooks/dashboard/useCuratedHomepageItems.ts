import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CuratedItemFormValues } from "@/app/(admin)/_components/CuratedItemForm";
import { fetchCuratedHomepageItems } from "@/lib/api/home/fetchCuratedHomepageItems";
import { graphqlFetch } from "@/lib/graphql/client";
import {
  CreateCuratedHomepageItemDocument,
  DeleteCuratedHomepageItemDocument,
  Homepage_Curated_Items,
  UpdateCuratedHomepageItemDocument,
} from "@/lib/graphql/generated/graphql";

export function useCuratedHomepageItems() {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["curatedHomepageItems"],
    queryFn: async () => await fetchCuratedHomepageItems(),
  });

  const queryClient = useQueryClient();

  // Mutations
  const createItem = useMutation({
    mutationFn: async (input: CuratedItemFormValues) => {
      await graphqlFetch(CreateCuratedHomepageItemDocument, {
        variables: { input: [input] },
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["curatedHomepageItems"] }),
  });

  const updateItem = useMutation({
    mutationFn: async (
      input: Partial<Homepage_Curated_Items> & { id: string },
    ) => {
      await graphqlFetch(UpdateCuratedHomepageItemDocument, {
        variables: { filter: { id: { eq: input.id } }, set: input },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curatedHomepageItems"] });
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      await graphqlFetch(DeleteCuratedHomepageItemDocument, {
        variables: { filter: { id: { eq: id } } },
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["curatedHomepageItems"] }),
  });

  return {
    items,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
  };
}
