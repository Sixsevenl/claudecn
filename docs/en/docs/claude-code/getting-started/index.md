---
title: "Getting Started"
---

# Getting Started

Claude Code is the official command-line tool from Anthropic that lets you interact directly with Claude in your terminal and have Claude help you complete various programming tasks.

## What is Claude Code?

Claude Code is a powerful AI coding assistant that can:

- 📝 **Read and write code** - Directly read and modify your project files
- 🔍 **Understand projects** - Analyze codebase structure and dependencies
- 🛠️ **Execute commands** - Run tests, builds, deployments and other tasks
- 🤖 **Work autonomously** - Automatically complete complex tasks through Agent mode
- 🔗 **Tool integration** - Connect to various external tools via the MCP protocol

## Quick Installation

### macOS / Linux

```bash
# Install using Homebrew
brew install anthropics/claude/claude

# Or install using npm
npm install -g @anthropic-ai/claude-code
```

### Windows

```powershell
# Install using npm
npm install -g @anthropic-ai/claude-code
```

## First Use

1. **Get an API Key**

Visit [Anthropic Console](https://console.anthropic.com/) to create an API Key.

2. **Configure API Key**

```bash
# Set environment variable
export ANTHROPIC_API_KEY='your-api-key-here'

# Or set in configuration
claude config set apiKey your-api-key-here
```

3. **Launch Claude Code**

```bash
# Launch in your project directory
cd your-project
claude

# Or specify a project path
claude /path/to/project
```

## First Conversation

After launching, you'll see the Claude Code interactive interface:

```
Claude Code v2.1.0
Working directory: /Users/you/project

You: Help me analyze this project's structure
```

Claude will automatically:
1. Read project files
2. Analyze the code structure
3. Provide a detailed project overview

## Basic Commands

### Built-in Commands

```bash
/help          # View help
/clear         # Clear conversation history
/quit          # Exit Claude Code
/model         # Switch model (sonnet/opus/haiku)
/cost          # View API usage cost
/fast          # Toggle fast mode (same model but faster output)
```

### Keyboard Shortcuts

**Shift+Tab** - Cycle through permission modes:

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode
```

- **Normal Mode**: Default mode, each operation requires confirmation
- **Auto-Accept Mode**: Automatically accept edits (bottom shows `⏵⏵ accept edits on`)
- **Plan Mode**: Read-only mode (bottom shows `⏸ plan mode on`), Claude only plans without executing

### Common Operations

```bash
# Have Claude read a file
You: Read the src/index.ts file

# Have Claude modify code
You: Add a login button to App.tsx

# Have Claude run tests
You: Run all unit tests

# Have Claude explain code
You: Explain what utils/helper.js does
```

## Working Modes

### 1. Normal Mode (Default)

Chat directly with Claude, each operation requires confirmation:

```
You: I want to add user authentication
Claude: I'll help you implement that. Let me first look at the existing code structure...

Claude wants to:
  • Read file: src/auth.ts
  • Write file: src/auth/login.ts
Allow? [y/n/always/never]
```

### 2. Auto-Accept Mode

Press `Shift+Tab` to switch to auto-accept mode, Claude will automatically execute all edit operations:

```
Bottom shows: ⏵⏵ accept edits on

You: Add login functionality
Claude: I'll implement that...
[Automatically reads and writes files without confirmation]
```

**Use cases**: Trusted tasks, rapid iteration

### 3. Plan Mode

Press `Shift+Tab` to switch to plan mode, Claude only plans without executing:

```
Bottom shows: ⏸ plan mode on

You: Refactor the database layer
Claude: Let me create a refactoring plan...

Plan:
1. Create a new database abstraction layer
2. Migrate existing queries
3. Update tests
4. Verify performance

[No operations executed, only displays the plan]
```

**Use cases**: Complex tasks, when you need to review the plan first

**Exit Plan Mode**: Press `Shift+Tab` again to return to Normal Mode

## Permission System

Claude Code has three permission modes that can be cycled through with the **Shift+Tab** shortcut:

### Normal Mode (Default)

Asks for confirmation before each operation:

```
Claude wants to:
  • Read file: src/config.ts
  • Write file: src/auth.ts
  • Run command: npm test

Allow? [y/n/always/never]
```

**Response options**:
- `y` - Allow this operation
- `n` - Deny this operation
- `always` - Always allow this type of operation for this session
- `never` - Always deny this type of operation for this session

### Auto-Accept Mode

Press `Shift+Tab` to switch, automatically accepts all edit operations:

```
Bottom shows: ⏵⏵ accept edits on
```

**Features**:
- Automatically executes file reads and writes
- Still asks about dangerous operations (e.g., deleting files, git push)
- Suitable for rapid iteration and trusted tasks

### Plan Mode

Press `Shift+Tab` to switch, read-only mode:

```
Bottom shows: ⏸ plan mode on
```

**Features**:
- Claude only creates plans, does not execute operations
- Safely explore complex tasks
- After confirming the plan, exit Plan Mode to execute

### Command-line Startup Options

```bash
# Start in Auto-Accept mode
claude --permission-mode auto

# Start with custom permission configuration
claude --permission-mode custom
```

### Custom Permission Configuration

Configure rules in `.claude/settings.json`:

```json
{
  "permissionMode": "custom",
  "allowedPaths": ["src/**", "tests/**"],
  "allowedCommands": ["npm test", "npm run build"],
  "blockedPaths": [".env", "secrets/**"]
}
```

## Project Configuration

Create a `CLAUDE.md` file in the project root to tell Claude important project information:

```markdown
# Project Description

This is a React + TypeScript project.

## Tech Stack
- React 18
- TypeScript 5
- Vite
- TailwindCSS

## Code Standards
- Use functional components and Hooks
- All components must have TypeScript types
- Use ESLint and Prettier

## Testing
Run tests: `npm test`
```

## Next Steps

- [Installation](/docs/claude-code/guide/installation) - Detailed installation and configuration guide
- [First Conversation](/docs/claude-code/guide/first-conversation) - Learn how to communicate effectively with Claude
- [Getting Started](/docs/claude-code/getting-started/) - Master common features and tips
- [Workflows](/docs/claude-code/workflow/context-management) - Learn efficient workflows

## FAQ

### Claude can't read my files?

Check your permission settings and file paths. Claude can only access the current working directory and its subdirectories.

### How do I make Claude remember project information?

Create a `CLAUDE.md` file with project descriptions, tech stack, code standards, and other information.

### How are API costs calculated?

Use the `/cost` command to view the current session's costs. Claude Code uses the Anthropic API, billed by token.

### Can I use it in CI/CD?

Yes! Use Headless mode:

```bash
claude --headless "Run tests and generate report"
```

## Getting Help

- 📖 [Full Documentation](/docs/claude-code/getting-started/)
- 💬 [GitHub Discussions](https://github.com/anthropics/claude-code/discussions)
- 🐛 [Report Issues](https://github.com/anthropics/claude-code/issues)
- 🔧 Command-line help: `claude --help`
