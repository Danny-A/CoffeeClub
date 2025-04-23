-- Drop existing policies
DROP POLICY IF EXISTS "Roaster owners can update their roasters" ON roasters;
DROP POLICY IF EXISTS "Location owners can update their locations" ON locations;
DROP POLICY IF EXISTS "Owners can modify their own beans" ON beans;

-- Drop the policies we just created
DROP POLICY IF EXISTS "Owners and admins can update roasters" ON roasters;
DROP POLICY IF EXISTS "Owners and admins can update locations" ON locations;
DROP POLICY IF EXISTS "Owners and admins can update beans" ON beans;

-- Create new policies with fixed role checks
CREATE POLICY "Owners and admins can update roasters" ON roasters 
FOR UPDATE USING (
    claimed_by = auth.uid() 
    OR EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN ('admin', 'moderator')
    )
);

CREATE POLICY "Owners and admins can update locations" ON locations 
FOR UPDATE USING (
    claimed_by = auth.uid() 
    OR EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN ('admin', 'moderator')
    )
);

CREATE POLICY "Owners and admins can update beans" ON beans 
FOR UPDATE USING (
    added_by = auth.uid() 
    OR EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role IN ('admin', 'moderator')
    )
); 