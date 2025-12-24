import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./src/app/openApi/openapiSample.yml",
    output: {
      target: "./src/app/openApi/generated/api.ts",
      client: "react-query",
      mode: "tags",
      override: {
        query: {
          useQuery: true,
          useMutation: true,
        },
        mutator: {
          path: "./lib/axios.ts",
          name: "apiClient",
        },
      },
    },
  },
});
