const { test, expect } = require('@playwright/test');

test('live site is the build we just deployed and it works', async ({ page }) => {
  const sha = process.env.EXPECTED_SHA.slice(0, 7);

  // Pages can take a little while to switch to the new version, so keep reloading until it does.
  await expect(async () => {
    await page.goto(`${process.env.SITE_URL}?v=${sha}`);
    await expect(page.getByTestId('build')).toHaveText(sha, { timeout: 2000 });
  }).toPass({ timeout: 90000, intervals: [5000] });

  await page.getByLabel('Subtotal ($)').fill('100');
  await page.getByRole('button', { name: 'Calculate total' }).click();
  await expect(page.getByTestId('total')).toHaveText('Total: $108.00');
});
