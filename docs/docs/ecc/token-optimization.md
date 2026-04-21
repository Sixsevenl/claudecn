---
title: Token 优化指南
---

# Token 优化指南

Claude Code 使用可能很昂贵。以下设置可以在不影响质量的前提下显著降低成本。

## 推荐配置

添加到 `~/.claude/settings.json`：

```json
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}
```

## 设置说明

| 设置 | 默认值 | 推荐值 | 影响 |
|------|--------|--------|------|
| `model` | opus | **sonnet** | 约 60% 成本降低；可处理 80%+ 的编码任务 |
| `MAX_THINKING_TOKENS` | 31,999 | **10,000** | 每次请求隐藏思考成本降低约 70% |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | **50** | 更早压缩——长会话中保持更高质量 |
| `CLAUDE_CODE_SUBAGENT_MODEL` | 默认 | **haiku** | 子代理使用更便宜的模型 |

## 日常命令

| 命令 | 何时使用 |
|------|---------|
| `/model sonnet` | 大多数任务的默认模型 |
| `/model opus` | 复杂架构、深度调试、深度推理 |
| `/clear` | 不相关任务之间（免费、即时重置）|
| `/compact` | 逻辑任务断点（研究完成、里程碑完成）|
| `/cost` | 会话中监控 Token 消耗 |

## 何时使用 Opus

仅在以下场景切换到 Opus：

- 深度架构推理
- 复杂调试（多个系统交互）
- 安全审查
- 代码审查中的关键决策

```
/model opus    # 切换到 Opus 处理复杂任务
/model sonnet  # 完成后切回 Sonnet
```

## 战略性压缩

ECC 包含的 `strategic-compact` 技能会在逻辑断点建议 `/compact`，而非等到 95% 上下文自动压缩。

### 何时压缩

- 研究/探索完成后，实施开始前
- 完成一个里程碑后，开始下一个前
- 调试完成后，继续功能开发前
- 方案失败后，尝试新方案前

### 何时不压缩

- 实施过程中（会丢失变量名、文件路径、部分状态）

## 上下文窗口管理

::: warning 关键
不要同时启用所有 MCP 服务器。每个 MCP 工具描述消耗 200k 窗口中的 Token，可能将其减少到约 70k。
:::

最佳实践：

- 每个项目启用不超过 **10 个** MCP 服务器
- 活跃工具不超过 **80 个**
- 使用项目配置中的 `disabledMcpServers` 禁用不需要的

```json
// 在项目的 .claude/settings.json
{
  "disabledMcpServers": ["supabase", "railway", "vercel"]
}
```

## Agent Teams 成本警告

Agent Teams 会产生多个上下文窗口，每个队友独立消耗 Token。仅在并行性提供明确价值的任务中使用（多模块工作、并行审查）。对于简单的顺序任务，子代理更省 Token。
