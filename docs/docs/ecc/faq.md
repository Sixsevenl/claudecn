---
title: 常见问题
---

# 常见问题

## 如何检查已安装的 Agents/Commands？

```bash
/plugin list everything-claude-code@everything-claude-code
```

## Hook 不工作 / 看到 "Duplicate hooks file" 错误

这是最常见的问题。**不要在 `.claude-plugin/plugin.json` 中添加 `"hooks"` 字段。**

Claude Code v2.1+ 自动加载已安装插件的 `hooks/hooks.json`。显式声明会导致重复检测错误。

## 可以在自定义 API 端点或模型网关上使用吗？

可以。ECC 不硬编码 Anthropic 托管设置，通过 Claude Code 正常的 CLI/插件界面运行，兼容：

- Anthropic 托管的 Claude Code
- 使用 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_AUTH_TOKEN` 的官方网关
- 兼容的 Anthropic API 自定义端点

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=your-token
claude
```

## 上下文窗口在缩小 / Claude 快用完上下文

太多 MCP 服务器会消耗上下文窗口 Token。

**解决方案：** 在项目配置中禁用不需要的 MCP：

```json
{
  "disabledMcpServers": ["supabase", "railway", "vercel"]
}
```

保持不超过 10 个 MCP 启用，80 个工具活跃。

## 可以只安装部分组件吗？

可以。使用手动安装方式只复制需要的部分：

```bash
# 只要 agents
cp everything-claude-code/agents/*.md ~/.claude/agents/

# 只要 rules
mkdir -p ~/.claude/rules/
cp -r everything-claude-code/rules/common ~/.claude/rules/
```

每个组件完全独立。

## 支持哪些 IDE/工具？

ECC 是跨平台的：

- **Claude Code**: 原生支持（主要目标）
- **Cursor**: 预转换配置，完整支持
- **Codex**: macOS App + CLI 一等支持
- **OpenCode**: 完整插件支持
- **Gemini CLI**: 实验性支持
- **Antigravity**: 紧密集成

## 本地设置被重置了怎么办？

```bash
ecc list-installed    # 查看已安装组件
ecc doctor            # 运行诊断
ecc repair            # 修复问题
```

通常可以恢复 ECC 管理的文件，无需重新构建。

## 如何贡献新的 Skill 或 Agent？

1. Fork 仓库
2. 在 `skills/your-skill-name/SKILL.md` 创建技能（带 YAML frontmatter）
3. 或在 `agents/your-agent.md` 创建 Agent
4. 提交 PR，说明功能和适用场景

详见 [CONTRIBUTING.md](https://github.com/affaan-m/everything-claude-code/blob/main/CONTRIBUTING.md)。

## 运行测试

```bash
# 运行所有测试
node tests/run-all.js

# 运行单个测试文件
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## ECC 的三个标识符有什么区别？

| 标识符 | 用途 |
|--------|------|
| `affaan-m/everything-claude-code` | GitHub 源码仓库 |
| `everything-claude-code@everything-claude-code` | Claude 插件标识 |
| `ecc-universal` | npm 包名 |

不可互换。Marketplace 安装使用插件标识，npm 安装使用包名。
