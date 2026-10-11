# Project Structure (PROJECT_STRUCTURE.md)

This project follows a feature-based architecture separating domain concerns:

```
la-terrasse-plus/
├── index.html                   # Original source landing page & template
├── package.json                 # Dependencies and npm scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite bundler & test configuration
├── tailwind.config.ts           # Design tokens mapped to Tailwind
├── docs/                        # Architecture & decision documentation
│   ├── ANALYSIS.md              # Phase 0 business extraction & analysis
│   ├── ARCHITECTURE.md          # Architecture overview & data flow diagrams
│   ├── CHANGELOG.md             # Sprint and release history
│   ├── DATABASE.md              # Database schema & RLS policies
│   ├── DECISIONS.md             # Architecture Decision Records (ADRs)
│   ├── DESIGN_SYSTEM.md         # Tokens, typography scale, motion rules
│   ├── FEATURES.md              # Feature inventory
│   ├── PROJECT_STRUCTURE.md     # Directory organization map
│   ├── SECURITY.md              # Security checklist & legal compliance
│   └── SYSTEM_INSTRUCTIONS.md   # Guidelines for future AI sessions
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, MobileBar
│   │   └── ui/                  # Primitives (Button, Card, Input, etc.)
│   ├── features/
│   │   ├── site/                # Landing page sections (Hero, Menu, Swing...)
│   │   ├── admin/               # Owner dashboard views & forms
│   │   └── auth/                # Login form & authentication guard
│   ├── hooks/                   # Custom hooks (useLiveHours, useSwingTilt)
│   ├── lib/
│   │   ├── motion/              # Framer motion variants & hooks
│   │   ├── supabase/            # Client, queries, and fallback provider
│   │   └── utils.ts             # String formatters & token interpolator
│   ├── styles/
│   │   └── tokens.css           # Global design tokens
│   └── types/
│       ├── database.ts          # Generated Supabase TypeScript types
│       └── index.ts             # Domain models (Offering, Review, Hours)
├── supabase/
│   ├── migrations/
│   │   └── 0001_master_schema.sql # Idempotent schema, RLS, functions
│   ├── functions/
│   │   └── booking-notify/      # Edge function for reservation alerts
│   └── seed/
│       └── seed.sql             # Seed data mapped from #site-data
└── tests/
    ├── unit/                    # Primitives & utility tests
    ├── integration/             # Data fallback & RLS integration tests
    └── e2e/                     # User flows & accessibility tests
```
