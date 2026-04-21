---
title: "Configuration Reference"
---

# Configuration Reference

Claude Code provides a flexible configuration system that allows you to customize CLI behavior, model parameters, tool integration, and more. This guide details all available configuration options.

## Configuration File Locations

### Default Locations

```bash
# macOS/Linux
~/.config/claude/config.json

# Windows
%APPDATA%\claude\config.json

# Project-level configuration
./claude.config.json
./.clauderc
```

### Custom Locations

```bash
# Using environment variables
export CLAUDE_CONFIG_PATH=/path/to/config.json

# Using command line arguments
claude --config /path/to/config.json chat
```

## Configuration File Structure

### Basic Configuration Example

```json
{
  "api": {
    "key": "your-api-key",
    "baseUrl": "https://api.anthropic.com",
    "version": "2023-06-01"
  },
  "model": {
    "default": "claude-sonnet-4",
    "maxTokens": 4096,
    "temperature": 0.7,
    "topP": 0.9,
    "topK": 40
  },
  "behavior": {
    "stream": true,
    "autoSave": true,
    "confirmActions": true
  },
  "ui": {
    "theme": "dark",
    "colorOutput": true,
    "showTokenCount": true
  }
}
```

## API Configuration

### Authentication Settings

```json
{
  "api": {
    "key": "sk-ant-...",
    "keySource": "env",
    "keyEnvVar": "ANTHROPIC_API_KEY"
  }
}
```

**Option descriptions:**

- `key` - API key (not recommended to store directly)
- `keySource` - Key source (`env`/`file`/`keychain`)
- `keyEnvVar` - Environment variable name
- `keyFile` - Key file path

### Endpoint Configuration

```json
{
  "api": {
    "baseUrl": "https://api.anthropic.com",
    "timeout": 60000,
    "retries": 3,
    "retryDelay": 1000
  }
}
```

**Option descriptions:**

- `baseUrl` - API base URL
- `timeout` - Request timeout (milliseconds)
- `retries` - Failure retry count
- `retryDelay` - Retry delay (milliseconds)

### Proxy Settings

```json
{
  "api": {
    "proxy": {
      "enabled": true,
      "host": "proxy.example.com",
      "port": 8080,
      "auth": {
        "username": "user",
        "password": "pass"
      }
    }
  }
}
```

## Model Configuration

### Default Model Settings

```json
{
  "model": {
    "default": "claude-sonnet-4",
    "fallback": "claude-haiku-4",
    "maxTokens": 4096,
    "temperature": 0.7
  }
}
```

**Available models:**

- `claude-opus-4` - Most powerful model
- `claude-sonnet-4` - Balanced performance and cost
- `claude-haiku-4` - Fast response

### Sampling Parameters

```json
{
  "model": {
    "temperature": 0.7,
    "topP": 0.9,
    "topK": 40,
    "stopSequences": ["\n\n", "```"]
  }
}
```

**Parameter descriptions:**

- `temperature` - Controls randomness (0.0-1.0)
- `topP` - Nucleus sampling threshold
- `topK` - Number of highest probability tokens to consider
- `stopSequences` - Sequences that stop generation

### Model Aliases

```json
{
  "model": {
    "aliases": {
      "fast": "claude-haiku-4",
      "smart": "claude-opus-4",
      "balanced": "claude-sonnet-4"
    }
  }
}
```

Using aliases:

```bash
claude chat --model fast
claude ask "question" --model smart
```

## Behavior Configuration

### Output Control

```json
{
  "behavior": {
    "stream": true,
    "bufferSize": 1024,
    "flushInterval": 100
  }
}
```

**Option descriptions:**

- `stream` - Enable streaming output
- `bufferSize` - Output buffer size
- `flushInterval` - Flush interval (milliseconds)

### Auto Save

```json
{
  "behavior": {
    "autoSave": true,
    "saveInterval": 300,
    "savePath": "~/.claude/sessions",
    "maxSessions": 50
  }
}
```

### Confirmation Prompts

```json
{
  "behavior": {
    "confirmActions": true,
    "confirmThreshold": "high",
    "dangerousActions": [
      "delete",
      "overwrite",
      "execute"
    ]
  }
}
```

**Confirmation levels:**

- `none` - No confirmation
- `low` - Only dangerous operations
- `medium` - Important operations
- `high` - All modification operations

## Context Configuration

### File Inclusion Rules

```json
{
  "context": {
    "include": [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx"
    ],
    "exclude": [
      "**/node_modules/**",
      "**/dist/**",
      "**/.git/**"
    ],
    "maxFileSize": 1048576,
    "maxFiles": 100
  }
}
```

### Auto Context

```json
{
  "context": {
    "auto": true,
    "depth": 2,
    "followImports": true,
    "includeTests": false
  }
}
```

**Option descriptions:**

- `auto` - Automatically detect relevant files
- `depth` - Dependency depth
- `followImports` - Follow imports
- `includeTests` - Include test files

### Context Cache

```json
{
  "context": {
    "cache": {
      "enabled": true,
      "ttl": 3600,
      "maxSize": 104857600
    }
  }
}
```

## UI Configuration

### Theme Settings

```json
{
  "ui": {
    "theme": "dark",
    "colorScheme": "monokai",
    "customColors": {
      "primary": "#00ff00",
      "error": "#ff0000",
      "warning": "#ffff00"
    }
  }
}
```

**Built-in themes:**

- `dark` - Dark theme
- `light` - Light theme
- `auto` - Follow system

### Display Options

```json
{
  "ui": {
    "showTokenCount": true,
    "showTimestamp": true,
    "showModelInfo": true,
    "compactMode": false,
    "lineNumbers": true
  }
}
```

### Editor Integration

```json
{
  "ui": {
    "editor": "code",
    "editorArgs": ["-w"],
    "diffTool": "code --diff"
  }
}
```

**Supported editors:**

- `code` - VS Code
- `vim` - Vim
- `nano` - Nano
- `emacs` - Emacs

## Tool Configuration

### Git Integration

```json
{
  "tools": {
    "git": {
      "enabled": true,
      "autoCommit": false,
      "commitTemplate": "feat: {description}",
      "branchPrefix": "claude/"
    }
  }
}
```

### Test Framework

```json
{
  "tools": {
    "testing": {
      "framework": "jest",
      "autoRun": true,
      "coverage": true,
      "watchMode": false
    }
  }
}
```

### Code Formatting

```json
{
  "tools": {
    "formatting": {
      "enabled": true,
      "formatter": "prettier",
      "formatOnSave": true,
      "config": ".prettierrc"
    }
  }
}
```

## Plugin Configuration

### Plugin Management

```json
{
  "plugins": {
    "enabled": true,
    "autoUpdate": false,
    "registry": "https://plugins.claude.ai",
    "installed": [
      "@claude/git-tools",
      "@claude/docker-tools"
    ]
  }
}
```

### Plugin Settings

```json
{
  "plugins": {
    "settings": {
      "@claude/git-tools": {
        "autoStage": true,
        "signCommits": true
      },
      "@claude/docker-tools": {
        "defaultRegistry": "docker.io"
      }
    }
  }
}
```

## Logging Configuration

### Log Levels

```json
{
  "logging": {
    "level": "info",
    "file": "~/.claude/logs/claude.log",
    "maxSize": 10485760,
    "maxFiles": 5,
    "compress": true
  }
}
```

**Log levels:**

- `error` - Errors only
- `warn` - Warnings and errors
- `info` - Info, warnings, and errors
- `debug` - All logs
- `trace` - Detailed tracing

### Log Format

```json
{
  "logging": {
    "format": "json",
    "timestamp": true,
    "colorize": true,
    "prettyPrint": false
  }
}
```

## Performance Configuration

### Cache Settings

```json
{
  "performance": {
    "cache": {
      "enabled": true,
      "type": "memory",
      "maxSize": 104857600,
      "ttl": 3600
    }
  }
}
```

**Cache types:**

- `memory` - Memory cache
- `disk` - Disk cache
- `redis` - Redis cache

### Concurrency Control

```json
{
  "performance": {
    "concurrency": {
      "maxParallel": 5,
      "queueSize": 100,
      "timeout": 30000
    }
  }
}
```

### Resource Limits

```json
{
  "performance": {
    "limits": {
      "maxMemory": 536870912,
      "maxCpu": 80,
      "maxDiskSpace": 1073741824
    }
  }
}
```

## Security Configuration

### Access Control

```json
{
  "security": {
    "allowedPaths": [
      "/home/user/projects",
      "/opt/workspace"
    ],
    "deniedPaths": [
      "/etc",
      "/root"
    ],
    "readOnly": false
  }
}
```

### Sensitive Data Filtering

```json
{
  "security": {
    "filters": {
      "enabled": true,
      "patterns": [
        "password",
        "api_key",
        "secret",
        "token"
      ],
      "redact": true
    }
  }
}
```

### Audit Log

```json
{
  "security": {
    "audit": {
      "enabled": true,
      "logFile": "~/.claude/audit.log",
      "logActions": [
        "file_write",
        "file_delete",
        "command_execute"
      ]
    }
  }
}
```

## Project Configuration

### Project-Level Settings

```json
{
  "project": {
    "name": "my-app",
    "type": "typescript",
    "rootDir": "./src",
    "buildDir": "./dist",
    "testDir": "./tests"
  }
}
```

### Project Templates

```json
{
  "project": {
    "templates": {
      "component": "./templates/component.tsx",
      "test": "./templates/test.spec.ts",
      "api": "./templates/api.ts"
    }
  }
}
```

## Configuration Management Commands

### View Configuration

```bash
# View all configuration
claude config list

# View specific configuration
claude config get model.default

# Output in JSON format
claude config list --json
```

### Modify Configuration

```bash
# Set a single value
claude config set model.default claude-opus-4

# Set nested value
claude config set api.proxy.host proxy.example.com

# Import from file
claude config import ./config.json
```

### Reset Configuration

```bash
# Reset all configuration
claude config reset

# Reset specific section
claude config reset model

# Restore defaults
claude config restore-defaults
```

## Configuration Validation

### Validate Configuration File

```bash
# Validate configuration
claude config validate

# Verbose validation
claude config validate --verbose

# Fix configuration
claude config fix
```

### Configuration Schema

```json
{
  "$schema": "https://claude.ai/schemas/config.json",
  "version": "1.0.0"
}
```

## Environment-Specific Configuration

### Multi-Environment Configuration

```json
{
  "environments": {
    "development": {
      "model": {
        "default": "claude-haiku-4"
      },
      "logging": {
        "level": "debug"
      }
    },
    "production": {
      "model": {
        "default": "claude-sonnet-4"
      },
      "logging": {
        "level": "error"
      }
    }
  }
}
```

Using environments:

```bash
export CLAUDE_ENV=development
claude chat

# Or
claude --env production chat
```

## Configuration Inheritance

### Configuration Hierarchy

1. Default configuration (built-in)
2. Global configuration (`~/.config/claude/config.json`)
3. Project configuration (`./claude.config.json`)
4. Environment variables
5. Command line arguments

### Merge Strategy

```json
{
  "merge": {
    "strategy": "deep",
    "arrayMerge": "replace",
    "overrideArrays": false
  }
}
```

## Configuration Best Practices

1. **Don't store keys**: Use environment variables or key managers
2. **Use project configuration**: Customize settings for each project
3. **Version control**: Include project configuration in version control
4. **Document**: Add comments for custom configurations
5. **Validate configuration**: Regularly validate configuration files
6. **Backup configuration**: Regularly backup important configurations
7. **Use templates**: Create configuration templates for common scenarios

## Configuration Examples

### TypeScript Project Configuration

```json
{
  "project": {
    "type": "typescript",
    "rootDir": "./src"
  },
  "context": {
    "include": ["**/*.ts", "**/*.tsx"],
    "exclude": ["**/node_modules/**", "**/dist/**"]
  },
  "tools": {
    "formatting": {
      "formatter": "prettier",
      "config": ".prettierrc"
    },
    "testing": {
      "framework": "jest"
    }
  }
}
```

### Python Project Configuration

```json
{
  "project": {
    "type": "python",
    "rootDir": "./src"
  },
  "context": {
    "include": ["**/*.py"],
    "exclude": ["**/__pycache__/**", "**/venv/**"]
  },
  "tools": {
    "formatting": {
      "formatter": "black"
    },
    "testing": {
      "framework": "pytest"
    }
  }
}
```

## Troubleshooting

### Configuration Loading Failure

```bash
# Check configuration file syntax
claude config validate

# View loaded configuration
claude config list --verbose

# Use default configuration
claude --no-config chat
```

### Permission Issues

```bash
# Check file permissions
ls -la ~/.config/claude/config.json

# Fix permissions
chmod 600 ~/.config/claude/config.json
```

### Configuration Conflicts

```bash
# View configuration sources
claude config list --show-source

# Clear cache
claude config clear-cache
```
