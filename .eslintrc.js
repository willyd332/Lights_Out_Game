module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // Allow JSX in .js files
    'react/jsx-filename-extension': [0],
    // Prefer single quotes in JSX
    'jsx-quotes': ['error', 'prefer-single'],
  },
};
