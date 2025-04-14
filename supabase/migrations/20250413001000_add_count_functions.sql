-- Create a view for dashboard stats
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  gen_random_uuid() as id,  -- Add an id column
  (SELECT COUNT(*) FROM profiles) as total_users,
  (SELECT COUNT(*) FROM beans) as total_beans,
  (SELECT COUNT(*) FROM roasters) as total_roasters,
  (SELECT COUNT(*) FROM locations) as total_locations,
  (SELECT COUNT(*) FROM bean_reviews) as total_bean_reviews,
  (SELECT COUNT(*) FROM roaster_reviews) as total_roaster_reviews,
  (SELECT COUNT(*) FROM location_reviews) as total_location_reviews;

-- Add primary key comment for GraphQL
COMMENT ON VIEW dashboard_stats IS E'@graphql({"primary_key_columns": ["id"]})';

-- Grant access to the view
GRANT SELECT ON dashboard_stats TO authenticated;
GRANT SELECT ON dashboard_stats TO service_role; 