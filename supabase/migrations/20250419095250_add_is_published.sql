-- Add is_published column to beans table
ALTER TABLE beans ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT true;

-- Add is_published column to roasters table
ALTER TABLE roasters ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT true;

-- Add is_published column to locations table
ALTER TABLE locations ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT true;

-- Update existing records to have is_published = true
UPDATE beans SET is_published = true;
UPDATE roasters SET is_published = true;
UPDATE locations SET is_published = true;

-- Add RLS policies for is_published
ALTER POLICY "Public read access" ON beans
  USING (
    is_published = true 
    OR added_by = auth.uid() 
    OR has_role('admin')
    OR auth.role() = 'service_role'
  );

ALTER POLICY "Public read access" ON roasters
  USING (
    is_published = true 
    OR claimed_by = auth.uid() 
    OR has_role('admin')
    OR has_role('roaster_owner')
    OR auth.role() = 'service_role'
  );

ALTER POLICY "Public read access" ON locations
  USING (
    is_published = true 
    OR claimed_by = auth.uid() 
    OR has_role('admin')
    OR has_role('location_owner')
    OR auth.role() = 'service_role'
  ); 