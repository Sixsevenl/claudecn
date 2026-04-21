---
title: "Quickstarts"
---

# Quickstarts

Get started with Claude Code in 5 minutes and begin your AI-assisted programming journey.

## Installation

```bash
# Install using npm
npm install -g @anthropic-ai/claude-code

# Or using yarn
yarn global add @anthropic-ai/claude-code

# Verify installation
claude --version
```

## Configure API Key

```bash
# First run will prompt for API Key
claude

# Or manually set environment variable
export ANTHROPIC_API_KEY="your-api-key-here"

# Verify configuration
You: /cost

Claude: API Key configured
Current balance: $50.00
This month's usage: $2.34
```

## First Command

```bash
# Launch Claude Code
claude

# Simple greeting
You: Hello

Claude: Hello! I'm Claude, your AI programming assistant. I can help you:
- Write and modify code
- Analyze project structure
- Debug issues
- Execute system commands
- Manage files

What do you need help with?

# View help
You: /help

Claude: Available commands:
/help - Show help information
/clear - Clear conversation history
/quit - Exit Claude Code
/model [opus|sonnet|haiku] - Switch model
/cost - View usage cost
/fast - Fast mode

Keyboard shortcuts:
Shift+Tab - Switch permission mode
Ctrl+C - Interrupt operation
Ctrl+D - Exit
```

## Create Your First Project

```bash
You: Create a simple Express API project

Claude: I'll create a basic Express project...

Claude wants to:
  • Write file: package.json
  • Write file: src/index.ts
  • Write file: src/routes/api.ts
  • Write file: tsconfig.json
Allow? [y/n/always/never]

You: y

Claude: Project created! Structure:

my-api/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    └── routes/
        └── api.ts

Next steps:
1. npm install - Install dependencies
2. npm run dev - Start dev server
3. Visit http://localhost:3000

Would you like me to add more features?
```

## Reading and Modifying Files

```bash
You: Read src/index.ts and add CORS support

Claude: Let me read the file first...

Claude wants to:
  • Read file: src/index.ts
Allow? [y/n/always/never]

You: y

Claude: I can see the current code. Now adding CORS...

Claude wants to:
  • Edit file: src/index.ts
  • Run command: npm install cors @types/cors
Allow? [y/n/always/never]

You: y

Claude: CORS support added:

```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
```

CORS configured, cross-origin requests are now supported.
```

## Permission Modes

```bash
# Normal Mode (default) - every operation requires confirmation
You: Create three new components

Claude wants to:
  • Write file: src/components/Header.tsx
Allow? [y/n/always/never]

You: always  # Always allow this type of operation

Claude: [Continues creating other components without asking again for write operations]

# Press Shift+Tab to switch to Auto-Accept Mode
[Bottom shows: ⏵⏵ accept edits on]

You: Add style files

Claude: [Auto-executes without confirmation]
Created:
- src/styles/header.css
- src/styles/footer.css
- src/styles/main.css

# Press Shift+Tab again to switch to Plan Mode
[Bottom shows: ⏸ plan mode on]

You: Refactor component structure

Claude: Refactoring plan:

1. Create components/common directory
2. Move common components to common
3. Update all import paths
4. Add index.ts export files

Execute this plan?

You: y

[Switches back to Normal Mode to execute]
```

## Switching Models

```bash
# View current model
You: /model

Claude: Currently using: Sonnet 4.6
Available models:
- opus - Strongest reasoning, for complex tasks
- sonnet - Balanced performance and cost (current)
- haiku - Fast response, for simple tasks

# Switch to Opus
You: /model opus

Claude: Switched to Opus 4.6
This model provides the strongest reasoning capabilities, suitable for:
- Complex architecture design
- Deep code analysis
- Security auditing
- Performance optimization

# Switch to fast mode
You: /fast

Claude: Fast mode enabled
Using the same Opus 4.6 model but with faster output
Suitable for rapid iteration and simple tasks
```

## Git Integration

```bash
You: Check Git status and create a commit

Claude: Let me check Git status...

Claude wants to:
  • Run command: git status
Allow? [y/n/always/never]

You: y

Claude: Found the following changes:
- src/components/Header.tsx (new)
- src/components/Footer.tsx (new)
- src/styles/main.css (modified)

Claude wants to:
  • Run command: git add .
  • Run command: git commit -m "feat: add Header and Footer components"
Allow? [y/n/always/never]

You: y

Claude: Commit created:
feat: add Header and Footer components

Would you like to push to remote?
```

## Debugging Code

```bash
You: This function is throwing an error, help me find the issue

Claude: Let me look at the code...

Claude wants to:
  • Read file: src/utils/parser.ts
Allow? [y/n/always/never]

You: y

Claude: Found the issue!

Line 23:
```typescript
const result = JSON.parse(data);
```

Problem: No error handling, will crash if data is not valid JSON

Suggested fix:
```typescript
try {
  const result = JSON.parse(data);
  return result;
} catch (error) {
  console.error('JSON parse error:', error);
  return null;
}
```

Apply this fix?

You: y

Claude: Fixed! Added error handling, now it's safer.
```

## Running Tests

```bash
You: Run tests and fix the failing ones

Claude: Let me run the tests...

Claude wants to:
  • Run command: npm test
Allow? [y/n/always/never]

You: y

Claude: Test results:
✓ 15 passed
✗ 2 failed

Failed tests:
1. UserService.createUser - Expected to return user object
2. AuthMiddleware.verify - JWT verification failed

Let me check these tests...

Claude wants to:
  • Read file: tests/UserService.test.ts
  • Read file: tests/AuthMiddleware.test.ts
Allow? [y/n/always/never]

You: y

Claude: Issue analysis:

Test 1: createUser returned undefined
Cause: Missing return statement

Test 2: JWT verification used wrong secret
Cause: Test environment variable not set

Fix these issues?

You: y

Claude: All issues fixed! Re-running tests...

✓ 17 passed
✗ 0 failed

All tests passing!
```

## Project Analysis

```bash
You: Analyze this project's structure

Claude: Let me scan the project...

Claude wants to:
  • Run command: find . -type f -name "*.ts" -o -name "*.tsx" | head -50
  • Read file: package.json
  • Read file: tsconfig.json
Allow? [y/n/always/never]

You: y

Claude: Project analysis report:

Project type: React + TypeScript + Express
File statistics:
- TypeScript files: 45
- React components: 23
- Test files: 18
- Configuration files: 5

Directory structure:
src/
├── client/          # React frontend
│   ├── components/  # 23 components
│   ├── hooks/       # 5 custom hooks
│   └── pages/       # 8 pages
├── server/          # Express backend
│   ├── routes/      # 12 routes
│   ├── models/      # 6 data models
│   └── middleware/  # 4 middleware
└── shared/          # Shared code
    └── types/       # Type definitions

Dependency analysis:
- React 18.2.0
- Express 4.18.2
- TypeScript 5.0.4

Suggestions:
1. Consider adding ESLint configuration
2. Missing README documentation
3. Recommend adding CI/CD configuration
```

## View Costs

```bash
You: /cost

Claude: Usage statistics:

This session:
- Input tokens: 1,234
- Output tokens: 2,456
- Cost: $0.08

Today's total:
- Requests: 45
- Total cost: $1.23

This month's total:
- Requests: 892
- Total cost: $18.45

Current balance: $31.55
```

## Exiting

```bash
# Method 1: Use command
You: /quit

Claude: Goodbye! This session's cost: $0.08

# Method 2: Use keyboard shortcut
Ctrl+D

# Method 3: Clear then exit
You: /clear
You: /quit
```

## FAQ

```bash
# Q: How to undo an operation?
You: Undo the last change

Claude: I'll restore the file...

Claude wants to:
  • Run command: git checkout -- src/App.tsx
Allow? [y/n/always/never]

# Q: How to view history?
You: Show our conversation history

Claude: This session's history:
1. Create Express project
2. Add CORS support
3. Create three components
4. Run tests
5. Analyze project structure

# Q: How to save a session?
You: Save this conversation

Claude: Conversation auto-saved to:
~/.claude/sessions/2026-04-16-session.json

You can restore it later using the /load command
```

## Next Steps

Now that you've mastered the basics, you can:

1. Check out [Prompt Tips](/en/docs/claude-code/practical/prompt-tips) to learn more prompting techniques
2. Learn about [Workflows](/en/docs/claude-code/workflow/code-review) to optimize your development process
3. Explore [Advanced Features](/en/docs/claude-code/advanced/agent-loop) for deeper usage

Start your AI-assisted programming journey!
