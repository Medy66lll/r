import type { Database } from '@/types/database';

type Business = Database['public']['Tables']['businesses']['Row'];
type BusinessHour = Database['public']['Tables']['business_hours']['Row'];
type Offering = Database['public']['Tables']['offerings']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];
type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];
type OwnerTask = Database['public']['Tables']['owner_tasks']['Row'];

export const FALLBACK_BUSINESS: Business = {
  id: 'a0000000-0000-0000-0000-000000000001',
  owner_id: null,
  name: 'Pharmacie KAZI TANI (SAC)',
  name_arabic: 'صيدلية قاضي ثاني سيدي أحمد شكيب',
  legal_name: 'Pharmacie KAZI TANI SID AHMED CHAKIB',
  category: "Pharmacie d'officine & Parapharmacie",
  category_google: 'Pharmacy',
  address: 'Abou Tachfine (Bréa), en face de la BNA, Tlemcen 13000',
  address_short: 'Abou Tachfine · Tlemcen',
  city: 'Tlemcen',
  region: 'Wilaya de Tlemcen',
  country: 'Algérie',
  country_code: 'DZ',
  postal_code: '13000',
  neighborhood: 'Abou Tachfine (Bréa)',
  landmark: 'En face de la banque BNA, bâtiment médical à 2 étages',
  latitude: 34.8873055,
  longitude: -1.3386873,
  plus_code: 'VMP6+WG Tlemcen, Algeria',
  phone: '+213 43 22 86 43',
  phone_raw: '043228643',
  whatsapp: '+213 43 22 86 43',
  maps_url: 'https://maps.app.goo.gl/ogWBTV9YzLBPCCAE8',
  maps_embed_url: 'https://maps.google.com/maps?q=Abou+Tachfine+Tlemcen+BNA&hl=fr&z=15&output=embed',
  rating: 4.9,
  review_count: 42,
  price_level: '€',
  price_range: 'Tarification conventionnée CHIFA & prix officinaux',
  currency: 'DZD',
  owner_name: 'Dr Kazi Tani Sid Ahmed Chakib',
  is_published: true,
  created_at: '2026-10-11T18:50:00Z',
  updated_at: '2026-10-11T18:50:00Z',
};

export const FALLBACK_HOURS: BusinessHour[] = [
  { id: 'h-1', business_id: FALLBACK_BUSINESS.id, day_of_week: 'sunday', label: 'Dimanche', opens: '09:00', closes: '00:00', is_closed: false, sort_order: 0, created_at: '', updated_at: '' },
  { id: 'h-2', business_id: FALLBACK_BUSINESS.id, day_of_week: 'monday', label: 'Lundi', opens: '09:00', closes: '00:00', is_closed: false, sort_order: 1, created_at: '', updated_at: '' },
  { id: 'h-3', business_id: FALLBACK_BUSINESS.id, day_of_week: 'tuesday', label: 'Mardi', opens: '09:00', closes: '00:00', is_closed: false, sort_order: 2, created_at: '', updated_at: '' },
  { id: 'h-4', business_id: FALLBACK_BUSINESS.id, day_of_week: 'wednesday', label: 'Mercredi', opens: '09:00', closes: '00:00', is_closed: false, sort_order: 3, created_at: '', updated_at: '' },
  { id: 'h-5', business_id: FALLBACK_BUSINESS.id, day_of_week: 'thursday', label: 'Jeudi', opens: '09:00', closes: '00:00', is_closed: false, sort_order: 4, created_at: '', updated_at: '' },
  { id: 'h-6', business_id: FALLBACK_BUSINESS.id, day_of_week: 'friday', label: 'Vendredi', opens: '17:00', closes: '00:00', is_closed: false, sort_order: 5, created_at: '', updated_at: '' },
  { id: 'h-7', business_id: FALLBACK_BUSINESS.id, day_of_week: 'saturday', label: 'Samedi', opens: '09:00', closes: '00:00', is_closed: false, sort_order: 6, created_at: '', updated_at: '' },
];

export const FALLBACK_OFFERINGS: Offering[] = [
  { id: 'o-1', business_id: FALLBACK_BUSINESS.id, slug: 'chifa-tiers-payant', category: 'services', name: 'Guichet Tiers-Payant Carte CHIFA', name_arabic: 'شباك بطاقة الشفاء', description: 'Prise en charge instantanée de vos ordonnances de longue durée (ALD), diabète, HTA et soins courants avec validation CNAS / CASNOS.', price: 0, price_display: 'Tiers-Payant 100% CHIFA', currency: 'DZD', badge: 'Conventionné', is_signature: true, is_available: true, dietary: ['CNAS', 'CASNOS', 'Gratuit avec CHIFA'], sort_order: 0, created_at: '', updated_at: '' },
  { id: 'o-2', business_id: FALLBACK_BUSINESS.id, slug: 'fauteuils-roulants', category: 'materiel', name: 'Fauteuils Roulants & Maintien à Domicile', name_arabic: 'كراسي متحركة و عتاد طبي', description: '3 modèles adaptés pour adulte et senior : standard pliant, confort renforcé et allégé. Essai sur place et mise en service.', price: 28000, price_display: 'Sur devis & conseil personnalisé', currency: 'DZD', badge: '3 Modèles Disponibles', is_signature: true, is_available: true, dietary: ['Mobilité', 'Certifié Médical'], sort_order: 1, created_at: '', updated_at: '' },
  { id: 'o-3', business_id: FALLBACK_BUSINESS.id, slug: 'dermo-nutraxin', category: 'parapharmacie', name: 'Parapharmacie & Compléments Nutraxin', name_arabic: 'شبه صيدلة و مكملات غذائية', description: 'Gamme complète Nutraxin Algérie : magnésium, collagène marin, vitamines mémoire/concentration et soins dermo-esthétiques certifiés.', price: 1800, price_display: 'Tarifs officiels certifiés', currency: 'DZD', badge: 'Gamme Officielle', is_signature: true, is_available: true, dietary: ['Nutraxin', 'Dermo-Cosmétique'], sort_order: 2, created_at: '', updated_at: '' },
  { id: 'o-4', business_id: FALLBACK_BUSINESS.id, slug: 'maman-bebe', category: 'parapharmacie', name: 'Espace Pédiatrique & Maman-Bébé', name_arabic: 'جناح الأم و الرضيع', description: 'Laits infantiles spécifiques, biberonnerie sans BPA, tire-laits, soins du siège et pesée bébé gratuite.', price: 950, price_display: 'Prix conventionnés', currency: 'DZD', badge: 'Conseil Maman', is_signature: false, is_available: true, dietary: ['Puériculture', 'Pédiatrie'], sort_order: 3, created_at: '', updated_at: '' },
  { id: 'o-5', business_id: FALLBACK_BUSINESS.id, slug: 'depistage-glycemie-tension', category: 'services', name: 'Dépistage Tension & Glycémie Capillaire', name_arabic: 'فحص مجاني للضغط و السكري', description: 'Mesure instantanée de la pression artérielle et de la glycémie à jeun par un pharmacien diplômé avec carnet de suivi.', price: 0, price_display: 'Service Offert en Officine', currency: 'DZD', badge: 'Prévention', is_signature: false, is_available: true, dietary: ['Contrôle gratuit', 'Sans rendez-vous'], sort_order: 4, created_at: '', updated_at: '' },
  { id: 'o-6', business_id: FALLBACK_BUSINESS.id, slug: 'pole-medical-labo', category: 'pole', name: 'Laboratoire & Cabinets Médicaux (Étage 1)', name_arabic: 'مخبر تحاليل و عيادات طبية بالطابق الأول', description: 'Prélèvements biologiques, analyses sanguines et consultations spécialisées directement au premier étage du bâtiment.', price: 0, price_display: '1er Étage du Bâtiment', currency: 'DZD', badge: 'Pôle 2 Étages', is_signature: true, is_available: true, dietary: ['Analyses', 'Consultations'], sort_order: 5, created_at: '', updated_at: '' },
];

export const FALLBACK_REVIEWS: Review[] = [
  { id: 'r-1', business_id: FALLBACK_BUSINESS.id, author: 'Amine B.', rating: 5, review_date: 'Il y a 2 mois', source: 'Google Maps', text: 'Pharmacie très moderne sur deux étages, accueil chaleureux et professionnel. Prise en charge rapide avec la carte CHIFA et de très bons conseils pour le matériel médical.', highlight: 'Pharmacie moderne sur deux étages, accueil chaleureux', is_featured: true, created_at: '' },
  { id: 'r-2', business_id: FALLBACK_BUSINESS.id, author: 'Fatima Zohra M.', rating: 5, review_date: 'Il y a 3 mois', source: 'Google Maps', text: "Le personnel est d'une grande gentillesse et à l'écoute. J'y trouve toujours tous mes médicaments et des produits de parapharmacie de grande qualité. Ouvert jusqu'à minuit c'est très rassurant !", highlight: "Gentillesse, écoute et ouvert jusqu'à minuit", is_featured: true, created_at: '' },
  { id: 'r-3', business_id: FALLBACK_BUSINESS.id, author: 'Dr Mehdi K.', rating: 5, review_date: 'Il y a 5 mois', source: 'Facebook', text: 'Un vrai complexe de santé à Abou Tachfine. Avoir le laboratoire et les médecins au 1er étage avec la pharmacie au rez-de-chaussée est un confort inestimable pour les patients.', highlight: 'Complexe santé complet avec laboratoire et cabinets', is_featured: true, created_at: '' },
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  { id: 'g-1', business_id: FALLBACK_BUSINESS.id, slot: 'facade-building', title: 'Façade & Bâtiment de Santé à Abou Tachfine', caption: 'Bâtiment moderne sur 2 étages en face de la banque BNA', aspect_ratio: '16/10', image_url: 'images/facade-abou-tachfine.jpg', sort_order: 0, created_at: '' },
  { id: 'g-2', business_id: FALLBACK_BUSINESS.id, slot: 'pharmacy-interior', title: 'Officine Moderne & Comptoirs CHIFA', caption: 'Espace spacieux, climatisé et confidentiel au rez-de-chaussée', aspect_ratio: '16/10', image_url: 'images/interieur-rdc.jpg', sort_order: 1, created_at: '' },
  { id: 'g-3', business_id: FALLBACK_BUSINESS.id, slot: 'medical-floor', title: '1er Étage · Laboratoire & Médecins Spécialistes', caption: 'Analyses biologiques et consultations médicales dans le même lieu', aspect_ratio: '16/10', image_url: 'images/etage-medical.jpg', sort_order: 2, created_at: '' },
  { id: 'g-4', business_id: FALLBACK_BUSINESS.id, slot: 'wheelchairs', title: 'Rayon Mobilité & Fauteuils Roulants', caption: '3 modèles de fauteuils roulants et maintien à domicile', aspect_ratio: '16/10', image_url: 'images/fauteuils-roulants.jpg', sort_order: 3, created_at: '' },
  { id: 'g-5', business_id: FALLBACK_BUSINESS.id, slot: 'dermo-nutraxin', title: 'Parapharmacie & Gamme Nutraxin', caption: 'Soins de la peau, compléments alimentaires et micronutrition', aspect_ratio: '16/10', image_url: 'images/dermo-nutraxin.jpg', sort_order: 4, created_at: '' },
  { id: 'g-6', business_id: FALLBACK_BUSINESS.id, slot: 'baby-care', title: 'Univers Maman & Nourrisson', caption: 'Laits infantiles spécifiques, puériculture et soins pédiatriques', aspect_ratio: '16/10', image_url: 'images/espace-bebe.jpg', sort_order: 5, created_at: '' },
];

export const FALLBACK_TASKS: OwnerTask[] = [
  { id: 't-1', business_id: FALLBACK_BUSINESS.id, task_description: "Mettre à jour les dates d'astreinte nocturne dès publication du planning officiel de la DSP Tlemcen", is_completed: false, category: 'missing_info', created_at: '', updated_at: '' },
  { id: 't-2', business_id: FALLBACK_BUSINESS.id, task_description: 'Confirmer le numéro mobile direct WhatsApp de permanence pour les ordonnances urgentes', is_completed: false, category: 'missing_info', created_at: '', updated_at: '' },
  { id: 't-3', business_id: FALLBACK_BUSINESS.id, task_description: 'Prendre des photos supplémentaires du laboratoire et des cabinets médicaux du 1er étage', is_completed: false, category: 'missing_info', created_at: '', updated_at: '' },
];
