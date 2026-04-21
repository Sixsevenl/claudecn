---
title: "Dead Code Cleanup"
---

# Dead Code Cleanup

Dead code (unused code) increases maintenance costs, impacts performance, and causes confusion. This guide covers how to use Claude Code to safely identify and clean up dead code.

## What is Dead Code

### Types of Dead Code

**Unused imports:**
```typescript
import { unused } from 'lodash'; // Never used
import { debounce } from 'lodash'; // Actually used
```

**Unused functions:**
```typescript
// Never called
function oldFunction() {
  // ...
}
```

**Unused variables:**
```typescript
const unusedVar = 'value'; // Never used
```

**Deprecated code:**
```typescript
// Old implementation, replaced
// function oldImplementation() {
//   // ...
// }
```

**Unused components:**
```typescript
// React component never referenced
export function UnusedComponent() {
  return <div>Never used</div>;
}
```

### Harm of Dead Code

- Increases codebase size
- Increases bundle size
- Reduces code readability
- Increases maintenance costs
- May contain security vulnerabilities
- Causes confusion and misleading

## Identifying Dead Code

### Using Claude for Analysis

Have Claude identify dead code:

```
Analyze dead code in the project:

Check for:
- Unused imports
- Unused functions
- Unused variables
- Unused components
- Unused type definitions

Scope: src/ directory

Output:
- Dead code list
- Grouped by file
- Risk level marked
```

### Analyzing Specific Files

Analyze individual files:

```
Analyze dead code in this file:
@src/utils/helpers.ts

Identify:
- Unused exports
- Unused internal functions
- Unused variables

Provide:
- Detailed list
- Whether safe to delete
- Deletion recommendations
```

### Analyzing Dependencies

Understand code usage:

```
Analyze UserService usage:

Check:
- Which files import it
- Which methods are used
- Which methods are unused

Output:
- Usage relationship diagram
- List of unused methods
- Cleanup recommendations
```

## Safe Cleanup Process

### Step 1: Identify and Classify

Identify and classify dead code:

```
Identify and classify dead code:

Categories:
1. Clearly unused (safe to delete)
2. Possibly unused (needs verification)
3. Appears unused but actually used (dynamic references, etc.)
4. Deprecated but needs keeping (backward compatibility)

For each category:
- List the code
- Explain the reason
- Provide recommendations
```

### Step 2: Verify Impact

Verify the impact of deletion:

```
Verify the impact of deleting this code:

Code:
- src/utils/oldHelper.ts
- src/components/OldButton.tsx

Check:
1. Are there dynamic references
2. Is it used in tests
3. Is it referenced in configuration
4. Is it depended on externally

Output risk assessment
```

### Step 3: Create Cleanup Plan

Develop a cleanup plan:

```
Develop a dead code cleanup plan:

Dead code list: [List]

Plan:
1. Priority ranking
2. Batch cleanup
3. Scope of each batch
4. Verification method
5. Rollback plan

Timeline: 2 weeks
```

### Step 4: Execute Cleanup

Execute cleanup operations:

```
Execute dead code cleanup:

Batch 1: Clearly unused imports

Steps:
1. Remove unused imports
2. Run linter
3. Run tests
4. Verify build
5. Create commit

If all checks pass, continue to next batch
```

### Step 5: Verify and Test

Comprehensively verify cleanup results:

```
Verify dead code cleanup:

Check:
1. All tests pass
2. Build succeeds
3. Application functions correctly
4. No performance regression
5. Bundle size reduced

Output verification report
```

## Tool Assistance

### ESLint

Use ESLint to detect unused code:

```
Configure ESLint to detect dead code:

Rules:
- no-unused-vars
- no-unused-imports (requires plugin)
- @typescript-eslint/no-unused-vars

Configuration:
{
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
  }
}
```

### TypeScript

Use TypeScript to detect unused code:

```
Configure TypeScript detection:

tsconfig.json:
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

Run: tsc --noEmit
```

### Dependency Analysis Tools

Use tools to analyze dependencies:

```
Use depcheck to detect unused dependencies:

Install: npm install -g depcheck

Run: depcheck

Output:
- Unused dependencies
- Missing dependencies
- Suggested actions
```

### Bundle Analysis

Analyze bundle results:

```
Use webpack-bundle-analyzer:

Configuration:
plugins: [
  new BundleAnalyzerPlugin()
]

Analysis:
- Which modules are bundled
- Module sizes
- Unused code

Identify code that can be deleted
```

## Special Case Handling

### Dynamic Imports

Handle dynamically imported code:

```
Check dynamic imports:

Search patterns:
- require(variable)
- import(variable)
- eval()

For each dynamic import:
- Understand its purpose
- Determine if it's truly needed
- If possible, convert to static import
```

### Conditional Exports

Handle conditionally exported code:

```
Analyze conditional exports:

Code:
if (process.env.NODE_ENV === 'development') {
  export { DevTool };
}

Handle:
- Understand the condition
- Determine if needed
- Consider environment differences
```

### Backward Compatibility

Handle deprecated code that needs keeping:

```
Mark deprecated but retained code:

/**
 * @deprecated Use newFunction instead
 * Retained for backward compatibility, will be removed in v3.0
 */
export function oldFunction() {
  // ...
}

Add:
- Deprecation warning
- Migration guide
- Removal plan
```

### Test Code

Handle dead code in tests:

```
Clean up dead code in tests:

Check:
- Unused test utilities
- Unused mocks
- Deprecated test cases

Clean up:
- Remove unused code
- Update tests
- Maintain test coverage
```

## Automated Cleanup

### Automation Scripts

Create automated cleanup scripts:

```bash
#!/bin/bash
# scripts/clean-dead-code.sh

echo "Detecting dead code..."

# Run ESLint
npm run lint

# Run TypeScript check
npm run type-check

# Run depcheck
npx depcheck

# Generate report
echo "Dead code detection complete, review report"
```

### CI/CD Integration

Detect dead code in CI/CD:

```yaml
# .github/workflows/dead-code-check.yml
name: Dead Code Check

on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Check unused code
        run: |
          npm run lint
          npm run type-check
          npx depcheck
      - name: Comment PR
        if: failure()
        uses: actions/github-script@v5
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Unused code detected, please clean up before merging'
            })
```

### Regular Cleanup

Establish regular cleanup mechanisms:

```
Establish regular cleanup process:

Frequency: Monthly

Process:
1. Run dead code detection
2. Generate cleanup report
3. Evaluate cleanup priorities
4. Assign cleanup tasks
5. Execute cleanup
6. Verify results

Record:
- Amount of code cleaned
- Size reduction
- Issues encountered
```

## Cleanup Strategy

### Incremental Cleanup

Adopt an incremental cleanup strategy:

```
Incremental cleanup plan:

Phase 1: Low-risk cleanup
- Unused imports
- Clearly unused variables
- Commented-out code

Phase 2: Medium-risk cleanup
- Unused functions
- Unused components
- Unused utilities

Phase 3: High-risk cleanup
- Deprecated APIs
- Old implementations
- Complex dependencies

For each phase:
- Test thoroughly
- Progress gradually
- Roll back if needed
```

### Priority Ranking

Clean up by priority:

```
Cleanup priorities:

High priority:
- Dead code affecting performance
- Code with security issues
- Large unused dependencies

Medium priority:
- Unused components
- Unused utility functions
- Deprecated APIs

Low priority:
- Unused type definitions
- Unused constants
- Commented-out code
```

## Prevention Measures

### Code Review

Watch for dead code in code reviews:

```
Code review checklist:

Check items:
- [ ] No unused imports
- [ ] No unused variables
- [ ] No commented-out code
- [ ] New code is all used
- [ ] Related dead code removed
```

### Development Standards

Establish standards to prevent dead code:

```
Development standards:

1. Promptly delete unused code
2. Don't comment out code, use Git history
3. Clean up related code during refactoring
4. Use linter for detection
5. Regularly review and clean up
```

### Tool Configuration

Configure tools for automatic detection:

```
Configure automatic detection:

1. ESLint configuration
   - Enable unused code detection
   - Set to error level

2. TypeScript configuration
   - noUnusedLocals: true
   - noUnusedParameters: true

3. IDE configuration
   - Highlight unused code
   - Provide quick fixes

4. Git hooks
   - Pre-commit check
   - Block commits with dead code
```

## Documentation

### Recording Cleanup Process

Document cleanup activities:

```markdown
# Dead Code Cleanup Log

## 2024-01-15 Cleanup

### What was cleaned
- Deleted 50 unused imports
- Deleted 10 unused components
- Deleted 5 unused utility functions

### Impact
- Lines of code reduced: 500
- Bundle size reduced: 50KB
- Build time reduced: 5 seconds

### Issues
- None

### Lessons learned
- Use automation tools for efficiency
- Batch cleanup reduces risk
```

### Maintaining Cleanup List

Maintain a list of items to clean:

```markdown
# Dead Code to Clean

## High Priority
- [ ] src/legacy/ directory (deprecated code)
- [ ] Unused large dependency packages

## Medium Priority
- [ ] src/utils/old-helpers.ts
- [ ] src/components/deprecated/

## Low Priority
- [ ] Unused type definitions
- [ ] Commented-out code
```

## Best Practices

1. Regularly detect and clean up
2. Use automation tools
3. Incremental cleanup
4. Thoroughly test and verify
5. Document cleanup process
6. Establish prevention mechanisms
7. Team participation
8. Continuously improve processes

## Summary

Safe dead code cleanup requires:

- Systematic identification methods
- Careful verification process
- Appropriate tool support
- Comprehensive prevention mechanisms

With Claude Code and automation tools, you can safely and efficiently clean up dead code, keeping your codebase healthy.
