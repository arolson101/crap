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
    "<rootDir>/node_modules/(?!(lodash-es|typeorm)/.*)"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "web.ts",
    "web.tsx",
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFiles: [
    './src/setupTests.ts'
  ],
  testEnvironment: "jsdom",
}
