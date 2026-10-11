import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/features/site/MobileActionBar';
import { HeroSection } from '@/features/site/HeroSection';
import { TrustSection } from '@/features/site/TrustSection';
import { FacilitySection } from '@/features/site/FacilitySection';
import { ServicesSection } from '@/features/site/ServicesSection';
import { VideoSection } from '@/features/site/VideoSection';
import { SocialFeedSection } from '@/features/site/SocialFeedSection';
import { PrescriptionSection } from '@/features/site/PrescriptionSection';
import { StorySection } from '@/features/site/StorySection';
import { GallerySection } from '@/features/site/GallerySection';
import { ReviewsSection } from '@/features/site/ReviewsSection';
import { PracticalInfoSection } from '@/features/site/PracticalInfoSection';
import { CtaBannerSection } from '@/features/site/CtaBannerSection';
import { LoginForm } from '@/features/auth/LoginForm';
import { AdminDashboard } from '@/features/admin/AdminDashboard';
import { getBusiness, getOfferings, getBusinessHours, getReviews, getGalleryItems } from '@/lib/supabase/queries';
import { injectJsonLd } from '@/lib/seo';
import type { Database } from '@/types/database';

type Business = Database['public']['Tables']['businesses']['Row'];
type Offering = Database['public']['Tables']['offerings']['Row'];
type BusinessHour = Database['public']['Tables']['business_hours']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];
type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];

export const App: React.FC = () => {
  const [view, setView] = useState<'site' | 'login' | 'admin'>('site');
  const [business, setBusiness] = useState<Business | null>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function loadSiteData() {
      const [b, o, h, r, g] = await Promise.all([
        getBusiness(),
        getOfferings(),
        getBusinessHours(),
        getReviews(),
        getGalleryItems(),
      ]);
      setBusiness(b);
      setOfferings(o);
      setHours(h);
      setReviews(r);
      setGallery(g);
      if (b) injectJsonLd(b);
    }
    loadSiteData();
  }, []);

  if (view === 'login') {
    return <LoginForm onSuccess={() => setView('admin')} onCancel={() => setView('site')} />;
  }

  if (view === 'admin') {
    return <AdminDashboard onLogout={() => setView('site')} onViewSite={() => setView('site')} />;
  }

  if (!business) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-display text-slate-700">Chargement...</div>;
  }

  const rawPhone = (business.whatsapp || business.phone_raw || business.phone || '043228643').replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '213' + rawPhone.substring(1) : (rawPhone.startsWith('213') ? rawPhone : '213' + rawPhone);
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        businessName={business.name}
        nameArabic={business.name_arabic}
        phone={business.phone}
        phoneHref={business.phone_href}
        whatsappUrl={whatsappUrl}
        onNavigateAdmin={() => setView('login')}
      />

      <main>
        <HeroSection
          businessName={business.name}
          nameArabic={business.name_arabic}
          phone={business.phone}
          phoneHref={business.phone_href}
          whatsappUrl={whatsappUrl}
        />
        <TrustSection />
        <FacilitySection />
        <ServicesSection offerings={offerings} whatsappNumber={cleanPhone} />
        <VideoSection />
        <SocialFeedSection />
        <PrescriptionSection businessId={business.id} whatsappNumber={cleanPhone} />
        <StorySection />
        <GallerySection galleryItems={gallery} />
        <ReviewsSection reviews={reviews} mapsUrl={business.maps_url} />
        <PracticalInfoSection
          address={business.address}
          phone={business.phone}
          phoneHref={business.phone_href}
          mapsUrl={business.maps_url}
          mapsEmbedUrl={business.maps_embed_url}
          hours={hours}
        />
        <CtaBannerSection
          phone={business.phone}
          phoneHref={business.phone_href}
          whatsappUrl={whatsappUrl}
        />
      </main>

      <Footer
        businessName={business.name}
        nameArabic={business.name_arabic}
        address={business.address}
        phone={business.phone}
        phoneHref={business.phone_href}
        onNavigateAdmin={() => setView('login')}
      />

      <MobileActionBar
        phoneHref={business.phone_href}
        whatsappUrl={whatsappUrl}
      />
    </div>
  );
};
