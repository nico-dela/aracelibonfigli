// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://aracelibonfigli.com.ar',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
