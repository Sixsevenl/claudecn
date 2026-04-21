---
title: "Agent Skills 快速开始"
---

# Agent Skills 快速开始

Agent Skills 让你能够创建可复用的 AI 工作流，通过简单的命令调用复杂的任务。

## 什么是 Skills

Skills 是预定义的提示词模板，封装了常见的开发任务。类似于"宏"或"快捷方式"，让你用一个命令完成多步操作。

## 第一个 Skill

### 1. 创建 Skills 目录

```bash
mkdir -p .claude/skills
cd .claude/skills
```

### 2. 创建 Skill 文件

创建 `hello.md`：

```markdown
---
name: hello
description: 打招呼并显示项目信息
---

你好！让我帮你了解这个项目：

1. 读取 package.json 或 pyproject.toml
2. 显示项目名称、版本和依赖
3. 列出主要的源代码目录
4. 显示最近的 git 提交

请友好地展示这些信息。
```

### 3. 使用 Skill

```bash
claude

You: /hello

Claude: 你好！让我看看这个项目...
[自动执行 Skill 中定义的步骤]
```

## 内置 Skills

Claude Code 自带实用的 Skills：

### /commit - 智能提交

```bash
/commit
```

自动：
1. 运行 `git status` 和 `git diff`
2. 分析代码更改
3. 生成规范的 commit message
4. 执行 `git commit`

### /review - 代码审查

```bash
/review src/app.ts
```

检查：
- 代码规范
- 性能问题
- 安全漏洞
- 最佳实践

### /test - 生成测试

```bash
/test src/utils/helper.ts
```

生成完整的单元测试文件。

### /docs - 生成文档

```bash
/docs src/api/users.ts
```

添加 JSDoc/docstring 注释。

## 创建实用 Skills

### API 测试 Skill

创建 `.claude/skills/api-test.md`：

```markdown
---
name: api-test
description: 测试 API 接口
args:
  - name: endpoint
    description: API 端点路径
    required: true
  - name: method
    description: HTTP 方法
    required: false
    default: GET
---

测试 API 接口 {{endpoint}}：

1. 读取 API 文档或代码
2. 使用 curl 发送 {{method}} 请求
3. 验证响应状态码和格式
4. 检查错误处理
5. 生成测试报告

如果需要认证，询问用户提供 token。
```

使用：

```bash
/api-test endpoint=/api/users method=POST
```

### 数据库迁移 Skill

创建 `.claude/skills/db-migrate.md`：

```markdown
---
name: db-migrate
description: 创建数据库迁移
args:
  - name: name
    description: 迁移名称
    required: true
  - name: type
    description: 迁移类型 (create/alter/drop)
    required: false
    default: create
---

创建数据库迁移 {{name}}：

1. 在 migrations/ 目录创建新文件
2. 文件名：YYYYMMDDHHMMSS_{{name}}.sql
3. 包含 UP 和 DOWN 迁移
4. 添加必要的索引和约束
5. 添加回滚说明

迁移类型：{{type}}
```

### 组件生成 Skill

创建 `.claude/skills/component.md`：

```markdown
---
name: component
description: 生成 React 组件
args:
  - name: name
    description: 组件名称
    required: true
  - name: type
    description: 组件类型 (page/layout/ui)
    required: false
    default: ui
---

创建 React 组件 {{name}}：

1. 在 src/components/{{type}}/ 创建 {{name}}.tsx
2. 使用 TypeScript 和函数组件
3. 添加 Props 接口定义
4. 使用 TailwindCSS 样式
5. 创建对应的 {{name}}.test.tsx
6. 更新 index.ts 导出

组件类型：{{type}}
```

## Skill 语法

### Frontmatter

```yaml
---
name: skill-name          # Skill 名称（必需）
description: 描述         # 简短描述（必需）
args:                     # 参数定义（可选）
  - name: arg1
    description: 参数说明
    required: true
  - name: arg2
    description: 参数说明
    required: false
    default: default-value
---
```

### 变量替换

使用 `{{variable}}` 引用参数：

```markdown
处理文件：{{file}}
使用模式：{{pattern}}
输出目录：{{output}}
```

### 条件逻辑

```markdown
{{#if debug}}
添加详细的调试日志
{{/if}}

{{#unless production}}
使用开发环境配置
{{/unless}}

{{#if typescript}}
使用 TypeScript 类型
{{else}}
使用 JSDoc 注释
{{/if}}
```

### 循环

```markdown
{{#each files}}
处理文件：{{this}}
{{/each}}
```

## 团队共享

### 项目级 Skills

提交到 Git：

```bash
git add .claude/skills/
git commit -m "Add team skills"
git push
```

团队成员拉取后即可使用。

### 全局 Skills

放在用户目录：

```bash
mkdir -p ~/.config/claude/skills
cp my-skill.md ~/.config/claude/skills/
```

### Skills 仓库

创建专门的 Skills 仓库：

```bash
# 组织的 Skills 仓库
git clone https://github.com/your-org/claude-skills.git

# 链接到项目
ln -s ~/claude-skills .claude/skills
```

## 最佳实践

### 1. 清晰的步骤

✅ 好：
```markdown
1. 读取 package.json
2. 检查过期的依赖
3. 生成更新报告
4. 询问是否执行更新
```

❌ 差：
```markdown
更新依赖
```

### 2. 包含验证

```markdown
1. 修改配置文件
2. 运行测试验证
3. 如果测试失败，回滚更改
4. 显示验证结果
```

### 3. 提供上下文

```markdown
这是一个 {{framework}} 项目。
代码规范：{{style_guide}}
测试框架：{{test_framework}}

请遵循项目规范。
```

### 4. 错误处理

```markdown
如果文件不存在：
- 询问是否创建
- 提供默认模板

如果测试失败：
- 显示错误信息
- 建议修复方案
- 不要自动提交
```

## 调试 Skills

### 查看 Skill 内容

```bash
cat .claude/skills/my-skill.md
```

### 测试 Skill

```bash
# Dry run 模式
claude --dry-run /my-skill arg1=value1
```

### 查看日志

```bash
tail -f ~/.claude/logs/skills.log
```

## 示例 Skills 库

### 前端开发

- `component.md` - React 组件生成
- `storybook.md` - Storybook story
- `e2e-test.md` - E2E 测试

### 后端开发

- `api-endpoint.md` - API 接口
- `db-model.md` - 数据库模型
- `api-docs.md` - API 文档

### DevOps

- `docker-setup.md` - Docker 配置
- `ci-pipeline.md` - CI/CD 配置
- `deploy.md` - 部署脚本

## 下一步

- [最佳实践](/docs/agent-skills/best-practices) - Skills 开发指南
- [示例集](/docs/agent-skills/examples) - 更多示例
- [架构设计](/docs/agent-skills/architecture) - 深入理解 Skills
