import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // default options are shown. On some platforms
    // these options are set automatically — see below
    adapter: adapter({
      strict: true,
    }),
  },
  compilerOptions: {
    runes: true, // Forces all components into runes mode
  },
};

export default config;
