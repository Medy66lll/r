# Testing Guide & Quality Assurance (TESTING.md)

## 1. Test Architecture
The test suite validates correctness, data resilience, and user experience across three tiers:

- **Unit Tests (`tests/unit/`)**:
  - `tokens.test.ts`: Verifies dynamic token replacement (`{rating}`, `{phone}`, `{address}`).
  - `bookingValidation.test.ts`: Verifies Zod schema validation, honeypot bot rejection, and WhatsApp link encoding.
  - `useLiveHours.test.ts`: Verifies Algeria local time (UTC+1) operating status logic.
- **Integration Tests (`tests/integration/`)**:
  - `fallback.test.ts`: Ensures 100% data fidelity when Supabase is unconfigured or offline, validating that all business fields, offerings, hours, reviews, gallery items, and tasks resolve without errors.
- **End-to-End Tests (`tests/e2e/`)**:
  - `landing.spec.ts`: Tests page load, category tab filtering, festoon lighting toggle, and reservation form submission.

## 2. Running Automated Tests

```bash
# Run unit and integration tests
npm test

# Run typecheck and contract verification
npm run verify

# Run Playwright E2E tests
npx playwright test
```

## 3. Testing with a Live Supabase Project
1. Run migrations in your Supabase SQL editor:
   ```bash
   # Run 0001_master_schema.sql, then seed.sql
   ```
2. Copy your project credentials into `.env`:
   ```bash
   VITE_SUPABASE_URL=https://<your-project>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```
3. Run `npm test` to verify live database queries and RLS policy enforcement.
