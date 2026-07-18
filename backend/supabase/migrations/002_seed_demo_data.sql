-- Demo/fictional data for MetLife Stadium (East Rutherford, NJ) — a real FIFA World Cup 2026 venue.
-- Run AFTER 001_schema.sql. Safe to re-run (uses fixed UUIDs via gen_random_uuid per run is fine for demo).

insert into gates (name, zone_id, latitude, longitude, accessible, status) values
  ('Gate A - Main Entrance', 'north-plaza', 40.8135, -74.0745, true, 'open'),
  ('Gate B - East Concourse', 'east-stand', 40.8130, -74.0730, true, 'open'),
  ('Gate C - West Concourse', 'west-stand', 40.8128, -74.0765, false, 'congested'),
  ('Gate D - South Plaza', 'south-plaza', 40.8115, -74.0748, true, 'open'),
  ('Gate E - Accessible Entrance', 'north-plaza', 40.8138, -74.0752, true, 'open'),
  ('Gate F - VIP/Media', 'east-stand', 40.8132, -74.0722, true, 'closed');

insert into crowd_reports (zone_id, density_level, note, reported_by) values
  ('north-plaza', 'moderate', 'Steady flow, no issues', null),
  ('west-stand', 'high', 'Long queue at Gate C, consider opening extra lane', null),
  ('south-plaza', 'low', 'Clear', null);

insert into announcements (title, message, severity, audience, created_by) values
  ('Welcome to MetLife Stadium', 'Gates open 3 hours before kickoff. Please have your digital ticket ready.', 'info', 'all', null),
  ('Gate C Congestion', 'Gate C (West Concourse) is experiencing delays. Fans are advised to use Gate B or D.', 'warning', 'fan', null),
  ('Volunteer Briefing', 'All volunteers report to the South Plaza staff tent 2 hours before kickoff.', 'info', 'volunteer', null);
