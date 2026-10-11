import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { ShieldCheck, HeartHandshake, Award, Clock } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Heading
              badge="L'Esprit Officinal"
              title="La Prévention est le Plus Beau des Soins"
              subtitle="« الوقاية خير من العلاج » — À la Pharmacie KAZI TANI (SAC), nous croyons qu'une officine moderne est avant tout un lieu d'écoute, d'accompagnement et de pédagogie médicale."
              align="left"
              className="mb-2"
            />
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Fondée et dirigée par le Dr Kazi Tani Sid Ahmed Chakib à Abou Tachfine (Bréa), notre officine a été imaginée comme un pôle de proximité : un lieu où l'on prend le temps de vous expliquer la posologie de vos traitements, les éventuelles interactions médicamenteuses et les règles hygiéno-diététiques associées.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              En regroupant sur 2 étages la pharmacie générale, le tiers-payant CHIFA, l'univers de maintien à domicile avec des fauteuils roulants certifiés, ainsi que le laboratoire d'analyses et des cabinets spécialistes au 1er étage, nous offrons aux habitants de Tlemcen et Chetouane un parcours de santé complet, sécurisé et bienveillant.
            </p>

            <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center font-display font-extrabold text-teal-800 text-sm">
                SAC
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Dr Kazi Tani Sid Ahmed Chakib</div>
                <div className="text-xs text-slate-500">Pharmacien Titulaire & Équipe Officinale</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 mb-1">Rigueur & Traçabilité</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Médicaments 100% contrôlés et conformes aux normes sanitaires nationales.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 mb-1">Écoute & Humanisme</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Un espace confidentiel pour échanger sur vos pathologies et vos traitements.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 mb-1">Expertise Conseil</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Spécialistes en dermo-cosmétique Nutraxin, pédiatrie et orthopédie.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 mb-1">Amplitude 7j/7</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Ouvert tous les jours jusqu'à 00:00 (Minuit) sans interruption.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
