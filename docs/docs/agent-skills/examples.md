---
title: "Agent Skills 示例集"
---

# Agent Skills 示例集

本页面提供了丰富的 Agent Skills 实际示例，涵盖各种开发场景和用例。

## Git 工作流 Skills

### 智能提交 Skill

```bash
# 创建智能提交 Skill
cat > .claude/skills/commit.md << 'EOF'
---
name: commit
description: 分析代码变更并生成语义化提交消息
---

执行智能提交流程：
1. 运行 git status 查看变更文件
2. 运行 git diff 分析具体变更
3. 识别变更类型（feat/fix/refactor/docs等）
4. 生成符合 Conventional Commits 规范的提交消息
5. 询问用户确认后执行提交
EOF
```

**使用示例：**

```bash
You: /commit

Claude: 正在分析你的代码变更...

Claude wants to:
  • Run command: git status
  • Run command: git diff
Allow? [y/n]

You: y

Claude: 检测到以下变更：

修改的文件：
- src/components/UserProfile.tsx (新增 avatar 属性)
- src/api/users.ts (添加头像上传接口)
- tests/users.test.ts (新增头像测试用例)

变更类型：功能添加

建议的提交消息：
feat(user): Add avatar upload functionality

- Add avatar prop to UserProfile component
- Implement avatar upload API endpoint
- Include test coverage for avatar feature

是否使用此提交消息？[y/n]

You: y

Claude wants to:
  • Run command: git add src/components/UserProfile.tsx src/api/users.ts tests/users.test.ts
  • Run command: git commit -m "feat(user): Add avatar upload functionality..."
Allow? [y/n]

You: y

Claude: 提交成功！
Commit hash: a3f2b1c
```

### 分支同步 Skill

```bash
cat > .claude/skills/sync.md << 'EOF'
---
name: sync
description: 同步远程分支并处理冲突
---

分支同步流程：
1. 保存当前工作状态
2. 拉取远程最新代码
3. 检测并处理合并冲突
4. 恢复工作状态
5. 报告同步结果
EOF
```

**使用示例：**

```bash
You: /sync

Claude: 开始同步远程分支...

当前分支: feature/user-auth
远程分支: origin/feature/user-auth

Claude wants to:
  • Run command: git stash
  • Run command: git pull origin feature/user-auth
Allow? [y/n]

You: y

Claude: 检测到合并冲突：
- src/auth/middleware.ts (3 处冲突)

冲突内容：
<<<<<<< HEAD
export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
=======
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
>>>>>>> origin/feature/user-auth

建议解决方案：
使用远程版本（包含 TypeScript 类型定义）

是否自动解决？[y/n]

You: y

Claude: 冲突已解决。

Claude wants to:
  • Run command: git add src/auth/middleware.ts
  • Run command: git commit -m "Merge remote changes"
  • Run command: git stash pop
Allow? [y/n]

You: y

Claude: 同步完成！
- 已合并 3 个提交
- 已解决 1 个冲突
- 工作状态已恢复
```

## 代码质量 Skills

### 代码审查 Skill

```bash
cat > .claude/skills/review.md << 'EOF'
---
name: review
description: 执行全面的代码审查
---

代码审查检查项：
1. 代码风格和格式
2. 类型安全
3. 错误处理
4. 性能问题
5. 安全漏洞
6. 最佳实践
7. 测试覆盖率
EOF
```

**使用示例：**

```bash
You: /review src/api/payment.ts

Claude: 正在审查 src/api/payment.ts...

Claude wants to:
  • Read file: src/api/payment.ts
Allow? [y/n]

You: y

Claude: 代码审查报告

文件: /Users/project/src/api/payment.ts
行数: 156
复杂度: 中等

发现的问题：

1. 安全问题 (严重)
   行 23-25:
   ```typescript
   const apiKey = "sk_live_abc123"; // 硬编码的 API 密钥
   ```
   建议: 使用环境变量存储敏感信息

2. 错误处理 (重要)
   行 45-52:
   ```typescript
   async function processPayment(amount: number) {
     const result = await stripe.charges.create({ amount });
     return result;
   }
   ```
   建议: 添加 try-catch 错误处理

3. 类型安全 (一般)
   行 67:
   ```typescript
   function calculateFee(amount: any) {
   ```
   建议: 使用具体类型替代 any

4. 性能 (提示)
   行 89-95: 循环中进行异步调用
   建议: 使用 Promise.all 并行处理

代码质量评分: C+

建议优先修复安全问题和错误处理。
```

### 重构建议 Skill

```bash
cat > .claude/skills/refactor.md << 'EOF'
---
name: refactor
description: 分析代码并提供重构建议
---

重构分析：
1. 识别代码异味
2. 检测重复代码
3. 分析函数复杂度
4. 评估可维护性
5. 提供具体重构方案
EOF
```

**使用示例：**

```bash
You: /refactor src/utils/validation.ts

Claude: 分析 validation.ts 的重构机会...

Claude wants to:
  • Read file: src/utils/validation.ts
Allow? [y/n]

You: y

Claude: 重构建议报告

检测到的问题：

1. 重复代码 (3 处)
   函数 validateEmail, validatePhone, validateAddress 有相似的验证逻辑

   当前代码：
   ```typescript
   function validateEmail(email: string): boolean {
     if (!email) return false;
     if (email.length < 5) return false;
     if (!email.includes('@')) return false;
     return true;
   }

   function validatePhone(phone: string): boolean {
     if (!phone) return false;
     if (phone.length < 10) return false;
     if (!/^\d+$/.test(phone)) return false;
     return true;
   }
   ```

   建议重构为：
   ```typescript
   interface ValidationRule {
     minLength?: number;
     pattern?: RegExp;
     required?: boolean;
   }

   function validate(value: string, rules: ValidationRule): boolean {
     if (rules.required && !value) return false;
     if (rules.minLength && value.length < rules.minLength) return false;
     if (rules.pattern && !rules.pattern.test(value)) return false;
     return true;
   }

   const validateEmail = (email: string) =>
     validate(email, { required: true, minLength: 5, pattern: /@/ });

   const validatePhone = (phone: string) =>
     validate(phone, { required: true, minLength: 10, pattern: /^\d+$/ });
   ```

2. 高复杂度函数
   函数 validateForm (行 89-145) 圈复杂度: 12
   建议: 拆分为更小的函数

是否应用这些重构？[y/n]
```

## 测试 Skills

### 测试生成 Skill

```bash
cat > .claude/skills/generate-tests.md << 'EOF'
---
name: generate-tests
description: 为指定文件生成测试用例
---

测试生成流程：
1. 分析源代码结构
2. 识别公共函数和方法
3. 生成单元测试
4. 包含边界情况测试
5. 添加 mock 和 fixture
EOF
```

**使用示例：**

```bash
You: /generate-tests src/utils/calculator.ts

Claude: 为 calculator.ts 生成测试...

Claude wants to:
  • Read file: src/utils/calculator.ts
Allow? [y/n]

You: y

Claude: 分析源代码...

发现 4 个公共函数：
- add(a: number, b: number): number
- subtract(a: number, b: number): number
- multiply(a: number, b: number): number
- divide(a: number, b: number): number

生成测试文件：

Claude wants to:
  • Create file: tests/utils/calculator.test.ts
Allow? [y/n]

You: y

Claude: 已创建测试文件：

tests/utils/calculator.test.ts:
```typescript
import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '@/utils/calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });

    it('should handle decimal results', () => {
      expect(divide(5, 2)).toBe(2.5);
    });
  });

  // ... 更多测试
});
```

测试覆盖率预估: 95%
```

### 测试运行 Skill

```bash
cat > .claude/skills/test.md << 'EOF'
---
name: test
description: 运行测试套件并生成报告
---

测试执行流程：
1. 运行所有测试
2. 收集覆盖率数据
3. 识别失败的测试
4. 生成详细报告
5. 提供修复建议
EOF
```

**使用示例：**

```bash
You: /test

Claude: 运行测试套件...

Claude wants to:
  • Run command: npm test -- --coverage
Allow? [y/n]

You: y

Claude: 测试执行结果：

通过: 42 个测试
失败: 3 个测试
跳过: 1 个测试
总计: 46 个测试

失败的测试：

1. UserService > createUser > should validate email
   错误: Expected "invalid" to be a valid email
   文件: tests/services/user.test.ts:23

2. PaymentService > processPayment > should handle timeout
   错误: Timeout exceeded (5000ms)
   文件: tests/services/payment.test.ts:45

3. AuthMiddleware > should reject invalid token
   错误: Expected 401, received 500
   文件: tests/middleware/auth.test.ts:67

代码覆盖率：
- 语句: 87.3%
- 分支: 82.1%
- 函数: 91.2%
- 行: 86.8%

未覆盖的文件：
- src/utils/legacy.ts (0%)
- src/config/deprecated.ts (12%)

建议：
1. 修复 email 验证逻辑
2. 增加 payment 超时时间或优化处理
3. 检查 auth 中间件的错误处理
```

## 项目管理 Skills

### 项目初始化 Skill

```bash
cat > .claude/skills/init-project.md << 'EOF'
---
name: init-project
description: 初始化新项目结构
---

项目初始化步骤：
1. 创建标准目录结构
2. 初始化 git 仓库
3. 设置 package.json
4. 配置 TypeScript
5. 添加 ESLint 和 Prettier
6. 创建 .env.example
7. 生成 README.md
EOF
```

**使用示例：**

```bash
You: /init-project my-api

Claude: 初始化项目 my-api...

Claude wants to:
  • Run command: mkdir -p my-api/{src,tests,docs}
  • Run command: cd my-api && git init
  • Create file: my-api/package.json
  • Create file: my-api/tsconfig.json
  • Create file: my-api/.eslintrc.js
  • Create file: my-api/.prettierrc
  • Create file: my-api/.env.example
  • Create file: my-api/README.md
Allow? [y/n]

You: y

Claude: 项目结构已创建：

my-api/
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

下一步：
1. cd my-api
2. npm install
3. 配置 .env 文件
4. npm run dev
```

### 依赖更新 Skill

```bash
cat > .claude/skills/update-deps.md << 'EOF'
---
name: update-deps
description: 安全地更新项目依赖
---

依赖更新流程：
1. 检查过时的包
2. 识别破坏性变更
3. 更新兼容版本
4. 运行测试验证
5. 生成更新报告
EOF
```

**使用示例：**

```bash
You: /update-deps

Claude: 检查项目依赖...

Claude wants to:
  • Run command: npm outdated
Allow? [y/n]

You: y

Claude: 发现 12 个过时的包：

安全更新（推荐立即更新）：
- express: 4.17.1 → 4.18.2 (安全补丁)
- jsonwebtoken: 8.5.1 → 9.0.2 (安全漏洞修复)

次要版本更新（向后兼容）：
- typescript: 5.0.4 → 5.3.3
- eslint: 8.42.0 → 8.56.0
- vitest: 0.32.0 → 1.2.1

主要版本更新（可能有破坏性变更）：
- react: 18.2.0 → 19.0.0
- vite: 4.3.9 → 5.0.11

更新策略建议：
1. 先更新安全补丁
2. 然后更新次要版本
3. 最后评估主要版本更新

是否执行安全更新？[y/n]

You: y

Claude wants to:
  • Run command: npm update express jsonwebtoken
  • Run command: npm test
Allow? [y/n]

You: y

Claude: 安全更新完成！

更新的包：
- express: 4.17.1 → 4.18.2
- jsonwebtoken: 8.5.1 → 9.0.2

测试结果: 全部通过 (46/46)

建议下一步：
运行 /update-deps --minor 更新次要版本
```

## 部署 Skills

### 构建检查 Skill

```bash
cat > .claude/skills/pre-deploy.md << 'EOF'
---
name: pre-deploy
description: 部署前检查清单
---

部署前检查：
1. 代码检查（lint）
2. 类型检查
3. 测试通过
4. 构建成功
5. 环境变量验证
6. 依赖安全检查
EOF
```

**使用示例：**

```bash
You: /pre-deploy

Claude: 执行部署前检查...

[1/6] 代码检查...
Claude wants to:
  • Run command: npm run lint
Allow? [y/n]

You: y

Claude: ✓ 代码检查通过

[2/6] 类型检查...
Claude wants to:
  • Run command: npm run type-check
Allow? [y/n]

You: y

Claude: ✓ 类型检查通过

[3/6] 运行测试...
Claude wants to:
  • Run command: npm test
Allow? [y/n]

You: y

Claude: ✓ 所有测试通过 (46/46)

[4/6] 构建项目...
Claude wants to:
  • Run command: npm run build
Allow? [y/n]

You: y

Claude: ✓ 构建成功
  输出: dist/ (2.3 MB)

[5/6] 验证环境变量...
Claude wants to:
  • Read file: .env.example
  • Read file: .env.production
Allow? [y/n]

You: y

Claude: ✗ 缺少环境变量
  .env.production 中缺少:
  - DATABASE_URL
  - REDIS_URL
  - JWT_SECRET

[6/6] 依赖安全检查...
Claude wants to:
  • Run command: npm audit
Allow? [y/n]

You: y

Claude: ✓ 未发现安全漏洞

部署检查结果：
✓ 代码质量
✓ 测试
✓ 构建
✗ 环境配置
✓ 安全

状态: 未通过
请配置缺少的环境变量后重试。
```

### 部署 Skill

```bash
cat > .claude/skills/deploy.md << 'EOF'
---
name: deploy
description: 部署应用到指定环境
---

部署流程：
1. 运行部署前检查
2. 确认目标环境
3. 构建生产版本
4. 上传到服务器
5. 运行数据库迁移
6. 重启服务
7. 健康检查
8. 发送通知
EOF
```

**使用示例：**

```bash
You: /deploy production

Claude: 准备部署到生产环境...

⚠️  这将影响生产环境，请确认：
- 目标: production
- 分支: main
- 版本: v2.3.1

继续？[y/n]

You: y

Claude: 执行部署前检查...
✓ 所有检查通过

Claude wants to:
  • Run command: npm run build:production
  • Run command: rsync -avz dist/ user@server:/var/www/app/
  • Run command: ssh user@server "cd /var/www/app && npm run migrate"
  • Run command: ssh user@server "pm2 restart app"
Allow? [y/n]

You: y

Claude: 部署进度：

[1/4] 构建生产版本...
✓ 构建完成 (2.1 MB)

[2/4] 上传文件...
✓ 已上传 156 个文件

[3/4] 数据库迁移...
✓ 执行了 3 个迁移

[4/4] 重启服务...
✓ 服务已重启

健康检查...
✓ API 响应正常 (200 OK)
✓ 数据库连接正常
✓ Redis 连接正常

部署成功！
版本: v2.3.1
时间: 2024-01-15 14:30:00
URL: https://api.example.com

已发送通知到 Slack #deployments
```

## 文档生成 Skills

### API 文档生成 Skill

```bash
cat > .claude/skills/generate-api-docs.md << 'EOF'
---
name: generate-api-docs
description: 从代码生成 API 文档
---

API 文档生成：
1. 扫描路由定义
2. 提取端点信息
3. 分析请求/响应类型
4. 生成 OpenAPI 规范
5. 创建 Markdown 文档
EOF
```

**使用示例：**

```bash
You: /generate-api-docs

Claude: 生成 API 文档...

Claude wants to:
  • Read file: src/routes/users.ts
  • Read file: src/routes/auth.ts
  • Read file: src/routes/posts.ts
Allow? [y/n]

You: y

Claude: 分析 API 端点...

发现 15 个端点：
- POST /api/auth/login
- POST /api/auth/register
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id
- GET /api/posts
- POST /api/posts
...

生成文档...

Claude wants to:
  • Create file: docs/api/README.md
  • Create file: docs/api/openapi.yaml
Allow? [y/n]

You: y

Claude: API 文档已生成：

docs/api/README.md:
```markdown
# API 文档

## 认证

### POST /api/auth/login
登录并获取访问令牌

**请求体：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应：**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
```

**状态码：**
- 200: 登录成功
- 401: 认证失败
- 400: 请求参数错误

## 用户管理

### GET /api/users
获取用户列表

**查询参数：**
- page: 页码（默认: 1）
- limit: 每页数量（默认: 20）
- sort: 排序字段

...
```

OpenAPI 规范已保存到: docs/api/openapi.yaml
```

## 性能优化 Skills

### 性能分析 Skill

```bash
cat > .claude/skills/analyze-performance.md << 'EOF'
---
name: analyze-performance
description: 分析应用性能瓶颈
---

性能分析：
1. 构建大小分析
2. 依赖分析
3. 代码分割检查
4. 渲染性能分析
5. 网络请求优化
6. 生成优化建议
EOF
```

**使用示例：**

```bash
You: /analyze-performance

Claude: 分析应用性能...

Claude wants to:
  • Run command: npm run build -- --analyze
Allow? [y/n]

You: y

Claude: 构建分析完成

包大小分析：
总大小: 2.8 MB (gzip: 856 KB)

最大的依赖：
1. moment.js - 289 KB (10.3%)
   建议: 替换为 date-fns (减少 ~200KB)

2. lodash - 245 KB (8.7%)
   建议: 使用按需导入或替换为原生方法

3. chart.js - 198 KB (7.1%)
   建议: 考虑更轻量的图表库

代码分割分析：
- 主包: 1.2 MB (过大)
- 路由懒加载: 未实现
- 组件懒加载: 部分实现

建议的优化：

1. 依赖优化（预计减少 450KB）
   ```bash
   npm uninstall moment
   npm install date-fns
   ```

2. 实现路由懒加载
   ```typescript
   // 当前
   import UserPage from './pages/User';

   // 优化后
   const UserPage = lazy(() => import('./pages/User'));
   ```

3. 启用 Tree Shaking
   ```javascript
   // vite.config.ts
   export default {
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             utils: ['date-fns', 'axios']
           }
        }
       }
     }
   }
   ```

预计优化效果：
- 包大小: 2.8 MB → 1.9 MB (-32%)
- 首次加载: 3.2s → 1.8s (-44%)
- FCP: 1.8s → 1.1s (-39%)
```

## 数据库 Skills

### 数据库迁移 Skill

```bash
cat > .claude/skills/db-migrate.md << 'EOF'
---
name: db-migrate
description: 管理数据库迁移
---

迁移管理：
1. 检查待执行的迁移
2. 验证迁移文件
3. 备份数据库
4. 执行迁移
5. 验证迁移结果
6. 提供回滚选项
EOF
```

**使用示例：**

```bash
You: /db-migrate

Claude: 检查数据库迁移...

Claude wants to:
  • Run command: npm run migrate:status
Allow? [y/n]

You: y

Claude: 迁移状态：

已执行: 12 个迁移
待执行: 3 个迁移

待执行的迁移：
1. 20240115_add_user_avatar.sql
   - 添加 users.avatar_url 字段
   - 创建 avatars 表

2. 20240116_add_post_tags.sql
   - 创建 tags 表
   - 创建 post_tags 关联表

3. 20240117_add_indexes.sql
   - 为 users.email 添加索引
   - 为 posts.created_at 添加索引

⚠️  建议先备份数据库

是否继续？[y/n]

You: y

Claude wants to:
  • Run command: pg_dump -U user -d mydb > backup_20240117.sql
  • Run command: npm run migrate:up
Allow? [y/n]

You: y

Claude: 执行迁移...

[1/3] 20240115_add_user_avatar.sql
✓ 完成 (0.3s)

[2/3] 20240116_add_post_tags.sql
✓ 完成 (0.5s)

[3/3] 20240117_add_indexes.sql
✓ 完成 (1.2s)

迁移成功！
- 执行了 3 个迁移
- 总耗时: 2.0s
- 备份文件: backup_20240117.sql

如需回滚，运行: /db-rollback
```

这些示例展示了 Agent Skills 在实际开发中的各种应用场景，帮助你快速上手并创建自己的 Skills。
