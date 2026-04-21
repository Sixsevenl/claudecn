---
title: "Statusline"
---

# Statusline

Claude Code's statusline is displayed at the bottom of the terminal, providing real-time status information for the current session and quick operation hints.

## Statusline Layout

```
[Mode] [Model] [Cost] [Shortcut Hints]
```

### Example

```
⏸ plan mode on | claude-sonnet-4-6 | $0.05 | Shift+Tab: Switch mode
```

## Permission Mode Indicators

The left side of the statusline shows the current permission mode:

### Normal Mode (Default)

```
[No special indicator]
```

- Each operation requires confirmation
- Default mode, most secure
- Suitable for important operations and uncertain tasks

### Auto-Accept Mode

```
⏵⏵ accept edits on
```

- Automatically accepts all edit operations
- Press `Shift+Tab` once to enter
- Suitable for quick iteration and trusted tasks
- Still asks for dangerous operations (e.g., delete files, git push)

### Plan Mode

```
⏸ plan mode on
```

- Read-only mode, Claude only creates plans without executing
- Press `Shift+Tab` twice to enter
- Suitable for complex tasks, review plan before executing
- Safely explore large refactoring or uncertain tasks

## Mode Switching

### Shift+Tab Shortcut

Press `Shift+Tab` to cycle through three permission modes:

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode
```

**Use cases**:

1. **Normal → Auto-Accept**: Quick development without confirming each time
2. **Auto-Accept → Plan**: Pause execution, view plan first
3. **Plan → Normal**: Review complete, start executing

### Command Line Startup

```bash
# Start with Auto-Accept mode
claude --permission-mode auto

# Start with Normal mode (default)
claude --permission-mode ask

# Start with custom mode
claude --permission-mode custom
```

## Model Information

The middle of the statusline shows the current model in use:

### Model Identifiers

```
claude-opus-4-6      # Opus 4.6 - Most powerful
claude-sonnet-4-6    # Sonnet 4.6 - Default, balanced
claude-haiku-4-5-20251001  # Haiku 4.5 - Fastest
```

### Switching Models

Use the `/model` command to switch:

```bash
/model opus    # Switch to Opus 4.6
/model sonnet  # Switch to Sonnet 4.6
/model haiku   # Switch to Haiku 4.5
```

### Fast Mode

```bash
/fast          # Uses the same Opus 4.6 but with faster output
```

**Note**: `/fast` does not switch to a different model, it uses the same Opus 4.6 model but with faster output.

## Cost Display

The statusline shows the current session's API usage cost:

```
$0.05          # Current session total cost
```

### View Detailed Cost

Use the `/cost` command to view detailed information:

```bash
/cost
```

Displays:
- Input tokens
- Output tokens
- Cache hit information
- Total cost (USD)

## Shortcut Hints

The right side of the statusline shows common shortcuts:

```
Shift+Tab: Switch mode
```

### Other Shortcuts

Although not displayed in the statusline, these shortcuts are also useful:

- `Ctrl+C` - Interrupt current operation
- `Ctrl+D` - Exit Claude Code
- `↑/↓` - Browse command history

## Configuring the Statusline

### Custom Display

Configure in `.claude/settings.json`:

```json
{
  "statusline": {
    "enabled": true,
    "showModel": true,
    "showCost": true,
    "showMode": true,
    "position": "bottom",
    "format": "[{mode}] {model} | ${cost} | {hints}"
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Whether to show statusline |
| `showModel` | boolean | `true` | Show model info |
| `showCost` | boolean | `true` | Show cost info |
| `showMode` | boolean | `true` | Show permission mode |
| `position` | string | `bottom` | Position (top/bottom) |
| `format` | string | Custom | Custom format |

### Format Variables

Available format variables:

- `{mode}` - Permission mode indicator
- `{model}` - Current model
- `{cost}` - Current cost
- `{hints}` - Shortcut hints
- `{tokens}` - Token usage
- `{time}` - Session duration

### Example Configurations

**Minimal statusline**:

```json
{
  "statusline": {
    "format": "{mode} | {model}"
  }
}
```

**Detailed statusline**:

```json
{
  "statusline": {
    "format": "[{mode}] {model} | ${cost} | {tokens} tokens | {time} | {hints}"
  }
}
```

## Statusline Colors

### Theme Configuration

```json
{
  "statusline": {
    "theme": {
      "normalMode": "green",
      "autoAcceptMode": "yellow",
      "planMode": "blue",
      "background": "black",
      "foreground": "white"
    }
  }
}
```

### Available Colors

- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- Or use RGB values: `"#00ff00"`

## Practical Tips

### 1. Quick Switch to Auto-Accept

Suitable for quick iteration:

```
Press Shift+Tab once → Bottom shows ⏵⏵ accept edits on
```

### 2. Use Plan Mode for Complex Tasks

Suitable for large refactoring:

```
Press Shift+Tab twice → Bottom shows ⏸ plan mode on
Claude creates detailed plan but doesn't execute
Review plan, then press Shift+Tab to return to Normal Mode to execute
```

### 3. Monitor Cost

Check API usage at any time:

```
Statusline shows real-time cost
Use /cost to view detailed information
```

### 4. Quick Model Switching

Choose model based on task complexity:

```
/model haiku   # Simple tasks, fast response
/model sonnet  # Balanced tasks, default choice
/model opus    # Complex tasks, most powerful
```

### 5. Use Fast Mode

When you need fast output:

```
/fast          # Uses the same Opus 4.6 but with faster output
```

## Troubleshooting

### Statusline Not Displaying

Check configuration:

```bash
# View configuration
cat ~/.config/claude/config.json

# Ensure statusline.enabled is true
```

### Statusline Display Errors

Reset configuration:

```bash
# Delete configuration file
rm ~/.config/claude/config.json

# Restart Claude Code
claude
```

### Color Display Issues

Check terminal support:

```bash
# Check terminal color support
echo $TERM

# Should display xterm-256color or similar
```

## Best Practices

1. **Watch the mode indicator** - Always be aware of which permission mode you're in
2. **Monitor costs** - Regularly check costs to avoid unexpected overcharges
3. **Use Auto-Accept wisely** - Only use for trusted tasks
4. **Leverage Plan Mode** - Create plans first for complex tasks
5. **Choose the right model** - Select model based on task complexity

## Related Commands

- `/help` - View help
- `/model` - Switch model
- `/cost` - View cost
- `/fast` - Fast mode
- `/clear` - Clear history
- `/quit` - Exit

## References

- [CLI Reference](/docs/claude-code/reference/cli) - Complete CLI command reference
- [Configuration Reference](/docs/claude-code/reference/config) - Detailed configuration options
- [CLI Reference](/docs/claude-code/reference/cli) - Common commands and shortcuts
