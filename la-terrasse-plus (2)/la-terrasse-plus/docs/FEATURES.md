# Features (FEATURES.md): La Terrasse Plus Web Application

## Public Facing Customer Features
- **Hero & Live Status**:
  - High-impact asymmetric hero section with real Google rating (4.4/5, 118 reviews).
  - Real-time "Open Now" logic synchronized with Algeria local time (UTC+1, Africa/Algiers).
  - Direct WhatsApp ordering and phone call deep-links.
- **Trust Strip**:
  - Highlighted badges for wood-fired cooking, daily baked artisanal matlou3 bread, and verified customer feedback.
- **Signature Feature: La Balançoire à Souvenirs**:
  - Interactive swinging photo frame with physics-based mouse-tilt movement.
  - Interactive "Mode Soirée" toggle activating glowing festoon garland string lights.
  - Real customer quote from Zoulikha Dalaa celebrating the iconic terrace swing.
- **Interactive Menu / Offerings**:
  - Filterable tabs by cuisine category: Tout, Grillades & Plats, Entrées du Terroir, Pizzas Artisanales, Burgers & Matlou3, Boissons & Cocktails.
  - Authentic prices in Algerian Dinars (DZD), ingredient highlights, badges (Coup de cœur, Spécialité Tlemcen, Matlou3 maison), and Halal certification.
- **Brand Story & Local Heritage**:
  - Narrative celebrating Tlemcen's culinary traditions (Hrira tlemcénienne, Mhamer sucré-salé) and the hospitality of owner Wahid.
- **Photo Showcase Gallery**:
  - Responsive visual slots with structured data attributes (`data-slot`) for terrace, grills, pizza, and dining spaces.
- **Social Proof & Verified Reviews**:
  - Carousel and masonry review cards quoting real feedback from Google Maps and Facebook.
- **Practical Information & Map**:
  - Full address in Hai Nassim, Imama (adjacent to Taxi Ben Ali).
  - 7-day schedule table with today's hours dynamically highlighted.
  - Embedded Google Map iframe and instant navigation deep-links.
- **Table Booking Flow**:
  - Accessible form with validation for name, phone, date, time, party size, zone preference, and notes.
  - Dual action: saves to database and opens preformatted WhatsApp booking message.
- **Mobile Bottom Bar**:
  - Fixed dock on small screens providing 1-tap call and WhatsApp triggers.

## Owner Admin Features (Tier B)
- **Authentication**:
  - Secure email/password login restricted to owner.
- **Business Details & Hours**:
  - Quick editor for phone, address, and seasonal schedule changes (standard vs. Ramadan).
- **Offerings Management**:
  - Create, update, toggle availability, and adjust prices for menu items.
- **Reservation Triage**:
  - List view of incoming table booking inquiries with status management (Pending, Confirmed, Cancelled).
- **Owner Action Checklist**:
  - Interactive checklist tracking the `missing[]` contract items.
