---
title: Agents 子代理
---

# Agents 子代理

ECC 包含 48 个专门化子代理，用于处理各类委托任务。每个 Agent 都有明确的工具范围和模型配置，确保在特定领域内高效工作。

## Agent 定义格式

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---
You are a senior code reviewer...
```

## Agent 目录

### 规划与架构

| Agent | 说明 |
|-------|------|
| `planner` | 功能实施规划 |
| `architect` | 系统设计决策 |

### 代码审查

| Agent | 说明 |
|-------|------|
| `code-reviewer` | 代码质量和安全审查 |
| `security-reviewer` | 安全漏洞分析 |
| `typescript-reviewer` | TypeScript/JavaScript 代码审查 |
| `python-reviewer` | Python 代码审查 |
| `go-reviewer` | Go 代码审查 |
| `java-reviewer` | Java/Spring Boot 代码审查 |
| `kotlin-reviewer` | Kotlin/Android/KMP 代码审查 |
| `rust-reviewer` | Rust 代码审查 |
| `cpp-reviewer` | C++ 代码审查 |
| `database-reviewer` | 数据库/Supabase 审查 |

### 构建与修复

| Agent | 说明 |
|-------|------|
| `build-error-resolver` | 构建错误解决 |
| `go-build-resolver` | Go 构建错误解决 |
| `java-build-resolver` | Java/Maven/Gradle 构建错误 |
| `kotlin-build-resolver` | Kotlin/Gradle 构建错误 |
| `rust-build-resolver` | Rust 构建错误解决 |
| `cpp-build-resolver` | C++ 构建错误解决 |
| `pytorch-build-resolver` | PyTorch/CUDA 训练错误 |

### 测试与质量

| Agent | 说明 |
|-------|------|
| `tdd-guide` | 测试驱动开发指导 |
| `e2e-runner` | Playwright E2E 测试 |

### 运维与文档

| Agent | 说明 |
|-------|------|
| `refactor-cleaner` | 死代码清理 |
| `doc-updater` | 文档同步 |
| `docs-lookup` | 文档/API 查询 |
| `chief-of-staff` | 通信分流和草稿 |
| `loop-operator` | 自主循环执行 |
| `harness-optimizer` | Harness 配置调优 |

## 使用示例

### 委托代码审查

```
/code-review
→ code-reviewer 检查代码质量、安全性和可维护性
```

### 修复构建错误

```
/build-fix
→ build-error-resolver 分析错误并修复
```

### 语言特定审查

```
/go-review    → go-reviewer 审查 Go 代码
/python-review → python-reviewer 审查 Python 代码
```

## 何时使用 Agent

| 场景 | 推荐 Agent |
|------|-----------|
| 开始新功能 | `planner` |
| 设计系统架构 | `architect` |
| 代码审查 | `code-reviewer` 或语言特定审查器 |
| 修复构建 | `build-error-resolver` 或语言特定构建修复器 |
| 安全审计 | `security-reviewer` |
| 清理代码 | `refactor-cleaner` |
| 更新文档 | `doc-updater` |
| E2E 测试 | `e2e-runner` |
