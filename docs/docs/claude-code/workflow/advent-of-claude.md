---
title: "CLI 实战技巧"
---

# CLI 实战技巧

22 个 Claude Code 终端实战技巧，每个都附带完整的交互示例。涵盖会话管理、文件引用、权限控制、内置命令、多文件操作和高级工作流。

## 分类 1：启动与会话管理

### 技巧 1：Headless 模式处理单次任务

不需要进入交互式会话，直接在命令行用 `--headless` 完成一次性任务。

````bash
$ claude --headless "把 src/utils.ts 中的所有 console.log 删掉"

Let me read the file and remove all console.log statements.

Claude wants to:
  • Read file: src/utils.ts
  • Edit file: src/utils.ts

 ✓ Removed 3 console.log statements from src/utils.ts:
   - Line 12: console.log('processing...')
   - Line 28: console.log('result:', data)
   - Line 45: console.log('done')
````

> **提示:** Headless 模式适合嵌入脚本、CI/CD 管道或 Makefile。输出直接打印到 stdout，方便管道串联。

### 技巧 2：会话内切换模型

在交互式会话中根据任务复杂度实时切换模型。

````bash
$ claude

You: @src/api/auth.ts 解释这个认证模块的架构设计

Claude: [使用默认模型 Sonnet 给出详细的架构分析]

You: /model opus

Claude: Switched to claude-opus-4-6

You: 基于上面的分析，设计一个支持 OAuth 2.0 + PKCE 的完整认证方案

Claude: [使用 Opus 给出更深度的方案设计]

You: /model haiku

Claude: Switched to claude-haiku-4-5

You: 为上面的方案生成 JSDoc 注释

Claude: [使用 Haiku 快速生成注释，节省成本]
````

> **提示:** 简单任务用 Haiku（快且便宜），复杂设计用 Opus（最强），日常编码用 Sonnet（平衡）。用 `/cost` 查看各模型的实际消耗。

### 技巧 3：管理会话上下文与成本

长时间工作后，上下文膨胀会导致响应变慢、成本上升。用 `/clear` 和 `/cost` 组合管理。

````bash
$ claude

You: [已经讨论了 20 分钟的认证系统重构，上下文很长]

You: /cost

Claude: Session cost: $2.34 (127k tokens input, 8k tokens output)

You: /clear

Claude: Context cleared. Starting fresh.

You: 现在帮我实现刚才讨论的 TokenService 类。它需要支持：
- access token 签发（JWT，15 分钟过期）
- refresh token 轮换（7 天过期）
- token 黑名单检查

Claude: [在干净的上下文中高效编码]
````

> **提示:** 在切换到新话题时执行 `/clear`。如果需要保留之前的结论，先让 Claude 总结要点，清除后再把摘要粘贴回来。

### 技巧 4：恢复中断的工作

终端意外关闭后，Claude 会保留上次的会话上下文。

````bash
$ claude

You: 重构 src/services/payment.ts，把 Stripe 逻辑抽成独立模块

Claude: [读取文件，分析依赖关系]

Claude wants to:
  • Read file: src/services/payment.ts
  • Read file: src/config/stripe.ts
  • Edit file: src/services/stripe.service.ts

Allow? [y/n/always/never]

You: y

Claude: [正在重构中途...]

--- 终端意外关闭 ---

$ claude --resume

Claude: 欢迎回来！上次你正在重构 payment.ts，我已经创建了 stripe.service.ts 并迁移了
3 个支付方法。还剩下：
1. 更新 payment.ts 中的 import 引用
2. 补充 StripeService 的单元测试
要继续吗？

You: 继续，先更新 import 引用

Claude: [无缝继续工作]
````

> **提示:** `claude --resume` 会恢复最近的会话。如果有多个会话，用 `claude --resume --session <id>` 指定。

## 分类 2：文件与上下文引用

### 技巧 5：@ 精确引用文件

用 `@` 前缀让 Claude 精确读取指定文件，避免猜测文件位置。

````bash
$ claude

You: @src/components/Button.tsx 这个组件的 onClick 事件处理有性能问题，帮我优化

Claude wants to:
  • Read file: src/components/Button.tsx

Allow? [y/n/always/never]

You: y

Claude: [读取 Button.tsx]

我发现几个性能问题：

1. **每次渲染都创建新的回调函数** — 建议用 useCallback 包裹
2. **没有做 props 的浅比较** — 建议用 React.memo

修复方案：

Claude wants to:
  • Edit file: src/components/Button.tsx

Allow? [y/n/always/never]

You: y

Claude: ✓ 已优化 Button 组件，添加了 useCallback 和 React.memo
````

> **提示:** `@` 引用比描述 "帮我看看那个按钮组件" 精确得多。Claude 会直接读取文件内容，不会找错文件。

### 技巧 6：一次引用多个文件

同时引用多个文件进行对比分析或统一修改。

````bash
$ claude

You: @src/api/users.ts @src/api/products.ts @src/api/orders.ts
这三个文件的错误处理方式不一致，统一成相同的模式

Claude wants to:
  • Read file: src/api/users.ts
  • Read file: src/api/products.ts
  • Read file: src/api/orders.ts

Allow? [y/n/always/never]

You: y

Claude: [读取三个文件]

分析结果：
- users.ts: 用 try/catch + 自定义 AppError
- products.ts: 用 .catch() + 直接 throw Error
- orders.ts: 用 Result 模式

建议统一为 AppError + try/catch 模式。开始修改：

Claude wants to:
  • Edit file: src/api/users.ts
  • Edit file: src/api/products.ts
  • Edit file: src/api/orders.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ 三个文件已统一使用 AppError + try/catch 错误处理模式
````

> **提示:** 引用 2-5 个文件效果最好。如果需要分析整个目录，用技巧 7 的目录引用。

### 技巧 7：引用整个目录

用 `@` 引用目录路径，Claude 会扫描目录下所有文件进行分析。

````bash
$ claude

You: @src/components/ 分析这个目录下所有组件，找出以下问题：
1. 缺少 TypeScript 类型的组件
2. 没有对应测试文件的组件
3. 超过 300 行需要拆分的组件

Claude wants to:
  • Read directory: src/components/

Allow? [y/n/always/never]

You: y

Claude: [扫描 src/components/ 目录]

扫描了 24 个组件文件，发现以下问题：

**缺少类型的组件（3 个）：**
- UserCard.tsx — props 没有 TypeScript 接口
- SearchBar.tsx — 使用了 any 类型
- Modal.tsx — children 类型为 any

**缺少测试的组件（8 个）：**
- Header, Footer, Sidebar, Navbar, Breadcrumb,
- Avatar, Badge, Tooltip

**超过 300 行的组件（2 个）：**
- Dashboard.tsx (487 行) — 建议拆出 StatsPanel、ActivityFeed
- DataGrid.tsx (356 行) — 建议拆出 GridFilters、Pagination

要从哪个问题开始修复？
````

> **提示:** 目录引用会消耗较多 token。如果目录很大，先用 `@src/components/` 了解结构，再用技巧 5 逐个处理具体文件。

### 技巧 8：CLAUDE.md 自动加载项目上下文

在项目根目录创建 `CLAUDE.md`，Claude 每次启动都会自动读取，了解项目规范。

````bash
$ cat CLAUDE.md

# 项目规范

## 技术栈
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL

## 代码规范
- 使用函数组件和 hooks
- 文件命名：kebab-case
- API 路由统一返回 { code, data, message }
- 错误使用 AppError 类，包含 statusCode 和 errorCode

## 测试要求
- 每个新增函数必须有单元测试
- 使用 vitest + testing-library
- 测试文件放在同目录 __tests__/ 下

$ claude

Claude: [自动加载 CLAUDE.md]

我已了解项目规范：Next.js 14 + TypeScript + Tailwind 项目，使用 App Router 和 Prisma。
遵循 kebab-case 命名，API 统一返回格式，要求单元测试覆盖。

You: 帮我新建一个用户头像上传的 API 路由

Claude: [按照 CLAUDE.md 中的规范自动生成代码：
- 文件命名 kebab-case: upload-avatar/route.ts
- 返回格式: { code, data, message }
- 错误处理: AppError
- 自动创建对应测试文件]
````

> **提示:** CLAUDE.md 支持 3 个层级：项目根目录（全局）、子目录（模块级）、`~/.claude/CLAUDE.md`（个人偏好）。详见 [上下文管理](./context-management)。

## 分类 3：模式与权限控制

### 技巧 9：Plan Mode 规划复杂任务

用 Shift+Tab 切换到 Plan Mode，Claude 会先出方案再执行，避免方向错误。

````bash
$ claude

You: 把整个用户模块从 REST API 迁移到 GraphQL

Claude: 这是一个复杂的迁移任务。建议先进入 Plan Mode 规划方案。

You: [按 Shift+Tab 切换到 Plan Mode]

You: 把整个用户模块从 REST API 迁移到 GraphQL

Claude: 我会先规划方案，不会直接修改代码。

## 迁移方案

### 阶段 1：基础设施（预计 2 小时）
1. 安装 graphql + @apollo/server 依赖
2. 创建 GraphQL schema 定义
3. 搭建 Apollo Server 实例

### 阶段 2：用户模块迁移（预计 3 小时）
4. 定义 User 类型 schema
5. 实现 Query resolvers（getUser, listUsers）
6. 实现 Mutation resolvers（createUser, updateUser, deleteUser）
7. 迁移认证中间件

### 阶段 3：前端适配（预计 2 小时）
8. 安装 @apollo/client
9. 替换 REST 调用为 GraphQL queries
10. 更新错误处理逻辑

### 风险点
- 认证中间件需要重写
- 文件上传接口 GraphQL 处理方式不同
- 需要保持 REST API 并行运行一段时间

是否按此方案执行？还是需要调整？

You: 方案可以，先执行阶段 1

Claude: [开始执行阶段 1 的具体实现]
````

> **提示:** 对于涉及 5 个以上文件的修改、架构变更、不确定实现方式的任务，强烈建议先用 Plan Mode。

### 技巧 10：Auto-Accept 快速迭代

对于小改动，用 Shift+Tab 切换到 Auto-Accept 模式，跳过逐个确认。

````bash
$ claude

You: [按 Shift+Tab 切换到 Auto-Accept 模式]

You: 把项目里所有的 var 声明改成 const 或 let

Claude: [自动执行，无需逐一确认]

✓ 扫描了 34 个文件，修改了 12 处 var 声明：
  - src/utils/format.ts: 3 处 var → const
  - src/utils/validate.ts: 2 处 var → const
  - src/api/handler.ts: 4 处 var → let (需要重新赋值)
  - src/config/constants.ts: 3 处 var → const

所有修改已完成。建议运行 `npm run build` 验证。

You: 运行 npm run build

Claude: ✓ 构建通过，没有错误
````

> **提示:** Auto-Accept 适合低风险操作（格式化、重命名、简单重构）。对于删除文件、修改数据库 schema 等高风险操作，建议保持默认模式。

### 技巧 11：always/never 简化权限

对重复性操作用 `always` 或 `never` 减少确认次数。

````bash
$ claude

You: 修复所有 ESLint 报错

Claude wants to:
  • Read file: src/components/Header.tsx
  • Edit file: src/components/Header.tsx

Allow? [y/n/always/never]

You: always

Claude: ✓ Header.tsx 已修复

Claude wants to:
  • Read file: src/components/Footer.tsx
  • Edit file: src/components/Footer.tsx

[自动允许，无需确认]

Claude wants to:
  • Read file: src/config/env.ts
  • Edit file: src/config/env.ts

[自动允许，无需确认]

Claude: ✓ 所有 8 个文件的 ESLint 错误已修复
````

> **提示:** `always` 对当前会话中该文件的后续操作全部自动放行。`never` 则自动拒绝。对于需要反复编辑的同组文件，先用 `always` 建立信任。

### 技巧 12：.claudeignore 排除干扰

创建 `.claudeignore` 文件，防止 Claude 读取无关文件，节省 token 和避免误判。

````bash
$ cat .claudeignore

# 依赖和构建产物
node_modules/
dist/
.next/
build/

# 环境和密钥
.env
.env.*
*.pem
*.key

# 大型生成文件
*.min.js
*.min.css
package-lock.json
yarn.lock

# 文档和资源
*.md
public/images/
$ claude

Claude: [启动时自动读取 .claudeignore]

You: 分析项目结构

Claude: [跳过 node_modules、dist、.env 等文件，只分析源代码]

扫描了 47 个源文件（已排除 .claudeignore 中的文件）：
- src/api/ — 12 个 API 路由
- src/components/ — 24 个组件
- src/utils/ — 8 个工具函数
- src/config/ — 3 个配置文件
````

> **提示:** `.claudeignore` 语法与 `.gitignore` 完全相同。对大型项目特别有效，避免 Claude 在 node_modules 里浪费 token。

## 分类 4：内置命令实战

### 技巧 13：/commit 智能提交

用 `/commit` 让 Claude 分析当前变更，自动生成规范的 commit message。

````bash
$ claude

You: [刚完成了用户注册功能]

You: /commit

Claude: 分析当前变更...

变更文件：
  M src/api/auth/register.ts    (+48, -2)
  M src/services/user.ts        (+22, -0)
  A src/validators/register.ts  (+35, -0)
  M src/types/user.ts           (+8, -0)
  M tests/auth.test.ts          (+42, -0)

生成的 commit message：

feat(auth): add user registration with input validation

- Add register API endpoint with email/password validation
- Create RegisterValidator using Zod schemas
- Add password hashing with bcrypt (10 salt rounds)
- Extend User type with registration metadata
- Add unit tests for registration flow

Co-Authored-By: Claude <noreply@anthropic.com>

要使用这个 commit message 吗？

You: 把 "10 salt rounds" 改成 "12 salt rounds"

Claude: ✓ 已更新并提交

[main abc1234] feat(auth): add user registration with input validation
 5 files changed, 155 insertions(+), 2 deletions(-)
````

> **提示:** `/commit` 会读取 git diff --staged。如果文件未暂存，先 `git add` 指定文件。你也可以直接告诉 Claude 调整 commit message 的风格。

### 技巧 14：/fast 加速简单任务

用 `/fast` 切换到快速输出模式，适合不需要深度推理的简单任务。

````bash
$ claude

You: /fast

Claude: Fast mode enabled. Responses will be faster.

You: 给 src/utils/format.ts 添加一个 formatDate 函数，输入 ISO 字符串，输出 "YYYY年M月D日" 格式

Claude wants to:
  • Read file: src/utils/format.ts
  • Edit file: src/utils/format.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ 已添加 formatDate 函数

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

You: 再加一个 formatCurrency 函数，把分转成 "¥X.XX" 格式

Claude: ✓ 已添加 formatCurrency 函数

export function formatCurrency(cents: number): string {
  return `¥${(cents / 100).toFixed(2)}`
}
````

> **提示:** `/fast` 使用同一模型但加速输出。适合添加简单函数、格式化代码、生成样板代码等任务。复杂重构建议切回标准模式。

### 技巧 15：Skills 自动化工作流

用自定义 Skills 将常用工作流封装为一条命令。

````bash
$ claude

You: 列出可用的 skills

Claude: 当前可用的 Skills：
- /review — 代码审查（检查安全、性能、可维护性）
- /test — 为指定文件生成单元测试
- /commit — 智能生成 commit message
- /fix — 根据 ESLint/TSC 错误自动修复

You: /review src/api/payment.ts

Claude: [执行 review skill 的完整流程]

## 代码审查: src/api/payment.ts

### 安全问题 🔴
- Line 34: `amount` 参数未做上限校验，可能导致大额支付
- Line 52: Stripe webhook 缺少签名验证

### 性能问题 🟡
- Line 28: 每次请求都创建新的 Stripe 实例，应复用单例
- Line 67: 数据库查询未使用索引字段

### 可维护性 🟢
- 整体结构清晰，错误处理完善
- 建议将 webhook 处理逻辑拆分为独立函数

要修复这些问题吗？

You: 先修复两个安全问题

Claude: [自动修复安全问题]
````

> **提示:** 在 `.claude/skills/` 目录下创建 `.md` 文件即可定义自己的 Skill。详见 [Skills（技能）](../advanced/skills)。

## 分类 5：多文件操作

### 技巧 16：多文件级联修改

修改接口或类型定义后，Claude 自动追踪并更新所有引用文件。

````bash
$ claude

You: @src/types/user.ts 把 User 接口的 name 字段拆分成 firstName 和 lastName

Claude wants to:
  • Read file: src/types/user.ts

Allow? [y/n/always/never]

You: y

Claude: [读取 user.ts]

修改 User 接口后，需要同步更新以下引用：

1. src/types/user.ts — 接口定义
2. src/api/users.ts — API 返回值映射
3. src/components/UserCard.tsx — 显示逻辑
4. src/components/UserForm.tsx — 表单字段
5. src/services/auth.ts — 注册逻辑
6. tests/user.test.ts — 测试用例

Claude wants to:
  • Edit file: src/types/user.ts
  • Edit file: src/api/users.ts
  • Edit file: src/components/UserCard.tsx
  • Edit file: src/components/UserForm.tsx
  • Edit file: src/services/auth.ts
  • Edit file: tests/user.test.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ 所有 6 个文件已更新：
  - User.name → User.firstName + User.lastName
  - API 返回值: name → firstName/lastName
  - UserCard 显示: {user.name} → {user.firstName} {user.lastName}
  - UserForm 表单: 单个 name 输入 → 两个输入框
  - 注册逻辑: 同步拆分
  - 测试: 更新断言
````

> **提示:** Claude 会自动追踪 import 链和类型引用。对于大型重构，建议配合 Plan Mode（技巧 9）先审查影响范围。

### 技巧 17：分阶段执行大型重构

将大型重构拆成多个阶段，每阶段完成后审查再继续。

````bash
$ claude

You: 把整个状态管理从 Redux 迁移到 Zustand，分阶段执行

Claude: 这是一个较大的迁移，建议分阶段执行：

## 迁移计划

### 阶段 1：基础设施
- 安装 zustand
- 创建基础 store 结构
- 保留 Redux 不删除（并行运行）

### 阶段 2：逐模块迁移
- auth store → useAuthStore
- cart store → useCartStore
- ui store → useUIStore

### 阶段 3：清理
- 删除 Redux 依赖和配置
- 更新测试
- 清理未使用的代码

先执行阶段 1？

You: 开始阶段 1

Claude: [执行阶段 1]

✓ 阶段 1 完成：
  - 安装了 zustand@4.5.0
  - 创建了 src/stores/ 目录结构
  - 编写了 store 创建工具函数

运行 `npm run build` 验证... ✓ 构建通过

准备好执行阶段 2 了吗？

You: 先看看阶段 1 的改动

Claude: [展示 diff]

You: 没问题，继续阶段 2

Claude: [执行阶段 2]
````

> **提示:** 关键是在每个阶段后运行构建和测试。不要让 Claude 一口气执行所有阶段——出了问题很难定位。

### 技巧 18：粘贴错误堆栈诊断

直接粘贴完整的错误信息，Claude 能精准定位根因并修复。

````bash
$ claude

You: 运行测试时报错了，帮我看看：

 FAIL  src/services/order.test.ts
  ● OrderService › createOrder › should calculate total with discount

    Expected: 85
    Received: 100

      48 |     const total = service.calculateTotal(items, discount)
      49 |     // items: [{price: 50, qty: 2}], discount: {type: 'percentage', value: 15}
    > 50 |     expect(total).toBe(85)
         |                    ^
      51 |   })
      52 | })

Claude wants to:
  • Read file: src/services/order.ts

Allow? [y/n/always/never]

You: y

Claude: [读取 order.ts]

找到问题了！在 `calculateTotal` 方法中：

```typescript
// 第 23 行：折扣计算错误
return subtotal - discount.value  // 这里把百分比当固定金额减了
```

应该改为：

```typescript
return subtotal * (1 - discount.value / 100)
```

Claude wants to:
  • Edit file: src/services/order.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ 已修复折扣计算逻辑。50 * 2 * (1 - 15/100) = 85 ✓
````

> **提示:** 粘贴完整的错误堆栈比描述 "测试失败了" 有用得多。包含行号和上下文，Claude 能直接定位到问题代码。

### 技巧 19：语义代码搜索

用自然语言描述你要找的代码模式，Claude 会语义搜索而不仅是文本匹配。

````bash
$ claude

You: 找出项目中所有可能在未登录状态下执行的数据库写操作

Claude: [语义搜索整个代码库]

找到了 4 个可能缺少认证检查的数据库写操作：

1. **src/api/comments.ts:28** — createComment
   问题：没有验证用户是否登录就直接写入评论
   建议：添加 auth middleware

2. **src/api/feedback.ts:15** — submitFeedback
   问题：feedback 路由没有认证中间件
   建议：至少验证 session

3. **src/api/analytics.ts:42** — trackEvent
   问题：虽然 trackEvent 不需要登录，但缺少 rate limiting
   建议：添加 IP 限流

4. **src/utils/migration.ts:87** — migrateData
   问题：迁移脚本跳过了认证（可能是故意的）
   建议：确认是否为内部脚本，如果是则忽略

要修复哪些？
````

> **提示:** 语义搜索能找到 "处理用户输入" 这样的概念，而不仅仅是 `input` 关键字。非常适合安全审计和代码审查场景。

## 分类 6：高级工作流

### 技巧 20：影响分析

在修改代码前，先让 Claude 分析修改的波及范围。

````bash
$ claude

You: 如果把 src/types/api.ts 里的 ApiResponse<T> 的 data 字段从 T 改成 T | null，
会影响多少文件？

Claude: [分析影响范围]

## 影响分析：ApiResponse.data: T → T | null

### 直接影响（6 个文件）
1. src/api/users.ts:32 — `response.data.name` 需要空值检查
2. src/api/products.ts:45 — `response.data.price` 需要空值检查
3. src/api/orders.ts:18 — 解构 `{ data }` 后需要 null guard
4. src/components/UserList.tsx:56 — 渲染 data.name 需要兜底
5. src/components/ProductGrid.tsx:23 — 同上
6. src/components/OrderHistory.tsx:41 — 同上

### 间接影响（可能需要调整）
7. tests/api/users.test.ts — 测试断言需要更新
8. tests/api/products.test.ts — 同上
9. src/hooks/useApi.ts — 通用 hook 可能需要调整类型

### 风险评估
- 修改范围：中等（9 个文件）
- 破坏性：低（TypeScript 会在编译时捕获遗漏）
- 建议：改完后运行 `tsc --noEmit` 验证

要执行这个修改吗？
````

> **提示:** 影响分析特别适合在 PR Review 之前做。先评估范围再决定是否值得改，比改到一半发现影响太大要好。

### 技巧 21：管道结合 Claude

用 Unix 管道将其他命令的输出传给 Claude 分析。

````bash
$ git diff main..feature/new-auth | claude ask "审查这个分支的所有变更，重点关注安全问题"

审查了 12 个文件的变更：

## 安全问题
1. **src/api/auth.ts** — 新增的 token 端点缺少 rate limiting
2. **src/middleware/auth.ts** — JWT secret 从环境变量读取但无 fallback 验证

## 建议
- 添加 express-rate-limit 到 token 端点
- 在启动时验证 JWT_SECRET 是否设置

$ cat /var/log/app/error.log | tail -100 | claude ask "分析最近的错误日志，找出根本原因"

分析了最近 100 条错误日志：

## 主要问题
1. **数据库连接超时**（占 68%）— 23:00-01:00 集中爆发
   根因：连接池大小 (10) 无法应对夜间批处理峰值
   建议：增大到 25，或添加连接队列

2. **Redis 连接重置**（占 22%）— 随机分布
   根因：Redis 服务器内存不足触发 eviction
   建议：增加 Redis 内存或设置 TTL 策略

3. **第三方 API 超时**（占 10%）— Stripe webhook
   根因：Stripe 响应时间 > 30s
   建议：添加重试机制和 circuit breaker
````

> **提示:** `claude ask` 是非交互式的快捷命令，输出直接打印到终端。适合代码审查、日志分析、diff 审查等一次性任务。

### 技巧 22：Headless 自动化脚本

将 Claude 嵌入 Makefile、pre-commit hook 或 CI 脚本中实现自动化。

````bash
$ cat Makefile

.PHONY: review lint-fix release-notes

# 代码审查：提交前自动审查变更
review:
	@git diff --cached --name-only | grep -E '\.(ts|tsx|js|jsx)$$' | \
		xargs claude --headless "审查这些文件的变更，只输出需要关注的问题，如果没有问题就输出 LGTM"

# 自动修复 lint 错误
lint-fix:
	@claude --headless "运行 npx eslint src/ --format json，然后修复所有 auto-fixable 的问题"

# 生成本周 release notes
release-notes:
	@git log --oneline --since="last monday" | \
		claude --headless "根据这些 commit 生成用户友好的 release notes，用中文，按功能分组"

$ cat .git/hooks/pre-commit

#!/bin/bash
# Claude 自动审查暂存文件
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -n "$STAGED_FILES" ]; then
    echo "🔍 Claude 审查中..."
    RESULT=$(echo "$STAGED_FILES" | \
        xargs claude --headless "审查这些文件，检查是否有安全漏洞或明显的 bug。如果有严重问题只输出 ISSUE: <描述>，否则输出 OK")

    if echo "$RESULT" | grep -q "ISSUE:"; then
        echo "⚠️  发现潜在问题："
        echo "$RESULT"
        echo ""
        read -p "仍然要提交吗？[y/N] " -r
        [[ ! $REPLY =~ ^[Yy]$$ ]] && exit 1
    fi
fi

$ make review

🔍 Claude 审查中...
LGTM — 所有变更看起来没有问题。
````

> **提示:** Headless 模式默认超时 2 分钟。对于大型代码库，设置 `--timeout` 增加超时时间：`claude --headless --timeout 300 "..."`。
