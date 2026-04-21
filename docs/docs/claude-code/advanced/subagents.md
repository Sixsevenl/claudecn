---
title: "Subagents 子代理"
---

# Subagents 子代理

Subagents（子代理）是 Claude Code 的高级特性，允许主 Agent 创建专门的子任务执行者。通过任务分解和并行执行，Subagents 能够处理复杂的多步骤工作流，提升效率和专注度。

## 什么是 Subagents

Subagents 是独立的 Claude 实例，由主 Agent 创建并分配特定任务。每个 Subagent 拥有：

- **独立上下文**：不共享主 Agent 的对话历史
- **专门职责**：聚焦单一明确的任务
- **有限权限**：可配置工具访问权限
- **结果返回**：完成后将结果返回给主 Agent

### 使用场景

- **并行任务**：同时处理多个独立任务
- **专业分工**：不同任务使用不同的提示词策略
- **上下文隔离**：避免主 Agent 上下文过载
- **递归分解**：复杂任务层层拆解

## 基础用法

### 创建 Subagent

在对话中，Claude 可以自动创建 Subagent：

```
用户：请分析这个项目的前端和后端架构，并生成文档

Claude：我将创建两个 Subagent 并行处理：
1. Frontend Analyzer - 分析前端架构
2. Backend Analyzer - 分析后端架构

[创建 Subagent: frontend-analyzer]
任务：分析 src/frontend 目录的架构
工具：read, glob, grep
上下文：src/frontend/**

[创建 Subagent: backend-analyzer]
任务：分析 src/backend 目录的架构
工具：read, glob, grep
上下文：src/backend/**
```

### Subagent 配置

通过 `.claude/config.json` 配置 Subagent 行为：

```json
{
  "subagents": {
    "enabled": true,
    "maxConcurrent": 3,
    "maxDepth": 2,
    "defaultTimeout": 300000,
    "defaultTools": ["read", "grep", "glob"],
    "templates": {
      "analyzer": {
        "systemPrompt": "你是代码分析专家，专注于架构分析和文档生成。",
        "tools": ["read", "grep", "glob"],
        "temperature": 0.3
      },
      "coder": {
        "systemPrompt": "你是代码生成专家，专注于编写高质量代码。",
        "tools": ["read", "write", "edit"],
        "temperature": 0.7
      },
      "tester": {
        "systemPrompt": "你是测试专家，专注于编写全面的测试用例。",
        "tools": ["read", "write", "bash"],
        "temperature": 0.5
      }
    }
  }
}
```

## Subagent 模板

### 1. 代码分析模板

`.claude/subagents/analyzer.md`：

```markdown
---
name: analyzer
description: 代码分析专家
tools:
  - read
  - grep
  - glob
temperature: 0.3
---

# 代码分析 Subagent

你是一个代码分析专家，专注于：

## 核心职责
1. 分析代码结构和架构
2. 识别设计模式
3. 评估代码质量
4. 生成分析报告

## 分析方法
- 自顶向下：从入口点开始追踪
- 依赖分析：识别模块间关系
- 模式识别：发现常见设计模式
- 质量评估：代码复杂度、可维护性

## 输出格式
- 结构化的 Markdown 报告
- 包含代码示例
- 突出关键发现
- 提供改进建议
```

### 2. 代码生成模板

`.claude/subagents/coder.md`：

```markdown
---
name: coder
description: 代码生成专家
tools:
  - read
  - write
  - edit
temperature: 0.7
---

# 代码生成 Subagent

你是一个代码生成专家，专注于：

## 核心职责
1. 根据规范生成代码
2. 遵循项目编码规范
3. 确保代码质量
4. 添加适当注释

## 生成原则
- 遵循 DRY 原则
- 保持代码简洁
- 使用有意义的命名
- 考虑边界条件
- 处理错误情况

## 质量标准
- 类型安全
- 无 linter 警告
- 符合项目风格
- 可测试性
```

### 3. 测试生成模板

`.claude/subagents/tester.md`：

```markdown
---
name: tester
description: 测试专家
tools:
  - read
  - write
  - bash
temperature: 0.5
---

# 测试生成 Subagent

你是一个测试专家，专注于：

## 核心职责
1. 生成全面的测试用例
2. 确保测试覆盖率
3. 编写可维护的测试
4. 验证测试通过

## 测试策略
- 单元测试：测试独立函数
- 集成测试：测试模块交互
- 边界测试：测试极端情况
- 错误测试：测试异常处理

## 测试质量
- 测试描述清晰
- 断言有意义
- Mock 合理使用
- 测试独立性
```

## 实战示例

### 示例 1：全栈功能开发

```markdown
任务：实现用户认证功能

主 Agent 分解：
1. [Subagent: backend-coder] 实现后端 API
2. [Subagent: frontend-coder] 实现前端组件
3. [Subagent: tester] 生成端到端测试
4. [主 Agent] 整合和验证

执行流程：
```

```json
{
  "task": "用户认证功能",
  "subagents": [
    {
      "id": "backend-coder",
      "template": "coder",
      "task": "实现 /api/auth 端点",
      "context": ["src/backend/routes/", "src/backend/models/"],
      "deliverables": [
        "src/backend/routes/auth.ts",
        "src/backend/middleware/auth.ts"
      ]
    },
    {
      "id": "frontend-coder",
      "template": "coder",
      "task": "实现登录/注册组件",
      "context": ["src/frontend/components/", "src/frontend/api/"],
      "deliverables": [
        "src/frontend/components/Login.tsx",
        "src/frontend/components/Register.tsx"
      ]
    },
    {
      "id": "tester",
      "template": "tester",
      "task": "生成认证功能测试",
      "dependencies": ["backend-coder", "frontend-coder"],
      "deliverables": [
        "tests/e2e/auth.test.ts"
      ]
    }
  ]
}
```

### 示例 2：代码库重构

```markdown
任务：重构支付模块

主 Agent 策略：
1. [Subagent: analyzer] 分析现有代码
2. [主 Agent] 制定重构计划
3. [Subagent: refactor-1] 重构核心逻辑
4. [Subagent: refactor-2] 重构辅助函数
5. [Subagent: tester] 验证重构结果
```

### 示例 3：文档生成

```markdown
任务：生成项目文档

并行执行：
- [Subagent: api-doc] 生成 API 文档
- [Subagent: arch-doc] 生成架构文档
- [Subagent: user-doc] 生成用户指南
- [Subagent: dev-doc] 生成开发指南

主 Agent 整合：
- 合并所有文档
- 生成目录
- 统一格式
- 添加导航
```

## 高级特性

### 1. Subagent 通信

Subagents 可以通过主 Agent 进行通信：

```json
{
  "communication": {
    "enabled": true,
    "protocol": "message-passing",
    "channels": {
      "frontend-backend": {
        "participants": ["frontend-coder", "backend-coder"],
        "purpose": "API 接口协调"
      }
    }
  }
}
```

### 2. 依赖管理

定义 Subagent 执行顺序：

```json
{
  "subagents": [
    {
      "id": "schema-designer",
      "dependencies": []
    },
    {
      "id": "backend-coder",
      "dependencies": ["schema-designer"]
    },
    {
      "id": "frontend-coder",
      "dependencies": ["backend-coder"]
    }
  ]
}
```

### 3. 结果聚合

主 Agent 聚合 Subagent 结果：

```markdown
## 聚合策略

1. **收集结果**
   - 等待所有 Subagent 完成
   - 收集输出和元数据
   - 检查错误和警告

2. **验证一致性**
   - 检查接口匹配
   - 验证数据格式
   - 确认依赖满足

3. **整合输出**
   - 合并代码变更
   - 生成统一报告
   - 更新文档
```

### 4. 错误处理

```json
{
  "errorHandling": {
    "strategy": "retry-or-escalate",
    "maxRetries": 2,
    "retryDelay": 5000,
    "onFailure": "escalate-to-main",
    "fallback": {
      "enabled": true,
      "action": "manual-intervention"
    }
  }
}
```

## 性能优化

### 并行执行

```json
{
  "execution": {
    "mode": "parallel",
    "maxConcurrent": 3,
    "scheduling": "priority-based",
    "priorities": {
      "critical": ["schema-designer"],
      "high": ["backend-coder"],
      "normal": ["frontend-coder"],
      "low": ["doc-generator"]
    }
  }
}
```

### 资源限制

```json
{
  "resources": {
    "perSubagent": {
      "maxTokens": 100000,
      "maxDuration": 300000,
      "maxToolCalls": 50
    },
    "total": {
      "maxSubagents": 10,
      "maxTotalTokens": 500000
    }
  }
}
```

### 上下文优化

```json
{
  "context": {
    "sharing": "minimal",
    "isolation": "strict",
    "preload": {
      "enabled": true,
      "patterns": ["*.config.js", "package.json"]
    }
  }
}
```

## 监控和调试

### 执行日志

```bash
# 查看 Subagent 执行日志
claude --subagent-logs

# 输出示例
[2024-01-15 10:30:00] Main Agent: 创建任务计划
[2024-01-15 10:30:05] Subagent[analyzer]: 开始执行
[2024-01-15 10:30:15] Subagent[analyzer]: 完成分析
[2024-01-15 10:30:20] Subagent[coder]: 开始执行
[2024-01-15 10:30:45] Subagent[coder]: 代码生成完成
[2024-01-15 10:30:50] Main Agent: 聚合结果
```

### 性能分析

```bash
# 查看 Subagent 性能统计
claude --subagent-stats

# 输出示例
Subagent Performance:
  analyzer:
    Duration: 10s
    Tokens: 15,000
    Tool Calls: 8
  coder:
    Duration: 25s
    Tokens: 35,000
    Tool Calls: 12
  Total:
    Duration: 35s (15s parallel)
    Tokens: 50,000
    Efficiency: 57% time saved
```

### 调试模式

```bash
# 启用 Subagent 调试
claude --debug-subagents

# 单步执行
claude --subagent-step-mode
```

## 最佳实践

### 1. 任务分解原则

- **单一职责**：每个 Subagent 只做一件事
- **明确边界**：清晰定义输入和输出
- **最小依赖**：减少 Subagent 间依赖
- **可并行化**：优先设计可并行的任务

### 2. 模板设计

- **专业化**：为不同任务类型创建专门模板
- **可复用**：模板应适用于多个场景
- **参数化**：支持灵活配置
- **文档化**：清晰说明模板用途

### 3. 错误处理

- **优雅降级**：Subagent 失败不应导致整体失败
- **重试机制**：对临时错误进行重试
- **错误上报**：清晰报告错误原因
- **回滚支持**：支持撤销失败的操作

### 4. 性能考虑

- **避免过度分解**：太多 Subagent 会增加开销
- **合理并行度**：根据任务特性设置并发数
- **上下文最小化**：只传递必要的上下文
- **结果缓存**：缓存可复用的结果

## 安全考虑

### 权限控制

```json
{
  "security": {
    "subagentPermissions": {
      "analyzer": {
        "allowedTools": ["read", "grep", "glob"],
        "allowedPaths": ["src/**", "tests/**"],
        "deniedPaths": [".env", "secrets/**"]
      },
      "coder": {
        "allowedTools": ["read", "write", "edit"],
        "requireApproval": ["write", "edit"],
        "allowedPaths": ["src/**"],
        "deniedPaths": ["node_modules/**"]
      }
    }
  }
}
```

### 审计日志

```json
{
  "audit": {
    "enabled": true,
    "logLevel": "detailed",
    "logPath": ".claude/logs/subagents/",
    "retention": "30d",
    "events": [
      "subagent-created",
      "tool-called",
      "file-modified",
      "subagent-completed"
    ]
  }
}
```

## 故障排查

### 常见问题

**Subagent 创建失败**
- 检查配置文件语法
- 验证模板是否存在
- 确认权限设置

**Subagent 超时**
- 增加 `maxDuration` 设置
- 简化任务复杂度
- 检查是否有死循环

**结果不一致**
- 检查 Subagent 间依赖
- 验证数据传递
- 确认执行顺序

**资源耗尽**
- 减少并发数
- 优化上下文大小
- 限制 token 使用

## 下一步

- 学习 [Skills](./skills.md) 创建可复用的 Subagent 模板
- 探索 [Hooks](./hooks.md) 自动触发 Subagent
- 查看 [模式库](./pattern-library.md) 获取更多示例
