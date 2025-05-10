-- Add stats columns to beans, roasters, locations, and recipes

-- Beans
ALTER TABLE beans ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;
ALTER TABLE beans ALTER COLUMN average_rating TYPE double precision USING average_rating::double precision;

-- Roasters
ALTER TABLE roasters ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;
ALTER TABLE roasters ADD COLUMN IF NOT EXISTS average_rating double precision DEFAULT 0;

-- Locations
ALTER TABLE locations ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS average_rating double precision DEFAULT 0;

-- Recipes
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS likes_count integer DEFAULT 0;

-- =====================
-- Beans triggers/functions
-- =====================
CREATE OR REPLACE FUNCTION update_bean_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE beans
  SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM bean_reviews
      WHERE bean_id = NEW.bean_id OR bean_id = OLD.bean_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM bean_reviews
      WHERE bean_id = NEW.bean_id OR bean_id = OLD.bean_id
    )
  WHERE id = NEW.bean_id OR id = OLD.bean_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_bean_stats ON bean_reviews;
CREATE TRIGGER update_bean_stats
AFTER INSERT OR UPDATE OR DELETE ON bean_reviews
FOR EACH ROW
EXECUTE FUNCTION update_bean_stats();

-- =====================
-- Roasters triggers/functions
-- =====================
CREATE OR REPLACE FUNCTION update_roaster_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE roasters
  SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM roaster_reviews
      WHERE roaster_id = NEW.roaster_id OR roaster_id = OLD.roaster_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM roaster_reviews
      WHERE roaster_id = NEW.roaster_id OR roaster_id = OLD.roaster_id
    )
  WHERE id = NEW.roaster_id OR id = OLD.roaster_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_roaster_stats ON roaster_reviews;
CREATE TRIGGER update_roaster_stats
AFTER INSERT OR UPDATE OR DELETE ON roaster_reviews
FOR EACH ROW
EXECUTE FUNCTION update_roaster_stats();

-- =====================
-- Locations triggers/functions
-- =====================
CREATE OR REPLACE FUNCTION update_location_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE locations
  SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM location_reviews
      WHERE location_id = NEW.location_id OR location_id = OLD.location_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM location_reviews
      WHERE location_id = NEW.location_id OR location_id = OLD.location_id
    )
  WHERE id = NEW.location_id OR id = OLD.location_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_location_stats ON location_reviews;
CREATE TRIGGER update_location_stats
AFTER INSERT OR UPDATE OR DELETE ON location_reviews
FOR EACH ROW
EXECUTE FUNCTION update_location_stats();

-- =====================
-- Recipes likes_count triggers/functions
-- =====================
CREATE OR REPLACE FUNCTION update_recipe_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE recipes
  SET likes_count = (
    SELECT COUNT(*)
    FROM recipe_likes
    WHERE recipe_id = NEW.recipe_id OR recipe_id = OLD.recipe_id
  )
  WHERE id = NEW.recipe_id OR id = OLD.recipe_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_recipe_likes_count ON recipe_likes;
CREATE TRIGGER update_recipe_likes_count
AFTER INSERT OR UPDATE OR DELETE ON recipe_likes
FOR EACH ROW
EXECUTE FUNCTION update_recipe_likes_count();

-- =====================
-- Backfill existing data
-- =====================
-- Beans
UPDATE beans
SET
  average_rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM bean_reviews
    WHERE bean_reviews.bean_id = beans.id
  ),
  review_count = (
    SELECT COUNT(*)
    FROM bean_reviews
    WHERE bean_reviews.bean_id = beans.id
  );

-- Roasters
UPDATE roasters
SET
  average_rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM roaster_reviews
    WHERE roaster_reviews.roaster_id = roasters.id
  ),
  review_count = (
    SELECT COUNT(*)
    FROM roaster_reviews
    WHERE roaster_reviews.roaster_id = roasters.id
  );

-- Locations
UPDATE locations
SET
  average_rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM location_reviews
    WHERE location_reviews.location_id = locations.id
  ),
  review_count = (
    SELECT COUNT(*)
    FROM location_reviews
    WHERE location_reviews.location_id = locations.id
  );

-- Recipes
UPDATE recipes
SET likes_count = (
  SELECT COUNT(*)
  FROM recipe_likes
  WHERE recipe_likes.recipe_id = recipes.id
); 