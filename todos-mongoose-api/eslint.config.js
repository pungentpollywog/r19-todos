import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js}'],
    ignores: ['out/', 'dist/', 'node_modules/'],
    plugins: {
      js,
    },
    extends: [
      js.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'semi': 'error',
    },
  },
]);
