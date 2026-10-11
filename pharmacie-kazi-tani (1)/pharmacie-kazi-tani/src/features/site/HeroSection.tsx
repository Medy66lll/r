import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { fadeInUp, staggerContainer } from '@/lib/motion/variants';

interface HeroProps {
  businessName: string;
  nameArabic?: string | null;
  phone: string;
  phoneHref: string;
  whatsappUrl: string;
}

export const HeroSection: React.FC<HeroProps> = ({
  businessName,
  phone,
  phoneHref,
  whatsappUrl,
}) => {
  return (
    <section id="hero" className="pt-8 pb-16 md:py-20 relative overflow-hidden bg-brand-surface">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="lg:col-span-7 flex flex-col gap-5" variants={fadeInUp}>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-pill text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
                Pôle Santé & Officine · Abou Tachfine, Tlemcen
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ouvert 7j/7 jusqu'à Minuit
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Deux étages dédiés à <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-sky-600">
                votre santé et votre bien-être.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              À Abou Tachfine en face de la banque BNA, {businessName} réunit ordonnances conventionnées Carte CHIFA, dermo-cosmétique Nutraxin, maintien à domicile avec 3 modèles de fauteuils roulants et pôle médical complet.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <Button asLink href="#ordonnance" variant="primary" size="lg" className="bg-teal-700 hover:bg-teal-800">
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Transmettre mon ordonnance</span>
              </Button>
              <Button asLink href={phoneHref} variant="secondary" size="lg">
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Appeler : {phone}</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-200 mt-2 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Conventionné Carte CHIFA (CNAS / CASNOS)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Conseil Officinal Personnalisé</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-5 relative flex justify-center" variants={fadeInUp}>
            {/* Visual 2-Floor Showcase Card */}
            <div className="w-full max-w-[440px] rounded-2xl bg-white border border-slate-200 shadow-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-700" />
                  <span className="font-display font-extrabold text-sm text-slate-900">Le Bâtiment Santé SAC</span>
                </div>
                <span className="text-[0.6875rem] font-bold px-2 py-0.5 rounded-pill bg-teal-50 text-teal-700 border border-teal-200">
                  Abou Tachfine · Face BNA
                </span>
              </div>

              {/* Photo preview of the 2-floor building */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative shadow-sm border border-slate-100">
                <img
                  src="images/facade-abou-tachfine.jpg"
                  alt="Bâtiment Pharmacie KAZI TANI à Abou Tachfine"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floors breakdown */}
              <div className="flex flex-col gap-2.5">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1er
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">1er Étage · Laboratoire & Cabinets Médicaux</div>
                    <div className="text-[0.6875rem] text-slate-500">Prélèvements biologiques & consultations spécialistes</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-teal-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    RDC
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">RDC · Grande Pharmacie & Matériel Médical</div>
                    <div className="text-[0.6875rem] text-slate-600">Guichets CHIFA, parapharmacie Nutraxin & fauteuils</div>
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Envoyer photo ordonnance sur WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
