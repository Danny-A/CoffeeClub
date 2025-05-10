-- Create the curated homepage items table
create table public.homepage_curated_items (
  id uuid primary key default gen_random_uuid(),
  section text not null, -- e.g. 'featured', 'staff-picks', 'editor-picks'
  item_type text not null check (item_type in ('bean', 'recipe', 'roaster', 'location')),
  item_id uuid not null,
  display_order integer not null default 0,
  custom_title text,
  published boolean not null default true,
  curated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (section, item_type, item_id)
);

-- Enforce referential integrity for item_id based on item_type
create or replace function public.check_curated_item_exists() returns trigger as $$
begin
  if NEW.item_type = 'bean' then
    if not exists (select 1 from public.beans where id = NEW.item_id) then
      raise exception 'Bean with id % does not exist', NEW.item_id;
    end if;
  elsif NEW.item_type = 'recipe' then
    if not exists (select 1 from public.recipes where id = NEW.item_id) then
      raise exception 'Recipe with id % does not exist', NEW.item_id;
    end if;
  elsif NEW.item_type = 'roaster' then
    if not exists (select 1 from public.roasters where id = NEW.item_id) then
      raise exception 'Roaster with id % does not exist', NEW.item_id;
    end if;
  elsif NEW.item_type = 'location' then
    if not exists (select 1 from public.locations where id = NEW.item_id) then
      raise exception 'Location with id % does not exist', NEW.item_id;
    end if;
  else
    raise exception 'Invalid item_type: %', NEW.item_type;
  end if;
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists check_curated_item_exists_trigger on public.homepage_curated_items;

create trigger check_curated_item_exists_trigger
before insert or update on public.homepage_curated_items
for each row execute function public.check_curated_item_exists();

-- Enable RLS
alter table public.homepage_curated_items enable row level security;

-- Allow public read access
create policy "Allow read access to all"
on public.homepage_curated_items
for select
using (true);

-- 1. Add new columns
ALTER TABLE public.homepage_curated_items
  ADD COLUMN bean_id uuid REFERENCES public.beans(id),
  ADD COLUMN recipe_id uuid REFERENCES public.recipes(id),
  ADD COLUMN roaster_id uuid REFERENCES public.roasters(id),
  ADD COLUMN location_id uuid REFERENCES public.locations(id);

-- 2. Migrate data
UPDATE public.homepage_curated_items SET bean_id = item_id WHERE item_type = 'bean';
UPDATE public.homepage_curated_items SET recipe_id = item_id WHERE item_type = 'recipe';
UPDATE public.homepage_curated_items SET roaster_id = item_id WHERE item_type = 'roaster';
UPDATE public.homepage_curated_items SET location_id = item_id WHERE item_type = 'location';

-- 3. (Optional) Remove old columns after updating app logic
ALTER TABLE public.homepage_curated_items DROP COLUMN item_id, DROP COLUMN item_type;

-- Drop the trigger and function if they exist
DROP TRIGGER IF EXISTS check_curated_item_exists_trigger ON public.homepage_curated_items;
DROP FUNCTION IF EXISTS public.check_curated_item_exists();