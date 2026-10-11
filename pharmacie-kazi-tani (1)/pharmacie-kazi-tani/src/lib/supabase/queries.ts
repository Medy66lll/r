import { supabase, isSupabaseConfigured } from './client';
import {
  FALLBACK_BUSINESS,
  FALLBACK_HOURS,
  FALLBACK_OFFERINGS,
  FALLBACK_REVIEWS,
  FALLBACK_GALLERY,
  FALLBACK_TASKS,
} from './fallback';
import type { Database } from '@/types/database';

type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];

export async function getBusiness() {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_BUSINESS;
  try {
    const { data, error } = await supabase.from('businesses').select('*').limit(1).single();
    if (error || !data) return FALLBACK_BUSINESS;
    return data;
  } catch {
    return FALLBACK_BUSINESS;
  }
}

export async function getOfferings() {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_OFFERINGS;
  try {
    const { data, error } = await supabase.from('offerings').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_OFFERINGS;
    return data;
  } catch {
    return FALLBACK_OFFERINGS;
  }
}

export async function getBusinessHours() {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_HOURS;
  try {
    const { data, error } = await supabase.from('business_hours').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_HOURS;
    return data;
  } catch {
    return FALLBACK_HOURS;
  }
}

export async function getReviews() {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_REVIEWS;
  try {
    const { data, error } = await supabase.from('reviews').select('*').order('rating', { ascending: false });
    if (error || !data || data.length === 0) return FALLBACK_REVIEWS;
    return data;
  } catch {
    return FALLBACK_REVIEWS;
  }
}

export async function getGalleryItems() {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_GALLERY;
  try {
    const { data, error } = await supabase.from('gallery_items').select('*').order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_GALLERY;
    return data;
  } catch {
    return FALLBACK_GALLERY;
  }
}

export async function getOwnerTasks() {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_TASKS;
  try {
    const { data, error } = await supabase.from('owner_tasks').select('*');
    if (error || !data) return FALLBACK_TASKS;
    return data;
  } catch {
    return FALLBACK_TASKS;
  }
}

export async function createReservation(res: ReservationInsert) {
  if (!isSupabaseConfigured || !supabase) {
    // Return mock success with generated ID when running offline
    return { success: true, id: `local-${Date.now()}` };
  }
  const { data, error } = await supabase.from('reservations').insert(res).select().single();
  if (error) throw error;
  return { success: true, id: data.id };
}

export async function getReservations() {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from('reservations').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateOfferingAvailability(id: string, isAvailable: boolean) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('offerings').update({ is_available: isAvailable }).eq('id', id);
  if (error) throw error;
}

export async function toggleTaskCompletion(id: string, isCompleted: boolean) {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from('owner_tasks').update({ is_completed: isCompleted }).eq('id', id);
  if (error) throw error;
}
