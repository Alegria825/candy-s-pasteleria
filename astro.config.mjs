import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { design } from './design.config.mjs';

export default defineConfig({
  vite: {
    resolve: {
      alias: { '@design': fileURLToPath(new URL(`./src/designs/${design}`, import.meta.url)) },
    },
  },
});
