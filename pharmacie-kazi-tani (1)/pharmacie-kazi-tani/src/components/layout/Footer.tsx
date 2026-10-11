import React from 'react';
import { Container } from '@/components/ui/Container';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  businessName: string;
  nameArabic?: string | null;
  address: string;
  phone: string;
  phoneHref: string;
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  businessName,
  nameArabic,
  address,
  phone,
  phoneHref,
  onNavigateAdmin,
}) => {
  return (
    <footer className="bg-[#0B131E] text-slate-400 pt-16 pb-24 md:pb-16 border-t border-slate-800 text-sm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="images/logo.svg"
                alt={`Logo ${businessName}`}
                className="w-10 h-10 rounded-xl border border-teal-500/40 shadow-sm"
              />
              <div>
                <div className="font-display font-bold text-lg leading-tight text-white">{businessName}</div>
                {nameArabic && <div className="font-arabic text-xs text-teal-400" dir="rtl">{nameArabic}</div>}
              </div>
            </div>
            <p className="text-slate-400 mt-1 leading-relaxed text-xs sm:text-sm">
              Complexe de santé moderne sur 2 étages : dispensation d'ordonnances CHIFA, parapharmacie Nutraxin, matériel médical de maintien à domicile, laboratoire d'analyses et cabinets spécialistes.
            </p>
            <p className="text-teal-400 font-semibold text-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {address}
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">Départements Officinaux</div>
            <ul className="flex flex-col gap-2 text-slate-400 text-xs sm:text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Guichet Tiers-Payant Carte CHIFA</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Fauteuils Roulants & Orthopédie</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Parapharmacie & Nutraxin Algérie</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Espace Maman & Nourrisson</a></li>
              <li><a href="#batiment" className="hover:text-white transition-colors">Laboratoire & Médecins (1er Étage)</a></li>
              <li><a href="#ordonnance" className="hover:text-white transition-colors">Transmission Ordonnance Express</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">Horaires & Permanence</div>
            <p className="text-slate-300 text-xs mb-1 font-semibold">Ouvert 7 jours sur 7 jusqu'à 00:00 (Minuit)</p>
            <p className="text-xs text-slate-500 mb-3">Vendredi ouvert à partir de 17:00</p>
            <p className="text-white font-bold text-sm mb-4">
              Tél : <a href={phoneHref} className="text-teal-400 underline">{phone}</a>
            </p>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Réseaux Sociaux</div>
            <div className="flex gap-2.5">
              <a
                href="https://www.instagram.com/pharmacie_kazi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/p/Pharmacie-Kazi-tlemcen-61575630643250/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://maps.app.goo.gl/ogWBTV9YzLBPCCAE8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1"
                aria-label="Google Maps"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Maps</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
          <div>© 2026 {businessName}. Tous droits réservés. Abou Tachfine, Tlemcen.</div>
          <div className="flex items-center gap-4">
            <span>Conforme maps-to-landing/site-data@1</span>
            {onNavigateAdmin && (
              <button onClick={onNavigateAdmin} className="underline hover:text-white transition-colors">
                Espace Pharmacien Titulaire
              </button>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
};
