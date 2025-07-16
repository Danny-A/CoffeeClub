'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Cache invalidation utilities for Next.js server-side caching
 *
 * These functions should be called from server actions or API routes
 * after data mutations to ensure the UI reflects the latest data.
 */

// Bean-related cache invalidation
export async function revalidateBean(beanId: string) {
  revalidateTag(`bean-${beanId}`);
  revalidateTag('beans');
  revalidateTag('dashboard-stats');
}

export async function revalidateAllBeans() {
  revalidateTag('beans');
  revalidateTag('dashboard-stats');
}

// Roaster-related cache invalidation
export async function revalidateRoaster(roasterId: string) {
  revalidateTag(`roaster-${roasterId}`);
  revalidateTag('roasters');
  revalidateTag('dashboard-stats');
}

export async function revalidateAllRoasters() {
  revalidateTag('roasters');
  revalidateTag('dashboard-stats');
}

// Recipe-related cache invalidation
export async function revalidateRecipe(recipeId: string) {
  revalidateTag(`recipe-${recipeId}`);
  revalidateTag('recipes');
}

export async function revalidateAllRecipes() {
  revalidateTag('recipes');
}

// Profile-related cache invalidation
export async function revalidateProfile(userId: string) {
  revalidateTag(`profile-${userId}`);
  revalidateTag('profiles');
}

// Homepage and curated content
export async function revalidateHomepage() {
  revalidateTag('homepage');
  revalidateTag('curated-items');
  revalidateTag('most-liked');
  revalidateTag('dashboard-stats');
}

export async function revalidateCuratedItems() {
  revalidateTag('curated-items');
  revalidateTag('homepage');
}

// Likes-related cache invalidation
export async function revalidateLikes(userId: string) {
  revalidateTag(`likes-${userId}`);
  revalidateTag('most-liked');
  revalidateTag('dashboard-stats');
}

// Reviews-related cache invalidation
export async function revalidateReviews(beanId: string) {
  revalidateTag(`reviews-${beanId}`);
  revalidateTag(`bean-${beanId}`);
  revalidateTag('beans');
  revalidateTag('dashboard-stats');
}

// Path-based revalidation (for specific pages)
export async function revalidatePaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}

// Emergency cache clear (use sparingly)
export async function clearAllCache() {
  revalidatePath('/', 'layout');
}

/**
 * Usage Example:
 *
 * // In a server action after updating a bean:
 * import { revalidateBean } from '@/lib/utils/revalidation';
 *
 * export async function updateBeanAction(beanId: string, data: BeanData) {
 *   await updateBean(beanId, data);
 *   await revalidateBean(beanId);
 * }
 */
