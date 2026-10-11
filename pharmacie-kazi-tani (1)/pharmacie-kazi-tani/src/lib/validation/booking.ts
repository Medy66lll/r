import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(80),
  phone: z.string().regex(/^[0-9+ ]{8,15}$/, 'Numéro de téléphone invalide (ex: 0552 66 60 15)'),
  date: z.string().min(8, 'Veuillez sélectionner une date'),
  time: z.string().min(4, 'Veuillez sélectionner une heure'),
  guests: z.string().min(1, 'Nombre de personnes requis'),
  zone: z.string().min(1, 'Emplacement requis'),
  notes: z.string().max(300).optional(),
  honeypot: z.string().max(0, 'Validation anti-spam échouée').optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export function formatWhatsAppMessage(data: BookingFormData): string {
  const parts = [
    'Bonjour La Terrasse Plus,',
    '',
    'Je souhaite réserver une table :',
    `• Nom : ${data.name}`,
    `• Téléphone : ${data.phone}`,
    `• Date : ${data.date}`,
    `• Heure : ${data.time}`,
    `• Personnes : ${data.guests}`,
    `• Zone : ${data.zone}`,
  ];
  if (data.notes && data.notes.trim()) {
    parts.push(`• Remarque : ${data.notes.trim()}`);
  }
  return encodeURIComponent(parts.join('\n'));
}
