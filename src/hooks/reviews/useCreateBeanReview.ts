import { useMutation, useQueryClient } from '@tanstack/react-query';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  CreateBeanReviewDocument,
  CreateBeanReviewMutation,
  CreateBeanReviewMutationVariables,
} from '@/lib/graphql/generated/graphql';
import { CreateReviewInput } from '@/lib/validations/review';

export function useCreateBeanReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      beanId,
      userId,
      input,
    }: {
      beanId: string;
      userId: string;
      input: CreateReviewInput;
    }) => {
      const res = await graphqlFetch<
        CreateBeanReviewMutation,
        CreateBeanReviewMutationVariables
      >(CreateBeanReviewDocument, {
        variables: {
          input: {
            bean_id: beanId,
            user_id: userId,
            rating: input.rating.toString(),
            content: input.content || null,
          },
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      const review = data.insertIntobean_reviewsCollection?.records?.[0];

      if (review) {
        queryClient.invalidateQueries({ queryKey: ['bean', review.bean_id] });
        queryClient.invalidateQueries({ queryKey: ['beans'] });
      }
    },
  });
}
