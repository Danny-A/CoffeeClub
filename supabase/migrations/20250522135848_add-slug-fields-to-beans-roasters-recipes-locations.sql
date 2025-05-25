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

-- Slug generation function
CREATE OR REPLACE FUNCTION generate_slug(name text, id uuid)
RETURNS text AS $$
BEGIN
  RETURN lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || id;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger for beans
CREATE OR REPLACE FUNCTION beans_slug_fallback()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS beans_slug_fallback_trigger ON beans;
CREATE TRIGGER beans_slug_fallback_trigger
BEFORE INSERT OR UPDATE ON beans
FOR EACH ROW
EXECUTE FUNCTION beans_slug_fallback();

-- Trigger for roasters
CREATE OR REPLACE FUNCTION roasters_slug_fallback()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS roasters_slug_fallback_trigger ON roasters;
CREATE TRIGGER roasters_slug_fallback_trigger
BEFORE INSERT OR UPDATE ON roasters
FOR EACH ROW
EXECUTE FUNCTION roasters_slug_fallback();

-- Trigger for recipes
CREATE OR REPLACE FUNCTION recipes_slug_fallback()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS recipes_slug_fallback_trigger ON recipes;
CREATE TRIGGER recipes_slug_fallback_trigger
BEFORE INSERT OR UPDATE ON recipes
FOR EACH ROW
EXECUTE FUNCTION recipes_slug_fallback();

-- Trigger for locations
CREATE OR REPLACE FUNCTION locations_slug_fallback()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name, NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS locations_slug_fallback_trigger ON locations;
CREATE TRIGGER locations_slug_fallback_trigger
BEFORE INSERT OR UPDATE ON locations
FOR EACH ROW
EXECUTE FUNCTION locations_slug_fallback();

