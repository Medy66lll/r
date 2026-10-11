-- ========================================================
-- LA TERRASSE PLUS - CONFIGURATION COMPLÈTE SUPABASE
-- À copier et coller directement dans le SQL Editor de Supabase
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now(); RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- 1. Profiles Table (Owner & Staff)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'staff')),
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
    category TEXT NOT NULL,
    category_google TEXT,
    address TEXT NOT NULL,
    address_short TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    country_code TEXT NOT NULL DEFAULT 'DZ',
    postal_code TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    landmark TEXT,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    plus_code TEXT,
    phone TEXT NOT NULL,
    phone_raw TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    maps_url TEXT NOT NULL,
    maps_embed_url TEXT NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.4,
    review_count INTEGER NOT NULL DEFAULT 118,
    price_level TEXT NOT NULL DEFAULT '€',
    price_range TEXT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'DZD',
    owner_name TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- 3. Business Hours Table
CREATE TABLE IF NOT EXISTS business_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    day_of_week TEXT NOT NULL CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
    label TEXT NOT NULL,
    opens TIME NOT NULL,
    closes TIME NOT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- 4. Offerings Table
CREATE TABLE IF NOT EXISTS offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('grillades', 'entrees', 'pizzas', 'burgers', 'boissons')),
    name TEXT NOT NULL,
    name_arabic TEXT,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
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
    source TEXT NOT NULL,
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
-- 7. Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    party_size TEXT NOT NULL,
    seating_preference TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- 8. Owner Tasks Table (Missing info checklist)
CREATE TABLE IF NOT EXISTS owner_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    task_description TEXT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    category TEXT NOT NULL DEFAULT 'missing_info',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_business_hours_business ON business_hours(business_id);
CREATE INDEX IF NOT EXISTS idx_offerings_business ON offerings(business_id);
CREATE INDEX IF NOT EXISTS idx_offerings_category ON offerings(category);
CREATE INDEX IF NOT EXISTS idx_reviews_business ON reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_gallery_items_business ON gallery_items(business_id);
CREATE INDEX IF NOT EXISTS idx_reservations_business ON reservations(business_id);
CREATE INDEX IF NOT EXISTS idx_owner_tasks_business ON owner_tasks(business_id);
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS trg_businesses_updated_at ON businesses;
CREATE TRIGGER trg_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS trg_business_hours_updated_at ON business_hours;
CREATE TRIGGER trg_business_hours_updated_at BEFORE UPDATE ON business_hours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS trg_offerings_updated_at ON offerings;
CREATE TRIGGER trg_offerings_updated_at BEFORE UPDATE ON offerings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS trg_reservations_updated_at ON reservations;
CREATE TRIGGER trg_reservations_updated_at BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS trg_owner_tasks_updated_at ON owner_tasks;
CREATE TRIGGER trg_owner_tasks_updated_at BEFORE UPDATE ON owner_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_tasks ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION is_owner(target_business_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM businesses
        WHERE id = target_business_id AND (owner_id = auth.uid() OR auth.uid() IN (SELECT id FROM profiles WHERE role IN ('owner', 'admin')))
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Public can view published business" ON businesses;
CREATE POLICY "Public can view published business" ON businesses FOR SELECT USING (is_published = true);
DROP POLICY IF EXISTS "Owner can modify business" ON businesses;
CREATE POLICY "Owner can modify business" ON businesses FOR ALL USING (auth.uid() = owner_id);
DROP POLICY IF EXISTS "Public can view hours" ON business_hours;
CREATE POLICY "Public can view hours" ON business_hours FOR SELECT USING (true);
DROP POLICY IF EXISTS "Owner can manage hours" ON business_hours;
CREATE POLICY "Owner can manage hours" ON business_hours FOR ALL USING (is_owner(business_id));
DROP POLICY IF EXISTS "Public can view offerings" ON offerings;
CREATE POLICY "Public can view offerings" ON offerings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Owner can manage offerings" ON offerings;
CREATE POLICY "Owner can manage offerings" ON offerings FOR ALL USING (is_owner(business_id));
DROP POLICY IF EXISTS "Public can view reviews" ON reviews;
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Owner can manage reviews" ON reviews;
CREATE POLICY "Owner can manage reviews" ON reviews FOR ALL USING (is_owner(business_id));
DROP POLICY IF EXISTS "Public can view gallery" ON gallery_items;
CREATE POLICY "Public can view gallery" ON gallery_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Owner can manage gallery" ON gallery_items;
CREATE POLICY "Owner can manage gallery" ON gallery_items FOR ALL USING (is_owner(business_id));
DROP POLICY IF EXISTS "Public can submit reservation" ON reservations;
CREATE POLICY "Public can submit reservation" ON reservations FOR INSERT WITH CHECK (name <> '' AND phone <> '');
DROP POLICY IF EXISTS "Owner can view and update reservations" ON reservations;
CREATE POLICY "Owner can view and update reservations" ON reservations FOR ALL USING (is_owner(business_id));
DROP POLICY IF EXISTS "Owner can view and manage tasks" ON owner_tasks;
CREATE POLICY "Owner can view and manage tasks" ON owner_tasks FOR ALL USING (is_owner(business_id));
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Wahid'), 'owner')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ========================================================
-- DONNÉES INITIALES (SEED DATA)
-- ========================================================

-- seed.sql: Initial database seed derived from maps-to-landing/site-data@1

-- 1. Seed Business Profile
INSERT INTO businesses (
    id, name, name_arabic, legal_name, category, category_google,
    address, address_short, city, region, country, country_code,
    postal_code, neighborhood, landmark, latitude, longitude,
    plus_code, phone, phone_raw, whatsapp, maps_url, maps_embed_url,
    rating, review_count, price_level, price_range, currency, owner_name, is_published
) VALUES (
    'b0000000-0000-0000-0000-000000000001', 'La terrasse plus', 'مطعم لا تيراس بلس', NULL, 'Restaurant oriental & grillades', 'Arab restaurant',
    'N 1 Hai nassim, Tlemcen 13000, Algérie', 'Hai Nassim · Tlemcen', 'Tlemcen', 'Wilaya de Tlemcen', 'Algérie', 'DZ',
    '13000', 'Hai Nassim, Imama', 'Juste à côté du Taxi Ben Ali', 34.8873055, -1.3386873,
    'VMP6+WG Tlemcen, Algeria', '+213 552 66 60 15', '0552666015', '+213 552 66 60 15', 'https://maps.app.goo.gl/aQ5kTXyr7tQGKop1A', 'https://maps.google.com/maps?q=34.8873055,-1.3386873&hl=fr&z=16&output=embed',
    4.4, 118, '€', '300 - 2 250 DZD', 'DZD', 'Wahid', true
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 2. Seed Business Hours
INSERT INTO business_hours (business_id, day_of_week, label, opens, closes, is_closed, sort_order) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'monday', 'Lundi', '11:30', '00:00', false, 0),
    ('b0000000-0000-0000-0000-000000000001', 'tuesday', 'Mardi', '11:30', '00:00', false, 1),
    ('b0000000-0000-0000-0000-000000000001', 'wednesday', 'Mercredi', '11:30', '00:00', false, 2),
    ('b0000000-0000-0000-0000-000000000001', 'thursday', 'Jeudi', '11:30', '00:30', false, 3),
    ('b0000000-0000-0000-0000-000000000001', 'friday', 'Vendredi', '15:00', '01:00', false, 4),
    ('b0000000-0000-0000-0000-000000000001', 'saturday', 'Samedi', '11:30', '00:30', false, 5),
    ('b0000000-0000-0000-0000-000000000001', 'sunday', 'Dimanche', '11:30', '00:00', false, 6);

-- 3. Seed Menu Offerings
INSERT INTO offerings (business_id, slug, category, name, name_arabic, description, price, price_display, currency, badge, is_signature, dietary, sort_order) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'grill-mixte', 'grillades', 'Plat Grillades au Feu de Bois', 'طبق مشاوي على الجمر', 'Brochettes marinées, kefta parfumée et merguez à la braise avec frites et sauces maison.', 1200, '1 200 DZD', 'DZD', 'Coup de cœur', true, ARRAY['Halal', 'Fait maison'], 0),
    ('b0000000-0000-0000-0000-000000000001', 'plat-mhamer', 'grillades', 'Plat Mhamer Sucré Salé', 'طبق محمر حلو و مالح التلمساني', 'Grand classique de Tlemcen : viande fondante mijotée aux pruneaux confits, raisins et amandes.', 2250, '2 250 DZD', 'DZD', 'Spécialité Tlemcen', true, ARRAY['Halal', 'Tradition'], 1),
    ('b0000000-0000-0000-0000-000000000001', 'plat-filet', 'grillades', 'Plat Filet de Bœuf Braisé', 'ستيك فيليه بقري مشوي', 'Pièce noble de bœuf tendre saisie au grill avec légumes sautés et frites dorées.', 2250, '2 250 DZD', 'DZD', NULL, false, ARRAY['Halal'], 2),
    ('b0000000-0000-0000-0000-000000000001', 'entree-hrira', 'entrees', 'Hrira Traditionnelle Tlemcénienne', 'حريرة تلمسانية تقليدية', 'Soupe emblématique au levain maison, herbes aromatiques, carvi et coriandre fraîche.', 300, '300 DZD', 'DZD', 'Incontournable', true, ARRAY['Halal', 'Tradition'], 3),
    ('b0000000-0000-0000-0000-000000000001', 'entree-bastela', 'entrees', 'Pastilla Artisanale Croustillante', 'بسطيلة تقليدية مقرمشة', 'Feuilletage doré ultra-fin, garniture parfumée aux épices douces et amandes torréfiées.', 450, '450 DZD', 'DZD', 'Fait Maison', true, ARRAY['Halal'], 4),
    ('b0000000-0000-0000-0000-000000000001', 'entree-bourek', 'entrees', 'Bourek Viande Hachée & Fromage', 'بوراك باللحم المفروم والجبن', 'Feuilles de dioul croustillantes, viande hachée assaisonnée, persil frais et fromage fondu.', 250, '250 DZD', 'DZD', NULL, false, ARRAY['Halal'], 5),
    ('b0000000-0000-0000-0000-000000000001', 'pizza-kebab', 'pizzas', 'Pizza Kebab au Vrai Gruyère', 'بيتزا كباب بجبن الغرويير', 'Pâte artisanale étalée main, viande kebab grillée, oignons et vraie couverture de gruyère fondu.', 800, '800 DZD', 'DZD', 'Favori Clients', true, ARRAY['Halal'], 6),
    ('b0000000-0000-0000-0000-000000000001', 'pizza-terrasse', 'pizzas', 'Pizza Prestige La Terrasse', 'بيتزا بيضاء لا تيراس', 'Crème blanche onctueuse, crevettes roses fraîches, saumon et trio de fromages fondants.', 1350, '1 350 DZD', 'DZD', 'Prestige', true, ARRAY['Fruits de mer'], 7),
    ('b0000000-0000-0000-0000-000000000001', 'burger-matlou3', 'burgers', 'Burger Blédard (Pain Matlou3)', 'برغر بليدار بخبز المطلوع', 'Steak pur bœuf, œuf, fromage et sauce maison dans un pain matlou3 traditionnel cuit minute.', 550, '550 DZD', 'DZD', 'Création Maison', true, ARRAY['Halal', 'Matlou3 maison'], 8),
    ('b0000000-0000-0000-0000-000000000001', 'burger-terrasse', 'burgers', 'Double Burger La Terrasse', 'برغر دابل لا تيراس', 'Double steak haché grillé, double fromage, œuf au plat et sauce secrète de la maison.', 750, '750 DZD', 'DZD', 'Généreux', false, ARRAY['Halal'], 9),
    ('b0000000-0000-0000-0000-000000000001', 'boisson-mojito', 'boissons', 'Mojito Fraîcheur Glacé', 'موهيتو بالليمون والنعناع', 'Citron vert pilé, menthe fraîche du jardin et bulles rafraîchissantes sur lit de glace pilée.', 350, '350 DZD', 'DZD', 'Cocktail Maison', false, ARRAY['Sans alcool'], 10),
    ('b0000000-0000-0000-0000-000000000001', 'boisson-orange', 'boissons', 'Jus d''Orange Pressé Minute', 'عصير برتقال طبيعي طازج', 'Oranges fraîches locales pressées à la commande, sans sucres ajoutés.', 300, '300 DZD', 'DZD', '100% Naturel', false, ARRAY['Pur jus'], 11);

-- 4. Seed Verified Reviews
INSERT INTO reviews (business_id, author, rating, review_date, source, text, highlight, is_featured) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'Zoulikha Dalaa', 5, 'Il y a 7 mois', 'Google Maps', 'Excellent restaurant que je recommande ,allez y les yeux fermés , hrira délicieuse , bastilla et bourek aussi les plats sont genereux et tres bien presenté le dessert rien a dire et les prix sont tres tres correct , l acceuil 5/5 vous avez meme une balançoire pour vos photos, bref g aucune critique hhh je vous souhaite une bonne continuation', 'Hrira délicieuse, bastilla généreuse et la balançoire pour les photos', true),
    ('b0000000-0000-0000-0000-000000000001', 'Ly Z', 5, 'Il y a 7 mois', 'Google Maps', 'Très joli restaurant familial, une terrasse très cosy. La restauration est plutôt bonne. Les grillades ont un super goût et la pizza aussi. Je n’ai pas goûté les desserts services rapide.', 'Terrasse très cosy, grillades au super goût et service rapide', true),
    ('b0000000-0000-0000-0000-000000000001', 'Issam Hosny Rouzeik', 5, 'Il y a 7 mois', 'Google Maps', 'Très bonne adresse. Je recommande vivement. Les prix très raisonnables par rapport à la qualité des produits et des plats.', 'Prix très raisonnables par rapport à la qualité', true),
    ('b0000000-0000-0000-0000-000000000001', 'Salmi Tema', 5, 'Décembre 2025', 'Facebook', 'Une équipe souriante et professionnelle, aux petits soins pour ses clients. Restaurant La Terrasse Plus est le lieu idéal pour se faire plaisir et créer de beaux souvenirs. Une explosion de saveurs, un véritable chef-d''œuvre dans chaque assiette.', 'Équipe souriante aux petits soins, explosion de saveurs', true);

-- 5. Seed Gallery Slots
INSERT INTO gallery_items (business_id, slot, title, caption, aspect_ratio, image_url, sort_order) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'hero-photo', 'La Terrasse Végétale & Cosy', 'Espace en plein air arboré, tables conviviales et éclairage tamisé le soir', '16/10', '/images/hero-terrace.jpg', 0),
    ('b0000000-0000-0000-0000-000000000001', 'photo-swing', 'La Balançoire à Photos Signature', 'Le spot photo emblématique qui enchante les familles et les sorties entre amis', '4/5', '/images/terrace-swing.jpg', 1),
    ('b0000000-0000-0000-0000-000000000001', 'woodfire-grill', 'Grillades à la Braise de Bois', 'Brochettes et viandes tendres cuites sous les yeux des convives', '4/3', '/images/woodfire-grill.jpg', 2),
    ('b0000000-0000-0000-0000-000000000001', 'artisan-pizza', 'Pizza Kebab & Vrai Gruyère', 'Pâte artisanale alvéolée et généreux fromage gruyère fondant', '4/3', '/images/pizza-kebab.jpg', 3),
    ('b0000000-0000-0000-0000-000000000001', 'burger-matlou3', 'Burger Blédard sur Pain Matlou3', 'Le mariage gourmand du burger contemporain et du pain traditionnel pétri sur place', '4/3', '/images/burger-matlou3.jpg', 4),
    ('b0000000-0000-0000-0000-000000000001', 'interior-dining', 'Salle Climatisée & Chaleureuse', 'Ambiance soignée, bois naturel et accueil personnalisé par Wahid et l''équipe', '16/10', '/images/interior-dining.jpg', 5);

-- 6. Seed Missing Info Checklist as Owner Tasks
INSERT INTO owner_tasks (business_id, task_description, is_completed, category) VALUES
    ('b0000000-0000-0000-0000-000000000001', 'Heures exactes d''ouverture et de fermeture quotidiennes (non indiquées sur la fiche Google Maps, mention ''Ouvert tous les jours'' confirmée sur les réseaux sociaux)', false, 'missing_info'),
    ('b0000000-0000-0000-0000-000000000001', 'Fichier vectoriel haute résolution du logo officiel (dérivé de l''enseigne physique extérieure rétro-éclairée)', false, 'missing_info'),
    ('b0000000-0000-0000-0000-000000000001', 'Nom de domaine officiel et site web indépendant (actuellement représenté via Facebook, Google Maps et Yassir Delivery)', false, 'missing_info'),
    ('b0000000-0000-0000-0000-000000000001', 'Détails spécifiques sur l''accessibilité PMR (rampe pour personnes à mobilité réduite) et capacité exacte du stationnement attenant', false, 'missing_info');

