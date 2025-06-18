-- RLS Performance Fixes Migration
-- This migration updates RLS policies to use (select auth.uid()) and consolidates multiple permissive policies per role/action.

-- ==========================
-- PROFILES
-- ==========================
DROP POLICY IF EXISTS "Owners can modify their own profile" ON public.profiles;
CREATE POLICY "Owners can modify their own profile" ON public.profiles
FOR UPDATE
TO authenticated
USING ((select auth.uid()) = id)
WITH CHECK ((select auth.uid()) = id);

-- ==========================
-- ROASTERS
-- ==========================
DROP POLICY IF EXISTS "Authenticated users can add roasters" ON public.roasters;
CREATE POLICY "Authenticated users can add roasters" ON public.roasters
FOR INSERT
TO authenticated
WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Roaster owners can update their roasters" ON public.roasters;
CREATE POLICY "Roaster owners can update their roasters" ON public.roasters
FOR UPDATE
TO authenticated
USING (claimed_by = (select auth.uid()));

DROP POLICY IF EXISTS "Owners and admins can update roasters" ON public.roasters;
CREATE POLICY "Owners and admins can update roasters" ON public.roasters
FOR UPDATE
TO authenticated
USING (
  claimed_by = (select auth.uid())
  OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = (select auth.uid())
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- ==========================
-- BEANS
-- ==========================
DROP POLICY IF EXISTS "Authenticated users can add beans" ON public.beans;
CREATE POLICY "Authenticated users can add beans" ON public.beans
FOR INSERT
TO authenticated
WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Owners can modify their own beans" ON public.beans;
CREATE POLICY "Owners can modify their own beans" ON public.beans
FOR UPDATE
TO authenticated
USING (added_by = (select auth.uid()));

DROP POLICY IF EXISTS "Owners and admins can update beans" ON public.beans;
CREATE POLICY "Owners and admins can update beans" ON public.beans
FOR UPDATE
TO authenticated
USING (
  added_by = (select auth.uid())
  OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = (select auth.uid())
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- ==========================
-- LOCATIONS
-- ==========================
DROP POLICY IF EXISTS "Authenticated users can add locations" ON public.locations;
CREATE POLICY "Authenticated users can add locations" ON public.locations
FOR INSERT
TO authenticated
WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Location owners can update their locations" ON public.locations;
CREATE POLICY "Location owners can update their locations" ON public.locations
FOR UPDATE
TO authenticated
USING (claimed_by = (select auth.uid()));

DROP POLICY IF EXISTS "Owners and admins can update locations" ON public.locations;
CREATE POLICY "Owners and admins can update locations" ON public.locations
FOR UPDATE
TO authenticated
USING (
  claimed_by = (select auth.uid())
  OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = (select auth.uid())
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- ==========================
-- BEAN_TAGS
-- ==========================
DROP POLICY IF EXISTS "Authenticated users can add tags" ON public.bean_tags;
CREATE POLICY "Authenticated users can add tags" ON public.bean_tags
FOR INSERT
TO authenticated
WITH CHECK ((select auth.role()) = 'authenticated');

-- ==========================
-- BEAN_REVIEWS
-- ==========================
DROP POLICY IF EXISTS "Users can manage their own reviews" ON public.bean_reviews;
CREATE POLICY "Users can manage their own reviews" ON public.bean_reviews
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own reviews (insert)" ON public.bean_reviews
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own reviews (update)" ON public.bean_reviews
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own reviews (delete)" ON public.bean_reviews
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- LOCATION_REVIEWS
-- ==========================
DROP POLICY IF EXISTS "Users can manage their own reviews" ON public.location_reviews;
CREATE POLICY "Users can manage their own reviews" ON public.location_reviews
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own reviews (insert)" ON public.location_reviews
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own reviews (update)" ON public.location_reviews
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own reviews (delete)" ON public.location_reviews
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- RECIPES
-- ==========================
DROP POLICY IF EXISTS "Authenticated users can create recipes" ON public.recipes;
CREATE POLICY "Authenticated users can create recipes" ON public.recipes
FOR INSERT
TO authenticated
WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Users can modify their own recipes" ON public.recipes;
CREATE POLICY "Users can modify their own recipes" ON public.recipes
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can view their own recipes" ON public.recipes;
CREATE POLICY "Users can view their own recipes" ON public.recipes
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can delete their own recipes" ON public.recipes;
CREATE POLICY "Users can delete their own recipes" ON public.recipes
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- USER_ROLES
-- ==========================
DROP POLICY IF EXISTS "Service role has full access" ON public.user_roles;
CREATE POLICY "Service role has full access" ON public.user_roles
FOR ALL
TO service_role
USING ((select auth.role()) = 'service_role');

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- BEAN_LIKES
-- ==========================
DROP POLICY IF EXISTS "Public read access" ON public.bean_likes;
DROP POLICY IF EXISTS "Users can manage their own likes" ON public.bean_likes;
CREATE POLICY "Public read access and users can manage their own likes" ON public.bean_likes
FOR SELECT
TO anon, authenticated
USING (true);
CREATE POLICY "Users can manage their own likes (insert)" ON public.bean_likes
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own likes (delete)" ON public.bean_likes
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- LOCATION_LIKES
-- ==========================
DROP POLICY IF EXISTS "Public read access" ON public.location_likes;
DROP POLICY IF EXISTS "Users can manage their own likes" ON public.location_likes;
CREATE POLICY "Public read access and users can manage their own likes" ON public.location_likes
FOR SELECT
TO anon, authenticated
USING (true);
CREATE POLICY "Users can manage their own likes (insert)" ON public.location_likes
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own likes (delete)" ON public.location_likes
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- ROASTER_LIKES
-- ==========================
DROP POLICY IF EXISTS "Public read access" ON public.roaster_likes;
DROP POLICY IF EXISTS "Users can manage their own likes" ON public.roaster_likes;
CREATE POLICY "Public read access and users can manage their own likes" ON public.roaster_likes
FOR SELECT
TO anon, authenticated
USING (true);
CREATE POLICY "Users can manage their own likes (insert)" ON public.roaster_likes
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Users can manage their own likes (delete)" ON public.roaster_likes
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- ==========================
-- RECIPE_LIKES
-- ==========================
DROP POLICY IF EXISTS "Users can like recipes" ON public.recipe_likes;
CREATE POLICY "Users can like recipes" ON public.recipe_likes
FOR INSERT
TO authenticated
WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can unlike recipes" ON public.recipe_likes;
CREATE POLICY "Users can unlike recipes" ON public.recipe_likes
FOR DELETE
TO authenticated
USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can view their own recipe likes" ON public.recipe_likes;
DROP POLICY IF EXISTS "Anyone can view likes for a recipe or their own likes" ON public.recipe_likes;
CREATE POLICY "Users can view their own recipe likes" ON public.recipe_likes
FOR SELECT
TO authenticated
USING ((select auth.uid()) = user_id);

-- ==========================
-- PERFORMANCE: Add indexes for unindexed foreign keys
-- ==========================
CREATE INDEX IF NOT EXISTS idx_bean_reviews_bean_id ON public.bean_reviews(bean_id);
CREATE INDEX IF NOT EXISTS idx_bean_reviews_user_id ON public.bean_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_bean_varieties_bean_id ON public.bean_varieties(bean_id);
CREATE INDEX IF NOT EXISTS idx_bean_varieties_variety_id ON public.bean_varieties(variety_id);
CREATE INDEX IF NOT EXISTS idx_beans_added_by ON public.beans(added_by);
CREATE INDEX IF NOT EXISTS idx_followers_follower_id ON public.followers(follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_user_id ON public.followers(user_id);
CREATE INDEX IF NOT EXISTS idx_homepage_curated_items_bean_id ON public.homepage_curated_items(bean_id);
CREATE INDEX IF NOT EXISTS idx_homepage_curated_items_curated_by ON public.homepage_curated_items(curated_by);
CREATE INDEX IF NOT EXISTS idx_homepage_curated_items_location_id ON public.homepage_curated_items(location_id);
CREATE INDEX IF NOT EXISTS idx_homepage_curated_items_recipe_id ON public.homepage_curated_items(recipe_id);
CREATE INDEX IF NOT EXISTS idx_homepage_curated_items_roaster_id ON public.homepage_curated_items(roaster_id);
CREATE INDEX IF NOT EXISTS idx_location_reviews_location_id ON public.location_reviews(location_id);
CREATE INDEX IF NOT EXISTS idx_location_reviews_user_id ON public.location_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_locations_claimed_by ON public.locations(claimed_by);
CREATE INDEX IF NOT EXISTS idx_recipe_likes_recipe_id ON public.recipe_likes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_likes_user_id ON public.recipe_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_bean_id ON public.recipes(bean_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
