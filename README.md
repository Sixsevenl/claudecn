# Claude 中文技术文档 

Claude AI 中文技术社区文档站点，基于 VitePress 构建。

## 项目结构

```
claudecn-vitepress/
├── docs/                      # 中文文档
│   ├── .vitepress/           # VitePress 配置
│   │   ├── config/           # 分模块配置
│   │   │   ├── index.ts      # 主配置
│   │   │   ├── nav.ts        # 导航栏
│   │   │   └── sidebar.ts    # 侧边栏
│   │   ├── theme/            # 自定义主题
│   │   │   ├── index.ts      # 主题入口
│   │   │   ├── custom.css    # 自定义样式
│   │   │   └── components/   # Vue 组件
│   │   └── config.ts         # 配置入口
│   ├── docs/                 # 文档内容
│   │   ├── claude-code/      # Claude Code 文档
│   │   ├── agent-skills/     # Agent Skills 文档
│   │   ├── ecc/              # Everything Claude Code 文档
│   │   ├── quickstarts.md
│   │   ├── extended-thinking.md
│   │   └── computer-use.md
│   ├── blog/                 # 博客
│   ├── index.md              # 首页
│   └── about.md              # 关于页
└── package.json
```

## 功能特性

- 双语支持：中文（默认）+ 英文
- 本地搜索：支持中英文搜索
- 暗色模式：自动切换
- 响应式设计：移动端适配
- 自定义主题：陶土色配色方案
- 多侧边栏：按章节自动切换
- Vue 组件：首页 Hero、功能卡片、博客列表

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173/

### 构建生产版本

```bash
npm run build
```

构建输出在 `docs/.vitepress/dist/`

### 预览生产版本

```bash
npm run preview
```

## 目录说明

### Claude Code
- 快速开始、入门指南、工作流
- IDE 集成、插件系统、进阶指南
- CI/CD 自动化、参考资料、实用指南

### Agent Skills
- 快速开始、最佳实践、示例集、架构设计

### Everything Claude Code
- 安装指南、Agents、Skills、Commands
- Hooks 钩子系统、Rules 规则系统
- 跨平台支持（Cursor、Codex、OpenCode、Gemini）
- AgentShield 安全审计
- 持续学习、Token 优化

## 技术栈

- **VitePress**: 1.6.4
- **Vue**: 3.5.13
- **Node.js**: 18+

## 配置说明

### 主题颜色

在 `docs/.vitepress/theme/custom.css` 中修改：

```css
:root {
  --vp-c-brand-1: #D97757;  /* 主色调 */
  --vp-c-brand-2: #C4643F;  /* 悬停色 */
  --vp-c-brand-3: #A85230;  /* 激活色 */
}
```

### 导航栏

在 `docs/.vitepress/config/nav.ts` 中修改导航项。

### 侧边栏

在 `docs/.vitepress/config/sidebar.ts` 中修改侧边栏结构。

## 部署

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

- 构建命令：`npm run build`
- 发布目录：`docs/.vitepress/dist`

### GitHub Pages

在 `.github/workflows/deploy.yml` 中配置 GitHub Actions。

## 许可证

MIT License
