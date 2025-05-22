-- Add slug columns
ALTER TABLE beans ADD COLUMN slug text;
ALTER TABLE roasters ADD COLUMN slug text;
ALTER TABLE recipes ADD COLUMN slug text;
ALTER TABLE locations ADD COLUMN slug text;

-- Backfill slug columns for existing records
-- For beans
UPDATE beans SET slug =
  lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || id
WHERE slug IS NULL;

-- For roasters
UPDATE roasters SET slug =
  lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || id
WHERE slug IS NULL;

-- For recipes
UPDATE recipes SET slug =
  lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || id
WHERE slug IS NULL;

-- For locations
UPDATE locations SET slug =
  lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || id
WHERE slug IS NULL;

-- Add unique constraints
ALTER TABLE beans ADD CONSTRAINT beans_slug_unique UNIQUE (slug);
ALTER TABLE roasters ADD CONSTRAINT roasters_slug_unique UNIQUE (slug);
ALTER TABLE recipes ADD CONSTRAINT recipes_slug_unique UNIQUE (slug);
ALTER TABLE locations ADD CONSTRAINT locations_slug_unique UNIQUE (slug);
