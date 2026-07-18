-- Stadium AI - Security fix + new feature schema
-- Run AFTER 001_schema.sql and 002_seed_demo_data.sql

-- ============ FIX: role is no longer trusted from signup metadata ============
-- The auto-create trigger from 001_schema.sql read role from user metadata.
-- Replace it so every new user is created as 'fan' regardless of what the
-- client sends. Elevated roles can only be granted via role_requests below.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'fan'
  );
  return new;
end;
$$ language plpgsql security definer;

-- ============ PROFILE PERSONALIZATION ============
alter table profiles add column if not exists favorite_team text;
alter table profiles add column if not exists preferred_language text not null default 'en';

-- ============ ROLE REQUESTS (approval workflow) ============
create table if not exists role_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_role text not null check (requested_role in ('volunteer','organizer','staff')),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

alter table role_requests enable row level security;

create policy "Users can view own role requests"
  on role_requests for select using (auth.uid() = user_id);

create policy "Users can create own role requests"
  on role_requests for insert with check (auth.uid() = user_id);

-- ============ AUDIT LOG ============
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb,
  created_at timestamptz default now()
);

alter table audit_logs enable row level security;

create policy "Organizer/staff can view audit logs"
  on audit_logs for select using (
    exists (select 1 from profiles where id = auth.uid() and role in ('organizer','staff'))
  );

-- ============ ANNOUNCEMENT TRANSLATIONS ============
create table if not exists announcement_translations (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid not null references announcements(id) on delete cascade,
  language text not null,
  title text not null,
  message text not null,
  created_at timestamptz default now(),
  unique (announcement_id, language)
);

alter table announcement_translations enable row level security;

create policy "Anyone authenticated can view translations"
  on announcement_translations for select using (auth.role() = 'authenticated');

-- ============ FIX: allow updates on gates/announcements (was insert/select only) ============
drop policy if exists "Staff/organizer can manage gates" on gates;
create policy "Staff/organizer can manage gates"
  on gates for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('staff','organizer'))
  );

drop policy if exists "Organizer/staff can create announcements" on announcements;
create policy "Organizer/staff can manage announcements"
  on announcements for all using (
    exists (select 1 from profiles where id = auth.uid() and role in ('organizer','staff'))
  );
