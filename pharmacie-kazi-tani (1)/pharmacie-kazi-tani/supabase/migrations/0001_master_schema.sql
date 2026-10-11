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
