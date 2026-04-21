---
title: "Skills"
---

# Skills

Skills are reusable capability units in Claude Code that let you encapsulate common workflows into callable commands. Through Skills, teams can standardize best practices, and new members can quickly get up to speed on complex tasks.

## What are Skills

Skills are predefined prompt templates combined with specific tools and context to accomplish particular tasks. They're like "macro commands" or "shortcuts," but smarter — Claude dynamically adjusts its execution strategy based on the current project context.

### Core Features

- **Reusability**: Define once, call anywhere
- **Parameterized**: Support dynamic parameter passing
- **Context-aware**: Automatically adapt to project environment
- **Composable**: Skills can call other Skills
- **Version-controlled**: Skill configurations can be managed in Git

## Skills Directory Structure

```
.claude/
├── skills/
│   ├── commit.md           # Git commit Skill
│   ├── review-pr.md        # PR review Skill
│   ├── refactor.md         # Refactoring Skill
│   └── test-gen.md         # Test generation Skill
└── config.json
```

## Creating Your First Skill

### Basic Example: Code Review Skill

Create `.claude/skills/review.md`:

```markdown
---
name: review
description: Perform a comprehensive code review on changes
args:
  - name: target
    description: Review target (file path or git diff)
    required: false
---

# Code Review Skill

Please perform a code review on the following:

{{#if target}}
Target: {{target}}
{{else}}
All changes in the current Git working tree
{{/if}}

## Review Checklist

1. **Code Quality**
   - Does it follow project coding standards
   - Are names clear and accurate
   - Is there duplicate code

2. **Potential Issues**
   - Edge case handling
   - Is error handling complete
   - Performance bottlenecks

3. **Security**
   - Input validation
   - Sensitive information leaks
   - Permission checks

4. **Maintainability**
   - Code complexity
   - Are comments sufficient
   - Test coverage

Please provide:
- List of issues found (sorted by severity)
- Specific improvement suggestions
- Recognition of good practices
```

### Calling a Skill

```bash
# Review current changes
claude /review

# Review a specific file
claude /review src/auth/login.ts

# Review a specific commit
claude /review HEAD~1..HEAD
```

## Skill Syntax Reference

### Front Matter

```yaml
---
name: skill-name              # Skill name (required)
description: Brief description # Shown in help info
args:                         # Parameter definitions
  - name: param1
    description: Parameter description
    required: true            # Is required
    default: default-value    # Default value
  - name: param2
    type: string|number|boolean
    choices: [opt1, opt2]     # Available choices
tools:                        # Allowed tools
  - read
  - write
  - bash
context:                      # Auto-loaded context
  - .claudeignore
  - package.json
model: claude-3-5-sonnet-20241022  # Specify model
temperature: 0.7              # Temperature parameter
---
```

### Template Syntax

Skills use Handlebars template syntax:

```markdown
# Conditionals
{{#if condition}}
  Content
{{else}}
  Other content
{{/if}}

# Loops
{{#each items}}
  - {{this}}
{{/each}}

# Variable interpolation
Filename: {{filename}}
Author: {{author}}

# Helper functions
{{uppercase name}}
{{lowercase text}}
{{trim content}}
```

## Practical Skill Examples

### 1. Git Commit Skill

`.claude/skills/commit.md`:

```markdown
---
name: commit
description: Generate conventional Git commit messages
args:
  - name: type
    description: Commit type
    choices: [feat, fix, docs, style, refactor, test, chore]
    required: false
---

# Git Commit Skill

Analyze changes in the current Git staging area and generate a commit message following Conventional Commits specification.

## Commit Types

{{#if type}}
Using type: {{type}}
{{else}}
Auto-determine commit type:
- feat: New feature
- fix: Bug fix
- docs: Documentation update
- style: Code formatting
- refactor: Refactoring
- test: Test related
- chore: Build/toolchain
{{/if}}

## Requirements

1. Run `git diff --staged` to view changes
2. Analyze the nature and impact scope of changes
3. Generate commit message:
   - Title: `<type>(<scope>): <subject>` (max 50 characters)
   - Body: Detailed description of changes and reasons
   - Footer: Associated Issues or Breaking Changes

4. Execute commit: `git commit -m "..."`
```

### 2. Test Generation Skill

`.claude/skills/test-gen.md`:

```markdown
---
name: test-gen
description: Generate unit tests for specified code
args:
  - name: file
    description: Target file path
    required: true
  - name: framework
    description: Testing framework
    choices: [jest, vitest, mocha, pytest]
    default: jest
---

# Test Generation Skill

Generate {{framework}} unit tests for {{file}}.

## Testing Strategy

1. **Read source file**
   - Analyze exported functions/classes
   - Identify key logic branches
   - Understand dependencies

2. **Generate test cases**
   - Happy path tests
   - Edge case tests
   - Error scenario tests
   - Mock external dependencies

3. **Test file naming**
   - Jest/Vitest: `{{file}}.test.ts`
   - Pytest: `test_{{basename file}}.py`

4. **Run tests**
   - Execute test command to verify
   - Ensure all tests pass
   - Report coverage

## Test Quality Standards

- At least 3 test cases per public function
- Coverage target: 80%+
- Clear test descriptions (describe/it)
- Use meaningful assertion messages
```

### 3. Refactoring Skill

`.claude/skills/refactor.md`:

```markdown
---
name: refactor
description: Safely refactor code
args:
  - name: target
    description: Refactoring target
    required: true
  - name: goal
    description: Refactoring goal
    required: false
---

# Code Refactoring Skill

Target: {{target}}
{{#if goal}}
Refactoring goal: {{goal}}
{{/if}}

## Refactoring Process

### 1. Pre-checks
- Ensure all tests pass
- Check for uncommitted changes
- Create refactoring branch

### 2. Analysis Phase
- Read target code
- Identify code smells:
  - Duplicate code
  - Long functions
  - Large classes
  - Too many parameters
  - Complex conditional logic

### 3. Execute Refactoring
- Apply refactoring patterns:
  - Extract function/method
  - Extract variable
  - Inline temporary variable
  - Replace algorithm
  - Introduce parameter object

### 4. Verification
- Run all tests
- Check type checking
- Run linter
- Compare behavior before and after refactoring

### 5. Commit
- Generate detailed commit message
- Explain refactoring motivation and method
```

### 4. API Documentation Generation Skill

`.claude/skills/api-docs.md`:

```markdown
---
name: api-docs
description: Generate API documentation
args:
  - name: format
    description: Documentation format
    choices: [openapi, markdown, postman]
    default: openapi
---

# API Documentation Generation Skill

Generate API documentation in {{format}} format.

## Documentation Generation Steps

1. **Scan route definitions**
   - Express: `app.get/post/put/delete`
   - FastAPI: `@app.get/post` decorators
   - Spring: `@GetMapping/@PostMapping` annotations

2. **Extract API information**
   - Path and method
   - Request parameters (query/body/path)
   - Response format
   - Authentication requirements
   - Error codes

3. **Generate documentation**
   {{#if (eq format "openapi")}}
   - OpenAPI 3.0 specification
   - Include schema definitions
   - Add example requests/responses
   {{else if (eq format "markdown")}}
   - Markdown table format
   - Grouped by module
   - Include curl examples
   {{else}}
   - Postman Collection v2.1
   - Configure environment variables
   - Add test scripts
   {{/if}}

4. **Output location**
   - OpenAPI: `docs/openapi.yaml`
   - Markdown: `docs/API.md`
   - Postman: `docs/postman-collection.json`
```

## Advanced Features

### Skill Composition

Skills can call other Skills:

```markdown
---
name: full-feature
description: Complete feature development workflow
---

# Complete Feature Development Skill

1. Create feature branch
2. Call /code-gen to generate code
3. Call /test-gen to generate tests
4. Call /review to review code
5. Call /commit to commit changes
6. Push and create PR
```

### Conditional Execution

```markdown
{{#if (fileExists "package.json")}}
This is a Node.js project
{{else if (fileExists "requirements.txt")}}
This is a Python project
{{/if}}
```

### Environment Variables

```markdown
Database connection: {{env.DATABASE_URL}}
API key: {{env.API_KEY}}
```

### Dynamic Context Loading

```markdown
---
context:
  - "{{args.file}}"
  - "{{dirname args.file}}/**/*.test.ts"
---
```

## Skills Configuration Management

### Global Configuration

Skills in the `~/.config/claude/skills/` directory are available for all projects.

### Project Configuration

Skills in the `.claude/skills/` directory are only available for the current project, with higher priority than global Skills.

### Skills Discovery

Claude Code searches for Skills in this order:

1. `.claude/skills/` (project-level)
2. `~/.config/claude/skills/` (user-level)
3. Built-in Skills

### List Available Skills

```bash
claude --list-skills
```

Example output:

```
Available Skills:
  /commit       - Generate conventional Git commits
  /review       - Code review
  /test-gen     - Generate unit tests
  /refactor     - Code refactoring
  /api-docs     - Generate API documentation
```

## Best Practices

### 1. Naming Conventions

- Start with verbs: `review`, `generate`, `analyze`
- Short and descriptive: `test-gen` not `generate-unit-tests`
- Use hyphens: `code-review` not `codeReview`

### 2. Parameter Design

- Required parameters first
- Provide sensible defaults
- Use `choices` to limit options
- Clear parameter descriptions

### 3. Prompt Writing

- Clear task objectives
- Provide clear steps
- Include quality standards
- Give output examples

### 4. Error Handling

```markdown
## Precondition Checks

{{#unless (fileExists args.file)}}
Error: File {{args.file}} does not exist
{{/unless}}

{{#if (isEmpty (gitStatus))}}
Warning: No changes in working tree
{{/if}}
```

### 5. Documentation

Each Skill should include:
- Purpose description
- Parameter descriptions
- Usage examples
- Notes and caveats

## Team Collaboration

### Skills Sharing

Add `.claude/skills/` to version control:

```bash
git add .claude/skills/
git commit -m "chore: add team Skills"
```

### Skills Review

Review Skill changes in PRs:
- Are prompts clear
- Is parameter design reasonable
- Are there security risks
- Does it follow team standards

### Skills Documentation

Create `.claude/skills/README.md`:

```markdown
# Team Skills Documentation

## Available Skills

### /commit
Generate conventional commit messages.

Usage: `claude /commit [type]`

### /review
Perform comprehensive code review on changes.

Usage: `claude /review [target]`

## Contributing Guide

When adding a new Skill:
1. Create a `.md` file in the `skills/` directory
2. Follow naming conventions
3. Include complete metadata
4. Provide usage examples
5. Submit a PR and request review
```

## Debugging Skills

### View Skill Content

```bash
claude --show-skill commit
```

### Test a Skill

```bash
# Dry run mode
claude /commit --dry-run

# Verbose output
claude /commit --verbose
```

### Common Issues

**Skill not found**
- Check if filename and `name` field match
- Confirm file is in the correct directory
- Run `claude --list-skills` to verify

**Parameter parsing error**
- Check YAML syntax
- Confirm parameter type definitions
- Check line numbers in error messages

**Template rendering failure**
- Check Handlebars syntax
- Confirm variable name spelling
- Use `--verbose` for detailed errors

## Next Steps

- Explore the [Hooks system](./hooks.md) for automated triggers
- Learn about [Subagents](./subagents.md) for complex task decomposition
- Check the [Pattern Library](./pattern-library.md) for more Skill examples
