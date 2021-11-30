import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      formats: ["cjs", "es"],
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue-haystack",
      fileName: (format) => `vue-haystack.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
