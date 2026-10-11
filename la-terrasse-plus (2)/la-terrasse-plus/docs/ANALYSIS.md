# Analysis: La Terrasse Plus (Tlemcen, Algeria)

## 1. Source Landing Page Extraction
- **Business Identity**: La terrasse plus (مطعم لا تيراس بلس), oriental grill restaurant & artisanal pizzeria located at N 1 Hai Nassim, Imama, Tlemcen 13000, Algeria (landmark: next to Taxi Ben Ali).
- **Core Reputation**: 4.4/5 rating across 118 verified Google reviews. Celebrated for tender wood-fired grills, genuine gruyère kebab pizza, signature house burgers on freshly baked matlou3 bread, and an iconic garden terrace photo swing.
- **Design Tokens**:
  - Primary: `#C88A32` (Tlemcen Ochre / Amber Honey)
  - Secondary: `#1E3A2B` (Terrace Cypress / Deep Garden Green)
  - Accent: `#D9532F` (Wood-fire Ember / Flame)
  - Surfaces: `#FAF7F2` (Warm Limestone Ivory), `#FFFFFF` (Cards), `#141210` (Dark Charcoal)
  - Text: `#1C1814` (Deep Espresso Charcoal), `#6B635B` (Muted), `#FAF7F2` (Inverse)
  - Fonts: `Fraunces` (Display Serif), `Plus Jakarta Sans` (Body UI), `Amiri` (Arabic Display)
- **Sections & Hierarchy**:
  1. Header with sticky backdrop blur, brand emblem, contact links, reservation CTA, mobile drawer.
  2. Hero with asymmetric masthead, live open/closed pill, dual CTAs (WhatsApp, Menu), trust badges.
  3. Trust Strip with 4 key metrics (Google rating, wood-fire craft, matlou3 bread, terrace swing).
  4. Signature Section: "La Balançoire à Souvenirs" featuring interactive physics-tilt photo swing & festoon lighting toggle.
  5. Menu / Offerings: Filterable tabs (Tous, Grillades, Entrées, Pizzas, Burgers, Boissons) with 10 signature items priced in DZD.
  6. Story / Philosophy: Culinary heritage of Tlemcen (Hrira, Mhamer sucré-salé) and hospitality of owner Wahid.
  7. Visual Showcase / Gallery: 6 responsive slots with clear `data-slot` anchors.
  8. Social Proof / Reviews: 4 real customer reviews with quotes and Google Maps link.
  9. Practical Info & Map: 7-day schedule, live status indicator, directions, embedded map, phone dialer.
  10. Table Booking Form: Accessible reservation form with name, phone, date, time, guests, zone, notes.
  11. Final CTA Strip: High-impact banner with direct WhatsApp and Call triggers.
  12. Footer & Mobile Bar: Quick links, social channels, copyright, sticky mobile contact bar.

## 2. Business & Owner Real-World Needs
- **Customer Behavior in Algeria/MENA**:
  - Call-first and WhatsApp-first communication: Customers prefer instant WhatsApp chats or direct phone calls over impersonal emails.
  - Cash on Delivery (COD) / Pay-on-arrival: No online credit card payment gateways needed.
  - Delivery app integration: Seamless referral to Yassir Delivery for home orders.
- **Owner Needs (Wahid)**:
  - Menu & price editing: Ability to update prices and offerings due to market fluctuations.
  - Schedule management: Adjust hours for standard seasons vs. holy month of Ramadan.
  - Reservation triage: Central dashboard to view incoming booking requests.
  - Gallery curation: Upload and swap photos of terrace events and new dishes.

## 3. Best-in-Class Hospitality Standards
- High-performance, lightweight mobile-first UI (mobile accounts for >80% of local traffic).
- One-tap communication (tel: and wa.me deep links).
- Bilingual awareness (French primary, Algerian/Arabic cultural resonance).
- Real data integrity: Zero fabricated reviews, real prices in DZD, verified geo-coordinates.

## 4. Scope Definition
- **In Scope**:
  - Full React 18 + TypeScript port of the landing page preserving visual polish and motion.
  - Tier B architecture: Supabase backend with Auth for owner (Wahid), PostgreSQL database for business details, hours, offerings, gallery, and reservation inquiries.
  - Minimalist, fast, mobile-friendly owner admin portal.
  - Local validation with Zod and React Hook Form.
  - Direct WhatsApp booking integration alongside database persistence.
- **Explicitly Out of Scope**:
  - Multi-restaurant multi-tenant SaaS infrastructure.
  - Online credit card processing / payment gateways (not used locally in Tlemcen).
  - Kitchen Display System (KDS) or complex table seating algorithms.
