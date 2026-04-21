---
title: 持续学习
---

# 持续学习

ECC 的持续学习系统自动从你的工作模式中学习，提取可复用的知识，并不断进化。

## Continuous Learning v2

基于本能（Instinct）的学习系统，带置信度评分：

```bash
/instinct-status    # 查看已学习的本能及置信度
/instinct-import    # 导入他人的本能
/instinct-export    # 导出你的本能供分享
/evolve             # 将相关本能聚类为技能
```

### 工作原理

1. **观察**: 在每次会话中观察你的编码模式
2. **提取**: 自动提取重复出现的模式为"本能"
3. **评分**: 为每个本能分配置信度分数
4. **进化**: 高置信度的本能可被聚类为完整的技能

### 本能格式

```
---
name: prefer-immutability
confidence: 0.92
created: 2026-02-15
---
# Prefer Immutability
Action: Use const and readonly by default
Evidence: Consistently applied across 50+ files
Examples: ...
```

### 导入导出

```bash
# 导出你的本能给团队
/instinct-export

# 导入团队成员的本能
/instinct-import

# 删除过期本能（30天 TTL）
/prune
```

## Continuous Learning v1（Legacy）

v1 使用 Stop-hook 模式提取。仅在你明确需要旧版流程时保留：

```bash
/learn          # 从当前会话中提取模式
/learn-eval     # 提取、评估并保存模式
```

## 技能创建

从 git 历史自动生成技能：

```bash
# 分析当前仓库
/skill-create

# 同时生成本能
/skill-create --instincts
```

### GitHub App（高级功能）

对于大型仓库（10k+ commits），可以使用 GitHub App：

- 自动分析 commit 历史
- 自动生成 SKILL.md 文件
- 团队共享
- PR 自动触发

```bash
# 在 Issue 中评论
/skill-creator analyze

# 或在 push 到默认分支时自动触发
```

## 相关命令

| 命令 | 说明 |
|------|------|
| `/learn` | 从会话中提取模式（v1）|
| `/learn-eval` | 提取并评估后再保存 |
| `/instinct-status` | 查看已学习的本能 |
| `/instinct-import` | 导入本能 |
| `/instinct-export` | 导出本能 |
| `/evolve` | 将本能聚类为技能 |
| `/prune` | 删除过期本能 |
| `/skill-create` | 从 git 历史生成技能 |
