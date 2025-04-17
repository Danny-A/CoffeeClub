-- Add average_rating column to beans table
ALTER TABLE beans ADD COLUMN average_rating NUMERIC(3,2);

-- Create function to calculate average rating
CREATE OR REPLACE FUNCTION calculate_bean_average_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the average_rating in the beans table
  UPDATE beans
  SET average_rating = (
    SELECT COALESCE(AVG(rating), 0)
    FROM bean_reviews
    WHERE bean_id = NEW.bean_id OR bean_id = OLD.bean_id
  )
  WHERE id = NEW.bean_id OR id = OLD.bean_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update average_rating when reviews change
CREATE TRIGGER update_bean_average_rating
AFTER INSERT OR UPDATE OR DELETE ON bean_reviews
FOR EACH ROW
EXECUTE FUNCTION calculate_bean_average_rating();

-- Initialize average_rating for existing beans
UPDATE beans
SET average_rating = (
  SELECT COALESCE(AVG(rating), 0)
  FROM bean_reviews
  WHERE bean_reviews.bean_id = beans.id
);

-- Add index on average_rating for efficient filtering
CREATE INDEX idx_beans_average_rating ON beans(average_rating);

-- Update the GraphQL schema to expose the new column
COMMENT ON COLUMN beans.average_rating IS 'The average rating of the bean based on all reviews.'; 