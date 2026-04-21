---
title: "First Conversation"
---

# First Conversation

Learning how to communicate effectively with Claude Code is the key to using it efficiently. This guide will teach you how to describe tasks, provide context, and guide Claude through its work.

## Starting Claude Code

```bash
# Start in the project directory
cd /path/to/your/project
claude

# Or specify a project path
claude /path/to/project
```

After launching, you'll see:

```
Claude Code v2.1.0
Working directory: /Users/you/project
Model: claude-sonnet-4-6

You:
```

## Effective Prompt Patterns

### 1. Be Clear and Specific

❌ **Bad prompt**:
```
Help me change some code
```

✅ **Good prompt**:
```
In src/components/Button.tsx, change the onClick event to support async functions,
and show a loading state during execution
```

### 2. Provide Necessary Context

❌ **Bad prompt**:
```
How do I fix this bug?
```

✅ **Good prompt**:
```
After the user clicks the login button, the console shows error "Cannot read property 'token' of undefined".
The error occurs at line 45 in src/auth/login.ts. Please help me analyze and fix this issue.
```

### 3. Describe Expected Results

❌ **Bad prompt**:
```
Optimize this function
```

✅ **Good prompt**:
```
Optimize the processLargeDataset function in utils/dataProcessor.ts,
goal is to reduce processing time for 10000 records from 5 seconds to under 1 second
```

## Common Task Patterns

### Code Generation

```
You: Create a React component UserCard that displays the user avatar, name, and email.
Use TypeScript and TailwindCSS.

Claude: I'll create this component...
[Automatically creates src/components/UserCard.tsx]
```

**Tips**:
- Specify the tech stack to use
- Describe the component props
- Specify styling requirements

### Code Modification

```
You: Add routing in App.tsx using React Router v6.
Need three routes: home /, about /about, users /users/:id

Claude: Let me first read App.tsx to see the existing structure...
[Reads file, then modifies it]
```

**Tips**:
- Specify the file to modify
- Describe the specific changes
- Provide necessary parameters or configuration

### Bug Fixing

```
You: After running npm test, the 3rd test in UserService.test.ts failed.
The error message is "Expected 200 but got 404". Please help me debug and fix it.

Claude: Let me first run the tests to see the details...
[Runs tests, analyzes error, fixes code]
```

**Tips**:
- Provide error messages
- Describe reproduction steps
- Point out potentially related files

### Code Refactoring

```
You: Refactor all API calls under src/services/,
standardize on axios instance, add error handling and retry logic

Claude: Let me first analyze the existing API call patterns...
[Reads multiple files, creates refactoring plan, executes step by step]
```

**Tips**:
- Specify the refactoring scope
- Describe the target architecture
- Point out behaviors to preserve

### Code Explanation

```
You: Explain how the encryptData function in utils/encryption.ts works

Claude: Let me read this file...
[Reads file, provides detailed explanation]
```

**Tips**:
- Specify the file or function to explain
- Indicate the depth of understanding you want
- Ask about specific areas of confusion

## Context Management Tips

### Using CLAUDE.md

Create a `CLAUDE.md` in your project root, and Claude will read it automatically:

```markdown
# Project Description

This is a backend API for an e-commerce website.

## Tech Stack
- Node.js + Express
- PostgreSQL
- Redis (caching)
- JWT (authentication)

## Project Structure
- src/routes/ - API routes
- src/controllers/ - Business logic
- src/models/ - Data models
- src/middleware/ - Middleware

## Code Standards
- Use async/await, not Promise.then
- All APIs return unified format: { success, data, error }
- Use custom Error classes for errors

## Database
- Primary database: PostgreSQL
- Cache: Redis
- Connection pool size: 20

## Notes
- Do not modify the src/legacy/ directory (legacy code, planned for rewrite)
- API keys are stored in .env file
- All database operations must use transactions
```

### Referencing Files

```
You: Reference the styling of src/components/Button.tsx,
create a similar Input component

Claude: Let me first read Button.tsx...
[Reads reference file, creates new component]
```

### Multi-file Tasks

```
You: Implement user authentication:
1. Add login and registration routes in routes/auth.ts
2. Implement business logic in controllers/authController.ts
3. Add JWT verification middleware in middleware/auth.ts
4. Update app.ts to register new routes

Claude: This is a multi-file task, let me complete it step by step...
[Creates/modifies files in order]
```

## Using Built-in Commands

### Model Switching

```bash
/model opus     # Switch to Opus (most powerful, complex tasks)
/model sonnet   # Switch to Sonnet (default, balanced)
/model haiku    # Switch to Haiku (simple tasks, faster)
```

### View Costs

```bash
/cost           # View API usage cost for current session
```

### Clear History

```bash
/clear          # Clear conversation history (but keep project context)
```

### Help

```bash
/help           # View all available commands
```

## Agent Mode

Let Claude complete complex tasks autonomously:

```
You: /agent Implement a complete user authentication system, including:
- Registration (email verification)
- Login (JWT)
- Password reset
- Permission management
- Unit tests

Claude: I'll complete this task autonomously. Let me first make a plan...

[Plan]
1. Create database models
2. Implement registration
3. Implement login
4. Implement password reset
5. Add permission middleware
6. Write tests

Starting execution...
[Automatically completes all steps]
```

## Plan Mode

Create a plan first, then execute after confirmation:

```
You: /plan Refactor the entire database layer, replace raw SQL with TypeORM

Claude: Let me first analyze the existing code and create a refactoring plan...

[Shows detailed plan]

You: Looks good, start execution

Claude: Starting the refactoring...
[Executes according to plan]
```

## Permission Confirmation

By default, Claude will ask before executing operations:

```
Claude wants to:
  • Read file: src/config/database.ts
  • Write file: src/models/User.ts
  • Run command: npm install typeorm

Allow? [y/n/always/never]
```

Option descriptions:
- `y` - Allow this time
- `n` - Deny this time
- `always` - Always allow (current session)
- `never` - Always deny (current session)

## Handling Common Issues

### Claude Misunderstood My Intent

```
You: No, I wanted you to modify the existing Button component,
not create a new one. Please modify src/components/Button.tsx

Claude: I understand, let me modify the existing Button component...
```

### Claude Needs More Information

```
Claude: I need to know:
1. Which database table should user data be stored in?
2. What algorithm should be used for password encryption?
3. What is the JWT expiration time?

You: 1. users table
2. bcrypt
3. 24 hours
```

### Task Is Too Complex

```
You: This task is quite complex, please give me an implementation plan first,
and start coding after I confirm

Claude: Sure, let me first analyze the requirements and create a plan...
[Provides detailed plan]
```

## Principles of Effective Communication

### 1. Incremental Tasks

Break large tasks into small steps:

```
You: First create the user model
Claude: [Creates model]

You: Now add the registration endpoint
Claude: [Adds endpoint]

You: Add email verification
Claude: [Adds verification]
```

### 2. Timely Feedback

Point out issues immediately when you find them:

```
Claude: I've added the login functionality...

You: Wait, I see you're storing passwords in plaintext,
that's not secure. Please use bcrypt encryption instead

Claude: You're right, let me fix this security issue...
```

### 3. Provide Examples

Use examples to illustrate expectations:

```
You: Create an API response formatting function,
for success return: { success: true, data: {...} }
for failure return: { success: false, error: "error message" }

Claude: Got it, let me create this function...
```

### 4. Specify Constraints

Clearly state limitations:

```
You: Optimize this query, but don't modify the database structure,
and don't add new indexes

Claude: OK, I'll only optimize the query statement itself...
```

## Next Steps

- [Getting Started](/docs/claude-code/getting-started/) - Learn common features
- [Context Management](/docs/claude-code/workflow/context-management) - Deep dive into context
- [Best Practices](/docs/claude-code/workflow/best-practices) - Improve work efficiency
- [Prompt Tips](/docs/claude-code/practical/prompt-tips) - More prompt tips

## Prompt Templates

### Feature Development

```
Implement [feature description] in [file path].
Requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]
Use [tech stack].
```

### Bug Fixing

```
There's an issue with [function/component] in [file path]:
- Symptom: [problem description]
- Error message: [error content]
- Reproduction steps: [steps]
Please analyze and fix.
```

### Code Review

```
Review the code in [file path], focusing on:
- Performance issues
- Security vulnerabilities
- Code standards
- Potential bugs
Provide improvement suggestions.
```

### Refactoring

```
Refactor [directory/file]:
- Goal: [refactoring goal]
- Preserve: [behaviors to keep]
- Improve: [points to improve]
```
