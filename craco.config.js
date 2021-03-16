const path = require("path");

const resolveSource = (relativePath) =>
  path.resolve(process.cwd(), "src", relativePath);

module.exports = {
  webpack: {
    alias: {
      "~components": resolveSource("components/"),
      "~containers": resolveSource("containers/"),
      "~constants": resolveSource("constants/"),
    },
  },
  jest: {
    configure: {
      testMatch: ["<rootDir>/src/__tests__/*.test.js"],
      moduleNameMapper: {
        "^~components(.*)$": "<rootDir>/src/components$1",
        "^~containers(.*)$": "<rootDir>/src/containers$1",
        "^~constants(.*)$": "<rootDir>/src/constants$1",
      },
      "setupFilesAfterEnv": ["<rootDir>src/setupTests.js"]
    },
  },
};
