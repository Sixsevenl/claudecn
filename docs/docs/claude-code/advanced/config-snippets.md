---
title: "配置片段库"
---

# 配置片段库

配置片段库提供了常见场景的配置示例，帮助你快速配置 Claude Code。所有片段都经过实践验证，可以直接复制使用。

## 基础配置片段

### 最小配置

```json
{
  "version": "1.0.0",
  "model": {
    "name": "claude-3-5-sonnet-20241022"
  }
}
```

### 标准配置

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

### 完整配置

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
      "description": "运行测试",
      "command": "npm test"
    }
  },
  "context": {
    "alwaysInclude": ["package.json", "tsconfig.json"],
    "excludePatterns": ["node_modules/**", "dist/**"]
  }
}
```

## 工具配置片段

### 限制写入权限

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

### 限制命令执行

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

### 只读模式

```json
{
  "tools": {
    "allowed": ["read", "grep", "glob"],
    "denied": ["write", "edit", "bash"]
  }
}
```

## Hooks 配置片段

### Git 工作流 Hooks

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

### 文件操作 Hooks

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

### 条件 Hooks

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

### 并行 Hooks

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

## 自定义命令片段

### 开发命令

```json
{
  "customCommands": {
    "dev": {
      "description": "启动开发服务器",
      "command": "npm run dev"
    },
    "dev-db": {
      "description": "启动数据库",
      "command": "docker-compose up -d postgres"
    },
    "dev-all": {
      "description": "启动所有服务",
      "command": "docker-compose up -d && npm run dev"
    }
  }
}
```

### 测试命令

```json
{
  "customCommands": {
    "test": {
      "description": "运行所有测试",
      "command": "npm test"
    },
    "test-unit": {
      "description": "运行单元测试",
      "command": "npm run test:unit"
    },
    "test-e2e": {
      "description": "运行 E2E 测试",
      "command": "npm run test:e2e",
      "timeout": 120000
    },
    "test-watch": {
      "description": "监听模式运行测试",
      "command": "npm test -- --watch",
      "captureOutput": false
    },
    "test-coverage": {
      "description": "生成测试覆盖率报告",
      "command": "npm run test:coverage"
    }
  }
}
```

### 构建和部署命令

```json
{
  "customCommands": {
    "build": {
      "description": "构建项目",
      "command": "npm run build",
      "timeout": 180000
    },
    "clean": {
      "description": "清理构建产物",
      "command": "rm -rf dist build .next"
    },
    "deploy-staging": {
      "description": "部署到测试环境",
      "command": "./scripts/deploy.sh staging",
      "confirmBefore": true,
      "env": {
        "NODE_ENV": "staging"
      }
    },
    "deploy-prod": {
      "description": "部署到生产环境",
      "command": "./scripts/deploy.sh production",
      "confirmBefore": true,
      "confirmMessage": "确认部署到生产环境？",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 数据库命令

```json
{
  "customCommands": {
    "db-migrate": {
      "description": "运行数据库迁移",
      "command": "npm run migrate",
      "confirmBefore": true
    },
    "db-seed": {
      "description": "填充测试数据",
      "command": "npm run seed",
      "env": {
        "NODE_ENV": "development"
      }
    },
    "db-reset": {
      "description": "重置数据库",
      "command": "./scripts/db-reset.sh",
      "confirmBefore": true,
      "confirmMessage": "警告：此操作将删除所有数据！"
    },
    "db-backup": {
      "description": "备份数据库",
      "command": "./scripts/db-backup.sh"
    }
  }
}
```

## 上下文配置片段

### 前端项目上下文

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

### 后端项目上下文

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

### 全栈项目上下文

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

## MCP 服务器配置片段

### 文件系统服务器

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

### GitHub 服务器

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

### 数据库服务器

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

### 多服务器配置

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

## 技术栈特定配置

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
      "description": "启动开发服务器",
      "command": "npm run dev"
    },
    "build": {
      "description": "构建项目",
      "command": "npm run build"
    },
    "preview": {
      "description": "预览构建结果",
      "command": "npm run preview"
    },
    "storybook": {
      "description": "启动 Storybook",
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
      "description": "启动开发服务器",
      "command": "npm run dev"
    },
    "build": {
      "description": "构建项目",
      "command": "npm run build"
    },
    "start": {
      "description": "启动生产服务器",
      "command": "npm start"
    },
    "analyze": {
      "description": "分析打包大小",
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
      "description": "启动开发服务器",
      "command": "npm run dev"
    },
    "start": {
      "description": "启动生产服务器",
      "command": "npm start"
    },
    "db-migrate": {
      "description": "运行数据库迁移",
      "command": "npm run migrate"
    },
    "db-seed": {
      "description": "填充测试数据",
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
      "description": "启动开发服务器",
      "command": "python manage.py runserver"
    },
    "migrate": {
      "description": "运行数据库迁移",
      "command": "python manage.py migrate"
    },
    "makemigrations": {
      "description": "创建迁移文件",
      "command": "python manage.py makemigrations"
    },
    "test": {
      "description": "运行测试",
      "command": "pytest"
    },
    "shell": {
      "description": "启动 Django Shell",
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
      "description": "运行应用",
      "command": "go run main.go"
    },
    "build": {
      "description": "构建应用",
      "command": "go build -o bin/app"
    },
    "test": {
      "description": "运行测试",
      "command": "go test ./..."
    },
    "test-coverage": {
      "description": "生成测试覆盖率",
      "command": "go test -coverprofile=coverage.out ./... && go tool cover -html=coverage.out"
    },
    "lint": {
      "description": "代码检查",
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

## 安全配置片段

### 严格模式

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

### 审计日志

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

### 敏感文件保护

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

## 性能优化配置

### 大型项目优化

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

### 并行执行优化

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

## 团队协作配置

### 多环境配置

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

### 角色权限配置

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

## 使用配置片段

### 复制粘贴

```bash
# 1. 选择合适的片段
# 2. 复制到 .claude/config.json
# 3. 根据项目调整
# 4. 验证配置
claude --validate-config
```

### 合并配置

```bash
# 使用 jq 合并配置
jq -s '.[0] * .[1]' .claude/config.json snippet.json > merged.json
mv merged.json .claude/config.json
```

### 配置继承

```json
{
  "extends": "./.claude/config.base.json",
  "customCommands": {
    "custom-command": {
      "description": "自定义命令",
      "command": "echo 'custom'"
    }
  }
}
```

## 下一步

- 查看 [Hooks 配方](./hooks-recipes.md) 获取 Hooks 示例
- 学习 [团队规则库](./team-rules.md) 了解最佳实践
- 探索 [Agent Loop 解析](./agent-loop.md) 理解工作原理
