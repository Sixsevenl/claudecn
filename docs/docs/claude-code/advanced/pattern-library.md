---
title: "模式库：Skills 沉淀"
---

# 模式库：Skills 沉淀

模式库是团队积累的 Skills 和最佳实践集合。通过沉淀常见场景的解决方案，团队可以快速复用经验，提升整体效率。

## 什么是模式库

模式库包含：

- **Skills 模板**：可复用的任务模板
- **工作流模式**：常见工作流程
- **最佳实践**：经过验证的方法
- **反模式**：应该避免的做法

## 代码生成模式

### 1. CRUD 生成器

`.claude/patterns/crud-generator.md`：

```markdown
---
name: crud-gen
description: 生成完整的 CRUD 功能
args:
  - name: entity
    description: 实体名称
    required: true
  - name: fields
    description: 字段定义（JSON）
    required: true
---

# CRUD 生成器

为指定实体生成完整的 CRUD 功能。

## 生成内容

1. **数据模型**
   - TypeScript 接口
   - 数据库 Schema
   - 验证规则

2. **后端 API**
   - GET /api/{entity} - 列表
   - GET /api/{entity}/:id - 详情
   - POST /api/{entity} - 创建
   - PUT /api/{entity}/:id - 更新
   - DELETE /api/{entity}/:id - 删除

3. **前端组件**
   - 列表页面
   - 详情页面
   - 创建/编辑表单

4. **测试**
   - API 测试
   - 组件测试

## 使用示例

```bash
claude /crud-gen user '{"name":"string","email":"string","age":"number"}'
```

## 生成的文件

- `src/models/{entity}.ts`
- `src/api/{entity}.ts`
- `src/components/{Entity}List.tsx`
- `src/components/{Entity}Form.tsx`
- `tests/api/{entity}.test.ts`
```

### 2. API 端点生成器

`.claude/patterns/api-endpoint.md`：

```markdown
---
name: api-endpoint
description: 生成 RESTful API 端点
args:
  - name: resource
    description: 资源名称
    required: true
  - name: method
    description: HTTP 方法
    choices: [GET, POST, PUT, DELETE, PATCH]
    required: true
---

# API 端点生成器

生成符合 RESTful 规范的 API 端点。

## 生成内容

1. **路由处理器**
   - 参数验证
   - 业务逻辑
   - 错误处理
   - 响应格式化

2. **请求/响应类型**
   - TypeScript 接口
   - 验证 Schema

3. **API 文档**
   - OpenAPI 规范
   - 使用示例

4. **测试**
   - 单元测试
   - 集成测试

## 模板

```typescript
/**
 * {{Method}} {{Path}}
 * @description {{Description}}
 */
export async function {{handlerName}}(
  req: Request,
  res: Response
) {
  try {
    // 验证
    const validated = validate{{Resource}}Input(req.body);

    // 业务逻辑
    const result = await {{service}}.{{method}}(validated);

    // 响应
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
}
```
```

### 3. React 组件生成器

`.claude/patterns/react-component.md`：

```markdown
---
name: react-component
description: 生成 React 组件
args:
  - name: name
    description: 组件名称
    required: true
  - name: type
    description: 组件类型
    choices: [functional, class, hook]
    default: functional
---

# React 组件生成器

生成符合团队规范的 React 组件。

## 组件结构

```typescript
// 1. 导入
import React from 'react';
import styles from './{{Name}}.module.css';

// 2. 类型定义
interface I{{Name}}Props {
  // Props
}

// 3. 组件
export function {{Name}}(props: I{{Name}}Props) {
  // Hooks

  // 事件处理

  // 渲染
  return (
    <div className={styles.container}>
      {/* 内容 */}
    </div>
  );
}
```

## 同时生成

- 组件文件：`{{Name}}.tsx`
- 样式文件：`{{Name}}.module.css`
- 测试文件：`{{Name}}.test.tsx`
- Storybook：`{{Name}}.stories.tsx`
```

## 测试模式

### 1. 测试套件生成器

`.claude/patterns/test-suite.md`：

```markdown
---
name: test-suite
description: 生成完整的测试套件
args:
  - name: target
    description: 测试目标
    required: true
---

# 测试套件生成器

为指定代码生成全面的测试套件。

## 测试类型

1. **单元测试**
   - 函数级测试
   - 边界条件
   - 错误处理

2. **集成测试**
   - 模块交互
   - API 调用
   - 数据库操作

3. **E2E 测试**
   - 用户流程
   - 关键路径

## 测试结构

```typescript
describe('{{Module}}', () => {
  // 设置
  beforeEach(() => {});
  afterEach(() => {});

  // 功能测试
  describe('{{Feature}}', () => {
    it('should work in normal case', () => {});
    it('should handle edge cases', () => {});
    it('should handle errors', () => {});
  });
});
```

## 覆盖率目标

- 语句覆盖率：80%+
- 分支覆盖率：75%+
- 函数覆盖率：90%+
```

### 2. Mock 数据生成器

`.claude/patterns/mock-data.md`：

```markdown
---
name: mock-data
description: 生成测试用 Mock 数据
args:
  - name: schema
    description: 数据 Schema
    required: true
  - name: count
    description: 生成数量
    default: 10
---

# Mock 数据生成器

根据 Schema 生成测试用 Mock 数据。

## 支持的类型

- string: 随机字符串
- number: 随机数字
- boolean: 随机布尔值
- date: 随机日期
- email: 随机邮箱
- url: 随机 URL
- uuid: UUID

## 示例

```typescript
// Schema
interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

// 生成的 Mock 数据
export const mockUsers: IUser[] = [
  {
    id: 'uuid-1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    createdAt: new Date('2024-01-01')
  },
  // ... 更多数据
];
```
```

## 重构模式

### 1. 提取函数

`.claude/patterns/extract-function.md`：

```markdown
---
name: extract-function
description: 提取函数重构
args:
  - name: file
    description: 目标文件
    required: true
  - name: selection
    description: 要提取的代码范围
    required: false
---

# 提取函数重构

将代码片段提取为独立函数。

## 重构步骤

1. 识别可提取的代码块
2. 分析依赖和参数
3. 生成函数签名
4. 提取代码
5. 替换原代码为函数调用
6. 运行测试验证

## 提取原则

- 函数职责单一
- 参数不超过 3 个
- 函数名清晰描述功能
- 避免副作用

## 示例

```typescript
// 重构前
function processUser(user: User) {
  // 验证邮箱
  if (!user.email.includes('@')) {
    throw new Error('Invalid email');
  }

  // 格式化名称
  const formattedName = user.name.trim().toLowerCase();

  // 保存
  await db.save({ ...user, name: formattedName });
}

// 重构后
function processUser(user: User) {
  validateEmail(user.email);
  const formattedName = formatName(user.name);
  await saveUser({ ...user, name: formattedName });
}

function validateEmail(email: string) {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
}

function formatName(name: string): string {
  return name.trim().toLowerCase();
}

function saveUser(user: User) {
  return db.save(user);
}
```
```

### 2. 提取组件

`.claude/patterns/extract-component.md`：

```markdown
---
name: extract-component
description: 提取 React 组件
args:
  - name: file
    description: 目标文件
    required: true
---

# 提取组件重构

将 JSX 片段提取为独立组件。

## 提取时机

- JSX 超过 50 行
- 逻辑可复用
- 职责独立
- 提升可读性

## 重构步骤

1. 识别可提取的 JSX
2. 分析 Props 需求
3. 创建新组件文件
4. 移动代码和样式
5. 替换为组件调用
6. 更新测试

## 示例

```typescript
// 重构前
function UserProfile() {
  return (
    <div>
      <div className="avatar">
        <img src={user.avatar} />
        <span>{user.name}</span>
      </div>
      {/* 更多内容 */}
    </div>
  );
}

// 重构后
function UserProfile() {
  return (
    <div>
      <UserAvatar user={user} />
      {/* 更多内容 */}
    </div>
  );
}

function UserAvatar({ user }: { user: User }) {
  return (
    <div className="avatar">
      <img src={user.avatar} />
      <span>{user.name}</span>
    </div>
  );
}
```
```

## 文档模式

### 1. API 文档生成器

`.claude/patterns/api-docs.md`：

```markdown
---
name: api-docs
description: 生成 API 文档
args:
  - name: format
    description: 文档格式
    choices: [openapi, markdown, postman]
    default: openapi
---

# API 文档生成器

扫描代码并生成 API 文档。

## 生成内容

1. **端点列表**
   - 路径和方法
   - 描述
   - 参数
   - 响应

2. **数据模型**
   - Schema 定义
   - 示例数据

3. **认证**
   - 认证方式
   - 权限要求

4. **错误码**
   - 错误列表
   - 错误说明

## OpenAPI 格式

```yaml
openapi: 3.0.0
info:
  title: API 文档
  version: 1.0.0
paths:
  /api/users:
    get:
      summary: 获取用户列表
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        200:
          description: 成功
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
```
```

### 2. README 生成器

`.claude/patterns/readme-gen.md`：

```markdown
---
name: readme-gen
description: 生成项目 README
---

# README 生成器

分析项目并生成完整的 README 文档。

## 文档结构

1. **项目概述**
   - 项目名称
   - 简短描述
   - 主要特性

2. **快速开始**
   - 安装步骤
   - 基础使用
   - 示例代码

3. **文档**
   - API 文档
   - 配置说明
   - 常见问题

4. **开发**
   - 开发环境设置
   - 构建和测试
   - 贡献指南

5. **许可证**

## 模板

```markdown
# {{ProjectName}}

{{Description}}

## 特性

- 特性 1
- 特性 2
- 特性 3

## 安装

\`\`\`bash
npm install {{package-name}}
\`\`\`

## 使用

\`\`\`typescript
import { feature } from '{{package-name}}';

feature();
\`\`\`

## 文档

详细文档请访问 [文档站点](https://docs.example.com)

## 开发

\`\`\`bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build
\`\`\`

## 许可证

MIT
```
```

## 数据库模式

### 1. 迁移生成器

`.claude/patterns/db-migration.md`：

```markdown
---
name: db-migration
description: 生成数据库迁移
args:
  - name: action
    description: 迁移动作
    choices: [create_table, add_column, remove_column, modify_column]
    required: true
  - name: table
    description: 表名
    required: true
---

# 数据库迁移生成器

生成数据库迁移脚本。

## 支持的操作

1. **创建表**
2. **添加列**
3. **删除列**
4. **修改列**
5. **添加索引**
6. **添加外键**

## 示例

```typescript
// 创建表
export async function up(knex: Knex) {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('users');
}
```

## 最佳实践

- 迁移可逆
- 包含回滚逻辑
- 测试迁移
- 备份数据
```

### 2. Seed 数据生成器

`.claude/patterns/db-seed.md`：

```markdown
---
name: db-seed
description: 生成数据库 Seed 数据
args:
  - name: table
    description: 表名
    required: true
---

# Seed 数据生成器

生成数据库初始化数据。

## 生成内容

1. **测试数据**
   - 开发环境
   - 测试环境

2. **基础数据**
   - 配置数据
   - 字典数据

## 示例

```typescript
export async function seed(knex: Knex) {
  // 清空表
  await knex('users').del();

  // 插入数据
  await knex('users').insert([
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin'
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'User',
      role: 'user'
    }
  ]);
}
```
```

## 部署模式

### 1. 部署脚本生成器

`.claude/patterns/deploy-script.md`：

```markdown
---
name: deploy-script
description: 生成部署脚本
args:
  - name: environment
    description: 部署环境
    choices: [staging, production]
    required: true
---

# 部署脚本生成器

生成自动化部署脚本。

## 部署流程

1. **前置检查**
   - 环境验证
   - 依赖检查
   - 权限验证

2. **构建**
   - 安装依赖
   - 运行构建
   - 运行测试

3. **部署**
   - 备份当前版本
   - 上传新版本
   - 重启服务

4. **验证**
   - 健康检查
   - 冒烟测试

5. **回滚**（如果失败）
   - 恢复备份
   - 重启服务

## 示例

```bash
#!/bin/bash
set -e

ENV=$1

echo "部署到 $ENV 环境..."

# 前置检查
./scripts/pre-deploy-check.sh $ENV

# 构建
npm ci
npm run build
npm test

# 部署
./scripts/deploy.sh $ENV

# 验证
./scripts/health-check.sh $ENV

echo "部署完成"
```
```

## 模式库管理

### 添加新模式

```bash
# 1. 创建模式文件
vim .claude/patterns/new-pattern.md

# 2. 测试模式
claude /new-pattern --test

# 3. 文档化
vim .claude/patterns/README.md

# 4. 提交
git add .claude/patterns/
git commit -m "feat: 添加新模式"
```

### 模式版本控制

```markdown
# 模式变更日志

## v1.1.0 - 2024-01-15

### 新增
- crud-generator: 支持关联关系
- api-endpoint: 支持分页

### 改进
- test-suite: 优化测试结构
- mock-data: 支持更多数据类型

### 修复
- extract-function: 修复参数识别问题
```

### 模式使用统计

```bash
# 查看模式使用情况
claude --pattern-stats

# 输出
Pattern Usage Statistics:
  crud-gen: 45 times
  api-endpoint: 32 times
  test-suite: 28 times
  react-component: 25 times
```

## 最佳实践

### 1. 模式命名

- 使用动词-名词格式
- 清晰描述功能
- 避免缩写

### 2. 模式文档

- 包含使用示例
- 说明适用场景
- 列出注意事项

### 3. 模式测试

- 在多个项目中验证
- 收集用户反馈
- 持续改进

### 4. 模式共享

- 纳入版本控制
- 团队内推广
- 定期审查更新

## 下一步

- 查看 [配置片段库](./config-snippets.md)
- 学习 [Hooks 配方](./hooks-recipes.md)
- 探索 [团队规则库](./team-rules.md)
