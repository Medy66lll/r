import { describe, it, expect } from 'vitest';
import { bookingSchema, formatWhatsAppMessage } from '../../src/lib/validation/booking';

describe('Booking Validation & WhatsApp Message Formatter', () => {
  it('accepts valid booking form data', () => {
    const validData = {
      name: 'Karim Mansouri',
      phone: '0552666015',
      date: '2026-10-15',
      time: '20:00',
      guests: '4 personnes',
      zone: 'Terrasse extérieure (côté balançoire)',
      notes: 'Table proche des plantes',
    };
    const result = bookingSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects submissions with honeypot anti-spam populated', () => {
    const botData = {
      name: 'Spam Bot',
      phone: '0552666015',
      date: '2026-10-15',
      time: '20:00',
      guests: '2 personnes',
      zone: 'Salle intérieure',
      honeypot: 'http://spam-link.com',
    };
    const result = bookingSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });

  it('formats correct WhatsApp booking string', () => {
    const data = {
      name: 'Amina',
      phone: '0552666015',
      date: '2026-10-12',
      time: '19:30',
      guests: '3-4 personnes',
      zone: 'Terrasse extérieure (côté balançoire)',
      notes: 'Chaise bébé',
    };
    const encoded = formatWhatsAppMessage(data);
    const decoded = decodeURIComponent(encoded);
    expect(decoded).toContain('Amina');
    expect(decoded).toContain('0552666015');
    expect(decoded).toContain('Terrasse extérieure');
    expect(decoded).toContain('Chaise bébé');
  });
});
