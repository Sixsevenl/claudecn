---
title: "CLI Reference"
---

# CLI Reference

Claude Code provides a powerful command-line interface (CLI) that lets you interact with Claude directly from the terminal. This guide details all available CLI commands and options.

## Installation and Setup

### Install CLI

```bash
# Install globally with npm
npm install -g @anthropic-ai/claude-code

# Or with yarn
yarn global add @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Initialize Configuration

```bash
# Configure API key on first run
claude init

# Specify configuration file path
claude init --config ~/.claude/config.json
```

## Core Commands

### `claude chat`

Start an interactive conversation session.

```bash
# Basic usage
claude chat

# Specify model
claude chat --model claude-sonnet-4

# Use system prompt
claude chat --system "You are a Python expert"

# Load context from files
claude chat --context ./src/**/*.py
```

**Options:**

- `--model, -m <model>` - Specify model to use (default: claude-sonnet-4)
- `--system, -s <prompt>` - Set system prompt
- `--context, -c <pattern>` - Load files as context
- `--max-tokens <number>` - Set max output tokens
- `--temperature <number>` - Set temperature parameter (0.0-1.0)
- `--stream` - Enable streaming output (default on)
- `--no-stream` - Disable streaming output

### `claude ask`

Send a single query and get a response.

```bash
# Basic query
claude ask "How to read a JSON file in Python?"

# Include file context
claude ask "What's wrong with this code?" --file ./src/main.py

# Use pipe input
cat error.log | claude ask "Analyze this error log"

# Output to file
claude ask "Generate a React component" > Component.jsx
```

**Options:**

- `--file, -f <path>` - Include file content as context
- `--output, -o <path>` - Save response to file
- `--json` - Output response in JSON format
- `--quiet, -q` - Quiet mode, only output response content

### `claude code`

Work in codebase context.

```bash
# Start code session in current directory
claude code

# Specify project directory
claude code --project ./my-app

# Auto-analyze codebase
claude code --analyze

# Execute specific task
claude code --task "Refactor auth module"
```

**Options:**

- `--project, -p <path>` - Specify project root directory
- `--analyze` - Auto-analyze codebase structure
- `--task, -t <description>` - Execute specific task
- `--watch` - Watch file changes
- `--exclude <pattern>` - Exclude file patterns

### `claude review`

Code review functionality.

```bash
# Review a single file
claude review ./src/api.ts

# Review entire directory
claude review ./src --recursive

# Review Git changes
claude review --git-diff

# Generate review report
claude review ./src --output review-report.md
```

**Options:**

- `--recursive, -r` - Recursively review subdirectories
- `--git-diff` - Review uncommitted Git changes
- `--severity <level>` - Set report severity level (info/warning/error)
- `--format <type>` - Output format (text/json/markdown)

### `claude test`

Generate and run tests.

```bash
# Generate tests for a file
claude test generate ./src/utils.ts

# Run tests and analyze failures
claude test analyze

# Fix failed tests
claude test fix --file ./tests/api.test.ts
```

**Options:**

- `generate` - Generate test cases
- `analyze` - Analyze test results
- `fix` - Fix failed tests
- `--framework <name>` - Specify test framework (jest/vitest/mocha)

### `claude refactor`

Code refactoring tool.

```bash
# Refactor function
claude refactor --function calculateTotal --file ./src/cart.ts

# Extract component
claude refactor --extract-component UserProfile --file ./src/App.tsx

# Rename variable
claude refactor --rename oldName:newName --file ./src/index.ts
```

**Options:**

- `--function <name>` - Refactor specified function
- `--extract-component <name>` - Extract React component
- `--rename <old:new>` - Rename symbol
- `--dry-run` - Preview changes without applying

## Configuration Management

### `claude config`

Manage CLI configuration.

```bash
# View current configuration
claude config list

# Set configuration item
claude config set api_key YOUR_API_KEY
claude config set default_model claude-sonnet-4

# Get configuration item
claude config get api_key

# Delete configuration item
claude config unset api_key

# Reset all configuration
claude config reset
```

**Common configuration items:**

- `api_key` - Anthropic API key
- `default_model` - Default model to use
- `max_tokens` - Default max tokens
- `temperature` - Default temperature parameter
- `editor` - Preferred editor
- `theme` - CLI theme (light/dark)

### Configuration File Locations

```bash
# macOS/Linux
~/.config/claude/config.json

# Windows
%APPDATA%\claude\config.json

# Custom location
export CLAUDE_CONFIG_PATH=/path/to/config.json
```

## Advanced Features

### Using Prompt Templates

```bash
# Create prompt template
claude template create code-review

# Use template
claude ask --template code-review --file ./src/api.ts

# List all templates
claude template list

# Edit template
claude template edit code-review
```

### Session Management

```bash
# Save session
claude chat --save-session my-session

# Load session
claude chat --load-session my-session

# List all sessions
claude session list

# Delete session
claude session delete my-session

# Export session
claude session export my-session --output session.json
```

### Batch Processing Mode

```bash
# Read multiple queries from file
claude batch --input queries.txt

# Parallel processing
claude batch --input queries.txt --parallel 5

# Output to directory
claude batch --input queries.txt --output-dir ./results
```

## Environment Variables

```bash
# API key
export ANTHROPIC_API_KEY=your_api_key

# Custom configuration path
export CLAUDE_CONFIG_PATH=/path/to/config.json

# Default model
export CLAUDE_DEFAULT_MODEL=claude-sonnet-4

# Log level
export CLAUDE_LOG_LEVEL=debug

# Proxy settings
export HTTPS_PROXY=http://proxy.example.com:8080
```

## Output Formats

### JSON Output

```bash
# Get JSON format response
claude ask "What is a REST API?" --json

# Output example
{
  "id": "msg_123",
  "model": "claude-sonnet-4",
  "content": "REST API is...",
  "usage": {
    "input_tokens": 15,
    "output_tokens": 250
  }
}
```

### Markdown Output

```bash
# Generate Markdown documentation
claude ask "Create API documentation" --format markdown > API.md
```

## Debugging and Logging

### Enable Verbose Logging

```bash
# Debug mode
claude --debug chat

# Specify log level
claude --log-level debug ask "Test query"

# Save logs to file
claude --log-file ./claude.log chat
```

### View Request Details

```bash
# Show API request details
claude --verbose ask "Test"

# Output includes:
# - Request parameters
# - Response headers
# - Token usage
# - Response time
```

## Plugin System

### Install Plugins

```bash
# Install official plugin
claude plugin install @claude/git-tools

# Install community plugin
claude plugin install claude-plugin-docker

# Install from local
claude plugin install ./my-plugin
```

### Manage Plugins

```bash
# List installed plugins
claude plugin list

# Enable/disable plugins
claude plugin enable git-tools
claude plugin disable git-tools

# Update plugins
claude plugin update git-tools

# Uninstall plugins
claude plugin uninstall git-tools
```

## Practical Examples

### Code Generation Workflow

```bash
# 1. Analyze requirements
claude ask "I need a user authentication API" --save-context

# 2. Generate code
claude code --task "Implement JWT authentication" --output ./src/auth

# 3. Generate tests
claude test generate ./src/auth/*.ts

# 4. Review code
claude review ./src/auth --format markdown > review.md
```

### Git Integration Workflow

```bash
# 1. Review changes
claude review --git-diff

# 2. Generate commit message
git diff | claude ask "Generate commit message" --quiet

# 3. Code review
claude review --git-diff --severity error
```

### Documentation Generation

```bash
# Generate README
claude ask "Generate README for this project" \
  --context "./src/**/*.ts" \
  --output README.md

# Generate API documentation
claude ask "Generate API documentation" \
  --file ./src/api.ts \
  --format markdown \
  --output API.md
```

## Performance Optimization

### Caching Strategy

```bash
# Enable prompt caching
claude chat --cache-prompts

# Set cache TTL
claude config set cache_ttl 3600
```

### Concurrency Control

```bash
# Limit concurrent requests
claude batch --parallel 3 --input queries.txt

# Set request interval
claude batch --delay 1000 --input queries.txt
```

## Troubleshooting

### Common Issues

**API key error:**

```bash
# Verify API key
claude config get api_key

# Reset
claude config set api_key YOUR_NEW_KEY
```

**Network issues:**

```bash
# Use proxy
export HTTPS_PROXY=http://proxy.example.com:8080
claude chat

# Increase timeout
claude --timeout 60000 ask "query"
```

**Permission issues:**

```bash
# Check configuration file permissions
ls -la ~/.config/claude/

# Fix permissions
chmod 600 ~/.config/claude/config.json
```

## Best Practices

1. **Use configuration files**: Save common settings to configuration files
2. **Leverage templates**: Create prompt templates for repetitive tasks
3. **Session management**: Save important conversations for future reference
4. **Context optimization**: Only include relevant files to reduce token usage
5. **Batch processing**: Use batch mode for multiple similar tasks
6. **Version control**: Include generated code in version control
7. **Security**: Don't expose API keys directly in command line

## Update and Maintenance

```bash
# Check for updates
claude --version
npm outdated -g @anthropic-ai/claude-code

# Update to latest version
npm update -g @anthropic-ai/claude-code

# Clear cache
claude cache clear
```

## Getting Help

```bash
# View help
claude --help

# View specific command help
claude chat --help
claude ask --help

# View version info
claude --version

# View diagnostic info
claude doctor
```
