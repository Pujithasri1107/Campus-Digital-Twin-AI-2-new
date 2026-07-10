-- =========================================================
-- Campus Digital Twin + AI Maintenance Assistant
-- SCHEMA EXTENSION  (SQLite — extends the existing backend)
-- =========================================================
-- This does NOT touch or break the existing `users` and
-- `complaints` tables your teammate already built. It only
-- ADDS what's missing so the full flow (digital-twin map,
-- AI analysis history, staff dispatch, resolution audit
-- trail, preventive-maintenance detection) is supported.
--
-- Safe to run multiple times (all CREATE TABLE IF NOT EXISTS).
-- =========================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------
-- 1. LOCATIONS — the clickable nodes on the digital twin map
-- Self-referencing so you can nest Building -> Floor -> Room.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS locations (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id     INTEGER REFERENCES locations(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,                 -- e.g. "Room 204"
  type          TEXT NOT NULL CHECK (type IN ('building','floor','room','zone','outdoor_area')),
  building_name TEXT,                          -- denormalized, matches complaints.building for easy joins
  floor_number  INTEGER,
  map_x         REAL,                          -- pixel/percent coords on your 2D digital-twin floor plan
  map_y         REAL,
  latitude      REAL,                          -- optional, if you plot on a real map instead
  longitude     REAL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_locations_parent ON locations(parent_id);
CREATE INDEX IF NOT EXISTS idx_locations_building ON locations(building_name);

-- Link complaints to a structured location (kept alongside the
-- existing free-text building/room columns — nothing breaks).
-- SQLite errors if the column already exists, so this is guarded
-- at the application level in db.js (see updated db.js).
ALTER TABLE complaints ADD COLUMN location_id INTEGER REFERENCES locations(id);

-- ---------------------------------------------------------
-- 2. AI_ANALYSIS — full AI output per complaint (one row each)
-- complaints.category/priority already exist for the simple
-- case (Member 4's PATCH /classification endpoint sets those).
-- This table stores the RICHER analysis: severity, confidence,
-- recurrence detection, and the AI's reasoning — without
-- forcing a rewrite of the existing classification endpoint.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_analysis (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  complaint_id        INTEGER NOT NULL UNIQUE REFERENCES complaints(id) ON DELETE CASCADE,
  predicted_category  TEXT NOT NULL CHECK (predicted_category IN ('Electrical','Plumbing','Furniture','Civil','Other')),
  severity            TEXT NOT NULL CHECK (severity IN ('Minor','Moderate','Severe')),
  confidence_score    REAL,                     -- 0.0 - 1.0
  is_recurring_issue  INTEGER NOT NULL DEFAULT 0 CHECK (is_recurring_issue IN (0,1)),
  recurring_count     INTEGER DEFAULT 0,
  suggested_priority  TEXT NOT NULL CHECK (suggested_priority IN ('Low','Medium','High')),
  ai_notes            TEXT,
  analyzed_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_analysis_complaint ON ai_analysis(complaint_id);

-- ---------------------------------------------------------
-- 3. STAFF_PROFILES — maintenance team members
-- id references users.id directly (a staff member IS a user row).
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS staff_profiles (
  id           INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  specialty    TEXT NOT NULL CHECK (specialty IN ('Electrical','Plumbing','Furniture','Civil','Other')),
  is_available INTEGER NOT NULL DEFAULT 1 CHECK (is_available IN (0,1))
);

-- ---------------------------------------------------------
-- 4. MAINTENANCE_ASSIGNMENTS — admin dispatches a staff member
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS maintenance_assignments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  complaint_id  INTEGER NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  assigned_by   INTEGER NOT NULL REFERENCES users(id),
  assigned_to   INTEGER NOT NULL REFERENCES staff_profiles(id),
  assigned_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at  TEXT,
  remarks       TEXT
);

CREATE INDEX IF NOT EXISTS idx_assignments_complaint ON maintenance_assignments(complaint_id);
CREATE INDEX IF NOT EXISTS idx_assignments_staff ON maintenance_assignments(assigned_to);

-- ---------------------------------------------------------
-- 5. COMPLAINT_STATUS_HISTORY — audit trail for resolutions
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS complaint_status_history (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  complaint_id  INTEGER NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  old_status    TEXT,
  new_status    TEXT NOT NULL,
  changed_by    INTEGER REFERENCES users(id),
  changed_at    TEXT NOT NULL DEFAULT (datetime('now')),
  note          TEXT
);

CREATE INDEX IF NOT EXISTS idx_status_history_complaint ON complaint_status_history(complaint_id);
