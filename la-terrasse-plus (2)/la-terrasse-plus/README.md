# La Terrasse Plus — Production Web Application

Production-ready full-stack web application for **La Terrasse Plus** (مطعم لا تيراس بلس), a celebrated oriental grill restaurant and artisanal pizzeria in Hai Nassim, Imama, Tlemcen, Algeria. Built with React 18, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

---

## Quick Setup in 5 Steps

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Note: If Supabase keys are left empty, the application runs in zero-failure offline mode using verified seed data).*

3. **Database Initialization (Supabase)**:
   In your Supabase project's SQL Editor:
   - Run `/supabase/migrations/0001_master_schema.sql` (Creates tables, triggers, indexes, and RLS policies).
   - Run `/supabase/seed/seed.sql` (Seeds verified business data, offerings, and owner tasks).

4. **Link the Owner Profile**:
   Create the owner user (`wahid@laterrasseplus.dz`) in Supabase Auth, then run:
   ```sql
   UPDATE businesses
   SET owner_id = (SELECT id FROM auth.users WHERE email = 'wahid@laterrasseplus.dz')
   WHERE id = 'b0000000-0000-0000-0000-000000000001';
   ```

5. **Start Development**:
   ```bash
   npm run dev
   ```

---

## Available Scripts

- `npm run dev`: Starts local Vite development server.
- `npm run build`: Typechecks and bundles production assets.
- `npm run verify`: Runs complete quality gate verification (contract check, tests, file limits).
- `npm test`: Runs Vitest unit and integration suites.
- `npm run test:e2e`: Runs Playwright end-to-end specifications.

---

## Architecture & Features

- **Tier B Architecture**: Fast public single-page landing with a lightweight owner management portal (`/admin`).
- **Signature Experience**: Interactive swinging photo frame ("La Balançoire à Souvenirs") with physics-based mouse sway and evening festoon lighting toggle.
- **MENA-Optimized Booking**: Table booking form persists to database and opens formatted WhatsApp message to `+213 552 66 60 15`.
- **Live Status Indicator**: Real-time operating hours computed for Algeria timezone (`Africa/Algiers`, UTC+1).
- **Strict Hard Rules**: Every file strictly maintained under 250 lines, split by domain responsibility.
- **Vercel Deploy Ready**: Includes `vercel.json` with security headers and SPA rewrites.
