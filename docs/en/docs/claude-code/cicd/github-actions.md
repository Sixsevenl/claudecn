---
title: "GitHub Actions"
---

# GitHub Actions

Integrate Claude Code with GitHub Actions for automated workflows.

## Basic Configuration

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
          claude --headless "Review all modified files, check code quality and security issues" > review.txt
          cat review.txt

      - name: Upload Review Report
        uses: actions/upload-artifact@v3
        with:
          name: code-review-report
          path: review.txt
```

## PR Auto-Review

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
          Review the following modified files:
          ${{ steps.changed-files.outputs.all_changed_files }}

          Focus on:
          1. Code quality issues
          2. Security vulnerabilities
          3. Performance issues
          4. Best practices

          Generate a detailed review report
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

## Automated Testing

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
          Analyze test results, identify failed tests, and provide fix suggestions.
          If all tests pass, analyze test coverage and suggest improvements.
          " > test-analysis.txt
          cat test-analysis.txt

      - name: Upload test analysis
        uses: actions/upload-artifact@v3
        with:
          name: test-analysis
          path: test-analysis.txt
```

## Security Scan

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  schedule:
    - cron: '0 0 * * 0'  # Run every Sunday
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
          Analyze security vulnerabilities in audit.json.

          For each vulnerability provide:
          1. Severity assessment
          2. Impact scope
          3. Fix recommendations
          4. Priority ranking

          Generate security report
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

## Code Generation

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
          Generate complete unit tests for ${{ github.event.inputs.file_path }}.

          Requirements:
          1. Use Jest framework
          2. Cover all functions and edge cases
          3. Include mocks and spies
          4. Add detailed comments
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

## Documentation Generation

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
          Generate complete API documentation for the src/api directory.

          Include:
          1. Endpoint list
          2. Request/Response formats
          3. Authentication requirements
          4. Error codes
          5. Usage examples

          Output in Markdown format
          " > docs/API.md

      - name: Commit documentation
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/API.md
          git commit -m "docs: update API documentation" || echo "No changes"
          git push
```

## Performance Monitoring

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
          Analyze the build artifact sizes in bundle-size.txt.

          Check:
          1. Whether bundle sizes are reasonable
          2. Whether there are abnormally large files
          3. Whether code splitting is effective
          4. Optimization suggestions

          If issues are found, provide detailed optimization plans
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

## Dependency Updates

```yaml
# .github/workflows/dependency-update.yml
name: Dependency Update Check

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am
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
          Analyze outdated dependencies in outdated.json.

          For each dependency provide:
          1. Update type (major/minor/patch)
          2. Breaking change risk
          3. Update priority
          4. Update recommendations

          Generate update plan
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

## Code Quality Report

```yaml
# .github/workflows/quality-report.yml
name: Weekly Quality Report

on:
  schedule:
    - cron: '0 8 * * 1'  # Every Monday at 8am
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
          Generate a weekly code quality report based on:

          1. lint-report.txt - Code style check results
          2. test-report.txt - Test coverage report
          3. Codebase statistics

          Report should include:
          - This week's code quality overview
          - Key issues and improvements
          - Test coverage trends
          - Next week's improvement suggestions
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

## Environment Variables

```bash
# Add Secrets in GitHub repository settings

# Required Secret
ANTHROPIC_API_KEY=your-api-key-here

# Optional Secrets
CLAUDE_MODEL=opus           # Model to use
CLAUDE_MAX_TOKENS=4096      # Max output tokens
SLACK_WEBHOOK_URL=...       # Slack notification
EMAIL_RECIPIENT=...         # Email notification
```

## Reusable Workflows

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
          claude --headless "Perform ${{ inputs.review-type }} review" > review.txt
          cat review.txt
```

```yaml
# Using reusable workflow
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

## Matrix Build

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
          Analyze test results on ${{ matrix.os }} with Node.js ${{ matrix.node }}
          " > test-analysis-${{ matrix.os }}-${{ matrix.node }}.txt
```

## Best Practices

1. **Use Secrets to store API Keys**
2. **Limit workflow run frequency** (avoid high costs)
3. **Cache dependencies** (speed up builds)
4. **Execute tasks in parallel** (improve efficiency)
5. **Set timeouts** (prevent stuck jobs)
6. **Save build artifacts** (facilitate debugging)
7. **Add error handling** (ensure workflow stability)

## Common Commands

```bash
# Test workflow locally
act -j review

# Trigger workflow
gh workflow run claude-review.yml

# View workflow status
gh run list

# View workflow logs
gh run view <run-id> --log
```
