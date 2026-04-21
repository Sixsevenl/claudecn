---
title: "Code Review Workflow"
---

# Code Review Workflow

Use Claude Code for efficient code review and quality checks.

## Basic Code Review

```bash
# Start Claude Code
claude

# Review a single file
You: Review src/auth/login.ts, check for security issues and code quality

Claude: Let me review this file.

Claude wants to:
  - Read file: src/auth/login.ts
Allow? [y/n/always/never]

You: y

Claude: Code review report:

Security issues:
1. [Critical] Line 23: Password stored unencrypted
   ```typescript
   await db.users.create({ password: plainPassword });
   ```
   Recommendation: Use bcrypt to hash passwords

2. [High] Line 45: SQL injection risk
   ```typescript
   const query = `SELECT * FROM users WHERE email = '${email}'`;
   ```
   Recommendation: Use parameterized queries

Code quality:
1. [Medium] Line 12: Missing error handling
2. [Low] Line 67: Unclear variable name (usr -> user)
3. [Low] Line 89: Commented code should be removed

Performance issues:
1. [Medium] Line 34: Synchronous operation blocking main thread

Should I generate fix suggestions?
```

## Git Commit Review

```bash
You: Review the latest commit

Claude: Let me check the latest commit.

Claude wants to:
  - Run command: git log -1 --stat
  - Run command: git diff HEAD~1
Allow? [y/n/always/never]

You: y

Claude: Commit review:

Commit message: feat: add user authentication
Author: John Doe
Date: 2026-04-16 10:30:45

Modified files:
- src/auth/login.ts (added 120 lines)
- src/auth/register.ts (added 95 lines)
- src/middleware/auth.ts (modified 23 lines)
- tests/auth.test.ts (added 67 lines)

Code review findings:

Strengths:
- Added unit tests
- Clear code structure
- Uses TypeScript types

Issues:
- Missing input validation
- Incomplete error handling
- Documentation not updated

Suggestions:
1. Add input validation middleware
2. Improve error handling logic
3. Update API documentation

Do you need detailed fix suggestions?
```

## Pull Request Review

```bash
You: Review PR #123

Claude: Let me fetch the PR information.

Claude wants to:
  - Run command: gh pr view 123
  - Run command: gh pr diff 123
Allow? [y/n/always/never]

You: y

Claude: PR #123 Review Report:

Title: Implement payment processing
Author: jane-dev
Status: Open
Branch: feature/payment -> main

Change statistics:
- Files: 12
- Added: 456 lines
- Deleted: 89 lines
- Modified files:
  - src/payment/processor.ts
  - src/payment/stripe.ts
  - src/payment/paypal.ts
  - src/models/Transaction.ts
  - tests/payment.test.ts

Code review:

Architecture design:
- Good abstraction layer
- Supports multiple payment gateways
- Uses strategy pattern

Security:
- Hardcoded API key (processor.ts:12)
- Missing amount validation (stripe.ts:45)
- Needs request signature verification

Test coverage:
- Complete unit tests
- Missing integration tests
- Needs error scenario tests

Documentation:
- Missing API documentation
- README not updated

Suggestions:
1. Remove hardcoded API keys
2. Add amount validation
3. Add integration tests
4. Update documentation

Overall assessment: Needs changes before merging

Should I generate a detailed fix list?
```

## Batch File Review

```bash
You: Review all files in the src/api directory

Claude: Let me review the entire directory.

Claude wants to:
  - Run command: find src/api -name "*.ts" -type f
Allow? [y/n/always/never]

You: y

Claude: Found 15 files, starting review.

Claude wants to:
  - Read file: src/api/users.ts
  - Read file: src/api/orders.ts
  - Read file: src/api/products.ts
  [... other files]
Allow? [y/n/always/never]

You: always

Claude: Batch review complete.

Overall statistics:
- Files reviewed: 15
- Issues found: 47
- Critical: 3
- High: 8
- Medium: 15
- Low: 21

Major issues:

Critical issues (fix immediately):
1. users.ts:34 - SQL injection risk
2. orders.ts:67 - Unauthorized access vulnerability
3. products.ts:89 - Sensitive information exposure

High priority issues:
1. Missing rate limiting (8 endpoints)
2. Inconsistent error handling (12 places)
3. Missing input validation (15 places)

Code quality issues:
1. Duplicate code (23%)
2. Functions too long (average 85 lines)
3. Missing comments (67%)

Should I generate a detailed report?
```

## Code Style Check

```bash
You: Check if code style follows standards

Claude: Let me run the linter.

Claude wants to:
  - Run command: npm run lint
Allow? [y/n/always/never]

You: y

Claude: ESLint check results:

Errors: 12
Warnings: 34
Files: 45

Main issues:

Errors:
1. src/utils/format.ts:23
   'console.log' is not allowed

2. src/api/users.ts:45
   Missing return type on function

3. src/components/Button.tsx:67
   'any' type is not allowed

Warnings:
1. Unused variables: 15 places
2. Unused imports: 8 places
3. Missing type annotations: 11 places

Claude wants to:
  - Run command: npm run lint -- --fix
Allow? [y/n/always/never]

You: y

Claude: Auto-fix complete.

Fixed issues:
- Removed unused imports: 8 places
- Formatted code: 23 places
- Added semicolons: 12 places

Still needs manual fix:
- Remove console.log: 12 places
- Add return types: 5 places
- Replace any types: 3 places

Should I generate a fix guide?
```

## Performance Review

```bash
You: Review performance issues

Claude: Let me analyze performance.

Claude wants to:
  - Read file: src/components/DataTable.tsx
  - Read file: src/hooks/useData.ts
  - Read file: src/api/queries.ts
Allow? [y/n/always/never]

You: y

Claude: Performance review report:

Performance issues found:

Critical performance issues:
1. DataTable.tsx:45
   Issue: Rendering 10000 rows causes page lag
   Impact: Initial render 3.5 seconds
   Recommendation: Use virtual scrolling (react-window)

2. useData.ts:67
   Issue: New object created on every render
   Impact: Causes unnecessary child component re-renders
   Recommendation: Use useMemo for caching

3. queries.ts:89
   Issue: N+1 query problem
   Impact: 1000+ database queries
   Recommendation: Use JOIN or DataLoader

Medium performance issues:
1. Missing code splitting (bundle size 2.5MB)
2. Unoptimized images (average 1.2MB)
3. Not using CDN

Optimization suggestions:
1. Implement virtual scrolling
2. Add React.memo
3. Optimize database queries
4. Code splitting
5. Image compression

Expected improvements:
- Initial load: 3.5s -> 0.8s
- Interaction response: 500ms -> 50ms
- Bundle size: 2.5MB -> 800KB

Should I generate optimization code?
```

## Security Review

```bash
You: Perform a security review

Claude: Let me run a security scan.

Claude wants to:
  - Run command: npm audit
  - Read file: src/auth/middleware.ts
  - Read file: src/api/routes.ts
Allow? [y/n/always/never]

You: y

Claude: Security review report:

Dependency vulnerabilities:
- Critical: 2
- High: 5
- Medium: 12
- Low: 23

Critical vulnerabilities:
1. lodash@4.17.15
   Vulnerability: Prototype pollution
   CVE: CVE-2020-8203
   Fix: Upgrade to 4.17.21

2. axios@0.21.0
   Vulnerability: SSRF
   CVE: CVE-2021-3749
   Fix: Upgrade to 0.21.4

Code security issues:

Critical:
1. middleware.ts:23 - Hardcoded JWT secret
2. routes.ts:45 - Missing CSRF protection
3. auth.ts:67 - Plaintext password transmission

High:
1. Missing rate limiting
2. Unvalidated file upload types
3. Sensitive data logged

Fix recommendations:
1. Fix critical vulnerabilities immediately
2. Use environment variables for secrets
3. Implement CSRF protection
4. Enforce HTTPS
5. Implement rate limiting

Should I generate fix scripts?
```

## Test Coverage Review

```bash
You: Check test coverage

Claude: Let me run test coverage.

Claude wants to:
  - Run command: npm run test:coverage
Allow? [y/n/always/never]

You: y

Claude: Test coverage report:

Overall coverage:
- Statements: 67.8%
- Branches: 54.3%
- Functions: 71.2%
- Lines: 68.5%

File coverage:

High coverage (>80%):
- src/utils/format.ts - 95.2%
- src/hooks/useAuth.ts - 88.7%
- src/components/Button.tsx - 82.3%

Low coverage (<50%):
- src/api/payment.ts - 23.4%
- src/services/email.ts - 31.2%
- src/middleware/auth.ts - 45.6%

Untested critical features:
1. Payment processing logic
2. Email sending functionality
3. Authentication middleware

Recommendations:
1. Prioritize adding tests for payment module
2. Add integration tests
3. Increase branch coverage to 70%+

Should I generate test templates?
```

## Using Plan Mode

```bash
# Press Shift+Tab to switch to Plan Mode
[Bottom bar shows: plan mode on]

You: Comprehensively review the entire project

Claude: Project review plan:

Phase 1: Code Quality (1-2 hours)
- Run ESLint check
- Check code style consistency
- Identify duplicate code
- Check naming conventions

Phase 2: Security Review (2-3 hours)
- Scan dependency vulnerabilities
- Check authentication and authorization
- Review sensitive data handling
- Check API security

Phase 3: Performance Analysis (1-2 hours)
- Analyze bundle size
- Check rendering performance
- Review database queries
- Identify memory leaks

Phase 4: Test Coverage (2-3 hours)
- Run test coverage
- Identify untested code
- Check test quality
- Add missing tests

Phase 5: Documentation Review (1 hour)
- Check API documentation
- Review code comments
- Update README
- Check example code

Total estimated time: 7-11 hours

Ready to start execution?
```

## Automated Review Workflow

```bash
You: Create an automated code review script

Claude: I'll create the review script.

Claude wants to:
  - Write file: scripts/code-review.sh
Allow? [y/n/always/never]

You: y

Claude: Review script created:

```bash
#!/bin/bash

echo "Starting code review..."
echo "===================="

# 1. Code style check
echo "\n1. Running ESLint..."
npm run lint

# 2. Type check
echo "\n2. Running TypeScript check..."
npm run type-check

# 3. Tests
echo "\n3. Running tests..."
npm run test

# 4. Test coverage
echo "\n4. Checking test coverage..."
npm run test:coverage

# 5. Security scan
echo "\n5. Scanning dependency vulnerabilities..."
npm audit

# 6. Bundle analysis
echo "\n6. Analyzing bundle size..."
npm run build -- --analyze

# 7. Generate report
echo "\n7. Generating review report..."
echo "Review completed at: $(date)" > review-report.txt
echo "===================="
echo "Review complete! See review-report.txt"
```

Usage:
```bash
chmod +x scripts/code-review.sh
./scripts/code-review.sh
```

Should I add this to CI/CD?
```

## Common Commands

```bash
/model opus    # Use Opus for deep code review
/fast          # Use fast mode for quick checks
/cost          # Check usage cost
```

## Best Practices

1. **Regular Reviews**: Conduct comprehensive reviews weekly
2. **Automated Checks**: Integrate into CI/CD pipeline
3. **Prioritize**: Fix critical issues first
4. **Document**: Save review reports
5. **Team Collaboration**: Share review findings
