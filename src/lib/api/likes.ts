import { graphqlFetch } from '@/lib/graphql/client';
import {
  Exact,
  LikeBeanDocument,
  LikeBeanMutation,
  LikeLocationDocument,
  LikeLocationMutation,
  LikeRecipeDocument,
  LikeRecipeMutation,
  LikeRoasterDocument,
  LikeRoasterMutation,
  UnlikeBeanDocument,
  UnlikeBeanMutation,
  UnlikeLocationDocument,
  UnlikeLocationMutation,
  UnlikeRecipeDocument,
  UnlikeRecipeMutation,
  UnlikeRoasterDocument,
  UnlikeRoasterMutation,
} from '@/lib/graphql/generated/graphql';

// Bean likes
export async function likeBean(beanId: string, userId: string) {
  const response = await graphqlFetch<
    LikeBeanMutation,
    Exact<{ input: { bean_id: string; user_id: string } }>
  >(LikeBeanDocument, {
    variables: {
      input: {
        bean_id: beanId,
        user_id: userId,
      },
    },
  });

  return response.data.insertIntobean_likesCollection?.records[0];
}

export async function unlikeBean(beanId: string, userId: string) {
  const response = await graphqlFetch<
    UnlikeBeanMutation,
    Exact<{
      filter: { bean_id: { eq: string }; user_id: { eq: string } };
    }>
  >(UnlikeBeanDocument, {
    variables: {
      filter: {
        bean_id: { eq: beanId },
        user_id: { eq: userId },
      },
    },
  });

  return response.data.deleteFrombean_likesCollection?.records[0];
}

// Roaster likes
export async function likeRoaster(roasterId: string, userId: string) {
  const response = await graphqlFetch<
    LikeRoasterMutation,
    Exact<{ input: { roaster_id: string; user_id: string } }>
  >(LikeRoasterDocument, {
    variables: {
      input: {
        roaster_id: roasterId,
        user_id: userId,
      },
    },
  });

  return response.data.insertIntoroaster_likesCollection?.records[0];
}

export async function unlikeRoaster(roasterId: string, userId: string) {
  const response = await graphqlFetch<
    UnlikeRoasterMutation,
    Exact<{
      filter: { roaster_id: { eq: string }; user_id: { eq: string } };
    }>
  >(UnlikeRoasterDocument, {
    variables: {
      filter: {
        roaster_id: { eq: roasterId },
        user_id: { eq: userId },
      },
    },
  });

  return response.data.deleteFromroaster_likesCollection?.records[0];
}

// Location likes
export async function likeLocation(locationId: string, userId: string) {
  const response = await graphqlFetch<
    LikeLocationMutation,
    Exact<{ input: { location_id: string; user_id: string } }>
  >(LikeLocationDocument, {
    variables: {
      input: {
        location_id: locationId,
        user_id: userId,
      },
    },
  });

  return response.data.insertIntolocation_likesCollection?.records[0];
}

export async function unlikeLocation(locationId: string, userId: string) {
  const response = await graphqlFetch<
    UnlikeLocationMutation,
    Exact<{
      filter: { location_id: { eq: string }; user_id: { eq: string } };
    }>
  >(UnlikeLocationDocument, {
    variables: {
      filter: {
        location_id: { eq: locationId },
        user_id: { eq: userId },
      },
    },
  });

  return response.data.deleteFromlocation_likesCollection?.records[0];
}

// Recipe likes
export async function likeRecipe(recipeId: string, userId: string) {
  const response = await graphqlFetch<
    LikeRecipeMutation,
    Exact<{ input: { recipe_id: string; user_id: string } }>
  >(LikeRecipeDocument, {
    variables: {
      input: {
        recipe_id: recipeId,
        user_id: userId,
      },
    },
  });

  return response.data.insertIntorecipe_likesCollection?.records[0];
}

export async function unlikeRecipe(recipeId: string, userId: string) {
  const response = await graphqlFetch<
    UnlikeRecipeMutation,
    Exact<{
      filter: { recipe_id: { eq: string }; user_id: { eq: string } };
    }>
  >(UnlikeRecipeDocument, {
    variables: {
      filter: {
        recipe_id: { eq: recipeId },
        user_id: { eq: userId },
      },
    },
  });

  return response.data.deleteFromrecipe_likesCollection?.records[0];
}
