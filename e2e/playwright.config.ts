import { defineConfig } from '@playwright/test';

const port = Number(process.env.E2E_PORT ?? 4598);

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  timeout: 30_000,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    // The site is served from _site, so `task build` comes first.
    command: 'node server.ts',
    cwd: import.meta.dirname,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: false,
    env: { E2E_PORT: String(port) },
  },
});
