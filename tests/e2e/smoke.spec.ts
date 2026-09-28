import { test, expect } from '@playwright/test';

test('portfolio loads correctly', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  const response = await page.goto('/');

  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('body')).toBeVisible();

  expect(errors).toEqual([]);
});
