module.exports = {
  preset: 'react-native',
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.test.json"
    }
  },
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(lodash-es)/.*)"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  setupFiles: [
    './src/setupTests.ts'
  ],
  testEnvironment: "jsdom",
}
