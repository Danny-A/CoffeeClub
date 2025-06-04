-- Allow admins, moderators, and roaster claimers to delete bean images
create policy "Admins, moderators, and roaster claimers can delete bean images"
on storage.objects
for delete
using (
  bucket_id = 'beans'
  AND (
    public.has_role('admin')
    OR public.has_role('moderator')
    OR EXISTS (
      SELECT 1 FROM beans
      JOIN roasters ON beans.roaster_id = roasters.id
      WHERE beans.image_url = storage.objects.name
      AND roasters.claimed_by = auth.uid()
    )
  )
);

-- Allow admins, moderators, and location claimers to delete location images
create policy "Admins, moderators, and location claimers can delete location images"
on storage.objects
for delete
using (
  bucket_id = 'locations'
  AND (
    public.has_role('admin')
    OR public.has_role('moderator')
    OR EXISTS (
      SELECT 1 FROM locations
      WHERE locations.image_url = storage.objects.name
      AND locations.claimed_by = auth.uid()
    )
  )
);

-- Allow admins, moderators, and recipe owners to delete recipe images
create policy "Admins, moderators, and recipe owners can delete recipe images"
on storage.objects
for delete
using (
  bucket_id = 'recipes'
  AND (
    public.has_role('admin')
    OR public.has_role('moderator')
    OR EXISTS (
      SELECT 1 FROM recipes
      WHERE recipes.image_url = storage.objects.name
      AND recipes.user_id = auth.uid()
    )
  )
);
