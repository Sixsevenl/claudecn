---
title: "团队规则库"
---

# 团队规则库

团队规则库允许你为整个团队定义统一的编码标准、最佳实践和工作流程。Claude Code 会自动遵循这些规则，确保代码一致性。

## 规则文件位置

Claude Code 会按优先级顺序查找规则文件：

1. **项目级规则**：`.claude/rules.md`
2. **全局规则**：`~/.claude/global-rules.md`
3. **团队共享规则**：通过 Git 仓库共享

## 创建团队规则

### 基础规则文件

```bash
You: 创建团队规则文件

Claude wants to:
  • Write file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude: 已创建规则文件模板。你可以编辑它来定义团队标准。
```

**规则文件示例**：

```markdown
# 团队编码规则

## TypeScript 规范

- 使用 strict mode
- 所有函数必须有返回类型
- 禁止使用 `any`，使用 `unknown` 代替
- 使用 `interface` 而不是 `type` 定义对象类型

## 命名约定

- 组件文件：PascalCase (Button.tsx)
- 工具函数：camelCase (formatDate.ts)
- 常量：UPPER_SNAKE_CASE
- 私有方法：前缀 `_` (_handleClick)

## 文件结构

```
src/
  components/     # React 组件
  hooks/          # 自定义 Hooks
  utils/          # 工具函数
  types/          # TypeScript 类型
  api/            # API 调用
  store/          # 状态管理
```

## 代码风格

- 使用 2 空格缩进
- 单引号优于双引号
- 行尾不加分号
- 最大行长度 100 字符

## 测试要求

- 所有公共 API 必须有单元测试
- 测试文件命名：`*.test.ts` 或 `*.spec.ts`
- 测试覆盖率目标：80%

## Git 提交规范

- 使用 Conventional Commits
- 格式：`type(scope): message`
- 类型：feat, fix, docs, style, refactor, test, chore
```

### Claude 自动遵循规则

```bash
You: 创建一个新的 Button 组件

Claude: 让我检查团队规则...

Claude wants to:
  • Read file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude: 根据团队规则，我会：
- 使用 TypeScript strict mode
- 使用 PascalCase 命名
- 添加完整的类型定义
- 创建对应的测试文件

Claude wants to:
  • Write file: src/components/Button.tsx
  • Write file: src/components/Button.test.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建 Button 组件，符合团队规范：
- 使用 interface 定义 Props
- 所有函数有返回类型
- 包含单元测试
- 使用 2 空格缩进
```

## 规则类型

### 1. 代码风格规则

```markdown
## 代码风格

### React 组件

- 使用函数组件，不使用类组件
- 使用 Hooks 管理状态
- Props 解构在函数参数中
- 导出组件使用 named export

### 示例

```typescript
// ✓ 正确
export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

// ✗ 错误
export default class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>
  }
}
```
```

**Claude 应用规则**：

```bash
You: 创建 Modal 组件

Claude wants to:
  • Read file: .claude/rules.md
  • Write file: src/components/Modal.tsx
Allow? [y/n/always/never]

You: always

Claude: ✓ 已创建 Modal 组件
- 使用函数组件 ✓
- Props 解构 ✓
- Named export ✓
- TypeScript 类型 ✓
```

### 2. 架构规则

```markdown
## 架构规则

### 状态管理

- 使用 Zustand 进行全局状态管理
- 本地状态使用 useState
- 服务器状态使用 React Query

### API 调用

- 所有 API 调用必须通过 `src/api/` 目录
- 使用统一的错误处理
- 实现请求重试机制

### 路由

- 使用 React Router v6
- 路由定义在 `src/routes/index.tsx`
- 使用懒加载优化性能
```

**Claude 应用规则**：

```bash
You: 添加用户列表功能

Claude: 根据架构规则，我会：
1. 在 src/api/ 创建 API 调用
2. 使用 React Query 管理服务器状态
3. 创建懒加载的路由

Claude wants to:
  • Write file: src/api/users.ts
  • Write file: src/pages/UserList.tsx
  • Edit file: src/routes/index.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ 已实现用户列表功能
- API 调用在 src/api/users.ts ✓
- 使用 React Query ✓
- 路由懒加载 ✓
```

### 3. 安全规则

```markdown
## 安全规则

### 敏感信息

- 禁止在代码中硬编码 API 密钥
- 使用环境变量存储配置
- 不提交 .env 文件到 Git

### 输入验证

- 所有用户输入必须验证
- 使用 Zod 进行运行时类型检查
- 防止 XSS 攻击

### 认证

- 使用 JWT 进行身份验证
- Token 存储在 httpOnly cookie
- 实现 CSRF 保护
```

**Claude 应用规则**：

```bash
You: 创建登录表单

Claude: 根据安全规则，我会：
- 使用 Zod 验证输入
- 不在代码中硬编码 API 端点
- 实现 CSRF 保护

Claude wants to:
  • Read file: .env.example
  • Write file: src/components/LoginForm.tsx
  • Write file: src/schemas/auth.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建登录表单
- Zod 输入验证 ✓
- 使用环境变量 ✓
- CSRF token 处理 ✓

注意：请确保在 .env 文件中设置 API_URL
```

### 4. 测试规则

```markdown
## 测试规则

### 单元测试

- 使用 Vitest 作为测试框架
- 测试文件与源文件同目录
- 命名格式：`ComponentName.test.tsx`

### 测试覆盖

- 所有 API 函数：100% 覆盖
- React 组件：至少 80% 覆盖
- 工具函数：100% 覆盖

### 测试内容

- 正常流程
- 边界条件
- 错误处理
- 异步操作
```

**Claude 应用规则**：

```bash
You: 创建 formatDate 工具函数

Claude: 根据测试规则，工具函数需要 100% 测试覆盖。

Claude wants to:
  • Write file: src/utils/formatDate.ts
  • Write file: src/utils/formatDate.test.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建 formatDate 函数和测试

测试覆盖：
- 正常日期格式化 ✓
- 无效日期处理 ✓
- 边界条件（null, undefined） ✓
- 不同时区 ✓

You: 运行测试

Claude wants to:
  • Run command: npm test formatDate
Allow? [y/n/always/never]

You: y

Claude: ✓ 所有测试通过
覆盖率：100%
```

### 5. 文档规则

```markdown
## 文档规则

### 代码注释

- 公共 API 必须有 JSDoc 注释
- 复杂逻辑添加行内注释
- 使用 TODO 标记待办事项

### README

- 每个主要目录包含 README.md
- 说明目录用途和使用方法
- 包含示例代码

### 变更日志

- 使用 CHANGELOG.md 记录变更
- 遵循 Keep a Changelog 格式
```

**Claude 应用规则**：

```bash
You: 创建 API 客户端

Claude: 根据文档规则，我会添加 JSDoc 注释和 README。

Claude wants to:
  • Write file: src/api/client.ts
  • Write file: src/api/README.md
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建 API 客户端
- 完整的 JSDoc 注释 ✓
- README 包含使用示例 ✓
- 类型定义完整 ✓
```

## 共享团队规则

### 通过 Git 共享

```bash
# 1. 创建规则文件
You: 创建团队规则

Claude wants to:
  • Write file: .claude/rules.md
Allow? [y/n/always/never]

You: y

# 2. 提交到 Git
You: 提交规则文件

Claude wants to:
  • Run command: git add .claude/rules.md
  • Run command: git commit -m "docs: add team coding rules"
Allow? [y/n/always/never]

You: y

Claude: ✓ 规则文件已提交

# 3. 团队成员拉取
You: 拉取最新代码

Claude wants to:
  • Run command: git pull
Allow? [y/n/always/never]

You: y

Claude: ✓ 已拉取最新规则
团队规则已更新，我会遵循新的规范。
```

### 全局规则

对于跨项目的通用规则，使用全局规则文件：

```bash
You: 创建全局规则

Claude wants to:
  • Write file: /Users/sixseven/.claude/global-rules.md
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建全局规则文件

这些规则会应用到所有项目，除非项目有自己的规则覆盖。
```

**全局规则示例**：

```markdown
# 全局编码规则

## 通用原则

- 代码可读性优先于简洁性
- 避免过早优化
- 遵循 DRY 原则
- 使用有意义的变量名

## Git 规范

- 提交前运行测试
- 使用有意义的提交信息
- 小步提交，频繁推送

## 代码审查

- 所有代码必须经过审查
- 审查者检查：逻辑、测试、文档
- 使用建设性的反馈语言
```

## 规则优先级

当多个规则文件存在时，优先级为：

1. **项目规则** (`.claude/rules.md`) - 最高优先级
2. **全局规则** (`~/.claude/global-rules.md`)
3. **默认规则** (Claude 内置)

```bash
You: 创建组件时使用什么命名？

Claude: 让我检查规则优先级...

Claude wants to:
  • Read file: .claude/rules.md
  • Read file: /Users/sixseven/.claude/global-rules.md
Allow? [y/n/always/never]

You: y

Claude: 根据规则优先级：

1. 项目规则：使用 PascalCase，文件名与组件名一致
2. 全局规则：使用有意义的名称

应用项目规则：组件使用 PascalCase 命名。
```

## 规则验证

### 自动检查规则遵循情况

```bash
You: 检查代码是否符合团队规则

Claude: 让我分析代码库...

Claude wants to:
  • Read file: .claude/rules.md
  • Search pattern: "class.*extends React.Component"
  • List files: src/components/*.tsx
Allow? [y/n/always/never]

You: always

Claude: 规则检查结果：

✓ 通过的规则：
- 所有组件使用 PascalCase
- 使用 TypeScript strict mode
- 测试文件命名正确

✗ 违反的规则：
- src/components/OldButton.tsx 使用类组件（应使用函数组件）
- src/utils/api.ts 缺少 JSDoc 注释

需要我修复这些问题吗？

You: 是的

Claude wants to:
  • Edit file: src/components/OldButton.tsx
  • Edit file: src/utils/api.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已修复所有规则违反
- OldButton 转换为函数组件 ✓
- api.ts 添加 JSDoc 注释 ✓
```

## 规则模板

### React 项目规则模板

```markdown
# React 项目规则

## 技术栈

- React 18+
- TypeScript 5+
- Vite
- React Router v6
- Zustand (状态管理)
- React Query (服务器状态)
- Tailwind CSS (样式)

## 组件规范

- 使用函数组件
- Props 使用 interface 定义
- 导出使用 named export
- 一个文件一个组件

## Hooks 规范

- 自定义 Hooks 以 `use` 开头
- Hooks 文件放在 `src/hooks/`
- 包含使用示例和测试

## 样式规范

- 使用 Tailwind CSS 类
- 避免内联样式
- 复杂样式使用 CSS Modules

## 性能优化

- 使用 React.memo 优化重渲染
- 大列表使用虚拟滚动
- 路由懒加载
- 图片懒加载
```

### Node.js API 规则模板

```markdown
# Node.js API 规则

## 技术栈

- Node.js 20+
- Express.js
- TypeScript
- Prisma (ORM)
- Jest (测试)

## API 设计

- RESTful 风格
- 使用 HTTP 状态码
- 统一的错误响应格式
- API 版本控制 (/api/v1/)

## 错误处理

- 使用自定义错误类
- 全局错误处理中间件
- 详细的错误日志

## 安全

- 使用 helmet 中间件
- 实现速率限制
- 输入验证和清理
- SQL 注入防护

## 数据库

- 使用 Prisma 迁移
- 事务处理关键操作
- 索引优化查询
- 定期备份
```

## 动态规则更新

```bash
You: 更新团队规则：从现在开始使用 Biome 代替 ESLint

Claude wants to:
  • Read file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude: ✓ 已更新团队规则
- 添加了 Biome 配置要求
- 更新了代码检查命令

从现在开始，我会使用 Biome 进行代码检查。

You: 设置 Biome

Claude wants to:
  • Run command: npm install --save-dev @biomejs/biome
  • Write file: biome.json
Allow? [y/n/always/never]

You: y

Claude: ✓ Biome 已配置
- 安装了依赖
- 创建了配置文件
- 符合团队规则
```

## 规则冲突处理

```bash
You: 创建一个使用 any 类型的函数

Claude: 这与团队规则冲突：

团队规则要求：
- 禁止使用 `any`
- 使用 `unknown` 代替

你想要：
1. 遵循团队规则（使用 unknown）
2. 覆盖规则（使用 any）

请选择：

You: 1

Claude wants to:
  • Write file: src/utils/helper.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ 已创建函数，使用 unknown 类型
符合团队规则 ✓
```

## 最佳实践

### 1. 规则要具体

**不好的**：
```markdown
- 写好代码
- 注意性能
```

**好的**：
```markdown
- 函数最大行数：50 行
- 使用 React.memo 优化列表组件
- API 响应时间 < 200ms
```

### 2. 提供示例

```markdown
## 错误处理

### 正确示例

```typescript
try {
  const data = await fetchUser(id)
  return data
} catch (error) {
  if (error instanceof ApiError) {
    logger.error('API Error:', error.message)
    throw new UserNotFoundError(id)
  }
  throw error
}
```

### 错误示例

```typescript
try {
  const data = await fetchUser(id)
  return data
} catch (error) {
  console.log(error) // 不要使用 console.log
  return null // 不要吞掉错误
}
```
```

### 3. 定期审查规则

```bash
You: 审查团队规则，看是否需要更新

Claude wants to:
  • Read file: .claude/rules.md
  • Search pattern: "TODO" "FIXME" "deprecated"
Allow? [y/n/always/never]

You: y

Claude: 规则审查结果：

建议更新：
1. React 18 已稳定，可以移除 "实验性" 标记
2. 添加 React Server Components 规范
3. 更新测试库版本要求

需要我更新这些内容吗？
```

### 4. 规则文档化

```bash
You: 为新成员生成规则说明文档

Claude wants to:
  • Read file: .claude/rules.md
  • Write file: docs/CODING_STANDARDS.md
Allow? [y/n/always/never]

You: y

Claude: ✓ 已生成规则说明文档

包含：
- 规则概述
- 详细说明
- 代码示例
- 常见问题
- 工具配置
```

## 总结

团队规则库是确保代码一致性的关键工具。通过定义清晰的规则，Claude Code 可以：

- 自动遵循团队标准
- 减少代码审查时间
- 提高代码质量
- 加速新成员上手

记住：好的规则是具体的、可执行的、有示例的。
