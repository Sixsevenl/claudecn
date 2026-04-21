---
title: "GitHub Actions"
---

# GitHub Actions

使用 Claude Code 与 GitHub Actions 集成，实现自动化工作流。

## 基本配置

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

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
          claude --headless "审查所有修改的文件，检查代码质量和安全问题" > review.txt
          cat review.txt

      - name: Upload Review Report
        uses: actions/upload-artifact@v3
        with:
          name: code-review-report
          path: review.txt
```

## PR 自动审查

```yaml
# .github/workflows/pr-review.yml
name: PR Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v35
        with:
          files: |
            **/*.ts
            **/*.tsx
            **/*.js
            **/*.jsx

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Review Changed Files
        if: steps.changed-files.outputs.any_changed == 'true'
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          echo "Changed files: ${{ steps.changed-files.outputs.all_changed_files }}"

          claude --headless "
          审查以下修改的文件：
          ${{ steps.changed-files.outputs.all_changed_files }}

          重点检查：
          1. 代码质量问题
          2. 安全漏洞
          3. 性能问题
          4. 最佳实践

          生成详细的审查报告
          " > review.md

      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');

            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## AI Code Review\n\n${review}`
            });
```

## 自动化测试

```yaml
# .github/workflows/test.yml
name: Test with Claude

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Analyze test results
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          分析测试结果，识别失败的测试并提供修复建议。
          如果所有测试通过，分析测试覆盖率并建议改进。
          " > test-analysis.txt
          cat test-analysis.txt

      - name: Upload test analysis
        uses: actions/upload-artifact@v3
        with:
          name: test-analysis
          path: test-analysis.txt
```

## 安全扫描

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  schedule:
    - cron: '0 0 * * 0'  # 每周日运行
  workflow_dispatch:

jobs:
  security:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --json > audit.json || true

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Analyze security issues
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          分析 audit.json 中的安全漏洞。

          对每个漏洞提供：
          1. 严重程度评估
          2. 影响范围
          3. 修复建议
          4. 优先级排序

          生成安全报告
          " > security-report.md

      - name: Create issue if vulnerabilities found
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('security-report.md', 'utf8');

            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Security Scan Report - ${new Date().toISOString().split('T')[0]}`,
              body: report,
              labels: ['security', 'automated']
            });
```

## 代码生成

```yaml
# .github/workflows/generate-tests.yml
name: Generate Tests

on:
  workflow_dispatch:
    inputs:
      file_path:
        description: 'File path to generate tests for'
        required: true
        type: string

jobs:
  generate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Generate tests
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          为 ${{ github.event.inputs.file_path }} 生成完整的单元测试。

          要求：
          1. 使用 Jest 框架
          2. 覆盖所有函数和边界情况
          3. 包含 mock 和 spy
          4. 添加详细注释
          " > generated-test.ts

      - name: Create PR with generated tests
        uses: peter-evans/create-pull-request@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "test: add tests for ${{ github.event.inputs.file_path }}"
          title: "Add tests for ${{ github.event.inputs.file_path }}"
          body: |
            Auto-generated tests by Claude Code

            File: ${{ github.event.inputs.file_path }}
          branch: auto-tests-${{ github.run_number }}
```

## 文档生成

```yaml
# .github/workflows/docs.yml
name: Generate Documentation

on:
  push:
    branches: [main]
    paths:
      - 'src/**/*.ts'
      - 'src/**/*.tsx'

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Generate API documentation
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          为 src/api 目录生成完整的 API 文档。

          包括：
          1. 端点列表
          2. 请求/响应格式
          3. 认证要求
          4. 错误代码
          5. 使用示例

          输出为 Markdown 格式
          " > docs/API.md

      - name: Commit documentation
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/API.md
          git commit -m "docs: update API documentation" || echo "No changes"
          git push
```

## 性能监控

```yaml
# .github/workflows/performance.yml
name: Performance Check

on:
  pull_request:
    branches: [main]

jobs:
  performance:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Analyze bundle size
        run: |
          du -sh dist/* > bundle-size.txt
          cat bundle-size.txt

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Analyze performance
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          分析 bundle-size.txt 中的构建产物大小。

          检查：
          1. Bundle 大小是否合理
          2. 是否有异常大的文件
          3. 代码分割是否有效
          4. 优化建议

          如果发现问题，提供详细的优化方案
          " > performance-report.md

      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('performance-report.md', 'utf8');

            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Performance Analysis\n\n${report}`
            });
```

## 依赖更新

```yaml
# .github/workflows/dependency-update.yml
name: Dependency Update Check

on:
  schedule:
    - cron: '0 9 * * 1'  # 每周一早上 9 点
  workflow_dispatch:

jobs:
  check-updates:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Check for updates
        run: npm outdated --json > outdated.json || true

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Analyze updates
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          分析 outdated.json 中的过时依赖。

          对每个依赖提供：
          1. 更新类型（major/minor/patch）
          2. 破坏性更改风险
          3. 更新优先级
          4. 更新建议

          生成更新计划
          " > update-plan.md

      - name: Create issue
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const plan = fs.readFileSync('update-plan.md', 'utf8');

            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Dependency Update Plan - ${new Date().toISOString().split('T')[0]}`,
              body: plan,
              labels: ['dependencies', 'automated']
            });
```

## 代码质量报告

```yaml
# .github/workflows/quality-report.yml
name: Weekly Quality Report

on:
  schedule:
    - cron: '0 8 * * 1'  # 每周一早上 8 点
  workflow_dispatch:

jobs:
  quality-report:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint > lint-report.txt || true

      - name: Run tests with coverage
        run: npm run test:coverage > test-report.txt || true

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Generate quality report
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          基于以下信息生成代码质量周报：

          1. lint-report.txt - 代码风格检查结果
          2. test-report.txt - 测试覆盖率报告
          3. 代码库统计信息

          报告应包括：
          - 本周代码质量概况
          - 主要问题和改进
          - 测试覆盖率趋势
          - 下周改进建议
          " > weekly-report.md

      - name: Send report
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('weekly-report.md', 'utf8');

            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Weekly Quality Report - Week ${new Date().toISOString().split('T')[0]}`,
              body: report,
              labels: ['quality', 'report', 'automated']
            });
```

## 环境变量配置

```bash
# 在 GitHub 仓库设置中添加 Secrets

# 必需的 Secret
ANTHROPIC_API_KEY=your-api-key-here

# 可选的 Secrets
CLAUDE_MODEL=opus           # 使用的模型
CLAUDE_MAX_TOKENS=4096      # 最大输出 tokens
SLACK_WEBHOOK_URL=...       # Slack 通知
EMAIL_RECIPIENT=...         # 邮件通知
```

## 复用工作流

```yaml
# .github/workflows/reusable-review.yml
name: Reusable Review Workflow

on:
  workflow_call:
    inputs:
      review-type:
        required: true
        type: string
    secrets:
      anthropic-key:
        required: true

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

      - name: Run review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.anthropic-key }}
        run: |
          claude --headless "执行 ${{ inputs.review-type }} 审查" > review.txt
          cat review.txt
```

```yaml
# 使用复用工作流
# .github/workflows/use-reusable.yml
name: Use Reusable Workflow

on: [push]

jobs:
  security-review:
    uses: ./.github/workflows/reusable-review.yml
    with:
      review-type: security
    secrets:
      anthropic-key: ${{ secrets.ANTHROPIC_API_KEY }}

  performance-review:
    uses: ./.github/workflows/reusable-review.yml
    with:
      review-type: performance
    secrets:
      anthropic-key: ${{ secrets.ANTHROPIC_API_KEY }}
```

## 矩阵构建

```yaml
# .github/workflows/matrix-test.yml
name: Matrix Test

on: [push]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: [16, 18, 20]

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js ${{ matrix.node }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Analyze results
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --headless "
          分析在 ${{ matrix.os }} 和 Node.js ${{ matrix.node }} 上的测试结果
          " > test-analysis-${{ matrix.os }}-${{ matrix.node }}.txt
```

## 最佳实践

1. **使用 Secrets 存储 API Key**
2. **限制工作流运行频率**（避免成本过高）
3. **缓存依赖**（加快构建速度）
4. **并行执行任务**（提高效率）
5. **设置超时**（防止任务卡住）
6. **保存构建产物**（便于调试）
7. **添加错误处理**（确保工作流稳定）

## 常用命令

```bash
# 本地测试工作流
act -j review

# 触发工作流
gh workflow run claude-review.yml

# 查看工作流状态
gh run list

# 查看工作流日志
gh run view <run-id> --log
```
