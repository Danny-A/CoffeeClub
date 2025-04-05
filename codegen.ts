import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://127.0.0.1:54321/graphql/v1",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/lib/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
        useTypeImports: true,
        dedupeFragments: true,
        inlineFragmentTypes: "combine",
      },
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
  },
};

export default config;
