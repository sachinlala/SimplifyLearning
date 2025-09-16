/**
 * Jest Configuration for SimplifyLearning Algorithms
 * 
 * Test configuration for all algorithm implementations
 */

module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Test files pattern
  testMatch: [
    '**/src/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*-config.js',
    '!src/**/test-manual.js',
    '!src/**/index.js'
  ],
  
  // Coverage output
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  
  // Setup files
  setupFilesAfterEnv: [],
  
  // Module paths (if needed for imports)
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  
  // Verbose output
  verbose: true,
  
  // Test timeout (5 seconds)
  testTimeout: 5000,
  
  // Transform settings - none needed for CommonJS
  transform: {},
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/assets/',
    'test-manual.js'
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
};