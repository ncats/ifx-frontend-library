import { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'libs/models/rdas-models/src/lib/*.ts',
  generates: {
    'libs/models/rdas-models/src/lib/generated-types.ts': {
      plugins: ['typescript-operations'],
    },
    'libs/models/rdas-models/src/lib/**/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'libs/models/rdas-models/src/lib/**/generated-types.ts',
      },
      plugins: ['typescript-apollo-angular'],
      config: { withHooks: true },
    },
  },
};
export default config;
