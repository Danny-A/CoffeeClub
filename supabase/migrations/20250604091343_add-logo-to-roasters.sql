-- Add a logo_url field to the roasters table
ALTER TABLE roasters ADD COLUMN logo_url text NULL;
COMMENT ON COLUMN roasters.logo_url IS 'URL to the logo image for the roaster';

-- Allow admins, moderators, and roaster claimers to delete images from the roasters bucket
create policy "Admins, moderators, and roaster claimers can delete roaster images"
on storage.objects
for delete
using (
  bucket_id = 'roasters'
  AND (
    -- Admins and moderators
    public.has_role('admin')
    OR public.has_role('moderator')
    -- Roaster claimers: check if the user is the claimer of any roaster using this image
    OR EXISTS (
      SELECT 1 FROM roasters
      WHERE (profile_image_url = storage.objects.name OR logo_url = storage.objects.name)
      AND claimed_by = auth.uid()
    )
  )
);