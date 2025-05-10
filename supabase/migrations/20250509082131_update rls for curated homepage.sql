-- Allow insert for admins and moderators
create policy "Allow insert for admins and moderators"
on public.homepage_curated_items
for insert
with check (
  public.has_role('admin') OR public.has_role('moderator')
);

-- Allow update for admins and moderators
create policy "Allow update for admins and moderators"
on public.homepage_curated_items
for update
using (
  public.has_role('admin') OR public.has_role('moderator')
);

-- Allow delete for admins and moderators
create policy "Allow delete for admins and moderators"
on public.homepage_curated_items
for delete
using (
  public.has_role('admin') OR public.has_role('moderator')
);