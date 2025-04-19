-- Create the auth hook function
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    claims jsonb;
    user_roles text[];
BEGIN
    -- Get all roles for the user
    SELECT ARRAY_AGG(role::text)
    INTO user_roles
    FROM public.user_roles
    WHERE user_id = (event->>'user_id')::uuid;

    claims := event->'claims';
    
    -- Add roles to claims
    IF user_roles IS NOT NULL THEN
        claims := jsonb_set(claims, '{user_roles}', to_jsonb(user_roles));
    ELSE
        claims := jsonb_set(claims, '{user_roles}', '[]'::jsonb);
    END IF;

    -- Update the claims in the event
    event := jsonb_set(event, '{claims}', claims);
    
    RETURN event;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin; 