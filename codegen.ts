import { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  // schema: 'libs/schemas/src/lib/apollo-schema.graphql',
  //  documents: 'libs/models/rdas-models/src/lib/**/*.ts',
  documents: 'libs/models/rdas-models/src/lib/**/!(*.generated).ts',
  //  schema: 'libs/schemas/src/lib/**/*.graphql',
  generates: {
    //creates types and exported services
    /*     'libs/schemas/src/lib': {
      ...defineConfig({
        resolverGeneration: 'minimal',
      }),
      presetConfig: {
        tsConfigFilePath: 'tsconfig.base.json',
      },
    }, */
    /*   'libs/schemas/src/lib/resolvers-types.ts': {
        config: {
          useIndexSignature: true,
        },
        plugins: ['typescript', 'typescript-resolvers'],
      }, */
    /*     'libs/models/rdas-models/src/lib/resolvers-types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-apollo-angular',
      ],
    }, */
    'libs/models/rdas-models/src/lib/generated-types.ts': {
      plugins: ['typescript'],
    },
    'libs/models/rdas-models/src/lib/**/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'libs/models/rdas-models/src/lib/**/generated-types.ts',
      },
      plugins: ['typescript-operations', 'typescript-apollo-angular'],
      config: { withHooks: true },
    },
  },
};
export default config;
