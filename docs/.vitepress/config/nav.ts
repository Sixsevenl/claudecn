import type { DefaultTheme } from 'vitepress'

export const zhNav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  {
    text: 'Claude Code',
    items: [
      { text: '快速开始', link: '/docs/claude-code/getting-started/' },
      { text: '入门指南', link: '/docs/claude-code/guide/' },
      { text: '工作流', link: '/docs/claude-code/workflow/best-practices' },
      { text: 'IDE 集成', link: '/docs/claude-code/ide-integration/vscode' },
      { text: '插件系统', link: '/docs/claude-code/plugin-system/' },
      { text: '进阶指南', link: '/docs/claude-code/advanced/agent-loop' },
      { text: 'CI/CD 自动化', link: '/docs/claude-code/cicd/github-actions' },
      { text: '参考资料', link: '/docs/claude-code/reference/cli' },
      { text: '实用指南', link: '/docs/claude-code/practical/prompt-tips' },
    ],
  },
  { text: 'Agent Skills', link: '/docs/agent-skills/' },
  {
    text: 'Everything Claude Code',
    items: [
      { text: 'ECC 首页', link: '/docs/ecc/' },
      { text: '安装指南', link: '/docs/ecc/installation' },
      { text: 'Agents 子代理', link: '/docs/ecc/agents' },
      { text: 'Skills 技能', link: '/docs/ecc/skills' },
      { text: 'Commands 命令', link: '/docs/ecc/commands' },
      { text: 'Hooks 钩子系统', link: '/docs/ecc/hooks' },
      { text: '跨平台支持', link: '/docs/ecc/cross-platform' },
      { text: 'AgentShield 安全', link: '/docs/ecc/agentshield' },
    ],
  },
  { text: '博客', link: 'https://sixsevenl.github.io' },
  { text: '快速入门', link: '/docs/quickstarts' },
  { text: '关于', link: '/about' },
]

export const enNav: DefaultTheme.NavItem[] = [
  { text: 'Home', link: '/en/' },
  {
    text: 'Claude Code',
    items: [
      { text: 'Getting Started', link: '/en/docs/claude-code/getting-started/' },
      { text: 'Guide', link: '/en/docs/claude-code/guide/' },
      { text: 'Workflow', link: '/en/docs/claude-code/workflow/best-practices' },
      { text: 'IDE Integration', link: '/en/docs/claude-code/ide-integration/vscode' },
      { text: 'Plugin System', link: '/en/docs/claude-code/plugin-system/' },
      { text: 'Advanced', link: '/en/docs/claude-code/advanced/agent-loop' },
      { text: 'CI/CD', link: '/en/docs/claude-code/cicd/github-actions' },
      { text: 'Reference', link: '/en/docs/claude-code/reference/cli' },
      { text: 'Practical', link: '/en/docs/claude-code/practical/prompt-tips' },
    ],
  },
  { text: 'Agent Skills', link: '/en/docs/agent-skills/' },
  { text: 'Blog', link: 'https://sixsevenl.github.io' },
  { text: 'Quickstarts', link: '/en/docs/quickstarts' },
  { text: 'About', link: '/en/about' },
]
