import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3001",
    // Simula viewport móvil con Chromium (disponible sin instalar WebKit)
    ...devices["Pixel 7"],
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 60_000,
    cwd: "../../",
    env: {
      npm_config_workspace: "apps/app",
      NEXT_TELEMETRY_DISABLED: "1",
      // Desactiva el overlay de desarrollo que bloquea pointer events
      __NEXT_TEST_MODE: "1",
    },
  },
});
