# Architecture Decisions (DECISIONS.md)

## ADR-001: Right-Size Build Tier Selection
- **Status**: Accepted
- **Context**: The landing page represents La Terrasse Plus, an independent restaurant in Tlemcen, Algeria, operated by owner Wahid. We evaluated three architectural tiers (Tier A: Static Site, Tier B: Site + Owner Admin, Tier C: Full Enterprise Application).
- **Decision**: Adopt **Tier B (Site plus Owner Admin)**.
- **Rationale**:
  - Tier A is too brittle: Menu prices, daily dishes, and seasonal hours (notably Ramadan) change regularly; without an admin interface, the site becomes outdated within a month.
  - Tier C is over-engineered: Table seating algorithms, multi-branch POS integrations, and automated payment gateways do not match a single-location Algerian restaurant.
  - Tier B provides the exact right balance: Supabase Auth for the owner, secure Postgres tables for business info, hours, offerings, reviews, and reservations, plus Supabase Storage for terrace photos.
- **Upgrade Trigger**: Move to Tier C only if the owner expands to multiple branches across Oran or Algiers requiring centralized inventory and multi-location staff queues.

## ADR-002: Mobile-First MENA Communication Strategy
- **Status**: Accepted
- **Context**: Customers in Algeria rarely use email forms for restaurant reservations; they rely on direct phone calls, WhatsApp messages, or delivery apps (Yassir).
- **Decision**: Maintain dual-action workflows. The booking form writes to the Supabase `reservations` table while simultaneously formatting a prefilled WhatsApp message to `+213552666015`. A sticky mobile bar provides instant one-tap call and WhatsApp triggers.

## ADR-003: Fixed Schema Derived from Contract
- **Status**: Accepted
- **Context**: The `index.html` file includes `#site-data` compliant with `maps-to-landing/site-data@1`.
- **Decision**: Derive PostgreSQL schema strictly from contract buckets:
  - `business` -> `businesses`, `business_hours`, `business_socials`
  - `offerings` -> `offerings`
  - `reviews` -> `reviews`
  - `gallery` -> `gallery_items`
  - `missing` -> `owner_tasks`
  - `content` -> Rendered as React components, expanding tokens (`{rating}`, `{phone}`, `{address}`) at runtime.

## ADR-004: File Length Constraint Enforcement
- **Status**: Accepted
- **Decision**: Strictly maintain a maximum of 250 lines per file across all code, tests, and documentation, splitting components and utilities by single responsibility.
