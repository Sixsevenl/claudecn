---
title: Commands 命令
---

# Commands 命令

ECC 包含 79 个 Legacy 斜杠命令兼容层。新开发的工作流应优先使用 Skills，但现有的命令仍然是大多数用户最熟悉的快速入口。

::: info
插件安装使用命名空间形式 `/ecc:plan`，手动安装使用短形式 `/plan`。
:::

## 命令目录

### 开发流程

| 命令 | 说明 |
|------|------|
| `/plan` | 实施规划 |
| `/tdd` | 测试驱动开发 |
| `/code-review` | 代码质量审查 |
| `/build-fix` | 修复构建错误 |
| `/refactor-clean` | 死代码清理 |
| `/e2e` | E2E 测试生成 |
| `/orchestrate` | 多 Agent 协调 |

### 验证与评估

| 命令 | 说明 |
|------|------|
| `/verify` | 运行验证循环 |
| `/checkpoint` | 保存验证状态 |
| `/eval` | 评估代码质量 |
| `/test-coverage` | 测试覆盖率分析 |
| `/quality-gate` | 质量门禁检查 |
| `/harness-audit` | Harness 可靠性审计 |

### 持续学习

| 命令 | 说明 |
|------|------|
| `/learn` | 从会话中提取模式 |
| `/learn-eval` | 提取、评估并保存模式 |
| `/instinct-status` | 查看已学习的本能 |
| `/instinct-import` | 导入本能 |
| `/instinct-export` | 导出本能 |
| `/evolve` | 将本能聚类为技能 |
| `/prune` | 删除过期本能（30 天 TTL）|

### 语言特定

| 命令 | 说明 |
|------|------|
| `/go-review` | Go 代码审查 |
| `/go-test` | Go TDD 工作流 |
| `/go-build` | 修复 Go 构建错误 |
| `/python-review` | Python 代码审查 |

### 文档

| 命令 | 说明 |
|------|------|
| `/update-docs` | 更新文档 |
| `/update-codemaps` | 更新 codemaps |

### 多模型编排

| 命令 | 说明 |
|------|------|
| `/multi-plan` | 多模型协作规划 |
| `/multi-execute` | 多模型协作执行 |
| `/multi-backend` | 后端多服务编排 |
| `/multi-frontend` | 前端多服务编排 |
| `/multi-workflow` | 完整多模型开发工作流 |

::: warning
`multi-*` 命令需要额外安装 `ccg-workflow` 运行时：`npx ccg-workflow`
:::

### 其他

| 命令 | 说明 |
|------|------|
| `/skill-create` | 从 git 历史生成技能 |
| `/setup-pm` | 配置包管理器 |
| `/sessions` | 会话历史管理 |
| `/pm2` | PM2 服务生命周期管理 |
| `/security-scan` | AgentShield 安全扫描 |
| `/model-route` | 按复杂度和预算路由模型 |
| `/loop-start` | 启动受控自主循环 |
| `/loop-status` | 检查活动循环状态 |

## 命令 vs 技能

ECC 正在从 Commands 向 Skills 迁移：

| 特性 | Commands | Skills |
|------|----------|--------|
| 入口 | `/command-name` | 自动推荐或直接调用 |
| 格式 | Markdown 文件 | SKILL.md + YAML frontmatter |
| 可组合性 | 有限 | 高（可被 Agent 复用）|
| 未来方向 | 维护模式 | 主要开发方向 |
| 跨平台 | Claude Code 专用 | Claude Code、Codex、OpenCode |
