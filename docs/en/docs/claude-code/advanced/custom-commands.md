---
title: "Custom Commands"
---

# Custom Commands

Custom commands let you extend Claude Code's functionality and create dedicated commands that fit your team's workflow. With simple configuration, you can encapsulate complex operation sequences into a single command.

## What are Custom Commands

Custom commands are user-defined CLI commands that can:

- **Execute scripts**: Run shell scripts or programs
- **Compose tools**: Chain multiple tool calls together
- **Pass arguments**: Support dynamic arguments and options
- **Integrate external tools**: Connect to third-party services

Difference from Skills:
- **Skills**: AI-driven intelligent tasks, interpreted and executed by Claude
- **Custom Commands**: Deterministic script execution, directly running predefined logic

## Configuring Custom Commands

### Basic Configuration

Define commands in `.claude/config.json`:

```json
{
  "customCommands": {
    "deploy": {
      "description": "Deploy to production",
      "command": "./scripts/deploy.sh",
      "args": ["production"],
      "confirmBefore": true
    },
    "lint-fix": {
      "description": "Run linter and auto-fix",
      "command": "npm run lint -- --fix",
      "workingDir": "${projectRoot}"
    },
    "db-migrate": {
      "description": "Run database migrations",
      "command": "npm run migrate",
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

### Invoking Custom Commands

```bash
# Direct invocation
claude deploy

# With arguments
claude lint-fix --path src/

# Invoke from conversation
claude "Run deploy command"
```

## Command Configuration Details

### Full Configuration Options

```json
{
  "customCommands": {
    "command-name": {
      "description": "Command description",
      "command": "Command to execute",
      "args": ["default arguments"],
      "workingDir": "Working directory",
      "env": {
        "ENV_VAR": "value"
      },
      "confirmBefore": true,
      "timeout": 60000,
      "shell": "bash",
      "captureOutput": true,
      "onSuccess": "Command to run on success",
      "onFailure": "Command to run on failure",
      "aliases": ["alias1", "alias2"]
    }
  }
}
```

### Parameter Descriptions

- **description**: Command description, shown in help information
- **command**: Command or script path to execute
- **args**: Default arguments array
- **workingDir**: Execution directory, supports variable substitution
- **env**: Environment variables
- **confirmBefore**: Whether confirmation is needed before execution
- **timeout**: Timeout in milliseconds
- **shell**: Shell to use (bash/zsh/sh)
- **captureOutput**: Whether to capture output
- **onSuccess**: Callback command on success
- **onFailure**: Callback command on failure
- **aliases**: Command aliases

## Practical Command Examples

### 1. Deployment Commands

```json
{
  "customCommands": {
    "deploy-staging": {
      "description": "Deploy to staging environment",
      "command": "./scripts/deploy.sh",
      "args": ["staging"],
      "confirmBefore": true,
      "env": {
        "DEPLOY_ENV": "staging"
      },
      "onSuccess": "echo 'Deploy succeeded! Visit https://staging.example.com'",
      "onFailure": "echo 'Deploy failed, please check logs'"
    },
    "deploy-prod": {
      "description": "Deploy to production environment",
      "command": "./scripts/deploy.sh",
      "args": ["production"],
      "confirmBefore": true,
      "env": {
        "DEPLOY_ENV": "production"
      },
      "timeout": 300000
    }
  }
}
```

### 2. Test Commands

```json
{
  "customCommands": {
    "test-unit": {
      "description": "Run unit tests",
      "command": "npm test",
      "args": ["--", "--coverage"],
      "captureOutput": true
    },
    "test-e2e": {
      "description": "Run end-to-end tests",
      "command": "npm run test:e2e",
      "env": {
        "HEADLESS": "true"
      },
      "timeout": 120000
    },
    "test-watch": {
      "description": "Run tests in watch mode",
      "command": "npm test -- --watch",
      "captureOutput": false
    }
  }
}
```

### 3. Code Quality Commands

```json
{
  "customCommands": {
    "lint": {
      "description": "Run code checks",
      "command": "npm run lint",
      "captureOutput": true
    },
    "lint-fix": {
      "description": "Auto-fix code issues",
      "command": "npm run lint -- --fix"
    },
    "format": {
      "description": "Format code",
      "command": "npm run format"
    },
    "type-check": {
      "description": "TypeScript type checking",
      "command": "tsc --noEmit"
    }
  }
}
```

### 4. Database Commands

```json
{
  "customCommands": {
    "db-migrate": {
      "description": "Run database migrations",
      "command": "npm run migrate",
      "confirmBefore": true
    },
    "db-seed": {
      "description": "Seed test data",
      "command": "npm run seed",
      "env": {
        "NODE_ENV": "development"
      }
    },
    "db-reset": {
      "description": "Reset database",
      "command": "./scripts/db-reset.sh",
      "confirmBefore": true,
      "onSuccess": "npm run seed"
    }
  }
}
```

### 5. Build Commands

```json
{
  "customCommands": {
    "build": {
      "description": "Build project",
      "command": "npm run build",
      "timeout": 180000
    },
    "build-watch": {
      "description": "Build in watch mode",
      "command": "npm run build -- --watch",
      "captureOutput": false
    },
    "clean": {
      "description": "Clean build artifacts",
      "command": "rm -rf dist build .next"
    },
    "rebuild": {
      "description": "Clean and rebuild",
      "command": "npm run clean && npm run build"
    }
  }
}
```

### 6. Git Workflow Commands

```json
{
  "customCommands": {
    "sync": {
      "description": "Sync with main branch",
      "command": "git fetch origin && git rebase origin/main"
    },
    "pr-create": {
      "description": "Create Pull Request",
      "command": "gh pr create --web"
    },
    "pr-check": {
      "description": "Check PR status",
      "command": "gh pr checks"
    },
    "release": {
      "description": "Create release",
      "command": "./scripts/release.sh",
      "confirmBefore": true
    }
  }
}
```

## Advanced Features

### Variable Substitution

Variables are supported in configuration:

```json
{
  "customCommands": {
    "test-file": {
      "description": "Test specified file",
      "command": "npm test ${file}",
      "args": []
    }
  }
}
```

Available variables:
- `${projectRoot}`: Project root directory
- `${workingDir}`: Current working directory
- `${file}`: Current file path
- `${args[0]}`: First argument
- `${env.VAR_NAME}`: Environment variable

### Conditional Execution

```json
{
  "customCommands": {
    "deploy": {
      "description": "Smart deployment",
      "command": "bash",
      "args": [
        "-c",
        "if [ \"$BRANCH\" = \"main\" ]; then ./deploy.sh prod; else ./deploy.sh staging; fi"
      ],
      "env": {
        "BRANCH": "$(git branch --show-current)"
      }
    }
  }
}
```

### Command Chaining

```json
{
  "customCommands": {
    "full-check": {
      "description": "Full check pipeline",
      "command": "npm run lint && npm run type-check && npm test"
    },
    "pre-commit": {
      "description": "Pre-commit checks",
      "command": "npm run format && npm run lint-fix && npm test"
    }
  }
}
```

### Interactive Commands

```json
{
  "customCommands": {
    "select-env": {
      "description": "Select deployment environment",
      "command": "bash",
      "args": [
        "-c",
        "echo 'Select environment: 1) staging 2) production' && read choice && ./deploy.sh $choice"
      ],
      "captureOutput": false
    }
  }
}
```

## Command Organization

### Grouping by Function

```json
{
  "customCommands": {
    "dev:start": {
      "description": "Start development server",
      "command": "npm run dev"
    },
    "dev:db": {
      "description": "Start database",
      "command": "docker-compose up -d postgres"
    },
    "dev:all": {
      "description": "Start all development services",
      "command": "docker-compose up -d && npm run dev"
    },
    "test:unit": {
      "description": "Unit tests",
      "command": "npm run test:unit"
    },
    "test:integration": {
      "description": "Integration tests",
      "command": "npm run test:integration"
    },
    "test:all": {
      "description": "All tests",
      "command": "npm test"
    }
  }
}
```

### Command Aliases

```json
{
  "customCommands": {
    "deploy-production": {
      "description": "Deploy to production",
      "command": "./scripts/deploy.sh production",
      "aliases": ["deploy-prod", "prod-deploy", "dp"]
    }
  }
}
```

## Integration with Skills

Custom commands can be invoked within Skills:

`.claude/skills/deploy.md`:

```markdown
---
name: deploy
description: Smart deployment workflow
---

# Deploy Skill

## Pre-deployment Checks

1. Run tests: `claude test-all`
2. Check code quality: `claude lint`
3. Build project: `claude build`

## Execute Deployment

{{#if (eq env "production")}}
Run command: `claude deploy-prod`
{{else}}
Run command: `claude deploy-staging`
{{/if}}

## Post-deployment Verification

1. Check service status
2. Run smoke tests
3. Monitor error logs
```

## Security Considerations

### Dangerous Command Confirmation

```json
{
  "customCommands": {
    "db-drop": {
      "description": "Drop database",
      "command": "dropdb myapp",
      "confirmBefore": true,
      "confirmMessage": "Warning: This will delete the entire database! Confirm?"
    }
  }
}
```

### Permission Control

```json
{
  "customCommands": {
    "deploy-prod": {
      "description": "Production deployment",
      "command": "./deploy.sh",
      "requireRole": "admin",
      "auditLog": true
    }
  }
}
```

### Sensitive Information Handling

```json
{
  "customCommands": {
    "backup": {
      "description": "Backup database",
      "command": "./backup.sh",
      "env": {
        "DB_PASSWORD": "${env.DB_PASSWORD}"
      },
      "hideEnv": ["DB_PASSWORD"]
    }
  }
}
```

## Debugging and Logging

### Enabling Verbose Output

```bash
# View command execution details
claude deploy --verbose

# Debug mode
claude deploy --debug
```

### Log Configuration

```json
{
  "customCommands": {
    "deploy": {
      "description": "Deploy",
      "command": "./deploy.sh",
      "logging": {
        "enabled": true,
        "level": "info",
        "file": ".claude/logs/deploy.log"
      }
    }
  }
}
```

### Execution History

```bash
# View command history
claude --command-history

# Output example
Recent custom commands:
  2024-01-15 10:30:00  deploy-staging  Success (45s)
  2024-01-15 09:15:00  test-all        Success (120s)
  2024-01-14 16:45:00  lint-fix        Success (8s)
```

## Best Practices

### 1. Naming Conventions

- Use lowercase letters and hyphens
- Start with verbs: `deploy`, `test`, `build`
- Use colons for grouping: `dev:start`, `test:unit`
- Keep short and descriptive

### 2. Documentation

```json
{
  "customCommands": {
    "deploy": {
      "description": "Deploy to specified environment",
      "usage": "claude deploy [staging|production]",
      "examples": [
        "claude deploy staging",
        "claude deploy production"
      ],
      "command": "./scripts/deploy.sh"
    }
  }
}
```

### 3. Error Handling

```json
{
  "customCommands": {
    "deploy": {
      "description": "Deploy",
      "command": "bash",
      "args": [
        "-c",
        "./deploy.sh || (echo 'Deploy failed, rolling back...' && ./rollback.sh)"
      ]
    }
  }
}
```

### 4. Timeout Settings

```json
{
  "customCommands": {
    "long-task": {
      "description": "Long-running task",
      "command": "./long-task.sh",
      "timeout": 600000,
      "showProgress": true
    }
  }
}
```

### 5. Environment Isolation

```json
{
  "customCommands": {
    "test": {
      "description": "Test",
      "command": "npm test",
      "env": {
        "NODE_ENV": "test",
        "CI": "true"
      },
      "cleanEnv": true
    }
  }
}
```

## Team Collaboration

### Sharing Command Configuration

Commit `.claude/config.json` to version control:

```bash
git add .claude/config.json
git commit -m "chore: Add custom command configuration"
```

### Documenting Team Commands

Create `.claude/COMMANDS.md`:

```markdown
# Team Custom Commands

## Development Commands

- `claude dev:start` - Start development environment
- `claude dev:db` - Start database
- `claude dev:all` - Start all services

## Test Commands

- `claude test:unit` - Unit tests
- `claude test:e2e` - End-to-end tests
- `claude test:all` - All tests

## Deploy Commands

- `claude deploy-staging` - Deploy to staging
- `claude deploy-prod` - Deploy to production

## Usage Guide

For detailed documentation, see [Wiki](https://wiki.example.com/claude-commands)
```

### Command Review

Review command changes in PRs:
- Is the command safe
- Is there adequate confirmation mechanism
- Is there an appropriate timeout setting
- Is documentation complete

## Troubleshooting

### Common Issues

**Command not found**
- Check configuration file syntax
- Confirm command name spelling
- Run `claude --list-commands` to verify

**Command execution failed**
- Check script path is correct
- Verify execution permissions: `chmod +x script.sh`
- View detailed error: `claude command --verbose`

**Timeout error**
- Increase `timeout` setting
- Check if command is hanging
- Consider async execution

**Environment variable issues**
- Verify variable name spelling
- Check variable value is correct
- Use `--debug` to view environment

## Next Steps

- Learn about [Hooks](./hooks.md) to automatically trigger custom commands
- Explore [Skills](./skills.md) to create intelligent workflows
- Check the [Config Snippets Library](./config-snippets.md) for more examples
