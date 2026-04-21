---
title: "快速入门"
---

# 快速入门

5 分钟快速上手 Claude Code，开始你的 AI 辅助编程之旅。

## 安装

```bash
# 使用 npm 安装
npm install -g @anthropic-ai/claude-code

# 或使用 yarn
yarn global add @anthropic-ai/claude-code

# 验证安装
claude --version
```

## 配置 API Key

```bash
# 首次运行会提示输入 API Key
claude

# 或手动设置环境变量
export ANTHROPIC_API_KEY="your-api-key-here"

# 验证配置
You: /cost

Claude: API Key 已配置
当前余额：$50.00
本月使用：$2.34
```

## 第一个命令

```bash
# 启动 Claude Code
claude

# 简单的问候
You: 你好

Claude: 你好！我是 Claude，你的 AI 编程助手。我可以帮你：
- 编写和修改代码
- 分析项目结构
- 调试问题
- 执行系统命令
- 管理文件

需要什么帮助？

# 查看帮助
You: /help

Claude: 可用命令：
/help - 显示帮助信息
/clear - 清空对话历史
/quit - 退出 Claude Code
/model [opus|sonnet|haiku] - 切换模型
/cost - 查看使用成本
/fast - 快速模式

快捷键：
Shift+Tab - 切换权限模式
Ctrl+C - 中断操作
Ctrl+D - 退出
```

## 创建第一个项目

```bash
You: 创建一个简单的 Express API 项目

Claude: 我会创建一个基础的 Express 项目...

Claude wants to:
  • Write file: package.json
  • Write file: src/index.ts
  • Write file: src/routes/api.ts
  • Write file: tsconfig.json
Allow? [y/n/always/never]

You: y

Claude: 项目创建完成！结构如下：

my-api/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    └── routes/
        └── api.ts

下一步：
1. npm install - 安装依赖
2. npm run dev - 启动开发服务器
3. 访问 http://localhost:3000

需要我添加更多功能吗？
```

## 读取和修改文件

```bash
You: 读取 src/index.ts 并添加 CORS 支持

Claude: 让我先读取文件...

Claude wants to:
  • Read file: src/index.ts
Allow? [y/n/always/never]

You: y

Claude: 我看到了当前的代码。现在添加 CORS...

Claude wants to:
  • Edit file: src/index.ts
  • Run command: npm install cors @types/cors
Allow? [y/n/always/never]

You: y

Claude: 已添加 CORS 支持：

```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
```

CORS 已配置完成，支持跨域请求。
```

## 权限模式

```bash
# Normal Mode（默认）- 每次操作都需要确认
You: 创建三个新组件

Claude wants to:
  • Write file: src/components/Header.tsx
Allow? [y/n/always/never]

You: always  # 对这类操作总是允许

Claude: [继续创建其他组件，无需再次确认写入操作]

# 按 Shift+Tab 切换到 Auto-Accept Mode
[底部显示: ⏵⏵ accept edits on]

You: 添加样式文件

Claude: [自动执行，无需确认]
已创建：
- src/styles/header.css
- src/styles/footer.css
- src/styles/main.css

# 再按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 重构组件结构

Claude: 重构计划：

1. 创建 components/common 目录
2. 移动通用组件到 common
3. 更新所有导入路径
4. 添加 index.ts 导出文件

是否执行此计划？

You: y

[切换回 Normal Mode 执行]
```

## 切换模型

```bash
# 查看当前模型
You: /model

Claude: 当前使用：Sonnet 4.6
可用模型：
- opus - 最强推理能力，适合复杂任务
- sonnet - 平衡性能和成本（当前）
- haiku - 快速响应，适合简单任务

# 切换到 Opus
You: /model opus

Claude: 已切换到 Opus 4.6
这个模型提供最强的推理能力，适合：
- 复杂的架构设计
- 深度代码分析
- 安全审计
- 性能优化

# 切换到快速模式
You: /fast

Claude: 已启用快速模式
使用相同的 Opus 4.6 模型，但输出更快
适合快速迭代和简单任务
```

## Git 集成

```bash
You: 检查 Git 状态并创建提交

Claude: 让我检查 Git 状态...

Claude wants to:
  • Run command: git status
Allow? [y/n/always/never]

You: y

Claude: 发现以下更改：
- src/components/Header.tsx (新增)
- src/components/Footer.tsx (新增)
- src/styles/main.css (修改)

Claude wants to:
  • Run command: git add .
  • Run command: git commit -m "feat: add Header and Footer components"
Allow? [y/n/always/never]

You: y

Claude: 提交已创建：
feat: add Header and Footer components

需要推送到远程仓库吗？
```

## 调试代码

```bash
You: 这个函数报错了，帮我找出问题

Claude: 让我看看代码...

Claude wants to:
  • Read file: src/utils/parser.ts
Allow? [y/n/always/never]

You: y

Claude: 找到问题了！

第 23 行：
```typescript
const result = JSON.parse(data);
```

问题：没有错误处理，如果 data 不是有效 JSON 会崩溃

修复建议：
```typescript
try {
  const result = JSON.parse(data);
  return result;
} catch (error) {
  console.error('JSON parse error:', error);
  return null;
}
```

是否应用此修复？

You: y

Claude: 已修复！添加了错误处理，现在更安全了。
```

## 运行测试

```bash
You: 运行测试并修复失败的用例

Claude: 让我运行测试...

Claude wants to:
  • Run command: npm test
Allow? [y/n/always/never]

You: y

Claude: 测试结果：
✓ 15 passed
✗ 2 failed

失败的测试：
1. UserService.createUser - 预期返回用户对象
2. AuthMiddleware.verify - JWT 验证失败

让我检查这些测试...

Claude wants to:
  • Read file: tests/UserService.test.ts
  • Read file: tests/AuthMiddleware.test.ts
Allow? [y/n/always/never]

You: y

Claude: 问题分析：

测试 1：createUser 返回了 undefined
原因：忘记 return 语句

测试 2：JWT 验证使用了错误的密钥
原因：测试环境变量未设置

是否修复这些问题？

You: y

Claude: 已修复所有问题！重新运行测试...

✓ 17 passed
✗ 0 failed

所有测试通过！
```

## 项目分析

```bash
You: 分析这个项目的结构

Claude: 让我扫描项目...

Claude wants to:
  • Run command: find . -type f -name "*.ts" -o -name "*.tsx" | head -50
  • Read file: package.json
  • Read file: tsconfig.json
Allow? [y/n/always/never]

You: y

Claude: 项目分析报告：

项目类型：React + TypeScript + Express
文件统计：
- TypeScript 文件：45
- React 组件：23
- 测试文件：18
- 配置文件：5

目录结构：
src/
├── client/          # React 前端
│   ├── components/  # 23 个组件
│   ├── hooks/       # 5 个自定义 hooks
│   └── pages/       # 8 个页面
├── server/          # Express 后端
│   ├── routes/      # 12 个路由
│   ├── models/      # 6 个数据模型
│   └── middleware/  # 4 个中间件
└── shared/          # 共享代码
    └── types/       # 类型定义

依赖分析：
- React 18.2.0
- Express 4.18.2
- TypeScript 5.0.4

建议：
1. 考虑添加 ESLint 配置
2. 缺少 README 文档
3. 建议添加 CI/CD 配置
```

## 查看成本

```bash
You: /cost

Claude: 使用统计：

本次会话：
- 输入 tokens：1,234
- 输出 tokens：2,456
- 成本：$0.08

今日总计：
- 请求次数：45
- 总成本：$1.23

本月总计：
- 请求次数：892
- 总成本：$18.45

当前余额：$31.55
```

## 退出

```bash
# 方式 1：使用命令
You: /quit

Claude: 再见！本次会话成本：$0.08

# 方式 2：使用快捷键
Ctrl+D

# 方式 3：清空后退出
You: /clear
You: /quit
```

## 常见问题

```bash
# Q: 如何撤销操作？
You: 撤销上一次的更改

Claude: 我会恢复文件...

Claude wants to:
  • Run command: git checkout -- src/App.tsx
Allow? [y/n/always/never]

# Q: 如何查看历史？
You: 显示我们的对话历史

Claude: 本次会话历史：
1. 创建 Express 项目
2. 添加 CORS 支持
3. 创建三个组件
4. 运行测试
5. 分析项目结构

# Q: 如何保存会话？
You: 保存这次对话

Claude: 对话已自动保存到：
~/.claude/sessions/2026-04-16-session.json

你可以稍后使用 /load 命令恢复
```

## 下一步

现在你已经掌握了基础用法，可以：

1. 查看[实用技巧](/docs/claude-code/practical/prompt-tips)学习更多提示词技巧
2. 了解[工作流程](/docs/claude-code/workflow/code-review)优化开发流程
3. 探索[高级功能](/docs/claude-code/advanced/agent-loop)深入使用

开始你的 AI 辅助编程之旅吧！
