import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { design } from './design.config.mjs';

// GitHub Actions define GITHUB_REPOSITORY ("usuario/repo") automáticamente.
// En GitHub Pages el sitio vive en https://usuario.github.io/repo/, así que la base se calcula sola.
// En tu máquina (sin esa variable) la base es "/" y todo funciona en http://localhost:4321/.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const enPages = Boolean(owner && repo);

export default defineConfig({
  site: process.env.SITE_URL ?? (enPages ? `https://${owner.toLowerCase()}.github.io` : undefined),
  base: process.env.BASE_PATH ?? (enPages ? `/${repo}` : '/'),
  vite: {
    resolve: {
      alias: { '@design': fileURLToPath(new URL(`./src/designs/${design}`, import.meta.url)) },
    },
  },
});
