module.exports = {
    roots: ["<rootDir>/src"],

    // add support for typescript using ts-jest
    transform: {
      "^.+\\.(js|tsx|ts)?$": "ts-jest",
    },
  
    // adds special assertions to jest
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],
  
    // Test spec file resolution pattern
    // Files should have parent folder "__tests__" and include either "test" or "spec"
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };