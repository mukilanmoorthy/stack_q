// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stackquae Docs',
  tagline: '',
  favicon: 'img/favicon.ico',

  url: 'https://mukilanmoorthy.github.io',
  baseUrl: '/stack_q/', // GitHub Pages base

  organizationName: 'mukilanmoorthy',
  projectName: 'stack_q',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/', // ✅ Docs shown at root (no homepage)
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mukilanmoorthy/stack_q/edit/main/your-docs/',
        },
        blog: false, // ✅ No blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Stackquae Docs',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/mukilanmoorthy/stack_q',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [], // 🧹 Hide all footer links
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
