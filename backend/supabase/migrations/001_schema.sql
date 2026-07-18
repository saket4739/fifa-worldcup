-- Stadium AI - Core schema
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)

-- ============ PROFILES ============
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'fan' check (role in ('fan','volunteer','organizer','staff')),
  language text default 'en',
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view all profiles"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Auto-create a profile row on signup, reading role from signup metadata
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'fan')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============ GATES (stadium map points) ============
create table if not exists gates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  zone_id text not null,
  latitude double precision not null,
  longitude double precision not null,
  accessible boolean default false,
  status text default 'open' check (status in ('open','closed','congested')),
  created_at timestamptz default now()
);

alter table gates enable row level security;

create policy "Anyone authenticated can view gates"
  on gates for select using (auth.role() = 'authenticated');

create policy "Staff/organizer can manage gates"
  on gates for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff','organizer'))
  );

-- ============ CROWD REPORTS ============
create table if not exists crowd_reports (
  id uuid primary key default gen_random_uuid(),
  zone_id text not null,
  density_level text not null check (density_level in ('low','moderate','high','critical')),
  note text,
  reported_by uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table crowd_reports enable row level security;

create policy "Anyone authenticated can view crowd reports"
  on crowd_reports for select using (auth.role() = 'authenticated');

create policy "Staff/organizer/volunteer can create crowd reports"
  on crowd_reports for insert with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff','organizer','volunteer'))
  );

-- Enable Realtime for live crowd dashboard updates
alter publication supabase_realtime add table crowd_reports;

-- ============ ANNOUNCEMENTS ============
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  severity text default 'info' check (severity in ('info','warning','critical')),
  audience text default 'all' check (audience in ('all','fan','volunteer','organizer','staff')),
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table announcements enable row level security;

create policy "Anyone authenticated can view relevant announcements"
  on announcements for select using (auth.role() = 'authenticated');

create policy "Organizer/staff can create announcements"
  on announcements for insert with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('organizer','staff'))
  );

alter publication supabase_realtime add table announcements;

-- ============ CHAT LOGS (optional audit trail) ============
create table if not exists chat_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  message text not null,
  reply text not null,
  created_at timestamptz default now()
);

alter table chat_logs enable row level security;

create policy "Users can view own chat logs"
  on chat_logs for select using (auth.uid() = user_id);

create policy "Users can insert own chat logs"
  on chat_logs for insert with check (auth.uid() = user_id);
