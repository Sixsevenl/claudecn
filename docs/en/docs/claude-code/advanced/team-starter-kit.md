---
title: "Team Starter Kit"
---

# Team Starter Kit

Quickly set up your team's Claude Code configuration. This Starter Kit provides ready-to-use configuration, Skills, Hooks, and best practices to help your team start using Claude Code in minutes.

## Quick Start

### 1. Clone the Starter Kit

```bash
# Download Starter Kit
curl -L https://github.com/anthropics/claude-code-starter-kit/archive/main.zip -o starter-kit.zip
unzip starter-kit.zip

# Copy to project
cp -r claude-code-starter-kit/.claude /path/to/your/project/
cd /path/to/your/project
```

### 2. Run Setup Script

```bash
chmod +x .claude/scripts/setup.sh
./.claude/scripts/setup.sh
```

### 3. Configure API Key

```bash
export ANTHROPIC_API_KEY="your-api-key"
echo 'export ANTHROPIC_API_KEY="your-api-key"' >> ~/.zshrc
```

### 4. Verify Installation

```bash
claude --version
claude --list-skills
claude "Help me understand this project"
```

## Starter Kit Contents

### Directory Structure

```
.claude/
├── config.json                 # Main configuration
├── .claudeignore              # Ignore rules
├── skills/                    # Pre-built Skills
│   ├── commit.md              # Smart commits
│   ├── review.md              # Code review
│   ├── test-gen.md            # Test generation
│   ├── refactor.md            # Code refactoring
│   └── docs-gen.md            # Documentation generation
├── hooks/                     # Automation Hooks
│   ├── pre-commit.sh          # Pre-commit checks
│   ├── post-write.sh          # Post-write formatting
│   └── pre-push.sh            # Pre-push validation
├── templates/                 # Code templates
│   ├── react-component.tsx    # React component
│   ├── api-route.ts           # API route
│   ├── test.spec.ts           # Test file
│   └── readme.md              # README template
├── rules/                     # Team rules
│   ├── coding-standards.md    # Coding standards
│   ├── commit-convention.md   # Commit conventions
│   ├── review-checklist.md    # Review checklist
│   └── security-guidelines.md # Security guidelines
├── scripts/                   # Utility scripts
│   ├── setup.sh               # Setup script
│   ├── validate.sh            # Config validation
│   └── migrate.sh             # Version migration
└── docs/                      # Documentation
    ├── README.md              # Usage guide
    ├── SETUP.md               # Setup guide
    ├── SKILLS.md              # Skills docs
    └── TROUBLESHOOTING.md     # Troubleshooting
```

### Pre-built Configuration

`.claude/config.json`:

```json
{
  "version": "1.0.0",
  "team": {
    "name": "YourTeam",
    "repository": "https://github.com/yourorg/yourproject"
  },
  "model": {
    "name": "claude-3-5-sonnet-20241022",
    "temperature": 0.7,
    "maxTokens": 4096
  },
  "tools": {
    "allowed": ["read", "write", "edit", "bash", "grep", "glob"],
    "restricted": {
      "write": {
        "requireApproval": true,
        "excludePaths": ["node_modules/**", ".git/**", "dist/**"]
      }
    }
  },
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 120000
    },
    "postWrite": {
      "command": "./.claude/hooks/post-write.sh",
      "enabled": true,
      "blocking": false
    },
    "prePush": {
      "command": "./.claude/hooks/pre-push.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 180000
    }
  },
  "customCommands": {
    "test": {
      "description": "Run tests",
      "command": "npm test"
    },
    "lint": {
      "description": "Code check",
      "command": "npm run lint"
    },
    "format": {
      "description": "Format code",
      "command": "npm run format"
    },
    "build": {
      "description": "Build project",
      "command": "npm run build"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example",
      "README.md"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.log"
    ]
  }
}
```

### Pre-built Skills

#### Smart Commit Skill

`.claude/skills/commit.md`:

````markdown
---
name: commit
description: Generate Git commit messages following conventions
args:
  - name: type
    description: Commit type
    choices: [feat, fix, docs, style, refactor, test, chore]
    required: false
---

# Smart Commit Skill

Analyze code changes and generate commit messages following Conventional Commits.

## Process

1. Run `git diff --staged` to view staged changes
2. Analyze the nature and scope of changes
3. Determine commit type and scope
4. Generate commit message (title + body)
5. Execute `git commit`

## Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Convention Reference

See: `.claude/rules/commit-convention.md`
````

#### Code Review Skill

`.claude/skills/review.md`:

```markdown
---
name: review
description: Comprehensive code review
args:
  - name: target
    description: Review target (file path or git diff)
    required: false
---

# Code Review Skill

Perform comprehensive code review against team review checklist.

## Review Dimensions

1. Functionality: Does it implement requirements
2. Code Quality: Does it follow standards
3. Performance: Are there performance issues
4. Security: Are there security vulnerabilities
5. Maintainability: Is it easy to maintain
6. Testing: Is testing sufficient

## Review Checklist

See: `.claude/rules/review-checklist.md`

## Output Format

- Passed items list
- Failed items list (with improvement suggestions)
- Overall score
- Key recommendations
```

#### Test Generation Skill

`.claude/skills/test-gen.md`:

```markdown
---
name: test-gen
description: Generate unit tests
args:
  - name: file
    description: Target file path
    required: true
  - name: framework
    description: Test framework
    choices: [jest, vitest, mocha]
    default: jest
---

# Test Generation Skill

Generate comprehensive unit tests for specified code files.

## Test Strategy

1. Analyze source code structure
2. Identify all public functions/methods
3. Generate test cases for each function:
   - Normal path tests
   - Edge case tests
   - Error handling tests
4. Mock external dependencies
5. Run tests to verify

## Test Quality Standards

- At least 3 test cases per public function
- Coverage target: 80%+
- Clear test descriptions
- Meaningful assertions
```

### Pre-built Hooks

#### Pre-commit Check

`.claude/hooks/pre-commit.sh`:

```bash
#!/bin/bash
set -e

echo "Running pre-commit checks..."

# 1. Code formatting
echo "→ Formatting code..."
npm run format

# 2. Linter check
echo "→ Running linter..."
npm run lint

# 3. Type check
echo "→ TypeScript type check..."
npx tsc --noEmit

# 4. Unit tests
echo "→ Running unit tests..."
npm run test:unit

# 5. Validate commit message format
echo "→ Validating commit message..."
if [ -f .git/COMMIT_EDITMSG ]; then
  if ! grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+" .git/COMMIT_EDITMSG; then
    echo "Error: Commit message does not follow Conventional Commits format"
    echo "Format: <type>(<scope>): <subject>"
    exit 1
  fi
fi

echo "All checks passed"
```

#### Post-write Formatting

`.claude/hooks/post-write.sh`:

```bash
#!/bin/bash

FILE=$1

echo "Formatting file: $FILE"

# Choose formatter based on file type
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx)
    npx prettier --write "$FILE"
    npx eslint --fix "$FILE" 2>/dev/null || true
    ;;
  *.json)
    npx prettier --write "$FILE"
    ;;
  *.md)
    npx prettier --write "$FILE"
    ;;
  *.css|*.scss)
    npx prettier --write "$FILE"
    ;;
esac

echo "Formatting complete"
```

#### Pre-push Validation

`.claude/hooks/pre-push.sh`:

```bash
#!/bin/bash
set -e

echo "Running pre-push validation..."

# 1. Run all tests
echo "→ Running all tests..."
npm test

# 2. Check test coverage
echo "→ Checking test coverage..."
npm run test:coverage
COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
THRESHOLD=80

if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
  echo "Error: Test coverage $COVERAGE% below threshold $THRESHOLD%"
  exit 1
fi

# 3. Build check
echo "→ Build check..."
npm run build

# 4. Security scan
echo "→ Dependency vulnerability scan..."
npm audit --audit-level=high

echo "All validations passed"
```

### Code Templates

#### React Component Template

`.claude/templates/react-component.tsx`:

```typescript
import React from 'react';

interface I{{ComponentName}}Props {
  // Props definition
}

/**
 * {{ComponentName}} component
 *
 * @description {{ComponentDescription}}
 */
export function {{ComponentName}}(props: I{{ComponentName}}Props) {
  // Hooks

  // Event handlers

  // Render
  return (
    <div className="{{component-name}}">
      {/* Component content */}
    </div>
  );
}
```

#### API Route Template

`.claude/templates/api-route.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';

/**
 * {{RouteDescription}}
 *
 * @route {{Method}} {{Path}}
 * @access {{Access}}
 */
export async function {{HandlerName}}(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Parameter validation
    const { param1, param2 } = req.body;

    // Business logic

    // Return response
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}
```

#### Test File Template

`.claude/templates/test.spec.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('{{TestSuite}}', () => {
  beforeEach(() => {
    // Test setup
  });

  afterEach(() => {
    // Test cleanup
  });

  describe('{{Feature}}', () => {
    it('should {{behavior}}', () => {
      // Arrange
      const input = {};

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBeDefined();
    });

    it('should handle edge cases', () => {
      // Edge case tests
    });

    it('should handle errors', () => {
      // Error handling tests
    });
  });
});
```

## Customizing the Starter Kit

### 1. Fork and Modify

```bash
# Fork the Starter Kit repository
git clone https://github.com/yourorg/claude-code-starter-kit.git
cd claude-code-starter-kit

# Modify configuration
vim .claude/config.json

# Add team-specific Skills
vim .claude/skills/custom-skill.md

# Commit changes
git add .
git commit -m "chore: Customize team configuration"
git push
```

### 2. Create Team Template

```bash
# Create template repository
mkdir my-team-starter-kit
cd my-team-starter-kit

# Copy base structure
cp -r /path/to/starter-kit/.claude .

# Add team-specific content
# - Coding standards
# - Commit conventions
# - Review checklist
# - Custom Skills

# Initialize Git
git init
git add .
git commit -m "feat: Initialize team Starter Kit"
```

### 3. Distribute to Team

```bash
# Option 1: Git repository
git remote add origin https://github.com/yourorg/team-starter-kit.git
git push -u origin main

# Option 2: Archive
tar -czf team-starter-kit.tar.gz .claude/
# Distribute to team members

# Option 3: npm package
npm init
npm publish
```

## Starter Kits for Different Tech Stacks

### React + TypeScript

```json
{
  "customCommands": {
    "dev": {
      "description": "Start dev server",
      "command": "npm run dev"
    },
    "storybook": {
      "description": "Start Storybook",
      "command": "npm run storybook"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      "vite.config.ts"
    ]
  }
}
```

### Node.js + Express

```json
{
  "customCommands": {
    "dev": {
      "description": "Start dev server",
      "command": "npm run dev"
    },
    "db-migrate": {
      "description": "Run database migrations",
      "command": "npm run migrate"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example"
    ]
  }
}
```

### Python + Django

```json
{
  "customCommands": {
    "runserver": {
      "description": "Start dev server",
      "command": "python manage.py runserver"
    },
    "migrate": {
      "description": "Run database migrations",
      "command": "python manage.py migrate"
    },
    "test": {
      "description": "Run tests",
      "command": "pytest"
    }
  },
  "context": {
    "alwaysInclude": [
      "requirements.txt",
      "manage.py",
      "settings.py"
    ]
  }
}
```

### Go

```json
{
  "customCommands": {
    "run": {
      "description": "Run application",
      "command": "go run main.go"
    },
    "test": {
      "description": "Run tests",
      "command": "go test ./..."
    },
    "build": {
      "description": "Build application",
      "command": "go build -o bin/app"
    }
  },
  "context": {
    "alwaysInclude": [
      "go.mod",
      "go.sum",
      "main.go"
    ]
  }
}
```

## Team Onboarding Process

### New Member Setup Checklist

```markdown
# Claude Code Setup Checklist

## Prerequisites
- [ ] Install Node.js 18+
- [ ] Install Git
- [ ] Get Anthropic API key

## Installation Steps
- [ ] Clone project repository
- [ ] Run `.claude/scripts/setup.sh`
- [ ] Configure API key
- [ ] Verify installation

## Learning Resources
- [ ] Read `.claude/docs/README.md`
- [ ] View Skills documentation
- [ ] Understand team conventions

## First Use
- [ ] Run `claude "Help me understand this project"`
- [ ] Try `claude /commit`
- [ ] Try `claude /review`
```

### Training Materials

Create `.claude/docs/TRAINING.md`:

```markdown
# Claude Code Training

## Basic Usage

### 1. Conversational Interaction
```bash
claude "Help me understand the auth module implementation"
claude "Refactor the UserService class"
```

### 2. Using Skills
```bash
claude /commit          # Smart commit
claude /review          # Code review
claude /test-gen src/utils.ts  # Generate tests
```

### 3. Custom Commands
```bash
claude test             # Run tests
claude lint             # Code check
claude deploy-staging   # Deploy to staging
```

## Best Practices

1. Provide clear context
2. Use specific descriptions
3. Verify AI-generated code
4. Follow team conventions

## Common Scenarios

### Feature Development
```bash
claude "Implement user login feature, including frontend form and backend API"
```

### Bug Fix
```bash
claude "Fix the token expiration issue during login"
```

### Code Review
```bash
claude /review src/auth/login.ts
```

### Test Writing
```bash
claude /test-gen src/auth/login.ts
```
```

## Maintenance and Updates

### Regular Review

Monthly review checklist:

```markdown
# Configuration Review Checklist

## Configuration Files
- [ ] Check for outdated configuration items
- [ ] Update dependency versions
- [ ] Verify environment variables

## Skills
- [ ] Review Skills usage frequency
- [ ] Update outdated Skills
- [ ] Add new Skills

## Hooks
- [ ] Check Hooks execution time
- [ ] Optimize slow Hooks
- [ ] Update check rules

## Documentation
- [ ] Update usage instructions
- [ ] Add FAQ entries
- [ ] Add new examples
```

### Version Upgrade

```bash
# Check for updates
claude --check-updates

# Upgrade configuration
./.claude/scripts/migrate.sh

# Verify upgrade
./.claude/scripts/validate.sh
```

## Troubleshooting

### Common Issues

**Setup script failed**
```bash
# Check permissions
chmod +x .claude/scripts/setup.sh

# Execute steps manually
npm install -g @anthropic-ai/claude-code
export ANTHROPIC_API_KEY="your-key"
```

**Hooks not executing**
```bash
# Check permissions
chmod +x .claude/hooks/*.sh

# Test manually
./.claude/hooks/pre-commit.sh
```

**Skills not found**
```bash
# List Skills
claude --list-skills

# Check path
ls -la .claude/skills/
```

## Getting Help

- View documentation: `.claude/docs/`
- FAQ: `.claude/docs/TROUBLESHOOTING.md`
- Team support: Contact DevOps team
- Official docs: https://docs.anthropic.com/claude-code

## Next Steps

- Explore [Config as Code](./team-config-as-code.md)
- Learn about the [Pattern Library](./pattern-library.md)
- View the [Config Snippets Library](./config-snippets.md)
