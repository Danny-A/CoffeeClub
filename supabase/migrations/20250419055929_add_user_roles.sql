-- Create the role enum
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'location_owner', 'roaster_owner');

-- Create the user_roles table
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access" ON user_roles
FOR ALL USING (auth.role() = 'service_role');

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles" ON user_roles 
FOR SELECT USING (user_id = auth.uid());

-- Create function to check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(role user_role)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = $1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
   
   