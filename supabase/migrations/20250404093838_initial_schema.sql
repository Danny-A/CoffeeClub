-- ==========================
-- ENUM Definitions
-- ==========================

CREATE TYPE roast_type AS ENUM ('Espresso', 'Filter', 'Omni');
CREATE TYPE roast_level AS ENUM ('Light', 'Medium', 'Dark');
CREATE TYPE bean_type AS ENUM ('Single_Origin', 'Blend');
CREATE TYPE coffee_type AS ENUM (
'Macchiato', 'Americano', 'Cortado', 'Doppio', 'FlatWhite', 'Espresso', 'Filter', 'Cold_Brew',
'Latte', 'Lungo', 'Cappuccino', 'Other', 'Mocha', 'Ristretto'
);
CREATE TYPE brew_method AS ENUM (
'Espresso', 'Pour_Over', 'French_Press', 'Cold_Brew', 'AeroPress', 'Moka_Pot', 'Siphon', 'Percolator',
'Origami', 'Kalita_Wave', 'Hario_V60', 'Chemex', 'Auto_Drip', 'Automatic', 'Other'
);

-- ==========================
-- Storage Policies
-- ==========================

-- Create avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to avatars
CREATE POLICY "Public read access for avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatars
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete their own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated'
);

-- Create beans bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('beans', 'beans', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to beans
CREATE POLICY "Public read access for beans" ON storage.objects
FOR SELECT USING (bucket_id = 'beans');

-- Allow authenticated users to upload their own beans
CREATE POLICY "Authenticated users can upload beans" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'beans' AND
  auth.role() = 'authenticated'
);

-- Create roasters bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('roasters', 'roasters', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to roasters
CREATE POLICY "Public read access for roasters" ON storage.objects
FOR SELECT USING (bucket_id = 'roasters');

-- Allow authenticated users to upload their own roasters
CREATE POLICY "Authenticated users can upload roasters" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'roasters' AND
  auth.role() = 'authenticated'
);

-- Create locations bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('locations', 'locations', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to locations
CREATE POLICY "Public read access for locations" ON storage.objects
FOR SELECT USING (bucket_id = 'locations');

-- Allow authenticated users to upload their own locations
CREATE POLICY "Authenticated users can upload locations" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'locations' AND
  auth.role() = 'authenticated'
);

-- ==========================
-- Profiles Table
-- ==========================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id),
    display_name TEXT,
    bio TEXT,
    profile_image_url TEXT,
    location TEXT,
    instagram TEXT,
    url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Owners can modify their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- ==========================
-- Followers Table
-- ==========================

CREATE TABLE followers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles (id),
    follower_id UUID REFERENCES profiles (id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================
-- Roasters Table
-- ==========================

CREATE TABLE roasters (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT UNIQUE NOT NULL,
description TEXT,
profile_image_url TEXT,
location_city TEXT,
location_state TEXT,
location_country TEXT,
url TEXT,
instagram TEXT,
claimed_by UUID REFERENCES auth.users (id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE roasters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON roasters FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add roasters" ON roasters FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Roaster owners can update their roasters" ON roasters FOR UPDATE USING (claimed_by = auth.uid());

-- ==========================
-- Beans Table
-- ==========================

CREATE TABLE beans (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
roaster_id UUID REFERENCES roasters (id) ON DELETE CASCADE,
name TEXT NOT NULL,
description TEXT,
image_url TEXT,
roast_type roast_type,
process TEXT,
roast_level roast_level,
bean_type bean_type,
elevation_min INT,
elevation_max INT,
origin TEXT,
producer TEXT,
notes TEXT,
buy_urls TEXT[],
added_by UUID REFERENCES auth.users (id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE beans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON beans FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add beans" ON beans FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Owners can modify their own beans" ON beans FOR UPDATE USING (added_by = auth.uid());

-- ==========================
-- Varieties Table
-- ==========================

CREATE TABLE varieties (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT UNIQUE NOT NULL
);

CREATE TABLE bean_varieties (
bean_id UUID REFERENCES beans (id) ON DELETE CASCADE,
variety_id UUID REFERENCES varieties (id) ON DELETE CASCADE,
PRIMARY KEY (bean_id, variety_id)
);

-- ==========================
-- Locations Table
-- ==========================

CREATE TABLE locations (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT UNIQUE NOT NULL,
description TEXT,
image_url TEXT,
address TEXT,
latitude DECIMAL,
longitude DECIMAL,
url TEXT,
instagram TEXT,
claimed_by UUID REFERENCES auth.users (id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON locations FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add locations" ON locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Location owners can update their locations" ON locations FOR UPDATE USING (claimed_by = auth.uid());

-- ==========================
-- Tags & Bean Tags (Global Tags)
-- ==========================

CREATE TABLE tags (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bean_tags (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
bean_id UUID REFERENCES beans (id) ON DELETE CASCADE,
tag_id UUID REFERENCES tags (id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE bean_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON bean_tags FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add tags" ON bean_tags FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ==========================
-- Reviews & Likes Tables
-- ==========================

CREATE TABLE roaster_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles (id) ON DELETE CASCADE,
    roaster_id UUID REFERENCES roasters (id),
    rating NUMERIC(3,2) CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    coffee_type coffee_type,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bean_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles (id) ON DELETE CASCADE,
    bean_id UUID REFERENCES beans (id),
    rating NUMERIC(3,2) CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    coffee_type coffee_type,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE location_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles (id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations (id),
    rating NUMERIC(3,2) CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE roaster_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users (id),
    roaster_id UUID REFERENCES roasters (id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bean_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users (id),
    bean_id UUID REFERENCES beans (id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE location_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users (id),
    location_id UUID REFERENCES locations (id),
    created_at TIMESTAMP DEFAULT NOW()
);


ALTER TABLE roaster_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON roaster_reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reviews" ON roaster_reviews FOR ALL USING (user_id = auth.uid());

ALTER TABLE bean_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON bean_reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reviews" ON bean_reviews FOR ALL USING (user_id = auth.uid());

ALTER TABLE location_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON location_reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reviews" ON location_reviews FOR ALL USING (user_id = auth.uid());

-- ==========================
-- Recipes Table
-- ==========================

CREATE TABLE recipes (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES profiles (id) ON DELETE CASCADE,
bean_id UUID REFERENCES beans (id),
title TEXT,
description TEXT,
image_url TEXT,
grind_size TEXT,
grind_weight DECIMAL,
ratio TEXT,
brew_method brew_method,
is_public BOOLEAN DEFAULT FALSE,
likes_count INT DEFAULT 0,
created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access to public recipes" ON recipes FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can create recipes" ON recipes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can modify their own recipes" ON recipes FOR UPDATE USING (user_id = auth.uid());

-- ==========================
-- Indexing for Optimization
-- ==========================

CREATE INDEX ON bean_tags (bean_id);
CREATE INDEX ON bean_tags (tag_id);
CREATE INDEX ON beans (roaster_id);
CREATE INDEX ON roasters (claimed_by);
CREATE INDEX ON recipes (user_id);
