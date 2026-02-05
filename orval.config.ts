import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./src/app/openApi/openapiSample.yml",
    output: {
      target: "./src/app/openApi/generated/api",
      client: "react-query",
      mode: "tags-split",
      override: {
        query: {
          useQuery: true,
          useMutation: true,
          options: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
        mutator: {
          path: "./lib/axios.ts",
          name: "apiClient",
        },
      },
    },
  },
  zod: {
    input: {
      target: "./src/app/openApi/openapiSample.yml",
    },
    output: {
      client: "zod",
      mode: "tags-split",
      target: "./src/app/openApi/generated/zod",
    },
  },
});
