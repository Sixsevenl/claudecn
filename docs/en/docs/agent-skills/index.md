---
title: "Agent Skills Quick Start"
---

# Agent Skills Quick Start

Agent Skills let you create reusable AI workflows, invoking complex tasks with simple commands.

## What are Skills

Skills are predefined prompt templates that encapsulate common development tasks. Similar to "macros" or "shortcuts," they let you complete multi-step operations with a single command.

## Your First Skill

### 1. Create the Skills Directory

```bash
mkdir -p .claude/skills
cd .claude/skills
```

### 2. Create a Skill File

Create `hello.md`:

```markdown
---
name: hello
description: Greet and display project information
---

Hello! Let me help you understand this project:

1. Read package.json or pyproject.toml
2. Display project name, version, and dependencies
3. List main source directories
4. Show recent git commits

Please present this information in a friendly way.
```

### 3. Use the Skill

```bash
claude

You: /hello

Claude: Hello! Let me look at this project...
[Auto-executes the steps defined in the Skill]
```

## Built-in Skills

Claude Code comes with useful built-in Skills:

### /commit - Smart Commit

```bash
/commit
```

Automatically:
1. Runs `git status` and `git diff`
2. Analyzes code changes
3. Generates a conventional commit message
4. Executes `git commit`

### /review - Code Review

```bash
/review src/app.ts
```

Checks:
- Code standards
- Performance issues
- Security vulnerabilities
- Best practices

### /test - Generate Tests

```bash
/test src/utils/helper.ts
```

Generates a complete unit test file.

### /docs - Generate Documentation

```bash
/docs src/api/users.ts
```

Adds JSDoc/docstring comments.

## Creating Practical Skills

### API Testing Skill

Create `.claude/skills/api-test.md`:

```markdown
---
name: api-test
description: Test API endpoints
args:
  - name: endpoint
    description: API endpoint path
    required: true
  - name: method
    description: HTTP method
    required: false
    default: GET
---

Test the API endpoint {{endpoint}}:

1. Read API documentation or code
2. Use curl to send a {{method}} request
3. Verify response status code and format
4. Check error handling
5. Generate a test report

If authentication is needed, ask the user for a token.
```

Usage:

```bash
/api-test endpoint=/api/users method=POST
```

### Database Migration Skill

Create `.claude/skills/db-migrate.md`:

```markdown
---
name: db-migrate
description: Create database migration
args:
  - name: name
    description: Migration name
    required: true
  - name: type
    description: Migration type (create/alter/drop)
    required: false
    default: create
---

Create database migration {{name}}:

1. Create a new file in the migrations/ directory
2. Filename: YYYYMMDDHHMMSS_{{name}}.sql
3. Include UP and DOWN migrations
4. Add necessary indexes and constraints
5. Add rollback instructions

Migration type: {{type}}
```

### Component Generation Skill

Create `.claude/skills/component.md`:

```markdown
---
name: component
description: Generate React component
args:
  - name: name
    description: Component name
    required: true
  - name: type
    description: Component type (page/layout/ui)
    required: false
    default: ui
---

Create React component {{name}}:

1. Create {{name}}.tsx in src/components/{{type}}/
2. Use TypeScript and functional components
3. Add Props interface definition
4. Use TailwindCSS styling
5. Create corresponding {{name}}.test.tsx
6. Update index.ts exports

Component type: {{type}}
```

## Skill Syntax

### Frontmatter

```yaml
---
name: skill-name          # Skill name (required)
description: Description  # Brief description (required)
args:                     # Argument definitions (optional)
  - name: arg1
    description: Argument description
    required: true
  - name: arg2
    description: Argument description
    required: false
    default: default-value
---
```

### Variable Substitution

Use `{{variable}}` to reference arguments:

```markdown
Process file: {{file}}
Using pattern: {{pattern}}
Output directory: {{output}}
```

### Conditional Logic

```markdown
{{#if debug}}
Add detailed debug logging
{{/if}}

{{#unless production}}
Use development environment configuration
{{/unless}}

{{#if typescript}}
Use TypeScript types
{{else}}
Use JSDoc annotations
{{/if}}
```

### Loops

```markdown
{{#each files}}
Process file: {{this}}
{{/each}}
```

## Team Sharing

### Project-level Skills

Commit to Git:

```bash
git add .claude/skills/
git commit -m "Add team skills"
git push
```

Team members can use them after pulling.

### Global Skills

Place in the user directory:

```bash
mkdir -p ~/.config/claude/skills
cp my-skill.md ~/.config/claude/skills/
```

### Skills Repository

Create a dedicated Skills repository:

```bash
# Organization's Skills repository
git clone https://github.com/your-org/claude-skills.git

# Link to project
ln -s ~/claude-skills .claude/skills
```

## Best Practices

### 1. Clear Steps

✅ Good:
```markdown
1. Read package.json
2. Check for outdated dependencies
3. Generate update report
4. Ask whether to execute updates
```

❌ Bad:
```markdown
Update dependencies
```

### 2. Include Verification

```markdown
1. Modify configuration file
2. Run tests to verify
3. If tests fail, roll back changes
4. Display verification results
```

### 3. Provide Context

```markdown
This is a {{framework}} project.
Code standards: {{style_guide}}
Testing framework: {{test_framework}}

Please follow the project conventions.
```

### 4. Error Handling

```markdown
If file does not exist:
- Ask whether to create it
- Provide default template

If tests fail:
- Display error messages
- Suggest fixes
- Do not auto-commit
```

## Debugging Skills

### View Skill Content

```bash
cat .claude/skills/my-skill.md
```

### Test a Skill

```bash
# Dry run mode
claude --dry-run /my-skill arg1=value1
```

### View Logs

```bash
tail -f ~/.claude/logs/skills.log
```

## Example Skills Library

### Frontend Development

- `component.md` - React component generation
- `storybook.md` - Storybook story
- `e2e-test.md` - E2E tests

### Backend Development

- `api-endpoint.md` - API endpoint
- `db-model.md` - Database model
- `api-docs.md` - API documentation

### DevOps

- `docker-setup.md` - Docker configuration
- `ci-pipeline.md` - CI/CD configuration
- `deploy.md` - Deployment script

## Next Steps

- [Best Practices](/docs/agent-skills/best-practices) - Skills development guide
- [Examples](/docs/agent-skills/examples) - More examples
- [Architecture](/docs/agent-skills/architecture) - Deep dive into Skills
