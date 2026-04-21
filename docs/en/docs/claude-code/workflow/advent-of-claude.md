---
title: "CLI Practical Tips"
---

# CLI Practical Tips

22 practical Claude Code terminal tips, each with complete interaction examples. Covers session management, file references, permission control, built-in commands, multi-file operations, and advanced workflows.

## Category 1: Session Management

### Tip 1: Headless Mode for One-Off Tasks

No need for an interactive session — use `--headless` to complete one-time tasks directly from the command line.

````bash
$ claude --headless "Remove all console.log statements from src/utils.ts"

Let me read the file and remove all console.log statements.

Claude wants to:
  • Read file: src/utils.ts
  • Edit file: src/utils.ts

 ✓ Removed 3 console.log statements from src/utils.ts:
   - Line 12: console.log('processing...')
   - Line 28: console.log('result:', data)
   - Line 45: console.log('done')
````

> **Tip:** Headless mode is ideal for embedding into scripts, CI/CD pipelines, or Makefiles. Output goes directly to stdout, making it easy to chain with pipes.

### Tip 2: Switch Models Within a Session

Switch models in real time based on task complexity.

````bash
$ claude

You: @src/api/auth.ts Explain the architecture of this auth module

Claude: [Uses default Sonnet model for detailed architecture analysis]

You: /model opus

Claude: Switched to claude-opus-4-6

You: Based on the above analysis, design a complete auth scheme with OAuth 2.0 + PKCE support

Claude: [Uses Opus for deeper design work]

You: /model haiku

Claude: Switched to claude-haiku-4-5

You: Generate JSDoc comments for the above scheme

Claude: [Uses Haiku to quickly generate comments, saving cost]
````

> **Tip:** Use Haiku for simple tasks (fast and cheap), Opus for complex design (most capable), and Sonnet for everyday coding (balanced). Run `/cost` to check actual token consumption per model.

### Tip 3: Managing Context and Cost

After working for a long time, context bloat slows responses and increases cost. Use `/clear` and `/cost` together.

````bash
$ claude

You: [Been discussing auth system refactoring for 20 minutes, context is long]

You: /cost

Claude: Session cost: $2.34 (127k tokens input, 8k tokens output)

You: /clear

Claude: Context cleared. Starting fresh.

You: Now help me implement the TokenService class we discussed. It needs:
- Access token issuance (JWT, 15-minute expiry)
- Refresh token rotation (7-day expiry)
- Token blacklist checking

Claude: [Efficiently codes in a clean context]
````

> **Tip:** Run `/clear` when switching to a new topic. If you need to preserve conclusions from earlier, ask Claude to summarize key points first, then paste the summary back after clearing.

### Tip 4: Resuming Interrupted Work

If your terminal closes unexpectedly, Claude preserves your session context.

````bash
$ claude

You: Refactor src/services/payment.ts — extract Stripe logic into a standalone module

Claude: [Reads files, analyzes dependencies]

Claude wants to:
  • Read file: src/services/payment.ts
  • Read file: src/config/stripe.ts
  • Edit file: src/services/stripe.service.ts

Allow? [y/n/always/never]

You: y

Claude: [Mid-refactoring...]

--- Terminal closes unexpectedly ---

$ claude --resume

Claude: Welcome back! Last time you were refactoring payment.ts. I've created stripe.service.ts
and migrated 3 payment methods. Remaining:
1. Update import references in payment.ts
2. Add unit tests for StripeService
Continue?

You: Continue, update the imports first

Claude: [Seamlessly resumes work]
````

> **Tip:** `claude --resume` restores the most recent session. For multiple sessions, use `claude --resume --session <id>`.

## Category 2: File and Context References

### Tip 5: Precise File References with @

Use the `@` prefix to make Claude read an exact file, avoiding guesswork.

````bash
$ claude

You: @src/components/Button.tsx This component has performance issues with its onClick handler, help me optimize it

Claude wants to:
  • Read file: src/components/Button.tsx

Allow? [y/n/always/never]

You: y

Claude: [Reads Button.tsx]

I found several performance issues:

1. **New callback function created on every render** — wrap with useCallback
2. **No shallow comparison of props** — wrap with React.memo

Fix:

Claude wants to:
  • Edit file: src/components/Button.tsx

Allow? [y/n/always/never]

You: y

Claude: ✓ Optimized Button component — added useCallback and React.memo
````

> **Tip:** `@` references are far more precise than describing "look at the button component." Claude reads the file directly and won't pick the wrong one.

### Tip 6: Referencing Multiple Files at Once

Reference multiple files simultaneously for comparison or unified changes.

````bash
$ claude

You: @src/api/users.ts @src/api/products.ts @src/api/orders.ts
The error handling in these three files is inconsistent — unify them into the same pattern

Claude wants to:
  • Read file: src/api/users.ts
  • Read file: src/api/products.ts
  • Read file: src/api/orders.ts

Allow? [y/n/always/never]

You: y

Claude: [Reads all three files]

Analysis:
- users.ts: try/catch + custom AppError
- products.ts: .catch() + direct throw Error
- orders.ts: Result pattern

Recommending AppError + try/catch pattern. Applying changes:

Claude wants to:
  • Edit file: src/api/users.ts
  • Edit file: src/api/products.ts
  • Edit file: src/api/orders.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ All three files now use the unified AppError + try/catch error handling pattern
````

> **Tip:** Referencing 2-5 files works best. For analyzing an entire directory, use the directory reference in Tip 7.

### Tip 7: Referencing Entire Directories

Use `@` with a directory path — Claude scans all files for analysis.

````bash
$ claude

You: @src/components/ Analyze all components in this directory and find:
1. Components missing TypeScript types
2. Components without corresponding test files
3. Components over 300 lines that should be split

Claude wants to:
  • Read directory: src/components/

Allow? [y/n/always/never]

You: y

Claude: [Scans src/components/ directory]

Scanned 24 component files. Found:

**Components missing types (3):**
- UserCard.tsx — props have no TypeScript interface
- SearchBar.tsx — uses any type
- Modal.tsx — children typed as any

**Components missing tests (8):**
- Header, Footer, Sidebar, Navbar, Breadcrumb,
- Avatar, Badge, Tooltip

**Components over 300 lines (2):**
- Dashboard.tsx (487 lines) — suggest extracting StatsPanel, ActivityFeed
- DataGrid.tsx (356 lines) — suggest extracting GridFilters, Pagination

Which issue should we fix first?
````

> **Tip:** Directory references consume more tokens. For large directories, use `@src/components/` to understand the structure first, then use Tip 5 to handle specific files individually.

### Tip 8: Auto-Loading Project Context with CLAUDE.md

Create a `CLAUDE.md` in the project root — Claude reads it automatically on startup.

````bash
$ cat CLAUDE.md

# Project Conventions

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL

## Code Standards
- Use function components and hooks
- File naming: kebab-case
- API routes return { code, data, message } consistently
- Errors use AppError class with statusCode and errorCode

## Testing Requirements
- Every new function must have unit tests
- Use vitest + testing-library
- Test files go in __tests__/ alongside the source

$ claude

Claude: [Auto-loads CLAUDE.md]

I understand the project conventions: Next.js 14 + TypeScript + Tailwind with App Router and Prisma.
Following kebab-case naming, unified API response format, and requiring unit test coverage.

You: Create a new API route for user avatar upload

Claude: [Automatically generates code following CLAUDE.md conventions:
- File naming kebab-case: upload-avatar/route.ts
- Response format: { code, data, message }
- Error handling: AppError
- Creates corresponding test file]
````

> **Tip:** CLAUDE.md supports 3 levels: project root (global), subdirectory (module-level), `~/.claude/CLAUDE.md` (personal preferences). See [Context Management](./context-management).

## Category 3: Modes and Permission Control

### Tip 9: Plan Mode for Complex Tasks

Use Shift+Tab to switch to Plan Mode — Claude proposes a plan first, then executes after your review.

````bash
$ claude

You: Migrate the entire user module from REST API to GraphQL

Claude: This is a complex migration. I recommend entering Plan Mode first.

You: [Press Shift+Tab to switch to Plan Mode]

You: Migrate the entire user module from REST API to GraphQL

Claude: I'll outline a plan first — no code changes yet.

## Migration Plan

### Phase 1: Infrastructure (~2 hours)
1. Install graphql + @apollo/server dependencies
2. Create GraphQL schema definitions
3. Set up Apollo Server instance

### Phase 2: User Module Migration (~3 hours)
4. Define User type schema
5. Implement Query resolvers (getUser, listUsers)
6. Implement Mutation resolvers (createUser, updateUser, deleteUser)
7. Migrate auth middleware

### Phase 3: Frontend Adaptation (~2 hours)
8. Install @apollo/client
9. Replace REST calls with GraphQL queries
10. Update error handling logic

### Risks
- Auth middleware needs rewriting
- File upload endpoint has different GraphQL handling
- Need to keep REST API running in parallel temporarily

Proceed with this plan? Or need adjustments?

You: Plan looks good, start with Phase 1

Claude: [Begins Phase 1 implementation]
````

> **Tip:** Strongly recommend Plan Mode for changes touching 5+ files, architectural decisions, or tasks where the implementation path is unclear.

### Tip 10: Auto-Accept for Fast Iteration

For small changes, use Shift+Tab to switch to Auto-Accept mode and skip individual confirmations.

````bash
$ claude

You: [Press Shift+Tab to switch to Auto-Accept mode]

You: Replace all var declarations in the project with const or let

Claude: [Executes automatically, no individual confirmations]

✓ Scanned 34 files, modified 12 var declarations:
  - src/utils/format.ts: 3 var → const
  - src/utils/validate.ts: 2 var → const
  - src/api/handler.ts: 4 var → let (reassignment needed)
  - src/config/constants.ts: 3 var → const

All changes complete. Suggest running `npm run build` to verify.

You: Run npm run build

Claude: ✓ Build passed, no errors
````

> **Tip:** Auto-Accept suits low-risk operations (formatting, renaming, simple refactoring). For deleting files, modifying database schemas, or other high-risk operations, keep the default mode.

### Tip 11: always/never to Reduce Confirmations

Use `always` or `never` for repetitive operations to reduce confirmation prompts.

````bash
$ claude

You: Fix all ESLint errors

Claude wants to:
  • Read file: src/components/Header.tsx
  • Edit file: src/components/Header.tsx

Allow? [y/n/always/never]

You: always

Claude: ✓ Header.tsx fixed

Claude wants to:
  • Read file: src/components/Footer.tsx
  • Edit file: src/components/Footer.tsx

[Auto-allowed, no confirmation needed]

Claude wants to:
  • Read file: src/config/env.ts
  • Edit file: src/config/env.ts

[Auto-allowed, no confirmation needed]

Claude: ✓ All 8 files' ESLint errors fixed
````

> **Tip:** `always` auto-approves all subsequent operations on that file for the current session. `never` auto-denies them. Use `always` when working on a group of files that need repeated edits.

### Tip 12: .claudeignore to Filter Noise

Create a `.claudeignore` file to prevent Claude from reading irrelevant files, saving tokens and avoiding false matches.

````bash
$ cat .claudeignore

# Dependencies and build output
node_modules/
dist/
.next/
build/

# Environment and secrets
.env
.env.*
*.pem
*.key

# Large generated files
*.min.js
*.min.css
package-lock.json
yarn.lock

# Docs and assets
*.md
public/images/
$ claude

Claude: [Auto-reads .claudeignore on startup]

You: Analyze the project structure

Claude: [Skips node_modules, dist, .env, etc. — only analyzes source code]

Scanned 47 source files (excluded files matching .claudeignore):
- src/api/ — 12 API routes
- src/components/ — 24 components
- src/utils/ — 8 utility functions
- src/config/ — 3 config files
````

> **Tip:** `.claudeignore` uses the exact same syntax as `.gitignore`. Especially effective for large projects — prevents Claude from wasting tokens in node_modules.

## Category 4: Built-in Commands in Practice

### Tip 13: Smart Commits with /commit

Use `/commit` to have Claude analyze current changes and auto-generate a conventional commit message.

````bash
$ claude

You: [Just finished implementing user registration]

You: /commit

Claude: Analyzing current changes...

Changed files:
  M src/api/auth/register.ts    (+48, -2)
  M src/services/user.ts        (+22, -0)
  A src/validators/register.ts  (+35, -0)
  M src/types/user.ts           (+8, -0)
  M tests/auth.test.ts          (+42, -0)

Generated commit message:

feat(auth): add user registration with input validation

- Add register API endpoint with email/password validation
- Create RegisterValidator using Zod schemas
- Add password hashing with bcrypt (10 salt rounds)
- Extend User type with registration metadata
- Add unit tests for registration flow

Co-Authored-By: Claude <noreply@anthropic.com>

Use this commit message?

You: Change "10 salt rounds" to "12 salt rounds"

Claude: ✓ Updated and committed

[main abc1234] feat(auth): add user registration with input validation
 5 files changed, 155 insertions(+), 2 deletions(-)
````

> **Tip:** `/commit` reads `git diff --staged`. If files aren't staged, run `git add` first. You can also tell Claude to adjust the commit message style.

### Tip 14: Speed Up Simple Tasks with /fast

Use `/fast` to toggle fast output mode for tasks that don't require deep reasoning.

````bash
$ claude

You: /fast

Claude: Fast mode enabled. Responses will be faster.

You: Add a formatDate function to src/utils/format.ts — input ISO string, output "MMM D, YYYY" format

Claude wants to:
  • Read file: src/utils/format.ts
  • Edit file: src/utils/format.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ Added formatDate function

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

You: Add a formatCurrency function too — convert cents to "$X.XX"

Claude: ✓ Added formatCurrency function

export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}
````

> **Tip:** `/fast` uses the same model but with faster output. Good for adding simple functions, formatting code, or generating boilerplate. Switch back to standard mode for complex refactoring.

### Tip 15: Automate Workflows with Skills

Package common workflows into a single command using custom Skills.

````bash
$ claude

You: List available skills

Claude: Available Skills:
- /review — Code review (checks security, performance, maintainability)
- /test — Generate unit tests for specified file
- /commit — Smart commit message generation
- /fix — Auto-fix based on ESLint/TSC errors

You: /review src/api/payment.ts

Claude: [Executes full review skill workflow]

## Code Review: src/api/payment.ts

### Security Issues 🔴
- Line 34: `amount` parameter has no upper-bound validation — risk of large payments
- Line 52: Stripe webhook missing signature verification

### Performance Issues 🟡
- Line 28: New Stripe instance created per request — should reuse singleton
- Line 67: Database query not using indexed field

### Maintainability 🟢
- Overall structure is clean, error handling is solid
- Consider extracting webhook handling into a standalone function

Fix these issues?

You: Fix the two security issues first

Claude: [Auto-fixes security issues]
````

> **Tip:** Create your own Skill by adding a `.md` file in the `.claude/skills/` directory. See [Skills](../advanced/skills).

## Category 5: Multi-File Operations

### Tip 16: Cascading Multi-File Changes

After modifying an interface or type definition, Claude automatically tracks and updates all referencing files.

````bash
$ claude

You: @src/types/user.ts Split the User interface's name field into firstName and lastName

Claude wants to:
  • Read file: src/types/user.ts

Allow? [y/n/always/never]

You: y

Claude: [Reads user.ts]

After modifying the User interface, these files need updating:

1. src/types/user.ts — interface definition
2. src/api/users.ts — API response mapping
3. src/components/UserCard.tsx — display logic
4. src/components/UserForm.tsx — form fields
5. src/services/auth.ts — registration logic
6. tests/user.test.ts — test assertions

Claude wants to:
  • Edit file: src/types/user.ts
  • Edit file: src/api/users.ts
  • Edit file: src/components/UserCard.tsx
  • Edit file: src/components/UserForm.tsx
  • Edit file: src/services/auth.ts
  • Edit file: tests/user.test.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ All 6 files updated:
  - User.name → User.firstName + User.lastName
  - API response: name → firstName/lastName
  - UserCard display: {user.name} → {user.firstName} {user.lastName}
  - UserForm: single name input → two inputs
  - Registration logic: split synced
  - Tests: assertions updated
````

> **Tip:** Claude automatically tracks import chains and type references. For large refactoring, combine with Plan Mode (Tip 9) to review the impact scope first.

### Tip 17: Phased Execution for Large Refactoring

Break large refactoring into phases — review each phase before continuing.

````bash
$ claude

You: Migrate the entire state management from Redux to Zustand, execute in phases

Claude: This is a significant migration. Here's the phased plan:

## Migration Plan

### Phase 1: Infrastructure
- Install zustand
- Create base store structure
- Keep Redux in place (run in parallel)

### Phase 2: Module-by-Module Migration
- auth store → useAuthStore
- cart store → useCartStore
- ui store → useUIStore

### Phase 3: Cleanup
- Remove Redux dependencies and configuration
- Update tests
- Clean up unused code

Start with Phase 1?

You: Start Phase 1

Claude: [Executes Phase 1]

✓ Phase 1 complete:
  - Installed zustand@4.5.0
  - Created src/stores/ directory structure
  - Wrote store creation utility

Running `npm run build` to verify... ✓ Build passed

Ready for Phase 2?

You: Let me review Phase 1 changes first

Claude: [Shows diff]

You: Looks good, continue with Phase 2

Claude: [Executes Phase 2]
````

> **Tip:** The key is running builds and tests after each phase. Don't let Claude execute all phases at once — issues become hard to pinpoint.

### Tip 18: Pasting Error Stacks for Diagnosis

Paste the full error message — Claude pinpoints the root cause and fixes it.

````bash
$ claude

You: Tests are failing, help me look at this:

 FAIL  src/services/order.test.ts
  ● OrderService › createOrder › should calculate total with discount

    Expected: 85
    Received: 100

      48 |     const total = service.calculateTotal(items, discount)
      49 |     // items: [{price: 50, qty: 2}], discount: {type: 'percentage', value: 15}
    > 50 |     expect(total).toBe(85)
         |                    ^
      51 |   })
      52 | })

Claude wants to:
  • Read file: src/services/order.ts

Allow? [y/n/always/never]

You: y

Claude: [Reads order.ts]

Found the issue! In the `calculateTotal` method:

```typescript
// Line 23: discount calculation is wrong
return subtotal - discount.value  // treats percentage as fixed amount
```

Should be:

```typescript
return subtotal * (1 - discount.value / 100)
```

Claude wants to:
  • Edit file: src/services/order.ts

Allow? [y/n/always/never]

You: y

Claude: ✓ Fixed discount calculation. 50 * 2 * (1 - 15/100) = 85 ✓
````

> **Tip:** Pasting the full error stack is far more useful than describing "tests failed." Including line numbers and context lets Claude pinpoint the problematic code directly.

### Tip 19: Semantic Code Search

Describe the code pattern you're looking for in natural language — Claude performs semantic search, not just text matching.

````bash
$ claude

You: Find all database write operations in the project that might execute without authentication

Claude: [Semantically searches the entire codebase]

Found 4 database write operations potentially missing auth checks:

1. **src/api/comments.ts:28** — createComment
   Issue: Writes comment without verifying user is logged in
   Fix: Add auth middleware

2. **src/api/feedback.ts:15** — submitFeedback
   Issue: Feedback route has no auth middleware
   Fix: At minimum, verify session

3. **src/api/analytics.ts:42** — trackEvent
   Issue: trackEvent doesn't need login, but lacks rate limiting
   Fix: Add IP-based rate limiting

4. **src/utils/migration.ts:87** — migrateData
   Issue: Migration script skips auth (possibly intentional)
   Fix: Confirm it's an internal script — if so, ignore

Which ones should we fix?
````

> **Tip:** Semantic search finds concepts like "handling user input" rather than just the `input` keyword. Perfect for security audits and code review scenarios.

## Category 6: Advanced Workflows

### Tip 20: Impact Analysis

Before modifying code, have Claude analyze the blast radius of the change.

````bash
$ claude

You: If I change ApiResponse<T>.data from T to T | null in src/types/api.ts,
how many files would be affected?

Claude: [Analyzes impact scope]

## Impact Analysis: ApiResponse.data: T → T | null

### Direct Impact (6 files)
1. src/api/users.ts:32 — `response.data.name` needs null check
2. src/api/products.ts:45 — `response.data.price` needs null check
3. src/api/orders.ts:18 — Destructured `{ data }` needs null guard
4. src/components/UserList.tsx:56 — Rendering data.name needs fallback
5. src/components/ProductGrid.tsx:23 — Same
6. src/components/OrderHistory.tsx:41 — Same

### Indirect Impact (may need adjustments)
7. tests/api/users.test.ts — Test assertions need updating
8. tests/api/products.test.ts — Same
9. src/hooks/useApi.ts — Generic hook type may need adjusting

### Risk Assessment
- Change scope: Medium (9 files)
- Breaking potential: Low (TypeScript catches missed spots at compile time)
- Recommendation: Run `tsc --noEmit` after changes to verify

Execute this change?
````

> **Tip:** Impact analysis is especially useful before PR reviews. Better to evaluate scope first than discover mid-change that the blast radius is too large.

### Tip 21: Piping Output to Claude

Use Unix pipes to pass other command outputs to Claude for analysis.

````bash
$ git diff main..feature/new-auth | claude ask "Review all changes in this branch, focus on security issues"

Reviewed changes across 12 files:

## Security Issues
1. **src/api/auth.ts** — New token endpoint missing rate limiting
2. **src/middleware/auth.ts** — JWT secret read from env but no startup validation

## Recommendations
- Add express-rate-limit to the token endpoint
- Validate JWT_SECRET is set at startup

$ cat /var/log/app/error.log | tail -100 | claude ask "Analyze recent error logs and find root causes"

Analyzed the most recent 100 error log entries:

## Top Issues
1. **Database connection timeouts** (68%) — spikes between 23:00-01:00
   Root cause: Connection pool size (10) can't handle nightly batch peak
   Fix: Increase to 25 or add connection queue

2. **Redis connection resets** (22%) — randomly distributed
   Root cause: Redis server OOM triggering eviction
   Fix: Increase Redis memory or set TTL policy

3. **Third-party API timeouts** (10%) — Stripe webhook
   Root cause: Stripe response time > 30s
   Fix: Add retry mechanism and circuit breaker
````

> **Tip:** `claude ask` is a non-interactive shortcut — output prints directly to the terminal. Great for code review, log analysis, and diff review as one-off tasks.

### Tip 22: Headless Automation Scripts

Embed Claude into Makefiles, pre-commit hooks, or CI scripts for automation.

````bash
$ cat Makefile

.PHONY: review lint-fix release-notes

# Code review: auto-review changes before committing
review:
	@git diff --cached --name-only | grep -E '\.(ts|tsx|js|jsx)$$' | \
		xargs claude --headless "Review changes in these files. Only output issues that need attention. If no issues, output LGTM"

# Auto-fix lint errors
lint-fix:
	@claude --headless "Run npx eslint src/ --format json, then fix all auto-fixable issues"

# Generate this week's release notes
release-notes:
	@git log --oneline --since="last monday" | \
		claude --headless "Generate user-friendly release notes from these commits, grouped by feature"

$ cat .git/hooks/pre-commit

#!/bin/bash
# Claude auto-reviews staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')

if [ -n "$STAGED_FILES" ]; then
    echo "🔍 Claude reviewing..."
    RESULT=$(echo "$STAGED_FILES" | \
        xargs claude --headless "Review these files for security vulnerabilities or obvious bugs. If serious issues found, output only ISSUE: <description>, otherwise output OK")

    if echo "$RESULT" | grep -q "ISSUE:"; then
        echo "⚠️  Potential issues found:"
        echo "$RESULT"
        echo ""
        read -p "Still want to commit? [y/N] " -r
        [[ ! $REPLY =~ ^[Yy]$$ ]] && exit 1
    fi
fi

$ make review

🔍 Claude reviewing...
LGTM — all changes look good.
````

> **Tip:** Headless mode defaults to a 2-minute timeout. For large codebases, set `--timeout` to increase it: `claude --headless --timeout 300 "..."`.
