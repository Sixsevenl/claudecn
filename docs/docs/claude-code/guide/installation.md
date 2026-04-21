---
title: "安装配置"
---

# 安装配置

本指南帮助你在不同平台上安装和配置 Claude Code。

## 系统要求

- **操作系统**：macOS、Linux 或 Windows
- **Node.js**：v18 或更高版本
- **网络**：需要访问 Anthropic API

## 安装

### macOS / Linux

```bash
# 使用 npm 安装
npm install -g @anthropic-ai/claude-code

# 或使用 Homebrew
brew install anthropics/claude/claude

# 验证安装
claude --version
```

### Windows

```powershell
npm install -g @anthropic-ai/claude-code
```

## 配置 API Key

### 方式 1：环境变量（推荐）

```bash
# macOS/Linux - 添加到 ~/.zshrc
export ANTHROPIC_API_KEY='sk-ant-...'

# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

### 方式 2：配置文件

```bash
claude config set apiKey sk-ant-...
```

### 验证配置

```bash
claude --version
claude config list
```

## 首次启动

```bash
cd your-project
claude

Claude Code v2.1.0
Working directory: /Users/you/project

You: 帮我分析项目结构
```

启动后按 **Shift+Tab** 可以切换权限模式：

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode

- Normal Mode：默认，每次操作需确认
- Auto-Accept Mode：自动执行（底部显示 ⏵⏵ accept edits on）
- Plan Mode：只读（底部显示 ⏸ plan mode on）
```

## 项目配置

在项目根目录创建 `CLAUDE.md`，Claude 会自动加载：

```markdown
# 项目说明

## 技术栈
- React 18
- TypeScript 5
- Vite

## 常用命令
- 开发：`npm run dev`
- 测试：`npm test`
- 构建：`npm run build`
```

也可以在 `.claude/settings.json` 中配置权限：

```json
{
  "permissionMode": "custom",
  "allowedPaths": ["src/**", "tests/**"],
  "blockedPaths": [".env", "secrets/**"],
  "allowedCommands": ["npm test", "npm run build"]
}
```

## Amazon Bedrock 配置

如果使用 AWS Bedrock 而非直接调用 Anthropic API：

```bash
export AWS_ACCESS_KEY_ID='your-access-key'
export AWS_SECRET_ACCESS_KEY='your-secret-key'
export AWS_REGION='us-east-1'

claude config set provider bedrock
```

## 常见问题

**API Key 无效**：
```bash
echo $ANTHROPIC_API_KEY    # 检查是否设置
claude config set apiKey sk-ant-...  # 重新设置
```

**命令未找到**：
```bash
which claude              # 检查安装路径
npm install -g @anthropic-ai/claude-code  # 重新安装
```

**网络连接问题**：
```bash
export HTTPS_PROXY=http://proxy:8080  # 使用代理
```

## 下一步

- [第一次对话](/docs/claude-code/guide/first-conversation)
- [入门指南](/docs/claude-code/getting-started/)
- [CLI 参考](/docs/claude-code/reference/cli)
