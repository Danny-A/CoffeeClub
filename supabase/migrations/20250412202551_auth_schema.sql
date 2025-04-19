-- Create the function first
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
begin
  insert into public."profiles" (id, "profile_image_url")
  values (new.id, 'https://www.gravatar.com/avatar/' || md5(new.email) || '?d=mp');
  return new;
end;
$function$;

-- Then create the trigger
CREATE TRIGGER on_auth_user_created 
AFTER INSERT ON auth.users 
FOR EACH ROW 
EXECUTE FUNCTION public.handle_new_user();