---
title: "团队落地：配置当代码管理"
---

# 团队落地：配置当代码管理

将 Claude Code 配置纳入版本控制，实现团队协作的标准化和自动化。通过"配置即代码"（Configuration as Code）理念，确保团队成员使用一致的工作流和规范。

## 为什么需要配置即代码

### 传统问题

- **配置不一致**：每个人的本地配置不同
- **知识孤岛**：最佳实践难以传播
- **新人上手慢**：需要手动配置环境
- **规范难执行**：依赖人工检查

### 配置即代码的优势

- **版本控制**：配置变更可追溯
- **团队同步**：自动应用团队配置
- **快速上手**：新成员克隆即用
- **强制规范**：通过 Hooks 自动执行

## 目录结构

标准的团队配置结构：

```
.claude/
├── config.json              # 主配置文件
├── .claudeignore           # 忽略文件规则
├── skills/                 # 团队 Skills
│   ├── commit.md
│   ├── review.md
│   ├── test-gen.md
│   └── deploy.md
├── hooks/                  # 团队 Hooks
│   ├── pre-commit.sh
│   ├── post-write.sh
│   └── pre-push.sh
├── templates/              # 代码模板
│   ├── component.tsx
│   ├── api-route.ts
│   └── test.spec.ts
├── rules/                  # 团队规则
│   ├── coding-standards.md
│   ├── commit-convention.md
│   └── review-checklist.md
└── docs/                   # 配置文档
    ├── README.md
    ├── SETUP.md
    └── TROUBLESHOOTING.md
```

## 主配置文件

`.claude/config.json`：

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
      },
      "bash": {
        "requireApproval": false,
        "allowedCommands": ["npm", "git", "node"]
      }
    }
  },
  "hooks": {
    "preCommit": {
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true,
      "blocking": true
    },
    "postWrite": {
      "command": "./.claude/hooks/post-write.sh",
      "enabled": true,
      "blocking": false
    },
    "prePush": {
      "command": "./.claude/hooks/pre-push.sh",
      "enabled": true,
      "blocking": true
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
    "deploy-staging": {
      "description": "部署到测试环境",
      "command": "./scripts/deploy.sh staging",
      "confirmBefore": true
    }
  },
  "rules": {
    "codingStandards": "./.claude/rules/coding-standards.md",
    "commitConvention": "./.claude/rules/commit-convention.md",
    "reviewChecklist": "./.claude/rules/review-checklist.md"
  },
  "context": {
    "alwaysInclude": [
      "package.json",
      "tsconfig.json",
      ".env.example"
    ],
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      "*.log"
    ]
  }
}
```

## 团队规则文件

### 编码规范

`.claude/rules/coding-standards.md`：

````markdown
# 编码规范

## TypeScript 规范

### 命名约定
- 类名：PascalCase
- 函数名：camelCase
- 常量：UPPER_SNAKE_CASE
- 接口：以 I 开头（IUser）
- 类型：以 T 开头（TUserData）

### 文件组织
```typescript
// 1. 导入
import { external } from 'external-lib';
import { internal } from '@/internal';

// 2. 类型定义
interface IProps {
  name: string;
}

// 3. 常量
const MAX_RETRIES = 3;

// 4. 主要代码
export function Component(props: IProps) {
  // 实现
}
```

### 错误处理
- 使用 try-catch 处理异步错误
- 自定义错误类型
- 提供有意义的错误消息

### 注释规范
- 公共 API 必须有 JSDoc
- 复杂逻辑添加行内注释
- 避免无意义的注释

## React 规范

### 组件结构
```typescript
// 1. Props 接口
interface IButtonProps {
  label: string;
  onClick: () => void;
}

// 2. 组件定义
export function Button({ label, onClick }: IButtonProps) {
  // 3. Hooks
  const [loading, setLoading] = useState(false);

  // 4. 事件处理
  const handleClick = () => {
    setLoading(true);
    onClick();
  };

  // 5. 渲染
  return <button onClick={handleClick}>{label}</button>;
}
```

### Hooks 使用
- 遵循 Hooks 规则
- 自定义 Hooks 以 use 开头
- 避免在循环/条件中使用 Hooks

## 测试规范

### 测试结构
```typescript
describe('Component', () => {
  describe('when prop X is Y', () => {
    it('should do Z', () => {
      // Arrange
      const props = { x: 'y' };

      // Act
      const result = render(<Component {...props} />);

      // Assert
      expect(result).toBeDefined();
    });
  });
});
```

### 测试覆盖率
- 单元测试：80%+
- 集成测试：关键路径
- E2E 测试：核心功能

## 性能规范

- 避免不必要的重渲染
- 使用 useMemo/useCallback
- 懒加载大型组件
- 优化图片和资源
````

### 提交规范

`.claude/rules/commit-convention.md`：

````markdown
# Git 提交规范

## Conventional Commits

格式：`<type>(<scope>): <subject>`

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链

### Scope 范围

- `auth`: 认证模块
- `api`: API 相关
- `ui`: UI 组件
- `db`: 数据库
- `config`: 配置

### Subject 主题

- 使用祈使句
- 不超过 50 字符
- 不以句号结尾
- 首字母小写

### 示例

```
feat(auth): 添加 OAuth 登录支持
fix(api): 修复用户查询接口超时问题
docs(readme): 更新安装说明
refactor(ui): 重构按钮组件
test(auth): 添加登录流程测试
chore(deps): 升级 React 到 18.2
```

### 提交正文

- 详细说明变更内容
- 解释变更原因
- 列出影响范围

### 提交页脚

- 关联 Issue：`Closes #123`
- Breaking Changes：`BREAKING CHANGE: 描述`

### 完整示例

```
feat(auth): 添加 OAuth 登录支持

实现了 Google 和 GitHub OAuth 登录：
- 添加 OAuth 配置
- 实现回调处理
- 更新用户模型

Closes #456
```
````

### 代码审查清单

`.claude/rules/review-checklist.md`：

```markdown
# 代码审查清单

## 功能性

- [ ] 代码实现了需求
- [ ] 边界条件处理正确
- [ ] 错误处理完善
- [ ] 测试覆盖充分

## 代码质量

- [ ] 遵循编码规范
- [ ] 命名清晰准确
- [ ] 函数职责单一
- [ ] 避免重复代码
- [ ] 注释充分且准确

## 性能

- [ ] 无明显性能问题
- [ ] 数据库查询优化
- [ ] 避免 N+1 查询
- [ ] 合理使用缓存

## 安全性

- [ ] 输入验证
- [ ] SQL 注入防护
- [ ] XSS 防护
- [ ] 敏感信息保护
- [ ] 权限检查

## 可维护性

- [ ] 代码结构清晰
- [ ] 易于理解
- [ ] 易于测试
- [ ] 文档完整

## 测试

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 测试用例充分
- [ ] 边界条件测试

## 文档

- [ ] API 文档更新
- [ ] README 更新
- [ ] 变更日志更新
- [ ] 注释准确

## Git

- [ ] 提交信息规范
- [ ] 提交粒度合理
- [ ] 无调试代码
- [ ] 无敏感信息
```

## 团队 Skills

### 标准化提交 Skill

`.claude/skills/commit.md`：

````markdown
---
name: commit
description: 生成符合团队规范的提交信息
---

# 团队提交 Skill

根据团队提交规范生成提交信息。

## 规范

参考：`.claude/rules/commit-convention.md`

## 流程

1. 分析 `git diff --staged` 的变更
2. 确定提交类型和范围
3. 生成符合规范的提交信息
4. 执行提交

## 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## 验证

- 类型必须是允许的类型之一
- 主题不超过 50 字符
- 使用祈使句
````

### 标准化审查 Skill

`.claude/skills/review.md`：

```markdown
---
name: review
description: 按照团队清单审查代码
args:
  - name: target
    description: 审查目标
    required: false
---

# 团队代码审查 Skill

按照团队审查清单进行代码审查。

## 审查清单

参考：`.claude/rules/review-checklist.md`

## 审查流程

1. 读取审查清单
2. 逐项检查代码
3. 生成审查报告
4. 提供改进建议

## 输出格式

### 通过项
- ✓ 项目名称

### 问题项
- ✗ 项目名称
  - 问题描述
  - 改进建议

### 总结
- 通过：X/Y
- 严重问题：N 个
- 建议：M 条
```

## 自动化设置

### 新成员入职脚本

`.claude/scripts/setup.sh`：

```bash
#!/bin/bash
set -e

echo "设置 Claude Code 团队配置..."

# 1. 检查依赖
echo "→ 检查依赖..."
command -v node >/dev/null 2>&1 || { echo "需要 Node.js"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "需要 Git"; exit 1; }

# 2. 安装 Claude Code
echo "→ 安装 Claude Code..."
npm install -g @anthropic-ai/claude-code

# 3. 设置 API 密钥
echo "→ 设置 API 密钥..."
if [ -z "$ANTHROPIC_API_KEY" ]; then
  read -p "请输入 Anthropic API 密钥: " api_key
  echo "export ANTHROPIC_API_KEY=$api_key" >> ~/.zshrc
  export ANTHROPIC_API_KEY=$api_key
fi

# 4. 设置 Git Hooks
echo "→ 设置 Git Hooks..."
chmod +x .claude/hooks/*.sh

# 5. 安装项目依赖
echo "→ 安装项目依赖..."
npm install

# 6. 验证配置
echo "→ 验证配置..."
claude --version
claude --list-skills

echo "✓ 设置完成！"
echo ""
echo "快速开始："
echo "  claude '帮我了解这个项目'"
echo "  claude /commit"
echo "  claude /review"
```

### CI/CD 集成

`.github/workflows/claude-check.yml`：

```yaml
name: Claude Code 检查

on:
  pull_request:
    branches: [main, develop]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: 安装 Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: 代码审查
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude /review --target "git diff origin/main...HEAD" > review.md
          cat review.md

      - name: 发布审查评论
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: review
            });
```

## 配置分层

### 全局配置

`~/.config/claude/config.json`：

```json
{
  "user": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "defaults": {
    "model": "claude-3-5-sonnet-20241022",
    "temperature": 0.7
  }
}
```

### 团队配置

`.claude/config.json`：

```json
{
  "extends": "~/.config/claude/config.json",
  "team": {
    "name": "MyTeam"
  },
  "hooks": {
    "preCommit": "./.claude/hooks/pre-commit.sh"
  }
}
```

### 个人覆盖

`.claude/config.local.json`（不纳入版本控制）：

```json
{
  "extends": "./.claude/config.json",
  "user": {
    "preferences": {
      "verboseOutput": true
    }
  }
}
```

## 配置验证

### 验证脚本

`.claude/scripts/validate-config.sh`：

```bash
#!/bin/bash

echo "验证 Claude Code 配置..."

# 检查必需文件
required_files=(
  ".claude/config.json"
  ".claude/.claudeignore"
  ".claude/rules/coding-standards.md"
  ".claude/rules/commit-convention.md"
)

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "✗ 缺少文件: $file"
    exit 1
  fi
done

# 验证 JSON 语法
if ! jq empty .claude/config.json 2>/dev/null; then
  echo "✗ config.json 语法错误"
  exit 1
fi

# 检查 Hooks 权限
for hook in .claude/hooks/*.sh; do
  if [ ! -x "$hook" ]; then
    echo "✗ Hook 没有执行权限: $hook"
    exit 1
  fi
done

echo "✓ 配置验证通过"
```

## 配置迁移

### 版本升级

`.claude/scripts/migrate.sh`：

```bash
#!/bin/bash

CURRENT_VERSION=$(jq -r '.version' .claude/config.json)
TARGET_VERSION="2.0.0"

echo "从 $CURRENT_VERSION 迁移到 $TARGET_VERSION..."

case $CURRENT_VERSION in
  "1.0.0")
    echo "→ 迁移 1.0.0 -> 1.1.0"
    # 添加新字段
    jq '.context = {"alwaysInclude": []}' .claude/config.json > .claude/config.json.tmp
    mv .claude/config.json.tmp .claude/config.json
    ;&
  "1.1.0")
    echo "→ 迁移 1.1.0 -> 2.0.0"
    # 重命名字段
    jq '.team.repository = .team.repo | del(.team.repo)' .claude/config.json > .claude/config.json.tmp
    mv .claude/config.json.tmp .claude/config.json
    ;;
esac

# 更新版本号
jq ".version = \"$TARGET_VERSION\"" .claude/config.json > .claude/config.json.tmp
mv .claude/config.json.tmp .claude/config.json

echo "✓ 迁移完成"
```

## 最佳实践

### 1. 渐进式采用

从简单配置开始，逐步增加：

```json
// 第一周：基础配置
{
  "hooks": {
    "preCommit": "./.claude/hooks/pre-commit.sh"
  }
}

// 第二周：添加 Skills
{
  "hooks": {...},
  "skills": ["commit", "review"]
}

// 第三周：完整配置
{
  "hooks": {...},
  "skills": [...],
  "rules": {...},
  "customCommands": {...}
}
```

### 2. 文档化

为每个配置项添加注释：

```json
{
  "hooks": {
    "preCommit": {
      // 提交前运行代码检查
      // 包括：linter、类型检查、单元测试
      "command": "./.claude/hooks/pre-commit.sh",
      "enabled": true
    }
  }
}
```

### 3. 版本控制

使用 `.gitignore` 排除个人配置：

```
.claude/config.local.json
.claude/logs/
.claude/.cache/
```

### 4. 定期审查

每月审查配置：
- 是否有过时的规则
- 是否需要新的 Skills
- Hooks 是否需要优化
- 文档是否需要更新

## 故障排查

### 配置不生效

```bash
# 检查配置加载顺序
claude --show-config

# 验证配置语法
jq empty .claude/config.json
```

### Hooks 未执行

```bash
# 检查权限
ls -la .claude/hooks/

# 手动测试
./.claude/hooks/pre-commit.sh
```

### Skills 未找到

```bash
# 列出可用 Skills
claude --list-skills

# 检查 Skills 目录
ls -la .claude/skills/
```

## 下一步

- 查看 [团队 Starter Kit](./team-starter-kit.md) 快速开始
- 学习 [配置片段库](./config-snippets.md) 获取示例
- 探索 [团队规则库](./team-rules.md) 了解最佳实践
