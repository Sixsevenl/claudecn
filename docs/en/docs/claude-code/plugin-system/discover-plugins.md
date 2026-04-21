---
title: "Discover & Install Plugins"
---

# Discover & Install Plugins

Search and install Claude Code plugins. This article provides complete code examples and terminal operation demonstrations.

## Quick Start

Start Claude Code in the terminal:

```bash
claude

You: Help me implement searching and installing Claude Code plugins

Claude: Sure, let me check the project structure first...

Claude wants to:
  - Read file: src/main.py
Allow? [y/n/always/never]

You: y

Claude: Let me implement this feature for you...
```

Press **Shift+Tab** to switch permission modes:

```bash
# Normal Mode -> Auto-Accept Mode -> Plan Mode

# Auto-Accept: Auto execute (bottom bar shows accept edits on)
You: Quick implementation
Claude: [Auto executes, no confirmation needed]

# Plan Mode: Read-only (bottom bar shows plan mode on)
You: Make a plan first
Claude: [Only makes a plan, does not execute]
```

## Core Concepts

```bash
You: Explain the core concepts of discovering and installing plugins

Claude: The core concepts of searching and installing Claude Code plugins include...
```

```python
from anthropic import Anthropic

client = Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Search and install Claude Code plugins"}]
)
print(response.content[0].text)
```

## Implementation Steps

### 1. Environment Setup

```bash
# Install dependencies
pip install anthropic

# Configure API Key
export ANTHROPIC_API_KEY="your-api-key"
```

### 2. Core Implementation

```bash
You: Help me implement the core discover and install plugins functionality

Claude: Sure, let me create the implementation file...

Claude wants to:
  - Write file: src/discover_plugins.py
Allow? [y/n/always/never]

You: y

Claude: File created.
```

```python
# Discover & Install Plugins core implementation
from anthropic import Anthropic

client = Anthropic()

def process(query: str) -> str:
    """Process user request"""
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        messages=[{"role": "user", "content": query}]
    )
    return response.content[0].text

if __name__ == "__main__":
    result = process("Search and install Claude Code plugins")
    print(result)
```

### 3. Test Verification

```bash
You: Run tests to verify the implementation

Claude: Sure, let me run the tests...

Claude wants to:
  - Run command: python -m pytest tests/
Allow? [y/n/always/never]

You: y

Claude: All tests passed
```

## Advanced Usage

```python
# Using streaming output
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    messages=[{"role": "user", "content": "Search and install Claude Code plugins"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

```bash
# Using tool calls
tools = [{
    "name": "process",
    "description": "Search and install Claude Code plugins",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string"}
        },
        "required": ["query"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Search and install Claude Code plugins"}]
)
```

## Performance Optimization

```python
# Use Prompt Caching to reduce costs
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": "You are an expert in searching and installing Claude Code plugins...",
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...]
)
```

```bash
# Check costs
/cost

# Switch to a faster model
/model haiku

# Use fast mode
/fast
```

## Error Handling

```python
from anthropic import APIError, APITimeoutError

try:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": "request"}]
    )
except APITimeoutError:
    print("Request timed out, please retry")
except APIError as e:
    print(f"API error: {e.status_code} - {e.message}")
```

## Best Practices

1. **Clear task descriptions** - Tell Claude specifically what to do
2. **Provide context** - Use CLAUDE.md or provide related code directly
3. **Verify step by step** - Verify results after each step
4. **Use Plan Mode** - Plan first for complex tasks
5. **Monitor costs** - Use `/cost` to check API usage
6. **Choose models wisely** - Use Haiku for simple tasks, Opus for complex tasks

## Permission Mode Reference

| Mode | Shortcut | Bottom Bar | Behavior |
|------|----------|------------|----------|
| Normal | Default | No indicator | Confirm each operation |
| Auto-Accept | Shift+Tab x1 | accept edits on | Auto execute edits |
| Plan | Shift+Tab x2 | plan mode on | Only make plans |

## Common Commands Reference

```bash
/help          # View help
/clear         # Clear history
/model opus    # Switch to Opus 4.6
/model sonnet  # Switch to Sonnet 4.6
/model haiku   # Switch to Haiku 4.5
/cost          # Check costs
/fast          # Fast mode
/quit          # Exit
```

## Related Resources

- [Claude Code Quick Start](/docs/claude-code/getting-started/)
- [Basic Usage](/docs/claude-code/getting-started/)
- [Cheatsheet](/docs/claude-code/reference/cli)
