-- Add unique constraints to prevent duplicate likes
ALTER TABLE bean_likes ADD CONSTRAINT unique_bean_like UNIQUE (user_id, bean_id);
ALTER TABLE roaster_likes ADD CONSTRAINT unique_roaster_like UNIQUE (user_id, roaster_id);
ALTER TABLE location_likes ADD CONSTRAINT unique_location_like UNIQUE (user_id, location_id);

-- Add indexes for better performance
CREATE INDEX idx_bean_likes_bean_id ON bean_likes(bean_id);
CREATE INDEX idx_bean_likes_user_id ON bean_likes(user_id);
CREATE INDEX idx_roaster_likes_roaster_id ON roaster_likes(roaster_id);
CREATE INDEX idx_roaster_likes_user_id ON roaster_likes(user_id);
CREATE INDEX idx_location_likes_location_id ON location_likes(location_id);
CREATE INDEX idx_location_likes_user_id ON location_likes(user_id);

-- Enable RLS and add policies for roaster_likes
ALTER TABLE roaster_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON roaster_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON roaster_likes FOR ALL USING (user_id = auth.uid());

-- Enable RLS and add policies for bean_likes
ALTER TABLE bean_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON bean_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON bean_likes FOR ALL USING (user_id = auth.uid());

-- Enable RLS and add policies for location_likes
ALTER TABLE location_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON location_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON location_likes FOR ALL USING (user_id = auth.uid()); 