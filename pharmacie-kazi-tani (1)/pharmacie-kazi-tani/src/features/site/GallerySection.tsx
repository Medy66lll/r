import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import type { Database } from '@/types/database';

type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  return (
    <section id="galerie" className="py-16 md:py-24 bg-white">
      <Container>
        <Heading
          badge="Immersion Visuelle"
          title="Les 2 Étages de l'Officine en Images"
          subtitle="Découvrez notre complexe médical moderne à Abou Tachfine : façade en face de la BNA, officine spacieuse et rayons spécialisés."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="w-full aspect-[16/10] overflow-hidden bg-slate-200">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-semibold">
                    Photo {item.slot}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
