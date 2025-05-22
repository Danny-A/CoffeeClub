import { notFound } from 'next/navigation';

import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { LikeButton } from '@/components/ui/LikeButton';
import { fetchRecipeById } from '@/lib/api/fetchRecipeById';
import { createClient } from '@/lib/supabase/server';
import { extractIdFromSlug } from '@/utils/slug';

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (!id) return null;
  const recipe = await fetchRecipeById(id);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!recipe || !recipe.is_public) return notFound();

  const likeCount = recipe.likes?.edges.length ?? 0;
  const isLiked = !!recipe.likes?.edges.find(
    (edge) => edge.node.user_id === user?.id
  );

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title ?? 'Recipe Image'}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <div className="flex items-center gap-2 mb-4">
        <LikeButton type="recipe" id={recipe.id} isLiked={isLiked} />
        <span className="text-sm">{likeCount} likes</span>
      </div>
      <div className="prose dark:prose-invert max-w-none mb-6">
        {recipe.description && <MDXRenderer source={recipe.description} />}
      </div>
      <div className="text-xs text-gray-500">
        By: {recipe.profiles?.display_name ?? recipe.profiles?.username}
      </div>
      <div className="text-xs text-gray-500">
        Created: {new Date(recipe.created_at).toLocaleString()}
      </div>
    </div>
  );
}
