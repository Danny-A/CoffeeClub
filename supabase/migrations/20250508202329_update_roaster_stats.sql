-- Function to update roaster stats based on their beans
CREATE OR REPLACE FUNCTION public.update_roaster_stats(roaster_id uuid) RETURNS void AS $$
DECLARE
  avg_rating double precision;
  total_reviews integer;
BEGIN
  SELECT
    AVG(b.average_rating) AS avg_rating,
    SUM(b.review_count) AS total_reviews
  INTO avg_rating, total_reviews
  FROM beans b
  WHERE b.roaster_id = update_roaster_stats.roaster_id AND b.review_count > 0;

  UPDATE roasters
  SET average_rating = COALESCE(avg_rating, 0),
      review_count = COALESCE(total_reviews, 0)
  WHERE id = update_roaster_stats.roaster_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to call update_roaster_stats after beans changes
CREATE OR REPLACE FUNCTION public.trigger_update_roaster_stats() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM public.update_roaster_stats(OLD.roaster_id);
  ELSE
    PERFORM public.update_roaster_stats(NEW.roaster_id);
    IF TG_OP = 'UPDATE' AND NEW.roaster_id IS DISTINCT FROM OLD.roaster_id THEN
      PERFORM public.update_roaster_stats(OLD.roaster_id);
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS beans_update_roaster_stats ON beans;

-- Create trigger on beans for insert, update, delete
CREATE TRIGGER beans_update_roaster_stats
AFTER INSERT OR UPDATE OR DELETE ON beans
FOR EACH ROW EXECUTE FUNCTION public.trigger_update_roaster_stats();

-- Backfill all roaster stats
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id FROM roasters LOOP
    PERFORM public.update_roaster_stats(r.id);
  END LOOP;
END $$;

-- Add bean_count column to roasters if it doesn't exist
ALTER TABLE roasters ADD COLUMN IF NOT EXISTS bean_count integer DEFAULT 0;

-- Function to update bean_count for a roaster
CREATE OR REPLACE FUNCTION public.update_roaster_bean_count(roaster_id uuid) RETURNS void AS $$
DECLARE
  beans_total integer;
BEGIN
  SELECT COUNT(*) INTO beans_total FROM beans b WHERE b.roaster_id = update_roaster_bean_count.roaster_id;
  UPDATE roasters SET bean_count = beans_total WHERE id = update_roaster_bean_count.roaster_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to call update_roaster_bean_count after beans changes
CREATE OR REPLACE FUNCTION public.trigger_update_roaster_bean_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM public.update_roaster_bean_count(OLD.roaster_id);
  ELSE
    PERFORM public.update_roaster_bean_count(NEW.roaster_id);
    IF TG_OP = 'UPDATE' AND NEW.roaster_id IS DISTINCT FROM OLD.roaster_id THEN
      PERFORM public.update_roaster_bean_count(OLD.roaster_id);
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS beans_update_roaster_bean_count ON beans;

-- Create trigger on beans for insert, update, delete
CREATE TRIGGER beans_update_roaster_bean_count
AFTER INSERT OR UPDATE OR DELETE ON beans
FOR EACH ROW EXECUTE FUNCTION public.trigger_update_roaster_bean_count();

-- Backfill bean_count for all roasters
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id FROM roasters LOOP
    PERFORM public.update_roaster_bean_count(r.id);
  END LOOP;
END $$;

-- Update dashboard_stats view to add total_recipes
DROP VIEW IF EXISTS dashboard_stats;

CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  gen_random_uuid() as id,
  (SELECT COUNT(*) FROM profiles) as total_users,
  (SELECT COUNT(*) FROM beans) as total_beans,
  (SELECT COUNT(*) FROM roasters) as total_roasters,
  (SELECT COUNT(*) FROM locations) as total_locations,
  (SELECT COUNT(*) FROM recipes) as total_recipes,
  (SELECT COUNT(*) FROM bean_reviews) as total_bean_reviews,
  (SELECT COUNT(*) FROM location_reviews) as total_location_reviews;

-- Add primary key comment for GraphQL
COMMENT ON VIEW dashboard_stats IS E'@graphql({"primary_key_columns": ["id"]})';

-- Grant access to the view
GRANT SELECT ON dashboard_stats TO authenticated;
GRANT SELECT ON dashboard_stats TO service_role; 