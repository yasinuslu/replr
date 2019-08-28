const jsExtensions = ['.js', '.jsx'];
const tsExtensions = ['.ts', '.tsx'];
const allExtensions = jsExtensions.concat(tsExtensions);

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    __DEV__: 'readonly',
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx', '**/__tests__/*.tsx'] },
    ],
    'import/prefer-default-export': 'off', // typescript community doesn't like default exports
    'react/prop-types': 'off', // we pretty much guarantee this with typescript
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'no-unused-expressions': 'off',
    'max-len': ['error', { code: 100 }],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    'no-case-declarations': 'off',
  },
  settings: {
    'import/extensions': allExtensions,
    'import/parsers': {
      '@typescript-eslint/parser': tsExtensions,
    },
    'import/resolver': {
      node: {
        extensions: allExtensions,
      },
    },
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-param-reassign': 'off',
      },
    },
  ],
};
