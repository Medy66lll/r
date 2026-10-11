# Security Architecture & Compliance (SECURITY.md)

## 1. Threat Model & Tier B Defenses
This application processes public restaurant landing page traffic and table reservations while securing an owner-restricted admin portal.

### Row Level Security (RLS)
- Enabled on all tables (`businesses`, `business_hours`, `offerings`, `reviews`, `gallery_items`, `reservations`, `owner_tasks`, `profiles`).
- Public `anon` role is strictly restricted to:
  - `SELECT` on published businesses, offerings, hours, reviews, and gallery items.
  - `INSERT` only on `reservations` with column validation (`name <> '' AND phone <> ''`).
- Owner role is strictly verified via JWT `auth.uid() = owner_id` or role checks in `profiles`.

### Input Validation & Sanitization
- Client and server-side validation using **Zod** (`bookingSchema`).
- Anti-spam honeypot input field (`honeypot`) that rejects silent automated bots.
- Phone number pattern matching with international prefix support.
- SQL injection prevention through parameterized queries via Supabase client.

## 2. Secrets Management & Environment Isolation
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are the only exposed client keys.
- The Supabase `service_role` key is **NEVER** embedded in client builds or stored in git.
- `.env.example` provides the exact variable keys required for local and production deployment.

## 3. Compliance: Algerian Personal Data Protection (Law n° 18-07 / 25-11)
In accordance with Algerian legislation regarding the protection of individuals in the processing of personal data:
1. **Purpose Limitation**: Customer data collected (name, phone number) is used solely for table reservation management and phone/WhatsApp confirmation.
2. **Data Minimization**: No credit card, national ID, or tracking identifiers are collected.
3. **Data Retention**: Table reservations older than 90 days are purged or anonymized.
4. **User Rights**: Customers may contact owner Wahid at `0552 66 60 15` to modify or remove reservation records.
