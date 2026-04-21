---
title: "Amazon Bedrock"
---

# Amazon Bedrock

Using Claude through Amazon Bedrock. This guide provides complete code examples and terminal operation demonstrations.

## Quick Start

Launch Claude Code in the terminal:

```bash
claude

You: Help me implement using Claude through Amazon Bedrock

Claude: Sure, let me first look at the project structure...

Claude wants to:
  • Read file: src/main.py
Allow? [y/n/always/never]

You: y

Claude: Let me implement this for you...
```

Press **Shift+Tab** to switch permission modes:

```bash
# Normal Mode → Auto-Accept Mode → Plan Mode

# Auto-Accept: Auto-execute (bottom shows ⏵⏵ accept edits on)
You: Quick implementation
Claude: [Auto-executes without confirmation]

# Plan Mode: Read-only (bottom shows ⏸ plan mode on)
You: Create plan first
Claude: [Only creates plan, doesn't execute]
```

## Basic Concepts

```bash
You: Explain the core concepts of Amazon Bedrock

Claude: The core concepts of using Claude through Amazon Bedrock include...
```

```python
from anthropic import Anthropic

client = Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Using Claude through Amazon Bedrock"}]
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
You: Help me implement the core functionality of Amazon Bedrock

Claude: Sure, let me create the implementation file...

Claude wants to:
  • Write file: src/amazon_bedrock.py
Allow? [y/n/always/never]

You: y

Claude: File created.
```

```python
# Amazon Bedrock core implementation
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
    result = process("Using Claude through Amazon Bedrock")
    print(result)
```

### 3. Test Verification

```bash
You: Run tests to verify the implementation

Claude: Sure, let me run the tests...

Claude wants to:
  • Run command: python -m pytest tests/
Allow? [y/n/always/never]

You: y

Claude: All tests passed ✅
```

## Advanced Usage

```python
# Using streaming output
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    messages=[{"role": "user", "content": "Using Claude through Amazon Bedrock"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

```bash
# Using tool calling
tools = [{
    "name": "process",
    "description": "Using Claude through Amazon Bedrock",
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
    messages=[{"role": "user", "content": "Using Claude through Amazon Bedrock"}]
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
        "text": "You are an expert at using Claude through Amazon Bedrock...",
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...]
)
```

```bash
# View costs
/cost

# Switch to faster model
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

1. **Clear task descriptions** - Tell Claude exactly what to do
2. **Provide context** - Use CLAUDE.md or directly provide relevant code
3. **Verify step by step** - Verify results after each step
4. **Use Plan Mode** - Create plans first for complex tasks
5. **Monitor costs** - Use `/cost` to view API usage
6. **Choose models wisely** - Use Haiku for simple tasks, Opus for complex tasks

## Permission Mode Quick Reference

| Mode | Shortcut | Bottom Display | Behavior |
|------|----------|----------------|----------|
| Normal | Default | No indicator | Each operation requires confirmation |
| Auto-Accept | Shift+Tab ×1 | ⏵⏵ accept edits on | Auto-execute edits |
| Plan | Shift+Tab ×2 | ⏸ plan mode on | Only create plans |

## Common Commands Quick Reference

```bash
/help          # View help
/clear         # Clear history
/model opus    # Switch to Opus 4.6
/model sonnet  # Switch to Sonnet 4.6
/model haiku   # Switch to Haiku 4.5
/cost          # View cost
/fast          # Fast mode
/quit          # Exit
```

## Related Resources

- [Claude Code Quick Start](/docs/claude-code/getting-started/)
- [Basic Usage](/docs/claude-code/getting-started/)
- [Cheat Sheet](/docs/claude-code/reference/cli)
