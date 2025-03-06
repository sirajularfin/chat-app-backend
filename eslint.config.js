import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'simple-import-sort/imports': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
