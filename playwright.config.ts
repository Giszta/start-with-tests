import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './app/e2e',
  testMatch: ['**/*.spec.ts'],
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000'
  },
  webServer: {
    command: 'npm run serve:test-app',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true
  }
})