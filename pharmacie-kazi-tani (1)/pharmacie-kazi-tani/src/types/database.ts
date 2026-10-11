export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'owner' | 'admin' | 'staff';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'owner' | 'admin' | 'staff';
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string | null;
          name: string;
          name_arabic: string | null;
          legal_name: string | null;
          category: string;
          category_google: string | null;
          address: string;
          address_short: string;
          city: string;
          region: string;
          country: string;
          country_code: string;
          postal_code: string;
          neighborhood: string;
          landmark: string | null;
          latitude: number;
          longitude: number;
          plus_code: string | null;
          phone: string;
          phone_raw: string;
          whatsapp: string;
          maps_url: string;
          maps_embed_url: string;
          rating: number;
          review_count: number;
          price_level: string;
          price_range: string;
          currency: string;
          owner_name: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['businesses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>;
      };
      business_hours: {
        Row: {
          id: string;
          business_id: string;
          day_of_week: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
          label: string;
          opens: string;
          closes: string;
          is_closed: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['business_hours']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['business_hours']['Insert']>;
      };
      offerings: {
        Row: {
          id: string;
          business_id: string;
          slug: string;
          category: 'grillades' | 'entrees' | 'pizzas' | 'burgers' | 'boissons';
          name: string;
          name_arabic: string | null;
          description: string;
          price: number;
          price_display: string;
          currency: string;
          badge: string | null;
          is_signature: boolean;
          is_available: boolean;
          dietary: string[];
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['offerings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['offerings']['Insert']>;
      };
      reviews: {
        Row: {
          id: string;
          business_id: string;
          author: string;
          rating: number;
          review_date: string;
          source: string;
          text: string;
          highlight: string | null;
          is_featured: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
      gallery_items: {
        Row: {
          id: string;
          business_id: string;
          slot: string;
          title: string;
          caption: string;
          aspect_ratio: string;
          image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['gallery_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['gallery_items']['Insert']>;
      };
      reservations: {
        Row: {
          id: string;
          business_id: string;
          name: string;
          phone: string;
          reservation_date: string;
          reservation_time: string;
          party_size: string;
          seating_preference: string;
          notes: string | null;
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reservations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>;
      };
      owner_tasks: {
        Row: {
          id: string;
          business_id: string;
          task_description: string;
          is_completed: boolean;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['owner_tasks']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['owner_tasks']['Insert']>;
      };
    };
  };
}
