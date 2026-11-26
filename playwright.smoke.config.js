const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './smoke',
  timeout: 120000,
  reporter: [['list']],
  use: { headless: true },
});
