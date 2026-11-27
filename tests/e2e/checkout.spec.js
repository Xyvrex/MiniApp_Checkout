const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

// These tests run against the BUILT app in dist/, like a real pipeline does.
const appUrl = pathToFileURL(path.join(__dirname, '..', '..', 'dist', 'index.html')).href;

async function calculate(page, subtotal) {
  await page.getByLabel('Subtotal ($)').fill(String(subtotal));
  await page.getByRole('button', { name: 'Calculate total' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl);
});

test('TC_CO_001: Checkout page shows all expected labels and fields', async ({ page }) => {
  await expect(page).toHaveTitle('Checkout');
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();

  const subtotal = page.getByLabel('Subtotal ($)');
  await expect(subtotal).toBeVisible();
  await expect(subtotal).toHaveAttribute('type', 'number');
  await expect(subtotal).toHaveValue('100');
  

  await expect(page.getByRole('button', { name: 'Calculate total' })).toBeVisible();
  await expect(page.getByTestId('total')).toHaveText('');
  await expect(page.locator('#total')).not.toBeVisible();
  
});

test('TC_CO_002: The build step stamped a version into the page TC-115', async ({ page }) => {
  await expect(page.getByTestId('build')).not.toHaveText('__BUILD_VERSION__');
});

test('TC_CO_003: adds 8% tax to a $100 subtotal TC-104', async ({ page }) => {
  await calculate(page, 100);
  await expect(page.getByTestId('total')).toHaveText('Total: $108.00');
});

test('TC_CO_004: Adds 8% tax to a $50 subtotal TC-105', async ({ page }) => {
  await calculate(page, 50);
  await expect(page.getByTestId('total')).toHaveText('Total: $54.00');
});
