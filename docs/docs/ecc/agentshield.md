---
title: AgentShield 安全审计
---

# AgentShield 安全审计

> Built at the Claude Code Hackathon (Cerebral Valley x Anthropic, Feb 2026). 1282 tests, 98% coverage, 102 static analysis rules.

AgentShield 是 ECC 的安全审计组件，扫描 Claude Code 配置中的漏洞、错误配置和注入风险。

## 快速使用

```bash
# 快速扫描（无需安装）
npx ecc-agentshield scan

# 自动修复安全问题
npx ecc-agentshield scan --fix

# 使用三个 Opus 4.6 Agent 进行深度分析
npx ecc-agentshield scan --opus --stream

# 从零生成安全配置
npx ecc-agentshield init
```

在 Claude Code 中使用：

```
/security-scan
```

## 扫描范围

AgentShield 扫描以下配置文件和类别：

### 扫描的文件

- `CLAUDE.md`
- `settings.json`
- MCP 配置
- Hook 定义
- Agent 定义
- Skills 配置

### 5 大检查类别

| 类别 | 说明 | 规则数 |
|------|------|--------|
| **密钥检测** | API 密钥、Token 泄露 | 14 种模式 |
| **权限审计** | 文件系统、网络、命令执行权限 | - |
| **Hook 注入分析** | 恶意 Hook 注入检测 | - |
| **MCP 服务器风险** | MCP 服务器安全评估 | - |
| **Agent 配置审查** | Agent 定义安全检查 | - |

## Opus 深度分析

`--opus` 标志运行三个 Claude Opus 4.6 Agent 组成的安全管道：

```
Red Team Agent → 攻击视角，发现利用链
Blue Team Agent → 防御视角，评估保护措施
Auditor Agent → 综合两者，生成优先级风险评估
```

这不是简单的模式匹配，而是对抗性推理。

## 输出格式

| 格式 | 用途 |
|------|------|
| **Terminal** | 彩色分级（A-F）|
| **JSON** | CI 管道集成 |
| **Markdown** | 文档记录 |
| **HTML** | 可视化报告 |

关键发现时退出码为 2，可用于构建门禁。

## CI 集成

添加到 GitHub Actions：

```yaml
- name: Security Scan
  run: npx ecc-agentshield scan --format json
```

也可使用专用 GitHub Action：[affaan-m/agentshield](https://github.com/affaan-m/agentshield)

## 相关链接

- **GitHub**: [affaan-m/agentshield](https://github.com/affaan-m/agentshield)
- **npm**: [ecc-agentshield](https://www.npmjs.com/package/ecc-agentshield)
- **GitHub Marketplace**: [ecc-tools](https://github.com/marketplace/ecc-tools)
