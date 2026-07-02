import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/springHttpBuddy/',
  title: 'Spring HTTP Buddy',
  description: 'Turn Spring controllers into ready-to-send .http requests — in one click',
  lang: 'en-US',

  themeConfig: {
    logo: '/icon.png',

    nav: [
      { text: 'Guide', link: '/guide/quickstart' },
      { text: 'GitHub', link: 'https://github.com/gejun123456/springHttpBuddy' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Quick Start', link: '/guide/quickstart' },
          { text: 'Commands', link: '/guide/commands' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Controller → HTTP', link: '/guide/controller-http' },
          { text: 'Import from Postman', link: '/guide/import-postman' },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Bruce Ge',
    },
  },
})
