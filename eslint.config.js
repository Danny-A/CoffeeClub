import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

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
  ...compat.config({
    extends: ['next', 'prettier'],
  }),
  ...baseConfig,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
