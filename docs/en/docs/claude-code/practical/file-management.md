---
title: "File Management"
---

# File Management

Efficiently manage files and directories using Claude Code.

## Basic File Operations

```bash
# Start Claude Code
claude

# Create a file
You: Create a new configuration file config/app.json

Claude: I'll create the configuration file...

Claude wants to:
  • Write file: config/app.json
Allow? [y/n/always/never]

You: y

Claude: Created config/app.json:

```json
{
  "app": {
    "name": "My Application",
    "version": "1.0.0",
    "port": 3000
  },
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```

Configuration file created successfully.
```

## Batch File Operations

```bash
You: Create 5 React components in the src/components directory

Claude: I'll create the component files...

Claude wants to:
  • Write file: src/components/Header.tsx
  • Write file: src/components/Footer.tsx
  • Write file: src/components/Sidebar.tsx
  • Write file: src/components/Navigation.tsx
  • Write file: src/components/Content.tsx
Allow? [y/n/always/never]

You: always

Claude: Created 5 components:

1. Header.tsx - Header component
2. Footer.tsx - Footer component
3. Sidebar.tsx - Sidebar component
4. Navigation.tsx - Navigation component
5. Content.tsx - Content component

Each component includes basic TypeScript type definitions and exports.
```

## File Search

```bash
You: Find all files containing "TODO" comments

Claude: Let me search for TODO comments...

Claude wants to:
  • Run command: grep -r "TODO" src/ --include="*.ts" --include="*.tsx"
Allow? [y/n/always/never]

You: y

Claude: Found 12 TODO comments:

src/utils/auth.ts:23
  // TODO: Implement refresh token logic

src/components/UserProfile.tsx:45
  // TODO: Add avatar upload functionality

src/api/orders.ts:67
  // TODO: Optimize query performance

src/hooks/useData.ts:89
  // TODO: Add error retry

Would you like me to handle these TODOs?
```

## File Renaming

```bash
You: Rename all .js files to .ts

Claude: Let me find all .js files first...

Claude wants to:
  • Run command: find src -name "*.js" -type f
Allow? [y/n/always/never]

You: y

Claude: Found 8 .js files:

- src/utils/helper.js
- src/config/env.js
- src/api/client.js
- src/hooks/useAuth.js
- src/components/Button.js
- src/components/Input.js
- src/services/api.js
- src/lib/format.js

Claude wants to:
  • Run command: mv src/utils/helper.js src/utils/helper.ts
  • Run command: mv src/config/env.js src/config/env.ts
  • Run command: mv src/api/client.js src/api/client.ts
  • Run command: mv src/hooks/useAuth.js src/hooks/useAuth.ts
  • Run command: mv src/components/Button.js src/components/Button.ts
  • Run command: mv src/components/Input.js src/components/Input.ts
  • Run command: mv src/services/api.js src/services/api.ts
  • Run command: mv src/lib/format.js src/lib/format.ts
Allow? [y/n/always/never]

You: y

Claude: Renaming complete! All 8 files converted from .js to .ts.

Note: You may need to add TypeScript type annotations.
```

## File Copy and Move

```bash
You: Move all components from src/components/old to src/components/legacy

Claude: Let me move the files...

Claude wants to:
  • Run command: mkdir -p src/components/legacy
  • Run command: mv src/components/old/* src/components/legacy/
  • Run command: rmdir src/components/old
Allow? [y/n/always/never]

You: y

Claude: Move complete!

Moved 15 files from old to legacy directory.
old directory deleted.

File list:
- Button.tsx
- Input.tsx
- Form.tsx
- Modal.tsx
- Dropdown.tsx
... (15 files total)
```

## File Deletion

```bash
You: Delete all .test.js files

Claude: Let me find the test files first...

Claude wants to:
  • Run command: find . -name "*.test.js" -type f
Allow? [y/n/always/never]

You: y

Claude: Found 23 test files.

Warning: This is a destructive operation that will delete the following files:
- src/utils/auth.test.js
- src/components/Button.test.js
- src/api/users.test.js
... (23 files total)

Confirm deletion?

You: y

Claude wants to:
  • Run command: find . -name "*.test.js" -type f -delete
Allow? [y/n/always/never]

You: y

Claude: Deleted 23 test files.

Suggestion: Consider migrating tests to TypeScript (.test.ts).
```

## Directory Structure Management

```bash
You: Create a standard Node.js project structure

Claude: I'll create the project structure...

Claude wants to:
  • Run command: mkdir -p src/{controllers,models,routes,middleware,utils,config}
  • Run command: mkdir -p tests/{unit,integration,e2e}
  • Run command: mkdir -p public/{css,js,images}
  • Run command: mkdir -p docs
Allow? [y/n/always/never]

You: y

Claude: Project structure created:

project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── config/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
└── docs/

Would you like me to add base files?
```

## File Content Replacement

```bash
You: Replace "localhost:3000" with "api.example.com" in all files

Claude: Let me search and replace...

Claude wants to:
  • Run command: grep -r "localhost:3000" src/ --include="*.ts" --include="*.tsx" -l
Allow? [y/n/always/never]

You: y

Claude: Found 7 files containing "localhost:3000":

- src/config/api.ts
- src/utils/fetch.ts
- src/services/auth.ts
- src/components/ApiClient.tsx
- src/hooks/useApi.ts
- tests/api.test.ts
- .env.example

Claude wants to:
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/config/api.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/utils/fetch.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/services/auth.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/components/ApiClient.tsx
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/hooks/useApi.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' tests/api.test.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' .env.example
Allow? [y/n/always/never]

You: y

Claude: Replacement complete! Replaced "localhost:3000" with "api.example.com" in 7 files.
```

## File Compression and Extraction

```bash
You: Compress the src directory to backup.tar.gz

Claude: I'll create the archive...

Claude wants to:
  • Run command: tar -czf backup.tar.gz src/
Allow? [y/n/always/never]

You: y

Claude: Compression complete!

File: backup.tar.gz
Size: 2.3 MB
Contains: all contents of the src directory

You: Extract backup.tar.gz to the restore directory

Claude wants to:
  • Run command: mkdir -p restore
  • Run command: tar -xzf backup.tar.gz -C restore/
Allow? [y/n/always/never]

You: y

Claude: Extraction complete!

Files extracted to restore/src directory.
```

## File Permission Management

```bash
You: Set all .sh scripts as executable

Claude: Let me find all script files...

Claude wants to:
  • Run command: find . -name "*.sh" -type f
Allow? [y/n/always/never]

You: y

Claude: Found 5 script files:

- scripts/build.sh
- scripts/deploy.sh
- scripts/test.sh
- scripts/backup.sh
- scripts/clean.sh

Claude wants to:
  • Run command: chmod +x scripts/*.sh
Allow? [y/n/always/never]

You: y

Claude: All scripts set as executable.

You can now run them directly:
./scripts/build.sh
./scripts/deploy.sh
etc...
```

## File Size Analysis

```bash
You: Find the top 10 largest files

Claude: Let me analyze file sizes...

Claude wants to:
  • Run command: find . -type f -exec du -h {} + | sort -rh | head -10
Allow? [y/n/always/never]

You: y

Claude: Top 10 largest files:

1. 45M  ./node_modules/.cache/webpack/bundle.js
2. 23M  ./dist/app.bundle.js
3. 12M  ./logs/app.log
4. 8.5M ./public/images/hero.png
5. 6.2M ./coverage/lcov-report/index.html
6. 4.8M ./docs/api-reference.pdf
7. 3.9M ./src/assets/video.mp4
8. 2.1M ./package-lock.json
9. 1.8M ./yarn.lock
10. 1.5M ./dist/vendor.js

Total size: 109.8M

Recommendations:
- Clean up node_modules/.cache
- Compress images and videos
- Archive old log files
```

## File Synchronization

```bash
You: Sync src directory to backup/src with incremental updates

Claude: I'll use rsync for synchronization...

Claude wants to:
  • Run command: rsync -av --delete src/ backup/src/
Allow? [y/n/always/never]

You: y

Claude: Sync complete!

Statistics:
- Sent files: 234
- Updated files: 12
- Deleted files: 3
- Total size: 15.6 MB
- Transferred size: 2.3 MB (incremental)

backup/src is now fully synced with src.
```

## Using Auto-Accept Mode

```bash
# Press Shift+Tab to switch to Auto-Accept Mode
[Bottom shows: ⏵⏵ accept edits on]

You: Batch create 20 test files

Claude: [Auto-executes, no confirmation needed]
Created 20 test files:
- tests/unit/auth.test.ts
- tests/unit/user.test.ts
- tests/unit/order.test.ts
... (20 files total)

# Press Shift+Tab again to switch to Plan Mode
[Bottom shows: ⏸ plan mode on]

You: Reorganize the entire project structure

Claude: Reorganization plan:

1. Create new directory structure
2. Move existing files to new locations
3. Update all import paths
4. Update configuration files
5. Run tests to verify

Estimated impact:
- Files to move: 150+
- Imports to update: 300+
- Configs to modify: 10+

Execute this plan?
```

## Common Commands

```bash
/model opus    # Use Opus for complex file operations
/fast          # Use fast mode for simple operations
/cost          # Check usage cost
```

## Best Practices

1. **Back up important files**: Back up before batch operations
2. **Use Git**: Commit changes before file operations
3. **Delete cautiously**: Preview file list before deleting
4. **Test commands**: Test on a small scale before large operations
5. **Use Plan Mode**: Review plans before complex operations
