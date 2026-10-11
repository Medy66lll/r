-- ==============================================================================
-- PHARMACIE KAZI TANI (SAC) - INITIAL SEED DATA
-- File: /supabase/seed/seed.sql
-- Idempotent, matches maps-to-landing/site-data@1 contract
-- ==============================================================================

-- 1. Business Profile
INSERT INTO businesses (
    id, name, name_arabic, legal_name, category, category_google,
    address, address_short, city, region, country, country_code,
    postal_code, neighborhood, landmark, latitude, longitude,
    plus_code, phone, phone_raw, whatsapp, maps_url, maps_embed_url,
    rating, review_count, price_level, price_range, currency, owner_name, is_published
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Pharmacie KAZI TANI (SAC)',
    'صيدلية قاضي ثاني سيدي أحمد شكيب',
    'Pharmacie KAZI TANI SID AHMED CHAKIB',
    'Pharmacie d''officine & Parapharmacie',
    'Pharmacy',
    'Abou Tachfine (Bréa), en face de la BNA, Tlemcen 13000',
    'Abou Tachfine · Tlemcen',
    'Tlemcen',
    'Wilaya de Tlemcen',
    'Algérie',
    'DZ',
    '13000',
    'Abou Tachfine (Bréa)',
    'En face de la banque BNA, bâtiment médical à 2 étages',
    34.8873055,
    -1.3386873,
    'VMP6+WG Tlemcen, Algeria',
    '+213 43 22 86 43',
    '043228643',
    '+213 43 22 86 43',
    'https://maps.app.goo.gl/ogWBTV9YzLBPCCAE8',
    'https://maps.google.com/maps?q=Abou+Tachfine+Tlemcen+BNA&hl=fr&z=15&output=embed',
    4.9,
    42,
    '€',
    'Tarification conventionnée CHIFA & prix officinaux',
    'DZD',
    'Dr Kazi Tani Sid Ahmed Chakib',
    true
) ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,
    whatsapp = EXCLUDED.whatsapp;

-- 2. Business Hours (Updated with exact owner schedule)
INSERT INTO business_hours (business_id, day_of_week, label, opens, closes, is_closed, sort_order) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'sunday', 'Dimanche', '09:00', '00:00', false, 0),
    ('a0000000-0000-0000-0000-000000000001', 'monday', 'Lundi', '09:00', '00:00', false, 1),
    ('a0000000-0000-0000-0000-000000000001', 'tuesday', 'Mardi', '09:00', '00:00', false, 2),
    ('a0000000-0000-0000-0000-000000000001', 'wednesday', 'Mercredi', '09:00', '00:00', false, 3),
    ('a0000000-0000-0000-0000-000000000001', 'thursday', 'Jeudi', '09:00', '00:00', false, 4),
    ('a0000000-0000-0000-0000-000000000001', 'friday', 'Vendredi', '17:00', '00:00', false, 5),
    ('a0000000-0000-0000-0000-000000000001', 'saturday', 'Samedi', '09:00', '00:00', false, 6)
ON CONFLICT (business_id, day_of_week) DO UPDATE SET
    opens = EXCLUDED.opens,
    closes = EXCLUDED.closes,
    is_closed = EXCLUDED.is_closed;

-- 3. Offerings / Services & Matériel
INSERT INTO offerings (id, business_id, slug, category, name, name_arabic, description, price, price_display, currency, badge, is_signature, is_available, dietary, sort_order) VALUES
    ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'chifa-tiers-payant', 'services', 'Guichet Tiers-Payant Carte CHIFA', 'شباك بطاقة الشفاء', 'Prise en charge instantanée de vos ordonnances de longue durée (ALD), diabète, HTA et soins courants avec validation CNAS / CASNOS.', 0, 'Tiers-Payant 100% CHIFA', 'DZD', 'Conventionné', true, true, ARRAY['CNAS', 'CASNOS', 'Gratuit avec CHIFA'], 0),
    ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'fauteuils-roulants', 'materiel', 'Fauteuils Roulants & Maintien à Domicile', 'كراسي متحركة و عتاد طبي', '3 modèles adaptés pour adulte et senior : standard pliant, confort renforcé et allégé. Essai sur place et mise en service.', 28000, 'Sur devis & conseil personnalisé', 'DZD', '3 Modèles Disponibles', true, true, ARRAY['Mobilité', 'Certifié Médical'], 1),
    ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'dermo-nutraxin', 'parapharmacie', 'Parapharmacie & Compléments Nutraxin', 'شبه صيدلة و مكملات غذائية', 'Gamme complète Nutraxin Algérie : magnésium, collagène marin, vitamines mémoire/concentration et soins dermo-esthétiques certifiés.', 1800, 'Tarifs officiels certifiés', 'DZD', 'Gamme Officielle', true, true, ARRAY['Nutraxin', 'Dermo-Cosmétique'], 2),
    ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'maman-bebe', 'parapharmacie', 'Espace Pédiatrique & Maman-Bébé', 'جناح الأم و الرضيع', 'Laits infantiles spécifiques, biberonnerie sans BPA, tire-laits, soins du siège et pesée bébé gratuite.', 950, 'Prix conventionnés', 'DZD', 'Conseil Maman', false, true, ARRAY['Puériculture', 'Pédiatrie'], 3),
    ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'depistage-glycemie-tension', 'services', 'Dépistage Tension & Glycémie Capillaire', 'فحص مجاني للضغط و السكري', 'Mesure instantanée de la pression artérielle et de la glycémie à jeun par un pharmacien diplômé avec carnet de suivi.', 0, 'Service Offert en Officine', 'DZD', 'Prévention', false, true, ARRAY['Contrôle gratuit', 'Sans rendez-vous'], 4),
    ('c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'pole-medical-labo', 'pole', 'Laboratoire & Cabinets Médicaux (Étage 1)', 'مخبر تحاليل و عيادات طبية بالطابق الأول', 'Prélèvements biologiques, analyses sanguines et consultations spécialisées directement au premier étage du bâtiment.', 0, '1er Étage du Bâtiment', 'DZD', 'Pôle 2 Étages', true, true, ARRAY['Analyses', 'Consultations'], 5)
ON CONFLICT (id) DO NOTHING;

-- 4. Reviews
INSERT INTO reviews (id, business_id, author, rating, review_date, source, text, highlight, is_featured) VALUES
    ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Amine B.', 5, 'Il y a 2 mois', 'Google Maps', 'Pharmacie très moderne sur deux étages, accueil chaleureux et professionnel. Prise en charge rapide avec la carte CHIFA et de très bons conseils pour le matériel médical.', 'Pharmacie moderne sur deux étages, accueil chaleureux', true),
    ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Fatima Zohra M.', 5, 'Il y a 3 mois', 'Google Maps', 'Le personnel est d''une grande gentillesse et à l''écoute. J''y trouve toujours tous mes médicaments et des produits de parapharmacie de grande qualité. Ouvert jusqu''à minuit c''est très rassurant !', 'Gentillesse, écoute et ouvert jusqu''à minuit', true),
    ('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Dr Mehdi K.', 5, 'Il y a 5 mois', 'Facebook', 'Un vrai complexe de santé à Abou Tachfine. Avoir le laboratoire et les médecins au 1er étage avec la pharmacie au rez-de-chaussée est un confort inestimable pour les patients.', 'Complexe santé complet avec laboratoire et cabinets', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Gallery Items
INSERT INTO gallery_items (id, business_id, slot, title, caption, aspect_ratio, image_url, sort_order) VALUES
    ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'facade-building', 'Façade & Bâtiment de Santé à Abou Tachfine', 'Bâtiment moderne sur 2 étages en face de la banque BNA', '16/10', 'images/facade-abou-tachfine.jpg', 0),
    ('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'pharmacy-interior', 'Officine Moderne & Comptoirs CHIFA', 'Espace spacieux, climatisé et confidentiel au rez-de-chaussée', '16/10', 'images/interieur-rdc.jpg', 1),
    ('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'medical-floor', '1er Étage · Laboratoire & Médecins Spécialistes', 'Analyses biologiques et consultations médicales dans le même lieu', '16/10', 'images/etage-medical.jpg', 2),
    ('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'wheelchairs', 'Rayon Mobilité & Fauteuils Roulants', '3 modèles de fauteuils roulants et maintien à domicile', '16/10', 'images/fauteuils-roulants.jpg', 3),
    ('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'dermo-nutraxin', 'Parapharmacie & Gamme Nutraxin', 'Soins de la peau, compléments alimentaires et micronutrition', '16/10', 'images/dermo-nutraxin.jpg', 4),
    ('e0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'baby-care', 'Univers Maman & Nourrisson', 'Laits infantiles spécifiques, puériculture et soins pédiatriques', '16/10', 'images/espace-bebe.jpg', 5)
ON CONFLICT (id) DO NOTHING;

-- 6. Owner Tasks (Checklist)
INSERT INTO owner_tasks (business_id, task_description, is_completed, category) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'Mettre à jour les dates d''astreinte nocturne dès publication du planning officiel de la DSP Tlemcen', false, 'missing_info'),
    ('a0000000-0000-0000-0000-000000000001', 'Confirmer le numéro mobile direct WhatsApp de permanence pour les ordonnances urgentes', false, 'missing_info'),
    ('a0000000-0000-0000-0000-000000000001', 'Prendre des photos supplémentaires du laboratoire et des cabinets médicaux du 1er étage', false, 'missing_info');
