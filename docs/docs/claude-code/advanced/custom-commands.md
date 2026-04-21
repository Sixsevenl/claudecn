---
title: "自定义命令"
---

# 自定义命令

自定义命令让你能够扩展 Claude Code 的功能，创建符合团队工作流的专属命令。通过简单的配置，你可以将复杂的操作序列封装成一条命令。

## 什么是自定义命令

自定义命令是用户定义的 CLI 命令，可以：

- **执行脚本**：运行 shell 脚本或程序
- **组合工具**：串联多个工具调用
- **传递参数**：支持动态参数和选项
- **集成外部工具**：连接第三方服务

与 Skills 的区别：
- **Skills**：AI 驱动的智能任务，由 Claude 解释执行
- **自定义命令**：确定性的脚本执行，直接运行预定义逻辑

## 配置自定义命令

### 基础配置

在 `.claude/config.json` 中定义命令：

```json
{
  "customCommands": {
    "deploy": {
      "description": "部署到生产环境",
      "command": "./scripts/deploy.sh",
      "args": ["production"],
      "confirmBefore": true
    },
    "lint-fix": {
      "description": "运行 linter 并自动修复",
      "command": "npm run lint -- --fix",
      "workingDir": "${projectRoot}"
    },
    "db-migrate": {
      "description": "运行数据库迁移",
      "command": "npm run migrate",
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

### 调用自定义命令

```bash
# 直接调用
claude deploy

# 带参数调用
claude lint-fix --path src/

# 在对话中调用
claude "运行 deploy 命令"
```

## 命令配置详解

### 完整配置选项

```json
{
  "customCommands": {
    "command-name": {
      "description": "命令描述",
      "command": "要执行的命令",
      "args": ["默认参数"],
      "workingDir": "工作目录",
      "env": {
        "ENV_VAR": "value"
      },
      "confirmBefore": true,
      "timeout": 60000,
      "shell": "bash",
      "captureOutput": true,
      "onSuccess": "成功后执行的命令",
      "onFailure": "失败后执行的命令",
      "aliases": ["别名1", "别名2"]
    }
  }
}
```

### 参数说明

- **description**：命令描述，显示在帮助信息中
- **command**：要执行的命令或脚本路径
- **args**：默认参数数组
- **workingDir**：执行目录，支持变量替换
- **env**：环境变量
- **confirmBefore**：执行前是否需要确认
- **timeout**：超时时间（毫秒）
- **shell**：使用的 shell（bash/zsh/sh）
- **captureOutput**：是否捕获输出
- **onSuccess**：成功后的回调命令
- **onFailure**：失败后的回调命令
- **aliases**：命令别名

## 实用命令示例

### 1. 部署命令

```json
{
  "customCommands": {
    "deploy-staging": {
      "description": "部署到测试环境",
      "command": "./scripts/deploy.sh",
      "args": ["staging"],
      "confirmBefore": true,
      "env": {
        "DEPLOY_ENV": "staging"
      },
      "onSuccess": "echo '部署成功！访问 https://staging.example.com'",
      "onFailure": "echo '部署失败，请检查日志'"
    },
    "deploy-prod": {
      "description": "部署到生产环境",
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

### 2. 测试命令

```json
{
  "customCommands": {
    "test-unit": {
      "description": "运行单元测试",
      "command": "npm test",
      "args": ["--", "--coverage"],
      "captureOutput": true
    },
    "test-e2e": {
      "description": "运行端到端测试",
      "command": "npm run test:e2e",
      "env": {
        "HEADLESS": "true"
      },
      "timeout": 120000
    },
    "test-watch": {
      "description": "监听模式运行测试",
      "command": "npm test -- --watch",
      "captureOutput": false
    }
  }
}
```

### 3. 代码质量命令

```json
{
  "customCommands": {
    "lint": {
      "description": "运行代码检查",
      "command": "npm run lint",
      "captureOutput": true
    },
    "lint-fix": {
      "description": "自动修复代码问题",
      "command": "npm run lint -- --fix"
    },
    "format": {
      "description": "格式化代码",
      "command": "npm run format"
    },
    "type-check": {
      "description": "TypeScript 类型检查",
      "command": "tsc --noEmit"
    }
  }
}
```

### 4. 数据库命令

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
      "onSuccess": "npm run seed"
    }
  }
}
```

### 5. 构建命令

```json
{
  "customCommands": {
    "build": {
      "description": "构建项目",
      "command": "npm run build",
      "timeout": 180000
    },
    "build-watch": {
      "description": "监听模式构建",
      "command": "npm run build -- --watch",
      "captureOutput": false
    },
    "clean": {
      "description": "清理构建产物",
      "command": "rm -rf dist build .next"
    },
    "rebuild": {
      "description": "清理并重新构建",
      "command": "npm run clean && npm run build"
    }
  }
}
```

### 6. Git 工作流命令

```json
{
  "customCommands": {
    "sync": {
      "description": "同步主分支",
      "command": "git fetch origin && git rebase origin/main"
    },
    "pr-create": {
      "description": "创建 Pull Request",
      "command": "gh pr create --web"
    },
    "pr-check": {
      "description": "检查 PR 状态",
      "command": "gh pr checks"
    },
    "release": {
      "description": "创建发布",
      "command": "./scripts/release.sh",
      "confirmBefore": true
    }
  }
}
```

## 高级特性

### 变量替换

支持在配置中使用变量：

```json
{
  "customCommands": {
    "test-file": {
      "description": "测试指定文件",
      "command": "npm test ${file}",
      "args": []
    }
  }
}
```

可用变量：
- `${projectRoot}`：项目根目录
- `${workingDir}`：当前工作目录
- `${file}`：当前文件路径
- `${args[0]}`：第一个参数
- `${env.VAR_NAME}`：环境变量

### 条件执行

```json
{
  "customCommands": {
    "deploy": {
      "description": "智能部署",
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

### 命令链

```json
{
  "customCommands": {
    "full-check": {
      "description": "完整检查流程",
      "command": "npm run lint && npm run type-check && npm test"
    },
    "pre-commit": {
      "description": "提交前检查",
      "command": "npm run format && npm run lint-fix && npm test"
    }
  }
}
```

### 交互式命令

```json
{
  "customCommands": {
    "select-env": {
      "description": "选择部署环境",
      "command": "bash",
      "args": [
        "-c",
        "echo '选择环境: 1) staging 2) production' && read choice && ./deploy.sh $choice"
      ],
      "captureOutput": false
    }
  }
}
```

## 命令组织

### 按功能分组

```json
{
  "customCommands": {
    "dev:start": {
      "description": "启动开发服务器",
      "command": "npm run dev"
    },
    "dev:db": {
      "description": "启动数据库",
      "command": "docker-compose up -d postgres"
    },
    "dev:all": {
      "description": "启动所有开发服务",
      "command": "docker-compose up -d && npm run dev"
    },
    "test:unit": {
      "description": "单元测试",
      "command": "npm run test:unit"
    },
    "test:integration": {
      "description": "集成测试",
      "command": "npm run test:integration"
    },
    "test:all": {
      "description": "所有测试",
      "command": "npm test"
    }
  }
}
```

### 命令别名

```json
{
  "customCommands": {
    "deploy-production": {
      "description": "部署到生产环境",
      "command": "./scripts/deploy.sh production",
      "aliases": ["deploy-prod", "prod-deploy", "dp"]
    }
  }
}
```

## 与 Skills 集成

自定义命令可以在 Skills 中调用：

`.claude/skills/deploy.md`：

```markdown
---
name: deploy
description: 智能部署流程
---

# 部署 Skill

## 部署前检查

1. 运行测试：`claude test-all`
2. 检查代码质量：`claude lint`
3. 构建项目：`claude build`

## 执行部署

{{#if (eq env "production")}}
运行命令：`claude deploy-prod`
{{else}}
运行命令：`claude deploy-staging`
{{/if}}

## 部署后验证

1. 检查服务状态
2. 运行冒烟测试
3. 监控错误日志
```

## 安全考虑

### 危险命令确认

```json
{
  "customCommands": {
    "db-drop": {
      "description": "删除数据库",
      "command": "dropdb myapp",
      "confirmBefore": true,
      "confirmMessage": "警告：此操作将删除整个数据库！确认继续？"
    }
  }
}
```

### 权限控制

```json
{
  "customCommands": {
    "deploy-prod": {
      "description": "生产部署",
      "command": "./deploy.sh",
      "requireRole": "admin",
      "auditLog": true
    }
  }
}
```

### 敏感信息处理

```json
{
  "customCommands": {
    "backup": {
      "description": "备份数据库",
      "command": "./backup.sh",
      "env": {
        "DB_PASSWORD": "${env.DB_PASSWORD}"
      },
      "hideEnv": ["DB_PASSWORD"]
    }
  }
}
```

## 调试和日志

### 启用详细输出

```bash
# 查看命令执行详情
claude deploy --verbose

# 调试模式
claude deploy --debug
```

### 日志配置

```json
{
  "customCommands": {
    "deploy": {
      "description": "部署",
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

### 执行历史

```bash
# 查看命令历史
claude --command-history

# 输出示例
Recent custom commands:
  2024-01-15 10:30:00  deploy-staging  ✓ Success (45s)
  2024-01-15 09:15:00  test-all        ✓ Success (120s)
  2024-01-14 16:45:00  lint-fix        ✓ Success (8s)
```

## 最佳实践

### 1. 命名规范

- 使用小写字母和连字符
- 使用动词开头：`deploy`, `test`, `build`
- 分组使用冒号：`dev:start`, `test:unit`
- 简短且描述性

### 2. 文档化

```json
{
  "customCommands": {
    "deploy": {
      "description": "部署到指定环境",
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

### 3. 错误处理

```json
{
  "customCommands": {
    "deploy": {
      "description": "部署",
      "command": "bash",
      "args": [
        "-c",
        "./deploy.sh || (echo '部署失败，回滚中...' && ./rollback.sh)"
      ]
    }
  }
}
```

### 4. 超时设置

```json
{
  "customCommands": {
    "long-task": {
      "description": "长时间任务",
      "command": "./long-task.sh",
      "timeout": 600000,
      "showProgress": true
    }
  }
}
```

### 5. 环境隔离

```json
{
  "customCommands": {
    "test": {
      "description": "测试",
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

## 团队协作

### 共享命令配置

将 `.claude/config.json` 纳入版本控制：

```bash
git add .claude/config.json
git commit -m "chore: 添加自定义命令配置"
```

### 文档化团队命令

创建 `.claude/COMMANDS.md`：

```markdown
# 团队自定义命令

## 开发命令

- `claude dev:start` - 启动开发环境
- `claude dev:db` - 启动数据库
- `claude dev:all` - 启动所有服务

## 测试命令

- `claude test:unit` - 单元测试
- `claude test:e2e` - 端到端测试
- `claude test:all` - 所有测试

## 部署命令

- `claude deploy-staging` - 部署到测试环境
- `claude deploy-prod` - 部署到生产环境

## 使用说明

详细文档请参考 [Wiki](https://wiki.example.com/claude-commands)
```

### 命令审查

在 PR 中审查命令变更：
- 命令是否安全
- 是否有充分的确认机制
- 是否有适当的超时设置
- 文档是否完整

## 故障排查

### 常见问题

**命令未找到**
- 检查配置文件语法
- 确认命令名称拼写
- 运行 `claude --list-commands` 验证

**命令执行失败**
- 检查脚本路径是否正确
- 验证执行权限：`chmod +x script.sh`
- 查看详细错误：`claude command --verbose`

**超时错误**
- 增加 `timeout` 设置
- 检查命令是否卡住
- 考虑异步执行

**环境变量问题**
- 验证变量名拼写
- 检查变量值是否正确
- 使用 `--debug` 查看环境

## 下一步

- 学习 [Hooks](./hooks.md) 自动触发自定义命令
- 探索 [Skills](./skills.md) 创建智能工作流
- 查看 [配置片段库](./config-snippets.md) 获取更多示例
