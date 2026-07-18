-- Run this AFTER backend/scripts/seed_users.py has created the 4 demo accounts.
-- Adds crowd reports and announcements attributed to real demo users
-- (instead of the null-author rows in 002_seed_demo_data.sql).

-- Crowd report by demo staff account
insert into crowd_reports (zone_id, density_level, note, reported_by)
select 'east-stand', 'moderate', 'Reported by demo staff account', id
from auth.users where email = 'staff@stadiumai.demo';

-- Crowd report by demo volunteer account
insert into crowd_reports (zone_id, density_level, note, reported_by)
select 'north-plaza', 'low', 'Reported by demo volunteer account', id
from auth.users where email = 'volunteer@stadiumai.demo';

-- Announcement by demo admin/organizer account
insert into announcements (title, message, severity, audience, created_by)
select
  'Demo Admin Announcement',
  'This announcement was posted by the demo admin account for testing.',
  'info',
  'all',
  id
from auth.users where email = 'admin@stadiumai.demo';

-- Announcement by demo staff account
insert into announcements (title, message, severity, audience, created_by)
select
  'Staff Update',
  'This is a staff-authored announcement created via the demo seed data.',
  'warning',
  'staff',
  id
from auth.users where email = 'staff@stadiumai.demo';

-- Verify: view all demo users and their profile roles
select u.email, p.role, p.full_name
from auth.users u
join profiles p on p.id = u.id
where u.email like '%@stadiumai.demo'
order by u.email;
