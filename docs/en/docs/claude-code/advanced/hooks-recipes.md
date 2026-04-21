---
title: "Hooks Recipes"
---

# Hooks Recipes

Hooks recipes provide practice-tested Hook script examples covering code quality, security checks, automated deployment, and other common scenarios. All scripts can be used directly or adjusted to your needs.

## Code Quality Hooks

### Full Pre-Commit Check

`.claude/hooks/pre-commit.sh`:

```bash
#!/bin/bash
set -e

echo "========================================="
echo "Running pre-commit checks"
echo "========================================="

# 1. Code formatting
echo ""
echo "→ Formatting code..."
if command -v prettier &> /dev/null; then
  git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx|json|css|md)$' | xargs npx prettier --write
  git add -u
  echo "✓ Code formatting complete"
else
  echo "⚠ Prettier not installed, skipping formatting"
fi

# 2. Linter check
echo ""
echo "→ Running linter..."
if npm run lint --silent; then
  echo "✓ Linter check passed"
else
  echo "✗ Linter check failed"
  exit 1
fi

# 3. TypeScript type check
echo ""
echo "→ TypeScript type checking..."
if npx tsc --noEmit; then
  echo "✓ Type check passed"
else
  echo "✗ Type check failed"
  exit 1
fi

# 4. Unit tests
echo ""
echo "→ Running unit tests..."
if npm run test:unit --silent; then
  echo "✓ Unit tests passed"
else
  echo "✗ Unit tests failed"
  exit 1
fi

# 5. Check commit message format
echo ""
echo "→ Validating commit message format..."
if [ -f .git/COMMIT_EDITMSG ]; then
  COMMIT_MSG=$(cat .git/COMMIT_EDITMSG)
  if ! echo "$COMMIT_MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
    echo "✗ Commit message does not follow Conventional Commits format"
    echo ""
    echo "Format: <type>(<scope>): <subject>"
    echo ""
    echo "Types:"
    echo "  feat:     New feature"
    echo "  fix:      Bug fix"
    echo "  docs:     Documentation update"
    echo "  style:    Code formatting"
    echo "  refactor: Refactoring"
    echo "  test:     Tests"
    echo "  chore:    Build/tools"
    exit 1
  fi
  echo "✓ Commit message format correct"
fi

echo ""
echo "========================================="
echo "✓ All checks passed"
echo "========================================="
```

### Staged Files Only Check

`.claude/hooks/pre-commit-staged.sh`:

```bash
#!/bin/bash
set -e

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
  echo "No staged files"
  exit 0
fi

echo "Checking staged files..."

# Filter TypeScript/JavaScript files
TS_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -n "$TS_FILES" ]; then
  echo ""
  echo "→ Linter check..."
  echo "$TS_FILES" | xargs npx eslint

  echo ""
  echo "→ Formatting..."
  echo "$TS_FILES" | xargs npx prettier --write
  echo "$TS_FILES" | xargs git add

  echo ""
  echo "→ Type check..."
  echo "$TS_FILES" | xargs npx tsc --noEmit
fi

echo ""
echo "✓ Check complete"
```

### Incremental Testing

`.claude/hooks/pre-commit-test.sh`:

```bash
#!/bin/bash
set -e

echo "Running incremental tests..."

# Get changed files
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' || true)

if [ -z "$CHANGED_FILES" ]; then
  echo "No files to test"
  exit 0
fi

# Find corresponding test files
TEST_FILES=""
for file in $CHANGED_FILES; do
  # Skip test files themselves
  if [[ $file == *.test.* ]] || [[ $file == *.spec.* ]]; then
    TEST_FILES="$TEST_FILES $file"
    continue
  fi

  # Find corresponding test file
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
  echo "Running tests: $TEST_FILES"
  npm test -- $TEST_FILES
  echo "✓ Tests passed"
else
  echo "⚠ No corresponding test files found"
fi
```

## File Operation Hooks

### Auto-Formatting

`.claude/hooks/post-write.sh`:

```bash
#!/bin/bash

FILE=$1

if [ -z "$FILE" ]; then
  echo "Error: No file specified"
  exit 1
fi

echo "Formatting file: $FILE"

# Choose formatting tool based on file type
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
    echo "⚠ Unsupported file type"
    ;;
esac

echo "✓ Formatting complete"
```

### File Backup

`.claude/hooks/pre-write.sh`:

```bash
#!/bin/bash

FILE=$1

if [ -z "$FILE" ]; then
  exit 0
fi

# Check if file exists
if [ ! -f "$FILE" ]; then
  exit 0
fi

# Create backup directory
BACKUP_DIR=".claude/backups/$(date +%Y-%m-%d)"
mkdir -p "$BACKUP_DIR"

# Backup file
BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE").$(date +%H%M%S).bak"
cp "$FILE" "$BACKUP_FILE"

echo "Backed up: $BACKUP_FILE"
```

### File Size Check

`.claude/hooks/pre-write-size.sh`:

```bash
#!/bin/bash

FILE=$1
MAX_SIZE=1048576  # 1MB

if [ -z "$FILE" ]; then
  exit 0
fi

# Check file size
if [ -f "$FILE" ]; then
  SIZE=$(wc -c < "$FILE")
  if [ $SIZE -gt $MAX_SIZE ]; then
    echo "Warning: File too large ($(($SIZE / 1024))KB > $(($MAX_SIZE / 1024))KB)"
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
fi
```

## Security Check Hooks

### Sensitive Information Scan

`.claude/hooks/pre-commit-secrets.sh`:

```bash
#!/bin/bash
set -e

echo "Scanning for sensitive information..."

# Sensitive information patterns
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

# Check staged files
FOUND=false
for pattern in "${PATTERNS[@]}"; do
  if git diff --cached | grep -iE "$pattern" > /dev/null; then
    if [ "$FOUND" = false ]; then
      echo ""
      echo "✗ Detected possible sensitive information:"
      FOUND=true
    fi
    git diff --cached | grep -iE "$pattern" --color=always
  fi
done

if [ "$FOUND" = true ]; then
  echo ""
  read -p "Confirm commit? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "✓ Sensitive information check passed"
```

### Dependency Vulnerability Scan

`.claude/hooks/pre-push-audit.sh`:

```bash
#!/bin/bash
set -e

echo "Running dependency vulnerability scan..."

# npm audit
if [ -f "package.json" ]; then
  echo ""
  echo "→ npm audit..."
  if npm audit --audit-level=high; then
    echo "✓ npm audit passed"
  else
    echo "✗ High severity vulnerabilities found"
    echo ""
    echo "Run 'npm audit fix' to fix"
    exit 1
  fi
fi

# Snyk (if installed)
if command -v snyk &> /dev/null; then
  echo ""
  echo "→ Snyk scan..."
  if snyk test; then
    echo "✓ Snyk scan passed"
  else
    echo "✗ Snyk found vulnerabilities"
    exit 1
  fi
fi

echo ""
echo "✓ Security scan passed"
```

### Code Security Scan

`.claude/hooks/pre-push-security.sh`:

```bash
#!/bin/bash
set -e

echo "Running code security scan..."

# Semgrep
if command -v semgrep &> /dev/null; then
  echo ""
  echo "→ Semgrep scan..."
  if semgrep --config=auto --error; then
    echo "✓ Semgrep scan passed"
  else
    echo "✗ Semgrep found security issues"
    exit 1
  fi
fi

# ESLint security rules
if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ]; then
  echo ""
  echo "→ ESLint security check..."
  if npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0; then
    echo "✓ ESLint security check passed"
  else
    echo "✗ ESLint found security issues"
    exit 1
  fi
fi

echo ""
echo "✓ Security scan passed"
```

## Test and Coverage Hooks

### Test Coverage Check

`.claude/hooks/pre-push-coverage.sh`:

```bash
#!/bin/bash
set -e

echo "Checking test coverage..."

# Run tests and generate coverage report
npm run test:coverage -- --silent

# Read coverage
if [ -f "coverage/coverage-summary.json" ]; then
  COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
  THRESHOLD=80

  echo ""
  echo "Current coverage: $COVERAGE%"
  echo "Threshold: $THRESHOLD%"

  if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
    echo ""
    echo "✗ Test coverage below threshold"
    exit 1
  fi

  echo ""
  echo "✓ Test coverage meets threshold"
else
  echo "⚠ Coverage report not found"
fi
```

### Test Performance Check

`.claude/hooks/pre-push-test-perf.sh`:

```bash
#!/bin/bash
set -e

echo "Checking test performance..."

# Run tests and record time
START_TIME=$(date +%s)
npm test
END_TIME=$(date +%s)

DURATION=$((END_TIME - START_TIME))
THRESHOLD=300  # 5 minutes

echo ""
echo "Test duration: ${DURATION}s"

if [ $DURATION -gt $THRESHOLD ]; then
  echo "⚠ Tests taking too long (> ${THRESHOLD}s)"
  echo "Consider optimizing tests or using parallel execution"
fi

echo "✓ Tests complete"
```

## Documentation Sync Hooks

### API Documentation Auto-Update

`.claude/hooks/post-commit-docs.sh`:

```bash
#!/bin/bash

echo "Checking if documentation needs update..."

# Check for API changes
if git diff HEAD~1 --name-only | grep -E "src/api|src/routes" > /dev/null; then
  echo ""
  echo "API changes detected, updating documentation..."

  # Generate API documentation
  npm run generate-api-docs

  # If documentation changed, auto-commit
  if ! git diff --quiet docs/api/; then
    git add docs/api/
    git commit --amend --no-edit
    echo "✓ API documentation updated and appended to commit"
  else
    echo "✓ No API documentation changes"
  fi
else
  echo "✓ No API changes"
fi
```

### README Sync

`.claude/hooks/post-commit-readme.sh`:

```bash
#!/bin/bash

echo "Checking if README needs update..."

# Check for package.json changes
if git diff HEAD~1 --name-only | grep "package.json" > /dev/null; then
  echo ""
  echo "package.json changes detected, checking README..."

  # Extract version number
  VERSION=$(cat package.json | jq -r '.version')

  # Update version number in README
  if grep -q "Version:" README.md; then
    sed -i.bak "s/Version: .*/Version: $VERSION/" README.md
    rm README.md.bak

    if ! git diff --quiet README.md; then
      git add README.md
      git commit --amend --no-edit
      echo "✓ README version number updated"
    fi
  fi
fi
```

## Build and Deploy Hooks

### Build Verification

`.claude/hooks/pre-push-build.sh`:

```bash
#!/bin/bash
set -e

echo "Verifying build..."

# Clean old build artifacts
echo ""
echo "→ Cleaning build artifacts..."
rm -rf dist build .next

# Run build
echo ""
echo "→ Running build..."
if npm run build; then
  echo "✓ Build successful"
else
  echo "✗ Build failed"
  exit 1
fi

# Check build artifacts
echo ""
echo "→ Checking build artifacts..."
if [ -d "dist" ] || [ -d "build" ] || [ -d ".next" ]; then
  echo "✓ Build artifacts generated successfully"
else
  echo "✗ No build artifacts found"
  exit 1
fi

# Check build size
echo ""
echo "→ Checking build size..."
if [ -d "dist" ]; then
  SIZE=$(du -sh dist | cut -f1)
  echo "Build size: $SIZE"
fi

echo ""
echo "✓ Build verification passed"
```

### Pre-Deploy Check

`.claude/hooks/pre-deploy.sh`:

```bash
#!/bin/bash
set -e

ENV=$1

if [ -z "$ENV" ]; then
  echo "Error: Environment not specified"
  exit 1
fi

echo "========================================="
echo "Pre-deploy check ($ENV)"
echo "========================================="

# 1. Check branch
echo ""
echo "→ Checking branch..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$ENV" = "production" ] && [ "$CURRENT_BRANCH" != "main" ]; then
  echo "✗ Production can only deploy from main branch"
  exit 1
fi

echo "✓ Branch check passed: $CURRENT_BRANCH"

# 2. Check uncommitted changes
echo ""
echo "→ Checking uncommitted changes..."
if ! git diff --quiet; then
  echo "✗ Uncommitted changes exist"
  exit 1
fi
echo "✓ No uncommitted changes"

# 3. Sync with remote
echo ""
echo "→ Syncing with remote..."
git fetch origin
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/$CURRENT_BRANCH)" ]; then
  echo "✗ Local branch out of sync with remote"
  exit 1
fi
echo "✓ In sync with remote"

# 4. Run tests
echo ""
echo "→ Running tests..."
npm test
echo "✓ Tests passed"

# 5. Run build
echo ""
echo "→ Running build..."
npm run build
echo "✓ Build successful"

echo ""
echo "========================================="
echo "✓ Pre-deploy check passed"
echo "========================================="
```

## Notification Hooks

### Slack Notification

`.claude/hooks/post-push-notify.sh`:

```bash
#!/bin/bash

# Slack Webhook URL
SLACK_WEBHOOK="${SLACK_WEBHOOK_URL}"

if [ -z "$SLACK_WEBHOOK" ]; then
  exit 0
fi

# Get commit info
COMMIT_MSG=$(git log -1 --pretty=%B)
COMMIT_AUTHOR=$(git log -1 --pretty=%an)
COMMIT_HASH=$(git log -1 --pretty=%h)
BRANCH=$(git branch --show-current)

# Send notification
curl -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d "{
    \"text\": \"New commit pushed\",
    \"attachments\": [{
      \"color\": \"good\",
      \"fields\": [
        {\"title\": \"Branch\", \"value\": \"$BRANCH\", \"short\": true},
        {\"title\": \"Author\", \"value\": \"$COMMIT_AUTHOR\", \"short\": true},
        {\"title\": \"Commit\", \"value\": \"$COMMIT_HASH\", \"short\": true},
        {\"title\": \"Message\", \"value\": \"$COMMIT_MSG\", \"short\": false}
      ]
    }]
  }"

echo "✓ Slack notification sent"
```

### Email Notification

`.claude/hooks/post-deploy-email.sh`:

```bash
#!/bin/bash

ENV=$1
STATUS=$2

# Email configuration
TO="team@example.com"
FROM="deploy@example.com"
SUBJECT="Deploy notification: $ENV - $STATUS"

# Build email content
BODY="
Deploy environment: $ENV
Deploy status: $STATUS
Deploy time: $(date)
Commit hash: $(git log -1 --pretty=%h)
Commit author: $(git log -1 --pretty=%an)
Commit message: $(git log -1 --pretty=%B)
"

# Send email
echo "$BODY" | mail -s "$SUBJECT" -r "$FROM" "$TO"

echo "✓ Email notification sent"
```

## Hook Utility Functions

### Common Utility Library

`.claude/hooks/lib/utils.sh`:

```bash
#!/bin/bash

# Color output
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

# Check if command exists
function command_exists() {
  command -v "$1" &> /dev/null
}

# Get staged files
function get_staged_files() {
  git diff --cached --name-only --diff-filter=ACM
}

# Get staged files by specific extension
function get_staged_files_by_ext() {
  local ext=$1
  get_staged_files | grep -E "\\.${ext}$" || true
}

# Confirm prompt
function confirm() {
  local message=$1
  read -p "$message (y/N) " -n 1 -r
  echo
  [[ $REPLY =~ ^[Yy]$ ]]
}

# Check file size
function check_file_size() {
  local file=$1
  local max_size=$2
  local size=$(wc -c < "$file")
  [ $size -le $max_size ]
}
```

Usage example:

```bash
#!/bin/bash
source .claude/hooks/lib/utils.sh

log_info "Starting check..."

if command_exists "npm"; then
  log_info "npm is installed"
else
  log_error "npm is not installed"
  exit 1
fi

TS_FILES=$(get_staged_files_by_ext "ts")
if [ -n "$TS_FILES" ]; then
  log_info "Found TypeScript files"
fi
```

## Best Practices

### 1. Fail Fast

```bash
#!/bin/bash
set -e  # Exit immediately on error
set -o pipefail  # Exit when pipe command fails
```

### 2. Provide Clear Feedback

```bash
echo "→ Running check..."
if check_something; then
  echo "✓ Check passed"
else
  echo "✗ Check failed"
  exit 1
fi
```

### 3. Allow Skipping

```bash
if [ "$SKIP_HOOKS" = "true" ]; then
  echo "Skipping Hook execution"
  exit 0
fi
```

### 4. Performance Optimization

```bash
# Only check changed files
CHANGED_FILES=$(git diff --cached --name-only)
if [ -n "$CHANGED_FILES" ]; then
  echo "$CHANGED_FILES" | xargs eslint
fi
```

## Next Steps

- Check out the [Team Rules Library](./team-rules.md) for standards
- Learn about [Agent Loop Analysis](./agent-loop.md) to understand the principles
- Explore the [Config Snippets Library](./config-snippets.md) for configuration examples
