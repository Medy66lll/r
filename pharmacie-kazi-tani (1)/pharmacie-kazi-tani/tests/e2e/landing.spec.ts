import { test, expect } from '@playwright/test';

test.describe('La Terrasse Plus Public Landing Flow', () => {
  test('loads landing page with real business branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Le feu de bois qui rassemble');
    await expect(page.getByText('4.4')).toBeVisible();
    await expect(page.getByText('118 avis')).toBeVisible();
  });

  test('filters menu offerings when category tabs are clicked', async ({ page }) => {
    await page.goto('/');
    const pizzaTab = page.getByRole('button', { name: 'Pizzas Artisanales' });
    await pizzaTab.click();
    await expect(page.getByText('Pizza Kebab au Vrai Gruyère')).toBeVisible();
  });

  test('toggles terrace festoon lights in signature swing section', async ({ page }) => {
    await page.goto('/');
    const lightBtn = page.getByRole('button', { name: /guirlandes/i });
    await expect(lightBtn).toBeVisible();
    await lightBtn.click();
    await expect(lightBtn).toContainText('Éteindre');
  });

  test('validates and submits table booking form', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="name"]', 'Amine Tlemcani');
    await page.fill('input[name="phone"]', '0552666015');
    await page.fill('input[name="date"]', '2026-10-15');
    await page.fill('input[name="time"]', '20:00');
    const submitBtn = page.getByRole('button', { name: /Envoyer ma réservation/i });
    await submitBtn.click();
    await expect(page.getByText(/Demande envoyée avec succès/i)).toBeVisible();
  });
});
