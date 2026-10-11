import React from 'react';
import { Container } from '@/components/ui/Container';

export const TrustSection: React.FC = () => {
  return (
    <section className="bg-white border-b border-slate-200 py-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-teal-700 mb-1">2</div>
            <div className="text-sm font-bold text-slate-900">Étages Dédiés</div>
            <div className="text-xs text-slate-500">Complexe médical complet</div>
          </div>
          <div className="p-3">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-teal-700 mb-1">00:00</div>
            <div className="text-sm font-bold text-slate-900">Minuit Tous les Jours</div>
            <div className="text-xs text-slate-500">Ouvert 7 jours sur 7</div>
          </div>
          <div className="p-3">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-teal-700 mb-1">100%</div>
            <div className="text-sm font-bold text-slate-900">Carte CHIFA</div>
            <div className="text-xs text-slate-500">Tiers-payant CNAS / CASNOS</div>
          </div>
          <div className="p-3">
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-teal-700 mb-1">3</div>
            <div className="text-sm font-bold text-slate-900">Pôles Réunis</div>
            <div className="text-xs text-slate-500">Pharmacie · Labo · Médecins</div>
          </div>
        </div>
      </Container>
    </section>
  );
};
