-- Delete existing technicians first to avoid duplicates
DELETE FROM technicians WHERE name IN ('Anton', 'Juavaun');

-- Insert technicians
INSERT INTO technicians (name, active) VALUES
  ('Anton', true),
  ('Juavaun', true);