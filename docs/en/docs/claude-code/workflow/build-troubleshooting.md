---
title: "Build Troubleshooting"
---

# Build Troubleshooting

Build issues are common obstacles in development. This guide covers how to use Claude Code to quickly diagnose and resolve build problems.

## Common Build Issues

### Dependency Problems

Dependency-related build errors:

```
Build failed, error message:
Module not found: Can't resolve 'lodash'

Help me:
1. Diagnose the cause
2. Check package.json
3. Provide a solution
```

### Configuration Problems

Build failures due to configuration errors:

```
Webpack build failed:
Invalid configuration object

Analyze:
@webpack.config.js

Find:
- Configuration errors
- Correct configuration approach
- Best practices
```

### Version Conflicts

Dependency version conflicts:

```
Build warning:
peer dependency warning

Analyze the dependency tree:
- Find conflicting packages
- Determine compatible versions
- Provide solutions
```

## Systematic Troubleshooting Process

### Step 1: Gather Information

Collect complete error information:

```
Build failed, gather diagnostic information:

Need:
1. Full error stack trace
2. Build configuration files
3. package.json
4. Environment info (Node version, etc.)
5. Recent changes

Output diagnostic report
```

### Step 2: Reproduce the Problem

Ensure the problem can be reproduced:

```
Try to reproduce the build issue:

Steps:
1. Clean cache (npm cache clean)
2. Delete node_modules
3. Reinstall dependencies
4. Rebuild

Record results for each step
```

### Step 3: Isolate the Problem

Narrow down the problem scope:

```
Isolate the build issue:

Test:
1. Does it only occur in a specific environment
2. Is it related to a specific file
3. Is it related to a specific dependency
4. Which recent commit introduced it

Output problem scope
```

### Step 4: Analyze Root Cause

Find the root cause of the problem:

```
Analyze the root cause of the build failure:

Error message:
[Paste error]

Analyze:
- Direct cause of the error
- Why it happened
- Related configuration or code
- Solutions for similar issues
```

### Step 5: Implement Fix

Apply the solution:

```
Fix the build issue:

Problem: [Description]
Root cause: [Analysis result]

Fix plan:
1. Specific steps
2. Files to modify
3. Verification method

Implement fix and verify
```

## Tool-Specific Troubleshooting

### Webpack Troubleshooting

Diagnose Webpack build issues:

```
Webpack build failure troubleshooting:

Error: [Error message]

Check:
1. webpack.config.js configuration
2. Loader configuration
3. Plugin configuration
4. Entry and output configuration
5. Resolve configuration

Provide:
- Problem diagnosis
- Fix solution
- Configuration optimization suggestions
```

### Vite Troubleshooting

Diagnose Vite build issues:

```
Vite build failure troubleshooting:

Error: [Error message]

Check:
1. vite.config.js
2. Plugin configuration
3. Dependency pre-bundling
4. Environment variables
5. Path aliases

Provide solution
```

### TypeScript Troubleshooting

Diagnose TypeScript compilation issues:

```
TypeScript compilation error troubleshooting:

Error: [Error message]

Check:
1. tsconfig.json configuration
2. Type definitions
3. Module resolution
4. Compiler options
5. Type compatibility

Provide fix
```

### Babel Troubleshooting

Diagnose Babel transpilation issues:

```
Babel transpilation failure troubleshooting:

Error: [Error message]

Check:
1. .babelrc or babel.config.js
2. Preset configuration
3. Plugin configuration
4. Target environment configuration
5. Source code compatibility

Provide solution
```

## Performance Issues

### Slow Builds

Optimize build speed:

```
Build is very slow, perform performance analysis:

Current situation:
- Build time: 5 minutes
- Project size: Medium

Analysis:
1. Use build analysis tools
2. Identify slow steps
3. Find optimization opportunities

Provide:
- Performance analysis report
- Optimization suggestions
- Expected improvement
```

### Memory Issues

Resolve build memory problems:

```
Build runs out of memory:

Error: JavaScript heap out of memory

Solutions:
1. Increase Node memory limit
2. Optimize build configuration
3. Analyze memory usage
4. Reduce concurrent tasks

Provide specific solutions
```

### Large Bundle Size

Optimize bundle size:

```
Bundle size too large investigation:

Current: bundle.js 5MB

Analysis:
1. Use bundle analyzer
2. Identify large dependencies
3. Find duplicate code
4. Check unused code

Provide:
- Size analysis report
- Optimization plan
- Expected reduction
```

## Environment-Related Issues

### Cross-Platform Issues

Resolve cross-platform build problems:

```
Build fails on Windows but works on Mac:

Error: [Error message]

Check:
1. Path separators
2. Filename case sensitivity
3. Line endings (CRLF vs LF)
4. Environment variables
5. Script compatibility

Provide cross-platform solution
```

### Node Version Issues

Resolve Node version compatibility problems:

```
Different Node versions produce different build results:

Current version: Node 16
Target version: Node 18

Check:
1. package.json engines field
2. Dependency Node version requirements
3. Node APIs used
4. Build tool compatibility

Provide version compatibility solution
```

### CI/CD Environment Issues

Resolve CI/CD build problems:

```
Build succeeds locally but fails in CI:

CI error: [Error message]

Compare:
1. Environment variables
2. Node version
3. Dependency versions
4. Build scripts
5. Cache strategy

Find differences and fix
```

## Dependency Management Issues

### Lock File Conflicts

Resolve lock file problems:

```
package-lock.json conflict:

Problem:
- Merge conflict
- Version inconsistency

Solution:
1. Understand the role of lock files
2. Properly resolve conflicts
3. Verify dependency integrity
4. Update lock file

Provide detailed steps
```

### Phantom Dependencies

Identify and resolve phantom dependencies:

```
Check for phantom dependencies:

Analysis:
- Dependencies used in code but not declared
- Dependencies pulled in indirectly through other packages

Solution:
1. Identify all phantom dependencies
2. Add to package.json
3. Verify build

Provide complete list and fix
```

### Dependency Security Issues

Resolve dependency security vulnerabilities:

```
npm audit found security vulnerabilities:

Vulnerabilities: [List]

Handle:
1. Assess vulnerability severity
2. Check for fix versions
3. Update dependencies
4. If unable to update, find alternatives

Provide fix plan
```

## Cache Issues

### Clearing Cache

Clear various caches:

```
Build results are incorrect, possibly a cache issue:

Clear:
1. npm/yarn/pnpm cache
2. Build tool cache (Webpack/Vite)
3. TypeScript cache
4. IDE cache
5. node_modules

Provide cleanup script
```

### Cache Strategy

Optimize cache strategy:

```
Optimize build caching:

Goals:
- Speed up builds
- Ensure cache correctness

Configuration:
1. Dependency caching
2. Build caching
3. Cache invalidation strategy
4. CI/CD caching

Provide configuration plan
```

## Debugging Tips

### Verbose Logging

Enable verbose logging:

```
Enable build verbose logging:

Tools:
- npm: npm run build --verbose
- webpack: --progress --profile
- vite: --debug

Analyze logs to find issues
```

### Incremental Build

Debug incrementally:

```
Incremental build debugging:

Steps:
1. Comment out all entry points
2. Enable one at a time
3. Find the file causing failure
4. Analyze the file's issues

Record results for each step
```

### Minimal Reproduction

Create a minimal reproduction case:

```
Create a minimal reproduction case:

Goal:
- Isolate the problem
- Make it easy to debug
- Make it easy to report bugs

Steps:
1. Create a new project
2. Include only necessary code
3. Reproduce the issue
4. Gradually simplify

Output minimal case
```

## Common Error Solutions

### Module not found

```
Error: Module not found: Can't resolve 'xxx'

Possible causes:
1. Dependency not installed
2. Incorrect path
3. Alias misconfiguration
4. File extension issue

Solutions:
1. Check package.json
2. Verify file path
3. Check resolve configuration
4. Install missing dependencies
```

### Syntax Error

```
Error: SyntaxError: Unexpected token

Possible causes:
1. Using unsupported syntax
2. Incorrect Babel configuration
3. File not processed correctly
4. Source version issue

Solutions:
1. Check target environment
2. Configure correct preset
3. Add necessary plugins
4. Check loader configuration
```

### Out of Memory

```
Error: JavaScript heap out of memory

Solutions:
1. Increase memory limit
   NODE_OPTIONS=--max-old-space-size=4096

2. Optimize build configuration
   - Reduce concurrency
   - Use incremental builds
   - Optimize loaders

3. Analyze memory usage
   - Use heap snapshot
   - Find memory leaks
```

## Prevention Measures

### Build Checklist

Establish a build checklist:

```markdown
## Pre-Build Checks

- [ ] Dependencies installed
- [ ] Configuration files correct
- [ ] Environment variables set
- [ ] Node version correct
- [ ] Cache cleared (if needed)

## Post-Build Checks

- [ ] Build successful
- [ ] Output files correct
- [ ] Bundle size reasonable
- [ ] Functionality working
- [ ] Performance acceptable
```

### Continuous Monitoring

Monitor build health:

```
Establish build monitoring:

Metrics:
- Build time
- Build success rate
- Bundle size
- Dependency security

Alerts:
- Build time exceeds threshold
- Build fails
- Size increase too large
- Security vulnerabilities found

Output monitoring dashboard
```

### Documentation

Record common issues and solutions:

```
Create a build issue knowledge base:

Content:
- Common issues
- Solutions
- Prevention measures
- Best practices

Format: FAQ or problem-solution pairs
Location: docs/troubleshooting/build.md
```

## Tool Recommendations

### Diagnostic Tools

```
Recommended build diagnostic tools:

Analysis tools:
- webpack-bundle-analyzer
- source-map-explorer
- speed-measure-webpack-plugin

Debugging tools:
- node --inspect
- Chrome DevTools
- VS Code debugger

Monitoring tools:
- build-tracker
- bundlesize
```

### Automation Scripts

```
Create a build troubleshooting script:

Features:
1. Environment check
2. Dependency verification
3. Configuration validation
4. Cache cleanup
5. Diagnostic report

Script: scripts/diagnose-build.sh
```

## Best Practices

1. Keep dependencies updated
2. Use lock files
3. Configure reasonable caching
4. Monitor build performance
5. Document build issues
6. Regularly clean and optimize
7. Use CI/CD for verification
8. Establish troubleshooting processes

## Summary

Effective build troubleshooting requires:

- Systematic troubleshooting process
- Deep understanding of build tools
- Rich problem-solving experience
- Comprehensive monitoring and prevention mechanisms

With Claude Code's help, you can diagnose and resolve build issues more quickly, keeping your development workflow smooth.
