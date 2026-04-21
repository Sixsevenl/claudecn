---
title: "团队 Starter Kit"
---

# 团队 Starter Kit

快速启动团队的 Claude Code 配置。本 Starter Kit 提供了开箱即用的配置、Skills、Hooks 和最佳实践，帮助团队在几分钟内开始使用 Claude Code。

## 快速开始

### 1. 克隆 Starter Kit

```bash
# 下载 Starter Kit
curl -L https://github.com/anthropics/claude-code-starter-kit/archive/main.zip -o starter-kit.zip
unzip starter-kit.zip

# 复制到项目
cp -r claude-code-starter-kit/.claude /path/to/your/project/
cd /path/to/your/project
```

### 2. 运行设置脚本

```bash
chmod +x .claude/scripts/setup.sh
./.claude/scripts/setup.sh
```

### 3. 配置 API 密钥

```bash
export ANTHROPIC_API_KEY="your-api-key"
echo 'export ANTHROPIC_API_KEY="your-api-key"' >> ~/.zshrc
```

### 4. 验证安装

```bash
claude --version
claude --list-skills
claude "帮我了解这个项目"
```

## Starter Kit 内容

### 目录结构

```
.claude/
├── config.json                 # 主配置
├── .claudeignore              # 忽略规则
├── skills/                    # 预置 Skills
│   ├── commit.md              # 智能提交
│   ├── review.md              # 代码审查
│   ├── test-gen.md            # 测试生成
│   ├── refactor.md            # 代码重构
│   └── docs-gen.md            # 文档生成
├── hooks/                     # 自动化 Hooks
│   ├── pre-commit.sh          # 提交前检查
│   ├── post-write.sh          # 写入后格式化
│   └── pre-push.sh            # 推送前验证
├── templates/                 # 代码模板
│   ├── react-component.tsx    # React 组件
│   ├── api-route.ts           # API 路由
│   ├── test.spec.ts           # 测试文件
│   └── readme.md              # README 模板
├── rules/                     # 团队规则
│   ├── coding-standards.md    # 编码规范
│   ├── commit-convention.md   # 提交规范
│   ├── review-checklist.md    # 审查清单
│   └── security-guidelines.md # 安全指南
├── scripts/                   # 工具脚本
│   ├── setup.sh               # 初始化脚本
│   ├── validate.sh            # 配置验证
│   └── migrate.sh             # 版本迁移
└── docs/                      # 文档
    ├── README.md              # 使用说明
    ├── SETUP.md               # 设置指南
    ├── SKILLS.md              # Skills 文档
    └── TROUBLESHOOTING.md     # 故障排查
```

### 预置配置

`.claude/config.json`：

```json
{
  "version": "1.0.0",
  "team": {
    "name": "YourTeam",
    "repository": "https://github.com/yourorg/yourproject"
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
        "excludePaths": ["node_modules/**", ".git/**", "dist/**"]
      }
    }
  },
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 120000
    },
    "postWrite": {
      "command": "./.claude/hooks/post-write.sh",
      "enabled": true,
      "blocking": false
    },
    "prePush": {
      "command": "./.claude/hooks/pre-push.sh",
      "enabled": true,
      "blocking": true,
      "timeout": 180000
    }
  },
  "customCommands": {
    "test": {
      "description": "运行测试",
      "command": "npm test"
    },
    "lint": {
      "description": "代码检查",
      "command": "npm run lint"
    },
    "format": {
      "description": "格式化代码",
      "command": "npm run format"
    },
    "build": {
      "description": "构建项目",
      "command": "npm run build"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example",
      "README.md"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.log"
    ]
  }
}
```

### 预置 Skills

#### 智能提交 Skill

`.claude/skills/commit.md`：

````markdown
---
name: commit
description: 生成符合规范的 Git 提交信息
args:
  - name: type
    description: 提交类型
    choices: [feat, fix, docs, style, refactor, test, chore]
    required: false
---

# 智能提交 Skill

分析代码变更并生成符合 Conventional Commits 规范的提交信息。

## 流程

1. 运行 `git diff --staged` 查看暂存的变更
2. 分析变更的性质和影响范围
3. 确定提交类型和范围
4. 生成提交信息（标题 + 正文）
5. 执行 `git commit`

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## 规范参考

详见：`.claude/rules/commit-convention.md`
````

#### 代码审查 Skill

`.claude/skills/review.md`：

```markdown
---
name: review
description: 全面的代码审查
args:
  - name: target
    description: 审查目标（文件路径或 git diff）
    required: false
---

# 代码审查 Skill

按照团队审查清单进行全面的代码审查。

## 审查维度

1. 功能性：是否实现需求
2. 代码质量：是否遵循规范
3. 性能：是否有性能问题
4. 安全性：是否有安全隐患
5. 可维护性：是否易于维护
6. 测试：测试是否充分

## 审查清单

详见：`.claude/rules/review-checklist.md`

## 输出格式

- 通过项列表
- 问题项列表（含改进建议）
- 总体评分
- 关键建议
```

#### 测试生成 Skill

`.claude/skills/test-gen.md`：

```markdown
---
name: test-gen
description: 生成单元测试
args:
  - name: file
    description: 目标文件路径
    required: true
  - name: framework
    description: 测试框架
    choices: [jest, vitest, mocha]
    default: jest
---

# 测试生成 Skill

为指定代码文件生成全面的单元测试。

## 测试策略

1. 分析源代码结构
2. 识别所有公共函数/方法
3. 为每个函数生成测试用例：
   - 正常路径测试
   - 边界条件测试
   - 异常情况测试
4. Mock 外部依赖
5. 运行测试验证

## 测试质量标准

- 每个公共函数至少 3 个测试用例
- 覆盖率目标：80%+
- 测试描述清晰
- 断言有意义
```

### 预置 Hooks

#### 提交前检查

`.claude/hooks/pre-commit.sh`：

```bash
#!/bin/bash
set -e

echo "运行提交前检查..."

# 1. 代码格式化
echo "→ 格式化代码..."
npm run format

# 2. Linter 检查
echo "→ 运行 linter..."
npm run lint

# 3. 类型检查
echo "→ TypeScript 类型检查..."
npx tsc --noEmit

# 4. 单元测试
echo "→ 运行单元测试..."
npm run test:unit

# 5. 验证提交信息格式
echo "→ 验证提交信息..."
if [ -f .git/COMMIT_EDITMSG ]; then
  if ! grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+" .git/COMMIT_EDITMSG; then
    echo "错误：提交信息不符合 Conventional Commits 规范"
    echo "格式：<type>(<scope>): <subject>"
    exit 1
  fi
fi

echo "✓ 所有检查通过"
```

#### 写入后格式化

`.claude/hooks/post-write.sh`：

```bash
#!/bin/bash

FILE=$1

echo "格式化文件: $FILE"

# 根据文件类型选择格式化工具
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx)
    npx prettier --write "$FILE"
    npx eslint --fix "$FILE" 2>/dev/null || true
    ;;
  *.json)
    npx prettier --write "$FILE"
    ;;
  *.md)
    npx prettier --write "$FILE"
    ;;
  *.css|*.scss)
    npx prettier --write "$FILE"
    ;;
esac

echo "✓ 格式化完成"
```

#### 推送前验证

`.claude/hooks/pre-push.sh`：

```bash
#!/bin/bash
set -e

echo "运行推送前验证..."

# 1. 运行所有测试
echo "→ 运行所有测试..."
npm test

# 2. 检查测试覆盖率
echo "→ 检查测试覆盖率..."
npm run test:coverage
COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
THRESHOLD=80

if (( $(echo "$COVERAGE < $THRESHOLD" | bc -l) )); then
  echo "错误：测试覆盖率 $COVERAGE% 低于阈值 $THRESHOLD%"
  exit 1
fi

# 3. 构建检查
echo "→ 构建检查..."
npm run build

# 4. 安全扫描
echo "→ 依赖漏洞扫描..."
npm audit --audit-level=high

echo "✓ 所有验证通过"
```

### 代码模板

#### React 组件模板

`.claude/templates/react-component.tsx`：

```typescript
import React from 'react';

interface I{{ComponentName}}Props {
  // Props 定义
}

/**
 * {{ComponentName}} 组件
 *
 * @description {{ComponentDescription}}
 */
export function {{ComponentName}}(props: I{{ComponentName}}Props) {
  // Hooks

  // 事件处理

  // 渲染
  return (
    <div className="{{component-name}}">
      {/* 组件内容 */}
    </div>
  );
}
```

#### API 路由模板

`.claude/templates/api-route.ts`：

```typescript
import { Request, Response, NextFunction } from 'express';

/**
 * {{RouteDescription}}
 *
 * @route {{Method}} {{Path}}
 * @access {{Access}}
 */
export async function {{HandlerName}}(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // 参数验证
    const { param1, param2 } = req.body;

    // 业务逻辑

    // 返回响应
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
}
```

#### 测试文件模板

`.claude/templates/test.spec.ts`：

```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('{{TestSuite}}', () => {
  beforeEach(() => {
    // 测试前设置
  });

  afterEach(() => {
    // 测试后清理
  });

  describe('{{Feature}}', () => {
    it('should {{behavior}}', () => {
      // Arrange
      const input = {};

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBeDefined();
    });

    it('should handle edge cases', () => {
      // 边界条件测试
    });

    it('should handle errors', () => {
      // 错误处理测试
    });
  });
});
```

## 自定义 Starter Kit

### 1. Fork 并修改

```bash
# Fork Starter Kit 仓库
git clone https://github.com/yourorg/claude-code-starter-kit.git
cd claude-code-starter-kit

# 修改配置
vim .claude/config.json

# 添加团队特定的 Skills
vim .claude/skills/custom-skill.md

# 提交变更
git add .
git commit -m "chore: 自定义团队配置"
git push
```

### 2. 创建团队模板

```bash
# 创建模板仓库
mkdir my-team-starter-kit
cd my-team-starter-kit

# 复制基础结构
cp -r /path/to/starter-kit/.claude .

# 添加团队特定内容
# - 编码规范
# - 提交规范
# - 审查清单
# - 自定义 Skills

# 初始化 Git
git init
git add .
git commit -m "feat: 初始化团队 Starter Kit"
```

### 3. 分发给团队

```bash
# 方式 1：Git 仓库
git remote add origin https://github.com/yourorg/team-starter-kit.git
git push -u origin main

# 方式 2：压缩包
tar -czf team-starter-kit.tar.gz .claude/
# 分发给团队成员

# 方式 3：npm 包
npm init
npm publish
```

## 不同技术栈的 Starter Kit

### React + TypeScript

```json
{
  "customCommands": {
    "dev": {
      "description": "启动开发服务器",
      "command": "npm run dev"
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
      "vite.config.ts"
    ]
  }
}
```

### Node.js + Express

```json
{
  "customCommands": {
    "dev": {
      "description": "启动开发服务器",
      "command": "npm run dev"
    },
    "db-migrate": {
      "description": "运行数据库迁移",
      "command": "npm run migrate"
    }
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example"
    ]
  }
}
```

### Python + Django

```json
{
  "customCommands": {
    "runserver": {
      "description": "启动开发服务器",
      "command": "python manage.py runserver"
    },
    "migrate": {
      "description": "运行数据库迁移",
      "command": "python manage.py migrate"
    },
    "test": {
      "description": "运行测试",
      "command": "pytest"
    }
  },
  "context": {
    "alwaysInclude": [
      "requirements.txt",
      "manage.py",
      "settings.py"
    ]
  }
}
```

### Go

```json
{
  "customCommands": {
    "run": {
      "description": "运行应用",
      "command": "go run main.go"
    },
    "test": {
      "description": "运行测试",
      "command": "go test ./..."
    },
    "build": {
      "description": "构建应用",
      "command": "go build -o bin/app"
    }
  },
  "context": {
    "alwaysInclude": [
      "go.mod",
      "go.sum",
      "main.go"
    ]
  }
}
```

## 团队入职流程

### 新成员设置清单

```markdown
# Claude Code 设置清单

## 前置要求
- [ ] 安装 Node.js 18+
- [ ] 安装 Git
- [ ] 获取 Anthropic API 密钥

## 安装步骤
- [ ] 克隆项目仓库
- [ ] 运行 `.claude/scripts/setup.sh`
- [ ] 配置 API 密钥
- [ ] 验证安装

## 学习资源
- [ ] 阅读 `.claude/docs/README.md`
- [ ] 查看 Skills 文档
- [ ] 了解团队规范

## 首次使用
- [ ] 运行 `claude "帮我了解这个项目"`
- [ ] 尝试 `claude /commit`
- [ ] 尝试 `claude /review`
```

### 培训材料

创建 `.claude/docs/TRAINING.md`：

```markdown
# Claude Code 培训

## 基础使用

### 1. 对话式交互
```bash
claude "帮我理解 auth 模块的实现"
claude "重构 UserService 类"
```

### 2. 使用 Skills
```bash
claude /commit          # 智能提交
claude /review          # 代码审查
claude /test-gen src/utils.ts  # 生成测试
```

### 3. 自定义命令
```bash
claude test             # 运行测试
claude lint             # 代码检查
claude deploy-staging   # 部署到测试环境
```

## 最佳实践

1. 提供清晰的上下文
2. 使用具体的描述
3. 验证 AI 生成的代码
4. 遵循团队规范

## 常见场景

### 功能开发
```bash
claude "实现用户登录功能，包括前端表单和后端 API"
```

### Bug 修复
```bash
claude "修复登录时的 token 过期问题"
```

### 代码审查
```bash
claude /review src/auth/login.ts
```

### 测试编写
```bash
claude /test-gen src/auth/login.ts
```
```

## 维护和更新

### 定期审查

每月审查清单：

```markdown
# 配置审查清单

## 配置文件
- [ ] 检查过时的配置项
- [ ] 更新依赖版本
- [ ] 验证环境变量

## Skills
- [ ] 审查 Skills 使用频率
- [ ] 更新过时的 Skills
- [ ] 添加新的 Skills

## Hooks
- [ ] 检查 Hooks 执行时间
- [ ] 优化慢速 Hooks
- [ ] 更新检查规则

## 文档
- [ ] 更新使用说明
- [ ] 补充常见问题
- [ ] 添加新示例
```

### 版本升级

```bash
# 检查更新
claude --check-updates

# 升级配置
./.claude/scripts/migrate.sh

# 验证升级
./.claude/scripts/validate.sh
```

## 故障排查

### 常见问题

**设置脚本失败**
```bash
# 检查权限
chmod +x .claude/scripts/setup.sh

# 手动执行步骤
npm install -g @anthropic-ai/claude-code
export ANTHROPIC_API_KEY="your-key"
```

**Hooks 不执行**
```bash
# 检查权限
chmod +x .claude/hooks/*.sh

# 手动测试
./.claude/hooks/pre-commit.sh
```

**Skills 未找到**
```bash
# 列出 Skills
claude --list-skills

# 检查路径
ls -la .claude/skills/
```

## 获取帮助

- 查看文档：`.claude/docs/`
- 常见问题：`.claude/docs/TROUBLESHOOTING.md`
- 团队支持：联系 DevOps 团队
- 官方文档：https://docs.anthropic.com/claude-code

## 下一步

- 探索 [配置即代码](./team-config-as-code.md)
- 学习 [模式库](./pattern-library.md)
- 查看 [配置片段库](./config-snippets.md)
