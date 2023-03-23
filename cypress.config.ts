import { defineConfig } from "cypress"

export default defineConfig({
  env: {
    baseAPI: "https://api-v4.practicesoftwaretesting.com",
  },
  e2e: {
    baseUrl: "https://v4.practicesoftwaretesting.com",
    viewportWidth: 1000,
    viewportHeight: 800,
    scrollBehavior: "center",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
