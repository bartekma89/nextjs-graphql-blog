import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl97bmn0p0cro01t64r9tcwbv/master",
  documents: "graphql/*.graphql",
  generates: {
    "generated-graphql": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  config: {
    namingConvention: {
      typeNames: "change-case-all#pascalCase",
      enumValues: "change-case-all#upperCase",
    },
  },
};

export default config;
