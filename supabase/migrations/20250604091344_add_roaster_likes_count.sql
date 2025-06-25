-- Add likes_count column to roasters table
ALTER TABLE roasters ADD COLUMN IF NOT EXISTS likes_count integer DEFAULT 0;

-- =====================
-- Roaster likes_count triggers/functions
-- =====================
CREATE OR REPLACE FUNCTION update_roaster_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE roasters
  SET likes_count = (
    SELECT COUNT(*)
    FROM roaster_likes
    WHERE roaster_id = NEW.roaster_id OR roaster_id = OLD.roaster_id
  )
  WHERE id = NEW.roaster_id OR id = OLD.roaster_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_roaster_likes_count ON roaster_likes;
CREATE TRIGGER update_roaster_likes_count
AFTER INSERT OR UPDATE OR DELETE ON roaster_likes
FOR EACH ROW
EXECUTE FUNCTION update_roaster_likes_count();

-- =====================
-- Backfill existing data
-- =====================
UPDATE roasters
SET likes_count = (
  SELECT COUNT(*)
  FROM roaster_likes
  WHERE roaster_likes.roaster_id = roasters.id
); 