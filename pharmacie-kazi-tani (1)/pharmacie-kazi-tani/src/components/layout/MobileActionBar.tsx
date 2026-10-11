import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface MobileActionBarProps {
  phoneHref: string;
  whatsappUrl: string;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  phoneHref,
  whatsappUrl,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-brand-border p-2.5 flex gap-3 z-40 shadow-lg">
      <a
        href={phoneHref}
        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-pill bg-brand-surface border border-brand-border text-brand-text font-bold text-sm"
      >
        <Phone className="w-4 h-4 text-brand-primary" />
        <span>Appeler</span>
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-pill bg-[#25D366] text-white font-bold text-sm shadow-sm"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
