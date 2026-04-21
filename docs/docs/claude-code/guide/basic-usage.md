---
title: "基础使用"
---

# 基础使用

掌握 Claude Code 的基本操作，让你能够高效完成日常开发任务。

## 文件操作

### 读取文件

Claude 可以自动读取项目文件：

```
You: 读取 src/App.tsx

Claude: 让我读取这个文件...
[显示文件内容和分析]
```

**批量读取**：

```
You: 读取 src/components/ 目录下的所有 .tsx 文件

Claude: 我来读取这些文件...
[读取并分析多个文件]
```

### 创建文件

```
You: 创建 src/utils/formatDate.ts，实现日期格式化函数

Claude: 我来创建这个文件...
[创建文件并写入代码]
```

### 修改文件

```
You: 在 src/App.tsx 的第 20 行后添加一个新的路由

Claude: 让我先读取文件看看现有结构...
[读取文件，定位位置，插入代码]
```

### 删除文件

```
You: 删除 src/legacy/oldComponent.tsx

Claude: 确认要删除这个文件吗？
You: 是的
Claude: 已删除文件
```

## 代码生成

### 组件生成

```
You: 创建一个 React 组件 ProductCard，props 包括：
- name: string
- price: number
- image: string
- onAddToCart: () => void

使用 TypeScript 和 TailwindCSS

Claude: 我来创建这个组件...
```

生成的代码：

```typescript
interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export function ProductCard({ name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <button
        onClick={onAddToCart}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        加入购物车
      </button>
    </div>
  );
}
```

### API 接口生成

```
You: 创建一个 Express API 接口 POST /api/users，
接收 { name, email, password }，
验证数据后保存到数据库，返回用户信息（不含密码）

Claude: 我来实现这个接口...
```

### 工具函数生成

```
You: 创建一个函数 debounce，实现防抖功能

Claude: 我来创建这个函数...
```

## 命令执行

### 运行测试

```
You: 运行所有测试

Claude: 执行 npm test...
[显示测试结果]
```

### 安装依赖

```
You: 安装 axios 和 @types/axios

Claude: 执行 npm install axios @types/axios...
[显示安装结果]
```

### 构建项目

```
You: 构建生产版本

Claude: 执行 npm run build...
[显示构建结果]
```

### Git 操作

```
You: 查看 git 状态

Claude: 执行 git status...
[显示状态]

You: 提交所有更改，commit 信息是 "Add user authentication"

Claude: 执行 git add . && git commit -m "Add user authentication"...
[显示提交结果]
```

## 代码分析

### 项目结构分析

```
You: 分析这个项目的结构

Claude: 让我读取项目文件...

这是一个 React + TypeScript 项目：

src/
├── components/     # React 组件
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── hooks/          # 自定义 Hooks
│   └── useAuth.ts
├── utils/          # 工具函数
│   └── api.ts
├── types/          # TypeScript 类型
│   └── index.ts
└── App.tsx         # 主应用

技术栈：
- React 18
- TypeScript 5
- Vite
- TailwindCSS
```

### 代码质量检查

```
You: 检查 src/utils/api.ts 的代码质量

Claude: 让我分析这个文件...

发现以下问题：
1. 缺少错误处理
2. 没有类型定义
3. 硬编码的 API 地址
4. 没有请求超时设置

建议改进：
[给出具体建议]
```

### 依赖分析

```
You: 分析项目的依赖关系

Claude: 让我读取 package.json...

生产依赖：
- react: ^18.2.0
- react-dom: ^18.2.0
- axios: ^1.6.0

开发依赖：
- typescript: ^5.0.0
- vite: ^5.0.0
- @types/react: ^18.2.0

建议：
- axios 可以升级到 1.7.0
- 考虑添加 eslint 和 prettier
```

## 调试技巧

### 添加日志

```
You: 在 src/auth/login.ts 的关键位置添加 console.log

Claude: 我来添加调试日志...
[在函数入口、关键分支、错误处理处添加日志]
```

### 错误追踪

```
You: 用户报告登录失败，控制台显示 "Network Error"。
帮我追踪问题

Claude: 让我分析登录流程...

1. 检查 API 地址配置
2. 检查网络请求代码
3. 检查错误处理

发现问题：API 地址配置错误...
[修复问题]
```

### 性能分析

```
You: 分析 src/components/DataTable.tsx 的性能问题

Claude: 让我读取这个组件...

发现性能问题：
1. 每次渲染都重新计算数据
2. 没有使用 React.memo
3. 没有虚拟滚动

建议优化：
[给出优化方案]
```

## 重构操作

### 提取函数

```
You: 将 src/App.tsx 中的用户验证逻辑提取为独立函数

Claude: 我来重构这部分代码...
[提取函数，更新调用]
```

### 重命名

```
You: 将所有的 getUserData 重命名为 fetchUserData

Claude: 我来批量重命名...
[搜索所有出现的地方，逐个重命名]
```

### 代码整理

```
You: 整理 src/utils/ 目录，将相关函数归类到不同文件

Claude: 让我分析现有函数...

建议结构：
- dateUtils.ts - 日期相关
- stringUtils.ts - 字符串相关
- arrayUtils.ts - 数组相关

开始重构...
[创建新文件，移动函数，更新导入]
```

## 测试相关

### 生成测试

```
You: 为 src/utils/formatDate.ts 生成单元测试

Claude: 我来创建测试文件...
```

生成的测试：

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('2024-01-15');
  });

  it('should handle invalid date', () => {
    expect(() => formatDate(null as any)).toThrow();
  });

  it('should support custom format', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date, 'MM/DD/YYYY')).toBe('01/15/2024');
  });
});
```

### 运行特定测试

```
You: 只运行 UserService 的测试

Claude: 执行 npm test UserService...
[显示测试结果]
```

### 修复失败的测试

```
You: UserService.test.ts 的第 3 个测试失败了，帮我修复

Claude: 让我先运行测试看看错误...
[分析错误，修复代码或测试]
```

## 文档生成

### 添加注释

```
You: 为 src/utils/encryption.ts 添加 JSDoc 注释

Claude: 我来添加文档注释...
```

### 生成 README

```
You: 为这个项目生成 README.md

Claude: 让我分析项目结构...
[生成包含安装、使用、API 文档的 README]
```

### API 文档

```
You: 为 src/api/ 目录下的所有接口生成 API 文档

Claude: 我来生成 API 文档...
[分析接口，生成 Markdown 文档]
```

## 快捷操作

### 快速修复

```
You: 修复 ESLint 报告的所有错误

Claude: 执行 npm run lint...
[查看错误，逐个修复]
```

### 格式化代码

```
You: 格式化所有 TypeScript 文件

Claude: 执行 npm run format...
[格式化代码]
```

### 更新依赖

```
You: 更新所有依赖到最新版本

Claude: 执行 npm update...
[更新依赖，检查是否有破坏性更改]
```

## 常用命令速查

### 内置命令

| 命令 | 说明 |
|------|------|
| `/help` | 查看帮助 |
| `/clear` | 清空对话历史 |
| `/quit` | 退出 Claude Code |
| `/model` | 切换模型 |
| `/cost` | 查看 API 成本 |
| `/agent` | 启动 Agent 模式 |
| `/plan` | 启动计划模式 |

### 文件操作

```bash
# 读取文件
You: 读取 [文件路径]

# 创建文件
You: 创建 [文件路径]，内容是 [描述]

# 修改文件
You: 修改 [文件路径]，[修改内容]

# 删除文件
You: 删除 [文件路径]
```

### 命令执行

```bash
# 运行命令
You: 运行 [命令]

# 安装依赖
You: 安装 [包名]

# 运行测试
You: 运行测试

# Git 操作
You: git [操作]
```

## 最佳实践

### 1. 明确指定文件路径

✅ 好：`修改 src/components/Button.tsx`
❌ 差：`修改 Button 组件`

### 2. 提供足够的上下文

✅ 好：`在登录表单中添加"记住我"复选框，使用 localStorage 保存状态`
❌ 差：`添加记住我功能`

### 3. 分步骤完成复杂任务

✅ 好：
```
1. 先创建用户模型
2. 然后添加 API 接口
3. 最后添加前端表单
```
❌ 差：`实现完整的用户管理功能`

### 4. 及时验证结果

```
You: 运行测试确认修改没有问题

Claude: 执行 npm test...
[显示测试结果]
```

### 5. 使用 CLAUDE.md

在项目根目录创建 `CLAUDE.md`，记录项目信息、代码规范、常用命令等。

## 下一步

- [上下文管理](/docs/claude-code/workflow/context-management) - 管理对话上下文
- [高效实践](/docs/claude-code/workflow/best-practices) - 提高工作效率
- [进阶功能](/docs/claude-code/advanced/skills) - 学习高级特性
- [提示词技巧](/docs/claude-code/practical/prompt-tips) - 更多提示词技巧
