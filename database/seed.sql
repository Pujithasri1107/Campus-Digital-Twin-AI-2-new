-- =========================================================
-- SEED DATA — sample rows for demoing the full flow
-- Run AFTER schema_extension.sql (and after your app has
-- created at least one student + one admin via /api/auth/register)
-- =========================================================

-- ---- Locations (digital twin nodes) ----
INSERT INTO locations (name, type, building_name, floor_number) VALUES
  ('Block A', 'building', 'Block A', NULL),
  ('Block A - Floor 2', 'floor', 'Block A', 2),
  ('Room 204', 'room', 'Block A', 2),
  ('Block A - Washroom (2F)', 'zone', 'Block A', 2),
  ('Block C', 'building', 'Block C', NULL),
  ('Block C - Floor 1', 'floor', 'Block C', 1),
  ('Room 101', 'room', 'Block C', 1),
  ('Main Garden', 'outdoor_area', NULL, NULL);

-- ---- Sample students (skip if you already registered real users) ----
-- password_hash below is a placeholder — real rows come from /api/auth/register
-- which bcrypt-hashes properly. Only use this for quick manual testing.
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Asha Rao', 'asha@campus.edu', '$2a$10$placeholderplaceholderplaceholderplaceh', 'student'),
  ('Admin One', 'admin@campus.edu', '$2a$10$placeholderplaceholderplaceholderplaceh', 'admin'),
  ('Ravi Kumar', 'ravi.electrician@campus.edu', '$2a$10$placeholderplaceholderplaceholderplaceh', 'admin');
  -- Ravi is flagged 'admin' here only because SQLite's CHECK constraint
  -- doesn't yet allow 'maintenance_staff' — run migrate_user_roles.sql first,
  -- then change this role to 'maintenance_staff'.

-- ---- Staff profile (assuming Ravi's user id is 3 — check with SELECT first) ----
INSERT INTO staff_profiles (id, specialty, is_available) VALUES
  (3, 'Electrical', 1);

-- ---- A sample complaint (assuming Asha's id is 1, Room 204's id is 3) ----
INSERT INTO complaints (user_id, title, description, building, room, category, priority, status, location_id)
VALUES (1, 'Ceiling fan not working', 'The fan in Room 204 has stopped completely, makes a clicking noise.', 'Block A', '204', 'Uncategorized', 'Medium', 'Open', 3);

-- ---- AI analysis for that complaint (assuming complaint id is 1) ----
INSERT INTO ai_analysis (complaint_id, predicted_category, severity, confidence_score, is_recurring_issue, recurring_count, suggested_priority, ai_notes)
VALUES (1, 'Electrical', 'Moderate', 0.86, 1, 2, 'High', 'Clicking noise indicates possible motor/wiring fault; 2 prior electrical complaints logged at this location in the last 6 months.');

-- Reflect the AI's suggestion back onto the complaint's simple fields
-- (this is what Member 4's AI module would do via PATCH /classification)
UPDATE complaints SET category = 'Electrical', priority = 'High' WHERE id = 1;

-- ---- Assignment: admin dispatches Ravi ----
INSERT INTO maintenance_assignments (complaint_id, assigned_by, assigned_to, remarks)
VALUES (1, 2, 3, 'Please check wiring behind the fan mount.');

-- ---- Status history ----
INSERT INTO complaint_status_history (complaint_id, old_status, new_status, changed_by, note)
VALUES (1, 'Open', 'In Progress', 2, 'Assigned to electrician Ravi Kumar.');

UPDATE complaints SET status = 'In Progress' WHERE id = 1;
