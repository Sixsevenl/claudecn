---
title: "快速开始"
---

# 快速开始

Claude Code 是 Anthropic 官方推出的命令行工具，让你能够在终端中直接与 Claude 对话，并让 Claude 帮你完成各种编程任务。

## 什么是 Claude Code？

Claude Code 是一个强大的 AI 编程助手，它可以：

- 📝 **读写代码** - 直接读取和修改你的项目文件
- 🔍 **理解项目** - 分析代码库结构和依赖关系
- 🛠️ **执行命令** - 运行测试、构建、部署等任务
- 🤖 **自主工作** - 通过 Agent 模式自动完成复杂任务
- 🔗 **工具集成** - 通过 MCP 协议连接各种外部工具

## 快速安装

### macOS / Linux

```bash
# 使用 Homebrew 安装
brew install anthropics/claude/claude

# 或使用 npm 安装
npm install -g @anthropic-ai/claude-code
```

### Windows

```powershell
# 使用 npm 安装
npm install -g @anthropic-ai/claude-code
```

## 首次使用

1. **获取 API Key**

访问 [Anthropic Console](https://console.anthropic.com/) 创建 API Key。

2. **配置 API Key**

```bash
# 设置环境变量
export ANTHROPIC_API_KEY='your-api-key-here'

# 或者在配置文件中设置
claude config set apiKey your-api-key-here
```

3. **启动 Claude Code**

```bash
# 在项目目录中启动
cd your-project
claude

# 或指定项目路径
claude /path/to/project
```

## 第一次对话

启动后，你会看到 Claude Code 的交互界面：

```
Claude Code v2.1.0
Working directory: /Users/you/project

You: 帮我分析一下这个项目的结构
```

Claude 会自动：
1. 读取项目文件
2. 分析代码结构
3. 给出详细的项目概览

## 基本命令

### 内置命令

```bash
/help          # 查看帮助
/clear         # 清空对话历史
/quit          # 退出 Claude Code
/model         # 切换模型（sonnet/opus/haiku）
/cost          # 查看 API 使用成本
/fast          # 切换快速模式（使用相同模型但输出更快）
```

### 快捷键

**Shift+Tab** - 循环切换权限模式：

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode
```

- **Normal Mode**：默认模式，每次操作需要确认
- **Auto-Accept Mode**：自动接受编辑（底部显示 `⏵⏵ accept edits on`）
- **Plan Mode**：只读模式（底部显示 `⏸ plan mode on`），Claude 只制定计划不执行

### 常用操作

```bash
# 让 Claude 读取文件
You: 读取 src/index.ts 文件

# 让 Claude 修改代码
You: 在 App.tsx 中添加一个登录按钮

# 让 Claude 运行测试
You: 运行所有单元测试

# 让 Claude 解释代码
You: 解释 utils/helper.js 的作用
```

## 工作模式

### 1. Normal Mode（默认）

直接与 Claude 对话，每次操作需要确认：

```
You: 我想添加用户认证功能
Claude: 我来帮你实现。首先让我看看现有的代码结构...

Claude wants to:
  • Read file: src/auth.ts
  • Write file: src/auth/login.ts
Allow? [y/n/always/never]
```

### 2. Auto-Accept Mode

按 `Shift+Tab` 切换到自动接受模式，Claude 会自动执行所有编辑操作：

```
底部显示：⏵⏵ accept edits on

You: 添加登录功能
Claude: 我来实现...
[自动读写文件，无需确认]
```

**适用场景**：信任的任务、快速迭代

### 3. Plan Mode

按 `Shift+Tab` 切换到计划模式，Claude 只制定计划不执行：

```
底部显示：⏸ plan mode on

You: 重构数据库层
Claude: 让我制定一个重构计划...

计划：
1. 创建新的数据库抽象层
2. 迁移现有查询
3. 更新测试
4. 验证性能

[不会执行任何操作，只显示计划]
```

**适用场景**：复杂任务、需要先审查计划

**退出 Plan Mode**：再次按 `Shift+Tab` 返回 Normal Mode

## 权限系统

Claude Code 有三种权限模式，可以通过 **Shift+Tab** 快捷键循环切换：

### Normal Mode（默认）

每次操作前都会询问你：

```
Claude wants to:
  • Read file: src/config.ts
  • Write file: src/auth.ts
  • Run command: npm test

Allow? [y/n/always/never]
```

**响应选项**：
- `y` - 允许这次操作
- `n` - 拒绝这次操作
- `always` - 本次会话总是允许此类操作
- `never` - 本次会话总是拒绝此类操作

### Auto-Accept Mode

按 `Shift+Tab` 切换，自动接受所有编辑操作：

```
底部显示：⏵⏵ accept edits on
```

**特点**：
- 自动执行文件读写
- 仍会询问危险操作（如删除文件、git push）
- 适合快速迭代和信任的任务

### Plan Mode

按 `Shift+Tab` 切换，只读模式：

```
底部显示：⏸ plan mode on
```

**特点**：
- Claude 只制定计划，不执行操作
- 可以安全地探索复杂任务
- 确认计划后退出 Plan Mode 再执行

### 命令行启动选项

```bash
# 以 Auto-Accept 模式启动
claude --permission-mode auto

# 以自定义权限配置启动
claude --permission-mode custom
```

### 自定义权限配置

在 `.claude/settings.json` 中配置规则：

```json
{
  "permissionMode": "custom",
  "allowedPaths": ["src/**", "tests/**"],
  "allowedCommands": ["npm test", "npm run build"],
  "blockedPaths": [".env", "secrets/**"]
}
```

## 项目配置

在项目根目录创建 `CLAUDE.md` 文件，告诉 Claude 项目的重要信息：

```markdown
# 项目说明

这是一个 React + TypeScript 项目。

## 技术栈
- React 18
- TypeScript 5
- Vite
- TailwindCSS

## 代码规范
- 使用函数组件和 Hooks
- 所有组件必须有 TypeScript 类型
- 使用 ESLint 和 Prettier

## 测试
运行测试：`npm test`
```

## 下一步

- [安装配置](/docs/claude-code/guide/installation) - 详细的安装和配置指南
- [第一次对话](/docs/claude-code/guide/first-conversation) - 学习如何与 Claude 有效沟通
- [入门指南](/docs/claude-code/getting-started/) - 掌握常用功能和技巧
- [工作流](/docs/claude-code/workflow/context-management) - 了解高效的工作流程

## 常见问题

### Claude 读不到我的文件？

检查权限设置和文件路径。Claude 只能访问当前工作目录及其子目录。

### 如何让 Claude 记住项目信息？

创建 `CLAUDE.md` 文件，写入项目说明、技术栈、代码规范等信息。

### API 费用如何计算？

使用 `/cost` 命令查看当前会话的费用。Claude Code 使用 Anthropic API，按 token 计费。

### 可以在 CI/CD 中使用吗？

可以！使用 Headless 模式：

```bash
claude --headless "运行测试并生成报告"
```

## 获取帮助

- 📖 [完整文档](/docs/claude-code/getting-started/)
- 💬 [GitHub Discussions](https://github.com/anthropics/claude-code/discussions)
- 🐛 [报告问题](https://github.com/anthropics/claude-code/issues)
- 🔧 命令行帮助：`claude --help`
