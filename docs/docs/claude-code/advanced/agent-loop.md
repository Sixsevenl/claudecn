---
title: "Agent Loop 解析"
---

# Agent Loop 解析

Agent Loop 是 Claude Code 的核心执行机制，它控制着 Claude 如何理解任务、规划步骤、执行操作并验证结果。理解 Agent Loop 可以帮助你更好地与 Claude 协作。

## Agent Loop 工作流程

### 1. 任务理解阶段

当你输入一个请求时，Claude 首先会分析任务的复杂度和所需的工具。

```bash
You: 重构 src/utils/api.ts，添加错误重试机制

Claude: 让我先了解当前的 API 工具实现...

Claude wants to:
  • Read file: src/utils/api.ts
Allow? [y/n/always/never]

You: y
```

在这个阶段，Claude 会：
- 解析任务意图
- 识别需要的上下文
- 确定执行策略

### 2. 上下文收集阶段

Claude 会收集完成任务所需的所有信息。

```bash
Claude: 我看到当前的实现使用了 fetch。让我检查是否有现有的错误处理...

Claude wants to:
  • Search in files: "error" "retry" "catch"
  • Read file: src/types/api.ts
Allow? [y/n/always/never]

You: always
```

**上下文收集策略**：
- 读取相关文件
- 搜索代码模式
- 检查依赖关系
- 查看测试文件

### 3. 规划阶段

基于收集的信息，Claude 会制定执行计划。

```bash
Claude: 我计划这样实现：

1. 创建一个 retryWithBackoff 工具函数
2. 修改现有的 apiCall 函数以使用重试机制
3. 添加可配置的重试次数和延迟
4. 更新类型定义

这个方案可以吗？

You: 可以，继续
```

**规划模式**：

使用 Plan Mode 可以让 Claude 只规划不执行：

```bash
# 按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 添加用户认证系统

Claude: 让我分析现有架构并制定计划...

Claude wants to:
  • Read file: src/App.tsx
  • Read file: src/routes/index.tsx
  • Search pattern: "auth" "login" "user"
[Plan Mode: 自动允许只读操作]

Claude: 基于代码分析，我建议：

**架构方案**：
1. 创建 AuthContext (src/contexts/AuthContext.tsx)
2. 实现 useAuth hook (src/hooks/useAuth.ts)
3. 添加 ProtectedRoute 组件
4. 创建登录/注册页面
5. 集成到现有路由系统

**需要的依赖**：
- JWT 解码库
- 本地存储管理

**安全考虑**：
- Token 存储策略
- 刷新 token 机制
- CSRF 保护

是否继续实现？

You: 是的
# 按 Shift+Tab 退出 Plan Mode
[底部显示: ⏵ normal mode]
```

### 4. 执行阶段

Claude 开始执行计划中的步骤。

```bash
Claude wants to:
  • Write file: src/utils/retry.ts
  • Edit file: src/utils/api.ts
  • Edit file: src/types/api.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 创建了 retry.ts 工具函数
Claude: ✓ 更新了 api.ts 以使用重试机制
Claude: ✓ 添加了 RetryConfig 类型定义
```

**自动接受模式**：

对于信任的操作，可以启用自动接受：

```bash
# 按 Shift+Tab 切换到 Auto-Accept Mode
[底部显示: ⏵⏵ accept edits on]

You: 为所有组件添加 PropTypes

Claude: 开始处理...
[自动执行，无需确认]

Claude: ✓ Button.tsx - 添加 PropTypes
Claude: ✓ Input.tsx - 添加 PropTypes
Claude: ✓ Modal.tsx - 添加 PropTypes
Claude: ✓ Card.tsx - 添加 PropTypes

完成！已为 4 个组件添加 PropTypes。
```

### 5. 验证阶段

执行后，Claude 会验证结果。

```bash
Claude: 让我验证修改是否正确...

Claude wants to:
  • Run command: npm run type-check
  • Run command: npm run lint
Allow? [y/n/always/never]

You: y

Claude: ✓ 类型检查通过
Claude: ✓ Lint 检查通过

重构完成！API 工具现在支持：
- 自动重试失败的请求
- 指数退避策略
- 可配置的最大重试次数
- 详细的错误日志
```

## Agent Loop 的智能特性

### 自适应规划

Claude 会根据任务复杂度调整策略。

**简单任务**：

```bash
You: 修复 Button.tsx 中的拼写错误

Claude wants to:
  • Read file: src/components/Button.tsx
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/components/Button.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ 修复了 "recieve" → "receive"
```

**复杂任务**：

```bash
You: 实现完整的购物车功能

Claude: 这是一个复杂的功能，让我先分析现有架构...

Claude wants to:
  • Read file: src/App.tsx
  • Read file: src/store/index.ts
  • Search pattern: "product" "cart" "state"
  • List directory: src/components
Allow? [y/n/always/never]

You: always

Claude: 基于分析，我将分步实现：

**第 1 步：状态管理**
Claude wants to:
  • Write file: src/store/cartSlice.ts
  • Edit file: src/store/index.ts
Allow? [y/n/always/never]

You: y

**第 2 步：购物车组件**
Claude wants to:
  • Write file: src/components/Cart/CartItem.tsx
  • Write file: src/components/Cart/CartSummary.tsx
  • Write file: src/components/Cart/index.tsx
Allow? [y/n/always/never]

You: y

**第 3 步：集成到应用**
Claude wants to:
  • Edit file: src/App.tsx
  • Edit file: src/components/Header.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ 购物车功能已完成！

功能包括：
- 添加/移除商品
- 数量调整
- 价格计算
- 持久化存储
```

### 错误恢复

当遇到错误时，Agent Loop 会自动调整策略。

```bash
You: 运行测试

Claude wants to:
  • Run command: npm test
Allow? [y/n/always/never]

You: y

Claude: ✗ 测试失败：找不到模块 '@testing-library/react'

让我检查依赖配置...

Claude wants to:
  • Read file: package.json
Allow? [y/n/always/never]

You: y

Claude: 我发现测试库没有安装。需要安装吗？

You: 是的

Claude wants to:
  • Run command: npm install --save-dev @testing-library/react @testing-library/jest-dom
Allow? [y/n/always/never]

You: y

Claude: ✓ 依赖已安装

Claude wants to:
  • Run command: npm test
Allow? [y/n/always/never]

You: y

Claude: ✓ 所有测试通过！
```

### 上下文记忆

Agent Loop 会记住会话中的信息。

```bash
You: 读取 src/config.ts

Claude wants to:
  • Read file: src/config.ts
Allow? [y/n/always/never]

You: always

Claude: 这是配置文件，包含 API 端点和环境变量。

You: 更新 API 端点为 https://api.example.com

Claude wants to:
  • Edit file: src/config.ts
[记住了之前读取的内容，无需再次读取]
Allow? [y/n/always/never]

You: y

Claude: ✓ 已更新 API 端点
```

## 优化 Agent Loop 性能

### 使用批量操作

```bash
You: 为所有 API 函数添加 JSDoc 注释

Claude wants to:
  • Read file: src/api/users.ts
  • Read file: src/api/products.ts
  • Read file: src/api/orders.ts
Allow? [y/n/always/never]

You: always

Claude wants to:
  • Edit file: src/api/users.ts
  • Edit file: src/api/products.ts
  • Edit file: src/api/orders.ts
[批量编辑，一次确认]
Allow? [y/n/always/never]

You: y

Claude: ✓ 已为 3 个文件添加 JSDoc 注释
```

### 使用 Fast Mode

Fast Mode 使用相同的模型但输出更快。

```bash
You: /fast

[Fast Mode 已启用]

You: 生成 10 个测试用例

Claude: [快速生成]
✓ 已创建 10 个测试用例

测试覆盖：
- 正常流程
- 边界条件
- 错误处理
- 异步操作
```

### 预先授权

对于重复操作，使用 `always` 减少确认次数。

```bash
You: 重构整个 components 目录

Claude wants to:
  • Read directory: src/components
  • Read file: src/components/Button.tsx
  • Read file: src/components/Input.tsx
  • ... (15 more files)
Allow? [y/n/always/never]

You: always
[后续所有读取操作自动允许]

Claude: [快速处理所有文件]
✓ 已重构 17 个组件
```

## Agent Loop 调试

### 查看执行日志

```bash
You: 为什么上次的修改没有生效？

Claude: 让我检查最近的操作...

Claude wants to:
  • Read file: /Users/sixseven/.claude/projects/<hash>/memory/MEMORY.md
Allow? [y/n/always/never]

You: y

Claude: 根据记忆，上次我修改了 src/utils/api.ts，但是：

1. 修改成功完成
2. 但你随后运行了 git reset --hard
3. 所有更改被撤销

需要我重新应用这些修改吗？
```

### 理解决策过程

```bash
You: 为什么你选择使用 Context API 而不是 Redux？

Claude: 基于我的分析：

1. 项目规模：中小型应用（约 20 个组件）
2. 状态复杂度：简单的用户认证状态
3. 现有依赖：已经使用 React 18
4. 团队偏好：package.json 中没有 Redux

Context API 更适合因为：
- 无需额外依赖
- 学习曲线更平缓
- 对于简单状态足够用
- 更容易维护

如果你偏好 Redux，我可以重新实现。
```

## 最佳实践

### 1. 清晰的任务描述

**不好的**：
```bash
You: 修复 bug
```

**好的**：
```bash
You: 修复 src/components/Form.tsx 中提交按钮点击后不触发验证的问题
```

### 2. 适时使用权限模式

- **Normal Mode**：默认，适合重要修改
- **Auto-Accept Mode**：批量操作、重复任务
- **Plan Mode**：探索性分析、架构设计

### 3. 提供上下文

```bash
You: 我们使用 TypeScript strict mode，请确保所有新代码都有完整的类型定义

Claude: 明白，我会确保：
- 所有函数都有返回类型
- 避免使用 any
- 使用严格的 null 检查

You: 添加用户管理功能

Claude wants to:
  • Write file: src/services/userService.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建 userService.ts，包含完整的 TypeScript 类型定义
```

### 4. 利用记忆系统

```bash
You: 记住：我们的 API 基础 URL 是 https://api.example.com

Claude: 已记录到项目记忆中。

You: 创建一个新的 API 调用函数

Claude wants to:
  • Write file: src/api/newEndpoint.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建，使用了记忆中的 API 基础 URL
```

## 高级技巧

### 链式任务

```bash
You: 1. 创建 User 模型
     2. 创建 CRUD API
     3. 添加测试
     4. 更新文档

Claude: 我会按顺序完成这 4 个任务...

**任务 1/4：创建 User 模型**
Claude wants to:
  • Write file: src/models/User.ts
Allow? [y/n/always/never]

You: always

**任务 2/4：创建 CRUD API**
Claude wants to:
  • Write file: src/api/users.ts
[自动允许]

**任务 3/4：添加测试**
Claude wants to:
  • Write file: src/api/users.test.ts
[自动允许]

**任务 4/4：更新文档**
Claude wants to:
  • Edit file: README.md
[自动允许]

Claude: ✓ 所有 4 个任务已完成！
```

### 条件执行

```bash
You: 如果项目使用 TypeScript，添加类型定义；否则添加 JSDoc

Claude: 让我检查项目配置...

Claude wants to:
  • Read file: tsconfig.json
Allow? [y/n/always/never]

You: y

Claude: 检测到 TypeScript 配置，将使用类型定义。

Claude wants to:
  • Write file: src/types/index.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已添加 TypeScript 类型定义
```

### 迭代改进

```bash
You: 优化 src/utils/sort.ts 的性能

Claude wants to:
  • Read file: src/utils/sort.ts
Allow? [y/n/always/never]

You: y

Claude: 当前使用冒泡排序，时间复杂度 O(n²)。我建议改用快速排序。

You: 好的，但保持 API 不变

Claude wants to:
  • Edit file: src/utils/sort.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已优化为快速排序，API 保持不变

You: 添加性能测试

Claude wants to:
  • Write file: src/utils/sort.bench.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已添加性能测试

You: 运行测试看看提升了多少

Claude wants to:
  • Run command: npm run bench
Allow? [y/n/always/never]

You: y

Claude: 性能提升结果：
- 100 个元素：快 15 倍
- 1000 个元素：快 50 倍
- 10000 个元素：快 200 倍
```

## 总结

Agent Loop 是 Claude Code 的智能核心，它通过理解、规划、执行、验证的循环来完成复杂任务。掌握 Agent Loop 的工作原理可以让你：

- 更有效地与 Claude 协作
- 选择合适的权限模式
- 优化工作流程
- 处理复杂的多步骤任务

记住：Claude 是你的编程伙伴，Agent Loop 确保每一步都经过深思熟虑。
