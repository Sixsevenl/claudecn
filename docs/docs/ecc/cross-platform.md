---
title: 跨平台支持
---

# 跨平台支持

ECC 是**第一个最大化所有主要 AI 编码工具**的插件。支持 Claude Code、Cursor IDE、Codex CLI/App、OpenCode 和 Gemini。

## 跨工具特性对比

| 特性 | Claude Code | Cursor IDE | Codex CLI | OpenCode |
|------|------------|------------|-----------|----------|
| **Agents** | 48 | 共享 (AGENTS.md) | 共享 (AGENTS.md) | 12 |
| **Commands** | 79 | 共享 | 基于指令 | 31 |
| **Skills** | 183 | 共享 | 10 (原生格式) | 37 |
| **Hook 事件** | 8 类型 | 15 类型 | 暂无 | 11 类型 |
| **Hook 脚本** | 20+ 脚本 | 16 脚本 (DRY 适配器) | N/A | 插件 Hook |
| **Rules** | 34 (common+lang) | 34 (YAML frontmatter) | 基于指令 | 13 指令 |
| **自定义工具** | 通过 Hook | 通过 Hook | N/A | 6 原生工具 |
| **MCP 服务器** | 14 | 共享 (mcp.json) | 7 (自动合并) | 完整 |
| **配置格式** | settings.json | hooks.json + rules/ | config.toml | opencode.json |

## Cursor IDE 支持

### 快速开始

```bash
# macOS/Linux
./install.sh --target cursor typescript
./install.sh --target cursor python golang swift php

# Windows PowerShell
.\install.ps1 --target cursor typescript
```

### Hook 架构（DRY 适配器模式）

Cursor 比 Claude Code 有更多 Hook 事件（20 vs 8）。`.cursor/hooks/adapter.js` 将 Cursor 的 stdin JSON 转换为 Claude Code 格式，复用现有 Hook 脚本：

```
Cursor stdin JSON → adapter.js → 转换 → scripts/hooks/*.js (与 Claude Code 共享)
```

### 关键 Hook

| Hook | 说明 |
|------|------|
| `beforeShellExecution` | 阻止 tmux 外的开发服务器（exit 2）、git push 审查 |
| `afterFileEdit` | 自动格式化 + TypeScript 检查 + console.log 警告 |
| `beforeSubmitPrompt` | 检测提示中的密钥（sk-、ghp_、AKIA 模式）|
| `beforeTabFileRead` | 阻止 Tab 读取 .env、.key、.pem 文件 |

### Rules 格式

Cursor 规则使用 YAML frontmatter：

```yaml
---
description: "TypeScript coding style extending common rules"
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
alwaysApply: false
---
```

## Codex 支持

### 快速开始

```bash
# CLI — 自动检测 AGENTS.md 和 .codex/
codex

# 同步 ECC 资源到 ~/.codex
npm install && bash scripts/sync-ecc-to-codex.sh

# 手动安装参考配置
cp .codex/config.toml ~/.codex/config.toml
```

同步脚本使用**仅添加**策略安全合并 MCP 服务器，不会移除或修改已有配置。使用 `--dry-run` 预览变更。

### 包含内容

| 组件 | 数量 | 说明 |
|------|------|------|
| Config | 1 | `.codex/config.toml` — 审批/沙盒/Web搜索/MCP/通知/配置 |
| AGENTS.md | 2 | 根目录（通用）+ `.codex/AGENTS.md`（Codex 特定补充）|
| Skills | 30 | `.agents/skills/` — SKILL.md + agents/openai.yaml |
| MCP 服务器 | 6-7 | GitHub、Context7、Exa、Memory、Playwright 等 |
| 配置文件 | 2 | `strict`（只读沙盒）和 `yolo`（全自动）|
| Agent 角色 | 3 | explorer、reviewer、docs-researcher |

### 限制

Codex 尚未提供 Claude 风格的 Hook 执行对等支持，通过 `AGENTS.md` 指令和沙盒/审批设置实现。

## OpenCode 支持

### 快速开始

```bash
npm install -g opencode
opencode  # 在仓库根目录运行
```

### Hook 事件映射

| Claude Code Hook | OpenCode 插件事件 |
|-----------------|------------------|
| `PreToolUse` | `tool.execute.before` |
| `PostToolUse` | `tool.execute.after` |
| `Stop` | `session.idle` |
| `SessionStart` | `session.created` |
| `SessionEnd` | `session.deleted` |

OpenCode 额外支持：`file.edited`、`file.watcher.updated`、`message.updated`、`lsp.client.diagnostics` 等。

### npm 安装

```bash
npm install ecc-universal
```

添加到 `opencode.json`：

```json
{
  "plugin": ["ecc-universal"]
}
```

## Gemini 支持

实验性支持，通过 `.gemini/GEMINI.md` 和共享安装器实现。

## 核心架构决策

- **AGENTS.md** 在根目录是跨工具通用文件（所有工具读取）
- **DRY 适配器模式**让 Cursor 复用 Claude Code 的 Hook 脚本
- **Skills 格式**（SKILL.md + YAML frontmatter）跨 Claude Code、Codex、OpenCode 通用
- Codex 缺少 Hook 通过 `AGENTS.md` 指令和沙盒权限补偿
