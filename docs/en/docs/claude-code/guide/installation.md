---
title: "Installation & Configuration"
---

# Installation & Configuration

This guide helps you install and configure Claude Code on different platforms.

## System Requirements

- **Operating System**: macOS, Linux, or Windows
- **Node.js**: v18 or higher
- **Network**: Access to Anthropic API required

## Installation

### macOS / Linux

```bash
# Install using npm
npm install -g @anthropic-ai/claude-code

# Or use Homebrew
brew install anthropics/claude/claude

# Verify installation
claude --version
```

### Windows

```powershell
npm install -g @anthropic-ai/claude-code
```

## Configure API Key

### Method 1: Environment Variable (Recommended)

```bash
# macOS/Linux - Add to ~/.zshrc
export ANTHROPIC_API_KEY='sk-ant-...'

# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

### Method 2: Configuration File

```bash
claude config set apiKey sk-ant-...
```

### Verify Configuration

```bash
claude --version
claude config list
```

## First Launch

```bash
cd your-project
claude

Claude Code v2.1.0
Working directory: /Users/you/project

You: Help me analyze the project structure
```

After launching, press **Shift+Tab** to cycle through permission modes:

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode

- Normal Mode: Default, each operation requires confirmation
- Auto-Accept Mode: Auto-execute (bottom shows ⏵⏵ accept edits on)
- Plan Mode: Read-only (bottom shows ⏸ plan mode on)
```

## Project Configuration

Create a `CLAUDE.md` file in your project root, and Claude will load it automatically:

```markdown
# Project Description

## Tech Stack
- React 18
- TypeScript 5
- Vite

## Common Commands
- Development: `npm run dev`
- Testing: `npm test`
- Build: `npm run build`
```

You can also configure permissions in `.claude/settings.json`:

```json
{
  "permissionMode": "custom",
  "allowedPaths": ["src/**", "tests/**"],
  "blockedPaths": [".env", "secrets/**"],
  "allowedCommands": ["npm test", "npm run build"]
}
```

## Amazon Bedrock Configuration

If using AWS Bedrock instead of the direct Anthropic API:

```bash
export AWS_ACCESS_KEY_ID='your-access-key'
export AWS_SECRET_ACCESS_KEY='your-secret-key'
export AWS_REGION='us-east-1'

claude config set provider bedrock
```

## FAQ

**Invalid API Key**:
```bash
echo $ANTHROPIC_API_KEY    # Check if set
claude config set apiKey sk-ant-...  # Re-set
```

**Command not found**:
```bash
which claude              # Check installation path
npm install -g @anthropic-ai/claude-code  # Re-install
```

**Network connection issues**:
```bash
export HTTPS_PROXY=http://proxy:8080  # Use proxy
```

## Next Steps

- [First Conversation](/docs/claude-code/guide/first-conversation)
- [Getting Started](/docs/claude-code/getting-started/)
- [CLI Reference](/docs/claude-code/reference/cli)
