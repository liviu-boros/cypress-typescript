import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "https://m.aboutyou.com/",
    viewportWidth: 360,
    viewportHeight: 800,
    scrollBehavior: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
