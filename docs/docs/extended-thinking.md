---
title: "扩展思维"
---

# 扩展思维

扩展思维模式让 Claude 在回答复杂问题前进行更深入的思考，提供更准确和全面的解决方案。

## 基本用法

```bash
# 启动 Claude Code
claude

# 请求复杂的分析任务
You: 分析这个算法的时间复杂度，并提出优化建议

Claude: 让我仔细思考这个问题...

[思考过程]
1. 首先分析当前实现的结构
2. 识别嵌套循环和递归调用
3. 计算最坏情况的时间复杂度
4. 考虑可能的优化策略
5. 评估每种优化的权衡

Claude: 经过分析，当前算法的时间复杂度是 O(n²)...
```

## 启用扩展思维

```bash
You: /model opus

Claude: 已切换到 Opus 4.6 模型

You: 使用扩展思维模式分析这个架构设计

Claude: [进入深度思考模式]

思考步骤：
1. 理解当前架构的核心组件
2. 分析组件之间的依赖关系
3. 识别潜在的瓶颈和单点故障
4. 考虑可扩展性和维护性
5. 评估安全性和性能影响
6. 提出改进建议

[详细分析结果...]
```

## 复杂问题求解

```bash
You: 我的应用在高并发下性能下降，帮我找出原因

Claude: 这需要系统性的分析，让我深入思考...

Claude wants to:
  • Read file: src/server.ts
  • Read file: src/database/connection.ts
  • Read file: src/middleware/auth.ts
Allow? [y/n/always/never]

You: always

Claude: [扩展思维分析]

第一步：检查服务器配置
- 发现：单线程处理所有请求
- 影响：CPU 利用率低，响应时间长

第二步：分析数据库连接
- 发现：连接池大小仅为 5
- 影响：高并发时连接等待

第三步：检查中间件
- 发现：每个请求都重新验证 JWT
- 影响：不必要的计算开销

第四步：综合评估
问题根源：
1. 缺少集群模式
2. 数据库连接池太小
3. 缺少缓存机制

建议的优化方案：
1. 启用 Node.js 集群模式
2. 增加连接池到 20-50
3. 添加 Redis 缓存 JWT 验证结果
4. 实现请求限流

预期改善：
- 吞吐量提升 5-10 倍
- 响应时间减少 60-80%
```

## 架构设计评审

```bash
You: 评审这个微服务架构设计，指出潜在问题

Claude: 让我进行全面的架构分析...

Claude wants to:
  • Read file: docs/architecture.md
  • Read file: docker-compose.yml
  • Read file: kubernetes/deployment.yaml
Allow? [y/n/always/never]

You: y

Claude: [深度思考中...]

架构评审报告：

1. 服务拆分分析
   ✓ 优点：服务边界清晰
   ✗ 问题：用户服务和订单服务耦合度高
   建议：考虑合并或使用事件驱动解耦

2. 数据一致性
   ✗ 问题：缺少分布式事务处理
   建议：实现 Saga 模式或使用消息队列

3. 服务发现
   ✓ 优点：使用 Kubernetes 服务发现
   ⚠️ 注意：需要配置健康检查

4. 可观测性
   ✗ 问题：缺少统一的日志和监控
   建议：集成 ELK 或 Prometheus + Grafana

5. 安全性
   ✗ 问题：服务间通信未加密
   建议：实现 mTLS 或使用服务网格

6. 扩展性
   ✓ 优点：支持水平扩展
   ⚠️ 注意：数据库可能成为瓶颈

优先级建议：
高：数据一致性、安全性
中：可观测性、服务解耦
低：性能优化
```

## 代码重构建议

```bash
You: 这段代码需要重构，给我详细的重构方案

Claude: 让我深入分析代码质量...

Claude wants to:
  • Read file: src/services/UserService.ts
Allow? [y/n/always/never]

You: y

Claude: [扩展思维分析]

当前代码问题：

1. 职责过多（违反单一职责原则）
   - 用户验证
   - 数据库操作
   - 邮件发送
   - 日志记录

2. 缺少错误处理
   - 数据库错误未捕获
   - 网络错误未处理

3. 硬编码配置
   - 邮件服务器地址
   - 数据库连接字符串

4. 缺少测试
   - 无单元测试
   - 依赖难以模拟

重构方案：

步骤 1：拆分职责
```typescript
// 创建独立的服务类
class UserRepository {
  // 只负责数据库操作
}

class EmailService {
  // 只负责邮件发送
}

class UserValidator {
  // 只负责验证逻辑
}
```

步骤 2：依赖注入
```typescript
class UserService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService,
    private validator: UserValidator
  ) {}
}
```

步骤 3：配置外部化
```typescript
// 使用环境变量
const config = {
  email: process.env.EMAIL_SERVER,
  db: process.env.DATABASE_URL
}
```

步骤 4：添加错误处理
```typescript
try {
  await this.userRepo.save(user);
} catch (error) {
  logger.error('Failed to save user', error);
  throw new UserServiceError('Save failed');
}
```

是否执行此重构方案？
```

## 性能优化分析

```bash
You: 分析这个查询的性能问题并优化

Claude: 让我进行性能分析...

Claude wants to:
  • Read file: src/queries/getUserOrders.ts
  • Read file: prisma/schema.prisma
Allow? [y/n/always/never]

You: y

Claude: [深度性能分析]

当前查询分析：

```sql
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
WHERE u.id = ?
```

问题识别：

1. N+1 查询问题
   - 每个订单都触发额外查询
   - 预计：100 个订单 = 100+ 次查询

2. 选择所有字段
   - 传输不必要的数据
   - 影响：网络和内存开销

3. 缺少索引
   - orders.user_id 无索引
   - order_items.order_id 无索引

4. 未使用分页
   - 一次加载所有数据
   - 大用户数据量巨大

优化方案：

方案 1：使用 JOIN 预加载
```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    orders: {
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    }
  }
});
```

方案 2：添加数据库索引
```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

方案 3：实现分页
```typescript
const orders = await prisma.order.findMany({
  where: { userId },
  take: 20,
  skip: page * 20,
  orderBy: { createdAt: 'desc' }
});
```

方案 4：选择必要字段
```typescript
select: {
  id: true,
  name: true,
  orders: {
    select: {
      id: true,
      total: true,
      createdAt: true
    }
  }
}
```

预期改善：
- 查询时间：从 2000ms 降至 50ms
- 内存使用：减少 80%
- 数据库负载：减少 95%
```

## 安全审计

```bash
You: 审计这个 API 的安全性

Claude: 让我进行全面的安全审计...

Claude wants to:
  • Read file: src/api/routes/auth.ts
  • Read file: src/middleware/auth.ts
  • Read file: src/config/security.ts
Allow? [y/n/always/never]

You: y

Claude: [安全审计分析]

发现的安全问题：

严重 🔴
1. SQL 注入风险
   位置：src/api/routes/user.ts:45
   ```typescript
   const query = `SELECT * FROM users WHERE email = '${email}'`;
   ```
   修复：使用参数化查询

2. 密码明文存储
   位置：src/models/User.ts:23
   修复：使用 bcrypt 哈希

3. 缺少 CSRF 保护
   位置：所有 POST 端点
   修复：实现 CSRF token

高 🟠
4. JWT 无过期时间
   位置：src/middleware/auth.ts:12
   修复：设置合理的过期时间

5. 敏感信息泄露
   位置：错误响应包含堆栈跟踪
   修复：生产环境隐藏详细错误

6. 缺少速率限制
   位置：登录端点
   修复：实现 rate limiting

中 🟡
7. 弱密码策略
   修复：要求最小长度和复杂度

8. 缺少 HTTPS 强制
   修复：添加 HSTS 头

修复优先级：
1. 立即修复：SQL 注入、密码存储
2. 本周修复：CSRF、JWT 过期
3. 本月修复：其他问题

是否生成修复代码？
```

## 使用 Plan Mode

```bash
# 按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 重构整个认证系统，使用最佳实践

Claude: [扩展思维 + 计划模式]

重构计划：

阶段 1：准备工作（1-2 小时）
- 备份当前代码
- 创建新分支
- 安装必要依赖（bcrypt, jsonwebtoken, express-rate-limit）

阶段 2：数据模型更新（2-3 小时）
- 添加密码哈希字段
- 添加刷新令牌表
- 添加登录尝试记录表
- 运行数据库迁移

阶段 3：核心功能实现（4-6 小时）
- 实现密码哈希服务
- 实现 JWT 生成和验证
- 实现刷新令牌机制
- 添加速率限制中间件

阶段 4：安全加固（2-3 小时）
- 添加 CSRF 保护
- 实现账户锁定机制
- 添加审计日志
- 配置安全响应头

阶段 5：测试（3-4 小时）
- 编写单元测试
- 编写集成测试
- 进行安全测试
- 性能测试

阶段 6：部署（1-2 小时）
- 更新环境变量
- 部署到测试环境
- 验证功能
- 部署到生产环境

总预计时间：13-20 小时

风险评估：
- 高：数据库迁移可能影响现有用户
- 中：JWT 更改需要用户重新登录
- 低：性能影响

是否开始执行？
```

## 常用命令

```bash
/model opus    # 使用 Opus 4.6 获得最佳思考能力
/fast          # 快速模式（较少思考时间）
/cost          # 查看使用成本
```

## 快捷键

- `Shift+Tab` - 切换到 Plan Mode 查看详细计划
- `Ctrl+C` - 中断思考过程

## 最佳实践

1. **复杂问题使用 Opus 模型**：更强的推理能力
2. **结合 Plan Mode**：先看计划，确认后执行
3. **提供充分上下文**：让 Claude 理解完整背景
4. **分步骤处理**：将大问题拆分成小问题

## 适用场景

- 架构设计和评审
- 性能优化分析
- 安全审计
- 复杂重构
- 算法优化
- 系统调试
- 技术选型
