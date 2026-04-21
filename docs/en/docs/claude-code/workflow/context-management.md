---
title: "Context Management"
---

# Context Management

Effective context management is key to improving productivity when developing with Claude Code. Claude needs to understand your codebase, project structure, and current task to provide accurate assistance.

## Why Context Management Matters

Claude's response quality directly depends on the context information it receives. Good context management can:

- Reduce misunderstandings and incorrect suggestions
- Improve code generation accuracy
- Speed up problem resolution
- Lower communication overhead
- Ensure suggestions align with project standards

## How the Context Window Works

Claude Code maintains a conversation context window that includes:

- All message history from the current session
- File content you explicitly add
- Files read through tool calls
- Project structure information
- Previous command execution results

The context window has a size limit. When approaching the limit, earlier messages may be removed. Therefore, managing context strategically is crucial.

## Proactively Providing Context

### Using @mentions

Claude Code supports `@` syntax to reference files and directories:

```
@src/components/Button.tsx What's wrong with this component?
```

```
@docs/ Update the README based on the documentation
```

This approach gives you precise control over what Claude sees, avoiding unnecessary information noise.

### Project Overview

Providing a project overview at the start of a new session is helpful:

```
This is a Next.js 14 project using TypeScript, Tailwind CSS, and Prisma.
The main features are user authentication and data visualization. We follow Airbnb's coding standards.
```

### Relevant Background

When asking specific questions, provide relevant background:

```
Our API uses JWT for authentication. We now need to add refresh token functionality,
but must maintain compatibility with the existing middleware.
```

## Incremental Context Building

Don't provide all information at once. Use an incremental approach:

1. Start with high-level questions
2. Provide more details based on Claude's responses
3. Reference specific files when needed
4. Gradually dive into specific implementations

This approach can:
- Prevent the context window from filling up too early
- Make conversations more natural and flowing
- Ensure information relevance

## Context Priority

Not all information is equally important. Organize context by priority:

### High Priority
- Files currently being modified
- Directly related dependency files
- Error messages and stack traces
- Project configuration files (package.json, tsconfig.json)

### Medium Priority
- Related test files
- Type definition files
- Documentation and comments
- Reference implementations of similar features

### Low Priority
- Project history and background
- General best practices
- Optional optimization suggestions

## Using .claudeignore

Create a `.claudeignore` file to exclude irrelevant content:

```
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
build/
.next/

# Large data files
*.log
*.csv
*.json.gz

# Sensitive information
.env
.env.local
secrets/
```

This prevents Claude from wasting context window space on irrelevant files.

## Context Refresh Strategies

### When to Start a New Session

Consider starting a new session when:

- Switching to a completely different task
- The context window is approaching its limit
- The conversation has become cluttered or off-topic
- You need to reset the direction

### Preserving Important Information

Before starting a new session, summarize key decisions and findings:

```
To summarize our discussion:
1. Decided to use Redis as the caching layer
2. API rate limiting set to 100 requests per minute
3. Error handling uses middleware pattern
```

Use this summary as the opening for the new session.

## Codebase Navigation Tips

### Use Search Instead of Full Reads

Don't have Claude read entire directories. Use precise searches:

```
Search for all components that use the useAuth hook
```

```
Find the file that defines the User interface
```

### Leverage Project Structure

Reference the project structure to help Claude understand the organization:

```
Our project structure:
- src/
  - features/ (organized by feature)
  - shared/ (shared components and utilities)
  - api/ (API routes)
```

## Context Management for Multi-file Tasks

When working on tasks that span multiple files:

1. First describe the task scope
2. List the files involved
3. Explain the relationships between files
4. Process them one by one, staying focused

Example:

```
Need to refactor the authentication flow, involving:
- src/auth/login.ts (main logic)
- src/middleware/auth.ts (middleware)
- src/types/user.ts (type definitions)

Let's start with login.ts
```

## Context Verification

Regularly verify Claude's understanding:

```
Before continuing, confirm your understanding of the current architecture
```

```
What other parts would be affected by the changes we discussed?
```

This catches misunderstandings early, preventing downstream issues.

## Handling Context Limits

When approaching context limits:

### Extract Key Information

Extract important code snippets and decisions into a new session:

```
Previously we established the following interfaces:
[paste key interface definitions]

Now continue with the implementation...
```

### Use External Documentation

For complex architectural decisions, maintain external documentation:

- Create a `docs/decisions/` directory in the project
- Record important architectural decisions
- Reference these documents when needed

### Break Down Tasks

Break large tasks into smaller ones, each using an independent session:

- Task 1: Design API endpoints
- Task 2: Implement core logic
- Task 3: Add error handling
- Task 4: Write tests

## Context Templates

Create context templates for common tasks:

### Bug Fix Template

```
Bug description: [brief description]
Reproduction steps: [step list]
Expected behavior: [description]
Actual behavior: [description]
Related files: [file list]
Error logs: [log content]
```

### Feature Development Template

```
Feature requirements: [description]
Tech stack: [list]
Related files: [file list]
Design constraints: [constraints]
Reference implementation: [if any]
```

## Best Practices Summary

1. Precise over comprehensive - Provide relevant information, not all information
2. Structured expression - Use clear formatting and hierarchy
3. Timely updates - Update context when situations change
4. Verify understanding - Regularly confirm Claude's understanding is correct
5. Strategic refresh - Start new sessions at appropriate times
6. Use tools - Leverage @mentions and .claudeignore
7. Stay focused - Work on one main task at a time
8. Document decisions - Important decisions should be recorded and referenced

By mastering these context management techniques, you can significantly improve the efficiency and quality of your collaboration with Claude Code.
