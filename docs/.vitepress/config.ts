import { defineConfig } from 'vitepress'
import { zhNav, enNav } from './config/nav'
import { zhSidebar, enSidebar } from './config/sidebar'

export default defineConfig({
  title: 'Claude 中文社区',
  description: 'Claude AI 中文技术社区 - Claude Code、Agent Skills、Everything Claude Code 文档与教程',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#D97757' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sixsevenl/claudecn' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          en: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Reset search',
                footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' },
              },
            },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新',
    },

    editLink: {
      pattern: 'https://github.com/Sixsevenl/claudecn/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Claude 中文社区',
      description: 'Claude AI 中文技术社区',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        footer: {
          message: '基于 MIT 许可发布',
          copyright: '© 2026-present MIT License',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'Claude Community',
      description: 'Claude AI Chinese Community - Claude Code, Agent Skills, Everything Claude Code docs & tutorials',
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        footer: {
          message: 'Released under the MIT License.',
          copyright: '© 2026-present MIT License',
        },
      },
    },
  },
})
