// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  roots: [
    "lib",
    "scripts"
  ],
  testPathIgnorePatterns: [
    'lib/test.js'
  ],
  testEnvironment: "node"
}
