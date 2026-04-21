---
title: "Team Config as Code"
---

# Team Config as Code

Bring Claude Code configuration into version control to standardize team collaboration and automation. Through the "Configuration as Code" approach, ensure all team members use consistent workflows and standards.

## Why Configuration as Code

### Traditional Problems

- **Inconsistent configurations**: Everyone has different local settings
- **Knowledge silos**: Best practices are hard to share
- **Slow onboarding**: New members need manual setup
- **Hard to enforce standards**: Relies on manual checks

### Benefits of Configuration as Code

- **Version control**: Configuration changes are traceable
- **Team sync**: Automatically apply team configuration
- **Quick onboarding**: New members clone and go
- **Enforced standards**: Automatically executed through Hooks

## Directory Structure

Standard team configuration structure:

```
.claude/
├── config.json              # Main configuration file
├── .claudeignore           # Ignore file rules
├── skills/                 # Team Skills
│   ├── commit.md
│   ├── review.md
│   ├── test-gen.md
│   └── deploy.md
├── hooks/                  # Team Hooks
│   ├── pre-commit.sh
│   ├── post-write.sh
│   └── pre-push.sh
├── templates/              # Code templates
│   ├── component.tsx
│   ├── api-route.ts
│   └── test.spec.ts
├── rules/                  # Team rules
│   ├── coding-standards.md
│   ├── commit-convention.md
│   └── review-checklist.md
└── docs/                   # Configuration docs
    ├── README.md
    ├── SETUP.md
    └── TROUBLESHOOTING.md
```

## Main Configuration File

`.claude/config.json`:

```json
{
  "version": "1.0.0",
  "team": {
    "name": "MyTeam",
    "repository": "https://github.com/myorg/myproject"
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
        "excludePaths": ["node_modules/**", ".git/**"]
      },
      "bash": {
        "requireApproval": false,
        "allowedCommands": ["npm", "git", "node"]
      }
    }
  },
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true
    },
    "postWrite": {
      "command": "./.claude/hooks/post-write.sh",
      "enabled": true,
      "blocking": false
    },
    "prePush": {
      "command": "./.claude/hooks/pre-push.sh",
      "enabled": true,
      "blocking": true
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
    "deploy-staging": {
      "description": "Deploy to staging",
      "command": "./scripts/deploy.sh staging",
      "confirmBefore": true
    }
  },
  "rules": {
    "codingStandards": "./.claude/rules/coding-standards.md",
    "commitConvention": "./.claude/rules/commit-convention.md",
    "reviewChecklist": "./.claude/rules/review-checklist.md"
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      "*.log"
    ]
  }
}
```

## Team Rule Files

### Coding Standards

`.claude/rules/coding-standards.md`:

````markdown
# Coding Standards

## TypeScript Standards

### Naming Conventions
- Class names: PascalCase
- Function names: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: Prefix with I (IUser)
- Types: Prefix with T (TUserData)

### File Organization
```typescript
// 1. Imports
import { external } from 'external-lib';
import { internal } from '@/internal';

// 2. Type definitions
interface IProps {
  name: string;
}

// 3. Constants
const MAX_RETRIES = 3;

// 4. Main code
export function Component(props: IProps) {
  // Implementation
}
```

### Error Handling
- Use try-catch for async errors
- Custom error types
- Provide meaningful error messages

### Comment Standards
- Public APIs must have JSDoc
- Add inline comments for complex logic
- Avoid meaningless comments

## React Standards

### Component Structure
```typescript
// 1. Props interface
interface IButtonProps {
  label: string;
  onClick: () => void;
}

// 2. Component definition
export function Button({ label, onClick }: IButtonProps) {
  // 3. Hooks
  const [loading, setLoading] = useState(false);

  // 4. Event handlers
  const handleClick = () => {
    setLoading(true);
    onClick();
  };

  // 5. Render
  return <button onClick={handleClick}>{label}</button>;
}
```

### Hooks Usage
- Follow Rules of Hooks
- Custom Hooks start with use
- Avoid using Hooks in loops/conditions

## Testing Standards

### Test Structure
```typescript
describe('Component', () => {
  describe('when prop X is Y', () => {
    it('should do Z', () => {
      // Arrange
      const props = { x: 'y' };

      // Act
      const result = render(<Component {...props} />);

      // Assert
      expect(result).toBeDefined();
    });
  });
});
```

### Test Coverage
- Unit tests: 80%+
- Integration tests: Critical paths
- E2E tests: Core features

## Performance Standards

- Avoid unnecessary re-renders
- Use useMemo/useCallback
- Lazy load large components
- Optimize images and assets
````

### Commit Convention

`.claude/rules/commit-convention.md`:

````markdown
# Git Commit Convention

## Conventional Commits

Format: `<type>(<scope>): <subject>`

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting (no functional change)
- `refactor`: Refactoring
- `test`: Test related
- `chore`: Build/toolchain

### Scopes

- `auth`: Authentication module
- `api`: API related
- `ui`: UI components
- `db`: Database
- `config`: Configuration

### Subject

- Use imperative mood
- No more than 50 characters
- Do not end with period
- Start with lowercase

### Examples

```
feat(auth): add OAuth login support
fix(api): fix user query endpoint timeout
docs(readme): update installation instructions
refactor(ui): refactor button component
test(auth): add login flow tests
chore(deps): upgrade React to 18.2
```

### Commit Body

- Describe changes in detail
- Explain reasons for changes
- List affected scope

### Commit Footer

- Link Issues: `Closes #123`
- Breaking Changes: `BREAKING CHANGE: description`

### Complete Example

```
feat(auth): add OAuth login support

Implemented Google and GitHub OAuth login:
- Added OAuth configuration
- Implemented callback handling
- Updated user model

Closes #456
```
````

### Code Review Checklist

`.claude/rules/review-checklist.md`:

```markdown
# Code Review Checklist

## Functionality

- [ ] Code implements requirements
- [ ] Edge cases handled correctly
- [ ] Error handling is complete
- [ ] Test coverage is sufficient

## Code Quality

- [ ] Follows coding standards
- [ ] Naming is clear and accurate
- [ ] Functions have single responsibility
- [ ] No duplicate code
- [ ] Comments are adequate and accurate

## Performance

- [ ] No obvious performance issues
- [ ] Database queries optimized
- [ ] No N+1 queries
- [ ] Caching used appropriately

## Security

- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] Sensitive information protection
- [ ] Permission checks

## Maintainability

- [ ] Code structure is clear
- [ ] Easy to understand
- [ ] Easy to test
- [ ] Documentation is complete

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Test cases are sufficient
- [ ] Edge cases tested

## Documentation

- [ ] API documentation updated
- [ ] README updated
- [ ] Changelog updated
- [ ] Comments are accurate

## Git

- [ ] Commit message follows convention
- [ ] Commit granularity is appropriate
- [ ] No debug code
- [ ] No sensitive information
```

## Team Skills

### Standardized Commit Skill

`.claude/skills/commit.md`:

````markdown
---
name: commit
description: Generate commit messages following team conventions
---

# Team Commit Skill

Generate commit messages according to team conventions.

## Convention

Reference: `.claude/rules/commit-convention.md`

## Process

1. Analyze `git diff --staged` changes
2. Determine commit type and scope
3. Generate compliant commit message
4. Execute commit

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Validation

- Type must be one of the allowed types
- Subject no more than 50 characters
- Use imperative mood
````

### Standardized Review Skill

`.claude/skills/review.md`:

```markdown
---
name: review
description: Review code against team checklist
args:
  - name: target
    description: Review target
    required: false
---

# Team Code Review Skill

Review code against the team review checklist.

## Review Checklist

Reference: `.claude/rules/review-checklist.md`

## Review Process

1. Read review checklist
2. Check code item by item
3. Generate review report
4. Provide improvement suggestions

## Output Format

### Passed Items
- Item name

### Failed Items
- Item name
  - Issue description
  - Improvement suggestion

### Summary
- Passed: X/Y
- Critical issues: N
- Suggestions: M
```

## Automated Setup

### New Member Onboarding Script

`.claude/scripts/setup.sh`:

```bash
#!/bin/bash
set -e

echo "Setting up Claude Code team configuration..."

# 1. Check dependencies
echo "→ Checking dependencies..."
command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Git required"; exit 1; }

# 2. Install Claude Code
echo "→ Installing Claude Code..."
npm install -g @anthropic-ai/claude-code

# 3. Set API key
echo "→ Setting API key..."
if [ -z "$ANTHROPIC_API_KEY" ]; then
  read -p "Enter Anthropic API key: " api_key
  echo "export ANTHROPIC_API_KEY=$api_key" >> ~/.zshrc
  export ANTHROPIC_API_KEY=$api_key
fi

# 4. Set up Git Hooks
echo "→ Setting up Git Hooks..."
chmod +x .claude/hooks/*.sh

# 5. Install project dependencies
echo "→ Installing project dependencies..."
npm install

# 6. Verify configuration
echo "→ Verifying configuration..."
claude --version
claude --list-skills

echo "Setup complete!"
echo ""
echo "Quick start:"
echo "  claude 'Help me understand this project'"
echo "  claude /commit"
echo "  claude /review"
```

### CI/CD Integration

`.github/workflows/claude-check.yml`:

```yaml
name: Claude Code Check

on:
  pull_request:
    branches: [main, develop]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude /review --target "git diff origin/main...HEAD" > review.md
          cat review.md

      - name: Post Review Comment
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: review
            });
```

## Configuration Layering

### Global Configuration

`~/.config/claude/config.json`:

```json
{
  "user": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "defaults": {
    "model": "claude-3-5-sonnet-20241022",
    "temperature": 0.7
  }
}
```

### Team Configuration

`.claude/config.json`:

```json
{
  "extends": "~/.config/claude/config.json",
  "team": {
    "name": "MyTeam"
  },
  "hooks": {
    "preCommit": "./.claude/hooks/pre-commit.sh"
  }
}
```

### Personal Override

`.claude/config.local.json` (not version controlled):

```json
{
  "extends": "./.claude/config.json",
  "user": {
    "preferences": {
      "verboseOutput": true
    }
  }
}
```

## Configuration Validation

### Validation Script

`.claude/scripts/validate-config.sh`:

```bash
#!/bin/bash

echo "Validating Claude Code configuration..."

# Check required files
required_files=(
  ".claude/config.json"
  ".claude/.claudeignore"
  ".claude/rules/coding-standards.md"
  ".claude/rules/commit-convention.md"
)

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing file: $file"
    exit 1
  fi
done

# Validate JSON syntax
if ! jq empty .claude/config.json 2>/dev/null; then
  echo "config.json syntax error"
  exit 1
fi

# Check Hooks permissions
for hook in .claude/hooks/*.sh; do
  if [ ! -x "$hook" ]; then
    echo "Hook missing execute permission: $hook"
    exit 1
  fi
done

echo "Configuration validation passed"
```

## Configuration Migration

### Version Upgrade

`.claude/scripts/migrate.sh`:

```bash
#!/bin/bash

CURRENT_VERSION=$(jq -r '.version' .claude/config.json)
TARGET_VERSION="2.0.0"

echo "Migrating from $CURRENT_VERSION to $TARGET_VERSION..."

case $CURRENT_VERSION in
  "1.0.0")
    echo "→ Migrating 1.0.0 -> 1.1.0"
    # Add new fields
    jq '.context = {"alwaysInclude": []}' .claude/config.json > .claude/config.json.tmp
    mv .claude/config.json.tmp .claude/config.json
    ;&
  "1.1.0")
    echo "→ Migrating 1.1.0 -> 2.0.0"
    # Rename fields
    jq '.team.repository = .team.repo | del(.team.repo)' .claude/config.json > .claude/config.json.tmp
    mv .claude/config.json.tmp .claude/config.json
    ;;
esac

# Update version number
jq ".version = \"$TARGET_VERSION\"" .claude/config.json > .claude/config.json.tmp
mv .claude/config.json.tmp .claude/config.json

echo "Migration complete"
```

## Best Practices

### 1. Gradual Adoption

Start simple and incrementally add:

```json
// Week 1: Basic configuration
{
  "hooks": {
    "preCommit": "./.claude/hooks/pre-commit.sh"
  }
}

// Week 2: Add Skills
{
  "hooks": {...},
  "skills": ["commit", "review"]
}

// Week 3: Full configuration
{
  "hooks": {...},
  "skills": [...],
  "rules": {...},
  "customCommands": {...}
}
```

### 2. Documentation

Add comments for each configuration item:

```json
{
  "hooks": {
    "preCommit": {
      // Run code checks before commit
      // Includes: linter, type check, unit tests
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true
    }
  }
}
```

### 3. Version Control

Use `.gitignore` to exclude personal configuration:

```
.claude/config.local.json
.claude/logs/
.claude/.cache/
```

### 4. Regular Review

Review configuration monthly:
- Are there outdated rules
- Are new Skills needed
- Do Hooks need optimization
- Does documentation need updating

## Troubleshooting

### Configuration Not Taking Effect

```bash
# Check configuration load order
claude --show-config

# Validate configuration syntax
jq empty .claude/config.json
```

### Hooks Not Executing

```bash
# Check permissions
ls -la .claude/hooks/

# Test manually
./.claude/hooks/pre-commit.sh
```

### Skills Not Found

```bash
# List available Skills
claude --list-skills

# Check Skills directory
ls -la .claude/skills/
```

## Next Steps

- View the [Team Starter Kit](./team-starter-kit.md) to get started quickly
- Learn about [Config Snippets Library](./config-snippets.md) for examples
- Explore the [Team Rules Library](./team-rules.md) for best practices
