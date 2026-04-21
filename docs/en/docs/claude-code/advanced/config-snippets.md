---
title: "Config Snippets Library"
---

# Config Snippets Library

The config snippets library provides configuration examples for common scenarios to help you quickly configure Claude Code. All snippets are practice-tested and ready to copy and use.

## Basic Config Snippets

### Minimal Configuration

```json
{
  "version": "1.0.0",
  "model": {
    "name": "claude-3-5-sonnet-20241022"
  }
}
```

### Standard Configuration

```json
{
  "version": "1.0.0",
  "model": {
    "name": "claude-3-5-sonnet-20241022",
    "temperature": 0.7,
    "maxTokens": 4096
  },
  "tools": {
    "allowed": ["read", "write", "edit", "bash", "grep", "glob"]
  },
  "context": {
    "alwaysInclude": ["package.json", "README.md"],
    "excludePatterns": ["node_modules/**", "dist/**"]
  }
}
```

### Complete Configuration

```json
{
  "version": "1.0.0",
  "team": {
    "name": "MyTeam",
    "repository": "https://github.com/myorg/myproject"
  },
  "model": {
    "name": "claude-3-5-sonnet-20241022",
    "temperature": 0.7,
    "maxTokens": 4096
  },
  "tools": {
    "allowed": ["read", "write", "edit", "bash", "grep", "glob"],
    "restricted": {
      "write": {
        "requireApproval": true,
        "excludePaths": ["node_modules/**", ".git/**"]
      }
    }
  },
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true
    }
  },
  "customCommands": {
    "test": {
      "description": "Run tests",
      "command": "npm test"
    }
  },
  "context": {
    "alwaysInclude": ["package.json", "tsconfig.json"],
    "excludePatterns": ["node_modules/**", "dist/**"]
  }
}
```

## Tool Configuration Snippets

### Restrict Write Permissions

```json
{
  "tools": {
    "restricted": {
      "write": {
        "requireApproval": true,
        "excludePaths": [
          "node_modules/**",
          ".git/**",
          "dist/**",
          "build/**",
          "*.lock"
        ]
      }
    }
  }
}
```

### Restrict Command Execution

```json
{
  "tools": {
    "restricted": {
      "bash": {
        "requireApproval": true,
        "allowedCommands": ["npm", "git", "node", "tsc"],
        "deniedCommands": ["rm -rf", "sudo", "curl"]
      }
    }
  }
}
```

### Read-Only Mode

```json
{
  "tools": {
    "allowed": ["read", "grep", "glob"],
    "denied": ["write", "edit", "bash"]
  }
}
```

## Hooks Configuration Snippets

### Git Workflow Hooks

```json
{
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 120000
    },
    "postCommit": {
      "command": "./.claude/hooks/post-commit.sh",
      "enabled": true,
      "blocking": false
    },
    "prePush": {
      "command": "./.claude/hooks/pre-push.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 180000
    }
  }
}
```

### File Operation Hooks

```json
{
  "hooks": {
    "preWrite": {
      "command": "./.claude/hooks/validate-write.sh",
      "enabled": true,
      "blocking": true
    },
    "postWrite": {
      "command": "./.claude/hooks/format-file.sh ${file}",
      "enabled": true,
      "blocking": false
    },
    "postEdit": {
      "command": "npx prettier --write ${file}",
      "enabled": true,
      "blocking": false
    }
  }
}
```

### Conditional Hooks

```json
{
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/lint-staged.sh",
      "enabled": true,
      "condition": "git diff --cached --name-only | grep -E '\\.(ts|tsx)$'",
      "blocking": true
    }
  }
}
```

### Parallel Hooks

```json
{
  "hooks": {
    "preCommit": [
      {
        "name": "lint",
        "command": "npm run lint",
        "parallel": true
      },
      {
        "name": "type-check",
        "command": "tsc --noEmit",
        "parallel": true
      },
      {
        "name": "test",
        "command": "npm test",
        "parallel": true
      }
    ]
  }
}
```

## Custom Command Snippets

### Development Commands

```json
{
  "customCommands": {
    "dev": {
      "description": "Start development server",
      "command": "npm run dev"
    },
    "dev-db": {
      "description": "Start database",
      "command": "docker-compose up -d postgres"
    },
    "dev-all": {
      "description": "Start all services",
      "command": "docker-compose up -d && npm run dev"
    }
  }
}
```

### Test Commands

```json
{
  "customCommands": {
    "test": {
      "description": "Run all tests",
      "command": "npm test"
    },
    "test-unit": {
      "description": "Run unit tests",
      "command": "npm run test:unit"
    },
    "test-e2e": {
      "description": "Run E2E tests",
      "command": "npm run test:e2e",
      "timeout": 120000
    },
    "test-watch": {
      "description": "Run tests in watch mode",
      "command": "npm test -- --watch",
      "captureOutput": false
    },
    "test-coverage": {
      "description": "Generate test coverage report",
      "command": "npm run test:coverage"
    }
  }
}
```

### Build and Deploy Commands

```json
{
  "customCommands": {
    "build": {
      "description": "Build project",
      "command": "npm run build",
      "timeout": 180000
    },
    "clean": {
      "description": "Clean build artifacts",
      "command": "rm -rf dist build .next"
    },
    "deploy-staging": {
      "description": "Deploy to staging environment",
      "command": "./scripts/deploy.sh staging",
      "confirmBefore": true,
      "env": {
        "NODE_ENV": "staging"
      }
    },
    "deploy-prod": {
      "description": "Deploy to production environment",
      "command": "./scripts/deploy.sh production",
      "confirmBefore": true,
      "confirmMessage": "Confirm deployment to production?",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Database Commands

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
      "confirmMessage": "Warning: This will delete all data!"
    },
    "db-backup": {
      "description": "Backup database",
      "command": "./scripts/db-backup.sh"
    }
  }
}
```

## Context Configuration Snippets

### Frontend Project Context

```json
{
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      "vite.config.ts",
      "tailwind.config.js",
      ".env.example"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      "coverage/**",
      "*.log"
    ]
  }
}
```

### Backend Project Context

```json
{
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example",
      "src/config/**",
      "prisma/schema.prisma"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "logs/**",
      "uploads/**",
      "*.log"
    ]
  }
}
```

### Full-Stack Project Context

```json
{
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      "apps/*/package.json",
      "packages/*/package.json",
      ".env.example"
    ],
    "excludePatterns": [
      "node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "coverage/**"
    ]
  }
}
```

## MCP Server Configuration Snippets

### Filesystem Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects",
        "/Users/username/documents"
      ],
      "enabled": true
    }
  }
}
```

### GitHub Server

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${env.GITHUB_TOKEN}"
      },
      "enabled": true
    }
  }
}
```

### Database Server

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${env.DATABASE_URL}"
      },
      "enabled": true
    },
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-mongodb"],
      "env": {
        "MONGODB_URI": "${env.MONGODB_URI}"
      },
      "enabled": true
    }
  }
}
```

### Multi-Server Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
      "enabled": true
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${env.GITHUB_TOKEN}"
      },
      "enabled": true
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${env.DATABASE_URL}"
      },
      "enabled": true
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${env.SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${env.SLACK_TEAM_ID}"
      },
      "enabled": false
    }
  }
}
```

## Tech-Stack Specific Configurations

### React + TypeScript + Vite

```json
{
  "version": "1.0.0",
  "model": {
    "name": "claude-3-5-sonnet-20241022",
    "temperature": 0.7
  },
  "tools": {
    "allowed": ["read", "write", "edit", "bash", "grep", "glob"]
  },
  "customCommands": {
    "dev": {
      "description": "Start development server",
      "command": "npm run dev"
    },
    "build": {
      "description": "Build project",
      "command": "npm run build"
    },
    "preview": {
      "description": "Preview build result",
      "command": "npm run preview"
    },
    "storybook": {
      "description": "Start Storybook",
      "command": "npm run storybook"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      "vite.config.ts",
      "index.html"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "storybook-static/**"
    ]
  }
}
```

### Next.js

```json
{
  "version": "1.0.0",
  "customCommands": {
    "dev": {
      "description": "Start development server",
      "command": "npm run dev"
    },
    "build": {
      "description": "Build project",
      "command": "npm run build"
    },
    "start": {
      "description": "Start production server",
      "command": "npm start"
    },
    "analyze": {
      "description": "Analyze bundle size",
      "command": "ANALYZE=true npm run build"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      "next.config.js",
      "app/layout.tsx"
    ],
    "excludePatterns": [
      "node_modules/**",
      ".next/**",
      "out/**"
    ]
  }
}
```

### Node.js + Express

```json
{
  "version": "1.0.0",
  "customCommands": {
    "dev": {
      "description": "Start development server",
      "command": "npm run dev"
    },
    "start": {
      "description": "Start production server",
      "command": "npm start"
    },
    "db-migrate": {
      "description": "Run database migrations",
      "command": "npm run migrate"
    },
    "db-seed": {
      "description": "Seed test data",
      "command": "npm run seed"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example",
      "src/app.ts",
      "src/config/**"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "logs/**"
    ]
  }
}
```

### Python + Django

```json
{
  "version": "1.0.0",
  "customCommands": {
    "runserver": {
      "description": "Start development server",
      "command": "python manage.py runserver"
    },
    "migrate": {
      "description": "Run database migrations",
      "command": "python manage.py migrate"
    },
    "makemigrations": {
      "description": "Create migration files",
      "command": "python manage.py makemigrations"
    },
    "test": {
      "description": "Run tests",
      "command": "pytest"
    },
    "shell": {
      "description": "Start Django Shell",
      "command": "python manage.py shell"
    }
  },
  "context": {
    "alwaysInclude": [
      "requirements.txt",
      "manage.py",
      "*/settings.py",
      "*/urls.py"
    ],
    "excludePatterns": [
      "venv/**",
      "__pycache__/**",
      "*.pyc",
      "db.sqlite3"
    ]
  }
}
```

### Go

```json
{
  "version": "1.0.0",
  "customCommands": {
    "run": {
      "description": "Run application",
      "command": "go run main.go"
    },
    "build": {
      "description": "Build application",
      "command": "go build -o bin/app"
    },
    "test": {
      "description": "Run tests",
      "command": "go test ./..."
    },
    "test-coverage": {
      "description": "Generate test coverage",
      "command": "go test -coverprofile=coverage.out ./... && go tool cover -html=coverage.out"
    },
    "lint": {
      "description": "Code linting",
      "command": "golangci-lint run"
    }
  },
  "context": {
    "alwaysInclude": [
      "go.mod",
      "go.sum",
      "main.go"
    ],
    "excludePatterns": [
      "vendor/**",
      "bin/**"
    ]
  }
}
```

## Security Configuration Snippets

### Strict Mode

```json
{
  "tools": {
    "allowed": ["read", "grep", "glob"],
    "restricted": {
      "write": {
        "requireApproval": true,
        "excludePaths": ["**/*"]
      },
      "edit": {
        "requireApproval": true
      },
      "bash": {
        "requireApproval": true,
        "allowedCommands": []
      }
    }
  }
}
```

### Audit Logging

```json
{
  "audit": {
    "enabled": true,
    "logPath": ".claude/logs/audit.log",
    "logLevel": "detailed",
    "events": [
      "tool-called",
      "file-modified",
      "command-executed",
      "hook-triggered"
    ]
  }
}
```

### Sensitive File Protection

```json
{
  "tools": {
    "restricted": {
      "write": {
        "excludePaths": [
          ".env",
          ".env.*",
          "secrets/**",
          "*.key",
          "*.pem",
          "credentials.json"
        ]
      },
      "read": {
        "excludePaths": [
          ".env",
          "secrets/**",
          "*.key",
          "*.pem"
        ]
      }
    }
  }
}
```

## Performance Optimization Configuration

### Large Project Optimization

```json
{
  "context": {
    "maxFileSize": 1048576,
    "maxFiles": 100,
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.log",
      "*.map",
      "*.min.js",
      "*.min.css"
    ]
  },
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "maxSize": 104857600
  }
}
```

### Parallel Execution Optimization

```json
{
  "execution": {
    "parallel": {
      "enabled": true,
      "maxConcurrent": 4
    }
  },
  "hooks": {
    "preCommit": [
      {
        "name": "lint",
        "command": "npm run lint",
        "parallel": true
      },
      {
        "name": "type-check",
        "command": "tsc --noEmit",
        "parallel": true
      },
      {
        "name": "test",
        "command": "npm test",
        "parallel": true
      }
    ]
  }
}
```

## Team Collaboration Configuration

### Multi-Environment Configuration

```json
{
  "environments": {
    "development": {
      "model": {
        "temperature": 0.8
      },
      "tools": {
        "allowed": ["read", "write", "edit", "bash", "grep", "glob"]
      }
    },
    "staging": {
      "model": {
        "temperature": 0.5
      },
      "tools": {
        "restricted": {
          "write": {
            "requireApproval": true
          }
        }
      }
    },
    "production": {
      "model": {
        "temperature": 0.3
      },
      "tools": {
        "allowed": ["read", "grep", "glob"]
      }
    }
  }
}
```

### Role-Based Permission Configuration

```json
{
  "roles": {
    "developer": {
      "tools": {
        "allowed": ["read", "write", "edit", "bash", "grep", "glob"]
      },
      "customCommands": ["dev", "test", "build"]
    },
    "reviewer": {
      "tools": {
        "allowed": ["read", "grep", "glob"]
      },
      "customCommands": ["test"]
    },
    "admin": {
      "tools": {
        "allowed": ["read", "write", "edit", "bash", "grep", "glob"]
      },
      "customCommands": ["*"]
    }
  }
}
```

## Using Config Snippets

### Copy and Paste

```bash
# 1. Choose an appropriate snippet
# 2. Copy to .claude/config.json
# 3. Adjust for your project
# 4. Validate configuration
claude --validate-config
```

### Merge Configuration

```bash
# Use jq to merge configurations
jq -s '.[0] * .[1]' .claude/config.json snippet.json > merged.json
mv merged.json .claude/config.json
```

### Configuration Inheritance

```json
{
  "extends": "./.claude/config.base.json",
  "customCommands": {
    "custom-command": {
      "description": "Custom command",
      "command": "echo 'custom'"
    }
  }
}
```

## Next Steps

- Check out [Hooks Recipes](./hooks-recipes.md) for Hooks examples
- Learn about [Team Rules Library](./team-rules.md) for best practices
- Explore [Agent Loop Analysis](./agent-loop.md) to understand how it works
