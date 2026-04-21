---
title: "安全审查工作流"
---

# 安全审查工作流

安全是软件开发中不可忽视的重要环节。本指南介绍如何使用 Claude Code 建立系统化的安全审查工作流。

## 安全审查的重要性

### 常见安全问题

- 注入攻击（SQL、XSS、命令注入）
- 认证和授权缺陷
- 敏感数据泄露
- 不安全的配置
- 依赖包漏洞
- 加密问题
- 访问控制缺陷

### 安全审查的价值

- 及早发现安全问题
- 降低安全风险
- 保护用户数据
- 避免经济损失
- 维护品牌声誉

## 使用 Claude 进行安全审查

### 全面安全审查

对代码进行全面的安全审查：

```
作为安全审查员，审查这个 API 端点：
@src/api/users.ts

检查项：
1. 输入验证
2. 认证和授权
3. SQL 注入风险
4. XSS 风险
5. CSRF 防护
6. 敏感数据处理
7. 错误信息泄露
8. 速率限制

输出：
- 发现的问题（按严重程度）
- 详细说明
- 修复建议
- 代码示例
```

### 特定漏洞检查

检查特定类型的安全漏洞：

```
检查 SQL 注入漏洞：

文件：@src/services/database.ts

检查：
- 是否使用参数化查询
- 是否有字符串拼接
- 是否验证输入
- 是否使用 ORM

对每个问题：
- 指出具体位置
- 说明风险
- 提供修复方案
```

## 安全审查清单

### 输入验证

```markdown
## 输入验证检查

- [ ] 所有用户输入都经过验证
- [ ] 使用白名单而非黑名单
- [ ] 验证数据类型和格式
- [ ] 限制输入长度
- [ ] 验证文件上传
- [ ] 清理和转义输入
```

### 认证和授权

```markdown
## 认证授权检查

- [ ] 使用强密码策略
- [ ] 密码正确加密存储
- [ ] 实现会话管理
- [ ] 使用安全的令牌
- [ ] 实施权限检查
- [ ] 防止权限提升
- [ ] 实现账户锁定
```

### 数据保护

```markdown
## 数据保护检查

- [ ] 敏感数据加密存储
- [ ] 使用 HTTPS 传输
- [ ] 不在日志中记录敏感信息
- [ ] 实施数据脱敏
- [ ] 安全删除敏感数据
- [ ] 限制数据访问
```

### 会话管理

```markdown
## 会话管理检查

- [ ] 使用安全的会话 ID
- [ ] 设置合理的超时时间
- [ ] 登出时销毁会话
- [ ] 防止会话固定
- [ ] 使用 HttpOnly Cookie
- [ ] 使用 Secure Cookie
- [ ] 实施 CSRF 防护
```

## 常见漏洞检测

### SQL 注入

检测和修复 SQL 注入：

```
检测 SQL 注入漏洞：

❌ 不安全的代码：
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.query(query);

✅ 安全的代码：
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

或使用 ORM：
const user = await User.findById(userId);

检查项目中的所有数据库查询
```

### XSS 攻击

检测和修复 XSS 漏洞：

```
检测 XSS 漏洞：

❌ 不安全的代码：
<div dangerouslySetInnerHTML={{__html: userInput}} />

✅ 安全的代码：
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />

或直接使用文本：
<div>{userInput}</div>

检查所有渲染用户输入的地方
```

### CSRF 攻击

检测和修复 CSRF 漏洞：

```
检测 CSRF 漏洞：

检查：
1. 是否使用 CSRF 令牌
2. 是否验证 Origin/Referer
3. 是否使用 SameSite Cookie

实施 CSRF 防护：
- 使用 csurf 中间件
- 在表单中包含 CSRF 令牌
- 验证令牌

示例：
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

### 命令注入

检测和修复命令注入：

```
检测命令注入漏洞：

❌ 不安全的代码：
exec(`convert ${userFile} output.png`);

✅ 安全的代码：
import { execFile } from 'child_process';
execFile('convert', [userFile, 'output.png']);

或使用库：
import sharp from 'sharp';
await sharp(userFile).toFile('output.png');

检查所有执行系统命令的地方
```

### 路径遍历

检测和修复路径遍历漏洞：

```
检测路径遍历漏洞：

❌ 不安全的代码：
const filePath = path.join(__dirname, userInput);
fs.readFile(filePath);

✅ 安全的代码：
import path from 'path';
const filePath = path.join(__dirname, path.basename(userInput));
const realPath = fs.realpathSync(filePath);
if (!realPath.startsWith(__dirname)) {
  throw new Error('Invalid path');
}
fs.readFile(realPath);

检查所有文件操作
```

## 认证和授权审查

### 密码安全

审查密码处理：

```
审查密码安全：

检查：
1. 密码复杂度要求
2. 密码加密算法（bcrypt/argon2）
3. 盐值使用
4. 密码存储
5. 密码重置流程

❌ 不安全：
const hash = md5(password);

✅ 安全：
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash(password, 10);

验证：
const valid = await bcrypt.compare(password, hash);
```

### JWT 安全

审查 JWT 使用：

```
审查 JWT 安全：

检查：
1. 使用强密钥
2. 设置合理的过期时间
3. 验证签名
4. 不在 JWT 中存储敏感信息
5. 实施令牌撤销

示例：
import jwt from 'jsonwebtoken';

// 生成
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// 验证
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 权限控制

审查权限控制：

```
审查权限控制：

检查：
1. 是否实施最小权限原则
2. 是否验证每个操作的权限
3. 是否防止权限提升
4. 是否有角色管理

示例中间件：
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

使用：
app.delete('/api/users/:id',
  requirePermission('user:delete'),
  deleteUser
);
```

## 数据安全审查

### 敏感数据处理

审查敏感数据处理：

```
审查敏感数据处理：

检查：
1. 敏感数据是否加密
2. 是否在日志中记录
3. 是否在错误消息中暴露
4. 是否通过 HTTPS 传输
5. 是否有数据脱敏

示例：
// 加密
import crypto from 'crypto';
const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

// 日志脱敏
function sanitizeLog(data) {
  const sanitized = { ...data };
  if (sanitized.password) sanitized.password = '***';
  if (sanitized.creditCard) sanitized.creditCard = '****';
  return sanitized;
}
```

### 数据库安全

审查数据库安全：

```
审查数据库安全：

检查：
1. 使用参数化查询
2. 最小权限数据库用户
3. 加密敏感字段
4. 定期备份
5. 访问日志

配置示例：
// 数据库连接
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('/path/to/ca-cert.pem')
  }
});

// 查询
async function getUser(id) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}
```

## 依赖安全审查

### 依赖漏洞扫描

扫描依赖包漏洞：

```
扫描依赖包安全漏洞：

使用 npm audit：
npm audit

使用 Snyk：
npx snyk test

分析结果：
- 漏洞严重程度
- 影响的包
- 可用的修复版本
- 修复建议

生成报告：
- 高危漏洞列表
- 修复计划
- 无法修复的漏洞的缓解措施
```

### 依赖更新策略

制定依赖更新策略：

```
依赖更新策略：

原则：
1. 及时更新安全补丁
2. 定期更新依赖
3. 测试更新后的功能
4. 使用锁文件

流程：
1. 每周检查安全更新
2. 评估更新影响
3. 在测试环境验证
4. 部署到生产环境

自动化：
- 使用 Dependabot
- 配置自动 PR
- 设置 CI 测试
```

## 配置安全审查

### 环境变量

审查环境变量使用：

```
审查环境变量安全：

检查：
1. 敏感信息不在代码中
2. 使用 .env 文件
3. .env 在 .gitignore 中
4. 生产环境使用安全的配置管理

❌ 不安全：
const apiKey = 'sk-1234567890';

✅ 安全：
const apiKey = process.env.API_KEY;

.env 文件：
API_KEY=sk-1234567890
DB_PASSWORD=secure_password

.gitignore：
.env
.env.local
```

### 安全头

审查 HTTP 安全头：

```
审查 HTTP 安全头：

必需的安全头：
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security

实施：
import helmet from 'helmet';
app.use(helmet());

或手动设置：
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  next();
});
```

## 自动化安全审查

### CI/CD 集成

在 CI/CD 中集成安全检查：

```yaml
# .github/workflows/security.yml
name: Security Check

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: Run ESLint security plugin
        run: npm run lint:security

      - name: Run SAST
        uses: github/codeql-action/analyze@v2
```

### 定期安全扫描

建立定期扫描机制：

```
定期安全扫描计划：

每日：
- 依赖漏洞扫描
- 自动化安全测试

每周：
- 代码安全审查
- 配置审查

每月：
- 全面安全评估
- 渗透测试
- 安全培训

每季度：
- 安全策略审查
- 第三方安全审计
```

## 安全测试

### 安全测试用例

编写安全测试用例：

```typescript
describe('Security Tests', () => {
  describe('SQL Injection', () => {
    it('should prevent SQL injection in user query', async () => {
      const maliciousInput = "1' OR '1'='1";
      const result = await getUser(maliciousInput);
      expect(result).toBeNull();
    });
  });

  describe('XSS', () => {
    it('should sanitize user input', () => {
      const maliciousInput = '<script>alert("XSS")</script>';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).not.toContain('<script>');
    });
  });

  describe('Authentication', () => {
    it('should reject weak passwords', () => {
      const weakPassword = '123456';
      expect(() => validatePassword(weakPassword))
        .toThrow('Password too weak');
    });

    it('should hash passwords', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash).toMatch(/^\$2[aby]\$/);
    });
  });

  describe('Authorization', () => {
    it('should deny access without permission', async () => {
      const user = { id: 1, permissions: ['read'] };
      const canDelete = hasPermission(user, 'delete');
      expect(canDelete).toBe(false);
    });
  });
});
```

## 安全文档

### 安全策略文档

维护安全策略文档：

```markdown
# 安全策略

## 认证
- 使用 bcrypt 加密密码（cost factor: 10）
- JWT 令牌过期时间：1 小时
- 刷新令牌过期时间：7 天

## 授权
- 实施基于角色的访问控制（RBAC）
- 最小权限原则
- 所有 API 端点都需要权限检查

## 数据保护
- 敏感数据使用 AES-256-GCM 加密
- 所有通信使用 HTTPS
- 不在日志中记录敏感信息

## 输入验证
- 所有用户输入都必须验证
- 使用白名单验证
- 限制输入长度和格式

## 依赖管理
- 每周扫描依赖漏洞
- 及时更新安全补丁
- 使用锁文件固定版本

## 事件响应
- 安全事件报告流程
- 事件响应团队
- 恢复计划
```

### 安全审查报告

生成安全审查报告：

```markdown
# 安全审查报告

日期：2024-01-15
审查范围：用户认证模块

## 发现的问题

### 高危
1. SQL 注入风险
   - 位置：src/services/user.ts:45
   - 描述：使用字符串拼接构建查询
   - 修复：使用参数化查询

### 中危
2. 弱密码策略
   - 位置：src/utils/validation.ts:12
   - 描述：只要求 6 位密码
   - 修复：要求至少 8 位，包含大小写字母和数字

### 低危
3. 缺少速率限制
   - 位置：src/api/auth.ts
   - 描述：登录端点没有速率限制
   - 修复：添加速率限制中间件

## 修复计划
- 高危问题：立即修复
- 中危问题：本周内修复
- 低危问题：下个迭代修复

## 建议
- 实施定期安全培训
- 建立安全编码规范
- 增加自动化安全测试
```

## 最佳实践

1. 建立安全审查流程
2. 使用自动化工具
3. 定期安全培训
4. 及时更新依赖
5. 实施纵深防御
6. 记录安全决策
7. 定期安全评估
8. 建立事件响应机制

## 总结

有效的安全审查需要：

- 系统化的审查流程
- 全面的检查清单
- 自动化工具支持
- 持续的安全意识
- 及时的问题修复

通过 Claude Code 和安全工具，你可以建立完善的安全审查工作流，保护应用和用户数据的安全。
