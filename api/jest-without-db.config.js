module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist",
    ".*db.test.ts"
  ],
  setupFilesAfterEnv: ["./.setup-jasmine-env.js"]
}
