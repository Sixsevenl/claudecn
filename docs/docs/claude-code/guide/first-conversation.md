---
title: "第一次对话"
---

# 第一次对话

学会如何与 Claude Code 有效沟通，是高效使用它的关键。本指南将教你如何描述任务、提供上下文、引导 Claude 完成工作。

## 启动 Claude Code

```bash
# 在项目目录中启动
cd /path/to/your/project
claude

# 或指定项目路径
claude /path/to/project
```

启动后你会看到：

```
Claude Code v2.1.0
Working directory: /Users/you/project
Model: claude-sonnet-4-6

You:
```

## 有效的提示词模式

### 1. 明确具体的任务

❌ **不好的提示**：
```
帮我改一下代码
```

✅ **好的提示**：
```
在 src/components/Button.tsx 中，将 onClick 事件改为支持异步函数，
并在执行期间显示 loading 状态
```

### 2. 提供必要的上下文

❌ **不好的提示**：
```
这个 bug 怎么修？
```

✅ **好的提示**：
```
用户点击登录按钮后，控制台报错 "Cannot read property 'token' of undefined"。
错误发生在 src/auth/login.ts 的第 45 行。请帮我分析并修复这个问题。
```

### 3. 说明期望的结果

❌ **不好的提示**：
```
优化这个函数
```

✅ **好的提示**：
```
优化 utils/dataProcessor.ts 中的 processLargeDataset 函数，
目标是将处理 10000 条数据的时间从 5 秒降低到 1 秒以内
```

## 常见任务模式

### 代码生成

```
You: 创建一个 React 组件 UserCard，显示用户头像、名字和邮箱。
使用 TypeScript 和 TailwindCSS。

Claude: 我来创建这个组件...
[自动创建 src/components/UserCard.tsx]
```

**提示技巧**：
- 说明使用的技术栈
- 描述组件的 props
- 说明样式要求

### 代码修改

```
You: 在 App.tsx 中添加路由，使用 React Router v6。
需要三个路由：首页 /、关于页 /about、用户页 /users/:id

Claude: 我先读取 App.tsx 看看现有结构...
[读取文件，然后修改]
```

**提示技巧**：
- 指定要修改的文件
- 说明具体的修改点
- 提供必要的参数或配置

### Bug 修复

```
You: 运行 npm test 后，UserService.test.ts 的第 3 个测试失败了。
错误信息是 "Expected 200 but got 404"。请帮我调试并修复。

Claude: 让我先运行测试看看具体情况...
[运行测试，分析错误，修复代码]
```

**提示技巧**：
- 提供错误信息
- 说明复现步骤
- 指出可能相关的文件

### 代码重构

```
You: 重构 src/services/ 目录下的所有 API 调用，
统一使用 axios 实例，添加错误处理和重试逻辑

Claude: 我先分析现有的 API 调用模式...
[读取多个文件，制定重构计划，逐步执行]
```

**提示技巧**：
- 说明重构的范围
- 描述目标架构
- 指出需要保持的行为

### 代码解释

```
You: 解释 utils/encryption.ts 中的 encryptData 函数是如何工作的

Claude: 让我读取这个文件...
[读取文件，给出详细解释]
```

**提示技巧**：
- 指定要解释的文件或函数
- 说明你想了解的深度
- 提出具体的疑问点

## 上下文管理技巧

### 使用 CLAUDE.md

在项目根目录创建 `CLAUDE.md`，Claude 会自动读取：

```markdown
# 项目说明

这是一个电商网站的后端 API。

## 技术栈
- Node.js + Express
- PostgreSQL
- Redis（缓存）
- JWT（认证）

## 项目结构
- src/routes/ - API 路由
- src/controllers/ - 业务逻辑
- src/models/ - 数据模型
- src/middleware/ - 中间件

## 代码规范
- 使用 async/await，不用 Promise.then
- 所有 API 返回统一格式：{ success, data, error }
- 错误使用自定义 Error 类

## 数据库
- 主数据库：PostgreSQL
- 缓存：Redis
- 连接池大小：20

## 注意事项
- 不要修改 src/legacy/ 目录（旧代码，计划重写）
- API 密钥存储在 .env 文件
- 所有数据库操作必须使用事务
```

### 引用文件

```
You: 参考 src/components/Button.tsx 的样式，
创建一个类似的 Input 组件

Claude: 让我先读取 Button.tsx...
[读取参考文件，创建新组件]
```

### 多文件任务

```
You: 实现用户认证功能：
1. 在 routes/auth.ts 中添加登录和注册路由
2. 在 controllers/authController.ts 中实现业务逻辑
3. 在 middleware/auth.ts 中添加 JWT 验证中间件
4. 更新 app.ts 注册新路由

Claude: 这是一个多文件任务，让我逐步完成...
[按顺序创建/修改文件]
```

## 使用内置命令

### 模型切换

```bash
/model opus     # 切换到最强大的 Opus（复杂任务）
/model sonnet   # 切换到 Sonnet（默认，平衡）
/model haiku    # 切换到 Haiku（简单任务，更快）
```

### 查看成本

```bash
/cost           # 查看当前会话的 API 使用成本
```

### 清空历史

```bash
/clear          # 清空对话历史（但保留项目上下文）
```

### 帮助

```bash
/help           # 查看所有可用命令
```

## Agent 模式

让 Claude 自主完成复杂任务：

```
You: /agent 实现完整的用户认证系统，包括：
- 注册（邮箱验证）
- 登录（JWT）
- 密码重置
- 权限管理
- 单元测试

Claude: 我会自主完成这个任务。让我先制定计划...

[计划]
1. 创建数据库模型
2. 实现注册功能
3. 实现登录功能
4. 实现密码重置
5. 添加权限中间件
6. 编写测试

开始执行...
[自动完成所有步骤]
```

## 计划模式

先制定计划，确认后再执行：

```
You: /plan 重构整个数据库层，使用 TypeORM 替换原生 SQL

Claude: 让我先分析现有代码，制定重构计划...

[显示详细计划]

You: 看起来不错，开始执行

Claude: 开始执行重构...
[按计划执行]
```

## 权限确认

默认情况下，Claude 会在执行操作前询问：

```
Claude wants to:
  • Read file: src/config/database.ts
  • Write file: src/models/User.ts
  • Run command: npm install typeorm

Allow? [y/n/always/never]
```

选项说明：
- `y` - 允许这次
- `n` - 拒绝这次
- `always` - 总是允许（当前会话）
- `never` - 总是拒绝（当前会话）

## 常见问题处理

### Claude 理解错了我的意图

```
You: 不对，我是想让你修改现有的 Button 组件，
而不是创建新的。请修改 src/components/Button.tsx

Claude: 明白了，我来修改现有的 Button 组件...
```

### Claude 需要更多信息

```
Claude: 我需要知道：
1. 用户数据应该存储在哪个数据库表？
2. 密码加密使用什么算法？
3. JWT 的过期时间是多久？

You: 1. users 表
2. bcrypt
3. 24 小时
```

### 任务太复杂

```
You: 这个任务比较复杂，请先给我一个实现方案，
我确认后你再开始写代码

Claude: 好的，让我先分析需求并制定方案...
[给出详细方案]
```

## 高效沟通的原则

### 1. 渐进式任务

将大任务分解为小步骤：

```
You: 先创建用户模型
Claude: [创建模型]

You: 现在添加注册接口
Claude: [添加接口]

You: 添加邮箱验证
Claude: [添加验证]
```

### 2. 及时反馈

发现问题立即指出：

```
Claude: 我已经添加了登录功能...

You: 等等，我看到你使用了明文存储密码，
这不安全。请改用 bcrypt 加密

Claude: 你说得对，我来修复这个安全问题...
```

### 3. 提供示例

用示例说明期望：

```
You: 创建一个 API 响应格式化函数，
成功时返回：{ success: true, data: {...} }
失败时返回：{ success: false, error: "错误信息" }

Claude: 明白了，我来创建这个函数...
```

### 4. 说明约束

明确限制条件：

```
You: 优化这个查询，但不要修改数据库结构，
也不要添加新的索引

Claude: 好的，我只优化查询语句本身...
```

## 下一步

- [入门指南](/docs/claude-code/getting-started/) - 学习常用功能
- [上下文管理](/docs/claude-code/workflow/context-management) - 深入了解上下文
- [高效实践](/docs/claude-code/workflow/best-practices) - 提高工作效率
- [提示词技巧](/docs/claude-code/practical/prompt-tips) - 更多提示词技巧

## 提示词模板

### 功能开发

```
在 [文件路径] 中实现 [功能描述]。
要求：
- [要求1]
- [要求2]
- [要求3]
使用 [技术栈]。
```

### Bug 修复

```
[文件路径] 的 [函数/组件] 有问题：
- 现象：[问题描述]
- 错误信息：[错误内容]
- 复现步骤：[步骤]
请分析并修复。
```

### 代码审查

```
审查 [文件路径] 的代码，重点关注：
- 性能问题
- 安全漏洞
- 代码规范
- 潜在 bug
给出改进建议。
```

### 重构

```
重构 [目录/文件]：
- 目标：[重构目标]
- 保持：[需要保持的行为]
- 改进：[需要改进的点]
```
