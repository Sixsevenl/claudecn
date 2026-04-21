---
title: "Headless Mode"
---

# Headless Mode

Use Claude Code's Headless mode in CI/CD environments for automated tasks.

## Basic Usage

```bash
# Run a single command in Headless mode
claude --headless "Analyze src directory and generate report"

# Output results to file
claude --headless "Run tests and generate coverage report" > report.txt

# Configure with environment variables
export ANTHROPIC_API_KEY="your-api-key"
claude --headless "Check code quality"
```

## CI/CD Integration

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
          claude --headless "Review all modified files, generate detailed report" > review.txt
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
    - claude --headless "Review code and check for security issues" > review.txt
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
                    claude --headless "Analyze code quality and security issues" > review.txt
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

## Automated Testing

```bash
# Run tests and analyze results
claude --headless "Run npm test, analyze failed tests and provide fix suggestions"

# Example output:
Test Result Analysis:

Passed: 45 tests
Failed: 3 tests

Failed tests:

1. UserService.createUser
   Error: Expected 201, received 500
   Cause: Database connection failure
   Suggestion: Check database configuration and connection pool settings

2. AuthMiddleware.verify
   Error: JWT verification failed
   Cause: Wrong key used
   Suggestion: Ensure JWT_SECRET environment variable is set correctly

3. OrderController.checkout
   Error: Timeout after 5000ms
   Cause: Payment gateway response timeout
   Suggestion: Increase timeout or add retry mechanism

Fix priority:
1. High: Database connection issue
2. Medium: JWT configuration
3. Low: Timeout settings
```

## Code Generation

```bash
# Generate test files
claude --headless "Generate complete unit tests for src/services/UserService.ts"

# Generate documentation
claude --headless "Generate API documentation for src/api directory"

# Generate configuration files
claude --headless "Create Docker configuration with Node.js 18 and PostgreSQL"
```

## Batch Processing

```bash
# Batch review multiple files
claude --headless "Review the following files: src/auth/*.ts, check for security issues"

# Batch refactoring
claude --headless "Convert all class components in src/components directory to functional components"

# Batch add types
claude --headless "Add TypeScript types to all JavaScript files in src/utils directory"
```

## Automated Reports

```bash
# Generate daily code quality report
#!/bin/bash

DATE=$(date +%Y-%m-%d)
REPORT_FILE="reports/quality-report-$DATE.md"

claude --headless "
Analyze the entire codebase, generate quality report including:
1. Code statistics (file count, line count)
2. Code quality issues
3. Security vulnerabilities
4. Test coverage
5. Performance issues
6. Improvement suggestions
" > $REPORT_FILE

echo "Report generated: $REPORT_FILE"

# Send email notification
mail -s "Daily Code Quality Report - $DATE" team@example.com < $REPORT_FILE
```

## Environment Variables

```bash
# Required environment variables
export ANTHROPIC_API_KEY="your-api-key"

# Optional configuration
export CLAUDE_MODEL="opus"           # Use Opus model
export CLAUDE_MAX_TOKENS="4096"      # Max output tokens
export CLAUDE_TEMPERATURE="0.7"      # Temperature parameter
export CLAUDE_TIMEOUT="300000"       # Timeout (milliseconds)

# Run
claude --headless "your command"
```

## Error Handling

```bash
# Script with error handling
#!/bin/bash

set -e  # Exit immediately on error

# Run Claude Code
if claude --headless "Run code review" > review.txt 2>&1; then
    echo "Review successful"
    cat review.txt
    exit 0
else
    echo "Review failed"
    cat review.txt
    exit 1
fi
```

## Parallel Execution

```bash
# Review multiple modules in parallel
#!/bin/bash

# Review auth module
claude --headless "Review src/auth directory" > auth-review.txt &

# Review API module
claude --headless "Review src/api directory" > api-review.txt &

# Review database module
claude --headless "Review src/database directory" > db-review.txt &

# Wait for all tasks to complete
wait

# Merge reports
cat auth-review.txt api-review.txt db-review.txt > full-review.txt
echo "Full review report generated: full-review.txt"
```

## Scheduled Tasks

```bash
# Run with cron
# crontab -e

# Run code review daily at 2am
0 2 * * * cd /path/to/project && claude --headless "Run daily code review" > /path/to/reports/daily-$(date +\%Y\%m\%d).txt

# Generate weekly report every Monday at 8am
0 8 * * 1 cd /path/to/project && claude --headless "Generate this week's code quality report" > /path/to/reports/weekly-$(date +\%Y\%W).txt

# Run check after each git push
# .git/hooks/post-commit
#!/bin/bash
claude --headless "Check latest commit code quality" > commit-review.txt
```

## Docker Integration

```bash
# Dockerfile
FROM node:18-alpine

# Install Claude Code
RUN npm install -g @anthropic-ai/claude-code

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Run review
CMD ["claude", "--headless", "Review code and generate report"]
```

```bash
# Run with Docker
docker build -t code-review .
docker run -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY code-review
```

## Output Formatting

```bash
# JSON format output
claude --headless --format json "Analyze code quality" > report.json

# Markdown format output
claude --headless --format markdown "Generate project documentation" > README.md

# HTML format output
claude --headless --format html "Generate test report" > report.html
```

## Cost Control

```bash
# Set cost limit
export CLAUDE_MAX_COST="1.00"  # Max spend $1.00

# Use cheaper model
export CLAUDE_MODEL="haiku"

# Limit output length
export CLAUDE_MAX_TOKENS="1000"

# Run
claude --headless "Quick code check"
```

## Best Practices

```bash
# 1. Use clear prompts
claude --headless "Check security issues in src/auth/login.ts, focus on SQL injection and XSS"

# 2. Execute complex tasks step by step
claude --headless "Step 1: Analyze code structure"
claude --headless "Step 2: Identify performance issues"
claude --headless "Step 3: Generate optimization suggestions"

# 3. Save intermediate results
claude --headless "Analyze code" > step1.txt
claude --headless "Based on step1.txt analysis, generate fix plan" > step2.txt

# 4. Use timeout protection
timeout 300 claude --headless "Long-running task"

# 5. Log output
claude --headless "Review code" 2>&1 | tee review.log
```

## Troubleshooting

```bash
# Check API Key
echo $ANTHROPIC_API_KEY

# Test connection
claude --headless "Test connection"

# View detailed logs
claude --headless --verbose "Run task"

# Debug mode
claude --headless --debug "Run task"
```

## Example: Complete CI Pipeline

```bash
#!/bin/bash
# ci-pipeline.sh

set -e

echo "Starting CI pipeline..."

# 1. Code check
echo "1. Running code checks..."
claude --headless "Run ESLint and TypeScript checks" > lint-report.txt

# 2. Security scan
echo "2. Running security scan..."
claude --headless "Scan for security vulnerabilities and dependency issues" > security-report.txt

# 3. Tests
echo "3. Running tests..."
claude --headless "Run all tests and analyze results" > test-report.txt

# 4. Performance analysis
echo "4. Running performance analysis..."
claude --headless "Analyze performance bottlenecks" > performance-report.txt

# 5. Generate summary report
echo "5. Generating summary report..."
claude --headless "
Generate summary based on the following reports:
- lint-report.txt
- security-report.txt
- test-report.txt
- performance-report.txt

Include:
1. Key issues summary
2. Fix priority
3. Improvement suggestions
" > summary-report.txt

echo "CI pipeline complete!"
echo "View summary-report.txt for details"
```

## Common Commands

```bash
claude --headless "command"              # Basic usage
claude --headless --model opus "command"  # Specify model
claude --headless --format json "command" # Specify output format
claude --headless --verbose "command"     # Verbose logging
```
