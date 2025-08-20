import type { MetadataRoute } from 'next';

import { Bean_Status } from '@/lib/graphql/generated/graphql';
import { createClient } from '@/lib/supabase/server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://latestgrind.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/roasters`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/beans`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    // Fetch all data in parallel using Supabase directly
    const [{ data: roasters }, { data: beans }, { data: recipes }] =
      await Promise.all([
        supabase
          .from('roasters')
          .select('slug, updated_at')
          .eq('status', Bean_Status.Published),
        supabase
          .from('beans')
          .select('slug, updated_at')
          .eq('status', Bean_Status.Published),
        supabase
          .from('recipes')
          .select('slug, created_at')
          .eq('is_public', true),
      ]);

    const dynamicRoutes: MetadataRoute.Sitemap = [];

    // Add roaster routes
    if (roasters) {
      const roasterRoutes = roasters.map((roaster) => ({
        url: `${BASE_URL}/roasters/${roaster.slug}`,
        lastModified: new Date(roaster.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
      dynamicRoutes.push(...roasterRoutes);
    }

    // Add bean routes
    if (beans) {
      const beanRoutes = beans.map((bean) => ({
        url: `${BASE_URL}/beans/${bean.slug}`,
        lastModified: new Date(bean.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
      dynamicRoutes.push(...beanRoutes);
    }

    // Add recipe routes
    if (recipes) {
      const recipeRoutes = recipes.map((recipe) => ({
        url: `${BASE_URL}/recipes/${recipe.slug}`,
        lastModified: new Date(recipe.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
      dynamicRoutes.push(...recipeRoutes);
    }

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static routes if there's an error with dynamic routes
    return staticRoutes;
  }
}
