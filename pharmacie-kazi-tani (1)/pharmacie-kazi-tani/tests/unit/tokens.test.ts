import { describe, it, expect } from 'vitest';

export function substituteTokens(str: string, b: Record<string, any>): string {
  return str
    .replace(/\{businessName\}/g, b.name || '')
    .replace(/\{rating\}/g, b.rating !== null ? String(b.rating) : '')
    .replace(/\{reviewCount\}/g, b.reviewCount !== null ? String(b.reviewCount) : '')
    .replace(/\{phone\}/g, b.phone || '')
    .replace(/\{address\}/g, b.address || '');
}

describe('Token Interpolation Utilities', () => {
  const mockBusiness = {
    name: 'La terrasse plus',
    rating: 4.4,
    reviewCount: 118,
    phone: '+213 552 66 60 15',
    address: 'N 1 Hai nassim, Tlemcen 13000, Algérie',
  };

  it('replaces all business tokens correctly', () => {
    const template = 'Bienvenue chez {businessName} ({rating} ★ sur {reviewCount} avis) à {address}. Contact: {phone}';
    const result = substituteTokens(template, mockBusiness);

    expect(result).toBe(
      'Bienvenue chez La terrasse plus (4.4 ★ sur 118 avis) à N 1 Hai nassim, Tlemcen 13000, Algérie. Contact: +213 552 66 60 15'
    );
  });

  it('handles strings without tokens unchanged', () => {
    const raw = 'Grillades au feu de bois & pizzas artisanales';
    expect(substituteTokens(raw, mockBusiness)).toBe(raw);
  });
});
