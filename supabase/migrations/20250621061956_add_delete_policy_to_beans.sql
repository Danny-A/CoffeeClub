-- Migration: Add DELETE RLS policy to beans for owners and admins/moderators

DROP POLICY IF EXISTS "Owners and admins can delete beans" ON public.beans;
CREATE POLICY "Owners and admins can delete beans" ON public.beans
FOR DELETE
TO authenticated
USING (
  added_by = (select auth.uid())
  OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = (select auth.uid())
    AND user_roles.role IN ('admin', 'moderator')
  )
); 