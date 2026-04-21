---
title: "Examples"
---

# Agent Skills Examples

This page provides a rich collection of practical Agent Skills examples covering various development scenarios and use cases.

## Git Workflow Skills

### Smart Commit Skill

```bash
# Create smart commit Skill
cat > .claude/skills/commit.md << 'EOF'
---
name: commit
description: Analyze code changes and generate semantic commit messages
---

Execute smart commit workflow:
1. Run git status to view changed files
2. Run git diff to analyze specific changes
3. Identify change type (feat/fix/refactor/docs etc.)
4. Generate a commit message following Conventional Commits
5. Ask user for confirmation before executing commit
EOF
```

**Usage example:**

```bash
You: /commit

Claude: Analyzing your code changes...

Claude wants to:
  • Run command: git status
  • Run command: git diff
Allow? [y/n]

You: y

Claude: Detected the following changes:

Modified files:
- src/components/UserProfile.tsx (added avatar property)
- src/api/users.ts (added avatar upload endpoint)
- tests/users.test.ts (added avatar test cases)

Change type: Feature addition

Suggested commit message:
feat(user): Add avatar upload functionality

- Add avatar prop to UserProfile component
- Implement avatar upload API endpoint
- Include test coverage for avatar feature

Use this commit message? [y/n]

You: y

Claude wants to:
  • Run command: git add src/components/UserProfile.tsx src/api/users.ts tests/users.test.ts
  • Run command: git commit -m "feat(user): Add avatar upload functionality..."
Allow? [y/n]

You: y

Claude: Commit successful!
Commit hash: a3f2b1c
```

### Branch Sync Skill

```bash
cat > .claude/skills/sync.md << 'EOF'
---
name: sync
description: Sync remote branches and handle conflicts
---

Branch sync workflow:
1. Save current work state
2. Pull latest remote code
3. Detect and handle merge conflicts
4. Restore work state
5. Report sync results
EOF
```

**Usage example:**

```bash
You: /sync

Claude: Starting remote branch sync...

Current branch: feature/user-auth
Remote branch: origin/feature/user-auth

Claude wants to:
  • Run command: git stash
  • Run command: git pull origin feature/user-auth
Allow? [y/n]

You: y

Claude: Merge conflict detected:
- src/auth/middleware.ts (3 conflicts)

Conflict content:
<<<<<<< HEAD
export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
=======
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
>>>>>>> origin/feature/user-auth

Suggested resolution:
Use remote version (includes TypeScript type definitions)

Auto-resolve? [y/n]

You: y

Claude: Conflict resolved.

Claude wants to:
  • Run command: git add src/auth/middleware.ts
  • Run command: git commit -m "Merge remote changes"
  • Run command: git stash pop
Allow? [y/n]

You: y

Claude: Sync complete!
- Merged 3 commits
- Resolved 1 conflict
- Work state restored
```

## Code Quality Skills

### Code Review Skill

```bash
cat > .claude/skills/review.md << 'EOF'
---
name: review
description: Perform comprehensive code review
---

Code review checklist:
1. Code style and formatting
2. Type safety
3. Error handling
4. Performance issues
5. Security vulnerabilities
6. Best practices
7. Test coverage
EOF
```

**Usage example:**

```bash
You: /review src/api/payment.ts

Claude: Reviewing src/api/payment.ts...

Claude wants to:
  • Read file: src/api/payment.ts
Allow? [y/n]

You: y

Claude: Code Review Report

File: /Users/project/src/api/payment.ts
Lines: 156
Complexity: Medium

Issues found:

1. Security issue (Critical)
   Lines 23-25:
   ```typescript
   const apiKey = "sk_live_abc123"; // Hardcoded API key
   ```
   Suggestion: Use environment variables for sensitive information

2. Error handling (Important)
   Lines 45-52:
   ```typescript
   async function processPayment(amount: number) {
     const result = await stripe.charges.create({ amount });
     return result;
   }
   ```
   Suggestion: Add try-catch error handling

3. Type safety (Minor)
   Line 67:
   ```typescript
   function calculateFee(amount: any) {
   ```
   Suggestion: Use a specific type instead of any

4. Performance (Hint)
   Lines 89-95: Async calls in a loop
   Suggestion: Use Promise.all for parallel processing

Code quality score: C+

Recommend fixing security issues and error handling first.
```

### Refactoring Suggestion Skill

```bash
cat > .claude/skills/refactor.md << 'EOF'
---
name: refactor
description: Analyze code and provide refactoring suggestions
---

Refactoring analysis:
1. Identify code smells
2. Detect duplicate code
3. Analyze function complexity
4. Evaluate maintainability
5. Provide specific refactoring plans
EOF
```

**Usage example:**

```bash
You: /refactor src/utils/validation.ts

Claude: Analyzing refactoring opportunities in validation.ts...

Claude wants to:
  • Read file: src/utils/validation.ts
Allow? [y/n]

You: y

Claude: Refactoring Suggestion Report

Detected issues:

1. Duplicate code (3 occurrences)
   Functions validateEmail, validatePhone, validateAddress have similar validation logic

   Current code:
   ```typescript
   function validateEmail(email: string): boolean {
     if (!email) return false;
     if (email.length < 5) return false;
     if (!email.includes('@')) return false;
     return true;
   }

   function validatePhone(phone: string): boolean {
     if (!phone) return false;
     if (phone.length < 10) return false;
     if (!/^\d+$/.test(phone)) return false;
     return true;
   }
   ```

   Suggested refactoring:
   ```typescript
   interface ValidationRule {
     minLength?: number;
     pattern?: RegExp;
     required?: boolean;
   }

   function validate(value: string, rules: ValidationRule): boolean {
     if (rules.required && !value) return false;
     if (rules.minLength && value.length < rules.minLength) return false;
     if (rules.pattern && !rules.pattern.test(value)) return false;
     return true;
   }

   const validateEmail = (email: string) =>
     validate(email, { required: true, minLength: 5, pattern: /@/ });

   const validatePhone = (phone: string) =>
     validate(phone, { required: true, minLength: 10, pattern: /^\d+$/ });
   ```

2. High complexity function
   Function validateForm (lines 89-145) cyclomatic complexity: 12
   Suggestion: Split into smaller functions

Apply these refactorings? [y/n]
```

## Testing Skills

### Test Generation Skill

```bash
cat > .claude/skills/generate-tests.md << 'EOF'
---
name: generate-tests
description: Generate test cases for a specified file
---

Test generation workflow:
1. Analyze source code structure
2. Identify public functions and methods
3. Generate unit tests
4. Include boundary case tests
5. Add mocks and fixtures
EOF
```

**Usage example:**

```bash
You: /generate-tests src/utils/calculator.ts

Claude: Generating tests for calculator.ts...

Claude wants to:
  • Read file: src/utils/calculator.ts
Allow? [y/n]

You: y

Claude: Analyzing source code...

Found 4 public functions:
- add(a: number, b: number): number
- subtract(a: number, b: number): number
- multiply(a: number, b: number): number
- divide(a: number, b: number): number

Generating test file:

Claude wants to:
  • Create file: tests/utils/calculator.test.ts
Allow? [y/n]

You: y

Claude: Test file created:

tests/utils/calculator.test.ts:
```typescript
import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '@/utils/calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });

    it('should handle decimal results', () => {
      expect(divide(5, 2)).toBe(2.5);
    });
  });

  // ... more tests
});
```

Estimated test coverage: 95%
```

### Test Runner Skill

```bash
cat > .claude/skills/test.md << 'EOF'
---
name: test
description: Run test suite and generate report
---

Test execution workflow:
1. Run all tests
2. Collect coverage data
3. Identify failed tests
4. Generate detailed report
5. Provide fix suggestions
EOF
```

**Usage example:**

```bash
You: /test

Claude: Running test suite...

Claude wants to:
  • Run command: npm test -- --coverage
Allow? [y/n]

You: y

Claude: Test execution results:

Passed: 42 tests
Failed: 3 tests
Skipped: 1 test
Total: 46 tests

Failed tests:

1. UserService > createUser > should validate email
   Error: Expected "invalid" to be a valid email
   File: tests/services/user.test.ts:23

2. PaymentService > processPayment > should handle timeout
   Error: Timeout exceeded (5000ms)
   File: tests/services/payment.test.ts:45

3. AuthMiddleware > should reject invalid token
   Error: Expected 401, received 500
   File: tests/middleware/auth.test.ts:67

Code coverage:
- Statements: 87.3%
- Branches: 82.1%
- Functions: 91.2%
- Lines: 86.8%

Uncovered files:
- src/utils/legacy.ts (0%)
- src/config/deprecated.ts (12%)

Recommendations:
1. Fix email validation logic
2. Increase payment timeout or optimize processing
3. Check auth middleware error handling
```

## Project Management Skills

### Project Initialization Skill

```bash
cat > .claude/skills/init-project.md << 'EOF'
---
name: init-project
description: Initialize new project structure
---

Project initialization steps:
1. Create standard directory structure
2. Initialize git repository
3. Set up package.json
4. Configure TypeScript
5. Add ESLint and Prettier
6. Create .env.example
7. Generate README.md
EOF
```

**Usage example:**

```bash
You: /init-project my-api

Claude: Initializing project my-api...

Claude wants to:
  • Run command: mkdir -p my-api/{src,tests,docs}
  • Run command: cd my-api && git init
  • Create file: my-api/package.json
  • Create file: my-api/tsconfig.json
  • Create file: my-api/.eslintrc.js
  • Create file: my-api/.prettierrc
  • Create file: my-api/.env.example
  • Create file: my-api/README.md
Allow? [y/n]

You: y

Claude: Project structure created:

my-api/
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

Next steps:
1. cd my-api
2. npm install
3. Configure .env file
4. npm run dev
```

### Dependency Update Skill

```bash
cat > .claude/skills/update-deps.md << 'EOF'
---
name: update-deps
description: Safely update project dependencies
---

Dependency update workflow:
1. Check for outdated packages
2. Identify breaking changes
3. Update compatible versions
4. Run tests to verify
5. Generate update report
EOF
```

**Usage example:**

```bash
You: /update-deps

Claude: Checking project dependencies...

Claude wants to:
  • Run command: npm outdated
Allow? [y/n]

You: y

Claude: Found 12 outdated packages:

Security updates (recommended immediate update):
- express: 4.17.1 → 4.18.2 (security patch)
- jsonwebtoken: 8.5.1 → 9.0.2 (security vulnerability fix)

Minor version updates (backward compatible):
- typescript: 5.0.4 → 5.3.3
- eslint: 8.42.0 → 8.56.0
- vitest: 0.32.0 → 1.2.1

Major version updates (possible breaking changes):
- react: 18.2.0 → 19.0.0
- vite: 4.3.9 → 5.0.11

Update strategy recommendation:
1. Update security patches first
2. Then update minor versions
3. Finally evaluate major version updates

Execute security updates? [y/n]

You: y

Claude wants to:
  • Run command: npm update express jsonwebtoken
  • Run command: npm test
Allow? [y/n]

You: y

Claude: Security updates complete!

Updated packages:
- express: 4.17.1 → 4.18.2
- jsonwebtoken: 8.5.1 → 9.0.2

Test results: All passed (46/46)

Suggested next step:
Run /update-deps --minor to update minor versions
```

## Deployment Skills

### Build Check Skill

```bash
cat > .claude/skills/pre-deploy.md << 'EOF'
---
name: pre-deploy
description: Pre-deployment checklist
---

Pre-deployment checks:
1. Code linting
2. Type checking
3. Tests pass
4. Build succeeds
5. Environment variable validation
6. Dependency security audit
EOF
```

**Usage example:**

```bash
You: /pre-deploy

Claude: Executing pre-deployment checks...

[1/6] Code linting...
Claude wants to:
  • Run command: npm run lint
Allow? [y/n]

You: y

Claude: ✓ Code linting passed

[2/6] Type checking...
Claude wants to:
  • Run command: npm run type-check
Allow? [y/n]

You: y

Claude: ✓ Type checking passed

[3/6] Running tests...
Claude wants to:
  • Run command: npm test
Allow? [y/n]

You: y

Claude: ✓ All tests passed (46/46)

[4/6] Building project...
Claude wants to:
  • Run command: npm run build
Allow? [y/n]

You: y

Claude: ✓ Build successful
  Output: dist/ (2.3 MB)

[5/6] Validating environment variables...
Claude wants to:
  • Read file: .env.example
  • Read file: .env.production
Allow? [y/n]

You: y

Claude: ✗ Missing environment variables
  Missing from .env.production:
  - DATABASE_URL
  - REDIS_URL
  - JWT_SECRET

[6/6] Dependency security audit...
Claude wants to:
  • Run command: npm audit
Allow? [y/n]

You: y

Claude: ✓ No security vulnerabilities found

Deployment check results:
✓ Code quality
✓ Tests
✓ Build
✗ Environment configuration
✓ Security

Status: Failed
Please configure the missing environment variables and try again.
```

### Deploy Skill

```bash
cat > .claude/skills/deploy.md << 'EOF'
---
name: deploy
description: Deploy application to specified environment
---

Deployment workflow:
1. Run pre-deployment checks
2. Confirm target environment
3. Build production version
4. Upload to server
5. Run database migrations
6. Restart services
7. Health check
8. Send notification
EOF
```

**Usage example:**

```bash
You: /deploy production

Claude: Preparing to deploy to production...

⚠️ This will affect the production environment. Please confirm:
- Target: production
- Branch: main
- Version: v2.3.1

Continue? [y/n]

You: y

Claude: Running pre-deployment checks...
✓ All checks passed

Claude wants to:
  • Run command: npm run build:production
  • Run command: rsync -avz dist/ user@server:/var/www/app/
  • Run command: ssh user@server "cd /var/www/app && npm run migrate"
  • Run command: ssh user@server "pm2 restart app"
Allow? [y/n]

You: y

Claude: Deployment progress:

[1/4] Building production version...
✓ Build complete (2.1 MB)

[2/4] Uploading files...
✓ 156 files uploaded

[3/4] Database migration...
✓ 3 migrations executed

[4/4] Restarting services...
✓ Services restarted

Health check...
✓ API responding normally (200 OK)
✓ Database connection normal
✓ Redis connection normal

Deployment successful!
Version: v2.3.1
Time: 2024-01-15 14:30:00
URL: https://api.example.com

Notification sent to Slack #deployments
```

## Documentation Generation Skills

### API Documentation Generation Skill

```bash
cat > .claude/skills/generate-api-docs.md << 'EOF'
---
name: generate-api-docs
description: Generate API documentation from code
---

API documentation generation:
1. Scan route definitions
2. Extract endpoint information
3. Analyze request/response types
4. Generate OpenAPI specification
5. Create Markdown documentation
EOF
```

**Usage example:**

```bash
You: /generate-api-docs

Claude: Generating API documentation...

Claude wants to:
  • Read file: src/routes/users.ts
  • Read file: src/routes/auth.ts
  • Read file: src/routes/posts.ts
Allow? [y/n]

You: y

Claude: Analyzing API endpoints...

Found 15 endpoints:
- POST /api/auth/login
- POST /api/auth/register
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id
- GET /api/posts
- POST /api/posts
...

Generating documentation...

Claude wants to:
  • Create file: docs/api/README.md
  • Create file: docs/api/openapi.yaml
Allow? [y/n]

You: y

Claude: API documentation generated:

docs/api/README.md:
```markdown
# API Documentation

## Authentication

### POST /api/auth/login
Login and get access token

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
```

**Status codes:**
- 200: Login successful
- 401: Authentication failed
- 400: Invalid request parameters

## User Management

### GET /api/users
Get user list

**Query parameters:**
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- sort: Sort field

...
```

OpenAPI specification saved to: docs/api/openapi.yaml
```

## Performance Optimization Skills

### Performance Analysis Skill

```bash
cat > .claude/skills/analyze-performance.md << 'EOF'
---
name: analyze-performance
description: Analyze application performance bottlenecks
---

Performance analysis:
1. Bundle size analysis
2. Dependency analysis
3. Code splitting check
4. Rendering performance analysis
5. Network request optimization
6. Generate optimization recommendations
EOF
```

**Usage example:**

```bash
You: /analyze-performance

Claude: Analyzing application performance...

Claude wants to:
  • Run command: npm run build -- --analyze
Allow? [y/n]

You: y

Claude: Build analysis complete

Bundle size analysis:
Total size: 2.8 MB (gzip: 856 KB)

Largest dependencies:
1. moment.js - 289 KB (10.3%)
   Suggestion: Replace with date-fns (save ~200KB)

2. lodash - 245 KB (8.7%)
   Suggestion: Use tree-shaking imports or replace with native methods

3. chart.js - 198 KB (7.1%)
   Suggestion: Consider a lighter chart library

Code splitting analysis:
- Main bundle: 1.2 MB (too large)
- Route lazy loading: Not implemented
- Component lazy loading: Partially implemented

Suggested optimizations:

1. Dependency optimization (estimated reduction of 450KB)
   ```bash
   npm uninstall moment
   npm install date-fns
   ```

2. Implement route lazy loading
   ```typescript
   // Before
   import UserPage from './pages/User';

   // After optimization
   const UserPage = lazy(() => import('./pages/User'));
   ```

3. Enable Tree Shaking
   ```javascript
   // vite.config.ts
   export default {
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             utils: ['date-fns', 'axios']
           }
        }
       }
     }
   }
   ```

Expected optimization results:
- Bundle size: 2.8 MB → 1.9 MB (-32%)
- First load: 3.2s → 1.8s (-44%)
- FCP: 1.8s → 1.1s (-39%)
```

## Database Skills

### Database Migration Skill

```bash
cat > .claude/skills/db-migrate.md << 'EOF'
---
name: db-migrate
description: Manage database migrations
---

Migration management:
1. Check pending migrations
2. Validate migration files
3. Back up database
4. Execute migrations
5. Verify migration results
6. Provide rollback option
EOF
```

**Usage example:**

```bash
You: /db-migrate

Claude: Checking database migrations...

Claude wants to:
  • Run command: npm run migrate:status
Allow? [y/n]

You: y

Claude: Migration status:

Executed: 12 migrations
Pending: 3 migrations

Pending migrations:
1. 20240115_add_user_avatar.sql
   - Add users.avatar_url field
   - Create avatars table

2. 20240116_add_post_tags.sql
   - Create tags table
   - Create post_tags junction table

3. 20240117_add_indexes.sql
   - Add index on users.email
   - Add index on posts.created_at

⚠️ Recommend backing up database first

Continue? [y/n]

You: y

Claude wants to:
  • Run command: pg_dump -U user -d mydb > backup_20240117.sql
  • Run command: npm run migrate:up
Allow? [y/n]

You: y

Claude: Executing migrations...

[1/3] 20240115_add_user_avatar.sql
✓ Complete (0.3s)

[2/3] 20240116_add_post_tags.sql
✓ Complete (0.5s)

[3/3] 20240117_add_indexes.sql
✓ Complete (1.2s)

Migration successful!
- Executed 3 migrations
- Total time: 2.0s
- Backup file: backup_20240117.sql

To rollback, run: /db-rollback
```

These examples demonstrate various application scenarios of Agent Skills in real-world development, helping you get started quickly and create your own Skills.
