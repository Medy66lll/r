import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { MapPin, Phone, Clock, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Database } from '@/types/database';

type BusinessHour = Database['public']['Tables']['business_hours']['Row'];

interface PracticalInfoProps {
  address: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  mapsEmbedUrl?: string | null;
  hours: BusinessHour[];
}

export const PracticalInfoSection: React.FC<PracticalInfoProps> = ({
  address,
  phone,
  phoneHref,
  mapsUrl,
  hours,
}) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = days[new Date().getDay()];

  return (
    <section id="infos" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <Container>
        <Heading
          badge="Accès & Horaires d'Officine"
          title="Nous Trouver à Abou Tachfine (Bréa)"
          subtitle="Idéalement situé en face de la banque BNA, à quelques minutes du centre de Tlemcen, avec stationnement aisé."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Address */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4 items-start shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-base mb-1">Localisation de l'Officine</h4>
                <p className="text-sm font-semibold text-slate-800">{address}</p>
                <p className="text-xs text-slate-500 mt-0.5">En face de la banque BNA · Bâtiment médical à 2 étages</p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4 items-start shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="w-full">
                <h4 className="font-display font-bold text-slate-900 text-base mb-1">Horaires d'Ouverture 7j/7</h4>
                <p className="text-xs text-slate-600 mb-3">Service garanti tous les jours jusqu'à 00:00 (Minuit)</p>

                <table className="w-full text-xs">
                  <tbody>
                    {hours.map((h) => {
                      const isToday = h.day_of_week === todayKey;
                      return (
                        <tr key={h.id} className={`border-b border-slate-200/60 ${isToday ? 'font-extrabold text-teal-800' : 'text-slate-600'}`}>
                          <td className="py-1.5">{h.label} {isToday && '(Aujourd\'hui)'}</td>
                          <td className="py-1.5 text-right">{h.is_closed ? 'Fermé' : `${h.opens} - ${h.closes}`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Night duty information notice */}
                <div className="mt-3.5 p-2.5 rounded-lg bg-teal-50 border border-teal-200 flex items-start gap-2 text-xs text-teal-900">
                  <AlertCircle className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Garde de nuit :</strong> Organisation par roulement hebdomadaire officiel de la DSP Tlemcen. En cas d'astreinte après minuit, consultez l'affichage lumineux en façade ou contactez l'officine au {phone}.
                  </span>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4 items-start shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-base mb-1">Ligne Directe de l'Officine</h4>
                <a href={phoneHref} className="text-base font-bold text-teal-700 hover:text-teal-900 underline">
                  {phone}
                </a>
                <p className="text-xs text-slate-500 mt-0.5">Appel pour disponibilité d'un médicament ou conseil urgent</p>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button asLink href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md">
                <Navigation className="w-4 h-4" />
                <span>Itinéraire Google Maps</span>
              </Button>
              <Button asLink href={phoneHref} variant="secondary" size="md">
                <Phone className="w-4 h-4" />
                <span>Appeler la pharmacie</span>
              </Button>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-6 w-full h-[460px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-100 notranslate" translate="no">
            <iframe
              title="Carte Google Maps Pharmacie KAZI TANI Tlemcen"
              src="https://maps.google.com/maps?q=Abou+Tachfine+Tlemcen+BNA&amp;hl=fr&amp;z=15&amp;output=embed"
              loading="lazy"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
