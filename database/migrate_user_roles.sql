-- =========================================================
-- ONE-TIME MIGRATION: widen users.role to include 'maintenance_staff'
-- =========================================================
-- SQLite can't ALTER a CHECK constraint directly — it requires
-- rebuilding the table. This is NOT auto-run on every server
-- start (unlike schema_extension.sql) because rebuilding a table
-- on every boot is wasteful and riskier. Run this ONCE, manually,
-- when you're ready to support maintenance staff logins.
--
-- Run it with:
--   node -e "require('./src/config/db')" -- (ensures db.js has run first)
-- then, from the sqlite3 CLI or a small script, execute this file
-- against server/data/campus.db.
-- =========================================================

PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

CREATE TABLE users_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'admin', 'maintenance_staff')) DEFAULT 'student',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO users_new (id, name, email, password_hash, role, created_at)
SELECT id, name, email, password_hash, role, created_at FROM users;

DROP TABLE users;
ALTER TABLE users_new RENAME TO users;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

COMMIT;

PRAGMA foreign_keys = ON;
