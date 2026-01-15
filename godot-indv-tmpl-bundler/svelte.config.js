import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // GitHub Pages
    adapter: adapter({
      pages: "build",
      assets: "build",
      precompress: false,
      strict: true,
    }),
    paths: {
      // ENV variable set in GitHub Actions workflow
      base: process.env.BASE_PATH || "",
    },
  },
  compilerOptions: {
    runes: true, // Forces all components into runes mode
  },
};

export default config;
