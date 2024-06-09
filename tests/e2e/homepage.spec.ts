import { test, expect } from '@playwright/test';

test('homepage has ZipCo in title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/ZipCo/);
});

test('homepage has a filter input', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input')).toBeVisible();
});
