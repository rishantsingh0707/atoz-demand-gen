-- Enable Row Level Security
alter table notes enable row level security;

-- Allow users to read only their own notes
create policy "Users can read their own notes"
on notes
for select
using (
  auth.uid() = user_id
);

-- Allow users to create notes only for themselves
create policy "Users can create their own notes"
on notes
for insert
with check (
  auth.uid() = user_id
);

-- Allow users to delete only their own notes
create policy "Users can delete their own notes"
on notes
for delete
using (
  auth.uid() = user_id
);
