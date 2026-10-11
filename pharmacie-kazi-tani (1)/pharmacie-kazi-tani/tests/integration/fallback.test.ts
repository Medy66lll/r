import { describe, it, expect } from 'vitest';
import {
  getBusiness,
  getOfferings,
  getBusinessHours,
  getReviews,
  getGalleryItems,
  getOwnerTasks,
} from '../../src/lib/supabase/queries';

describe('Data Layer Static Fallback Integration', () => {
  it('returns verified business metadata when offline', async () => {
    const business = await getBusiness();
    expect(business).toBeDefined();
    expect(business.name).toBe('La terrasse plus');
    expect(business.city).toBe('Tlemcen');
    expect(business.rating).toBe(4.4);
    expect(business.review_count).toBe(118);
  });

  it('returns authentic menu offerings across all categories', async () => {
    const offerings = await getOfferings();
    expect(offerings.length).toBeGreaterThanOrEqual(10);
    const categories = new Set(offerings.map((o) => o.category));
    expect(categories.has('grillades')).toBe(true);
    expect(categories.has('pizzas')).toBe(true);
    expect(categories.has('burgers')).toBe(true);
  });

  it('returns 7 days of operating hours', async () => {
    const hours = await getBusinessHours();
    expect(hours.length).toBe(7);
  });

  it('returns verified reviews from real customers', async () => {
    const reviews = await getReviews();
    expect(reviews.length).toBeGreaterThanOrEqual(4);
    expect(reviews.some((r) => r.author.includes('Zoulikha Dalaa'))).toBe(true);
  });

  it('returns 6 gallery slots', async () => {
    const gallery = await getGalleryItems();
    expect(gallery.length).toBe(6);
  });

  it('returns owner checklist tasks from missing info', async () => {
    const tasks = await getOwnerTasks();
    expect(tasks.length).toBe(4);
  });
});
