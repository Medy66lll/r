import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Phone } from 'lucide-react';

interface CtaBannerProps {
  phone: string;
  phoneHref: string;
  whatsappUrl: string;
}

export const CtaBannerSection: React.FC<CtaBannerProps> = ({
  phone,
  phoneHref,
  whatsappUrl,
}) => {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.2),transparent_50%)] pointer-events-none" />
      <Container size="narrow">
        <div className="text-center flex flex-col items-center gap-6 relative z-10">
          <span className="px-3.5 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider">
            Votre Santé Sans Attente
          </span>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold max-w-2xl leading-tight">
            Transmettez Votre Ordonnance en Quelques Secondes
          </h2>

          <p className="text-sm sm:text-base text-teal-100 max-w-xl leading-relaxed">
            Photographiez votre ordonnance médicale et votre carte CHIFA depuis votre smartphone. Nous vous confirmons la préparation immédiatement.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 pt-2">
            <Button asLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Envoyer sur WhatsApp</span>
            </Button>
            <Button asLink href={phoneHref} variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Phone className="w-4 h-4" />
              <span>Appeler : {phone}</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
