import { Bean } from "@/lib/graphql/types";

export function getAverageRating(bean: Bean) {
  const ratings = bean.reviews?.map((review) => Number(review.rating)) || [];
  if (ratings.length === 0) return null;

  const average = ratings.reduce((acc, rating) => acc + rating, 0) /
    ratings.length;

  return Number(average.toFixed(2));
}
