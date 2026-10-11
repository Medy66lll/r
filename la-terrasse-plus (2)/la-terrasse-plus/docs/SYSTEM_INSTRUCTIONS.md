# System Instructions (SYSTEM_INSTRUCTIONS.md)

These instructions govern all future development sessions on this repository:

## 1. Non-Negotiable Hard Constraints
- **File Length**: Maximum **250 lines per file**. If a file approaches 250 lines, refactor by single responsibility into sub-modules.
- **Languages**: Code, internal comments, commits, and documentation must be written in English. Customer-facing copy must preserve the authentic French/Arabic phrasing of the original design.
- **Design Authenticity**: Do not redesign or alter the brand character. Preserve the original color tokens, typography (`Fraunces`, `Plus Jakarta Sans`, `Amiri`), spacing scale, and signature interactions.

## 2. Architecture & Data Principles
- **Tier B Fidelity**: Maintain the lightweight owner portal architecture. Do not introduce unnecessary heavy dependencies (e.g. Redux, complex ORMs).
- **Graceful Fallback**: The client-facing landing page must function seamlessly using bundled fallback data if Supabase credentials are not present.
- **Contract Integrity**: All database schemas and data mappers must strictly comply with `maps-to-landing/site-data@1`.
- **Token Interpolation**: Content strings containing `{rating}`, `{phone}`, `{address}` must be interpolated dynamically at render time.

## 3. Working Method & Git Discipline
- Commit after each logical phase using conventional commit format (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
- Document changes in `/docs/CHANGELOG.md` and document any non-trivial design choices in `/docs/DECISIONS.md`.
- Verify every change before committing. Never claim a feature is complete without automated test evidence or local verification.
