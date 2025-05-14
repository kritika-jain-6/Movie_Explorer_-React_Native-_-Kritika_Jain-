module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-linear-gradient|react-native-button|react-native-element-dropdown|react-native-gesture-handler|react-native-reanimated|react-native-reanimated-carousel|toastify-react-native|another-library-to-transform|@react-native-async-storage/async-storage))',
    
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'json'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/.d.ts','!src/context/**' ,'!src/navigation/**','!src/api/**'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
    '^react-native-reanimated$': '<rootDir>/__tests__/__mocks__/react-native-reanimated.js',
    '^react-native-gesture-handler$': '<rootDir>/__tests__/__mocks__/react-native-gesture-handler.js',
  },

};
