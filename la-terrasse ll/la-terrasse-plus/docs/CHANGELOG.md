# Changelog (CHANGELOG.md)

All notable changes to this project will be documented in this file.
The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased] - 2026-10-10

### Added
- Phase 0 completion:
  - Verified `index.html` data contract using `tools/check-contract.mjs` against `maps-to-landing/site-data@1`.
  - Created `/docs/ANALYSIS.md` detailing business extraction, owner needs, and MENA restaurant hospitality patterns.
  - Created `/docs/DECISIONS.md` recording ADR-001 (Tier B right-size decision), ADR-002 (WhatsApp communication), and ADR-003 (data contract mapping).
  - Established git repository with clean commit history and git helper tooling.

### Added (Phase 1: Design System)
- Configured `tailwind.config.ts` mapping brand colors, typography, shadows, and radii tokens.
- Created `src/styles/tokens.css` with CSS custom properties and baseline styles.
- Built typed UI primitives in `src/components/ui/`: `Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge`, `StatusPill`, `RatingStars`, `Container`, `Section`, `Heading`, `Modal`, `Skeleton`.
- Built Framer Motion animation variants and hooks in `src/lib/motion/` with reduced motion support.
- Authored `/docs/DESIGN_SYSTEM.md` documenting typography scale, color tokens, and motion guidelines.

### Added (Phase 2: Architecture & System Design)
- Established feature-based directory hierarchy (`/src/features/{site,admin,auth}`, `/src/components`, `/src/lib`, `/src/hooks`, `/supabase`, `/tests`).
- Created `/docs/ARCHITECTURE.md` with Mermaid data flow diagram, routing strategy, and SWR offline fallback architecture.
- Updated `/docs/PROJECT_STRUCTURE.md` and created `/docs/SYSTEM_INSTRUCTIONS.md` defining context retention rules and file limits.

### Added (Phase 3: Database & Schema)
- Created idempotent master schema `/supabase/migrations/0001_master_schema.sql` with tables, indexes, triggers, and comprehensive RLS policies.
- Created `/supabase/seed/seed.sql` mapping `#site-data` to relational tables with numeric prices and `missing[]` tasks.
- Generated typed database interfaces in `src/types/database.ts`.
- Documented schema, Mermaid ER diagram, and RLS policy matrix in `/docs/DATABASE.md`.

### Added (Phase 4: Backend & Security)
- Created Supabase client `src/lib/supabase/client.ts` with connection verification.
- Built static fallback provider `src/lib/supabase/fallback.ts` ensuring zero-failure rendering.
- Built typed query access layer `src/lib/supabase/queries.ts`.
- Implemented Zod schema validation and WhatsApp formatter in `src/lib/validation/booking.ts`.
- Created Supabase Edge Function `supabase/functions/booking-notify/index.ts` with anti-bot honeypot and rate limiting.
- Authored `/docs/SECURITY.md` covering RLS matrix and Algerian personal data protection compliance.

### Added (Phase 5: Frontend Build)
- Created layout modules `Header`, `Footer`, and `MobileActionBar`.
- Ported all 8 landing page sections: `HeroSection`, `TrustSection`, `SignatureSwingSection`, `MenuSection`, `StorySection`, `GallerySection`, `ReviewsSection`, `PracticalInfoSection`, `BookingSection`, `CtaBannerSection`.
- Built owner admin portal `src/features/admin/AdminDashboard.tsx` with offerings toggles, reservations overview, and tasks checklist.
- Built owner authentication form `src/features/auth/LoginForm.tsx`.
- Built `src/App.tsx` router controller and dynamic JSON-LD injector `src/lib/seo.ts`.
- Implemented `useLiveHours` hook with Algeria timezone calculation.

### Added (Phase 6: Testing & Quality Verification)
- Authored unit test suites for token interpolation, Zod validation, and Algeria operating hours in `tests/unit/`.
- Authored integration test suite for static fallback provider in `tests/integration/`.
- Authored Playwright E2E spec for public site landing, menu filtering, and table booking in `tests/e2e/`.
- Created `/docs/TESTING.md` guide and automated runner `tools/run_verify.mjs`.

### Added (Phase 7: Deploy Readiness & Docs)
- Created `vercel.json` with CSP, X-Frame-Options, permissions policy, and SPA routing rewrites.
- Authored production `README.md` with 5-step quick setup, script list, and deployment runbook.
- Conducted full-codebase audit confirming 100% adherence to <= 250 lines rule and clean Git state.
