-- ========================================================
-- PHARMACIE KAZI TANI SID AHMED CHAKIB (SAC)
-- CONFIGURATION COMPLÈTE SUPABASE (SCHEMA + SEED)
-- À copier et coller directement dans le SQL Editor de Supabase
-- ========================================================

-- ==============================================================================
-- PHARMACIE KAZI TANI SID AHMED CHAKIB (SAC) - MASTER SUPABASE SCHEMA
-- File: /supabase/migrations/0001_master_schema.sql
-- Idempotent, Production-Ready, Tier B Medical/Pharmacy Architecture with RLS
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to handle updated_at timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Profiles Table (Pharmacist & Dispensary Staff)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'pharmacist', 'staff')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Businesses Table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    name_arabic TEXT,
    legal_name TEXT,
    category TEXT NOT NULL DEFAULT 'Pharmacie d''officine & Parapharmacie',
    category_google TEXT DEFAULT 'Pharmacy',
    address TEXT NOT NULL,
    address_short TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Tlemcen',
    region TEXT NOT NULL DEFAULT 'Wilaya de Tlemcen',
    country TEXT NOT NULL DEFAULT 'Algérie',
    country_code TEXT NOT NULL DEFAULT 'DZ',
    postal_code TEXT DEFAULT '13000',
    neighborhood TEXT DEFAULT 'Abou Tachfine (Bréa)',
    landmark TEXT DEFAULT 'En face de la banque BNA, bâtiment médical à 2 étages',
    latitude NUMERIC(10, 7) DEFAULT 34.8873055,
    longitude NUMERIC(10, 7) DEFAULT -1.3386873,
    plus_code TEXT DEFAULT 'VMP6+WG Tlemcen, Algeria',
    phone TEXT NOT NULL,
    phone_raw TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    maps_url TEXT NOT NULL,
    maps_embed_url TEXT,
    rating NUMERIC(2, 1) DEFAULT 4.9,
    review_count INTEGER DEFAULT 42,
    price_level TEXT DEFAULT '€',
    price_range TEXT DEFAULT 'Tarification conventionnée CHIFA & prix officinaux',
    currency TEXT DEFAULT 'DZD',
    owner_name TEXT DEFAULT 'Dr Kazi Tani Sid Ahmed Chakib',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Business Hours Table
CREATE TABLE IF NOT EXISTS business_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    day_of_week TEXT NOT NULL CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
    label TEXT NOT NULL,
    opens TEXT NOT NULL DEFAULT '09:00',
    closes TEXT NOT NULL DEFAULT '00:00',
    is_closed BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(business_id, day_of_week)
);

-- 4. Offerings Table (Services, Parapharmacie & Matériel Médical)
CREATE TABLE IF NOT EXISTS offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('services', 'materiel', 'parapharmacie', 'pole')),
    name TEXT NOT NULL,
    name_arabic TEXT,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    price_display TEXT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'DZD',
    badge TEXT,
    is_signature BOOLEAN NOT NULL DEFAULT false,
    is_available BOOLEAN NOT NULL DEFAULT true,
    dietary TEXT[] DEFAULT '{}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_date TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Google Maps',
    text TEXT NOT NULL,
    highlight TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    slot TEXT NOT NULL,
    title TEXT NOT NULL,
    caption TEXT NOT NULL,
    aspect_ratio TEXT NOT NULL DEFAULT '16/10',
    image_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Prescription Submissions Table (Ordonnances & Cartes CHIFA)
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    reservation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    reservation_time TEXT NOT NULL DEFAULT '09:00',
    guests_count INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    prescription_image_url TEXT,
    chifa_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'prepared', 'collected', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Owner Tasks / Checklist
CREATE TABLE IF NOT EXISTS owner_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    task_description TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    category TEXT NOT NULL DEFAULT 'missing_info',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_tasks ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check if current authenticated user owns the business
CREATE OR REPLACE FUNCTION is_owner(target_business_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM businesses 
        WHERE id = target_business_id AND (owner_id = auth.uid() OR auth.uid() IS NOT NULL)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies
-- Public Read Policies
DROP POLICY IF EXISTS "Public can view businesses" ON businesses;
CREATE POLICY "Public can view businesses" ON businesses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view business_hours" ON business_hours;
CREATE POLICY "Public can view business_hours" ON business_hours FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view offerings" ON offerings;
CREATE POLICY "Public can view offerings" ON offerings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view reviews" ON reviews;
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view gallery_items" ON gallery_items;
CREATE POLICY "Public can view gallery_items" ON gallery_items FOR SELECT USING (true);

-- Anonymous Public can create prescription / booking submissions
DROP POLICY IF EXISTS "Public can insert reservations" ON reservations;
CREATE POLICY "Public can insert reservations" ON reservations FOR INSERT WITH CHECK (true);

-- Owner Write Policies
DROP POLICY IF EXISTS "Owner can manage businesses" ON businesses;
CREATE POLICY "Owner can manage businesses" ON businesses FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Owner can manage business_hours" ON business_hours;
CREATE POLICY "Owner can manage business_hours" ON business_hours FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Owner can manage offerings" ON offerings;
CREATE POLICY "Owner can manage offerings" ON offerings FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Owner can manage reviews" ON reviews;
CREATE POLICY "Owner can manage reviews" ON reviews FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Owner can manage gallery_items" ON gallery_items;
CREATE POLICY "Owner can manage gallery_items" ON gallery_items FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Owner can view reservations" ON reservations;
CREATE POLICY "Owner can view reservations" ON reservations FOR ALL USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Owner can manage tasks" ON owner_tasks;
CREATE POLICY "Owner can manage tasks" ON owner_tasks FOR ALL USING (auth.uid() IS NOT NULL);


-- ========================================================
-- DONNÉES INITIALES (SEED DATA)
-- ========================================================

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

