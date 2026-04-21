---
title: "Hooks System"
---

# Hooks System

Hooks are Claude Code's event-driven mechanism that allows you to automatically execute scripts or trigger Skills at specific moments. With Hooks, you can build automated workflows and ensure consistency of team standards.

## What are Hooks

Hooks are scripts or commands that automatically trigger when specific events occur. Similar to Git Hooks, but more powerful:

- **Event-driven**: Respond to various Claude Code events
- **Programmable**: Use any scripting language
- **Composable**: Multiple Hooks can execute in chains
- **Conditional triggering**: Support conditional logic

## Hook Types

### Lifecycle Hooks

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

### File Operation Hooks

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

### Git Integration Hooks

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

### Custom Event Hooks

```json
{
  "hooks": {
    "onError": "./scripts/error-handler.sh",
    "onSuccess": "./scripts/success-handler.sh",
    "onTestFail": "./scripts/test-fail-handler.sh"
  }
}
```

## Configuring Hooks

### Basic Configuration

`.claude/config.json`:

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

### Hook Configuration Options

```json
{
  "hooks": {
    "hookName": {
      "command": "Command to execute",
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

## Practical Hook Examples

### 1. Code Quality Check

`.claude/hooks/pre-commit.sh`:

```bash
#!/bin/bash
set -e

echo "Running code quality checks..."

# 1. Linter check
echo "→ Running linter..."
npm run lint

# 2. Type check
echo "→ TypeScript type check..."
tsc --noEmit

# 3. Unit tests
echo "→ Running unit tests..."
npm run test:unit

# 4. Check commit message format
echo "→ Validating commit message..."
if ! grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+" .git/COMMIT_EDITMSG; then
  echo "Error: Commit message does not follow Conventional Commits format"
  exit 1
fi

echo "All checks passed"
```

Configuration:

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

### 2. Auto-Formatting

`.claude/hooks/post-write.sh`:

```bash
#!/bin/bash

FILE=$1

# Choose formatter based on file type
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx)
    echo "Formatting JavaScript/TypeScript file: $FILE"
    npx prettier --write "$FILE"
    npx eslint --fix "$FILE"
    ;;
  *.py)
    echo "Formatting Python file: $FILE"
    black "$FILE"
    isort "$FILE"
    ;;
  *.go)
    echo "Formatting Go file: $FILE"
    gofmt -w "$FILE"
    ;;
  *.rs)
    echo "Formatting Rust file: $FILE"
    rustfmt "$FILE"
    ;;
esac
```

Configuration:

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

### 3. Dependency Check

`.claude/hooks/pre-session.sh`:

```bash
#!/bin/bash

echo "Checking project dependencies..."

# Check Node.js version
REQUIRED_NODE_VERSION="18.0.0"
CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2)

if [ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$CURRENT_NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE_VERSION" ]; then
  echo "Warning: Node.js version too low, need >= $REQUIRED_NODE_VERSION"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Dependencies not installed, running npm install..."
  npm install
fi

# Check if dependencies are outdated
if [ -f "package-lock.json" ]; then
  if [ "package.json" -nt "node_modules" ]; then
    echo "Dependencies outdated, running npm install..."
    npm install
  fi
fi

echo "Dependency check complete"
```

### 4. Security Scan

`.claude/hooks/pre-push.sh`:

```bash
#!/bin/bash
set -e

echo "Running security scan..."

# 1. Check for sensitive information
echo "→ Scanning for sensitive information..."
if git diff --cached | grep -iE "(password|secret|api_key|token)" > /dev/null; then
  echo "Warning: Potential sensitive information detected"
  git diff --cached | grep -iE "(password|secret|api_key|token)"
  read -p "Confirm continue? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# 2. Dependency vulnerability scan
echo "→ Scanning dependency vulnerabilities..."
npm audit --audit-level=high

# 3. Code security scan
echo "→ Running Semgrep..."
semgrep --config=auto --error

echo "Security scan passed"
```

### 5. Documentation Sync

`.claude/hooks/post-commit.sh`:

```bash
#!/bin/bash

# Check for API changes
if git diff HEAD~1 --name-only | grep -E "src/api|src/routes" > /dev/null; then
  echo "API changes detected, updating documentation..."

  # Generate API documentation
  npm run generate-api-docs

  # If documentation changed, auto-commit
  if ! git diff --quiet docs/api/; then
    git add docs/api/
    git commit --amend --no-edit
    echo "API documentation updated"
  fi
fi
```

### 6. Test Coverage Check

`.claude/hooks/pre-push.sh`:

```bash
#!/bin/bash
set -e

echo "Checking test coverage..."

# Run tests and generate coverage report
npm run test:coverage -- --silent

# Read coverage
COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
THRESHOLD=80

if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
  echo "Error: Test coverage $COVERAGE% below threshold $THRESHOLD%"
  exit 1
fi

echo "Test coverage $COVERAGE% (>= $THRESHOLD%)"
```

## Advanced Features

### Conditional Execution

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

### Parallel Execution

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

### Chained Execution

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

### Error Handling

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

### Environment Variable Passing

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

## Hook Variables

Variables available in Hooks:

```bash
# File-related
${file}              # Current file path
${files}             # All related files
${stagedFiles}       # Git staged files
${modifiedFiles}     # Modified files

# Git-related
${currentBranch}     # Current branch
${commitMessage}     # Commit message
${commitHash}        # Commit hash

# Project-related
${projectRoot}       # Project root directory
${workingDir}        # Working directory

# Session-related
${sessionId}         # Session ID
${timestamp}         # Timestamp
```

## Integration with Skills

Hooks can trigger Skills:

```json
{
  "hooks": {
    "postCommit": {
      "command": "claude /notify-team 'New commit: ${commitMessage}'"
    },
    "onTestFail": {
      "command": "claude /analyze-failure ${testFile}"
    }
  }
}
```

## Debugging Hooks

### Enabling Verbose Output

```bash
# View Hook execution logs
claude --hook-logs

# Debug specific Hook
claude --debug-hook preCommit
```

### Testing Hooks

```bash
# Manually trigger Hook
claude --run-hook preCommit

# Dry run mode
claude --dry-run-hook preCommit
```

### Hook Execution Log

`.claude/logs/hooks.log`:

```
[2024-01-15 10:30:00] preCommit: Started execution
[2024-01-15 10:30:05] preCommit: Running linter...
[2024-01-15 10:30:08] preCommit: Linter passed
[2024-01-15 10:30:08] preCommit: Running tests...
[2024-01-15 10:30:15] preCommit: Tests passed
[2024-01-15 10:30:15] preCommit: Complete (15s)
```

## Best Practices

### 1. Fail Fast

```bash
#!/bin/bash
set -e  # Exit immediately on error

# Fast checks first
npm run lint
npm run type-check
npm test
```

### 2. Provide Feedback

```bash
#!/bin/bash

echo "→ Running code checks..."
if npm run lint; then
  echo "Linter passed"
else
  echo "Linter failed"
  exit 1
fi
```

### 3. Performance Optimization

```bash
#!/bin/bash

# Only check changed files
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -n "$CHANGED_FILES" ]; then
  echo "$CHANGED_FILES" | xargs npx eslint
fi
```

### 4. Configurability

```bash
#!/bin/bash

# Allow skipping Hooks
if [ "$SKIP_HOOKS" = "true" ]; then
  echo "Skipping Hook execution"
  exit 0
fi

# Read configuration
LINT_ENABLED=$(jq -r '.hooks.lint.enabled' .claude/config.json)
if [ "$LINT_ENABLED" = "true" ]; then
  npm run lint
fi
```

### 5. Error Recovery

```bash
#!/bin/bash

# Save current state
STASH_NAME="hook-backup-$(date +%s)"
git stash push -m "$STASH_NAME"

# Execute operation
if ! npm run risky-operation; then
  echo "Operation failed, restoring state..."
  git stash pop
  exit 1
fi

# Clean up
git stash drop
```

## Team Collaboration

### Sharing Hooks

Add Hooks to version control:

```bash
git add .claude/hooks/
git add .claude/config.json
git commit -m "chore: Add team Hooks"
```

### Hooks Documentation

`.claude/hooks/README.md`:

```markdown
# Team Hooks Documentation

## Available Hooks

### preCommit
Runs code quality checks before commits.

Checks:
- ESLint
- TypeScript type check
- Unit tests
- Commit message format

### postWrite
Auto-formats files after writing.

Supported formats:
- JavaScript/TypeScript (Prettier + ESLint)
- Python (Black + isort)
- Go (gofmt)

### prePush
Runs full tests and security scan before push.

Checks:
- All tests
- Test coverage
- Dependency vulnerability scan
- Sensitive information check

## Skipping Hooks

Hooks can be skipped in emergencies:

```bash
SKIP_HOOKS=true claude commit
```

## Troubleshooting

If a Hook fails:
1. Read the error message
2. Run the Hook script manually
3. Check logs: `.claude/logs/hooks.log`
```

### Gradual Enablement

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

Start with `warn` mode, then switch to `error` after the team adapts.

## Security Considerations

### Permission Control

```bash
#!/bin/bash

# Check execution permission
if [ ! -x "$0" ]; then
  echo "Error: Hook script does not have execute permission"
  exit 1
fi

# Verify script source
SCRIPT_HASH=$(sha256sum "$0" | cut -d' ' -f1)
EXPECTED_HASH=$(cat .claude/hooks/checksums.txt | grep "$(basename "$0")" | cut -d' ' -f1)

if [ "$SCRIPT_HASH" != "$EXPECTED_HASH" ]; then
  echo "Warning: Hook script has been modified"
fi
```

### Audit Logging

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

## Troubleshooting

### Common Issues

**Hook not executing**
- Check `enabled` setting
- Verify script path
- Confirm execution permissions

**Hook timeout**
- Increase `timeout` setting
- Optimize script performance
- Consider async execution

**Hook fails but doesn't block operation**
- Check `blocking` setting
- Review `onFailure` configuration
- Verify exit code

**Variables not substituted**
- Check variable name spelling
- Confirm variable is available in current context
- Use `--debug` to view variable values

## Next Steps

- Explore [Custom Commands](./custom-commands.md) to extend functionality
- Learn about [Hooks Recipes](./hooks-recipes.md) for more examples
- Check the [Team Rules Library](./team-rules.md) for best practices
