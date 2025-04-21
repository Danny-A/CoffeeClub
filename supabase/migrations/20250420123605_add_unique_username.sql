-- Step 1: Add username column as nullable first
ALTER TABLE profiles ADD COLUMN username TEXT;

-- Step 2: Create function to generate a unique username from email
CREATE OR REPLACE FUNCTION generate_unique_username_from_email(email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    base_username TEXT;
    test_username TEXT;
    counter INTEGER := 0;
BEGIN
    -- Extract username from email (everything before @)
    base_username := split_part(email, '@', 1);
    -- Remove special characters and spaces, convert to lowercase
    base_username := regexp_replace(lower(base_username), '[^a-z0-9]', '', 'g');
    -- Ensure it starts with a letter
    IF base_username ~ '^[0-9]' OR length(base_username) = 0 THEN
        base_username := 'user' || COALESCE(base_username, '');
    END IF;
    -- Ensure minimum length
    IF length(base_username) < 2 THEN
        base_username := base_username || '0';
    END IF;
    -- Truncate if too long (leaving room for potential numbers)
    IF length(base_username) > 25 THEN
        base_username := substring(base_username from 1 for 25);
    END IF;
    
    -- Start with base username
    test_username := base_username;
    
    -- Keep trying until we find a unique username
    WHILE EXISTS (SELECT 1 FROM profiles WHERE username = test_username) LOOP
        counter := counter + 1;
        test_username := base_username || counter::text;
    END LOOP;
    
    RETURN test_username;
END;
$$;

-- Step 3: Update existing profiles with generated usernames
UPDATE profiles
SET username = (
    SELECT generate_unique_username_from_email(email)
    FROM auth.users
    WHERE auth.users.id = profiles.id
)
WHERE username IS NULL;

-- Step 4: Drop the temporary function
DROP FUNCTION generate_unique_username_from_email(TEXT);

-- Step 5: Now make username required
ALTER TABLE profiles ALTER COLUMN username SET NOT NULL;

-- Step 6: Add case-insensitive unique constraint
CREATE UNIQUE INDEX username_unique_idx ON profiles (LOWER(username));

-- Step 7: Add validation for username format and length
ALTER TABLE profiles ADD CONSTRAINT username_format CHECK (
    username ~ '^[a-z][a-z0-9_-]{1,29}$' AND -- Must start with letter, max 30 chars
    username !~ '--' AND                      -- No consecutive hyphens
    username !~ '__' AND                      -- No consecutive underscores
    username ~ '[a-z]' AND                   -- Must contain at least one letter
    username !~ '[-_]$' AND                  -- Cannot end with hyphen or underscore
    username NOT IN (                        -- Reserved usernames
        'admin', 'root', 'system', 
        'moderator', 'mod', 'support', 
        'help', 'user', 'profile'
    )
);

-- Step 8: Function to check if a username is available
CREATE OR REPLACE FUNCTION public.is_username_available(desired_username TEXT)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Check against reserved usernames
    IF LOWER(desired_username) IN (
        'admin', 'root', 'system', 
        'moderator', 'mod', 'support', 
        'help', 'user', 'profile'
    ) THEN
        RETURN FALSE;
    END IF;

    RETURN NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE LOWER(username) = LOWER(desired_username)
    );
END;
$$;

-- Grant execute permission to both authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.is_username_available(text) TO authenticated, anon;

-- Step 9: Modify handle_new_user function to get username from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
begin
    -- Ensure username is provided and valid
    IF new.raw_user_meta_data->>'username' IS NULL THEN
        RAISE EXCEPTION 'username is required';
    END IF;

    insert into public.profiles (id, username, profile_image_url)
    values (
        new.id,
        LOWER(new.raw_user_meta_data->>'username'),
        'https://www.gravatar.com/avatar/' || md5(new.email) || '?d=mp'
    );
    return new;
end;
$$;