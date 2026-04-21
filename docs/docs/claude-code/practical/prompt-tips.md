---
title: "提示词技巧"
---

# 提示词技巧

掌握有效的提示词技巧，让 Claude Code 更好地理解你的需求并提供精准的帮助。

## 基本原则

### 1. 明确具体

```bash
# ❌ 不好的提示词
You: 改进这个文件

# ✅ 好的提示词
You: 在 src/App.tsx 中添加错误边界，捕获组件渲染错误并显示友好的错误页面

Claude: 我会添加错误边界组件...

Claude wants to:
  • Read file: src/App.tsx
  • Write file: src/components/ErrorBoundary.tsx
  • Edit file: src/App.tsx
Allow? [y/n/always/never]

You: y

Claude: 已添加错误边界：
- 创建了 ErrorBoundary 组件
- 包装了主应用组件
- 添加了错误日志记录
```

### 2. 提供上下文

```bash
# ❌ 缺少上下文
You: 这个 bug 怎么修？

# ✅ 提供完整上下文
You: 用户登录后，刷新页面会丢失登录状态。我使用的是 JWT 存储在 localStorage。检查 src/auth/AuthContext.tsx 和 src/hooks/useAuth.ts

Claude: 让我检查认证流程...

Claude wants to:
  • Read file: src/auth/AuthContext.tsx
  • Read file: src/hooks/useAuth.ts
Allow? [y/n/always/never]

You: y

Claude: 找到问题了！

AuthContext 在初始化时没有从 localStorage 读取 token。

当前代码：
```typescript
const [user, setUser] = useState<User | null>(null);
```

应该改为：
```typescript
const [user, setUser] = useState<User | null>(() => {
  const token = localStorage.getItem('token');
  if (token) {
    return decodeToken(token);
  }
  return null;
});
```

是否应用此修复？
```

### 3. 分步骤处理

```bash
# ❌ 一次性要求太多
You: 创建一个完整的电商网站，包含用户认证、商品管理、购物车、支付、订单管理、后台管理系统

# ✅ 分步骤进行
You: 第一步：创建基础的 Next.js 项目结构，包含 TypeScript 和 Tailwind CSS

Claude: 我会创建项目基础...

[创建完成后]

You: 第二步：添加用户认证功能，使用 NextAuth.js

Claude: 我会集成 NextAuth.js...

[完成后]

You: 第三步：创建商品列表和详情页面

Claude: 我会创建商品相关页面...
```

## 高级技巧

### 使用角色定位

```bash
You: 作为一个资深的 React 开发者，审查 src/components/UserProfile.tsx 的性能问题，特别关注不必要的重渲染

Claude: 让我以性能优化的角度分析这个组件...

Claude wants to:
  • Read file: src/components/UserProfile.tsx
Allow? [y/n/always/never]

You: y

Claude: 性能问题分析：

1. 组件在父组件每次渲染时都会重新创建
   问题代码：
   ```typescript
   const handleClick = () => { ... }
   ```

   优化：使用 useCallback
   ```typescript
   const handleClick = useCallback(() => { ... }, [dependencies]);
   ```

2. 对象属性作为依赖导致无限循环
   问题代码：
   ```typescript
   useEffect(() => { ... }, [user.settings]);
   ```

   优化：使用具体的属性
   ```typescript
   useEffect(() => { ... }, [user.settings.theme]);
   ```

3. 缺少 memo 优化
   建议：导出时使用 React.memo

是否应用这些优化？
```

### 指定输出格式

```bash
You: 分析 package.json 中的依赖，以表格形式列出所有过时的包，包含当前版本、最新版本和更新类型（major/minor/patch）

Claude: 让我检查依赖版本...

Claude wants to:
  • Read file: package.json
  • Run command: npm outdated --json
Allow? [y/n/always/never]

You: y

Claude: 过时依赖分析：

| 包名 | 当前版本 | 最新版本 | 更新类型 | 说明 |
|------|---------|---------|---------|------|
| react | 18.2.0 | 18.3.1 | minor | 安全更新 |
| typescript | 4.9.5 | 5.4.5 | major | 破坏性更新 |
| eslint | 8.45.0 | 8.57.0 | minor | 功能更新 |
| axios | 1.4.0 | 1.6.8 | minor | 安全修复 |

建议更新优先级：
1. 高：axios（安全修复）
2. 中：react、eslint
3. 低：typescript（需要测试兼容性）

是否生成更新命令？
```

### 使用示例引导

```bash
You: 创建一个自定义 React Hook 用于数据获取，参考这个模式：

```typescript
const { data, loading, error } = useFetch('/api/users');
```

要求：
- 支持泛型
- 自动重试
- 缓存结果
- 取消请求

Claude: 我会创建一个功能完整的 useFetch Hook...

Claude wants to:
  • Write file: src/hooks/useFetch.ts
Allow? [y/n/always/never]

You: y

Claude: 已创建 useFetch Hook：

```typescript
import { useState, useEffect, useRef } from 'react';

interface UseFetchOptions {
  retry?: number;
  retryDelay?: number;
  cache?: boolean;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const cache = new Map<string, any>();

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const { retry = 3, retryDelay = 1000, cache: useCache = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController>();

  const fetchData = async (retryCount = 0) => {
    // 检查缓存
    if (useCache && cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();

      if (useCache) cache.set(url, result);

      setData(result);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;

      if (retryCount < retry) {
        setTimeout(() => fetchData(retryCount + 1), retryDelay);
      } else {
        setError(err as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return { data, loading, error, refetch: () => fetchData() };
}
```

使用示例：
```typescript
const { data, loading, error, refetch } = useFetch<User[]>('/api/users');
```

功能特性：
✓ TypeScript 泛型支持
✓ 自动重试（默认 3 次）
✓ 结果缓存
✓ 请求取消
✓ 手动重新获取
```

## 调试技巧

### 描述错误现象

```bash
You: 运行 npm start 后，浏览器显示 "Cannot GET /"，但控制台没有错误。检查 src/index.ts 和路由配置

Claude: 让我检查服务器配置...

Claude wants to:
  • Read file: src/index.ts
  • Read file: src/routes/index.ts
Allow? [y/n/always/never]

You: y

Claude: 找到问题了！

src/index.ts 中缺少静态文件服务：

当前代码：
```typescript
app.use('/api', apiRoutes);
app.listen(3000);
```

问题：没有处理根路径 "/"

解决方案：
```typescript
import path from 'path';

// 添加静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// API 路由
app.use('/api', apiRoutes);

// SPA 回退
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000);
```

是否应用此修复？
```

### 提供错误信息

```bash
You: 构建失败，错误信息：

```
Error: Cannot find module '@/components/Button'
Referenced from: src/pages/Home.tsx:5
```

检查导入路径配置

Claude: 让我检查路径别名配置...

Claude wants to:
  • Read file: tsconfig.json
  • Read file: vite.config.ts
  • Read file: src/pages/Home.tsx
Allow? [y/n/always/never]

You: y

Claude: 问题分析：

1. tsconfig.json 中有路径别名：
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. 但 vite.config.ts 中缺少对应配置：

需要添加：
```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

是否修复配置？

You: y

Claude: 已修复！现在 TypeScript 和 Vite 都能正确解析 @ 别名。
```

## 代码审查技巧

### 指定审查重点

```bash
You: 审查 src/api/payment.ts，重点关注：
1. 安全性（敏感信息处理）
2. 错误处理
3. 日志记录

Claude: 让我进行针对性审查...

Claude wants to:
  • Read file: src/api/payment.ts
Allow? [y/n/always/never]

You: y

Claude: 安全审查报告：

🔴 严重问题：

1. 支付密钥硬编码（第 12 行）
```typescript
const apiKey = 'sk_live_abc123';  // ❌ 不要硬编码
```

修复：
```typescript
const apiKey = process.env.PAYMENT_API_KEY;  // ✅ 使用环境变量
if (!apiKey) throw new Error('Payment API key not configured');
```

2. 敏感信息记录到日志（第 45 行）
```typescript
console.log('Payment data:', paymentData);  // ❌ 包含卡号
```

修复：
```typescript
console.log('Payment initiated:', {
  orderId: paymentData.orderId,
  amount: paymentData.amount
  // ✅ 不记录卡号
});
```

🟡 改进建议：

3. 缺少错误重试机制
4. 超时时间过长（30 秒）
5. 缺少请求幂等性处理

是否生成修复代码？
```

## 重构技巧

### 说明重构目标

```bash
You: 重构 src/utils/validation.ts，目标：
- 使用 Zod 替代手动验证
- 提高类型安全
- 减少重复代码
- 保持向后兼容

Claude: 让我进行重构...

Claude wants to:
  • Read file: src/utils/validation.ts
Allow? [y/n/always/never]

You: y

Claude: 重构方案：

当前代码（手动验证）：
```typescript
export function validateUser(data: any) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!data.password || data.password.length < 8) {
    throw new Error('Password too short');
  }
  return true;
}
```

重构后（使用 Zod）：
```typescript
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
  name: z.string().optional()
});

export type User = z.infer<typeof userSchema>;

// 新的验证函数
export function validateUser(data: unknown): User {
  return userSchema.parse(data);
}

// 向后兼容的包装器
export function validateUserLegacy(data: any): boolean {
  try {
    validateUser(data);
    return true;
  } catch {
    return false;
  }
}
```

优势：
✓ 类型安全（自动推导类型）
✓ 更好的错误信息
✓ 可复用的 schema
✓ 保持向后兼容

是否应用重构？
```

## 性能优化技巧

### 提供性能指标

```bash
You: 优化 src/components/DataTable.tsx，当前问题：
- 渲染 1000 行数据需要 3 秒
- 滚动时卡顿
- 内存占用 500MB

Claude: 让我分析性能瓶颈...

Claude wants to:
  • Read file: src/components/DataTable.tsx
Allow? [y/n/always/never]

You: y

Claude: 性能分析：

问题 1：一次性渲染所有行
```typescript
{data.map(row => <TableRow key={row.id} data={row} />)}
```

优化：使用虚拟滚动
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: data.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
  overscan: 5
});

{rowVirtualizer.getVirtualItems().map(virtualRow => (
  <TableRow
    key={data[virtualRow.index].id}
    data={data[virtualRow.index]}
  />
))}
```

问题 2：每行都创建新的事件处理器
```typescript
onClick={() => handleClick(row.id)}
```

优化：使用事件委托
```typescript
<tbody onClick={handleTableClick}>
  {/* rows */}
</tbody>

const handleTableClick = (e) => {
  const rowId = e.target.closest('tr')?.dataset.id;
  if (rowId) handleClick(rowId);
};
```

预期改善：
- 渲染时间：3s → 100ms
- 滚动：流畅 60fps
- 内存：500MB → 50MB

是否应用优化？
```

## 使用快捷键

```bash
# 按 Shift+Tab 切换到 Auto-Accept 模式
[底部显示: ⏵⏵ accept edits on]

You: 批量添加 TypeScript 类型注解

Claude: [自动执行，快速完成]

# 按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 大规模重构数据库层

Claude: [只显示计划，等待确认]
```

## 常用命令

```bash
/model opus    # 复杂任务使用 Opus
/fast          # 简单任务使用快速模式
/cost          # 监控使用成本
/clear         # 清空上下文，开始新任务
```

## 最佳实践总结

1. **明确具体**：说清楚要做什么，在哪个文件
2. **提供上下文**：说明背景和相关信息
3. **分步进行**：大任务拆分成小步骤
4. **使用示例**：提供期望的输出格式
5. **描述问题**：包含错误信息和现象
6. **指定重点**：说明关注的方面
7. **提供指标**：性能问题要有具体数据
8. **善用模式**：根据任务选择合适的权限模式
