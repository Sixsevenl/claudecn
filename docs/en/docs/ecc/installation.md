---
title: Installation Guide
---

# Installation Guide

ECC offers multiple installation methods, from the simplest plugin installation to full manual control.

## System Requirements

- **Claude Code CLI**: v2.1.0 or higher
- **Node.js**: 18+
- **Operating System**: macOS, Linux, Windows

Check your Claude Code version:

```bash
claude --version
```

## Option 1: Plugin Installation (Recommended)

The simplest method, one command and you're done:

```bash
# Add marketplace
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# Install plugin
/plugin install everything-claude-code@everything-claude-code
```

Or manually add to `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "ecc": {
      "source": {
        "source": "github",
        "repo": "affaan-m/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "everything-claude-code@everything-claude-code": true
  }
}
```

After installation, all commands, agents, skills, and hooks are available.

### Install Rules (Required)

::: warning Important
Claude Code's plugin system does not support automatic distribution of `rules`; they must be installed manually.
:::

```bash
# Clone the repository
git clone https://github.com/affaan-m/everything-claude-code.git

# User-level (applies to all projects)
mkdir -p ~/.claude/rules
cp -r everything-claude-code/rules/common ~/.claude/rules/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/  # Choose as needed
cp -r everything-claude-code/rules/python ~/.claude/rules/
cp -r everything-claude-code/rules/golang ~/.claude/rules/

# Project-level (applies to current project only)
mkdir -p .claude/rules
cp -r everything-claude-code/rules/common .claude/rules/
```

## Option 2: Manual Installation

For users who want precise control over what gets installed.

### Full Installation

```bash
# Clone the repository
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# Install dependencies
npm install  # or: pnpm install | yarn install | bun install

# macOS/Linux
./install.sh --profile full

# Windows PowerShell
.\install.ps1 --profile full
```

### Install by Language

```bash
# Install only specific language support
./install.sh typescript
./install.sh typescript python golang swift php

# Specify target IDE
./install.sh --target cursor typescript
./install.sh --target antigravity typescript
./install.sh --target gemini --profile full
```

### Component-by-Component Installation

```bash
# Install only agents
cp everything-claude-code/agents/*.md ~/.claude/agents/

# Install only rules
mkdir -p ~/.claude/rules/
cp -r everything-claude-code/rules/common ~/.claude/rules/

# Install only skills
cp -r everything-claude-code/.agents/skills/* ~/.claude/skills/

# Install only commands
mkdir -p ~/.claude/commands
cp everything-claude-code/commands/*.md ~/.claude/commands/
```

## Installing Hooks

::: warning
Do not directly copy the repository's `hooks/hooks.json` to `~/.claude/settings.json`. Use the installer.
:::

```bash
# macOS / Linux
bash ./install.sh --target claude --modules hooks-runtime

# Windows PowerShell
pwsh -File .\install.ps1 --target claude --modules hooks-runtime
```

## Configure MCP Servers

Copy the MCP server definitions you need from `mcp-configs/mcp-servers.json` to `~/.claude/settings.json` or project-level `.mcp.json`.

If you already have your own MCP configuration, set environment variables to skip duplicates:

```bash
export ECC_DISABLED_MCPS="github,context7,exa,playwright,sequential-thinking,memory"
```

::: warning
Remember to replace `YOUR_*_HERE` placeholders with actual API keys.
:::

## Package Manager Detection

ECC auto-detects your package manager with the following priority:

1. Environment variable `CLAUDE_PACKAGE_MANAGER`
2. Project config `.claude/package-manager.json`
3. `packageManager` field in `package.json`
4. Lock file detection (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb)
5. Global config `~/.claude/package-manager.json`
6. Fallback: First available package manager

Manual setup:

```bash
# Via environment variable
export CLAUDE_PACKAGE_MANAGER=pnpm

# Via global config
node scripts/setup-package-manager.js --global pnpm

# Via project config
node scripts/setup-package-manager.js --project bun

# Detect current setting
node scripts/setup-package-manager.js --detect
```

Or use the `/setup-pm` command.

## Verify Installation

```bash
# Check installed plugins
/plugin list everything-claude-code@everything-claude-code

# List installed components
ecc list-installed

# Run diagnostics
ecc doctor

# Fix issues
ecc repair
```

## Naming Reference

ECC has three public identifiers that are not interchangeable:

| Identifier | Purpose |
|------------|---------|
| `affaan-m/everything-claude-code` | GitHub source repository |
| `everything-claude-code@everything-claude-code` | Claude marketplace plugin identifier |
| `ecc-universal` | npm package name |
