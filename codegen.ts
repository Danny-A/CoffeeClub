import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:54321/graphql/v1',
  documents: ['src/**/*.graphql'],
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    'src/lib/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
        useTypeImports: true,
        dedupeFragments: true,
        inlineFragmentTypes: 'combine',
      },
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
