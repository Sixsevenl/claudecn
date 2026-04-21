---
title: "Headless 模式"
---

# Headless 模式

在 CI/CD 环境中使用 Claude Code 的 Headless 模式进行自动化任务。

## 基本用法

```bash
# Headless 模式运行单个命令
claude --headless "分析 src 目录并生成报告"

# 输出结果到文件
claude --headless "运行测试并生成覆盖率报告" > report.txt

# 使用环境变量配置
export ANTHROPIC_API_KEY="your-api-key"
claude --headless "检查代码质量"
```

## CI/CD 集成

### GitHub Actions

```bash
# .github/workflows/code-review.yml
name: Code Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "审查所有修改的文件，生成详细报告" > review.txt
          cat review.txt

      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## AI Code Review\n\n${review}`
            });
```

### GitLab CI

```bash
# .gitlab-ci.yml
code_review:
  stage: test
  image: node:18
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - claude --headless "审查代码并检查安全问题" > review.txt
    - cat review.txt
  artifacts:
    paths:
      - review.txt
    expire_in: 1 week
  only:
    - merge_requests
```

### Jenkins

```bash
# Jenkinsfile
pipeline {
    agent any

    environment {
        ANTHROPIC_API_KEY = credentials('anthropic-api-key')
    }

    stages {
        stage('Setup') {
            steps {
                sh 'npm install -g @anthropic-ai/claude-code'
            }
        }

        stage('Code Review') {
            steps {
                sh '''
                    claude --headless "分析代码质量和安全问题" > review.txt
                    cat review.txt
                '''
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'review.txt'
            }
        }
    }
}
```

## 自动化测试

```bash
# 运行测试并分析结果
claude --headless "运行 npm test，分析失败的测试并提供修复建议"

# 示例输出：
测试结果分析：

通过：45 个测试
失败：3 个测试

失败的测试：

1. UserService.createUser
   错误：Expected 201, received 500
   原因：数据库连接失败
   建议：检查数据库配置和连接池设置

2. AuthMiddleware.verify
   错误：JWT verification failed
   原因：使用了错误的密钥
   建议：确保 JWT_SECRET 环境变量正确设置

3. OrderController.checkout
   错误：Timeout after 5000ms
   原因：支付网关响应超时
   建议：增加超时时间或添加重试机制

修复优先级：
1. 高：数据库连接问题
2. 中：JWT 配置
3. 低：超时设置
```

## 代码生成

```bash
# 生成测试文件
claude --headless "为 src/services/UserService.ts 生成完整的单元测试"

# 生成文档
claude --headless "为 src/api 目录生成 API 文档"

# 生成配置文件
claude --headless "创建 Docker 配置文件，包含 Node.js 18 和 PostgreSQL"
```

## 批量处理

```bash
# 批量审查多个文件
claude --headless "审查以下文件：src/auth/*.ts，检查安全问题"

# 批量重构
claude --headless "将 src/components 目录下的所有类组件转换为函数组件"

# 批量添加类型
claude --headless "为 src/utils 目录下的所有 JavaScript 文件添加 TypeScript 类型"
```

## 自动化报告

```bash
# 生成每日代码质量报告
#!/bin/bash

DATE=$(date +%Y-%m-%d)
REPORT_FILE="reports/quality-report-$DATE.md"

claude --headless "
分析整个代码库，生成质量报告，包括：
1. 代码统计（文件数、行数）
2. 代码质量问题
3. 安全漏洞
4. 测试覆盖率
5. 性能问题
6. 改进建议
" > $REPORT_FILE

echo "报告已生成：$REPORT_FILE"

# 发送邮件通知
mail -s "每日代码质量报告 - $DATE" team@example.com < $REPORT_FILE
```

## 环境变量配置

```bash
# 必需的环境变量
export ANTHROPIC_API_KEY="your-api-key"

# 可选配置
export CLAUDE_MODEL="opus"           # 使用 Opus 模型
export CLAUDE_MAX_TOKENS="4096"      # 最大输出 tokens
export CLAUDE_TEMPERATURE="0.7"      # 温度参数
export CLAUDE_TIMEOUT="300000"       # 超时时间（毫秒）

# 运行
claude --headless "你的命令"
```

## 错误处理

```bash
# 带错误处理的脚本
#!/bin/bash

set -e  # 遇到错误立即退出

# 运行 Claude Code
if claude --headless "运行代码审查" > review.txt 2>&1; then
    echo "审查成功"
    cat review.txt
    exit 0
else
    echo "审查失败"
    cat review.txt
    exit 1
fi
```

## 并行执行

```bash
# 并行审查多个模块
#!/bin/bash

# 审查认证模块
claude --headless "审查 src/auth 目录" > auth-review.txt &

# 审查 API 模块
claude --headless "审查 src/api 目录" > api-review.txt &

# 审查数据库模块
claude --headless "审查 src/database 目录" > db-review.txt &

# 等待所有任务完成
wait

# 合并报告
cat auth-review.txt api-review.txt db-review.txt > full-review.txt
echo "完整审查报告已生成：full-review.txt"
```

## 定时任务

```bash
# 使用 cron 定时运行
# crontab -e

# 每天凌晨 2 点运行代码审查
0 2 * * * cd /path/to/project && claude --headless "运行每日代码审查" > /path/to/reports/daily-$(date +\%Y\%m\%d).txt

# 每周一早上 8 点生成周报
0 8 * * 1 cd /path/to/project && claude --headless "生成本周代码质量周报" > /path/to/reports/weekly-$(date +\%Y\%W).txt

# 每次 git push 后运行检查
# .git/hooks/post-commit
#!/bin/bash
claude --headless "检查最新提交的代码质量" > commit-review.txt
```

## Docker 集成

```bash
# Dockerfile
FROM node:18-alpine

# 安装 Claude Code
RUN npm install -g @anthropic-ai/claude-code

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 运行审查
CMD ["claude", "--headless", "审查代码并生成报告"]
```

```bash
# 使用 Docker 运行
docker build -t code-review .
docker run -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY code-review
```

## 输出格式化

```bash
# JSON 格式输出
claude --headless --format json "分析代码质量" > report.json

# Markdown 格式输出
claude --headless --format markdown "生成项目文档" > README.md

# HTML 格式输出
claude --headless --format html "生成测试报告" > report.html
```

## 成本控制

```bash
# 设置成本限制
export CLAUDE_MAX_COST="1.00"  # 最多花费 $1.00

# 使用更便宜的模型
export CLAUDE_MODEL="haiku"

# 限制输出长度
export CLAUDE_MAX_TOKENS="1000"

# 运行
claude --headless "快速代码检查"
```

## 最佳实践

```bash
# 1. 使用明确的提示词
claude --headless "检查 src/auth/login.ts 的安全问题，重点关注 SQL 注入和 XSS"

# 2. 分步执行复杂任务
claude --headless "第一步：分析代码结构"
claude --headless "第二步：识别性能问题"
claude --headless "第三步：生成优化建议"

# 3. 保存中间结果
claude --headless "分析代码" > step1.txt
claude --headless "基于 step1.txt 的分析，生成修复方案" > step2.txt

# 4. 使用超时保护
timeout 300 claude --headless "长时间任务"

# 5. 记录日志
claude --headless "审查代码" 2>&1 | tee review.log
```

## 故障排除

```bash
# 检查 API Key
echo $ANTHROPIC_API_KEY

# 测试连接
claude --headless "测试连接"

# 查看详细日志
claude --headless --verbose "运行任务"

# 调试模式
claude --headless --debug "运行任务"
```

## 示例：完整 CI 流程

```bash
#!/bin/bash
# ci-pipeline.sh

set -e

echo "开始 CI 流程..."

# 1. 代码检查
echo "1. 运行代码检查..."
claude --headless "运行 ESLint 和 TypeScript 检查" > lint-report.txt

# 2. 安全扫描
echo "2. 运行安全扫描..."
claude --headless "扫描安全漏洞和依赖问题" > security-report.txt

# 3. 测试
echo "3. 运行测试..."
claude --headless "运行所有测试并分析结果" > test-report.txt

# 4. 性能分析
echo "4. 运行性能分析..."
claude --headless "分析性能瓶颈" > performance-report.txt

# 5. 生成总结报告
echo "5. 生成总结报告..."
claude --headless "
基于以下报告生成总结：
- lint-report.txt
- security-report.txt
- test-report.txt
- performance-report.txt

包括：
1. 关键问题汇总
2. 修复优先级
3. 改进建议
" > summary-report.txt

echo "CI 流程完成！"
echo "查看 summary-report.txt 获取详细信息"
```

## 常用命令

```bash
claude --headless "命令"              # 基本用法
claude --headless --model opus "命令"  # 指定模型
claude --headless --format json "命令" # 指定输出格式
claude --headless --verbose "命令"     # 详细日志
```
