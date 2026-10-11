# Architecture & Design Decisions: Pharmacie KAZI TANI (SAC)

## ADR-001: Architecture Tier Choice (Tier B)
- **Decision**: Tier B (Site vitrine d'officine + Espace d'administration propriétaire Supabase).
- **Rationale**: Une pharmacie d'officine en Algérie ne peut pas vendre de médicaments en ligne (législation sur les substances pharmaceutiques). En revanche, le pharmacien titulaire (Dr. Kazi Tani) doit pouvoir :
  1. Mettre à jour les horaires d'astreinte et de garde de nuit.
  2. Activer/désactiver la disponibilité des équipements lourds (ex: disponibilité immédiate des 3 modèles de fauteuils roulants ou sur commande).
  3. Mettre à jour les annonces de santé publique (campagnes de vaccination, dépistage diabète).
- **Alternative rejected**: Tier A (statique) entraînerait l'obsolescence rapide des horaires de garde et des arrivages de matériel médical. Tier C (app e-commerce complète avec panier/paiement) est illégal pour les médicaments sur ordonnance en Algérie.

## ADR-002: Palette & Typography
- **Palette**: Vert canard / Sarcelle médical profond (`#0F766E`), bleu clinique (`#0284C7`), vert émeraude vitalité (`#10B981`) sur fond blanc immaculé (`#F8FAFC`). Conforme WCAG AAA pour une lisibilité optimale par les seniors.
- **Typography**: `Plus Jakarta Sans` (titres et navigation officinale) + `Inter` (corps de texte médical) + `Noto Kufi Arabic` (typographie bilingue officielle).

## ADR-003: Signature Design Concept
- **Concept**: L'Explorateur 2 Étages "Le Pôle de Santé Intégré" permettant de basculer instantanément entre le RDC (Pharmacie & CHIFA) et l'Étage 1 (Laboratoire d'analyses & Cabinets médicaux).
