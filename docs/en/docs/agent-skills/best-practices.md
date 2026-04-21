---
title: "Best Practices"
---

# Agent Skills Best Practices

This guide provides best practices for creating and using Agent Skills, helping you build efficient, maintainable Skills.

## Skill Design Principles

### 1. Single Responsibility Principle

Each Skill should focus on one clear task.

**Good example:**

```bash
# Create a focused Skill
cat > .claude/skills/test.md << 'EOF'
---
name: test
description: Run the project test suite
---

Run tests and generate a report:
1. Execute npm test
2. Analyze test results
3. If there are failures, show detailed errors
EOF
```

**Bad example:**

```markdown
---
name: do-everything
description: Test, build, deploy, and generate documentation
---

Do everything...
```

### 2. Clear Naming

Use short names starting with a verb that clearly express the Skill's function.

```bash
# Good naming examples
.claude/skills/
├── commit.md          # Create git commit
├── review.md          # Code review
├── test.md            # Run tests
├── deploy.md          # Deploy application
└── refactor.md        # Refactor code
```

**Usage example:**

```bash
You: /commit

Claude: Let me analyze your changes and create a commit...

Claude wants to:
  • Run command: git status
  • Run command: git diff
Allow? [y/n]

You: y

Claude: Suggested commit message:
feat: Add user authentication system

- Implement JWT token generation
- Add login/logout endpoints
- Create user session middleware
```

### 3. Detailed Description

Provide clear descriptions explaining the Skill's purpose and expected behavior.

```markdown
---
name: optimize-images
description: Optimize image files in the project, reduce size and generate multiple resolutions
---

Image optimization process:
1. Scan the public/images directory
2. Use sharp to compress images
3. Generate webp format
4. Create responsive sizes (sm, md, lg)
5. Update reference paths
```

## Skill Organization

### Organize by Function

```bash
# Create categorized directory structure
mkdir -p .claude/skills/{git,testing,deployment,code-quality}

# Git-related Skills
cat > .claude/skills/git/commit.md << 'EOF'
---
name: commit
description: Smart git commit
---

Analyze changes and generate semantic commit messages
EOF

cat > .claude/skills/git/sync.md << 'EOF'
---
name: sync
description: Sync remote branches
---

Pull latest code and handle conflicts
EOF

# Testing-related Skills
cat > .claude/skills/testing/test-unit.md << 'EOF'
---
name: test-unit
description: Run unit tests
---

Execute unit test suite
EOF
```

**Usage example:**

```bash
You: /commit

Claude: Analyzing git changes...

[git status output]
modified:   src/auth/login.ts
modified:   src/auth/middleware.ts
new file:   tests/auth.test.ts

Claude: Suggested commit:
feat(auth): Add JWT authentication

- Implement token generation and validation
- Add authentication middleware
- Include comprehensive test coverage

Use this commit message? [y/n]
```

### Shared Configuration

Create reusable configuration snippets.

```bash
# Create shared configuration
cat > .claude/skills/_config.md << 'EOF'
---
name: _config
description: Shared configuration (not directly invoked)
---

## Project Configuration

- Test command: npm test
- Build command: npm run build
- Lint command: npm run lint
- Format command: npm run format
EOF
```

## Parameterized Skills

### Use Parameters for Flexibility

```bash
cat > .claude/skills/generate-component.md << 'EOF'
---
name: generate-component
description: Generate React component template
---

Generate based on the provided component name:
1. Component file (src/components/{name}.tsx)
2. Style file (src/components/{name}.module.css)
3. Test file (tests/components/{name}.test.tsx)
4. Storybook story (src/stories/{name}.stories.tsx)

Use TypeScript and functional components.
EOF
```

**Usage example:**

```bash
You: /generate-component UserProfile

Claude: Generating UserProfile component...

Claude wants to:
  • Create file: src/components/UserProfile.tsx
  • Create file: src/components/UserProfile.module.css
  • Create file: tests/components/UserProfile.test.tsx
  • Create file: src/stories/UserProfile.stories.tsx
Allow? [y/n]

You: y

Claude: Created UserProfile component and related files:

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

All files created successfully!
```

## Error Handling

### Graceful Failure Handling

```bash
cat > .claude/skills/deploy.md << 'EOF'
---
name: deploy
description: Deploy application to production
---

Deployment process:
1. Check if current branch is main
2. Confirm all tests pass
3. Build production version
4. Run pre-deployment checks
5. Execute deployment command
6. Verify deployment status

If any step fails, stop the process and report the error.
EOF
```

**Usage example:**

```bash
You: /deploy

Claude: Starting deployment process...

Checking current branch...
✓ Currently on main branch

Running tests...
✗ Tests failed

Error: 3 test cases failed
- auth.test.ts: Token validation failed
- user.test.ts: User creation timeout
- api.test.ts: API endpoint not responding

Deployment cancelled. Please fix the tests and try again.
```

## Context Awareness

### Leverage Project Context

```bash
cat > .claude/skills/analyze-performance.md << 'EOF'
---
name: analyze-performance
description: Analyze application performance bottlenecks
---

Performance analysis steps:
1. Detect project type (React/Vue/Node.js)
2. Run appropriate performance analysis tools
3. Identify slow components/functions
4. Check bundle size
5. Analyze network requests
6. Provide optimization recommendations
EOF
```

**Usage example:**

```bash
You: /analyze-performance

Claude: Analyzing project performance...

Detected React project (using Vite)

Running build analysis...
✓ Build complete

Bundle size analysis:
- Total size: 2.3 MB
- Largest dependency: moment.js (289 KB)
  Suggestion: Replace with date-fns or dayjs

Component rendering analysis:
- UserList component re-renders frequently
  Suggestion: Use React.memo or useMemo

Optimization recommendations:
1. Replacing moment.js can reduce ~200KB
2. Implement virtual scrolling for long lists
3. Use code splitting for lazy-loaded routes
```

## Combining Skills

### Creating Workflows

```bash
cat > .claude/skills/pre-commit.md << 'EOF'
---
name: pre-commit
description: Pre-commit check workflow
---

Execute pre-commit checks:
1. Run linter
2. Run type check
3. Run tests
4. Check code formatting
5. If all pass, create commit
EOF
```

**Usage example:**

```bash
You: /pre-commit

Claude: Executing pre-commit checks...

[1/4] Running ESLint...
✓ No lint errors

[2/4] TypeScript type check...
✓ Type check passed

[3/4] Running tests...
✓ All tests passed (24 passed)

[4/4] Checking code formatting...
✓ Code formatting correct

All checks passed! Ready to create commit.

Suggested commit message:
fix: Resolve user authentication timeout issue

Continue? [y/n]
```

## Documentation

### Inline Documentation

```bash
cat > .claude/skills/setup-project.md << 'EOF'
---
name: setup-project
description: Initialize new project environment
---

# Project Initialization

This Skill automatically sets up the development environment for a new project.

## Execution Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment configuration**
   - Copy .env.example to .env
   - Prompt user to fill in required environment variables

3. **Initialize database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6

## Usage

```bash
/setup-project
```
EOF
```

## Testing Skills

### Verify Skill Behavior

```bash
# Create a test Skill
cat > .claude/skills/test-skill.md << 'EOF'
---
name: test-skill
description: Test other Skills' functionality
---

Test the specified Skill:
1. Verify Skill file exists
2. Check syntax correctness
3. Simulate execution flow
4. Report potential issues
EOF
```

**Usage example:**

```bash
You: /test-skill commit

Claude: Testing commit Skill...

✓ Skill file exists: .claude/skills/commit.md
✓ Frontmatter is correct
✓ Description is clear
✓ Contains execution steps

Simulated execution:
1. git status - Executable
2. git diff - Executable
3. Generate commit message - Logic is clear

Test passed! The commit Skill is ready to use.
```

## Version Control

### Managing Skill Versions

```bash
# Include Skills in version control
cat > .gitignore << 'EOF'
# Exclude personal Skills
.claude/skills/personal/

# Include team-shared Skills
!.claude/skills/*.md
EOF

# Create Skills changelog
cat > .claude/skills/CHANGELOG.md << 'EOF'
# Skills Changelog

## 2024-01-15

### Added
- `deploy` - Automated deployment workflow
- `analyze-performance` - Performance analysis tool

### Changed
- `commit` - Improved commit message generation algorithm
- `test` - Added coverage report

### Removed
- `old-deploy` - Replaced by the new deploy Skill
EOF
```

## Performance Optimization

### Cache Frequently Used Data

```bash
cat > .claude/skills/analyze-deps.md << 'EOF'
---
name: analyze-deps
description: Analyze project dependencies
---

Dependency analysis:
1. Read package.json
2. Check for outdated packages
3. Identify security vulnerabilities
4. Find unused dependencies
5. Suggest update strategy

Cache analysis results for 24 hours.
EOF
```

**Usage example:**

```bash
You: /analyze-deps

Claude: Analyzing project dependencies...

Reading package.json...
✓ Found 45 dependencies

Checking for updates...
Outdated packages:
- react: 18.2.0 → 18.3.1
- typescript: 5.0.4 → 5.3.3
- vite: 4.3.9 → 5.0.10

Security check...
✓ No security vulnerabilities found

Unused dependencies:
- lodash (can be removed)
- moment (suggest replacing with date-fns)

Recommendations:
1. Update React to the latest version
2. Upgrade Vite to v5 (note breaking changes)
3. Removing unused dependencies can reduce ~400KB
```

## Team Collaboration

### Shared Skills Library

```bash
# Create team Skills repository
mkdir -p team-skills
cd team-skills

# Initialize git
git init
git remote add origin https://github.com/your-org/claude-skills.git

# Create README
cat > README.md << 'EOF'
# Team Claude Skills

Our team's shared Skills collection.

## Installation

```bash
# Clone into project
git clone https://github.com/your-org/claude-skills.git .claude/skills
```

## Skills List

- `commit` - Smart commit
- `review` - Code review
- `deploy` - Auto deploy
- `test` - Test suite

## Contributing

Please read CONTRIBUTING.md
EOF

# Push to remote
git add .
git commit -m "Initial skills collection"
git push -u origin main
```

### Using Team Skills

```bash
# In a new project
cd my-project

# Clone team Skills
git clone https://github.com/your-org/claude-skills.git .claude/skills

# Use a team Skill
You: /review src/auth.ts

Claude: Using team code review standards...

Reviewing src/auth.ts:

✓ Code style matches team conventions
✓ Type definitions complete
✗ Missing error handling

Suggestions:
1. Add try-catch in the login function
2. Validate input parameters
3. Add logging

Code quality score: B+
```

## Security Considerations

### Handling Sensitive Information

```bash
cat > .claude/skills/deploy-prod.md << 'EOF'
---
name: deploy-prod
description: Production deployment (requires confirmation)
---

⚠️ Production Deployment Workflow

This operation will affect the production environment. Proceed with caution.

Steps:
1. Confirm current branch is main
2. Confirm all tests pass
3. Require user to confirm a second time
4. Read deployment keys from environment variables (never hardcode in Skill)
5. Execute deployment
6. Verify deployment status
7. Send notification

Never hardcode in Skills:
- API keys
- Passwords
- Access tokens
- Database connection strings
EOF
```

**Usage example:**

```bash
You: /deploy-prod

Claude: ⚠️ Production Deployment

This will deploy to production, affecting all users.

Pre-checks:
✓ Current branch: main
✓ All tests passed
✓ Build successful

⚠️ Please type "DEPLOY TO PRODUCTION" to confirm:

You: DEPLOY TO PRODUCTION

Claude: Starting deployment...

Reading deployment configuration...
✓ Environment variables are set

Executing deployment...
✓ Deployment successful

Verifying...
✓ Health check passed
✓ API responding normally

Deployment complete!
Version: v2.3.1
Time: 2024-01-15 14:30:00
```

## Debugging Skills

### Add Debug Output

```bash
cat > .claude/skills/debug-skill.md << 'EOF'
---
name: debug-skill
description: Execute Skill in debug mode
---

Execute the specified Skill with verbose logging:
1. Show input/output for each step
2. Record execution time
3. Capture and display error stacks
4. Save debug log to .claude/logs/
EOF
```

**Usage example:**

```bash
You: /debug-skill commit

Claude: Debug mode: Executing commit Skill

[00:00.001] Execution started
[00:00.023] Running: git status
[00:00.156] Output: 3 files modified
[00:00.157] Running: git diff
[00:01.234] Output: 145 lines changed
[00:01.235] Analyzing change types...
[00:01.456] Detected: Feature addition
[00:01.457] Generating commit message...
[00:02.123] Complete

Total time: 2.123s
Log saved: .claude/logs/commit-2024-01-15.log
```

These best practices will help you create high-quality, maintainable Agent Skills that improve development efficiency and team collaboration.
