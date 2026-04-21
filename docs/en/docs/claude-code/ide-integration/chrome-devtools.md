---
title: "Chrome DevTools"
---

# Chrome DevTools

Claude Code can help you debug web applications, analyze Chrome DevTools output, and quickly locate and fix frontend issues.

## Basic Debugging Workflow

### Analyzing Console Errors

```bash
You: My app is showing errors in the browser

Claude: Please paste the error message from the Chrome DevTools console.

You: Uncaught TypeError: Cannot read property 'map' of undefined
    at UserList.tsx:15

Claude: Let me check this file.

Claude wants to:
  • Read file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: I found the issue:

Line 15:
```typescript
return users.map(user => <UserCard key={user.id} user={user} />)
```

Problem: `users` could be undefined.

Fix:
```typescript
return users?.map(user => <UserCard key={user.id} user={user} />) ?? []
```

Should I fix it?

You: Yes

Claude wants to:
  • Edit file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: Fixed. Refresh the browser to see the effect.
```

### Network Request Debugging

```bash
You: API request failed, Network panel shows 404

Claude: Please provide the following:
1. The request URL
2. Request method (GET/POST/etc)
3. Expected URL

You:
Request URL: http://localhost:3000/api/user/123
Method: GET
Expected: http://localhost:3000/api/users/123

Claude: Found the issue: "user" in the URL should be "users" (plural).

Let me check the API call code.

Claude wants to:
  • Search pattern: "/api/user/" in src/
Allow? [y/n/always/never]

You: y

Claude: Found the issue at src/api/users.ts line 12:

```typescript
const response = await fetch(`/api/user/${id}`)
```

Should be:
```typescript
const response = await fetch(`/api/users/${id}`)
```

Claude wants to:
  • Edit file: src/api/users.ts
Allow? [y/n/always/never]

You: y

Claude: Fixed. Refresh the page and retry.
```

## Performance Analysis

### Analyzing Performance Panel

```bash
You: Page loads slowly, what does the Performance panel show?

Claude: In Chrome DevTools:
1. Open the Performance panel
2. Click the record button
3. Refresh the page
4. Stop recording
5. Screenshot or describe the main performance bottlenecks

You: Main thread blocked for 2 seconds, shown in "Evaluate Script"

Claude: This is usually caused by a large JavaScript bundle. Let me check the build configuration.

Claude wants to:
  • Read file: vite.config.ts
  • Read file: package.json
Allow? [y/n/always/never]

You: always

Claude: I found several issues:

1. Code splitting not enabled
2. All dependencies bundled together
3. No lazy loading

I'll optimize the build configuration:

Claude wants to:
  • Edit file: vite.config.ts
Allow? [y/n/always/never]

You: y

Claude: Optimized configuration:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@mui/material', '@emotion/react']
        }
      }
    }
  }
})
```

Now let me add route lazy loading:

Claude wants to:
  • Read file: src/routes/index.tsx
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/routes/index.tsx
Allow? [y/n/always/never]

You: y

Claude: Added lazy loading:

```typescript
const UserList = lazy(() => import('../pages/UserList'))
const UserDetail = lazy(() => import('../pages/UserDetail'))
```

Rebuild and test:

Claude wants to:
  • Run command: npm run build
Allow? [y/n/always/never]

You: y

Claude: Build complete.

Optimization results:
- Main bundle size: reduced from 850KB to 320KB
- First load time estimated to decrease by 60%

Retest in Chrome DevTools Performance panel.
```

### Memory Leak Detection

```bash
You: App slows down after running for a while, suspecting memory leak

Claude: Let me help you analyze. In Chrome DevTools:

1. Open the Memory panel
2. Select "Heap snapshot"
3. Take a snapshot
4. Use the app for a while
5. Take another snapshot
6. Compare the two snapshots

Do you see any abnormally growing objects?

You: Found "Detached HTMLDivElement" count grew from 10 to 500

Claude: This is a classic DOM node leak. Usually caused by:
1. Event listeners not cleaned up
2. React components not properly unmounted
3. Timers not cleared

Let me check for potential issues:

Claude wants to:
  • Search pattern: "addEventListener" in src/
  • Search pattern: "setInterval" in src/
  • Search pattern: "setTimeout" in src/
Allow? [y/n/always/never]

You: always

Claude: Found the issue:

src/components/LiveChat.tsx line 23:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    fetchMessages()
  }, 1000)
  // Missing cleanup function
}, [])
```

Should add cleanup:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    fetchMessages()
  }, 1000)

  return () => clearInterval(interval)
}, [])
```

Claude wants to:
  • Edit file: src/components/LiveChat.tsx
Allow? [y/n/always/never]

You: y

Claude: Fixed. Let me check for other potential issues:

Claude wants to:
  • Search pattern: "useEffect.*addEventListener" in src/
Allow? [y/n/always/never]

You: y

Claude: Found another issue:

src/components/ScrollTracker.tsx:
```typescript
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  // Missing cleanup
}, [])
```

Claude wants to:
  • Edit file: src/components/ScrollTracker.tsx
Allow? [y/n/always/never]

You: y

Claude: All memory leaks fixed.

Issues fixed:
1. LiveChat component timer leak
2. ScrollTracker component event listener leak

Restart the app and retest memory usage.
```

## Responsive Debugging

### Mobile Layout Issues

```bash
You: Layout is broken on mobile devices

Claude: In Chrome DevTools:
1. Press Cmd+Shift+M to switch to device mode
2. Select a device (e.g., iPhone 12)
3. Screenshot or describe the specific issues

You: Buttons overflow the screen, text overlaps

Claude: Let me check the responsive styles.

Claude wants to:
  • Search pattern: "@media" in src/
  • Read file: src/styles/global.css
Allow? [y/n/always/never]

You: always

Claude: I found the issues:

1. Missing mobile media queries
2. Fixed widths not responsive

Let me fix the main components:

Claude wants to:
  • Read file: src/components/Button.tsx
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/components/Button.tsx
Allow? [y/n/always/never]

You: y

Claude: Added responsive styles:

```typescript
const buttonStyles = {
  padding: '12px 24px',
  fontSize: '16px',
  '@media (max-width: 768px)': {
    padding: '8px 16px',
    fontSize: '14px',
    width: '100%'
  }
}
```

Test in Chrome DevTools device mode.
```

### Touch Event Debugging

```bash
You: Swipe gestures not working on mobile

Claude: Let me check the touch event handling.

Claude wants to:
  • Search pattern: "onTouch" "touchstart" "touchmove" in src/
Allow? [y/n/always/never]

You: y

Claude: Found src/components/Carousel.tsx using touch events.

Claude wants to:
  • Read file: src/components/Carousel.tsx
Allow? [y/n/always/never]

You: y

Claude: Issue: Missing `preventDefault()` causing default scroll behavior conflict.

```typescript
const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault() // Add this line
  const touch = e.touches[0]
  // ... handle swipe
}
```

Claude wants to:
  • Edit file: src/components/Carousel.tsx
Allow? [y/n/always/never]

You: y

Claude: Fixed. Test swiping in Chrome DevTools device mode.

Tip: Enable "Show touch events" option to see touch points.
```

## Debugging React Applications

### React DevTools Integration

```bash
You: React DevTools shows component re-rendering

Claude: Which component is re-rendering? How many times?

You: UserList component, rendering 10 times per second

Claude: This is usually caused by:
1. Too frequent state updates
2. Props reference changes
3. Missing memo optimization

Let me check:

Claude wants to:
  • Read file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: Found the issue:

```typescript
function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers().then(setUsers)
  }) // Missing dependency array, executes on every render
}
```

Should be:
```typescript
useEffect(() => {
  fetchUsers().then(setUsers)
}, []) // Only execute on mount
```

Claude wants to:
  • Edit file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: Fixed. Retest in React DevTools Profiler.

Tip: Enable "Highlight updates" to see which components are re-rendering.
```

### Props Debugging

```bash
You: React DevTools shows props as undefined

Claude: Which component? Which prop?

You: UserCard component's user prop

Claude: Let me check the data flow:

Claude wants to:
  • Read file: src/components/UserCard.tsx
  • Search pattern: "<UserCard" in src/
Allow? [y/n/always/never]

You: always

Claude: Found the issue:

In src/pages/UserList.tsx:
```typescript
<UserCard userId={user.id} />
```

But UserCard expects:
```typescript
interface UserCardProps {
  user: User // Expects the entire user object
}
```

Should pass:
```typescript
<UserCard user={user} />
```

Claude wants to:
  • Edit file: src/pages/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: Fixed. Check in React DevTools if props are correct.
```

## Network Debugging

### API Response Analysis

```bash
You: API returns data but page doesn't update

Claude: In Chrome DevTools Network panel:
1. Find the API request
2. View the Response tab
3. Copy the response data to me

You:
{
  "data": {
    "userList": [...]
  }
}

Claude: Let me check how the frontend handles this response:

Claude wants to:
  • Search pattern: "userList" in src/api/
Allow? [y/n/always/never]

You: y

Claude: Found the issue:

src/api/users.ts:
```typescript
const response = await fetch('/api/users')
const data = await response.json()
return data.users // Wrong: should be data.data.userList
```

Should be:
```typescript
return data.data.userList
```

Claude wants to:
  • Edit file: src/api/users.ts
Allow? [y/n/always/never]

You: y

Claude: Fixed. Refresh the page to test.
```

### CORS Issues

```bash
You: Network panel shows CORS error

Claude: Please copy the full error message.

You: Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS policy

Claude: This is a CORS configuration issue. Solutions:

1. Development: Configure a proxy
2. Production: Add CORS headers on the backend

Let me configure the dev proxy:

Claude wants to:
  • Read file: vite.config.ts
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: vite.config.ts
Allow? [y/n/always/never]

You: y

Claude: Added proxy configuration:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

Restart the dev server:

Claude wants to:
  • Run command: npm run dev
Allow? [y/n/always/never]

You: n

Claude: Please manually restart the dev server to apply the proxy configuration.

Now API requests will go through the proxy, avoiding CORS issues.
```

## Style Debugging

### CSS Issue Identification

```bash
You: Element styles not applying

Claude: In Chrome DevTools Elements panel:
1. Select the element
2. View the Styles tab
3. Tell me:
   - Are the styles showing?
   - Are they crossed out (overridden)?
   - What does the Computed tab show as the final value?

You: Styles show but are crossed out, overridden by another selector

Claude: Please tell me:
1. Your selector
2. The selector overriding it

You:
Mine: .button { color: blue; }
Override: button { color: red; }

Claude: This is a CSS specificity issue. Class selectors should take priority over element selectors.

Let me check the actual code:

Claude wants to:
  • Search pattern: "button.*{.*color" in src/styles/
Allow? [y/n/always/never]

You: y

Claude: Found the issue:

src/styles/global.css has:
```css
button {
  color: red !important; /* !important causing the override */
}
```

Remove `!important`:

Claude wants to:
  • Edit file: src/styles/global.css
Allow? [y/n/always/never]

You: y

Claude: Fixed. Refresh the page to see the effect.

Tip: Avoid using !important, use more specific selectors instead.
```

### Layout Issues

```bash
You: Flexbox layout not working as expected

Claude: In Chrome DevTools Elements panel:
1. Select the flex container
2. Click the small icon next to display: flex in the Styles tab
3. This shows the Flexbox visualization

What issues do you see?

You: Child elements not evenly distributed

Claude: Let me check the flex properties:

Claude wants to:
  • Search pattern: "display.*flex" in src/components/
Allow? [y/n/always/never]

You: y

You: In src/components/Layout.tsx

Claude wants to:
  • Read file: src/components/Layout.tsx
Allow? [y/n/always/never]

You: y

Claude: Found the issue:

```css
.container {
  display: flex;
  /* Missing justify-content */
}
```

Should add:
```css
.container {
  display: flex;
  justify-content: space-between; /* or space-around */
  align-items: center;
}
```

Claude wants to:
  • Edit file: src/components/Layout.tsx
Allow? [y/n/always/never]

You: y

Claude: Fixed. View the Flexbox visualization in Chrome DevTools.
```

## JavaScript Debugging

### Breakpoint Debugging Assistance

```bash
You: I set a breakpoint in Chrome DevTools but don't know how to proceed

Claude: When paused at a breakpoint, you can:

1. View variable values:
   - Hover over variables
   - View all variables in the Scope panel
   - Type variable names in the Console

2. Control execution:
   - F8: Continue execution
   - F10: Step over
   - F11: Step into
   - Shift+F11: Step out

3. Conditional breakpoints:
   - Right-click breakpoint → Edit breakpoint
   - Enter a condition, e.g.: userId === 123

Need me to help analyze the code at the breakpoint?

You: Yes, breakpoint at src/utils/api.ts line 45

Claude wants to:
  • Read file: src/utils/api.ts
Allow? [y/n/always/never]

You: y

Claude: Line 45 code:

```typescript
const response = await fetch(url, options)
```

At this breakpoint, you can check:
1. Is the `url` value correct
2. What configuration does `options` contain
3. In the Console, run:
   ```javascript
   console.log('URL:', url)
   console.log('Options:', options)
   ```

Do you see anything unusual?
```

### Async Debugging

```bash
You: Async function execution order is confusing

Claude: Let me help clarify the async flow.

Claude wants to:
  • Search pattern: "async.*await" in src/
Allow? [y/n/always/never]

You: y

You: Mainly in src/services/dataService.ts

Claude wants to:
  • Read file: src/services/dataService.ts
Allow? [y/n/always/never]

You: y

Claude: I see the issue:

```typescript
async function loadData() {
  fetchUsers()      // No await
  fetchPosts()      // No await
  fetchComments()   // No await
}
```

These requests execute concurrently with no guaranteed order.

If sequential execution is needed:
```typescript
async function loadData() {
  await fetchUsers()
  await fetchPosts()
  await fetchComments()
}
```

If concurrent is fine:
```typescript
async function loadData() {
  await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ])
}
```

Which do you need?

You: Sequential

Claude wants to:
  • Edit file: src/services/dataService.ts
Allow? [y/n/always/never]

You: y

Claude: Fixed.

In Chrome DevTools:
1. Open the Network panel
2. Refresh the page
3. Observe the request order

It should now be: users → posts → comments
```

## Console Tips

### Using the Console API

```bash
You: How to better debug complex objects?

Claude: Chrome Console provides powerful APIs:

1. console.table() - Display arrays as tables
2. console.group() - Group logs
3. console.time() - Performance timing
4. console.trace() - Call stacks

Let me add these to the code:

Claude wants to:
  • Read file: src/services/dataService.ts
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/services/dataService.ts
Allow? [y/n/always/never]

You: y

Claude: Added debug logging:

```typescript
async function loadData() {
  console.group('Data Loading')

  console.time('fetchUsers')
  const users = await fetchUsers()
  console.timeEnd('fetchUsers')
  console.table(users)

  console.time('fetchPosts')
  const posts = await fetchPosts()
  console.timeEnd('fetchPosts')

  console.groupEnd()

  return { users, posts }
}
```

View structured log output in Chrome Console.
```

### Live Expressions

```bash
You: How to monitor real-time variable changes?

Claude: In Chrome DevTools Console:

1. Click the eye icon (Create live expression)
2. Enter the expression to monitor

For example:
- document.querySelectorAll('.user-card').length
- performance.memory.usedJSHeapSize
- window.innerWidth

These values update in real-time.

Need me to add some useful monitoring points?

You: Yes, monitor the user list count

Claude: Create a Live Expression in the Console:

```javascript
document.querySelectorAll('.user-card').length
```

Or add a global variable in the code:

Claude wants to:
  • Read file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/components/UserList.tsx
Allow? [y/n/always/never]

You: y

Claude: Added:

```typescript
useEffect(() => {
  // Expose to window in development
  if (process.env.NODE_ENV === 'development') {
    window.__DEBUG__ = {
      userCount: users.length,
      users: users
    }
  }
}, [users])
```

Now type `window.__DEBUG__` in the Console to view live data.
```

## Performance Optimization Tips

### Lighthouse Analysis

```bash
You: Lighthouse score is very low

Claude: Please share the main issues from the Lighthouse report.

You:
- Performance: 45
- Main issue: First Contentful Paint 3.5s

Claude: Let me analyze the performance bottlenecks:

Claude wants to:
  • Read file: package.json
  • Read file: vite.config.ts
  • Read file: src/main.tsx
Allow? [y/n/always/never]

You: always

Claude: Found several optimization points:

1. Large dependencies not split
2. Not using CDN
3. Images not optimized

I'll optimize one by one:

**Optimization 1: Code Splitting**

Claude wants to:
  • Edit file: vite.config.ts
Allow? [y/n/always/never]

You: y

**Optimization 2: Image Lazy Loading**

Claude wants to:
  • Search pattern: "<img" in src/components/
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: src/components/UserCard.tsx
Allow? [y/n/always/never]

You: y

Claude: Added loading="lazy"

**Optimization 3: Preload Critical Resources**

Claude wants to:
  • Read file: index.html
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: index.html
Allow? [y/n/always/never]

You: y

Claude: Added:

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="preconnect" href="https://api.example.com">
```

Rebuild and run Lighthouse:

Claude wants to:
  • Run command: npm run build
Allow? [y/n/always/never]

You: y

Claude: Build complete.

Expected improvements:
- FCP: 3.5s → 1.2s
- Performance: 45 → 85+

Retest in Chrome DevTools Lighthouse panel.
```

## Best Practices

### 1. Use Source Maps

```bash
You: Production error stacks are hard to read

Claude: Make sure Source Maps are enabled:

Claude wants to:
  • Read file: vite.config.ts
Allow? [y/n/always/never]

You: y

Claude wants to:
  • Edit file: vite.config.ts
Allow? [y/n/always/never]

You: y

Claude: Configured:

```typescript
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

Now Chrome DevTools can show original code locations.
```

### 2. Save Debug Configuration

```bash
You: Setting up breakpoints from scratch every time is tedious

Claude: Chrome DevTools can save workspaces:

1. Open the Sources panel
2. Click the Filesystem tab
3. Add the project folder
4. Allow access

Now breakpoints and modifications will persist.

Need me to create a .vscode/launch.json config?

You: Yes

Claude wants to:
  • Write file: .vscode/launch.json
Allow? [y/n/always/never]

You: y

Claude: Created Chrome debug configuration.

Press F5 in VS Code to launch Chrome debugging.
```

### 3. Use Snippets

```bash
You: I often need to run the same debug code in the Console

Claude: Create Chrome DevTools Snippets:

1. Open the Sources panel
2. Click the Snippets tab
3. Create a new Snippet
4. Save commonly used debug code

For example, create a "Debug React" snippet:

```javascript
// Find all React components
const components = document.querySelectorAll('[data-reactroot]')
console.log('React components:', components.length)

// View React version
console.log('React version:', React.version)

// Find re-rendering components
console.log('Enable React DevTools Profiler to track renders')
```

Press Cmd+Enter to run the Snippet.
```

## Summary

Using Chrome DevTools with Claude Code, you can:

- Quickly locate and fix errors
- Analyze performance bottlenecks
- Debug complex async flows
- Optimize network requests
- Improve user experience

Remember: Share your DevTools findings with Claude, and it will help you fix issues quickly.
