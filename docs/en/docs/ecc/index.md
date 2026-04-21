---
title: Everything Claude Code
---

# Everything Claude Code

> **140K+ stars** | **21K+ forks** | **170+ contributors** | **Anthropic Hackathon Winner**

Everything Claude Code (ECC) is an AI Agent performance optimization system, built by an Anthropic hackathon champion. It's not just a set of configuration files, but a complete system: skills, instincts, memory optimization, continuous learning, security scanning, and a research-first development methodology.

**48 Agents | 183 Skills | 79 Legacy Commands | Hooks | Rules | MCP Configs**

Compatible with **Claude Code**, **Cursor**, **Codex**, **OpenCode**, **Gemini**, and other AI Agent frameworks.

## Core Features

- **Agents (Subagents)**: 36+ specialized subagents for delegated tasks like code review, security analysis, build fixes, E2E testing, and more
- **Skills**: 183 workflow definitions and domain knowledge covering frontend, backend, testing, security, deployment, etc.
- **Commands**: 79 Legacy slash command compatibility layer, such as `/tdd`, `/plan`, `/code-review`
- **Hooks**: Event-based automation triggers for auto-formatting, security detection, memory persistence
- **Rules**: Cross-language always-follow guidelines, organized by language directory
- **MCP Configuration**: Pre-configured MCP servers (GitHub, Supabase, Vercel, etc.)

## Quick Start

### Option 1: Plugin Installation (Recommended)

```bash
# Add marketplace
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# Install plugin
/plugin install everything-claude-code@everything-claude-code
```

### Option 2: Manual Installation

```bash
# Clone the repository
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# Install dependencies
npm install

# macOS/Linux - Full installation
./install.sh --profile full

# Or install by language
./install.sh typescript
./install.sh typescript python golang swift php

# Windows PowerShell
.\install.ps1 --profile full
```

### Install Rules (Required)

Claude Code's plugin system doesn't support automatic distribution of `rules`; they need to be installed manually:

```bash
# User-level (applies to all projects)
mkdir -p ~/.claude/rules
cp -r everything-claude-code/rules/common ~/.claude/rules/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/  # Choose as needed

# Project-level (applies to current project only)
mkdir -p .claude/rules
cp -r everything-claude-code/rules/common .claude/rules/
```

## Common Workflows

### Starting a New Feature

```
/ecc:plan "Add user authentication with OAuth"
→ planner creates implementation blueprint
/tdd → tdd-guide enforces test-first approach
/code-review → code-reviewer checks your code
```

### Fixing a Bug

```
/tdd → tdd-guide: Write a failing test that reproduces the bug
→ Implement the fix, verify test passes
/code-review → code-reviewer: Catch regression issues
```

### Preparing for Launch

```
/security-scan → security-reviewer: OWASP Top 10 audit
/e2e → e2e-runner: Critical user flow testing
/test-coverage → Verify 80%+ coverage
```

## Dashboard GUI

Launch the desktop dashboard to visually browse ECC components:

```bash
npm run dashboard
# or
python3 ./ecc_dashboard.py
```

Features: Tabbed interface (Agents, Skills, Commands, Rules, Settings), dark/light theme toggle, font customization, search filtering.

## Related Links

- **GitHub Repository**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **npm Package**: [ecc-universal](https://www.npmjs.com/package/ecc-universal)
- **Shorthand Guide**: [Quick Start Guide](https://x.com/affaanmustafa/status/2012378465664745795)
- **Longform Guide**: [In-depth Guide](https://x.com/affaanmustafa/status/2014040193557471352)
- **License**: MIT
