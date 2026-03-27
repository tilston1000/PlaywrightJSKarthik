import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['dot'],
    ['list'],
    ['json', { outputFile: 'report.json' }],
    ['allure-playwright'],
    ['blob'],
  ],
  use: {
    baseURL: 'https://www.thewarehouse.co.nz/',
    trace: 'on-first-retry',
    testIdAttribute: 'data-test-id',
    headless: true,
    launchOptions: {
      //slowMo: 2000,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        headless: true,
        video: 'on',
        screenshot: 'only-on-failure',
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     headless: false,
    //     video: 'on',
    //     screenshot: 'only-on-failure',
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    {
      name: 'webkit',
      use: {
        headless: true,
        video: 'on',
        screenshot: 'only-on-failure',
        ...devices['Desktop Safari'],
      },
    },
  ],
});
