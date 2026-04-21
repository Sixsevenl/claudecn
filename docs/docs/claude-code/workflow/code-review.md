---
title: "代码审查工作流"
---

# 代码审查工作流

使用 Claude Code 进行高效的代码审查和质量检查。

## 基本代码审查

```bash
# 启动 Claude Code
claude

# 审查单个文件
You: 审查 src/auth/login.ts，检查安全问题和代码质量

Claude: 让我审查这个文件。

Claude wants to:
  • Read file: src/auth/login.ts
Allow? [y/n/always/never]

You: y

Claude: 代码审查报告：

安全问题：
1. [严重] 第 23 行：密码未加密存储
   ```typescript
   await db.users.create({ password: plainPassword });
   ```
   建议：使用 bcrypt 哈希密码

2. [高] 第 45 行：SQL 注入风险
   ```typescript
   const query = `SELECT * FROM users WHERE email = '${email}'`;
   ```
   建议：使用参数化查询

代码质量：
1. [中] 第 12 行：缺少错误处理
2. [低] 第 67 行：变量命名不清晰 (usr -> user)
3. [低] 第 89 行：注释的代码应该删除

性能问题：
1. [中] 第 34 行：同步操作阻塞主线程

是否生成修复建议？
```

## Git 提交审查

```bash
You: 审查最近的提交

Claude: 让我检查最近的提交。

Claude wants to:
  • Run command: git log -1 --stat
  • Run command: git diff HEAD~1
Allow? [y/n/always/never]

You: y

Claude: 提交审查：

提交信息：feat: add user authentication
作者：John Doe
时间：2026-04-16 10:30:45

修改文件：
- src/auth/login.ts (新增 120 行)
- src/auth/register.ts (新增 95 行)
- src/middleware/auth.ts (修改 23 行)
- tests/auth.test.ts (新增 67 行)

代码审查发现：

优点：
✓ 添加了单元测试
✓ 代码结构清晰
✓ 使用 TypeScript 类型

问题：
✗ 缺少输入验证
✗ 错误处理不完整
✗ 未更新文档

建议：
1. 添加输入验证中间件
2. 完善错误处理逻辑
3. 更新 API 文档

是否需要详细的修改建议？
```

## Pull Request 审查

```bash
You: 审查 PR #123

Claude: 让我获取 PR 信息。

Claude wants to:
  • Run command: gh pr view 123
  • Run command: gh pr diff 123
Allow? [y/n/always/never]

You: y

Claude: PR #123 审查报告：

标题：Implement payment processing
作者：jane-dev
状态：Open
分支：feature/payment -> main

修改统计：
- 文件数：12
- 新增：456 行
- 删除：89 行
- 修改文件：
  - src/payment/processor.ts
  - src/payment/stripe.ts
  - src/payment/paypal.ts
  - src/models/Transaction.ts
  - tests/payment.test.ts

代码审查：

架构设计：
✓ 良好的抽象层
✓ 支持多个支付网关
✓ 使用策略模式

安全性：
✗ API 密钥硬编码（processor.ts:12）
✗ 缺少金额验证（stripe.ts:45）
⚠ 需要添加请求签名验证

测试覆盖：
✓ 单元测试完整
✗ 缺少集成测试
⚠ 需要添加错误场景测试

文档：
✗ 缺少 API 文档
✗ 未更新 README

建议：
1. 移除硬编码的 API 密钥
2. 添加金额验证
3. 补充集成测试
4. 更新文档

总体评价：需要修改后再合并

是否生成详细的修改清单？
```

## 批量文件审查

```bash
You: 审查 src/api 目录下的所有文件

Claude: 让我审查整个目录。

Claude wants to:
  • Run command: find src/api -name "*.ts" -type f
Allow? [y/n/always/never]

You: y

Claude: 找到 15 个文件，开始审查。

Claude wants to:
  • Read file: src/api/users.ts
  • Read file: src/api/orders.ts
  • Read file: src/api/products.ts
  [... 其他文件]
Allow? [y/n/always/never]

You: always

Claude: 批量审查完成。

总体统计：
- 审查文件：15
- 发现问题：47
- 严重：3
- 高：8
- 中：15
- 低：21

主要问题：

严重问题（需立即修复）：
1. users.ts:34 - SQL 注入风险
2. orders.ts:67 - 未授权访问漏洞
3. products.ts:89 - 敏感信息泄露

高优先级问题：
1. 缺少速率限制（8 个端点）
2. 错误处理不一致（12 处）
3. 缺少输入验证（15 处）

代码质量问题：
1. 重复代码（23%）
2. 函数过长（平均 85 行）
3. 缺少注释（67%）

是否生成详细报告？
```

## 代码风格检查

```bash
You: 检查代码风格是否符合规范

Claude: 让我运行 linter。

Claude wants to:
  • Run command: npm run lint
Allow? [y/n/always/never]

You: y

Claude: ESLint 检查结果：

错误：12
警告：34
文件：45

主要问题：

错误：
1. src/utils/format.ts:23
   'console.log' is not allowed

2. src/api/users.ts:45
   Missing return type on function

3. src/components/Button.tsx:67
   'any' type is not allowed

警告：
1. 未使用的变量：15 处
2. 未使用的导入：8 处
3. 缺少类型注解：11 处

Claude wants to:
  • Run command: npm run lint -- --fix
Allow? [y/n/always/never]

You: y

Claude: 自动修复完成。

修复的问题：
- 删除未使用的导入：8 处
- 格式化代码：23 处
- 添加分号：12 处

仍需手动修复：
- 移除 console.log：12 处
- 添加返回类型：5 处
- 替换 any 类型：3 处

是否生成修复指南？
```

## 性能审查

```bash
You: 审查性能问题

Claude: 让我分析性能。

Claude wants to:
  • Read file: src/components/DataTable.tsx
  • Read file: src/hooks/useData.ts
  • Read file: src/api/queries.ts
Allow? [y/n/always/never]

You: y

Claude: 性能审查报告：

发现的性能问题：

严重性能问题：
1. DataTable.tsx:45
   问题：渲染 10000 行数据导致页面卡顿
   影响：首次渲染 3.5 秒
   建议：使用虚拟滚动（react-window）

2. useData.ts:67
   问题：每次渲染都创建新对象
   影响：导致子组件不必要的重渲染
   建议：使用 useMemo 缓存

3. queries.ts:89
   问题：N+1 查询问题
   影响：数据库查询 1000+ 次
   建议：使用 JOIN 或 DataLoader

中等性能问题：
1. 缺少代码分割（bundle 大小 2.5MB）
2. 图片未优化（平均 1.2MB）
3. 未使用 CDN

优化建议：
1. 实现虚拟滚动
2. 添加 React.memo
3. 优化数据库查询
4. 代码分割
5. 图片压缩

预期改善：
- 首次加载：3.5s → 0.8s
- 交互响应：500ms → 50ms
- Bundle 大小：2.5MB → 800KB

是否生成优化代码？
```

## 安全审查

```bash
You: 进行安全审查

Claude: 让我进行安全扫描。

Claude wants to:
  • Run command: npm audit
  • Read file: src/auth/middleware.ts
  • Read file: src/api/routes.ts
Allow? [y/n/always/never]

You: y

Claude: 安全审查报告：

依赖漏洞：
- 严重：2
- 高：5
- 中：12
- 低：23

严重漏洞：
1. lodash@4.17.15
   漏洞：原型污染
   CVE：CVE-2020-8203
   修复：升级到 4.17.21

2. axios@0.21.0
   漏洞：SSRF
   CVE：CVE-2021-3749
   修复：升级到 0.21.4

代码安全问题：

严重：
1. middleware.ts:23 - JWT 密钥硬编码
2. routes.ts:45 - 缺少 CSRF 保护
3. auth.ts:67 - 密码明文传输

高：
1. 缺少速率限制
2. 未验证文件上传类型
3. 敏感数据记录到日志

修复建议：
1. 立即修复严重漏洞
2. 使用环境变量存储密钥
3. 实现 CSRF 保护
4. 添加 HTTPS 强制
5. 实现速率限制

是否生成修复脚本？
```

## 测试覆盖率审查

```bash
You: 检查测试覆盖率

Claude: 让我运行测试覆盖率。

Claude wants to:
  • Run command: npm run test:coverage
Allow? [y/n/always/never]

You: y

Claude: 测试覆盖率报告：

总体覆盖率：
- 语句：67.8%
- 分支：54.3%
- 函数：71.2%
- 行：68.5%

文件覆盖率：

高覆盖率（>80%）：
✓ src/utils/format.ts - 95.2%
✓ src/hooks/useAuth.ts - 88.7%
✓ src/components/Button.tsx - 82.3%

低覆盖率（<50%）：
✗ src/api/payment.ts - 23.4%
✗ src/services/email.ts - 31.2%
✗ src/middleware/auth.ts - 45.6%

未测试的关键功能：
1. 支付处理逻辑
2. 邮件发送功能
3. 认证中间件

建议：
1. 优先为支付模块添加测试
2. 添加集成测试
3. 提高分支覆盖率到 70%+

是否生成测试模板？
```

## 使用 Plan Mode

```bash
# 按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 全面审查整个项目

Claude: 项目审查计划：

阶段 1：代码质量（1-2 小时）
- 运行 ESLint 检查
- 检查代码风格一致性
- 识别重复代码
- 检查命名规范

阶段 2：安全审查（2-3 小时）
- 扫描依赖漏洞
- 检查认证授权
- 审查敏感数据处理
- 检查 API 安全

阶段 3：性能分析（1-2 小时）
- 分析 bundle 大小
- 检查渲染性能
- 审查数据库查询
- 识别内存泄漏

阶段 4：测试覆盖（2-3 小时）
- 运行测试覆盖率
- 识别未测试代码
- 检查测试质量
- 添加缺失测试

阶段 5：文档审查（1 小时）
- 检查 API 文档
- 审查代码注释
- 更新 README
- 检查示例代码

总预计时间：7-11 小时

是否开始执行？
```

## 自动化审查工作流

```bash
You: 创建自动化代码审查脚本

Claude: 我会创建审查脚本。

Claude wants to:
  • Write file: scripts/code-review.sh
Allow? [y/n/always/never]

You: y

Claude: 已创建审查脚本：

```bash
#!/bin/bash

echo "开始代码审查..."
echo "===================="

# 1. 代码风格检查
echo "\n1. 运行 ESLint..."
npm run lint

# 2. 类型检查
echo "\n2. 运行 TypeScript 检查..."
npm run type-check

# 3. 测试
echo "\n3. 运行测试..."
npm run test

# 4. 测试覆盖率
echo "\n4. 检查测试覆盖率..."
npm run test:coverage

# 5. 安全扫描
echo "\n5. 扫描依赖漏洞..."
npm audit

# 6. Bundle 分析
echo "\n6. 分析 Bundle 大小..."
npm run build -- --analyze

# 7. 生成报告
echo "\n7. 生成审查报告..."
echo "审查完成时间: $(date)" > review-report.txt
echo "===================="
echo "审查完成！查看 review-report.txt"
```

使用方式：
```bash
chmod +x scripts/code-review.sh
./scripts/code-review.sh
```

需要添加到 CI/CD 吗？
```

## 常用命令

```bash
/model opus    # 深度代码审查使用 Opus
/fast          # 快速检查使用快速模式
/cost          # 查看使用成本
```

## 最佳实践

1. **定期审查**：每周进行一次全面审查
2. **自动化检查**：集成到 CI/CD 流程
3. **优先级排序**：先修复严重问题
4. **文档记录**：保存审查报告
5. **团队协作**：分享审查发现
