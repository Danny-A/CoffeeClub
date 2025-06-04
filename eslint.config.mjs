import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const baseConfig = [
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
];

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...baseConfig,
  eslintConfigPrettier,
];

export default eslintConfig;
