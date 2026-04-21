---
title: "配置参考"
---

# 配置参考

Claude Code 提供了灵活的配置系统，允许您自定义 CLI 的行为、模型参数、工具集成等。本指南详细介绍所有可用的配置选项。

## 配置文件位置

### 默认位置

```bash
# macOS/Linux
~/.config/claude/config.json

# Windows
%APPDATA%\claude\config.json

# 项目级配置
./claude.config.json
./.clauderc
```

### 自定义位置

```bash
# 使用环境变量
export CLAUDE_CONFIG_PATH=/path/to/config.json

# 使用命令行参数
claude --config /path/to/config.json chat
```

## 配置文件结构

### 基本配置示例

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

## API 配置

### 认证设置

```json
{
  "api": {
    "key": "sk-ant-...",
    "keySource": "env",
    "keyEnvVar": "ANTHROPIC_API_KEY"
  }
}
```

**选项说明：**

- `key` - API 密钥（不推荐直接存储）
- `keySource` - 密钥来源（`env`/`file`/`keychain`）
- `keyEnvVar` - 环境变量名称
- `keyFile` - 密钥文件路径

### 端点配置

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

**选项说明：**

- `baseUrl` - API 基础 URL
- `timeout` - 请求超时时间（毫秒）
- `retries` - 失败重试次数
- `retryDelay` - 重试延迟（毫秒）

### 代理设置

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

## 模型配置

### 默认模型设置

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

**可用模型：**

- `claude-opus-4` - 最强大的模型
- `claude-sonnet-4` - 平衡性能和成本
- `claude-haiku-4` - 快速响应

### 采样参数

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

**参数说明：**

- `temperature` - 控制随机性（0.0-1.0）
- `topP` - 核采样阈值
- `topK` - 考虑的最高概率词数
- `stopSequences` - 停止生成的序列

### 模型别名

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

使用别名：

```bash
claude chat --model fast
claude ask "问题" --model smart
```

## 行为配置

### 输出控制

```json
{
  "behavior": {
    "stream": true,
    "bufferSize": 1024,
    "flushInterval": 100
  }
}
```

**选项说明：**

- `stream` - 启用流式输出
- `bufferSize` - 输出缓冲区大小
- `flushInterval` - 刷新间隔（毫秒）

### 自动保存

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

### 确认提示

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

**确认级别：**

- `none` - 不确认
- `low` - 仅危险操作
- `medium` - 重要操作
- `high` - 所有修改操作

## 上下文配置

### 文件包含规则

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

### 自动上下文

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

**选项说明：**

- `auto` - 自动检测相关文件
- `depth` - 依赖深度
- `followImports` - 跟踪导入
- `includeTests` - 包含测试文件

### 上下文缓存

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

## UI 配置

### 主题设置

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

**内置主题：**

- `dark` - 深色主题
- `light` - 浅色主题
- `auto` - 跟随系统

### 显示选项

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

### 编辑器集成

```json
{
  "ui": {
    "editor": "code",
    "editorArgs": ["-w"],
    "diffTool": "code --diff"
  }
}
```

**支持的编辑器：**

- `code` - VS Code
- `vim` - Vim
- `nano` - Nano
- `emacs` - Emacs

## 工具配置

### Git 集成

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

### 测试框架

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

### 代码格式化

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

## 插件配置

### 插件管理

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

### 插件设置

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

## 日志配置

### 日志级别

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

**日志级别：**

- `error` - 仅错误
- `warn` - 警告和错误
- `info` - 信息、警告和错误
- `debug` - 所有日志
- `trace` - 详细跟踪

### 日志格式

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

## 性能配置

### 缓存设置

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

**缓存类型：**

- `memory` - 内存缓存
- `disk` - 磁盘缓存
- `redis` - Redis 缓存

### 并发控制

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

### 资源限制

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

## 安全配置

### 访问控制

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

### 敏感数据过滤

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

### 审计日志

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

## 项目配置

### 项目级设置

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

### 项目模板

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

## 配置管理命令

### 查看配置

```bash
# 查看所有配置
claude config list

# 查看特定配置
claude config get model.default

# 以 JSON 格式输出
claude config list --json
```

### 修改配置

```bash
# 设置单个值
claude config set model.default claude-opus-4

# 设置嵌套值
claude config set api.proxy.host proxy.example.com

# 从文件导入
claude config import ./config.json
```

### 重置配置

```bash
# 重置所有配置
claude config reset

# 重置特定部分
claude config reset model

# 恢复默认值
claude config restore-defaults
```

## 配置验证

### 验证配置文件

```bash
# 验证配置
claude config validate

# 详细验证
claude config validate --verbose

# 修复配置
claude config fix
```

### 配置模式

```json
{
  "$schema": "https://claude.ai/schemas/config.json",
  "version": "1.0.0"
}
```

## 环境特定配置

### 多环境配置

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

使用环境：

```bash
export CLAUDE_ENV=development
claude chat

# 或
claude --env production chat
```

## 配置继承

### 配置层级

1. 默认配置（内置）
2. 全局配置（`~/.config/claude/config.json`）
3. 项目配置（`./claude.config.json`）
4. 环境变量
5. 命令行参数

### 合并策略

```json
{
  "merge": {
    "strategy": "deep",
    "arrayMerge": "replace",
    "overrideArrays": false
  }
}
```

## 配置最佳实践

1. **不要存储密钥**：使用环境变量或密钥管理器
2. **使用项目配置**：为每个项目定制设置
3. **版本控制**：将项目配置纳入版本控制
4. **文档化**：为自定义配置添加注释
5. **验证配置**：定期验证配置文件
6. **备份配置**：定期备份重要配置
7. **使用模板**：为常见场景创建配置模板

## 配置示例

### TypeScript 项目配置

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

### Python 项目配置

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

## 故障排除

### 配置加载失败

```bash
# 检查配置文件语法
claude config validate

# 查看加载的配置
claude config list --verbose

# 使用默认配置
claude --no-config chat
```

### 权限问题

```bash
# 检查文件权限
ls -la ~/.config/claude/config.json

# 修复权限
chmod 600 ~/.config/claude/config.json
```

### 配置冲突

```bash
# 查看配置来源
claude config list --show-source

# 清除缓存
claude config clear-cache
```
