-- Run this in the Supabase SQL editor once you've connected a project.
-- The site works without this — these tables are optional upgrades.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  rating int check (rating between 1 and 5),
  created_at timestamptz default now()
);

-- Recommended: allow inserts from the anon key for contact_messages only,
-- keep testimonials writable from the Supabase dashboard/service role only.
alter table contact_messages enable row level security;
create policy "anyone can submit a contact message"
  on contact_messages for insert
  with check (true);

alter table testimonials enable row level security;
create policy "anyone can read testimonials"
  on testimonials for select
  using (true);
