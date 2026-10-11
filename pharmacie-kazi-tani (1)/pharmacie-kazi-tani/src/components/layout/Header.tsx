import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeaderProps {
  businessName: string;
  nameArabic?: string | null;
  phone: string;
  phoneHref: string;
  whatsappUrl: string;
  onNavigateAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  businessName,
  nameArabic,
  phone,
  phoneHref,
  whatsappUrl,
  onNavigateAdmin,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full h-[76px] bg-white/95 backdrop-blur-md border-b border-slate-200 z-40">
      <Container className="h-full flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="images/logo.svg"
            alt={`Logo ${businessName}`}
            className="w-11 h-11 rounded-xl shadow-md border border-teal-200 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-slate-900 leading-tight">
              {businessName}
            </span>
            {nameArabic && (
              <span className="font-arabic text-xs text-teal-700 leading-tight" dir="rtl">
                {nameArabic}
              </span>
            )}
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-5" aria-label="Navigation principale">
          <a href="#batiment" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors">Le Bâtiment</a>
          <a href="#services" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors">Départements</a>
          <a href="#video" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors">Visite Vidéo</a>
          <a href="#reseaux" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors">Photos Réseaux</a>
          <a href="#ordonnance" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors">Ordonnance CHIFA</a>
          <a href="#infos" className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors">Accès & Horaires</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Ouvert 7j/7 jusqu'à 00:00
          </span>

          <Button asLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="whatsapp">
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden md:inline">Ordonnance WhatsApp</span>
          </Button>

          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="lg:hidden p-2 rounded-md border border-slate-200 text-slate-700"
            aria-label="Menu"
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed top-[76px] inset-x-0 bottom-0 bg-white/95 backdrop-blur-xl p-6 flex flex-col gap-4 border-b border-slate-200 z-30">
          <a href="#batiment" onClick={() => setDrawerOpen(false)} className="font-display text-lg font-bold text-slate-900 py-1.5 border-b border-slate-100">Le Bâtiment Santé</a>
          <a href="#services" onClick={() => setDrawerOpen(false)} className="font-display text-lg font-bold text-slate-900 py-1.5 border-b border-slate-100">Départements & Matériel</a>
          <a href="#video" onClick={() => setDrawerOpen(false)} className="font-display text-lg font-bold text-slate-900 py-1.5 border-b border-slate-100">Visite Vidéo</a>
          <a href="#reseaux" onClick={() => setDrawerOpen(false)} className="font-display text-lg font-bold text-slate-900 py-1.5 border-b border-slate-100">Photos Réseaux</a>
          <a href="#ordonnance" onClick={() => setDrawerOpen(false)} className="font-display text-lg font-bold text-slate-900 py-1.5 border-b border-slate-100">Transmettre Ordonnance</a>
          <a href="#infos" onClick={() => setDrawerOpen(false)} className="font-display text-lg font-bold text-slate-900 py-1.5 border-b border-slate-100">Accès & Horaires</a>
          <div className="mt-auto flex flex-col gap-2.5">
            <a href={phoneHref} className="w-full text-center py-2.5 rounded-full bg-slate-100 border border-slate-200 font-bold text-slate-800 text-xs">
              Appeler l'Officine : {phone}
            </a>
            {onNavigateAdmin && (
              <button onClick={() => { setDrawerOpen(false); onNavigateAdmin(); }} className="text-xs text-slate-500 text-center py-1 underline">
                Accès Pharmacien Responsable
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
