---
title: "Basic Usage"
---

# Basic Usage

Master the basic operations of Claude Code to efficiently complete everyday development tasks.

## File Operations

### Reading Files

Claude can automatically read project files:

```
You: Read src/App.tsx

Claude: Let me read this file...
[Shows file content and analysis]
```

**Batch reading**:

```
You: Read all .tsx files under src/components/

Claude: Let me read these files...
[Reads and analyzes multiple files]
```

### Creating Files

```
You: Create src/utils/formatDate.ts with a date formatting function

Claude: Let me create this file...
[Creates file and writes code]
```

### Modifying Files

```
You: Add a new route after line 20 in src/App.tsx

Claude: Let me first read the file to see the existing structure...
[Reads file, locates position, inserts code]
```

### Deleting Files

```
You: Delete src/legacy/oldComponent.tsx

Claude: Are you sure you want to delete this file?
You: Yes
Claude: File deleted
```

## Code Generation

### Component Generation

```
You: Create a React component ProductCard with props:
- name: string
- price: number
- image: string
- onAddToCart: () => void

Use TypeScript and TailwindCSS

Claude: Let me create this component...
```

Generated code:

```typescript
interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export function ProductCard({ name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <button
        onClick={onAddToCart}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
```

### API Endpoint Generation

```
You: Create an Express API endpoint POST /api/users,
accepting { name, email, password },
validate data, save to database, return user info (without password)

Claude: Let me implement this endpoint...
```

### Utility Function Generation

```
You: Create a debounce function with debouncing functionality

Claude: Let me create this function...
```

## Command Execution

### Running Tests

```
You: Run all tests

Claude: Executing npm test...
[Shows test results]
```

### Installing Dependencies

```
You: Install axios and @types/axios

Claude: Executing npm install axios @types/axios...
[Shows installation results]
```

### Building the Project

```
You: Build production version

Claude: Executing npm run build...
[Shows build results]
```

### Git Operations

```
You: Show git status

Claude: Executing git status...
[Shows status]

You: Commit all changes with message "Add user authentication"

Claude: Executing git add . && git commit -m "Add user authentication"...
[Shows commit results]
```

## Code Analysis

### Project Structure Analysis

```
You: Analyze this project's structure

Claude: Let me read the project files...

This is a React + TypeScript project:

src/
├── components/     # React components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── hooks/          # Custom Hooks
│   └── useAuth.ts
├── utils/          # Utility functions
│   └── api.ts
├── types/          # TypeScript types
│   └── index.ts
└── App.tsx         # Main application

Tech stack:
- React 18
- TypeScript 5
- Vite
- TailwindCSS
```

### Code Quality Check

```
You: Check the code quality of src/utils/api.ts

Claude: Let me analyze this file...

Found the following issues:
1. Missing error handling
2. No type definitions
3. Hardcoded API URL
4. No request timeout settings

Suggested improvements:
[Provides specific suggestions]
```

### Dependency Analysis

```
You: Analyze the project's dependencies

Claude: Let me read package.json...

Production dependencies:
- react: ^18.2.0
- react-dom: ^18.2.0
- axios: ^1.6.0

Development dependencies:
- typescript: ^5.0.0
- vite: ^5.0.0
- @types/react: ^18.2.0

Suggestions:
- axios can be upgraded to 1.7.0
- Consider adding eslint and prettier
```

## Debugging Tips

### Adding Logs

```
You: Add console.log at key positions in src/auth/login.ts

Claude: Let me add debug logs...
[Adds logs at function entry, key branches, and error handlers]
```

### Error Tracing

```
You: Users report login failure with console showing "Network Error".
Help me trace the issue

Claude: Let me analyze the login flow...

1. Check API URL configuration
2. Check network request code
3. Check error handling

Found the issue: API URL configured incorrectly...
[Fixes the issue]
```

### Performance Analysis

```
You: Analyze performance issues in src/components/DataTable.tsx

Claude: Let me read this component...

Found performance issues:
1. Recalculates data on every render
2. Not using React.memo
3. No virtual scrolling

Suggested optimizations:
[Provides optimization plan]
```

## Refactoring Operations

### Extract Function

```
You: Extract the user validation logic from src/App.tsx into a standalone function

Claude: Let me refactor this code...
[Extracts function, updates call sites]
```

### Renaming

```
You: Rename all instances of getUserData to fetchUserData

Claude: Let me do a batch rename...
[Searches all occurrences, renames each one]
```

### Code Organization

```
You: Organize the src/utils/ directory, group related functions into different files

Claude: Let me analyze existing functions...

Suggested structure:
- dateUtils.ts - Date related
- stringUtils.ts - String related
- arrayUtils.ts - Array related

Starting refactoring...
[Creates new files, moves functions, updates imports]
```

## Testing

### Generating Tests

```
You: Generate unit tests for src/utils/formatDate.ts

Claude: Let me create the test file...
```

Generated tests:

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('2024-01-15');
  });

  it('should handle invalid date', () => {
    expect(() => formatDate(null as any)).toThrow();
  });

  it('should support custom format', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date, 'MM/DD/YYYY')).toBe('01/15/2024');
  });
});
```

### Running Specific Tests

```
You: Only run UserService tests

Claude: Executing npm test UserService...
[Shows test results]
```

### Fixing Failed Tests

```
You: The 3rd test in UserService.test.ts failed, help me fix it

Claude: Let me first run the test to see the error...
[Analyzes error, fixes code or test]
```

## Documentation Generation

### Adding Comments

```
You: Add JSDoc comments to src/utils/encryption.ts

Claude: Let me add documentation comments...
```

### Generating README

```
You: Generate a README.md for this project

Claude: Let me analyze the project structure...
[Generates README with installation, usage, API documentation]
```

### API Documentation

```
You: Generate API documentation for all endpoints under src/api/

Claude: Let me generate the API documentation...
[Analyzes endpoints, generates Markdown documentation]
```

## Quick Actions

### Quick Fix

```
You: Fix all ESLint reported errors

Claude: Executing npm run lint...
[Reviews errors, fixes each one]
```

### Format Code

```
You: Format all TypeScript files

Claude: Executing npm run format...
[Formats code]
```

### Update Dependencies

```
You: Update all dependencies to latest version

Claude: Executing npm update...
[Updates dependencies, checks for breaking changes]
```

## Common Commands Reference

### Built-in Commands

| Command | Description |
|---------|-------------|
| `/help` | View help |
| `/clear` | Clear conversation history |
| `/quit` | Exit Claude Code |
| `/model` | Switch model |
| `/cost` | View API cost |
| `/agent` | Start Agent mode |
| `/plan` | Start Plan mode |

### File Operations

```bash
# Read file
You: Read [file path]

# Create file
You: Create [file path] with [description]

# Modify file
You: Modify [file path], [changes]

# Delete file
You: Delete [file path]
```

### Command Execution

```bash
# Run command
You: Run [command]

# Install dependencies
You: Install [package name]

# Run tests
You: Run tests

# Git operations
You: git [operation]
```

## Best Practices

### 1. Specify File Paths Clearly

✅ Good: `Modify src/components/Button.tsx`
❌ Bad: `Modify the Button component`

### 2. Provide Sufficient Context

✅ Good: `Add a "Remember me" checkbox to the login form, save state using localStorage`
❌ Bad: `Add remember me functionality`

### 3. Complete Complex Tasks Step by Step

✅ Good:
```
1. First create the user model
2. Then add the API endpoint
3. Finally add the frontend form
```
❌ Bad: `Implement complete user management functionality`

### 4. Verify Results Promptly

```
You: Run tests to confirm the changes have no issues

Claude: Executing npm test...
[Shows test results]
```

### 5. Use CLAUDE.md

Create a `CLAUDE.md` in your project root to record project info, code standards, common commands, etc.

## Next Steps

- [Context Management](/docs/claude-code/workflow/context-management) - Manage conversation context
- [Best Practices](/docs/claude-code/workflow/best-practices) - Improve work efficiency
- [Advanced Features](/docs/claude-code/advanced/skills) - Learn advanced features
- [Prompt Tips](/docs/claude-code/practical/prompt-tips) - More prompt tips
