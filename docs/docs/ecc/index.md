---
title: Everything Claude Code
---

# Everything Claude Code

> **140K+ stars** | **21K+ forks** | **170+ contributors** | **Anthropic Hackathon Winner**

Everything Claude Code（ECC）是一个 AI Agent 性能优化系统，由 Anthropic 黑客松冠军打造。它不只是一组配置文件，而是一套完整的系统：技能、本能、内存优化、持续学习、安全扫描和研究优先的开发方法。

**48 个 Agents | 183 个 Skills | 79 个 Legacy Commands | Hooks | Rules | MCP Configs**

适用于 **Claude Code**、**Cursor**、**Codex**、**OpenCode**、**Gemini** 等 AI Agent 框架。

## 核心特性

- **Agents（子代理）**：36+ 个专门化子代理，处理代码审查、安全分析、构建修复、E2E 测试等委托任务
- **Skills（技能）**：183 个工作流定义和领域知识，覆盖前端、后端、测试、安全、部署等
- **Commands（命令）**：79 个 Legacy 斜杠命令兼容层，如 `/tdd`、`/plan`、`/code-review`
- **Hooks（钩子）**：基于事件的自动化触发器，实现自动格式化、安全检测、内存持久化
- **Rules（规则）**：跨语言的始终遵循指南，按语言目录组织
- **MCP 配置**：预配置的 MCP 服务器（GitHub、Supabase、Vercel 等）

## 快速开始

### 方式一：插件安装（推荐）

```bash
# 添加 marketplace
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# 安装插件
/plugin install everything-claude-code@everything-claude-code
```

### 方式二：手动安装

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 安装依赖
npm install

# macOS/Linux - 完整安装
./install.sh --profile full

# 或按语言安装
./install.sh typescript
./install.sh typescript python golang swift php

# Windows PowerShell
.\install.ps1 --profile full
```

### 安装 Rules（必需）

Claude Code 插件系统不支持自动分发 `rules`，需手动安装：

```bash
# 用户级别（适用于所有项目）
mkdir -p ~/.claude/rules
cp -r everything-claude-code/rules/common ~/.claude/rules/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/  # 按需选择

# 项目级别（仅适用于当前项目）
mkdir -p .claude/rules
cp -r everything-claude-code/rules/common .claude/rules/
```

## 常用工作流

### 开始新功能

```
/ecc:plan "Add user authentication with OAuth"
→ planner 创建实施蓝图
/tdd → tdd-guide 强制测试先行
/code-review → code-reviewer 检查你的代码
```

### 修复 Bug

```
/tdd → tdd-guide: 编写重现 bug 的失败测试
→ 实现修复，验证测试通过
/code-review → code-reviewer: 捕获回归问题
```

### 准备上线

```
/security-scan → security-reviewer: OWASP Top 10 审计
/e2e → e2e-runner: 关键用户流程测试
/test-coverage → 验证 80%+ 覆盖率
```

## Dashboard GUI

启动桌面仪表板可视化浏览 ECC 组件：

```bash
npm run dashboard
# 或
python3 ./ecc_dashboard.py
```

功能：标签页界面（Agents、Skills、Commands、Rules、Settings）、深色/浅色主题切换、字体自定义、搜索过滤。

## 相关链接

- **GitHub 仓库**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **npm 包**: [ecc-universal](https://www.npmjs.com/package/ecc-universal)
- **Shorthand Guide**: [入门简明指南](https://x.com/affaanmustafa/status/2012378465664745795)
- **Longform Guide**: [深度指南](https://x.com/affaanmustafa/status/2014040193557471352)
- **License**: MIT
