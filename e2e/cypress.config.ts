import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://dev01.pergola.kuenste.live',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    videosFolder: 'cypress/results/videos',
    screenshotsFolder: 'cypress/results/screenshots',
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
})
