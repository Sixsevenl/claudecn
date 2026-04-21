---
title: "Agent Skills 最佳实践"
---

# Agent Skills 最佳实践

本指南提供了创建和使用 Agent Skills 的最佳实践，帮助你构建高效、可维护的 Skills。

## Skill 设计原则

### 1. 单一职责原则

每个 Skill 应该专注于一个明确的任务。

**好的示例：**

```bash
# 创建专注的 Skill
cat > .claude/skills/test.md << 'EOF'
---
name: test
description: 运行项目测试套件
---

运行测试并生成报告：
1. 执行 npm test
2. 分析测试结果
3. 如果有失败，显示详细错误
EOF
```

**不好的示例：**

```markdown
---
name: do-everything
description: 测试、构建、部署和文档生成
---

做所有事情...
```

### 2. 清晰的命名

使用动词开头的简短名称，清楚表达 Skill 的功能。

```bash
# 好的命名示例
.claude/skills/
├── commit.md          # 创建 git 提交
├── review.md          # 代码审查
├── test.md            # 运行测试
├── deploy.md          # 部署应用
└── refactor.md        # 重构代码
```

**使用示例：**

```bash
You: /commit

Claude: 让我分析你的更改并创建提交...

Claude wants to:
  • Run command: git status
  • Run command: git diff
Allow? [y/n]

You: y

Claude: 建议的提交消息：
feat: Add user authentication system

- Implement JWT token generation
- Add login/logout endpoints
- Create user session middleware
```

### 3. 详细的描述

提供清晰的描述，说明 Skill 的用途和预期行为。

```markdown
---
name: optimize-images
description: 优化项目中的图片文件，减小体积并生成多种尺寸
---

图片优化流程：
1. 扫描 public/images 目录
2. 使用 sharp 压缩图片
3. 生成 webp 格式
4. 创建响应式尺寸（sm, md, lg）
5. 更新引用路径
```

## Skill 组织结构

### 按功能分类

```bash
# 创建分类目录结构
mkdir -p .claude/skills/{git,testing,deployment,code-quality}

# Git 相关 Skills
cat > .claude/skills/git/commit.md << 'EOF'
---
name: commit
description: 智能 git 提交
---

分析变更并生成语义化提交消息
EOF

cat > .claude/skills/git/sync.md << 'EOF'
---
name: sync
description: 同步远程分支
---

拉取最新代码并处理冲突
EOF

# 测试相关 Skills
cat > .claude/skills/testing/test-unit.md << 'EOF'
---
name: test-unit
description: 运行单元测试
---

执行单元测试套件
EOF
```

**使用示例：**

```bash
You: /commit

Claude: 正在分析 git 变更...

[git status 输出]
modified:   src/auth/login.ts
modified:   src/auth/middleware.ts
new file:   tests/auth.test.ts

Claude: 建议提交：
feat(auth): Add JWT authentication

- Implement token generation and validation
- Add authentication middleware
- Include comprehensive test coverage

是否使用此提交消息？[y/n]
```

### 共享配置

创建可重用的配置片段。

```bash
# 创建共享配置
cat > .claude/skills/_config.md << 'EOF'
---
name: _config
description: 共享配置（不直接调用）
---

## 项目配置

- 测试命令: npm test
- 构建命令: npm run build
- 代码检查: npm run lint
- 格式化: npm run format
EOF
```

## 参数化 Skills

### 使用参数增强灵活性

```bash
cat > .claude/skills/generate-component.md << 'EOF'
---
name: generate-component
description: 生成 React 组件模板
---

根据提供的组件名称生成：
1. 组件文件 (src/components/{name}.tsx)
2. 样式文件 (src/components/{name}.module.css)
3. 测试文件 (tests/components/{name}.test.tsx)
4. Storybook 故事 (src/stories/{name}.stories.tsx)

使用 TypeScript 和函数式组件。
EOF
```

**使用示例：**

```bash
You: /generate-component UserProfile

Claude: 正在生成 UserProfile 组件...

Claude wants to:
  • Create file: src/components/UserProfile.tsx
  • Create file: src/components/UserProfile.module.css
  • Create file: tests/components/UserProfile.test.tsx
  • Create file: src/stories/UserProfile.stories.tsx
Allow? [y/n]

You: y

Claude: 已创建 UserProfile 组件及相关文件：

src/components/UserProfile.tsx:
```typescript
import React from 'react';
import styles from './UserProfile.module.css';

interface UserProfileProps {
  name: string;
  email: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, email }) => {
  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};
```

所有文件已创建完成！
```

## 错误处理

### 优雅的失败处理

```bash
cat > .claude/skills/deploy.md << 'EOF'
---
name: deploy
description: 部署应用到生产环境
---

部署流程：
1. 检查当前分支是否为 main
2. 确认所有测试通过
3. 构建生产版本
4. 运行部署前检查
5. 执行部署命令
6. 验证部署状态

如果任何步骤失败，停止流程并报告错误。
EOF
```

**使用示例：**

```bash
You: /deploy

Claude: 开始部署流程...

检查当前分支...
✓ 当前在 main 分支

运行测试...
✗ 测试失败

错误：3 个测试用例失败
- auth.test.ts: Token validation failed
- user.test.ts: User creation timeout
- api.test.ts: API endpoint not responding

部署已取消。请修复测试后重试。
```

## 上下文感知

### 利用项目上下文

```bash
cat > .claude/skills/analyze-performance.md << 'EOF'
---
name: analyze-performance
description: 分析应用性能瓶颈
---

性能分析步骤：
1. 检测项目类型（React/Vue/Node.js）
2. 运行相应的性能分析工具
3. 识别慢速组件/函数
4. 检查包大小
5. 分析网络请求
6. 提供优化建议
EOF
```

**使用示例：**

```bash
You: /analyze-performance

Claude: 正在分析项目性能...

检测到 React 项目（使用 Vite）

运行构建分析...
✓ 构建完成

包大小分析：
- 总大小: 2.3 MB
- 最大依赖: moment.js (289 KB)
  建议：替换为 date-fns 或 dayjs

组件渲染分析：
- UserList 组件重渲染频繁
  建议：使用 React.memo 或 useMemo

优化建议：
1. 替换 moment.js 可减少 ~200KB
2. 实现虚拟滚动优化长列表
3. 使用代码分割延迟加载路由
```

## 组合 Skills

### 创建工作流

```bash
cat > .claude/skills/pre-commit.md << 'EOF'
---
name: pre-commit
description: 提交前检查流程
---

执行提交前检查：
1. 运行 linter
2. 运行类型检查
3. 运行测试
4. 检查代码格式
5. 如果全部通过，创建提交
EOF
```

**使用示例：**

```bash
You: /pre-commit

Claude: 执行提交前检查...

[1/4] 运行 ESLint...
✓ 无 lint 错误

[2/4] TypeScript 类型检查...
✓ 类型检查通过

[3/4] 运行测试...
✓ 所有测试通过 (24 passed)

[4/4] 检查代码格式...
✓ 代码格式正确

所有检查通过！准备创建提交。

建议的提交消息：
fix: Resolve user authentication timeout issue

是否继续？[y/n]
```

## 文档化

### 内联文档

```bash
cat > .claude/skills/setup-project.md << 'EOF'
---
name: setup-project
description: 初始化新项目环境
---

# 项目初始化

此 Skill 自动设置新项目的开发环境。

## 执行步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **创建环境配置**
   - 复制 .env.example 到 .env
   - 提示用户填写必要的环境变量

3. **初始化数据库**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

## 前置条件

- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6

## 使用方法

```bash
/setup-project
```
EOF
```

## 测试 Skills

### 验证 Skill 行为

```bash
# 创建测试 Skill
cat > .claude/skills/test-skill.md << 'EOF'
---
name: test-skill
description: 测试其他 Skills 的功能
---

测试指定的 Skill：
1. 验证 Skill 文件存在
2. 检查语法正确性
3. 模拟执行流程
4. 报告潜在问题
EOF
```

**使用示例：**

```bash
You: /test-skill commit

Claude: 测试 commit Skill...

✓ Skill 文件存在: .claude/skills/commit.md
✓ 前置元数据正确
✓ 描述清晰明确
✓ 包含执行步骤

模拟执行：
1. git status - 可执行
2. git diff - 可执行
3. 生成提交消息 - 逻辑清晰

测试通过！commit Skill 可以正常使用。
```

## 版本控制

### 管理 Skill 版本

```bash
# 将 Skills 纳入版本控制
cat > .gitignore << 'EOF'
# 排除个人 Skills
.claude/skills/personal/

# 包含团队共享 Skills
!.claude/skills/*.md
EOF

# 创建 Skills 变更日志
cat > .claude/skills/CHANGELOG.md << 'EOF'
# Skills 变更日志

## 2024-01-15

### 新增
- `deploy` - 自动化部署流程
- `analyze-performance` - 性能分析工具

### 修改
- `commit` - 改进提交消息生成算法
- `test` - 添加覆盖率报告

### 移除
- `old-deploy` - 已被新的 deploy Skill 替代
EOF
```

## 性能优化

### 缓存常用数据

```bash
cat > .claude/skills/analyze-deps.md << 'EOF'
---
name: analyze-deps
description: 分析项目依赖
---

依赖分析：
1. 读取 package.json
2. 检查过时的包
3. 识别安全漏洞
4. 查找未使用的依赖
5. 建议更新策略

缓存分析结果 24 小时。
EOF
```

**使用示例：**

```bash
You: /analyze-deps

Claude: 分析项目依赖...

读取 package.json...
✓ 找到 45 个依赖

检查更新...
过时的包：
- react: 18.2.0 → 18.3.1
- typescript: 5.0.4 → 5.3.3
- vite: 4.3.9 → 5.0.10

安全检查...
✓ 未发现安全漏洞

未使用的依赖：
- lodash (可以移除)
- moment (建议替换为 date-fns)

建议：
1. 更新 React 到最新版本
2. 升级 Vite 到 v5（注意破坏性变更）
3. 移除未使用的依赖可减少 ~400KB
```

## 团队协作

### 共享 Skills 库

```bash
# 创建团队 Skills 仓库
mkdir -p team-skills
cd team-skills

# 初始化 git
git init
git remote add origin https://github.com/your-org/claude-skills.git

# 创建 README
cat > README.md << 'EOF'
# 团队 Claude Skills

我们团队的共享 Skills 集合。

## 安装

```bash
# 克隆到项目
git clone https://github.com/your-org/claude-skills.git .claude/skills
```

## Skills 列表

- `commit` - 智能提交
- `review` - 代码审查
- `deploy` - 自动部署
- `test` - 测试套件

## 贡献

请阅读 CONTRIBUTING.md
EOF

# 推送到远程
git add .
git commit -m "Initial skills collection"
git push -u origin main
```

### 使用团队 Skills

```bash
# 在新项目中
cd my-project

# 克隆团队 Skills
git clone https://github.com/your-org/claude-skills.git .claude/skills

# 使用团队 Skill
You: /review src/auth.ts

Claude: 使用团队代码审查标准...

审查 src/auth.ts：

✓ 代码风格符合团队规范
✓ 类型定义完整
✗ 缺少错误处理

建议：
1. 在 login 函数中添加 try-catch
2. 验证输入参数
3. 添加日志记录

代码质量评分：B+
```

## 安全考虑

### 敏感信息处理

```bash
cat > .claude/skills/deploy-prod.md << 'EOF'
---
name: deploy-prod
description: 生产环境部署（需要确认）
---

⚠️ 生产部署流程

此操作将影响生产环境，请谨慎操作。

步骤：
1. 确认当前分支为 main
2. 确认所有测试通过
3. 要求用户二次确认
4. 从环境变量读取部署密钥（不在代码中硬编码）
5. 执行部署
6. 验证部署状态
7. 发送通知

绝不在 Skill 中硬编码：
- API 密钥
- 密码
- 访问令牌
- 数据库连接字符串
EOF
```

**使用示例：**

```bash
You: /deploy-prod

Claude: ⚠️  生产环境部署

这将部署到生产环境，影响所有用户。

预检查：
✓ 当前分支: main
✓ 所有测试通过
✓ 构建成功

⚠️  请输入 "DEPLOY TO PRODUCTION" 确认：

You: DEPLOY TO PRODUCTION

Claude: 开始部署...

读取部署配置...
✓ 环境变量已设置

执行部署...
✓ 部署成功

验证...
✓ 健康检查通过
✓ API 响应正常

部署完成！
版本: v2.3.1
时间: 2024-01-15 14:30:00
```

## 调试 Skills

### 添加调试输出

```bash
cat > .claude/skills/debug-skill.md << 'EOF'
---
name: debug-skill
description: 调试模式执行 Skill
---

启用详细日志执行指定 Skill：
1. 显示每个步骤的输入/输出
2. 记录执行时间
3. 捕获并显示错误堆栈
4. 保存调试日志到 .claude/logs/
EOF
```

**使用示例：**

```bash
You: /debug-skill commit

Claude: 调试模式：执行 commit Skill

[00:00.001] 开始执行
[00:00.023] 运行: git status
[00:00.156] 输出: 3 个文件已修改
[00:00.157] 运行: git diff
[00:01.234] 输出: 145 行变更
[00:01.235] 分析变更类型...
[00:01.456] 检测到: 功能添加
[00:01.457] 生成提交消息...
[00:02.123] 完成

总耗时: 2.123s
日志已保存: .claude/logs/commit-2024-01-15.log
```

这些最佳实践将帮助你创建高质量、可维护的 Agent Skills，提升开发效率和团队协作。
