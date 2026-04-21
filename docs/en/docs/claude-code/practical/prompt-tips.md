---
title: "Prompt Tips"
---

# Prompt Tips

Master effective prompt techniques to help Claude Code better understand your needs and provide precise assistance.

## Basic Principles

### 1. Be Specific

```bash
# ❌ Bad prompt
You: Improve this file

# ✅ Good prompt
You: Add an error boundary in src/App.tsx to catch component rendering errors and display a friendly error page

Claude: I'll add an error boundary component...

Claude wants to:
  • Read file: src/App.tsx
  • Write file: src/components/ErrorBoundary.tsx
  • Edit file: src/App.tsx
Allow? [y/n/always/never]

You: y

Claude: Error boundary added:
- Created ErrorBoundary component
- Wrapped the main app component
- Added error logging
```

### 2. Provide Context

```bash
# ❌ Lacking context
You: How do I fix this bug?

# ✅ Provide full context
You: After user login, refreshing the page loses the login state. I'm using JWT stored in localStorage. Check src/auth/AuthContext.tsx and src/hooks/useAuth.ts

Claude: Let me check the authentication flow...

Claude wants to:
  • Read file: src/auth/AuthContext.tsx
  • Read file: src/hooks/useAuth.ts
Allow? [y/n/always/never]

You: y

Claude: Found the problem!

AuthContext doesn't read the token from localStorage on initialization.

Current code:
```typescript
const [user, setUser] = useState<User | null>(null);
```

Should be:
```typescript
const [user, setUser] = useState<User | null>(() => {
  const token = localStorage.getItem('token');
  if (token) {
    return decodeToken(token);
  }
  return null;
});
```

Apply this fix?
```

### 3. Process Step by Step

```bash
# ❌ Too much at once
You: Create a complete e-commerce website with user authentication, product management, shopping cart, payments, order management, and admin dashboard

# ✅ Break into steps
You: Step 1: Create a basic Next.js project structure with TypeScript and Tailwind CSS

Claude: I'll set up the project foundation...

[After completion]

You: Step 2: Add user authentication using NextAuth.js

Claude: I'll integrate NextAuth.js...

[After completion]

You: Step 3: Create product listing and detail pages

Claude: I'll create the product-related pages...
```

## Advanced Techniques

### Using Role Assignment

```bash
You: As a senior React developer, review src/components/UserProfile.tsx for performance issues, focusing on unnecessary re-renders

Claude: Let me analyze this component from a performance perspective...

Claude wants to:
  • Read file: src/components/UserProfile.tsx
Allow? [y/n/always/never]

You: y

Claude: Performance issue analysis:

1. Component recreates on every parent render
   Problem code:
   ```typescript
   const handleClick = () => { ... }
   ```

   Fix: Use useCallback
   ```typescript
   const handleClick = useCallback(() => { ... }, [dependencies]);
   ```

2. Object property as dependency causing infinite loop
   Problem code:
   ```typescript
   useEffect(() => { ... }, [user.settings]);
   ```

   Fix: Use specific properties
   ```typescript
   useEffect(() => { ... }, [user.settings.theme]);
   ```

3. Missing memo optimization
   Recommendation: Use React.memo on export

Apply these optimizations?
```

### Specify Output Format

```bash
You: Analyze dependencies in package.json, list all outdated packages in a table with current version, latest version, and update type (major/minor/patch)

Claude: Let me check dependency versions...

Claude wants to:
  • Read file: package.json
  • Run command: npm outdated --json
Allow? [y/n/always/never]

You: y

Claude: Outdated dependency analysis:

| Package | Current | Latest | Update Type | Notes |
|---------|---------|--------|-------------|-------|
| react | 18.2.0 | 18.3.1 | minor | Security update |
| typescript | 4.9.5 | 5.4.5 | major | Breaking changes |
| eslint | 8.45.0 | 8.57.0 | minor | Feature update |
| axios | 1.4.0 | 1.6.8 | minor | Security fix |

Suggested update priority:
1. High: axios (security fix)
2. Medium: react, eslint
3. Low: typescript (needs compatibility testing)

Generate update commands?
```

### Use Examples to Guide

```bash
You: Create a custom React Hook for data fetching, following this pattern:

```typescript
const { data, loading, error } = useFetch('/api/users');
```

Requirements:
- Support generics
- Auto retry
- Cache results
- Cancel requests

Claude: I'll create a fully-featured useFetch Hook...

Claude wants to:
  • Write file: src/hooks/useFetch.ts
Allow? [y/n/always/never]

You: y

Claude: Created useFetch Hook:

```typescript
import { useState, useEffect, useRef } from 'react';

interface UseFetchOptions {
  retry?: number;
  retryDelay?: number;
  cache?: boolean;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const cache = new Map<string, any>();

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const { retry = 3, retryDelay = 1000, cache: useCache = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController>();

  const fetchData = async (retryCount = 0) => {
    // Check cache
    if (useCache && cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();

      if (useCache) cache.set(url, result);

      setData(result);
      setError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;

      if (retryCount < retry) {
        setTimeout(() => fetchData(retryCount + 1), retryDelay);
      } else {
        setError(err as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return { data, loading, error, refetch: () => fetchData() };
}
```

Usage example:
```typescript
const { data, loading, error, refetch } = useFetch<User[]>('/api/users');
```

Features:
✓ TypeScript generic support
✓ Auto retry (default 3 times)
✓ Result caching
✓ Request cancellation
✓ Manual refetch
```

## Debugging Techniques

### Describe the Error

```bash
You: After running npm start, the browser shows "Cannot GET /", but there are no errors in the console. Check src/index.ts and routing configuration

Claude: Let me check the server configuration...

Claude wants to:
  • Read file: src/index.ts
  • Read file: src/routes/index.ts
Allow? [y/n/always/never]

You: y

Claude: Found the problem!

src/index.ts is missing static file serving:

Current code:
```typescript
app.use('/api', apiRoutes);
app.listen(3000);
```

Problem: Root path "/" is not handled

Solution:
```typescript
import path from 'path';

// Add static file serving
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', apiRoutes);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000);
```

Apply this fix?
```

### Provide Error Messages

```bash
You: Build failed with error:

```
Error: Cannot find module '@/components/Button'
Referenced from: src/pages/Home.tsx:5
```

Check import path configuration

Claude: Let me check the path alias configuration...

Claude wants to:
  • Read file: tsconfig.json
  • Read file: vite.config.ts
  • Read file: src/pages/Home.tsx
Allow? [y/n/always/never]

You: y

Claude: Problem analysis:

1. tsconfig.json has path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. But vite.config.ts is missing the corresponding configuration:

Need to add:
```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

Fix the configuration?

You: y

Claude: Fixed! Now both TypeScript and Vite can correctly resolve the @ alias.
```

## Code Review Techniques

### Specify Review Focus

```bash
You: Review src/api/payment.ts, focusing on:
1. Security (sensitive information handling)
2. Error handling
3. Logging

Claude: Let me conduct a targeted review...

Claude wants to:
  • Read file: src/api/payment.ts
Allow? [y/n/always/never]

You: y

Claude: Security review report:

🔴 Critical issues:

1. Payment key hardcoded (line 12)
```typescript
const apiKey = 'sk_live_abc123';  // ❌ Don't hardcode
```

Fix:
```typescript
const apiKey = process.env.PAYMENT_API_KEY;  // ✅ Use environment variable
if (!apiKey) throw new Error('Payment API key not configured');
```

2. Sensitive information logged (line 45)
```typescript
console.log('Payment data:', paymentData);  // ❌ Contains card number
```

Fix:
```typescript
console.log('Payment initiated:', {
  orderId: paymentData.orderId,
  amount: paymentData.amount
  // ✅ Don't log card number
});
```

🟡 Improvement suggestions:

3. Missing error retry mechanism
4. Timeout too long (30 seconds)
5. Missing request idempotency handling

Generate fix code?
```

## Refactoring Techniques

### Describe Refactoring Goals

```bash
You: Refactor src/utils/validation.ts with these goals:
- Replace manual validation with Zod
- Improve type safety
- Reduce duplicate code
- Maintain backward compatibility

Claude: Let me refactor...

Claude wants to:
  • Read file: src/utils/validation.ts
Allow? [y/n/always/never]

You: y

Claude: Refactoring plan:

Current code (manual validation):
```typescript
export function validateUser(data: any) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!data.password || data.password.length < 8) {
    throw new Error('Password too short');
  }
  return true;
}
```

After refactoring (using Zod):
```typescript
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
  name: z.string().optional()
});

export type User = z.infer<typeof userSchema>;

// New validation function
export function validateUser(data: unknown): User {
  return userSchema.parse(data);
}

// Backward-compatible wrapper
export function validateUserLegacy(data: any): boolean {
  try {
    validateUser(data);
    return true;
  } catch {
    return false;
  }
}
```

Benefits:
✓ Type safety (auto-inferred types)
✓ Better error messages
✓ Reusable schemas
✓ Maintains backward compatibility

Apply refactoring?
```

## Performance Optimization Techniques

### Provide Performance Metrics

```bash
You: Optimize src/components/DataTable.tsx, current issues:
- Rendering 1000 rows takes 3 seconds
- Stuttering during scroll
- Memory usage at 500MB

Claude: Let me analyze performance bottlenecks...

Claude wants to:
  • Read file: src/components/DataTable.tsx
Allow? [y/n/always/never]

You: y

Claude: Performance analysis:

Issue 1: Rendering all rows at once
```typescript
{data.map(row => <TableRow key={row.id} data={row} />)}
```

Fix: Use virtual scrolling
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: data.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
  overscan: 5
});

{rowVirtualizer.getVirtualItems().map(virtualRow => (
  <TableRow
    key={data[virtualRow.index].id}
    data={data[virtualRow.index]}
  />
))}
```

Issue 2: New event handler created for each row
```typescript
onClick={() => handleClick(row.id)}
```

Fix: Use event delegation
```typescript
<tbody onClick={handleTableClick}>
  {/* rows */}
</tbody>

const handleTableClick = (e) => {
  const rowId = e.target.closest('tr')?.dataset.id;
  if (rowId) handleClick(rowId);
};
```

Expected improvements:
- Render time: 3s → 100ms
- Scrolling: smooth 60fps
- Memory: 500MB → 50MB

Apply optimizations?
```

## Using Shortcuts

```bash
# Press Shift+Tab to switch to Auto-Accept Mode
[Bottom shows: ⏵⏵ accept edits on]

You: Batch add TypeScript type annotations

Claude: [Auto-executes, completes quickly]

# Press Shift+Tab to switch to Plan Mode
[Bottom shows: ⏸ plan mode on]

You: Large-scale refactoring of the database layer

Claude: [Only shows plan, awaits confirmation]
```

## Common Commands

```bash
/model opus    # Use Opus for complex tasks
/fast          # Use fast mode for simple tasks
/cost          # Monitor usage cost
/clear         # Clear context, start a new task
```

## Best Practices Summary

1. **Be specific**: Clearly state what to do and in which file
2. **Provide context**: Explain the background and relevant information
3. **Process step by step**: Break large tasks into small steps
4. **Use examples**: Provide the expected output format
5. **Describe problems**: Include error messages and symptoms
6. **Specify focus**: Indicate which aspects to focus on
7. **Provide metrics**: Include specific data for performance issues
8. **Choose modes wisely**: Select the appropriate permission mode for the task
