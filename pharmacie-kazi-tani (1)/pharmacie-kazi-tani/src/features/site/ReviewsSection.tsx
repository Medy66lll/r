import React from 'react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Star, MessageSquareQuote, ExternalLink } from 'lucide-react';
import type { Database } from '@/types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

interface ReviewsSectionProps {
  reviews: Review[];
  mapsUrl: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, mapsUrl }) => {
  return (
    <section id="avis" className="py-16 md:py-24 bg-slate-50">
      <Container>
        <Heading
          badge="Confiance & Écoute Patient"
          title="Ce que Disent Nos Patients"
          subtitle="La bienveillance, la rapidité avec la carte CHIFA et le conseil médical au cœur des retours d'expérience."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[0.6875rem] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {rev.source}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                  « {rev.text} »
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{rev.author}</span>
                <span className="text-slate-400">{rev.review_date}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 underline"
          >
            <span>Consulter tous les avis et poser une question sur Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  );
};
