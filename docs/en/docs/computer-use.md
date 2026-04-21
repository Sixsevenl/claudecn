---
title: "Computer Use"
---

# Computer Use

Claude Code supports computer use capabilities, allowing AI to directly interact with your system and perform complex automation tasks.

## Basic Usage

```bash
# Launch Claude Code
claude

# Request a system operation
You: Help me open a browser and visit GitHub

Claude: I'll use system commands to accomplish this task...

Claude wants to:
  • Run command: open https://github.com
Allow? [y/n/always/never]

You: y

Claude: Browser opened and navigated to GitHub.
```

## File System Operations

```bash
You: Create a new project folder on the desktop with a basic React project structure

Claude: Let me create the project structure...

Claude wants to:
  • Run command: mkdir -p ~/Desktop/my-react-app/src/components
  • Run command: mkdir -p ~/Desktop/my-react-app/public
  • Write file: ~/Desktop/my-react-app/package.json
  • Write file: ~/Desktop/my-react-app/src/App.tsx
Allow? [y/n/always/never]

You: always

Claude: Project structure created. I've added:
- package.json configuration file
- src/App.tsx main component
- Basic folder structure
```

## Batch File Processing

```bash
You: Find all log files larger than 10MB and compress them

Claude: I'll search for and compress large files...

Claude wants to:
  • Run command: find . -name "*.log" -size +10M
Allow? [y/n/always/never]

You: y

Claude: Found 3 large log files:
- logs/app.log (15MB)
- logs/error.log (12MB)
- logs/debug.log (11MB)

Claude wants to:
  • Run command: gzip logs/app.log
  • Run command: gzip logs/error.log
  • Run command: gzip logs/debug.log
Allow? [y/n/always/never]

You: y

Claude: All large log files compressed, saving about 40MB of space.
```

## System Monitoring

```bash
You: Check system resource usage, warn me if memory usage exceeds 80%

Claude: Let me check system resources...

Claude wants to:
  • Run command: top -l 1 | grep "PhysMem"
  • Run command: df -h
Allow? [y/n/always/never]

You: y

Claude: System resource status:
- Memory usage: 12GB / 16GB (75%)
- Disk usage: 450GB / 500GB (90%)

⚠️ Warning: Disk space usage has reached 90%, cleanup recommended.
```

## Automated Workflows

```bash
You: Automatically backup the src directory to the backups folder daily

Claude: I'll create a backup script...

Claude wants to:
  • Write file: scripts/backup.sh
  • Run command: chmod +x scripts/backup.sh
Allow? [y/n/always/never]

You: y

Claude: Backup script created. Contents:

#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backups/src-backup-$DATE.tar.gz src/
echo "Backup completed: src-backup-$DATE.tar.gz"

You can run manually: ./scripts/backup.sh
Or add to crontab for automation.
```

## Development Environment Setup

```bash
You: Set up a new Node.js project with TypeScript, ESLint, and Prettier

Claude: I'll initialize the project and install dependencies...

Claude wants to:
  • Run command: npm init -y
  • Run command: npm install -D typescript @types/node
  • Run command: npm install -D eslint prettier
  • Write file: tsconfig.json
  • Write file: .eslintrc.json
  • Write file: .prettierrc
Allow? [y/n/always/never]

You: y

Claude: Project setup complete! Configured:
- TypeScript (tsconfig.json)
- ESLint (.eslintrc.json)
- Prettier (.prettierrc)

You can run:
- npm run build - Compile TypeScript
- npm run lint - Check code
```

## Git Operations Automation

```bash
You: Check all uncommitted changes and create a meaningful commit

Claude: Let me check Git status...

Claude wants to:
  • Run command: git status
  • Run command: git diff
Allow? [y/n/always/never]

You: y

Claude: Found the following changes:
- src/components/Button.tsx (modified)
- src/styles/theme.css (new)
- tests/Button.test.tsx (modified)

These changes involve style updates for the button component and tests.

Claude wants to:
  • Run command: git add src/components/Button.tsx src/styles/theme.css tests/Button.test.tsx
  • Run command: git commit -m "feat: update button component with new theme styles"
Allow? [y/n/always/never]

You: y

Claude: Commit created: feat: update button component with new theme styles
```

## Permission Modes

```bash
# Press Shift+Tab to switch to Auto-Accept mode
[Bottom shows: ⏵⏵ accept edits on]

You: Batch rename all test files from .spec.ts to .test.ts

Claude: [Auto-executes without confirmation]
Renaming complete:
- auth.spec.ts → auth.test.ts
- user.spec.ts → user.test.ts
- api.spec.ts → api.test.ts

# Press Shift+Tab again to switch to Plan Mode
[Bottom shows: ⏸ plan mode on]

You: Refactor the entire project structure

Claude: Let me create a refactoring plan...

Plan:
1. Create new folder structure
2. Move existing files to new locations
3. Update all import paths
4. Run tests to ensure nothing is broken

Execute this plan?
```

## Security Considerations

```bash
You: Delete all node_modules folders

Claude: ⚠️ This is a destructive operation. Let me confirm first...

Claude wants to:
  • Run command: find . -name "node_modules" -type d
Allow? [y/n/always/never]

You: y

Claude: Found 5 node_modules folders:
- ./node_modules
- ./packages/app/node_modules
- ./packages/lib/node_modules
- ./examples/demo/node_modules
- ./tools/scripts/node_modules

Total size approximately 2.3GB

Are you sure you want to delete these folders? You'll need to run npm install again.

Claude wants to:
  • Run command: rm -rf ./node_modules ./packages/*/node_modules ./examples/*/node_modules ./tools/*/node_modules
Allow? [y/n/always/never]

You: y

Claude: All node_modules folders deleted, freeing 2.3GB of space.
Remember to run npm install to reinstall dependencies.
```

## Common Commands

```bash
/model opus    # Switch to Opus 4.6 (stronger reasoning)
/fast          # Fast mode (faster responses)
/cost          # View API usage cost
```

## Keyboard Shortcuts

- `Shift+Tab` - Cycle through permission modes (Normal → Auto-Accept → Plan)
- `Ctrl+C` - Interrupt current operation
- `Ctrl+D` - Exit Claude Code

## Best Practices

1. **Use Auto-Accept mode cautiously**: For destructive operations, Normal mode is recommended
2. **Use Plan Mode for large refactoring**: Review the plan first, then execute after confirmation
3. **Check costs regularly**: Use `/cost` to monitor API usage
4. **Backup important data**: Backup before executing batch operations

## Troubleshooting

```bash
# If a command fails
You: Why did the last command fail?

Claude: Let me check the error message...
Error cause: Insufficient permissions

Suggested solutions:
1. Run the command with sudo
2. Or modify file permissions

# Undo operations
You: Undo the recent changes

Claude: I'll restore the previous state...

Claude wants to:
  • Run command: git checkout -- .
Allow? [y/n/always/never]
```
