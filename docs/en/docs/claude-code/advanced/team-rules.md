---
title: "Team Rules Library"
---

# Team Rules Library

The team rules library allows you to define unified coding standards, best practices, and workflows for the entire team. Claude Code automatically follows these rules, ensuring code consistency.

## Rule File Locations

Claude Code looks for rule files in order of priority:

1. **Project-level rules**: `.claude/rules.md`
2. **Global rules**: `~/.claude/global-rules.md`
3. **Team shared rules**: Shared via Git repository

## Creating Team Rules

### Basic Rule File

```bash
You: Create team rules file

Claude wants to:
  • Write file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude: Created rules file template. You can edit it to define team standards.
```

**Rule file example**:

```markdown
# Team Coding Rules

## TypeScript Standards

- Use strict mode
- All functions must have return types
- No `any`, use `unknown` instead
- Use `interface` instead of `type` for object types

## Naming Conventions

- Component files: PascalCase (Button.tsx)
- Utility functions: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE
- Private methods: prefix with `_` (_handleClick)

## File Structure

```
src/
  components/     # React components
  hooks/          # Custom Hooks
  utils/          # Utility functions
  types/          # TypeScript types
  api/            # API calls
  store/          # State management
```

## Code Style

- Use 2-space indentation
- Single quotes over double quotes
- No semicolons at end of lines
- Maximum line length 100 characters

## Testing Requirements

- All public APIs must have unit tests
- Test file naming: `*.test.ts` or `*.spec.ts`
- Test coverage target: 80%

## Git Commit Convention

- Use Conventional Commits
- Format: `type(scope): message`
- Types: feat, fix, docs, style, refactor, test, chore
```

### Claude Automatically Follows Rules

```bash
You: Create a new Button component

Claude: Let me check team rules...

Claude wants to:
  • Read file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude: Based on team rules, I will:
- Use TypeScript strict mode
- Use PascalCase naming
- Add complete type definitions
- Create corresponding test file

Claude wants to:
  • Write file: src/components/Button.tsx
  • Write file: src/components/Button.test.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ Created Button component, conforming to team standards:
- Using interface for Props
- All functions have return types
- Includes unit tests
- Uses 2-space indentation
```

## Rule Types

### 1. Code Style Rules

```markdown
## Code Style

### React Components

- Use functional components, not class components
- Use Hooks for state management
- Destructure Props in function parameters
- Use named export for components

### Examples

```typescript
// ✓ Correct
export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

// ✗ Incorrect
export default class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>
  }
}
```
```

**Claude applying rules**:

```bash
You: Create Modal component

Claude wants to:
  • Read file: .claude/rules.md
  • Write file: src/components/Modal.tsx
Allow? [y/n/always/never]

You: always

Claude: ✓ Created Modal component
- Functional component ✓
- Props destructuring ✓
- Named export ✓
- TypeScript types ✓
```

### 2. Architecture Rules

```markdown
## Architecture Rules

### State Management

- Use Zustand for global state management
- Use useState for local state
- Use React Query for server state

### API Calls

- All API calls must go through `src/api/` directory
- Use unified error handling
- Implement request retry mechanism

### Routing

- Use React Router v6
- Route definitions in `src/routes/index.tsx`
- Use lazy loading for performance
```

**Claude applying rules**:

```bash
You: Add user list feature

Claude: Based on architecture rules, I will:
1. Create API call in src/api/
2. Use React Query for server state
3. Create lazy-loaded route

Claude wants to:
  • Write file: src/api/users.ts
  • Write file: src/pages/UserList.tsx
  • Edit file: src/routes/index.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ Implemented user list feature
- API calls in src/api/users.ts ✓
- Using React Query ✓
- Lazy-loaded route ✓
```

### 3. Security Rules

```markdown
## Security Rules

### Sensitive Information

- No hardcoding API keys in code
- Use environment variables for configuration
- Don't commit .env files to Git

### Input Validation

- All user input must be validated
- Use Zod for runtime type checking
- Prevent XSS attacks

### Authentication

- Use JWT for authentication
- Store tokens in httpOnly cookies
- Implement CSRF protection
```

**Claude applying rules**:

```bash
You: Create login form

Claude: Based on security rules, I will:
- Use Zod for input validation
- Not hardcode API endpoint in code
- Implement CSRF protection

Claude wants to:
  • Read file: .env.example
  • Write file: src/components/LoginForm.tsx
  • Write file: src/schemas/auth.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ Created login form
- Zod input validation ✓
- Using environment variables ✓
- CSRF token handling ✓

Note: Make sure to set API_URL in .env file
```

### 4. Testing Rules

```markdown
## Testing Rules

### Unit Tests

- Use Vitest as test framework
- Test files in same directory as source files
- Naming format: `ComponentName.test.tsx`

### Test Coverage

- All API functions: 100% coverage
- React components: at least 80% coverage
- Utility functions: 100% coverage

### Test Content

- Normal flow
- Boundary conditions
- Error handling
- Async operations
```

**Claude applying rules**:

```bash
You: Create formatDate utility function

Claude: Based on testing rules, utility functions require 100% test coverage.

Claude wants to:
  • Write file: src/utils/formatDate.ts
  • Write file: src/utils/formatDate.test.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ Created formatDate function and tests

Test coverage:
- Normal date formatting ✓
- Invalid date handling ✓
- Boundary conditions (null, undefined) ✓
- Different timezones ✓

You: Run tests

Claude wants to:
  • Run command: npm test formatDate
Allow? [y/n/always/never]

You: y

Claude: ✓ All tests passed
Coverage: 100%
```

### 5. Documentation Rules

```markdown
## Documentation Rules

### Code Comments

- Public APIs must have JSDoc comments
- Add inline comments for complex logic
- Use TODO to mark pending items

### README

- Each major directory includes README.md
- Explain directory purpose and usage
- Include example code

### Changelog

- Use CHANGELOG.md to record changes
- Follow Keep a Changelog format
```

**Claude applying rules**:

```bash
You: Create API client

Claude: Based on documentation rules, I will add JSDoc comments and README.

Claude wants to:
  • Write file: src/api/client.ts
  • Write file: src/api/README.md
Allow? [y/n/always/never]

You: y

Claude: ✓ Created API client
- Complete JSDoc comments ✓
- README includes usage examples ✓
- Complete type definitions ✓
```

## Sharing Team Rules

### Sharing via Git

```bash
# 1. Create rules file
You: Create team rules

Claude wants to:
  • Write file: .claude/rules.md
Allow? [y/n/always/never]

You: y

# 2. Commit to Git
You: Commit rules file

Claude wants to:
  • Run command: git add .claude/rules.md
  • Run command: git commit -m "docs: add team coding rules"
Allow? [y/n/always/never]

You: y

Claude: ✓ Rules file committed

# 3. Team members pull
You: Pull latest code

Claude wants to:
  • Run command: git pull
Allow? [y/n/always/never]

You: y

Claude: ✓ Pulled latest rules
Team rules updated, I will follow the new standards.
```

### Global Rules

For cross-project general rules, use the global rules file:

```bash
You: Create global rules

Claude wants to:
  • Write file: /Users/sixseven/.claude/global-rules.md
Allow? [y/n/always/never]

You: y

Claude: ✓ Created global rules file

These rules will apply to all projects unless the project has its own rules override.
```

**Global rules example**:

```markdown
# Global Coding Rules

## General Principles

- Code readability over brevity
- Avoid premature optimization
- Follow DRY principle
- Use meaningful variable names

## Git Standards

- Run tests before committing
- Use meaningful commit messages
- Commit in small steps, push frequently

## Code Review

- All code must be reviewed
- Reviewers check: logic, tests, documentation
- Use constructive feedback language
```

## Rule Priority

When multiple rule files exist, priority is:

1. **Project rules** (`.claude/rules.md`) - Highest priority
2. **Global rules** (`~/.claude/global-rules.md`)
3. **Default rules** (Claude built-in)

```bash
You: What naming should I use when creating components?

Claude: Let me check rule priority...

Claude wants to:
  • Read file: .claude/rules.md
  • Read file: /Users/sixseven/.claude/global-rules.md
Allow? [y/n/always/never]

You: y

Claude: Based on rule priority:

1. Project rules: Use PascalCase, file name matches component name
2. Global rules: Use meaningful names

Applying project rules: Components use PascalCase naming.
```

## Rule Validation

### Automatically Check Rule Compliance

```bash
You: Check if code follows team rules

Claude: Let me analyze the codebase...

Claude wants to:
  • Read file: .claude/rules.md
  • Search pattern: "class.*extends React.Component"
  • List files: src/components/*.tsx
Allow? [y/n/always/never]

You: always

Claude: Rule check results:

✓ Passed rules:
- All components use PascalCase
- Using TypeScript strict mode
- Test files named correctly

✗ Violated rules:
- src/components/OldButton.tsx uses class component (should use functional component)
- src/utils/api.ts missing JSDoc comments

Would you like me to fix these issues?

You: Yes

Claude wants to:
  • Edit file: src/components/OldButton.tsx
  • Edit file: src/utils/api.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ Fixed all rule violations
- OldButton converted to functional component ✓
- api.ts added JSDoc comments ✓
```

## Rule Templates

### React Project Rule Template

```markdown
# React Project Rules

## Tech Stack

- React 18+
- TypeScript 5+
- Vite
- React Router v6
- Zustand (state management)
- React Query (server state)
- Tailwind CSS (styling)

## Component Standards

- Use functional components
- Define Props using interface
- Use named export
- One component per file

## Hooks Standards

- Custom Hooks start with `use`
- Hooks files in `src/hooks/`
- Include usage examples and tests

## Style Standards

- Use Tailwind CSS classes
- Avoid inline styles
- Use CSS Modules for complex styles

## Performance Optimization

- Use React.memo to optimize re-renders
- Use virtual scrolling for large lists
- Route lazy loading
- Image lazy loading
```

### Node.js API Rule Template

```markdown
# Node.js API Rules

## Tech Stack

- Node.js 20+
- Express.js
- TypeScript
- Prisma (ORM)
- Jest (testing)

## API Design

- RESTful style
- Use HTTP status codes
- Unified error response format
- API versioning (/api/v1/)

## Error Handling

- Use custom error classes
- Global error handling middleware
- Detailed error logging

## Security

- Use helmet middleware
- Implement rate limiting
- Input validation and sanitization
- SQL injection protection

## Database

- Use Prisma migrations
- Transaction handling for critical operations
- Index optimization for queries
- Regular backups
```

## Dynamic Rule Updates

```bash
You: Update team rules: use Biome instead of ESLint from now on

Claude wants to:
  • Read file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: .claude/rules.md
Allow? [y/n/always/never]

You: y

Claude: ✓ Updated team rules
- Added Biome configuration requirements
- Updated code check commands

From now on, I will use Biome for code checking.

You: Set up Biome

Claude wants to:
  • Run command: npm install --save-dev @biomejs/biome
  • Write file: biome.json
Allow? [y/n/always/never]

You: y

Claude: ✓ Biome configured
- Installed dependencies
- Created configuration file
- Conforms to team rules
```

## Rule Conflict Handling

```bash
You: Create a function using any type

Claude: This conflicts with team rules:

Team rules require:
- No `any`
- Use `unknown` instead

Would you like to:
1. Follow team rules (use unknown)
2. Override rule (use any)

Please choose:

You: 1

Claude wants to:
  • Write file: src/utils/helper.ts
Allow? [y/n/always/never]

You: y

Claude: ✓ Created function using unknown type
Conforms to team rules ✓
```

## Best Practices

### 1. Be Specific with Rules

**Bad**:
```markdown
- Write good code
- Pay attention to performance
```

**Good**:
```markdown
- Maximum function length: 50 lines
- Use React.memo to optimize list components
- API response time < 200ms
```

### 2. Provide Examples

```markdown
## Error Handling

### Correct Example

```typescript
try {
  const data = await fetchUser(id)
  return data
} catch (error) {
  if (error instanceof ApiError) {
    logger.error('API Error:', error.message)
    throw new UserNotFoundError(id)
  }
  throw error
}
```

### Incorrect Example

```typescript
try {
  const data = await fetchUser(id)
  return data
} catch (error) {
  console.log(error) // Don't use console.log
  return null // Don't swallow errors
}
```
```

### 3. Regularly Review Rules

```bash
You: Review team rules to see if updates are needed

Claude wants to:
  • Read file: .claude/rules.md
  • Search pattern: "TODO" "FIXME" "deprecated"
Allow? [y/n/always/never]

You: y

Claude: Rule review results:

Suggested updates:
1. React 18 is stable, "experimental" label can be removed
2. Add React Server Components standards
3. Update test library version requirements

Would you like me to update these?
```

### 4. Document Rules

```bash
You: Generate rule documentation for new members

Claude wants to:
  • Read file: .claude/rules.md
  • Write file: docs/CODING_STANDARDS.md
Allow? [y/n/always/never]

You: y

Claude: ✓ Generated rule documentation

Includes:
- Rule overview
- Detailed explanations
- Code examples
- FAQ
- Tool configuration
```

## Summary

The team rules library is a key tool for ensuring code consistency. By defining clear rules, Claude Code can:

- Automatically follow team standards
- Reduce code review time
- Improve code quality
- Accelerate new member onboarding

Remember: Good rules are specific, actionable, and include examples.
