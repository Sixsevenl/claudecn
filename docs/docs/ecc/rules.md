---
title: Rules 规则系统
---

# Rules 规则系统

Rules 是始终遵循的开发指南，按语言目录组织，确保 Claude Code 始终遵循最佳实践。

## 目录结构

```
rules/
├── common/           # 语言无关的通用原则（必装）
│   ├── coding-style.md    # 不可变性、文件组织
│   ├── git-workflow.md    # 提交格式、PR 流程
│   ├── testing.md         # TDD、80% 覆盖率要求
│   ├── performance.md     # 模型选择、上下文管理
│   ├── patterns.md        # 设计模式、骨架项目
│   ├── hooks.md           # Hook 架构、TodoWrite
│   ├── agents.md          # 何时委托给子代理
│   └── security.md        # 强制安全检查
├── typescript/       # TypeScript/JavaScript 规则
├── python/           # Python 规则
├── golang/           # Go 规则
├── swift/            # Swift 规则
├── php/              # PHP 规则
├── java/             # Java 规则
├── kotlin/           # Kotlin 规则
├── rust/             # Rust 规则
├── cpp/              # C++ 规则
└── perl/             # Perl 规则
```

## 安装规则

### 用户级别（所有项目生效）

```bash
mkdir -p ~/.claude/rules
cp -r rules/common ~/.claude/rules/
cp -r rules/typescript ~/.claude/rules/  # 按需选择语言
cp -r rules/python ~/.claude/rules/
```

### 项目级别（仅当前项目）

```bash
mkdir -p .claude/rules
cp -r rules/common .claude/rules/
cp -r rules/typescript .claude/rules/  # 按需选择语言
```

::: warning
复制规则时，复制整个语言目录（如 `rules/common` 或 `rules/golang`），而不是目录内的文件。这样相对引用才能正常工作，且文件名不会冲突。
:::

## Common 规则详解

### coding-style.md

- 优先使用不可变数据结构
- 文件组织遵循单一职责
- 一致的命名规范

### git-workflow.md

- 约定式提交格式（Conventional Commits）
- PR 流程规范
- 分支管理策略

### testing.md

- **TDD 强制执行**: 先写测试、再实现、最后重构
- **80%+ 覆盖率要求**
- 测试命名和结构规范

### performance.md

- 模型选择策略（Sonnet 默认、Opus 复杂任务）
- 上下文窗口管理
- Token 优化技巧

### patterns.md

- 常用设计模式
- 骨架项目模板
- 代码结构规范

### agents.md

- 何时委托给子代理
- Agent 选择指南
- 委托最佳实践

### security.md

- OWASP Top 10 安全检查
- 密钥管理
- 输入验证
- 安全编码实践

## 语言特定规则

每种语言目录包含针对该语言的特定规则：

| 语言 | 包含内容 |
|------|---------|
| TypeScript | TS/JS 模式、工具配置 |
| Python | Python 模式、工具配置 |
| Go | Go 惯用模式、工具配置 |
| Swift | Swift 并发、Apple 平台 |
| PHP | PHP 模式、Laravel |
| Java | Java/Spring Boot |
| Kotlin | Kotlin/Android/KMP |
| Rust | Rust 所有权、生命周期 |
| C++ | 现代 C++ 模式 |
| Perl | 现代 Perl 模式 |
