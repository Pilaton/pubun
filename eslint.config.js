import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import standardConfig from 'eslint-config-standard';
import standardTSConfig from 'eslint-config-standard-with-typescript';
import { defineFlatConfig } from 'eslint-define-config';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

/* ========================================================================== */

export default defineFlatConfig([
  { ignores: ['build/', 'coverage/'] },

  {
    files: ['**/*{js,cjs,mjs,ts,mts}', '**/*.{test,spec,d}.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    rules: {
      ...standardConfig.rules,
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          'newlines-between': 'never',
        },
      ],
    },
  },

  {
    files: ['src/**/*.ts', '**/*.{test,spec,d}.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...standardTSConfig.rules,
    },
  },

  {
    files: ['**/*'],
    plugins: {
      unicorn: unicornPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...unicornPlugin.configs.recommended.rules,
      ...prettierConfig.rules,

      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
          allowList: { props: true },
        },
      ],
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/no-null': 'off',
    },
  },
]);
