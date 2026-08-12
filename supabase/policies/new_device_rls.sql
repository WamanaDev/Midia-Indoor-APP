-- RLS policies for public.new_device
-- Required by app/pages/Vinculation.tsx (device linking flow):
--   - insert: device writes its own linking code
--   - select: needed for Realtime to deliver postgres_changes DELETE events
--   - delete: device/dashboard removes the code after linking or expiry

create policy "anon can insert linking codes"
on public.new_device
for insert
to anon
with check (true);

create policy "anon can select linking codes"
on public.new_device
for select
to anon
using (true);

create policy "anon can delete linking codes"
on public.new_device
for delete
to anon
using (true);
