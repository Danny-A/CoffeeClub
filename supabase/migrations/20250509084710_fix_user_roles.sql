CREATE OR REPLACE FUNCTION public.has_role(role user_role)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND user_roles.role = $1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;