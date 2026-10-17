import { test, expect } from '@playwright/test';

test('Landing Page (Home): Should have correct title and layout', async ({ page }) => {
  await page.goto('/');

  // Title check (Expect "지인통증클리닉" or similar based on context)
  await expect(page).toHaveTitle(/지인통증클리닉|지인|Clinic/);

  // Essential Layout Check
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();

  // Hero section check (Deep orange theme indicator)
  // Assuming a logo or hero text exists.
  const heroText = page.locator('h1');
  await expect(heroText).toBeVisible();
});

test('Intro Page: Should load doctor and clinic information', async ({ page }) => {
  await page.goto('/intro');

  await expect(page.locator('h1')).toBeVisible();
  // Check for specific intro content
  await expect(page.getByText('본질에 충실한')).toBeVisible();
});

test('Medical Page: Should load medical information sections', async ({ page }) => {
  await page.goto('/medical');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByText('주요 질환')).toBeVisible();
});
