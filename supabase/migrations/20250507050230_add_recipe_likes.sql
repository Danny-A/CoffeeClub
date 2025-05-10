-- 1. Create the recipe_likes table
create table public.recipe_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now()),
  unique (user_id, recipe_id)
);

-- 1. Drop the old foreign key constraint
ALTER TABLE recipe_likes
  DROP CONSTRAINT IF EXISTS recipe_likes_user_id_fkey;

-- 2. Add the new foreign key constraint
ALTER TABLE recipe_likes
  ADD CONSTRAINT recipe_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- 2. Enable RLS
alter table public.recipe_likes enable row level security;

-- 3. Policy: Allow users to insert their own likes
create policy "Users can like recipes" on public.recipe_likes
  for insert
  with check (auth.uid() = user_id);

-- 4. Policy: Allow users to delete their own likes
create policy "Users can unlike recipes" on public.recipe_likes
  for delete
  using (auth.uid() = user_id);

-- 5. Policy: Allow users to select their own likes
create policy "Users can view their own recipe likes" on public.recipe_likes
  for select
  using (auth.uid() = user_id);

-- 6. Policy: Allow anyone to select likes for a recipe (for like counts)
create policy "Anyone can view likes for a recipe" on public.recipe_likes
  for select
  using (true);
