import type { DefaultTheme } from 'vitepress'

function sidebarGroup(text: string, items: DefaultTheme.SidebarItem[]): DefaultTheme.SidebarItem {
  return { text, collapsed: false, items }
}

// ─── Claude Code sidebar - Chinese ────
export const zhClaudeCodeSidebar: DefaultTheme.SidebarItem[] = [
  sidebarGroup('快速开始', [
    { text: '快速开始', link: '/docs/claude-code/getting-started/' },
  ]),
  sidebarGroup('入门指南', [
    { text: '什么是 Claude Code', link: '/docs/claude-code/guide/' },
    { text: '安装配置', link: '/docs/claude-code/guide/installation' },
    { text: '第一次对话', link: '/docs/claude-code/guide/first-conversation' },
    { text: '基础使用', link: '/docs/claude-code/guide/basic-usage' },
  ]),
  sidebarGroup('工作流', [
    { text: '上下文管理', link: '/docs/claude-code/workflow/context-management' },
    { text: '代码修改', link: '/docs/claude-code/workflow/code-modification' },
    { text: 'Git 集成', link: '/docs/claude-code/workflow/git-integration' },
    { text: '高效实践', link: '/docs/claude-code/workflow/best-practices' },
    { text: '多 Claude 协作', link: '/docs/claude-code/workflow/multi-claude' },
    { text: '计划模式', link: '/docs/claude-code/workflow/plan-mode' },
    { text: 'CLI 实战技巧', link: '/docs/claude-code/workflow/advent-of-claude' },
    { text: '会话连续性与战略压缩', link: '/docs/claude-code/workflow/session-continuity' },
    { text: '上下文角色：开发/调研/审查', link: '/docs/claude-code/workflow/context-roles' },
    { text: '团队质量门禁', link: '/docs/claude-code/workflow/team-quality-gates' },
    { text: '文档同步与 Codemaps', link: '/docs/claude-code/workflow/doc-sync-codemaps' },
    { text: '持续学习', link: '/docs/claude-code/workflow/continuous-learning' },
    { text: '构建排障', link: '/docs/claude-code/workflow/build-troubleshooting' },
    { text: '安全清理死代码', link: '/docs/claude-code/workflow/dead-code-cleanup' },
    { text: '安全审查工作流', link: '/docs/claude-code/workflow/security-review' },
    { text: 'E2E 测试工作流', link: '/docs/claude-code/workflow/e2e-testing' },
    { text: '代码审查工作流', link: '/docs/claude-code/workflow/code-review' },
  ]),
  sidebarGroup('IDE 集成', [
    { text: 'VS Code 集成', link: '/docs/claude-code/ide-integration/vscode' },
    { text: 'JetBrains 集成', link: '/docs/claude-code/ide-integration/jetbrains' },
    { text: 'Chrome DevTools', link: '/docs/claude-code/ide-integration/chrome-devtools' },
  ]),
  sidebarGroup('插件系统', [
    { text: '插件系统概览', link: '/docs/claude-code/plugin-system/' },
    { text: '创建插件', link: '/docs/claude-code/plugin-system/creating-plugins' },
    { text: '发现和安装插件', link: '/docs/claude-code/plugin-system/discover-plugins' },
    { text: '插件参考', link: '/docs/claude-code/plugin-system/plugin-reference' },
  ]),
  sidebarGroup('进阶指南', [
    { text: 'Skills（技能）', link: '/docs/claude-code/advanced/skills' },
    { text: 'Subagents 子代理', link: '/docs/claude-code/advanced/subagents' },
    { text: '自定义命令', link: '/docs/claude-code/advanced/custom-commands' },
    { text: 'Hooks 系统', link: '/docs/claude-code/advanced/hooks' },
    { text: 'Claude Code SDK', link: '/docs/claude-code/advanced/sdk' },
    { text: 'MCP 服务器', link: '/docs/claude-code/advanced/mcp-servers' },
    { text: '团队落地：配置当代码管理', link: '/docs/claude-code/advanced/team-config-as-code' },
    { text: '团队 Starter Kit', link: '/docs/claude-code/advanced/team-starter-kit' },
    { text: '模式库：Skills 沉淀', link: '/docs/claude-code/advanced/pattern-library' },
    { text: '配置片段库', link: '/docs/claude-code/advanced/config-snippets' },
    { text: 'Hooks 配方', link: '/docs/claude-code/advanced/hooks-recipes' },
    { text: '团队规则库', link: '/docs/claude-code/advanced/team-rules' },
    { text: 'Agent Loop 解析', link: '/docs/claude-code/advanced/agent-loop' },
  ]),
  sidebarGroup('CI/CD 自动化', [
    { text: 'GitHub Actions', link: '/docs/claude-code/cicd/github-actions' },
    { text: 'Headless 模式', link: '/docs/claude-code/cicd/headless' },
  ]),
  sidebarGroup('参考资料', [
    { text: '配置参考', link: '/docs/claude-code/reference/config' },
    { text: 'CLI 参考', link: '/docs/claude-code/reference/cli' },
    { text: '安全指南', link: '/docs/claude-code/reference/security' },
    { text: '速查表', link: '/docs/claude-code/reference/cheatsheet' },
    { text: 'Statusline', link: '/docs/claude-code/reference/statusline' },
    { text: 'Amazon Bedrock', link: '/docs/claude-code/reference/amazon-bedrock' },
  ]),
  sidebarGroup('实用指南', [
    { text: '文本处理', link: '/docs/claude-code/practical/text-processing' },
    { text: '文件管理', link: '/docs/claude-code/practical/file-management' },
    { text: '数据分析', link: '/docs/claude-code/practical/data-analysis' },
    { text: '提示词技巧', link: '/docs/claude-code/practical/prompt-tips' },
  ]),
]

// ─── Agent Skills sidebar - Chinese ──────────────────────────────────────────
export const zhAgentSkillsSidebar: DefaultTheme.SidebarItem[] = [
  { text: '快速开始', link: '/docs/agent-skills/' },
  { text: '最佳实践', link: '/docs/agent-skills/best-practices' },
  { text: '示例集', link: '/docs/agent-skills/examples' },
  { text: 'Skills 架构设计', link: '/docs/agent-skills/architecture' },
]

// ─── Everything Claude Code sidebar - Chinese ──────
export const zhEccSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Everything Claude Code', link: '/docs/ecc/' },
  { text: '安装指南', link: '/docs/ecc/installation' },
  sidebarGroup('核心组件', [
    { text: 'Agents 子代理', link: '/docs/ecc/agents' },
    { text: 'Skills 技能', link: '/docs/ecc/skills' },
    { text: 'Commands 命令', link: '/docs/ecc/commands' },
    { text: 'Hooks 钩子系统', link: '/docs/ecc/hooks' },
    { text: 'Rules 规则系统', link: '/docs/ecc/rules' },
  ]),
  sidebarGroup('高级功能', [
    { text: '跨平台支持', link: '/docs/ecc/cross-platform' },
    { text: 'AgentShield 安全审计', link: '/docs/ecc/agentshield' },
    { text: '持续学习', link: '/docs/ecc/continuous-learning' },
    { text: 'Token 优化指南', link: '/docs/ecc/token-optimization' },
    { text: 'Dashboard 仪表板', link: '/docs/ecc/dashboard' },
  ]),
  { text: '常见问题', link: '/docs/ecc/faq' },
]

// ─── English sidebars ───────────────────────────────────────────────────────
export const enClaudeCodeSidebar: DefaultTheme.SidebarItem[] = [
  sidebarGroup('Getting Started', [
    { text: 'Getting Started', link: '/en/docs/claude-code/getting-started/' },
  ]),
  sidebarGroup('Guide', [
    { text: 'What is Claude Code', link: '/en/docs/claude-code/guide/' },
    { text: 'Installation', link: '/en/docs/claude-code/guide/installation' },
    { text: 'First Conversation', link: '/en/docs/claude-code/guide/first-conversation' },
    { text: 'Basic Usage', link: '/en/docs/claude-code/guide/basic-usage' },
  ]),
  sidebarGroup('Workflow', [
    { text: 'Context Management', link: '/en/docs/claude-code/workflow/context-management' },
    { text: 'Code Modification', link: '/en/docs/claude-code/workflow/code-modification' },
    { text: 'Git Integration', link: '/en/docs/claude-code/workflow/git-integration' },
    { text: 'Best Practices', link: '/en/docs/claude-code/workflow/best-practices' },
    { text: 'Multi-Claude Collaboration', link: '/en/docs/claude-code/workflow/multi-claude' },
    { text: 'Plan Mode', link: '/en/docs/claude-code/workflow/plan-mode' },
    { text: 'CLI Tips & Tricks', link: '/en/docs/claude-code/workflow/advent-of-claude' },
    { text: 'Session Continuity & Strategic Compression', link: '/en/docs/claude-code/workflow/session-continuity' },
    { text: 'Context Roles: Dev/Research/Review', link: '/en/docs/claude-code/workflow/context-roles' },
    { text: 'Team Quality Gates', link: '/en/docs/claude-code/workflow/team-quality-gates' },
    { text: 'Doc Sync & Codemaps', link: '/en/docs/claude-code/workflow/doc-sync-codemaps' },
    { text: 'Continuous Learning', link: '/en/docs/claude-code/workflow/continuous-learning' },
    { text: 'Build Troubleshooting', link: '/en/docs/claude-code/workflow/build-troubleshooting' },
    { text: 'Dead Code Cleanup', link: '/en/docs/claude-code/workflow/dead-code-cleanup' },
    { text: 'Security Review', link: '/en/docs/claude-code/workflow/security-review' },
    { text: 'E2E Testing', link: '/en/docs/claude-code/workflow/e2e-testing' },
    { text: 'Code Review', link: '/en/docs/claude-code/workflow/code-review' },
  ]),
  sidebarGroup('IDE Integration', [
    { text: 'VS Code', link: '/en/docs/claude-code/ide-integration/vscode' },
    { text: 'JetBrains', link: '/en/docs/claude-code/ide-integration/jetbrains' },
    { text: 'Chrome DevTools', link: '/en/docs/claude-code/ide-integration/chrome-devtools' },
  ]),
  sidebarGroup('Plugin System', [
    { text: 'Plugin System Overview', link: '/en/docs/claude-code/plugin-system/' },
    { text: 'Creating Plugins', link: '/en/docs/claude-code/plugin-system/creating-plugins' },
    { text: 'Discover & Install Plugins', link: '/en/docs/claude-code/plugin-system/discover-plugins' },
    { text: 'Plugin Reference', link: '/en/docs/claude-code/plugin-system/plugin-reference' },
  ]),
  sidebarGroup('Advanced', [
    { text: 'Skills', link: '/en/docs/claude-code/advanced/skills' },
    { text: 'Subagents', link: '/en/docs/claude-code/advanced/subagents' },
    { text: 'Custom Commands', link: '/en/docs/claude-code/advanced/custom-commands' },
    { text: 'Hooks', link: '/en/docs/claude-code/advanced/hooks' },
    { text: 'Claude Code SDK', link: '/en/docs/claude-code/advanced/sdk' },
    { text: 'MCP Servers', link: '/en/docs/claude-code/advanced/mcp-servers' },
    { text: 'Team Config as Code', link: '/en/docs/claude-code/advanced/team-config-as-code' },
    { text: 'Team Starter Kit', link: '/en/docs/claude-code/advanced/team-starter-kit' },
    { text: 'Pattern Library', link: '/en/docs/claude-code/advanced/pattern-library' },
    { text: 'Config Snippets', link: '/en/docs/claude-code/advanced/config-snippets' },
    { text: 'Hooks Recipes', link: '/en/docs/claude-code/advanced/hooks-recipes' },
    { text: 'Team Rules', link: '/en/docs/claude-code/advanced/team-rules' },
    { text: 'Agent Loop', link: '/en/docs/claude-code/advanced/agent-loop' },
  ]),
  sidebarGroup('CI/CD', [
    { text: 'GitHub Actions', link: '/en/docs/claude-code/cicd/github-actions' },
    { text: 'Headless Mode', link: '/en/docs/claude-code/cicd/headless' },
  ]),
  sidebarGroup('Reference', [
    { text: 'Configuration', link: '/en/docs/claude-code/reference/config' },
    { text: 'CLI Reference', link: '/en/docs/claude-code/reference/cli' },
    { text: 'Security', link: '/en/docs/claude-code/reference/security' },
    { text: 'Cheatsheet', link: '/en/docs/claude-code/reference/cheatsheet' },
    { text: 'Statusline', link: '/en/docs/claude-code/reference/statusline' },
    { text: 'Amazon Bedrock', link: '/en/docs/claude-code/reference/amazon-bedrock' },
  ]),
  sidebarGroup('Practical Guides', [
    { text: 'Text Processing', link: '/en/docs/claude-code/practical/text-processing' },
    { text: 'File Management', link: '/en/docs/claude-code/practical/file-management' },
    { text: 'Data Analysis', link: '/en/docs/claude-code/practical/data-analysis' },
    { text: 'Prompt Tips', link: '/en/docs/claude-code/practical/prompt-tips' },
  ]),
]

export const enAgentSkillsSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Getting Started', link: '/en/docs/agent-skills/' },
  { text: 'Best Practices', link: '/en/docs/agent-skills/best-practices' },
  { text: 'Examples', link: '/en/docs/agent-skills/examples' },
  { text: 'Architecture', link: '/en/docs/agent-skills/architecture' },
]

export const enEccSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Everything Claude Code', link: '/en/docs/ecc/' },
  { text: 'Installation', link: '/en/docs/ecc/installation' },
  sidebarGroup('Core Components', [
    { text: 'Agents', link: '/en/docs/ecc/agents' },
    { text: 'Skills', link: '/en/docs/ecc/skills' },
    { text: 'Commands', link: '/en/docs/ecc/commands' },
    { text: 'Hooks', link: '/en/docs/ecc/hooks' },
    { text: 'Rules', link: '/en/docs/ecc/rules' },
  ]),
  sidebarGroup('Advanced Features', [
    { text: 'Cross-Platform Support', link: '/en/docs/ecc/cross-platform' },
    { text: 'AgentShield Security Audit', link: '/en/docs/ecc/agentshield' },
    { text: 'Continuous Learning', link: '/en/docs/ecc/continuous-learning' },
    { text: 'Token Optimization', link: '/en/docs/ecc/token-optimization' },
    { text: 'Dashboard', link: '/en/docs/ecc/dashboard' },
  ]),
  { text: 'FAQ', link: '/en/docs/ecc/faq' },
]

// ─── Multi-sidebar exports ────────────────────────────────────────────────────
export const zhSidebar: DefaultTheme.Sidebar = {
  '/docs/claude-code/': zhClaudeCodeSidebar,
  '/docs/agent-skills/': zhAgentSkillsSidebar,
  '/docs/ecc/': zhEccSidebar,
}

export const enSidebar: DefaultTheme.Sidebar = {
  '/en/docs/claude-code/': enClaudeCodeSidebar,
  '/en/docs/agent-skills/': enAgentSkillsSidebar,
  '/en/docs/ecc/': enEccSidebar,
}
