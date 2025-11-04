'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Cache invalidation utilities for Next.js server-side caching
 *
 * These functions should be called from server actions or API routes
 * after data mutations to ensure the UI reflects the latest data.
 *
 * Using 'max' profile for stale-while-revalidate (SWR) behavior:
 * - Immediate cache invalidation for the requesting user
 * - Background revalidation for subsequent requests
 * - Optimal balance between performance and data freshness
 */

// Bean-related cache invalidation
export async function revalidateBean(beanId: string) {
  revalidateTag(`bean-${beanId}`, 'max');
  revalidateTag('beans', 'max');
  revalidateTag('dashboard-stats', 'max');
}

export async function revalidateAllBeans() {
  revalidateTag('beans', 'max');
  revalidateTag('dashboard-stats', 'max');
}

// Roaster-related cache invalidation
export async function revalidateRoaster(roasterId: string) {
  revalidateTag(`roaster-${roasterId}`, 'max');
  revalidateTag('roasters', 'max');
  revalidateTag('dashboard-stats', 'max');
}

export async function revalidateAllRoasters() {
  revalidateTag('roasters', 'max');
  revalidateTag('dashboard-stats', 'max');
}

// Recipe-related cache invalidation
export async function revalidateRecipe(recipeId: string) {
  revalidateTag(`recipe-${recipeId}`, 'max');
  revalidateTag('recipes', 'max');
}

export async function revalidateAllRecipes() {
  revalidateTag('recipes', 'max');
}

// Profile-related cache invalidation
export async function revalidateProfile(userId: string) {
  revalidateTag(`profile-${userId}`, 'max');
  revalidateTag('profiles', 'max');
}

// Homepage and curated content
export async function revalidateHomepage() {
  revalidateTag('homepage', 'max');
  revalidateTag('curated-items', 'max');
  revalidateTag('most-liked', 'max');
  revalidateTag('dashboard-stats', 'max');
}

export async function revalidateCuratedItems() {
  revalidateTag('curated-items', 'max');
  revalidateTag('homepage', 'max');
}

// Likes-related cache invalidation
export async function revalidateLikes(userId: string) {
  revalidateTag(`likes-${userId}`, 'max');
  revalidateTag('most-liked', 'max');
  revalidateTag('dashboard-stats', 'max');
}

// Reviews-related cache invalidation
export async function revalidateReviews(beanId: string) {
  revalidateTag(`reviews-${beanId}`, 'max');
  revalidateTag(`bean-${beanId}`, 'max');
  revalidateTag('beans', 'max');
  revalidateTag('dashboard-stats', 'max');
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
