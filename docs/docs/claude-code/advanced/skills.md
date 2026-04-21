---
title: "Skills（技能）"
---

# Skills（技能）

Skills 是 Claude Code 的可复用能力单元，让你能够将常见工作流封装成可调用的命令。通过 Skills，团队可以标准化最佳实践，新成员可以快速上手复杂任务。

## 什么是 Skills

Skills 是预定义的提示词模板，配合特定的工具和上下文，用于完成特定任务。它们类似于"宏命令"或"快捷方式"，但更智能——Claude 会根据当前项目上下文动态调整执行策略。

### 核心特性

- **可复用性**：一次定义，随处调用
- **参数化**：支持动态参数传递
- **上下文感知**：自动适配项目环境
- **可组合**：Skills 可以调用其他 Skills
- **版本控制**：Skills 配置可纳入 Git 管理

## Skills 目录结构

```
.claude/
├── skills/
│   ├── commit.md           # Git 提交 Skill
│   ├── review-pr.md        # PR 审查 Skill
│   ├── refactor.md         # 重构 Skill
│   └── test-gen.md         # 测试生成 Skill
└── config.json
```

## 创建第一个 Skill

### 基础示例：代码审查 Skill

创建 `.claude/skills/review.md`：

```markdown
---
name: review
description: 对代码变更进行全面审查
args:
  - name: target
    description: 审查目标（文件路径或 git diff）
    required: false
---

# 代码审查 Skill

请对以下内容进行代码审查：

{{#if target}}
目标：{{target}}
{{else}}
当前 Git 工作区的所有变更
{{/if}}

## 审查清单

1. **代码质量**
   - 是否遵循项目编码规范
   - 命名是否清晰准确
   - 是否有重复代码

2. **潜在问题**
   - 边界条件处理
   - 错误处理是否完善
   - 性能瓶颈

3. **安全性**
   - 输入验证
   - 敏感信息泄露
   - 权限检查

4. **可维护性**
   - 代码复杂度
   - 注释是否充分
   - 测试覆盖

请提供：
- 发现的问题列表（按严重程度排序）
- 具体的改进建议
- 优秀实践的肯定
```

### 调用 Skill

```bash
# 审查当前变更
claude /review

# 审查特定文件
claude /review src/auth/login.ts

# 审查特定提交
claude /review HEAD~1..HEAD
```

## Skill 语法详解

### 前置元数据（Front Matter）

```yaml
---
name: skill-name              # Skill 名称（必需）
description: 简短描述          # 显示在帮助信息中
args:                         # 参数定义
  - name: param1
    description: 参数说明
    required: true            # 是否必需
    default: default-value    # 默认值
  - name: param2
    type: string|number|boolean
    choices: [opt1, opt2]     # 可选值列表
tools:                        # 允许使用的工具
  - read
  - write
  - bash
context:                      # 自动加载的上下文
  - .claudeignore
  - package.json
model: claude-3-5-sonnet-20241022  # 指定模型
temperature: 0.7              # 温度参数
---
```

### 模板语法

Skills 使用 Handlebars 模板语法：

```markdown
# 条件判断
{{#if condition}}
  内容
{{else}}
  其他内容
{{/if}}

# 循环
{{#each items}}
  - {{this}}
{{/each}}

# 变量插值
文件名：{{filename}}
作者：{{author}}

# 辅助函数
{{uppercase name}}
{{lowercase text}}
{{trim content}}
```

## 实用 Skills 示例

### 1. Git 提交 Skill

`.claude/skills/commit.md`：

```markdown
---
name: commit
description: 生成符合规范的 Git 提交信息
args:
  - name: type
    description: 提交类型
    choices: [feat, fix, docs, style, refactor, test, chore]
    required: false
---

# Git 提交 Skill

分析当前 Git 暂存区的变更，生成符合 Conventional Commits 规范的提交信息。

## 提交类型

{{#if type}}
使用类型：{{type}}
{{else}}
自动判断提交类型：
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具链
{{/if}}

## 要求

1. 运行 `git diff --staged` 查看变更
2. 分析变更的性质和影响范围
3. 生成提交信息：
   - 标题：`<type>(<scope>): <subject>`（不超过 50 字符）
   - 正文：详细说明变更内容和原因
   - 页脚：关联的 Issue 或 Breaking Changes

4. 执行提交：`git commit -m "..."`
```

### 2. 测试生成 Skill

`.claude/skills/test-gen.md`：

```markdown
---
name: test-gen
description: 为指定代码生成单元测试
args:
  - name: file
    description: 目标文件路径
    required: true
  - name: framework
    description: 测试框架
    choices: [jest, vitest, mocha, pytest]
    default: jest
---

# 测试生成 Skill

为 {{file}} 生成 {{framework}} 单元测试。

## 测试策略

1. **读取源文件**
   - 分析导出的函数/类
   - 识别关键逻辑分支
   - 理解依赖关系

2. **生成测试用例**
   - 正常路径测试
   - 边界条件测试
   - 异常情况测试
   - Mock 外部依赖

3. **测试文件命名**
   - Jest/Vitest: `{{file}}.test.ts`
   - Pytest: `test_{{basename file}}.py`

4. **运行测试**
   - 执行测试命令验证
   - 确保所有测试通过
   - 报告覆盖率

## 测试质量标准

- 每个公共函数至少 3 个测试用例
- 覆盖率目标：80%+
- 测试描述清晰（describe/it）
- 使用有意义的断言消息
```

### 3. 重构 Skill

`.claude/skills/refactor.md`：

```markdown
---
name: refactor
description: 安全地重构代码
args:
  - name: target
    description: 重构目标
    required: true
  - name: goal
    description: 重构目标
    required: false
---

# 代码重构 Skill

目标：{{target}}
{{#if goal}}
重构目标：{{goal}}
{{/if}}

## 重构流程

### 1. 前置检查
- 确保所有测试通过
- 检查是否有未提交的变更
- 创建重构分支

### 2. 分析阶段
- 读取目标代码
- 识别代码异味：
  - 重复代码
  - 过长函数
  - 过大类
  - 过多参数
  - 复杂条件逻辑

### 3. 重构执行
- 应用重构模式：
  - 提取函数/方法
  - 提取变量
  - 内联临时变量
  - 替换算法
  - 引入参数对象

### 4. 验证
- 运行所有测试
- 检查类型检查
- 运行 linter
- 对比重构前后的行为

### 5. 提交
- 生成详细的提交信息
- 说明重构动机和方法
```

### 4. API 文档生成 Skill

`.claude/skills/api-docs.md`：

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

# API 文档生成 Skill

生成 {{format}} 格式的 API 文档。

## 文档生成步骤

1. **扫描路由定义**
   - Express: `app.get/post/put/delete`
   - FastAPI: `@app.get/post` 装饰器
   - Spring: `@GetMapping/@PostMapping` 注解

2. **提取 API 信息**
   - 路径和方法
   - 请求参数（query/body/path）
   - 响应格式
   - 认证要求
   - 错误码

3. **生成文档**
   {{#if (eq format "openapi")}}
   - OpenAPI 3.0 规范
   - 包含 schemas 定义
   - 添加示例请求/响应
   {{else if (eq format "markdown")}}
   - Markdown 表格格式
   - 按模块分组
   - 包含 curl 示例
   {{else}}
   - Postman Collection v2.1
   - 配置环境变量
   - 添加测试脚本
   {{/if}}

4. **输出位置**
   - OpenAPI: `docs/openapi.yaml`
   - Markdown: `docs/API.md`
   - Postman: `docs/postman-collection.json`
```

## 高级特性

### Skills 组合

Skills 可以调用其他 Skills：

```markdown
---
name: full-feature
description: 完整功能开发流程
---

# 完整功能开发 Skill

1. 创建功能分支
2. 调用 /code-gen 生成代码
3. 调用 /test-gen 生成测试
4. 调用 /review 审查代码
5. 调用 /commit 提交变更
6. 推送并创建 PR
```

### 条件执行

```markdown
{{#if (fileExists "package.json")}}
这是一个 Node.js 项目
{{else if (fileExists "requirements.txt")}}
这是一个 Python 项目
{{/if}}
```

### 环境变量

```markdown
数据库连接：{{env.DATABASE_URL}}
API 密钥：{{env.API_KEY}}
```

### 动态上下文加载

```markdown
---
context:
  - "{{args.file}}"
  - "{{dirname args.file}}/**/*.test.ts"
---
```

## Skills 配置管理

### 全局配置

`~/.config/claude/skills/` 目录下的 Skills 对所有项目可用。

### 项目配置

`.claude/skills/` 目录下的 Skills 仅对当前项目可用，优先级高于全局 Skills。

### Skills 发现

Claude Code 按以下顺序查找 Skills：

1. `.claude/skills/`（项目级）
2. `~/.config/claude/skills/`（用户级）
3. 内置 Skills

### 列出可用 Skills

```bash
claude --list-skills
```

输出示例：

```
Available Skills:
  /commit       - 生成规范的 Git 提交
  /review       - 代码审查
  /test-gen     - 生成单元测试
  /refactor     - 代码重构
  /api-docs     - 生成 API 文档
```

## 最佳实践

### 1. 命名规范

- 使用动词开头：`review`, `generate`, `analyze`
- 简短且描述性：`test-gen` 而非 `generate-unit-tests`
- 使用连字符分隔：`code-review` 而非 `codeReview`

### 2. 参数设计

- 必需参数放在前面
- 提供合理的默认值
- 使用 `choices` 限制可选值
- 参数描述要清晰

### 3. 提示词编写

- 明确任务目标
- 提供清晰的步骤
- 包含质量标准
- 给出输出示例

### 4. 错误处理

```markdown
## 前置条件检查

{{#unless (fileExists args.file)}}
错误：文件 {{args.file}} 不存在
{{/unless}}

{{#if (isEmpty (gitStatus))}}
警告：工作区没有变更
{{/if}}
```

### 5. 文档化

每个 Skill 应包含：
- 用途说明
- 参数说明
- 使用示例
- 注意事项

## 团队协作

### Skills 共享

将 `.claude/skills/` 纳入版本控制：

```bash
git add .claude/skills/
git commit -m "chore: 添加团队 Skills"
```

### Skills 审查

在 PR 中审查 Skills 变更：
- 提示词是否清晰
- 参数设计是否合理
- 是否有安全风险
- 是否符合团队规范

### Skills 文档

创建 `.claude/skills/README.md`：

```markdown
# 团队 Skills 文档

## 可用 Skills

### /commit
生成符合 Conventional Commits 的提交信息。

用法：`claude /commit [type]`

### /review
对代码变更进行全面审查。

用法：`claude /review [target]`

## 贡献指南

添加新 Skill 时：
1. 在 `skills/` 目录创建 `.md` 文件
2. 遵循命名规范
3. 包含完整的元数据
4. 提供使用示例
5. 提交 PR 并请求审查
```

## 调试 Skills

### 查看 Skill 内容

```bash
claude --show-skill commit
```

### 测试 Skill

```bash
# 干运行模式
claude /commit --dry-run

# 详细输出
claude /commit --verbose
```

### 常见问题

**Skill 未找到**
- 检查文件名和 `name` 字段是否一致
- 确认文件在正确的目录
- 运行 `claude --list-skills` 验证

**参数解析错误**
- 检查 YAML 语法
- 确认参数类型定义
- 查看错误信息中的行号

**模板渲染失败**
- 检查 Handlebars 语法
- 确认变量名拼写
- 使用 `--verbose` 查看详细错误

## 下一步

- 探索 [Hooks 系统](./hooks.md) 实现自动化触发
- 了解 [Subagents](./subagents.md) 实现复杂任务分解
- 查看 [模式库](./pattern-library.md) 获取更多 Skills 示例
