import type { Database } from '@/types/database';

type Business = Database['public']['Tables']['businesses']['Row'];

export function injectJsonLd(business: Business) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    alternateName: business.name_arabic,
    description: 'Grillades au feu de bois, pizzas artisanales et terrasse familiale avec balançoire à Tlemcen.',
    url: 'https://laterrasseplus-tlemcen.dz',
    telephone: business.phone,
    servesCuisine: ['Barbecue / Grillades', 'Oriental', 'Pizza', 'Burgers'],
    priceRange: business.price_range,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'N 1 Hai nassim, Imama',
      addressLocality: business.city,
      postalCode: business.postal_code,
      addressCountry: business.country_code,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.review_count,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:30',
        closes: '23:59',
      },
    ],
  };

  const existingScript = document.getElementById('json-ld-schema');
  if (existingScript) existingScript.remove();

  const script = document.createElement('script');
  script.id = 'json-ld-schema';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}
