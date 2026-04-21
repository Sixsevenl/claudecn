---
title: Hooks 钩子系统
---

# Hooks 钩子系统

Hooks 是基于事件的自动化触发器，在工具使用前后自动执行。ECC 提供了完整的 Hook 系统，包括内存持久化、自动格式化、安全检测等。

## Hook 架构

```
Claude Code 事件 → hooks.json 匹配 → 脚本执行
```

ECC 使用 Node.js 脚本实现跨平台兼容：

```
scripts/
├── hooks/
│   ├── session-start.js    # 会话开始时加载上下文
│   ├── session-end.js      # 会话结束时保存状态
│   ├── pre-compact.js      # 压缩前保存状态
│   ├── suggest-compact.js  # 战略性压缩建议
│   └── evaluate-session.js # 从会话中提取模式
```

## Hook 事件类型

| 事件 | 说明 |
|------|------|
| `PreToolUse` | 工具使用前触发 |
| `PostToolUse` | 工具使用后触发 |
| `Stop` | 会话停止时触发 |
| `SessionStart` | 会话开始时触发 |

## Hook 示例

### 检测 console.log

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\.(ts|tsx|js|jsx)$\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\ngrep -n 'console\\.log' \"$file_path\" && echo '[Hook] Remove console.log' >&2"
  }]
}
```

### 内存持久化

Session 生命周期 Hook 自动在会话之间保存和加载上下文：

- **session-start.js**: 加载上次会话的上下文
- **session-end.js**: 保存当前会话状态
- **pre-compact.js**: 压缩前保存状态

## Hook 运行时控制

通过环境变量控制 Hook 行为，无需编辑配置文件：

```bash
# Hook 严格度配置（默认: standard）
export ECC_HOOK_PROFILE=standard    # minimal | standard | strict

# 禁用特定 Hook（逗号分隔）
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"
```

### 严格度级别

| 级别 | 说明 |
|------|------|
| `minimal` | 仅核心 Hook |
| `standard` | 标准集（默认）|
| `strict` | 所有 Hook，包括安全检查 |

## 安装 Hook

```bash
# macOS / Linux
bash ./install.sh --target claude --modules hooks-runtime

# Windows PowerShell
pwsh -File .\install.ps1 --target claude --modules hooks-runtime
```

::: warning 重要
- 不要直接复制仓库的 `hooks/hooks.json` 到 `~/.claude/settings.json`
- 插件安装的用户不需要手动复制 Hook，Claude Code v2.1+ 会自动加载
- 不要在 `.claude-plugin/plugin.json` 中添加 `"hooks"` 字段，会导致重复检测错误
:::

## 战略性压缩

`strategic-compact` 技能包含的 Hook 会在逻辑断点建议 `/compact`，而不是等到 95% 上下文时自动压缩。

**何时压缩：**
- 研究/探索完成后，实施开始前
- 完成一个里程碑后，开始下一个前
- 调试完成后，继续功能开发前
- 方案失败后，尝试新方案前

**何时不压缩：**
- 实施过程中（会丢失变量名、文件路径、部分状态）
