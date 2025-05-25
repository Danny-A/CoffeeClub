import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { MDXRenderer } from '@/components/mdx/MDXRenderer';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { fetchRecipeById } from '@/lib/api/fetchRecipeById';

import { RecipeMetaActions } from '../_components/RecipeMetaActions';

type RecipePageProps = {
  params: Promise<{ id: string }>;
};

async function RecipeDetail({ id }: { id: string }) {
  const recipe = await fetchRecipeById(id);

  if (!recipe) return notFound();

  const imageUrl = typeof recipe.image_url === 'string' ? recipe.image_url : '';

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="flex-1 min-w-0">
            <CardContent className="space-y-6">
              <Heading level="h3" className="mb-4">
                {recipe.title}
              </Heading>
              {imageUrl ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={imageUrl}
                    alt={recipe.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ) : null}
              <div className="prose dark:prose-invert max-w-none mt-6">
                {recipe.description && (
                  <MDXRenderer source={recipe.description} />
                )}
              </div>
            </CardContent>
          </Card>
          <aside className="w-full lg:w-80 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <Text variant="label">Brew Method</Text>
                    <Text>{recipe.brew_method?.replace(/_/g, ' ')}</Text>
                  </div>
                  {recipe.bean && (
                    <div>
                      <Text variant="label">Bean</Text>
                      <Text>
                        {recipe.bean.roasters?.name
                          ? `${recipe.bean.roasters.name} - `
                          : ''}
                        {recipe.bean.name}
                      </Text>
                    </div>
                  )}
                  {recipe.grind_size && (
                    <div>
                      <Text variant="label">Grind Size</Text>
                      <Text>{recipe.grind_size}</Text>
                    </div>
                  )}
                  {recipe.grind_weight && (
                    <div>
                      <Text variant="label">Grind Weight</Text>
                      <Text>{recipe.grind_weight} g</Text>
                    </div>
                  )}
                  {recipe.ratio && (
                    <div>
                      <Text variant="label">Ratio</Text>
                      <Text>{recipe.ratio}</Text>
                    </div>
                  )}
                  <RecipeMetaActions
                    slug={recipe.slug ?? recipe.id}
                    user_id={recipe.user_id}
                    is_public={recipe.is_public ?? false}
                  />
                  <div>
                    <Text variant="label">Created</Text>
                    <Text>{new Date(recipe.created_at).toLocaleString()}</Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params }: RecipePageProps) {
  const { id } = await params;

  return (
    <Suspense>
      <RecipeDetail id={id} />
    </Suspense>
  );
}
