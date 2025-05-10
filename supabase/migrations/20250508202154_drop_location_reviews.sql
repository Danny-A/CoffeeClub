-- Drop triggers, policies, and the roaster_reviews table

-- Drop any triggers on roaster_reviews (if any exist)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT trigger_name
    FROM information_schema.triggers
    WHERE event_object_table = 'roaster_reviews'
  ) LOOP
    EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.trigger_name) || ' ON roaster_reviews;';
  END LOOP;
END $$;

-- Drop RLS policies (if any)
DROP POLICY IF EXISTS select_roaster_reviews ON roaster_reviews;
DROP POLICY IF EXISTS insert_roaster_reviews ON roaster_reviews;
DROP POLICY IF EXISTS update_roaster_reviews ON roaster_reviews;
DROP POLICY IF EXISTS delete_roaster_reviews ON roaster_reviews;

-- Drop the table
DROP TABLE IF EXISTS roaster_reviews CASCADE;
