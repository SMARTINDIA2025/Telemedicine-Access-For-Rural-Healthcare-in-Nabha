# Panchakarma Management Software — PRD, Architecture & MVP Plan

## 1) Product Summary

A platform that digitizes end‑to‑end Panchakarma operations for clinics/spas and patients. It automates therapy scheduling, standardizes procedures, and powers patient‑centric care via notifications, real‑time session tracking, and a continuous feedback loop that refines care plans.

**Primary Outcomes**

* Reduce admin time (scheduling, documentation) by ≥60%.
* Increase therapy adherence and consistency across centers.
* Improve patient satisfaction & outcomes with timely guidance and adaptive plans.

**Target Users**

* **Patients**: book sessions, receive pre/post guidance, track progress, log feedback.
* **Practitioners/Therapists**: view schedules, run SOP checklists, track progress, document outcomes.
* **Clinic Admins**: manage resources (rooms, equipment, oils), staff rosters, templates, billing.
* **Medical Directors**: define protocols, review analytics, audit quality.

---

## 2) Core Features (MVP)

1. **Automated Therapy Scheduling**

   * Constraint‑aware planner: practitioner availability, room/equipment capacity, therapy sequence rules, buffers (e.g., rest after Snehana), gender/privacy constraints, and patient preferences.
   * Multi‑center time‑zone & holiday calendars.
   * Reschedule & conflict resolution assistance with explainable reasons.

2. **Pre‑ and Post‑Procedure Notifications**

   * Playbook‑driven reminders (e.g., diet, hydration, medications to avoid, rest recommendations).
   * Channels: in‑app push, SMS, email (per‑patient preferences).
   * Smart timing (e.g., 24h prior, 2h prior, immediate post‑session, day‑after check‑in).

3. **Real‑Time Therapy Tracking**

   * Live session status: **Scheduled → In‑Preparation → In‑Session → Recovery → Completed**.
   * Patient view: countdown to next session, today’s do’s & don’ts, recovery milestones.
   * Practitioner view: step‑by‑step SOP with timers, safety checks, dosage logs, materials consumed.

4. **Visualization Tools**

   * Progress graphs: symptom scores over time, PROMs/Prems, adherence, HRV/weight/sleep if connected.
   * Milestone bars: planned vs completed sessions, recovery stage completion.

5. **Integrated Feedback Loop**

   * After each session: patient‑reported outcomes (symptom relief, side‑effects).
   * Rule/ML layer updates: adjust frequency/sequence, modify precautions, flag supervision needs.

---

## 3) Key User Journeys

**Patient**

1. Books Panchakarma package → completes intake (dosha questionnaire, comorbidities, preferences).
2. Receives pre‑procedure guidance → attends sessions → logs feedback → sees progress charts.

**Practitioner**

1. Opens today’s list → runs SOP checklist per session → logs vitals, materials, deviations.
2. Confirms completion → triggers post‑care notifications.

**Admin**

1. Imports staff roster & rooms → sets package templates → monitors utilization & no‑show rate.

---

## 4) Scheduling Engine — Design

**Inputs**

* Patient: availability, constraints, therapy plan (e.g., 7‑day Virechana protocol), clinical flags.
* Resources: therapists (skills, gender), rooms, equipment, consumables.
* Rules: sequence dependencies (e.g., Snehana → Swedana → Virechana), min/max gaps, buffers, duration ranges.

**Approach**

* Start with a **constraint‑based greedy + backtracking** scheduler (deterministic, explainable), evolving to MILP if needed.
* Priority queue by: medical urgency > plan deadline adherence > patient preference score > resource utilization.
* Conflict resolver explains: “Room R2 unavailable 10:00–11:00; moved to 11:30 with Therapist T3.”

**Pseudocode (high‑level)**

```
for each therapy in required_sequence(patient):
  candidate_slots = intersect(patient_availability, therapist_skills, room_free, buffers)
  score(slot) = on_time_adherence + patient_pref_fit + resource_load_balance
  choose best slot; if none → backtrack previous step; if still none → raise conflict to admin.
```

**Edge Cases**

* Double‑booking prevention, over‑run handling with dynamic extensions, sick‑leave auto‑reassignment, multi‑patient group therapies (e.g., yoga/steam room).

---

## 5) Notification Service

* **Templates** per protocol & language (EN/HI + extensible):

  * *Pre* (T‑24h, T‑2h): fasting, hydration, medications to avoid, bring loose clothing.
  * *Post* (T+1h, T+12h, T+24h): diet, activity limits, sleep posture, signs that require contact.
* **Channels**: In‑app (FCM/APNS), SMS (Twilio/MSG91), Email (SES/SendGrid).
* **Rules**: If patient reports side‑effect X → send safety guidance Y → escalate to clinician if moderate/severe.
* **Preference Center**: opt‑in/out per channel; quiet hours.

---

## 6) Data Model (Relational, e.g., Postgres)

**Tables**

* `users` (id, role\[patient/practitioner/admin], name, phone, email, locale, consents)
* `patients` (user\_id FK, MRN, DOB, sex, comorbidities, allergies, dosha\_profile, preferences)
* `practitioners` (user\_id FK, skills\[], license\_no, center\_id)
* `centers` (id, name, tz, address)
* `rooms` (id, center\_id, type, capacity, gender\_restriction)
* `resources` (id, center\_id, type, stock\_qty, unit)
* `protocol_templates` (id, name, description, steps\[jsonb])
* `care_plans` (id, patient\_id, protocol\_template\_id, start\_target, status)
* `sessions` (id, care\_plan\_id, therapy\_type, scheduled\_start, scheduled\_end, room\_id, practitioner\_id, status)
* `session_logs` (session\_id, vitals jsonb, materials\_used jsonb, notes, deviations)
* `symptom_tracks` (patient\_id, date, symptom\_code, value, scale)
* `notifications` (id, user\_id, channel, template\_id, scheduled\_at, sent\_at, status)
* `feedback` (session\_id, patient\_id, side\_effects jsonb, PROMs jsonb, free\_text)
* `audit_events` (id, actor\_id, action, entity, before, after, ts)

**JSONB Examples**

* `protocol_templates.steps`: `[ {"therapy":"Snehana", "duration_min":45, "buffer_min":30}, ... ]`
* `symptom_tracks.value`: numeric 0–10 or standardized scale.

---

## 7) API Design (REST + WebSockets)

**Auth**: OAuth2/OIDC (clinics’ IdP) + optional OTP for patients. RBAC middleware.

**REST Endpoints (sample)**

* `POST /patients` — create patient (with consents).
* `POST /care-plans` — create from `protocol_template_id` + start date.
* `POST /schedule/auto` — run scheduler for a care plan.
* `GET /sessions?patient_id=...&from=...&to=...`
* `PATCH /sessions/{id}` — reschedule/cancel.
* `POST /feedback` — submit post‑session feedback.
* `GET /progress/{patient_id}` — aggregates for charts.
* `POST /notifications/test` — send preview to user.

**WebSocket Topics**

* `/ws/patient/{id}/timeline` — live status & milestones.
* `/ws/center/{id}/board` — today’s sessions, room occupancy.

---

## 8) Frontend (Web + Mobile)

**Tech**: React/Next.js + React Native (or Flutter). State via React Query/Zustand. i18n, RTL.

**Screens**

* **Patient App**: Home (next session + prep), Timeline, Feedback, Progress graphs, Messages, Preferences.
* **Practitioner App**: My Day, Session Detail with SOP checklist & timers, Incident report, Quick notes.
* **Admin Console**: Calendar (resources overlay), Roster, Protocol templates, Inventory, Analytics.

**UX Details**

* Color‑coded status chips. Large tap targets. Offline notes with sync.
* Progress visuals: line charts for symptom scores; progress bars for milestone completion.

---

## 9) Feedback Loop & Adaptation

**Rule Examples**

* If patient reports **nausea ≥ 6/10** after Virechana → auto‑schedule clinician call within 24h; modify next session intensity by −20%; send diet alert.
* If adherence < 70% over 1 week → extra reminders + motivational nudge; propose different time slots.

**ML (Phase 2)**

* Learn best slot patterns to minimize no‑shows.
* Predict side‑effect risk to pre‑emptively tailor precautions.

---

## 10) Security, Privacy, Compliance

* PHI safeguards: encryption in transit (TLS) & at rest (AES‑256). Field‑level encryption for sensitive notes.
* RBAC + least privilege; patient‑practitioner scoping by center.
* Consent & purpose limitation; data retention policies; audit trails.
* Regional hosting (e.g., India data residency if required).

---

## 11) Integrations

* **Calendars**: Google/Microsoft (practitioner view‑only or two‑way with approval).
* **Comms**: SMS/Email providers; FCM/APNS for push.
* **Wearables (optional)**: Apple Health/Google Fit integration for vitals.
* **Billing (Phase 2)**: basic invoicing or clinic HIS/EMR bridge.

---

## 12) Deployment & DevOps

* **Backend**: Node.js (NestJS) or Python (FastAPI). Postgres + Redis (jobs/cache). Celery/BullMQ workers.
* **Infra**: Docker + Kubernetes; Horizontal Pod Autoscaling; managed Postgres; object storage for docs.
* **Observability**: OpenTelemetry, Prometheus, Grafana, Sentry.
* **CI/CD**: GitHub Actions; Canary releases; feature flags.

---

## 13) Scheduling Constraints Library (Examples)

* `requires_sequence([Snehana, Swedana, Virechana])`
* `min_gap(Snehana, Swedana) = 30 min`
* `same_practitioner(Snehana, Swedana) = preferred`
* `room_type(Virechana) ∈ {Therapy, Private}`
* `gender_match(patient, therapist) = required if flag == true`
* `max_daily_sessions(patient) = 2`

---

## 14) Sample Notification Templates

**Pre‑Procedure (T‑24h)**

* Subject: “Prep for your {therapy} tomorrow”
* Body: “Avoid heavy meals after 8pm. Hydrate well. Bring loose cotton clothing. Inform us if fever/cold.”

**Post‑Procedure (T+2h)**

* “Rest for the next 4–6 hours. Light warm liquids only. Avoid strenuous activity. If dizziness, reply ‘HELP’.”

**Check‑in (T+24h)**

* “How are you feeling after {therapy}? 0 (worse) → 10 (much better). Tap to share.”

---

## 15) Example Progress Metrics (Dashboards)

* Symptom score trend per patient & per protocol.
* Adherence & reminder effectiveness (open/click → attended).
* Resource utilization (therapist, room) & bottlenecks.
* Complication rates by protocol step (quality audits).

---

## 16) Sample SQL Schemas (abridged)

```sql
CREATE TABLE protocol_templates (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  steps JSONB NOT NULL
);

CREATE TABLE care_plans (
  id UUID PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES patients(user_id),
  protocol_template_id UUID NOT NULL REFERENCES protocol_templates(id),
  start_target TIMESTAMPTZ,
  status TEXT DEFAULT 'active'
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  care_plan_id UUID REFERENCES care_plans(id),
  therapy_type TEXT,
  scheduled_start TIMESTAMPTZ,
  scheduled_end TIMESTAMPTZ,
  room_id UUID REFERENCES rooms(id),
  practitioner_id UUID REFERENCES practitioners(user_id),
  status TEXT CHECK (status IN ('scheduled','in_prep','in_session','recovery','completed','cancelled'))
);
```

---

## 17) Quality & SOPs

* Protocol templates versioning with effective dates.
* Mandatory SOP checklist completion before session can be marked “completed”.
* Incident/near‑miss reporting with severity levels and resolution workflow.

---

## 18) Roadmap

**MVP (8–10 weeks)**

* Scheduling engine v1, notifications, session tracker, progress charts, feedback forms, admin calendar.

**v1.1**

* Calendar integrations, multilingual templates, inventory usage tracking, printable discharge summary.

**v1.2**

* Adaptive scheduling (learned preferences), risk alerts, outcomes benchmarking across centers.

---

## 19) KPIs & Success Criteria

* Booking‑to‑start time ↓, no‑show rate ↓, protocol adherence ↑.
* Patient PROMs improvement
