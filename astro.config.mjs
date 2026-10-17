import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// The website of the arx-tools organization: a static, pre-rendered site, served by
// GitHub Pages. There is no runtime server and no client side framework - every page
// is HTML by the time the build is done, and the only JavaScript which reaches the
// browser is the editor in public/editor (a separate build, a separate project).
//
// `site` is what the sitemap and the Open Graph URLs are built from.
export default defineConfig({
  site: 'https://arx-tools.github.io',
  integrations: [sitemap()],
  // every route becomes <route>/index.html, and the internal links keep the trailing
  // slash, so the served URL and the linked URL are the same (no redirect per page)
  trailingSlash: 'always',
})
