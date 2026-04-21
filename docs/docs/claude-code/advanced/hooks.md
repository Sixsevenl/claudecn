---
title: "Hooks 系统"
---

# Hooks 系统

Hooks 是 Claude Code 的事件驱动机制，允许你在特定时机自动执行脚本或触发 Skills。通过 Hooks，你可以构建自动化工作流，确保团队规范的一致性。

## 什么是 Hooks

Hooks 是在特定事件发生时自动触发的脚本或命令。类似于 Git Hooks，但更强大：

- **事件驱动**：响应 Claude Code 的各种事件
- **可编程**：使用任何脚本语言
- **可组合**：多个 Hooks 可以链式执行
- **条件触发**：支持条件判断

## Hook 类型

### 生命周期 Hooks

```json
{
  "hooks": {
    "preSession": "./scripts/pre-session.sh",
    "postSession": "./scripts/post-session.sh",
    "preCommand": "./scripts/pre-command.sh",
    "postCommand": "./scripts/post-command.sh"
  }
}
```

### 文件操作 Hooks

```json
{
  "hooks": {
    "preWrite": "./scripts/validate-write.sh",
    "postWrite": "./scripts/post-write.sh",
    "preEdit": "./scripts/backup-file.sh",
    "postEdit": "./scripts/format-file.sh"
  }
}
```

### Git 集成 Hooks

```json
{
  "hooks": {
    "preCommit": "./scripts/pre-commit.sh",
    "postCommit": "./scripts/post-commit.sh",
    "prePush": "./scripts/pre-push.sh",
    "postPush": "./scripts/post-push.sh"
  }
}
```

### 自定义事件 Hooks

```json
{
  "hooks": {
    "onError": "./scripts/error-handler.sh",
    "onSuccess": "./scripts/success-handler.sh",
    "onTestFail": "./scripts/test-fail-handler.sh"
  }
}
```

## 配置 Hooks

### 基础配置

`.claude/config.json`：

```json
{
  "hooks": {
    "preCommit": {
      "command": "./scripts/pre-commit.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 30000
    },
    "postWrite": {
      "command": "npm run format ${file}",
      "enabled": true,
      "blocking": false
    }
  }
}
```

### Hook 配置选项

```json
{
  "hooks": {
    "hookName": {
      "command": "要执行的命令",
      "enabled": true,
      "blocking": true,
      "timeout": 30000,
      "workingDir": "${projectRoot}",
      "env": {
        "HOOK_NAME": "value"
      },
      "condition": "git diff --cached --quiet",
      "onFailure": "warn",
      "retries": 2,
      "parallel": false
    }
  }
}
```

## 实用 Hooks 示例

### 1. 代码质量检查

`.claude/hooks/pre-commit.sh`：

```bash
#!/bin/bash
set -e

echo "运行代码质量检查..."

# 1. Linter 检查
echo "→ 运行 linter..."
npm run lint

# 2. 类型检查
echo "→ TypeScript 类型检查..."
tsc --noEmit

# 3. 单元测试
echo "→ 运行单元测试..."
npm run test:unit

# 4. 检查提交信息格式
echo "→ 验证提交信息..."
if ! grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+" .git/COMMIT_EDITMSG; then
  echo "错误：提交信息不符合 Conventional Commits 规范"
  exit 1
fi

echo "✓ 所有检查通过"
```

配置：

```json
{
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 120000
    }
  }
}
```

### 2. 自动格式化

`.claude/hooks/post-write.sh`：

```bash
#!/bin/bash

FILE=$1

# 根据文件类型选择格式化工具
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx)
    echo "格式化 JavaScript/TypeScript 文件: $FILE"
    npx prettier --write "$FILE"
    npx eslint --fix "$FILE"
    ;;
  *.py)
    echo "格式化 Python 文件: $FILE"
    black "$FILE"
    isort "$FILE"
    ;;
  *.go)
    echo "格式化 Go 文件: $FILE"
    gofmt -w "$FILE"
    ;;
  *.rs)
    echo "格式化 Rust 文件: $FILE"
    rustfmt "$FILE"
    ;;
esac
```

配置：

```json
{
  "hooks": {
    "postWrite": {
      "command": "./.claude/hooks/post-write.sh ${file}",
      "enabled": true,
      "blocking": false
    }
  }
}
```

### 3. 依赖检查

`.claude/hooks/pre-session.sh`：

```bash
#!/bin/bash

echo "检查项目依赖..."

# 检查 Node.js 版本
REQUIRED_NODE_VERSION="18.0.0"
CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2)

if [ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$CURRENT_NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE_VERSION" ]; then
  echo "警告：Node.js 版本过低，需要 >= $REQUIRED_NODE_VERSION"
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
  echo "依赖未安装，运行 npm install..."
  npm install
fi

# 检查依赖是否过期
if [ -f "package-lock.json" ]; then
  if [ "package.json" -nt "node_modules" ]; then
    echo "依赖已过期，运行 npm install..."
    npm install
  fi
fi

echo "✓ 依赖检查完成"
```

### 4. 安全扫描

`.claude/hooks/pre-push.sh`：

```bash
#!/bin/bash
set -e

echo "运行安全扫描..."

# 1. 检查敏感信息
echo "→ 扫描敏感信息..."
if git diff --cached | grep -iE "(password|secret|api_key|token)" > /dev/null; then
  echo "警告：检测到可能的敏感信息"
  git diff --cached | grep -iE "(password|secret|api_key|token)"
  read -p "确认继续？(y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# 2. 依赖漏洞扫描
echo "→ 扫描依赖漏洞..."
npm audit --audit-level=high

# 3. 代码安全扫描
echo "→ 运行 Semgrep..."
semgrep --config=auto --error

echo "✓ 安全扫描通过"
```

### 5. 文档同步

`.claude/hooks/post-commit.sh`：

```bash
#!/bin/bash

# 检查是否有 API 变更
if git diff HEAD~1 --name-only | grep -E "src/api|src/routes" > /dev/null; then
  echo "检测到 API 变更，更新文档..."

  # 生成 API 文档
  npm run generate-api-docs

  # 如果文档有变更，自动提交
  if ! git diff --quiet docs/api/; then
    git add docs/api/
    git commit --amend --no-edit
    echo "✓ API 文档已更新"
  fi
fi
```

### 6. 测试覆盖率检查

`.claude/hooks/pre-push.sh`：

```bash
#!/bin/bash
set -e

echo "检查测试覆盖率..."

# 运行测试并生成覆盖率报告
npm run test:coverage -- --silent

# 读取覆盖率
COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
THRESHOLD=80

if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
  echo "错误：测试覆盖率 $COVERAGE% 低于阈值 $THRESHOLD%"
  exit 1
fi

echo "✓ 测试覆盖率 $COVERAGE% (>= $THRESHOLD%)"
```

## 高级特性

### 条件执行

```json
{
  "hooks": {
    "preCommit": {
      "command": "./scripts/lint.sh",
      "condition": "git diff --cached --name-only | grep -E '\\.(ts|tsx)$'",
      "enabled": true
    }
  }
}
```

### 并行执行

```json
{
  "hooks": {
    "preCommit": [
      {
        "command": "npm run lint",
        "parallel": true
      },
      {
        "command": "npm run type-check",
        "parallel": true
      },
      {
        "command": "npm test",
        "parallel": true
      }
    ]
  }
}
```

### 链式执行

```json
{
  "hooks": {
    "preCommit": {
      "steps": [
        {
          "name": "format",
          "command": "npm run format"
        },
        {
          "name": "lint",
          "command": "npm run lint",
          "dependsOn": ["format"]
        },
        {
          "name": "test",
          "command": "npm test",
          "dependsOn": ["lint"]
        }
      ]
    }
  }
}
```

### 错误处理

```json
{
  "hooks": {
    "preCommit": {
      "command": "./scripts/check.sh",
      "onFailure": "warn",
      "retries": 2,
      "retryDelay": 1000
    }
  }
}
```

### 环境变量传递

```json
{
  "hooks": {
    "preCommit": {
      "command": "./scripts/check.sh",
      "env": {
        "HOOK_TYPE": "pre-commit",
        "FILES": "${stagedFiles}",
        "BRANCH": "${currentBranch}"
      }
    }
  }
}
```

## Hook 变量

Hooks 中可用的变量：

```bash
# 文件相关
${file}              # 当前文件路径
${files}             # 所有相关文件
${stagedFiles}       # Git 暂存文件
${modifiedFiles}     # 修改的文件

# Git 相关
${currentBranch}     # 当前分支
${commitMessage}     # 提交信息
${commitHash}        # 提交哈希

# 项目相关
${projectRoot}       # 项目根目录
${workingDir}        # 工作目录

# 会话相关
${sessionId}         # 会话 ID
${timestamp}         # 时间戳
```

## 与 Skills 集成

Hooks 可以触发 Skills：

```json
{
  "hooks": {
    "postCommit": {
      "command": "claude /notify-team '新提交: ${commitMessage}'"
    },
    "onTestFail": {
      "command": "claude /analyze-failure ${testFile}"
    }
  }
}
```

## 调试 Hooks

### 启用详细输出

```bash
# 查看 Hook 执行日志
claude --hook-logs

# 调试特定 Hook
claude --debug-hook preCommit
```

### 测试 Hooks

```bash
# 手动触发 Hook
claude --run-hook preCommit

# 干运行模式
claude --dry-run-hook preCommit
```

### Hook 执行日志

`.claude/logs/hooks.log`：

```
[2024-01-15 10:30:00] preCommit: 开始执行
[2024-01-15 10:30:05] preCommit: 运行 linter...
[2024-01-15 10:30:08] preCommit: ✓ Linter 通过
[2024-01-15 10:30:08] preCommit: 运行测试...
[2024-01-15 10:30:15] preCommit: ✓ 测试通过
[2024-01-15 10:30:15] preCommit: 完成 (15s)
```

## 最佳实践

### 1. 快速失败

```bash
#!/bin/bash
set -e  # 遇到错误立即退出

# 快速检查放在前面
npm run lint
npm run type-check
npm test
```

### 2. 提供反馈

```bash
#!/bin/bash

echo "→ 运行代码检查..."
if npm run lint; then
  echo "✓ Linter 通过"
else
  echo "✗ Linter 失败"
  exit 1
fi
```

### 3. 性能优化

```bash
#!/bin/bash

# 只检查变更的文件
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -n "$CHANGED_FILES" ]; then
  echo "$CHANGED_FILES" | xargs npx eslint
fi
```

### 4. 可配置性

```bash
#!/bin/bash

# 允许跳过 Hook
if [ "$SKIP_HOOKS" = "true" ]; then
  echo "跳过 Hook 执行"
  exit 0
fi

# 读取配置
LINT_ENABLED=$(jq -r '.hooks.lint.enabled' .claude/config.json)
if [ "$LINT_ENABLED" = "true" ]; then
  npm run lint
fi
```

### 5. 错误恢复

```bash
#!/bin/bash

# 保存当前状态
STASH_NAME="hook-backup-$(date +%s)"
git stash push -m "$STASH_NAME"

# 执行操作
if ! npm run risky-operation; then
  echo "操作失败，恢复状态..."
  git stash pop
  exit 1
fi

# 清理
git stash drop
```

## 团队协作

### 共享 Hooks

将 Hooks 纳入版本控制：

```bash
git add .claude/hooks/
git add .claude/config.json
git commit -m "chore: 添加团队 Hooks"
```

### Hooks 文档

`.claude/hooks/README.md`：

```markdown
# 团队 Hooks 文档

## 可用 Hooks

### preCommit
提交前运行代码质量检查。

检查项：
- ESLint
- TypeScript 类型检查
- 单元测试
- 提交信息格式

### postWrite
文件写入后自动格式化。

支持格式：
- JavaScript/TypeScript (Prettier + ESLint)
- Python (Black + isort)
- Go (gofmt)

### prePush
推送前运行完整测试和安全扫描。

检查项：
- 所有测试
- 测试覆盖率
- 依赖漏洞扫描
- 敏感信息检查

## 跳过 Hooks

紧急情况下可以跳过 Hooks：

```bash
SKIP_HOOKS=true claude commit
```

## 故障排查

如果 Hook 失败：
1. 查看错误信息
2. 手动运行 Hook 脚本
3. 检查日志：`.claude/logs/hooks.log`
```

### 渐进式启用

```json
{
  "hooks": {
    "preCommit": {
      "command": "./scripts/pre-commit.sh",
      "enabled": true,
      "onFailure": "warn"
    }
  }
}
```

先设置为 `warn` 模式，团队适应后再改为 `error`。

## 安全考虑

### 权限控制

```bash
#!/bin/bash

# 检查执行权限
if [ ! -x "$0" ]; then
  echo "错误：Hook 脚本没有执行权限"
  exit 1
fi

# 验证脚本来源
SCRIPT_HASH=$(sha256sum "$0" | cut -d' ' -f1)
EXPECTED_HASH=$(cat .claude/hooks/checksums.txt | grep "$(basename "$0")" | cut -d' ' -f1)

if [ "$SCRIPT_HASH" != "$EXPECTED_HASH" ]; then
  echo "警告：Hook 脚本已被修改"
fi
```

### 审计日志

```json
{
  "hooks": {
    "audit": {
      "enabled": true,
      "logPath": ".claude/logs/audit.log",
      "logLevel": "detailed"
    }
  }
}
```

## 故障排查

### 常见问题

**Hook 未执行**
- 检查 `enabled` 设置
- 验证脚本路径
- 确认执行权限

**Hook 超时**
- 增加 `timeout` 设置
- 优化脚本性能
- 考虑异步执行

**Hook 失败但未阻止操作**
- 检查 `blocking` 设置
- 查看 `onFailure` 配置
- 验证退出码

**变量未替换**
- 检查变量名拼写
- 确认变量在当前上下文可用
- 使用 `--debug` 查看变量值

## 下一步

- 探索 [自定义命令](./custom-commands.md) 扩展功能
- 学习 [Hooks 配方](./hooks-recipes.md) 获取更多示例
- 查看 [团队规则库](./team-rules.md) 了解最佳实践
