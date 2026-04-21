---
title: "Cheat Sheet"
---

# Claude Code Cheat Sheet

Quick reference for Claude Code's common commands, keyboard shortcuts, and operations.

## Keyboard Shortcuts

### Shift+Tab - Permission Mode Switching

Cycle through three permission modes:

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode
```

- **Normal Mode**: Default mode, each operation requires confirmation
- **Auto-Accept Mode**: Auto-accept edits (bottom displays `⏵⏵ accept edits on`)
- **Plan Mode**: Read-only mode (bottom displays `⏸ plan mode on`), only plans without executing

## Built-in Commands

### Basic Commands

```bash
/help          # View help information
/clear         # Clear conversation history
/quit          # Exit Claude Code
```

### Model Switching

```bash
/model         # View current model
/model opus    # Switch to Opus 4.6 (most powerful)
/model sonnet  # Switch to Sonnet 4.6 (default, balanced)
/model haiku   # Switch to Haiku 4.5 (fastest)
```

**Model details**:
- **Opus 4.6** (`claude-opus-4-6`): Most powerful, suitable for complex tasks
- **Sonnet 4.6** (`claude-sonnet-4-6`): Default, balances performance and cost
- **Haiku 4.5** (`claude-haiku-4-5-20251001`): Fastest, suitable for simple tasks

### Fast Mode

```bash
/fast          # Toggle fast mode (uses the same Opus 4.6 but outputs faster)
```

**Note**: `/fast` does not switch to a different model, it uses the same Opus 4.6 model but with faster output.

### Cost Management

```bash
/cost          # View current session's API usage cost
```

Displays:
- Input tokens
- Output tokens
- Total cost (USD)

### Skills Invocation

```bash
/<skill-name>  # Invoke user skill
```

Common Skills:
- `/commit` - Smart commit
- `/review` - Code review
- `/test` - Generate tests
- `/docs` - Generate documentation

## Permission Response Options

When Claude requests permission, you can choose:

```
Claude wants to:
  • Read file: src/config.ts
  • Write file: src/auth.ts
  • Run command: npm test

Allow? [y/n/always/never]
```

- `y` - Allow this operation
- `n` - Deny this operation
- `always` - Always allow this type of operation for this session
- `never` - Always deny this type of operation for this session

## Command Line Startup Options

### Basic Startup

```bash
# Start in current directory
claude

# Specify working directory
claude /path/to/project
```

### Permission Modes

```bash
# Auto-accept mode
claude --permission-mode auto

# Ask mode (default)
claude --permission-mode ask

# Custom mode
claude --permission-mode custom
```

### Model Selection

```bash
# Use Opus model
claude --model opus

# Use Sonnet model (default)
claude --model sonnet

# Use Haiku model
claude --model haiku
```

### Headless Mode

```bash
# For CI/CD
claude --headless "Run tests and generate report"
```

### Other Options

```bash
# View version
claude --version

# View help
claude --help
```

## Configuration Files

### Global Configuration

Location: `~/.config/claude/config.json`

```json
{
  "apiKey": "sk-ant-...",
  "defaultModel": "claude-sonnet-4-6",
  "permissionMode": "ask",
  "theme": "dark",
  "autoSave": true
}
```

### Project Configuration

Location: `.claude/settings.json`

```json
{
  "model": "claude-sonnet-4-6",
  "permissionMode": "custom",
  "allowedPaths": ["src/**", "tests/**"],
  "blockedPaths": [".env", "secrets/**"],
  "allowedCommands": ["npm test", "npm run build"],
  "blockedCommands": ["rm -rf", "git push --force"]
}
```

### Project Description

Location: `CLAUDE.md` (auto-loaded into context)

```markdown
# Project Name

## Tech Stack
- React 18
- TypeScript 5

## Code Standards
- Use functional components and Hooks
- All components must have TypeScript types

## Common Commands
- Development: `npm run dev`
- Testing: `npm test`
```

## Auto Memory System

### Memory Directory

Location: `~/.claude/projects/<project-hash>/memory/`

### MEMORY.md

- Auto-loaded into context (first 200 lines)
- Used to store project-related persistent information
- Persists across sessions

### Topic Files

Create topic files to organize memory:
- `debugging.md` - Debugging experience
- `patterns.md` - Code patterns
- `conventions.md` - Project conventions

## Environment Variables

### API Key

```bash
# Anthropic API
export ANTHROPIC_API_KEY='sk-ant-...'
```

### AWS Bedrock

```bash
export AWS_ACCESS_KEY_ID='...'
export AWS_SECRET_ACCESS_KEY='...'
export AWS_REGION='us-east-1'
```

### Proxy Settings

```bash
export HTTP_PROXY='http://proxy:8080'
export HTTPS_PROXY='http://proxy:8080'
```

### Debug Mode

```bash
export ANTHROPIC_LOG=debug
```

## Common Operation Patterns

### Quick Iteration

1. Press `Shift+Tab` to switch to Auto-Accept Mode
2. Develop quickly without confirming each time
3. Press `Shift+Tab` to return to Normal Mode when done

### Complex Task Planning

1. Press `Shift+Tab` twice to switch to Plan Mode
2. Claude creates a detailed plan but doesn't execute
3. Review the plan then press `Shift+Tab` to return to Normal Mode
4. After confirming, Claude executes the plan

### Cost Control

1. Use `/cost` to view current cost
2. Use `/model haiku` for simple tasks
3. Use `/model opus` for complex tasks
4. Use `/fast` to speed up output

## File Operations

### Read Files

```
You: Read src/App.tsx
```

### Create Files

```
You: Create src/utils/helper.ts, implement a date formatting function
```

### Modify Files

```
You: Add a new route after line 20 in src/App.tsx
```

### Batch Operations

```
You: Read all .tsx files in src/components/ directory
```

## Command Execution

### Run Tests

```
You: Run all tests
```

### Install Dependencies

```
You: Install axios and @types/axios
```

### Git Operations

```
You: Check git status
You: Commit all changes, commit message is "Add user authentication"
```

## Code Generation

### Component Generation

```
You: Create a React component UserCard, props include name, email, avatar
```

### API Endpoint

```
You: Create an Express API endpoint POST /api/users
```

### Test Generation

```
You: Generate unit tests for src/utils/helper.ts
```

## Troubleshooting

### Permission Denied

- Check permission configuration in `.claude/settings.json`
- Use `always` option to allow similar operations

### Invalid API Key

```bash
# Check environment variable
echo $ANTHROPIC_API_KEY

# Reset
export ANTHROPIC_API_KEY='sk-ant-...'
```

### Network Connection Issues

```bash
# Test connection
curl https://api.anthropic.com/v1/messages

# Use proxy
export HTTPS_PROXY=http://proxy:8080
```

### Command Not Found

```bash
# Check installation
which claude

# Reinstall
npm install -g @anthropic-ai/claude-code
```

## Best Practices

### 1. Specify File Paths Clearly

✅ Good: `Modify src/components/Button.tsx`
❌ Bad: `Modify the Button component`

### 2. Provide Sufficient Context

✅ Good: `Add a "Remember me" checkbox to the login form, use localStorage to save state`
❌ Bad: `Add remember me feature`

### 3. Use CLAUDE.md

Create `CLAUDE.md` in project root, documenting:
- Project description
- Tech stack
- Code standards
- Common commands

### 4. Use Permission Modes Appropriately

- **Normal Mode**: Important operations, uncertain tasks
- **Auto-Accept Mode**: Trusted tasks, quick iteration
- **Plan Mode**: Complex tasks, need review first

### 5. Monitor Costs Regularly

Use the `/cost` command to monitor API usage.

## Quick Reference Card

### Start Claude Code

```bash
claude                    # Current directory
claude /path/to/project   # Specified directory
claude --model opus       # Use Opus model
```

### Switch Modes

```bash
Shift+Tab                 # Cycle permission modes
/model opus               # Switch to Opus
/fast                     # Fast mode
```

### View Information

```bash
/help                     # Help
/cost                     # Cost
/model                    # Current model
```

### Permission Responses

```bash
y                         # Allow this time
n                         # Deny this time
always                    # Always allow
never                     # Always deny
```

## Getting Help

- Command line help: `claude --help`
- Online help: `/help`
- Issue reporting: https://github.com/anthropics/claude-code/issues
- Full documentation: [Claude Code Documentation](/docs/claude-code/getting-started/)
