---
title: "VS Code Integration"
---

# VS Code Integration

Claude Code integrates deeply with VS Code, letting you enjoy the power of AI-assisted programming in your familiar editor.

## Installation and Configuration

### 1. Install Claude Code

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### 2. Configure VS Code Terminal

Open the integrated terminal in VS Code:

```bash
# macOS/Linux: Ctrl+`
# Windows: Ctrl+`

# Launch Claude Code
claude

Claude Code v2.1.74
Connected to Claude Sonnet 4.6

You:
```

### 3. Workspace Integration

Claude Code automatically detects VS Code workspaces:

```bash
You: Analyze the current project structure

Claude: Detected VS Code workspace: /Users/sixseven/projects/my-app

Claude wants to:
  • List directory: /Users/sixseven/projects/my-app
  • Read file: package.json
  • Read file: tsconfig.json
Allow? [y/n/always/never]

You: always

Claude: Project analysis:
- React + TypeScript project
- Using Vite for builds
- Contains 23 components
- Test coverage 78%
```

## Core Features

### File Edit Sync

When Claude modifies files, VS Code automatically refreshes:

```bash
You: Refactor src/App.tsx

Claude wants to:
  • Read file: /Users/sixseven/projects/my-app/src/App.tsx
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: /Users/sixseven/projects/my-app/src/App.tsx
Allow? [y/n/always/never]

You: y

Claude: Refactored App.tsx
[VS Code automatically refreshes file content]
```

**Changes in VS Code**:
- File tab shows modification indicator
- Can undo with Cmd+Z
- Git panel shows changes

### Smart Code Navigation

Claude can help you navigate code in VS Code:

```bash
You: Find all components that use useState

Claude wants to:
  • Search pattern: "useState" in *.tsx files
Allow? [y/n/always/never]

You: y

Claude: Found 12 components using useState:

1. src/components/Counter.tsx (line 5)
2. src/components/Form.tsx (line 8)
3. src/components/Modal.tsx (line 12)
...

Open these files in VS Code?

You: Open the first 3

Claude wants to:
  • Run command: code src/components/Counter.tsx:5
  • Run command: code src/components/Form.tsx:8
  • Run command: code src/components/Modal.tsx:12
Allow? [y/n/always/never]

You: y

[VS Code opens files and jumps to specified lines]
```

### Multi-file Editing

Claude can edit multiple files simultaneously, and VS Code will show all changes:

```bash
You: Change all component Props types from type to interface

Claude: I'll batch modify all component files...

Claude wants to:
  • Search pattern: "type.*Props.*=" in src/components/
Allow? [y/n/always/never]

You: y

Claude: Found 15 files to modify

Claude wants to:
  • Edit file: src/components/Button.tsx
  • Edit file: src/components/Input.tsx
  • Edit file: src/components/Modal.tsx
  • ... (12 more files)
Allow? [y/n/always/never]

You: y

Claude: Modified 15 files
[VS Code Git panel shows all changes]
```

**View changes in VS Code**:

```bash
# VS Code Git panel shows:
M src/components/Button.tsx
M src/components/Input.tsx
M src/components/Modal.tsx
...

# Click files to view diff
- type ButtonProps = {
+ interface ButtonProps {
```

## Debugging Integration

### Run and Debug

```bash
You: Start the development server

Claude wants to:
  • Run command: npm run dev
Allow? [y/n/always/never]

You: n

Claude: I suggest you run this manually in the VS Code terminal:
  npm run dev

This way the server stays running in the background.

You: OK
[Run npm run dev in a new VS Code terminal]

You: Now help me debug the login functionality

Claude: Let me check the login-related code...

Claude wants to:
  • Read file: src/components/LoginForm.tsx
  • Read file: src/api/auth.ts
Allow? [y/n/always/never]

You: always

Claude: I found an issue:

In src/api/auth.ts line 23:
```typescript
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify(credentials)
  // Missing Content-Type header
})
```

Need to add:
```typescript
headers: {
  'Content-Type': 'application/json'
}
```

Should I fix it?

You: Yes

Claude wants to:
  • Edit file: src/api/auth.ts
Allow? [y/n/always/never]

You: y

Claude: Fixed. After saving the file in VS Code, the dev server will auto-reload.
```

### Breakpoint Debugging Assistance

```bash
You: Add debug logs to the login function

Claude wants to:
  • Read file: src/api/auth.ts
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/api/auth.ts
Allow? [y/n/always/never]

You: y

Claude: Added debug logs:

```typescript
export async function login(credentials: Credentials) {
  console.log('[DEBUG] Login attempt:', {
    username: credentials.username,
    timestamp: new Date().toISOString()
  })

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })

    console.log('[DEBUG] Response status:', response.status)

    const data = await response.json()
    console.log('[DEBUG] Response data:', data)

    return data
  } catch (error) {
    console.error('[DEBUG] Login error:', error)
    throw error
  }
}
```

Now open the browser console in VS Code to view the logs.
```

## Code Snippet Generation

### Quick Component Generation

```bash
You: Generate a registration component with form validation

Claude wants to:
  • Write file: src/components/RegisterForm.tsx
  • Write file: src/schemas/register.ts
Allow? [y/n/always/never]

You: y

Claude: Created registration component:

Files:
- src/components/RegisterForm.tsx (React component)
- src/schemas/register.ts (Zod validation)

Open in VS Code:
  code src/components/RegisterForm.tsx

You: Open it

Claude wants to:
  • Run command: code src/components/RegisterForm.tsx
Allow? [y/n/always/never]

You: y

[VS Code opens the file]
```

### Enhanced Code Completion

Claude can generate code based on context:

```bash
You: I have UserList.tsx open in VS Code, help me add pagination

Claude wants to:
  • Read file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: I see the current implementation. I'll add:
1. Pagination state management
2. Pagination controls component
3. API call updates

Claude wants to:
  • Edit file: src/components/UserList.tsx
  • Write file: src/components/Pagination.tsx
Allow? [y/n/always/never]

You: y

Claude: Added pagination functionality.

In VS Code:
1. UserList.tsx updated (added pagination state)
2. New Pagination.tsx component created
3. Use Cmd+Shift+F to search "Pagination" to see all references
```

## Git Integration

### Commit Assistance

```bash
You: Show current Git status

Claude wants to:
  • Run command: git status
Allow? [y/n/always/never]

You: y

Claude: Git status:

Modified files:
- src/components/UserList.tsx
- src/components/Pagination.tsx (new file)
- src/api/users.ts

You: Generate a commit message

Claude wants to:
  • Run command: git diff --staged
Allow? [y/n/always/never]

You: y

Claude: Suggested commit message:

feat(users): add pagination to user list

- Add Pagination component with page controls
- Update UserList to support paginated data
- Modify users API to accept page parameters

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

Should I create the commit?

You: Yes

Claude wants to:
  • Run command: git add src/components/UserList.tsx src/components/Pagination.tsx src/api/users.ts
  • Run command: git commit -m "feat(users): add pagination to user list..."
Allow? [y/n/always/never]

You: y

Claude: Commit created. You can see the new commit in the VS Code Git panel.
```

### Code Review

```bash
You: Review the latest commit

Claude wants to:
  • Run command: git log -1 --stat
  • Run command: git show HEAD
Allow? [y/n/always/never]

You: y

Claude: Latest commit review:

Commit: feat(users): add pagination to user list
Author: Your Name
Date: 2026-04-16

Change analysis:
✓ Good code quality
✓ Complete type definitions
✓ Follows project standards

Suggestions:
- Consider adding unit tests
- Pagination component could be extracted as a generic component

Should I implement these improvements?
```

## Task Automation

### Custom Workflows

```bash
You: Create a complete workflow for a new feature

Claude: I'll execute the standard feature development workflow:

1. Create feature branch
2. Generate components and tests
3. Run tests
4. Commit code

Start?

You: Yes, the feature is "user avatar upload"

Claude wants to:
  • Run command: git checkout -b feature/avatar-upload
Allow? [y/n/always/never]

You: y

Claude: ✓ Created branch feature/avatar-upload

Claude wants to:
  • Write file: src/components/AvatarUpload.tsx
  • Write file: src/components/AvatarUpload.test.tsx
  • Write file: src/api/upload.ts
  • Edit file: src/components/UserProfile.tsx
Allow? [y/n/always/never]

You: y

Claude: ✓ All files created

Claude wants to:
  • Run command: npm test AvatarUpload
Allow? [y/n/always/never]

You: y

Claude: ✓ Tests passed

Claude wants to:
  • Run command: git add .
  • Run command: git commit -m "feat(profile): add avatar upload functionality"
Allow? [y/n/always/never]

You: y

Claude: ✓ Feature development complete!

In VS Code:
- Switched to feature/avatar-upload branch
- 4 new files created
- Tests passed
- Code committed

Next: Push to remote and create a PR?
```

### Batch Refactoring

```bash
You: Migrate all class components to functional components

Claude: This is a large refactoring task. Let me analyze first...

Claude wants to:
  • Search pattern: "class.*extends React.Component"
Allow? [y/n/always/never]

You: y

Claude: Found 8 class components to migrate:

1. src/components/OldButton.tsx
2. src/components/LegacyModal.tsx
3. src/components/ClassForm.tsx
...

I'll migrate them one by one, each will show changes in VS Code.

Start migration?

You: Yes

# Press Shift+Tab to switch to Auto-Accept Mode
[Bottom shows: ⏵⏵ accept edits on]

Claude: [Automatically processes all files]

✓ OldButton.tsx → functional component
✓ LegacyModal.tsx → functional component
✓ ClassForm.tsx → functional component
...

Done! 8 components migrated.

View all changes in the VS Code Git panel.
```

## Extension Recommendations

### VS Code Extensions to Use with Claude Code

```bash
You: Recommend some VS Code extensions to use with Claude Code

Claude: Based on your project type (React + TypeScript), I recommend:

Essential extensions:
1. ESLint - Code linting
2. Prettier - Code formatting
3. GitLens - Git enhancement
4. Error Lens - Error highlighting

React development:
5. ES7+ React/Redux/React-Native snippets
6. Auto Rename Tag
7. CSS Modules

TypeScript:
8. Pretty TypeScript Errors
9. TypeScript Error Translator

Should I generate a .vscode/extensions.json recommendation config?

You: Yes

Claude wants to:
  • Write file: .vscode/extensions.json
Allow? [y/n/always/never]

You: y

Claude: Created extension recommendation config.

When team members open the project, VS Code will prompt to install these extensions.
```

## Workspace Settings

### Project Configuration

```bash
You: Create VS Code workspace configuration for the project

Claude wants to:
  • Write file: .vscode/settings.json
Allow? [y/n/always/never]

You: y

Claude: Created workspace settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/dist": true
  }
}
```

These settings will apply to all team members.
```

### Debug Configuration

```bash
You: Create VS Code debug configuration

Claude wants to:
  • Write file: .vscode/launch.json
Allow? [y/n/always/never]

You: y

Claude: Created debug configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Run Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["--run"],
      "console": "integratedTerminal"
    }
  ]
}
```

Now you can start debugging in VS Code by pressing F5.
```

## Keyboard Shortcuts

### Common Operations

Using Claude Code in the VS Code terminal:

```bash
# Quick permission mode toggle
Shift+Tab

# View help
You: /help

# Switch model
You: /model opus
Claude: Switched to Claude Opus 4.6

# View cost
You: /cost
Claude: Session cost: $0.15

# Clear history
You: /clear
Claude: History cleared

# Exit
You: /quit
```

### Custom Commands

```bash
You: Create a shortcut command to run tests and checks

Claude: I can create an npm script:

Claude wants to:
  • Read file: package.json
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: package.json
Allow? [y/n/always/never]

You: y

Claude: Added script:

```json
{
  "scripts": {
    "check": "npm run type-check && npm run lint && npm test"
  }
}
```

Now you can run:
  npm run check

Or in VS Code press Cmd+Shift+P, type "Tasks: Run Task", select "check".
```

## Performance Optimization

### Large Project Handling

```bash
You: This project has 500+ files, how to optimize Claude Code performance?

Claude: For large projects, I recommend:

1. Use .claudeignore to exclude unnecessary files
2. Enable Fast Mode
3. Use specific file paths instead of global searches

Should I create .claudeignore?

You: Yes

Claude wants to:
  • Write file: .claudeignore
Allow? [y/n/always/never]

You: y

Claude: Created .claudeignore:

```
node_modules/
dist/
build/
.git/
coverage/
*.log
.DS_Store
```

This will significantly improve performance.

You: Enable Fast Mode

Claude: /fast

[Fast Mode enabled]

Response speed will now be faster.
```

## Team Collaboration

### Shared Configuration

```bash
You: Create standard VS Code + Claude Code configuration for the team

Claude wants to:
  • Write file: .vscode/settings.json
  • Write file: .vscode/extensions.json
  • Write file: .vscode/launch.json
  • Write file: .claude/rules.md
  • Write file: .claudeignore
Allow? [y/n/always/never]

You: y

Claude: Created complete team configuration:

VS Code configuration:
- settings.json (editor settings)
- extensions.json (recommended extensions)
- launch.json (debug configuration)

Claude Code configuration:
- rules.md (team rules)
- .claudeignore (ignore files)

Commit these configurations to Git:

Claude wants to:
  • Run command: git add .vscode/ .claude/ .claudeignore
  • Run command: git commit -m "chore: add team VS Code and Claude Code configuration"
Allow? [y/n/always/never]

You: y

Claude: ✓ Configuration committed

When team members clone the project, VS Code will automatically apply these settings.
```

## Troubleshooting

### Common Issues

```bash
You: VS Code isn't auto-refreshing files modified by Claude

Claude: This is usually because files were modified externally. Solution:

1. Enable auto-refresh in VS Code:

Claude wants to:
  • Read file: .vscode/settings.json
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: .vscode/settings.json
Allow? [y/n/always/never]

You: y

Claude: Added settings:

```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

2. Reload the VS Code window:
   Cmd+Shift+P → "Reload Window"

The issue should be resolved.
```

## Best Practices

### 1. Keep the Terminal in VS Code

```bash
# Run Claude Code in the VS Code integrated terminal
# instead of an external terminal

# Benefits:
- File paths auto-sync
- Can directly open files
- Better Git integration
- Unified keyboard shortcuts
```

### 2. Use Workspaces

```bash
You: Open multiple related projects

Claude: I suggest creating a VS Code workspace:

Claude wants to:
  • Write file: my-workspace.code-workspace
Allow? [y/n/always/never]

You: y

Claude: Created workspace configuration:

```json
{
  "folders": [
    { "path": "./frontend" },
    { "path": "./backend" },
    { "path": "./shared" }
  ],
  "settings": {
    "claude.projectRoot": "${workspaceFolder}"
  }
}
```

Open in VS Code:
  code my-workspace.code-workspace
```

### 3. Leverage Git Integration

```bash
# After Claude modifies files, in VS Code:
# 1. View changes in Git panel
# 2. Review diffs
# 3. Selective staging
# 4. Commit

You: Only commit some changes

Claude: In the VS Code Git panel:
1. Click a file to view diff
2. Click "+" next to line numbers to stage specific lines
3. Commit the staged changes

Or use the command:

Claude wants to:
  • Run command: git add -p
Allow? [y/n/always/never]

You: y

[Interactive staging]
```

## Summary

VS Code integration with Claude Code provides:

- Seamless file editing experience
- Powerful code navigation
- Complete Git workflow
- Debugging and testing support
- Team collaboration configuration

Using Claude Code in VS Code, you can enjoy your familiar editor interface combined with the power of AI-assisted programming.
