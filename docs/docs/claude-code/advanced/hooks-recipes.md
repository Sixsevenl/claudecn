---
title: "Hooks 配方"
---

# Hooks 配方

Hooks 配方提供了经过实践验证的 Hooks 脚本示例，涵盖代码质量、安全检查、自动化部署等常见场景。所有脚本都可以直接使用或根据需求调整。

## 代码质量 Hooks

### 提交前完整检查

`.claude/hooks/pre-commit.sh`：

```bash
#!/bin/bash
set -e

echo "========================================="
echo "运行提交前检查"
echo "========================================="

# 1. 代码格式化
echo ""
echo "→ 格式化代码..."
if command -v prettier &> /dev/null; then
  git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx|json|css|md)$' | xargs npx prettier --write
  git add -u
  echo "✓ 代码格式化完成"
else
  echo "⚠ Prettier 未安装，跳过格式化"
fi

# 2. Linter 检查
echo ""
echo "→ 运行 linter..."
if npm run lint --silent; then
  echo "✓ Linter 检查通过"
else
  echo "✗ Linter 检查失败"
  exit 1
fi

# 3. TypeScript 类型检查
echo ""
echo "→ TypeScript 类型检查..."
if npx tsc --noEmit; then
  echo "✓ 类型检查通过"
else
  echo "✗ 类型检查失败"
  exit 1
fi

# 4. 单元测试
echo ""
echo "→ 运行单元测试..."
if npm run test:unit --silent; then
  echo "✓ 单元测试通过"
else
  echo "✗ 单元测试失败"
  exit 1
fi

# 5. 检查提交信息格式
echo ""
echo "→ 验证提交信息格式..."
if [ -f .git/COMMIT_EDITMSG ]; then
  COMMIT_MSG=$(cat .git/COMMIT_EDITMSG)
  if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
    echo "✗ 提交信息不符合 Conventional Commits 规范"
    echo ""
    echo "格式: <type>(<scope>): <subject>"
    echo ""
    echo "类型:"
    echo "  feat:     新功能"
    echo "  fix:      修复 bug"
    echo "  docs:     文档更新"
    echo "  style:    代码格式"
    echo "  refactor: 重构"
    echo "  test:     测试"
    echo "  chore:    构建/工具"
    exit 1
  fi
  echo "✓ 提交信息格式正确"
fi

echo ""
echo "========================================="
echo "✓ 所有检查通过"
echo "========================================="
```

### 只检查暂存文件

`.claude/hooks/pre-commit-staged.sh`：

```bash
#!/bin/bash
set -e

# 获取暂存的文件
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
  echo "没有暂存的文件"
  exit 0
fi

echo "检查暂存的文件..."

# 过滤 TypeScript/JavaScript 文件
TS_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -n "$TS_FILES" ]; then
  echo ""
  echo "→ Linter 检查..."
  echo "$TS_FILES" | xargs npx eslint

  echo ""
  echo "→ 格式化..."
  echo "$TS_FILES" | xargs npx prettier --write
  echo "$TS_FILES" | xargs git add

  echo ""
  echo "→ 类型检查..."
  echo "$TS_FILES" | xargs npx tsc --noEmit
fi

echo ""
echo "✓ 检查完成"
```

### 增量测试

`.claude/hooks/pre-commit-test.sh`：

```bash
#!/bin/bash
set -e

echo "运行增量测试..."

# 获取变更的文件
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' || true)

if [ -z "$CHANGED_FILES" ]; then
  echo "没有需要测试的文件"
  exit 0
fi

# 查找对应的测试文件
TEST_FILES=""
for file in $CHANGED_FILES; do
  # 跳过测试文件本身
  if [[ $file == *.test.* ]] || [[ $file == *.spec.* ]]; then
    TEST_FILES="$TEST_FILES $file"
    continue
  fi

  # 查找对应的测试文件
  base="${file%.*}"
  for ext in "test.ts" "test.tsx" "spec.ts" "spec.tsx"; do
    test_file="${base}.${ext}"
    if [ -f "$test_file" ]; then
      TEST_FILES="$TEST_FILES $test_file"
      break
    fi
  done
done

if [ -n "$TEST_FILES" ]; then
  echo "运行测试: $TEST_FILES"
  npm test -- $TEST_FILES
  echo "✓ 测试通过"
else
  echo "⚠ 没有找到对应的测试文件"
fi
```

## 文件操作 Hooks

### 自动格式化

`.claude/hooks/post-write.sh`：

```bash
#!/bin/bash

FILE=$1

if [ -z "$FILE" ]; then
  echo "错误: 未指定文件"
  exit 1
fi

echo "格式化文件: $FILE"

# 根据文件类型选择格式化工具
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx)
    echo "→ Prettier + ESLint"
    npx prettier --write "$FILE" 2>/dev/null || true
    npx eslint --fix "$FILE" 2>/dev/null || true
    ;;
  *.json)
    echo "→ Prettier"
    npx prettier --write "$FILE" 2>/dev/null || true
    ;;
  *.md)
    echo "→ Prettier"
    npx prettier --write "$FILE" 2>/dev/null || true
    ;;
  *.css|*.scss|*.less)
    echo "→ Prettier"
    npx prettier --write "$FILE" 2>/dev/null || true
    ;;
  *.py)
    echo "→ Black + isort"
    black "$FILE" 2>/dev/null || true
    isort "$FILE" 2>/dev/null || true
    ;;
  *.go)
    echo "→ gofmt"
    gofmt -w "$FILE" 2>/dev/null || true
    ;;
  *.rs)
    echo "→ rustfmt"
    rustfmt "$FILE" 2>/dev/null || true
    ;;
  *)
    echo "⚠ 不支持的文件类型"
    ;;
esac

echo "✓ 格式化完成"
```

### 文件备份

`.claude/hooks/pre-write.sh`：

```bash
#!/bin/bash

FILE=$1

if [ -z "$FILE" ]; then
  exit 0
fi

# 检查文件是否存在
if [ ! -f "$FILE" ]; then
  exit 0
fi

# 创建备份目录
BACKUP_DIR=".claude/backups/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

# 备份文件
BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE").$(date +%H%M%S).bak"
cp "$FILE" "$BACKUP_FILE"

echo "已备份: $BACKUP_FILE"
```

### 文件大小检查

`.claude/hooks/pre-write-size.sh`：

```bash
#!/bin/bash

FILE=$1
MAX_SIZE=1048576  # 1MB

if [ -z "$FILE" ]; then
  exit 0
fi

# 检查文件大小
if [ -f "$FILE" ]; then
  SIZE=$(wc -c < "$FILE")
  if [ $SIZE -gt $MAX_SIZE ]; then
    echo "警告: 文件过大 ($(($SIZE / 1024))KB > $(($MAX_SIZE / 1024))KB)"
    read -p "确认继续? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
fi
```

## 安全检查 Hooks

### 敏感信息扫描

`.claude/hooks/pre-commit-secrets.sh`：

```bash
#!/bin/bash
set -e

echo "扫描敏感信息..."

# 敏感信息模式
PATTERNS=(
  "password\s*=\s*['\"][^'\"]+['\"]"
  "api_key\s*=\s*['\"][^'\"]+['\"]"
  "secret\s*=\s*['\"][^'\"]+['\"]"
  "token\s*=\s*['\"][^'\"]+['\"]"
  "private_key"
  "BEGIN RSA PRIVATE KEY"
  "BEGIN PRIVATE KEY"
  "aws_access_key_id"
  "aws_secret_access_key"
)

# 检查暂存的文件
FOUND=false
for pattern in "${PATTERNS[@]}"; do
  if git diff --cached | grep -iE "$pattern" > /dev/null; then
    if [ "$FOUND" = false ]; then
      echo ""
      echo "✗ 检测到可能的敏感信息:"
      FOUND=true
    fi
    git diff --cached | grep -iE "$pattern" --color=always
  fi
done

if [ "$FOUND" = true ]; then
  echo ""
  read -p "确认提交? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "✓ 敏感信息检查通过"
```

### 依赖漏洞扫描

`.claude/hooks/pre-push-audit.sh`：

```bash
#!/bin/bash
set -e

echo "运行依赖漏洞扫描..."

# npm audit
if [ -f "package.json" ]; then
  echo ""
  echo "→ npm audit..."
  if npm audit --audit-level=high; then
    echo "✓ npm audit 通过"
  else
    echo "✗ 发现高危漏洞"
    echo ""
    echo "运行 'npm audit fix' 修复"
    exit 1
  fi
fi

# Snyk (如果安装)
if command -v snyk &> /dev/null; then
  echo ""
  echo "→ Snyk 扫描..."
  if snyk test; then
    echo "✓ Snyk 扫描通过"
  else
    echo "✗ Snyk 发现漏洞"
    exit 1
  fi
fi

echo ""
echo "✓ 安全扫描通过"
```

### 代码安全扫描

`.claude/hooks/pre-push-security.sh`：

```bash
#!/bin/bash
set -e

echo "运行代码安全扫描..."

# Semgrep
if command -v semgrep &> /dev/null; then
  echo ""
  echo "→ Semgrep 扫描..."
  if semgrep --config=auto --error; then
    echo "✓ Semgrep 扫描通过"
  else
    echo "✗ Semgrep 发现安全问题"
    exit 1
  fi
fi

# ESLint 安全规则
if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ]; then
  echo ""
  echo "→ ESLint 安全检查..."
  if npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0; then
    echo "✓ ESLint 安全检查通过"
  else
    echo "✗ ESLint 发现安全问题"
    exit 1
  fi
fi

echo ""
echo "✓ 安全扫描通过"
```

## 测试和覆盖率 Hooks

### 测试覆盖率检查

`.claude/hooks/pre-push-coverage.sh`：

```bash
#!/bin/bash
set -e

echo "检查测试覆盖率..."

# 运行测试并生成覆盖率报告
npm run test:coverage -- --silent

# 读取覆盖率
if [ -f "coverage/coverage-summary.json" ]; then
  COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
  THRESHOLD=80

  echo ""
  echo "当前覆盖率: $COVERAGE%"
  echo "阈值: $THRESHOLD%"

  if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
    echo ""
    echo "✗ 测试覆盖率低于阈值"
    exit 1
  fi

  echo ""
  echo "✓ 测试覆盖率达标"
else
  echo "⚠ 未找到覆盖率报告"
fi
```

### 测试性能检查

`.claude/hooks/pre-push-test-perf.sh`：

```bash
#!/bin/bash
set -e

echo "检查测试性能..."

# 运行测试并记录时间
START_TIME=$(date +%s)
npm test
END_TIME=$(date +%s)

DURATION=$((END_TIME - START_TIME))
THRESHOLD=300  # 5分钟

echo ""
echo "测试耗时: ${DURATION}s"

if [ $DURATION -gt $THRESHOLD ]; then
  echo "⚠ 测试耗时过长 (> ${THRESHOLD}s)"
  echo "考虑优化测试或使用并行执行"
fi

echo "✓ 测试完成"
```

## 文档同步 Hooks

### API 文档自动更新

`.claude/hooks/post-commit-docs.sh`：

```bash
#!/bin/bash

echo "检查是否需要更新文档..."

# 检查是否有 API 变更
if git diff HEAD~1 --name-only | grep -E "src/api|src/routes" > /dev/null; then
  echo ""
  echo "检测到 API 变更，更新文档..."

  # 生成 API 文档
  npm run generate-api-docs

  # 如果文档有变更，自动提交
  if ! git diff --quiet docs/api/; then
    git add docs/api/
    git commit --amend --no-edit
    echo "✓ API 文档已更新并追加到提交"
  else
    echo "✓ API 文档无变更"
  fi
else
  echo "✓ 无 API 变更"
fi
```

### README 同步

`.claude/hooks/post-commit-readme.sh`：

```bash
#!/bin/bash

echo "检查 README 是否需要更新..."

# 检查 package.json 变更
if git diff HEAD~1 --name-only | grep "package.json" > /dev/null; then
  echo ""
  echo "检测到 package.json 变更，检查 README..."

  # 提取版本号
  VERSION=$(cat package.json | jq -r '.version')

  # 更新 README 中的版本号
  if grep -q "Version:" README.md; then
    sed -i.bak "s/Version: .*/Version: $VERSION/" README.md
    rm README.md.bak

    if ! git diff --quiet README.md; then
      git add README.md
      git commit --amend --no-edit
      echo "✓ README 版本号已更新"
    fi
  fi
fi
```

## 构建和部署 Hooks

### 构建验证

`.claude/hooks/pre-push-build.sh`：

```bash
#!/bin/bash
set -e

echo "验证构建..."

# 清理旧的构建产物
echo ""
echo "→ 清理构建产物..."
rm -rf dist build .next

# 运行构建
echo ""
echo "→ 运行构建..."
if npm run build; then
  echo "✓ 构建成功"
else
  echo "✗ 构建失败"
  exit 1
fi

# 检查构建产物
echo ""
echo "→ 检查构建产物..."
if [ -d "dist" ] || [ -d "build" ] || [ -d ".next" ]; then
  echo "✓ 构建产物生成成功"
else
  echo "✗ 未找到构建产物"
  exit 1
fi

# 检查构建大小
echo ""
echo "→ 检查构建大小..."
if [ -d "dist" ]; then
  SIZE=$(du -sh dist | cut -f1)
  echo "构建大小: $SIZE"
fi

echo ""
echo "✓ 构建验证通过"
```

### 部署前检查

`.claude/hooks/pre-deploy.sh`：

```bash
#!/bin/bash
set -e

ENV=$1

if [ -z "$ENV" ]; then
  echo "错误: 未指定环境"
  exit 1
fi

echo "========================================="
echo "部署前检查 ($ENV)"
echo "========================================="

# 1. 检查分支
echo ""
echo "→ 检查分支..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$ENV" = "production" ] && [ "$CURRENT_BRANCH" != "main" ]; then
  echo "✗ 生产环境只能从 main 分支部署"
  exit 1
fi

echo "✓ 分支检查通过: $CURRENT_BRANCH"

# 2. 检查未提交的变更
echo ""
echo "→ 检查未提交的变更..."
if ! git diff --quiet; then
  echo "✗ 存在未提交的变更"
  exit 1
fi
echo "✓ 无未提交的变更"

# 3. 同步远程
echo ""
echo "→ 同步远程..."
git fetch origin
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/$CURRENT_BRANCH)" ]; then
  echo "✗ 本地分支与远程不同步"
  exit 1
fi
echo "✓ 与远程同步"

# 4. 运行测试
echo ""
echo "→ 运行测试..."
npm test
echo "✓ 测试通过"

# 5. 运行构建
echo ""
echo "→ 运行构建..."
npm run build
echo "✓ 构建成功"

echo ""
echo "========================================="
echo "✓ 部署前检查通过"
echo "========================================="
```

## 通知 Hooks

### Slack 通知

`.claude/hooks/post-push-notify.sh`：

```bash
#!/bin/bash

# Slack Webhook URL
SLACK_WEBHOOK="${SLACK_WEBHOOK_URL}"

if [ -z "$SLACK_WEBHOOK" ]; then
  exit 0
fi

# 获取提交信息
COMMIT_MSG=$(git log -1 --pretty=%B)
COMMIT_AUTHOR=$(git log -1 --pretty=%an)
COMMIT_HASH=$(git log -1 --pretty=%h)
BRANCH=$(git branch --show-current)

# 发送通知
curl -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d "{
    \"text\": \"新提交推送\",
    \"attachments\": [{
      \"color\": \"good\",
      \"fields\": [
        {\"title\": \"分支\", \"value\": \"$BRANCH\", \"short\": true},
        {\"title\": \"作者\", \"value\": \"$COMMIT_AUTHOR\", \"short\": true},
        {\"title\": \"提交\", \"value\": \"$COMMIT_HASH\", \"short\": true},
        {\"title\": \"消息\", \"value\": \"$COMMIT_MSG\", \"short\": false}
      ]
    }]
  }"

echo "✓ Slack 通知已发送"
```

### 邮件通知

`.claude/hooks/post-deploy-email.sh`：

```bash
#!/bin/bash

ENV=$1
STATUS=$2

# 邮件配置
TO="team@example.com"
FROM="deploy@example.com"
SUBJECT="部署通知: $ENV - $STATUS"

# 构建邮件内容
BODY="
部署环境: $ENV
部署状态: $STATUS
部署时间: $(date)
提交哈希: $(git log -1 --pretty=%h)
提交作者: $(git log -1 --pretty=%an)
提交消息: $(git log -1 --pretty=%B)
"

# 发送邮件
echo "$BODY" | mail -s "$SUBJECT" -r "$FROM" "$TO"

echo "✓ 邮件通知已发送"
```

## Hook 工具函数

### 通用工具库

`.claude/hooks/lib/utils.sh`：

```bash
#!/bin/bash

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function log_info() {
  echo -e "${GREEN}✓${NC} $1"
}

function log_error() {
  echo -e "${RED}✗${NC} $1"
}

function log_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# 检查命令是否存在
function command_exists() {
  command -v "$1" &> /dev/null
}

# 获取暂存的文件
function get_staged_files() {
  git diff --cached --name-only --diff-filter=ACM
}

# 获取特定类型的暂存文件
function get_staged_files_by_ext() {
  local ext=$1
  get_staged_files | grep -E "\\.${ext}$" || true
}

# 确认提示
function confirm() {
  local message=$1
  read -p "$message (y/N) " -n 1 -r
  echo
  [[ $REPLY =~ ^[Yy]$ ]]
}

# 检查文件大小
function check_file_size() {
  local file=$1
  local max_size=$2
  local size=$(wc -c < "$file")
  [ $size -le $max_size ]
}
```

使用示例：

```bash
#!/bin/bash
source .claude/hooks/lib/utils.sh

log_info "开始检查..."

if command_exists "npm"; then
  log_info "npm 已安装"
else
  log_error "npm 未安装"
  exit 1
fi

TS_FILES=$(get_staged_files_by_ext "ts")
if [ -n "$TS_FILES" ]; then
  log_info "找到 TypeScript 文件"
fi
```

## 最佳实践

### 1. 快速失败

```bash
#!/bin/bash
set -e  # 遇到错误立即退出
set -o pipefail  # 管道命令失败时退出
```

### 2. 提供清晰反馈

```bash
echo "→ 运行检查..."
if check_something; then
  echo "✓ 检查通过"
else
  echo "✗ 检查失败"
  exit 1
fi
```

### 3. 允许跳过

```bash
if [ "$SKIP_HOOKS" = "true" ]; then
  echo "跳过 Hook 执行"
  exit 0
fi
```

### 4. 性能优化

```bash
# 只检查变更的文件
CHANGED_FILES=$(git diff --cached --name-only)
if [ -n "$CHANGED_FILES" ]; then
  echo "$CHANGED_FILES" | xargs eslint
fi
```

## 下一步

- 查看 [团队规则库](./team-rules.md) 了解规范
- 学习 [Agent Loop 解析](./agent-loop.md) 理解原理
- 探索 [配置片段库](./config-snippets.md) 获取配置示例
