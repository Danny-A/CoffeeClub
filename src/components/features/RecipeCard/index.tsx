import Image from 'next/image';
import Link from 'next/link';

import { LikeButton } from '@/components/ui/LikeButton';
import { GetRecipeByIdQuery } from '@/lib/graphql/generated/graphql';
import { User } from '@/lib/graphql/types';

type RecipeNode = NonNullable<
  NonNullable<GetRecipeByIdQuery['recipesCollection']>['edges'][number]
>['node'];

export function RecipeCard({
  recipe,
  user,
}: {
  recipe: RecipeNode;
  user: User | null;
}) {
  const likeCount = recipe.likes?.edges.length ?? 0;
  const isLiked = !!recipe.likes?.edges.find(
    (edge: { node: { user_id: string } }) => edge.node.user_id === user?.id
  );

  return (
    <div className="relative p-4 border rounded-lg bg-white dark:bg-gray-900 shadow">
      <Link href={`/recipes/${recipe.slug}`} className="block mb-2">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
        {recipe.image_url && (
          <Image
            src={recipe.image_url}
            alt={recipe.title ?? 'Recipe Image'}
            className="w-full h-40 object-cover rounded mb-2"
            loading="lazy"
            width={160}
            height={160}
          />
        )}
      </Link>
      <div className="flex items-center gap-2 absolute top-2 right-2">
        <LikeButton type="recipe" id={recipe.id} isLiked={isLiked} />
        <span className="text-sm">{likeCount}</span>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        By: {recipe.profiles?.display_name ?? recipe.profiles?.username}
      </div>
    </div>
  );
}
