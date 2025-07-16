// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stackquae Docs',
  tagline: 'Documentation for the Stackquae Blog & Life Routine Platform',
  favicon: 'img/favicon.ico',

  // ✅ URL Settings for GitHub Pages
  url: 'https://mukilanmoorthy.github.io', // Your GitHub Pages URL
  baseUrl: '/stack_q/', // Folder name of the repo

  organizationName: 'mukilanmoorthy', // GitHub username or org
  projectName: 'stack_q', // Repo name
  deploymentBranch: 'gh-pages', // Deployment branch
  trailingSlash: false, // Removes trailing slash from URLs

  // ✅ Optional: Enable SSH deploy if needed
  // useSSH: true,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Show docs at site root
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/mukilanmoorthy/stack_q/edit/main/docs/', // Update this if docs folder is different
        },
        blog: false, // We're not using the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Stackquae Docs',
      logo: {
        alt: 'Stackquae Logo',
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
      links: [], // Hides default footer links
      copyright: `© ${new Date().getFullYear()} Mukilan Moorthy`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
