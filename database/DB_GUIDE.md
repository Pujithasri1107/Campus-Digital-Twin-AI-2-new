# DB Engineer Deliverable — Campus Digital Twin + AI Maintenance Assistant

## What was already there
Your teammate (Member 2 scope) built a working Node.js + Express backend using
SQLite (`node:sqlite`, built into Node — no separate DB server needed). It had
2 tables: `users` and `complaints`, plus full auth, CRUD, and admin-stats APIs.
Tested, working, connected to the frontend's expected request shapes.

## What this adds
5 new tables so the DB actually supports your full 11-step flow — the digital
twin map, AI's richer analysis, staff dispatch, and the resolution audit trail
— **without changing or breaking anything that already works.**

| File | Purpose |
|---|---|
| `db.js` | Drop-in replacement for `backend/server/src/config/db.js`. Contains the original schema unchanged, plus the 5 new tables, auto-created on server start. |
| `schema_extension.sql` | Same schema extension as plain SQL, for reference / running manually against `campus.db` with a SQLite client if you don't want to touch `db.js` directly. |
| `migrate_user_roles.sql` | Optional, one-time: widens `users.role` to allow `'maintenance_staff'` (SQLite needs a table rebuild for this, so it's kept separate — see below). |
| `seed.sql` | Sample data — locations, a complaint, AI analysis, an assignment — so you have something to demo immediately. |

## How to deploy it (literally what to do)

1. **Back up first.** Copy `backend/server/data/campus.db` somewhere safe. If anything goes wrong you can always restore it.
2. **Replace the DB config file.**
   ```bash
   cp db.js backend/server/src/config/db.js
   ```
3. **Start the server as usual.**
   ```bash
   cd backend/server
   npm start
   ```
   On boot, `initSchema()` runs and creates the 5 new tables (`locations`,
   `ai_analysis`, `staff_profiles`, `maintenance_assignments`,
   `complaint_status_history`) plus adds a `location_id` column to
   `complaints`. This is idempotent — safe to restart the server as many
   times as you want.
4. **(Optional) Widen the role check**, once you're ready to log in actual
   maintenance staff as their own role instead of reusing `'admin'`:
   ```bash
   sqlite3 backend/server/data/campus.db < migrate_user_roles.sql
   ```
   If you don't have the `sqlite3` CLI, Node's built-in module works too —
   ask me and I'll give you a one-line script.
5. **(Optional) Load sample data** to demo with:
   ```bash
   sqlite3 backend/server/data/campus.db < seed.sql
   ```

## How the new tables map to your flow

| Flow step | Table |
|---|---|
| Step 3 — pin location on digital twin | `locations` (self-referencing: building → floor → room) |
| Step 4 — photo + description | already in `complaints` (`photo_path`, `description`) |
| Step 5 — AI analyzes | `ai_analysis` (category, severity, confidence, notes) |
| Step 6 — AI checks history | query: count `ai_analysis` rows by category at the same `location_id` |
| Step 7 — AI assigns priority | `ai_analysis.suggested_priority`, mirrored onto `complaints.priority` via the existing `PATCH /classification` endpoint |
| Step 8 — admin dashboard | a join across `complaints` + `locations` + `ai_analysis` |
| Step 9 — dispatch team | `staff_profiles` + `maintenance_assignments` |
| Step 10 — mark resolved | `complaint_status_history` (audit trail) + existing `PATCH /status` |
| Step 11 — preventive maintenance | query: `GROUP BY building, category HAVING count >= 3` over the last 90 days |

## Queries you'll actually use

**Has this location had repeated problems? (step 6)**
```sql
SELECT COUNT(*) AS prior_incidents
FROM ai_analysis a
JOIN complaints c ON c.id = a.complaint_id
WHERE c.location_id = ?
  AND a.predicted_category = ?
  AND c.created_at > datetime('now', '-6 months');
```

**Admin dashboard feed (step 8)**
```sql
SELECT c.id, c.title, c.description, c.photo_path, c.status, c.priority, c.created_at,
       l.name AS location_name, l.building_name,
       a.predicted_category, a.severity, a.is_recurring_issue, a.recurring_count
FROM complaints c
LEFT JOIN locations l ON l.id = c.location_id
LEFT JOIN ai_analysis a ON a.complaint_id = c.id
ORDER BY
  CASE c.priority WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END,
  c.created_at DESC;
```

**Preventive maintenance suggestion (step 11)**
```sql
SELECT l.building_name, a.predicted_category, COUNT(*) AS issue_count
FROM complaints c
JOIN locations l ON l.id = c.location_id
JOIN ai_analysis a ON a.complaint_id = c.id
WHERE c.created_at > datetime('now', '-90 days')
GROUP BY l.building_name, a.predicted_category
HAVING COUNT(*) >= 3
ORDER BY issue_count DESC;
```

## Is the DB role actually complete now?

**Yes, for the schema/design side of the role:**
- Full schema covering every step of your flow ✅
- Deployed in a form that actually plugs into the real, working backend ✅
- Seed data to demo with ✅
- ER diagram ✅
- Documented queries for the AI and dashboard features ✅

**Still open — talk to your team about who owns these:**
- **Member 4's AI module** still needs to actually call an AI model and
  write into `ai_analysis` — the table's ready, but nothing populates it yet.
  The existing `PATCH /complaints/:id/classification` endpoint is the
  integration point for the simple case; you'll want a new endpoint (e.g.
  `POST /api/complaints/:id/ai-analysis`) for the richer `ai_analysis` table.
- **Frontend** (`CampusMap.tsx`) needs to actually send a `location_id` when
  a student pins a spot on the map — right now it likely just sends free-text
  `building`/`room`. Check with whoever owns that component.
- **Staff dispatch UI** — `MaintenanceDashboard.tsx` would need a way for
  admins to pick a `staff_profiles` row and hit a new assignment endpoint
  (not built yet — DB-side is ready, API route isn't).
- No RLS-equivalent needed here — SQLite has no row-level security, but your
  backend already handles authorization in the controllers (`req.user.role`,
  ownership checks), which is the correct approach for this stack.

If you want, I can also write the new Express routes/controllers for
`ai_analysis` and `maintenance_assignments` (matching the existing code
style) so the whole thing is wired end-to-end rather than just DB-ready.
