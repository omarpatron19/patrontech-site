import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.patrontechhub.com',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404/') && !page.includes('/articulo.html')
    })
  ],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp: { effort: 5, quality: 82 },
        avif: { effort: 4, quality: 55 },
        jpeg: { mozjpeg: true, quality: 84 }
      }
    }
  },
  markdown: {
    gfm: true,
    smartypants: true,
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
