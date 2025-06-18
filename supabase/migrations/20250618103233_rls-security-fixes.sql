-- Enable RLS on all relevant tables
alter table public.followers enable row level security;
alter table public.bean_varieties enable row level security;
alter table public.varieties enable row level security;
alter table public.tags enable row level security;

-- Followers table policies
create policy "Users can view their own followers and followings" on public.followers
for select
to authenticated
using (
  (select auth.uid()) = follower_id or (select auth.uid()) = user_id
);

create policy "Users can follow others" on public.followers
for insert
to authenticated
with check (
  (select auth.uid()) = follower_id
);

create policy "Users can update their own follow relationships" on public.followers
for update
to authenticated
using (
  (select auth.uid()) = follower_id
)
with check (
  (select auth.uid()) = follower_id
);

create policy "Users can unfollow (delete their own follows)" on public.followers
for delete
to authenticated
using (
  (select auth.uid()) = follower_id
);

-- Bean Varieties table policies
create policy "Anyone can read bean varieties" on public.bean_varieties
for select
to authenticated, anon
using (true);

create policy "Only service_role can insert bean varieties" on public.bean_varieties
for insert
to service_role
with check (true);

create policy "Only service_role can update bean varieties" on public.bean_varieties
for update
to service_role
using (true)
with check (true);

create policy "Only service_role can delete bean varieties" on public.bean_varieties
for delete
to service_role
using (true);

-- Varieties table policies
create policy "Anyone can read varieties" on public.varieties
for select
to authenticated, anon
using (true);

create policy "Only service_role can insert varieties" on public.varieties
for insert
to service_role
with check (true);

create policy "Only service_role can update varieties" on public.varieties
for update
to service_role
using (true)
with check (true);

create policy "Only service_role can delete varieties" on public.varieties
for delete
to service_role
using (true);

-- Tags table policies
create policy "Anyone can read tags" on public.tags
for select
to authenticated, anon
using (true);

create policy "Only service_role can insert tags" on public.tags
for insert
to service_role
with check (true);

create policy "Only service_role can update tags" on public.tags
for update
to service_role
using (true)
with check (true);

create policy "Only service_role can delete tags" on public.tags
for delete
to service_role
using (true);
