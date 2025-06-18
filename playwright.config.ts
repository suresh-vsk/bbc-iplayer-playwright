import { defineConfig, devices } from "@playwright/test";
import env from "dotenv";
import path from "path";

if (process.env.NODE_ENV) {
  const envPath = path.resolve(
    process.cwd(),
    "envConfig",
    `.env.${process.env.NODE_ENV}`,
  );
  env.config({
    path: envPath,
  });
} else {
  env.config(); // This loads .env from project root
}

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [["html"],['allure-playwright', { outputFolder: 'allure-results' }], ["list"]],
  use: {
    viewport: { width: 1280, height: 720 },
    trace: "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome']
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari']
      },
    }
  ],
  fullyParallel: true,
  workers: 4,
});
