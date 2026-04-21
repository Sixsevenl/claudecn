---
title: 安装指南
---

# 安装指南

ECC 提供多种安装方式，从最简单的插件安装到完全手动控制。

## 系统要求

- **Claude Code CLI**: v2.1.0 或更高版本
- **Node.js**: 18+
- **操作系统**: macOS、Linux、Windows

检查 Claude Code 版本：

```bash
claude --version
```

## 方式一：插件安装（推荐）

最简单的方式，一行命令搞定：

```bash
# 添加 marketplace
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# 安装插件
/plugin install everything-claude-code@everything-claude-code
```

或手动添加到 `~/.claude/settings.json`：

```json
{
  "extraKnownMarketplaces": {
    "ecc": {
      "source": {
        "source": "github",
        "repo": "affaan-m/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "everything-claude-code@everything-claude-code": true
  }
}
```

安装后即可使用所有 commands、agents、skills 和 hooks。

### 安装 Rules（必需）

::: warning 重要
Claude Code 插件系统不支持自动分发 `rules`，必须手动安装。
:::

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 用户级别（适用于所有项目）
mkdir -p ~/.claude/rules
cp -r everything-claude-code/rules/common ~/.claude/rules/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/  # 按需选择
cp -r everything-claude-code/rules/python ~/.claude/rules/
cp -r everything-claude-code/rules/golang ~/.claude/rules/

# 项目级别（仅适用于当前项目）
mkdir -p .claude/rules
cp -r everything-claude-code/rules/common .claude/rules/
```

## 方式二：手动安装

适合想要精确控制安装内容的用户。

### 完整安装

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 安装依赖
npm install  # 或: pnpm install | yarn install | bun install

# macOS/Linux
./install.sh --profile full

# Windows PowerShell
.\install.ps1 --profile full
```

### 按语言安装

```bash
# 只安装特定语言支持
./install.sh typescript
./install.sh typescript python golang swift php

# 指定目标 IDE
./install.sh --target cursor typescript
./install.sh --target antigravity typescript
./install.sh --target gemini --profile full
```

### 分组件手动安装

```bash
# 只安装 agents
cp everything-claude-code/agents/*.md ~/.claude/agents/

# 只安装 rules
mkdir -p ~/.claude/rules/
cp -r everything-claude-code/rules/common ~/.claude/rules/

# 只安装 skills
cp -r everything-claude-code/.agents/skills/* ~/.claude/skills/

# 只安装 commands
mkdir -p ~/.claude/commands
cp everything-claude-code/commands/*.md ~/.claude/commands/
```

## 安装 Hooks

::: warning
不要直接复制仓库的 `hooks/hooks.json` 到 `~/.claude/settings.json`。使用安装器安装。
:::

```bash
# macOS / Linux
bash ./install.sh --target claude --modules hooks-runtime

# Windows PowerShell
pwsh -File .\install.ps1 --target claude --modules hooks-runtime
```

## 配置 MCP 服务器

从 `mcp-configs/mcp-servers.json` 复制需要的 MCP 服务器定义到 `~/.claude/settings.json` 或项目级 `.mcp.json`。

如果已有自己的 MCP 配置，设置环境变量跳过重复项：

```bash
export ECC_DISABLED_MCPS="github,context7,exa,playwright,sequential-thinking,memory"
```

::: warning
记得替换 `YOUR_*_HERE` 占位符为实际的 API 密钥。
:::

## 包管理器检测

ECC 自动检测你的包管理器，优先级如下：

1. 环境变量 `CLAUDE_PACKAGE_MANAGER`
2. 项目配置 `.claude/package-manager.json`
3. `package.json` 的 `packageManager` 字段
4. 锁文件检测（package-lock.json、yarn.lock、pnpm-lock.yaml、bun.lockb）
5. 全局配置 `~/.claude/package-manager.json`
6. 回退：第一个可用的包管理器

手动设置：

```bash
# 通过环境变量
export CLAUDE_PACKAGE_MANAGER=pnpm

# 通过全局配置
node scripts/setup-package-manager.js --global pnpm

# 通过项目配置
node scripts/setup-package-manager.js --project bun

# 检测当前设置
node scripts/setup-package-manager.js --detect
```

或使用 `/setup-pm` 命令。

## 验证安装

```bash
# 检查已安装的插件
/plugin list everything-claude-code@everything-claude-code

# 列出已安装组件
ecc list-installed

# 运行诊断
ecc doctor

# 修复问题
ecc repair
```

## 命名说明

ECC 有三个公开标识符，不可互换：

| 标识符 | 用途 |
|--------|------|
| `affaan-m/everything-claude-code` | GitHub 源码仓库 |
| `everything-claude-code@everything-claude-code` | Claude marketplace 插件标识 |
| `ecc-universal` | npm 包名 |
