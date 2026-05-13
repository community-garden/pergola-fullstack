// Global Cypress support file — runs before every spec.
// Add custom commands or global hooks here.

Cypress.on('uncaught:exception', () => {
  // Don't fail tests on uncaught app exceptions (e.g. OIDC redirect noise).
  return false
})
