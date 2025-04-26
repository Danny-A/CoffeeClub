-- Add unique constraints to prevent duplicate likes
ALTER TABLE bean_likes ADD CONSTRAINT unique_bean_like UNIQUE (user_id, bean_id);
ALTER TABLE roaster_likes ADD CONSTRAINT unique_roaster_like UNIQUE (user_id, roaster_id);
ALTER TABLE location_likes ADD CONSTRAINT unique_location_like UNIQUE (user_id, location_id); 

-- Add indexes for foreign keys to improve query performance
CREATE INDEX idx_bean_likes_bean_id ON bean_likes(bean_id);
CREATE INDEX idx_bean_likes_user_id ON bean_likes(user_id);
CREATE INDEX idx_roaster_likes_roaster_id ON roaster_likes(roaster_id);
CREATE INDEX idx_roaster_likes_user_id ON roaster_likes(user_id);
CREATE INDEX idx_location_likes_location_id ON location_likes(location_id);
CREATE INDEX idx_location_likes_user_id ON location_likes(user_id); 