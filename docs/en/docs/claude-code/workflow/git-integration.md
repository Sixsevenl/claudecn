---
title: "Git Integration"
---

# Git Integration

Claude Code integrates deeply with Git, helping you manage version control workflows. From creating commits to managing branches, Claude can automate many Git operations while following best practices.

## Git Workflow Basics

### Viewing Status

Claude can help you understand the current Git state:

```
Check git status, tell me what changes there are
```

Claude will run `git status` and explain the results, including:
- Modified files
- Staged changes
- Untracked files
- Current branch information

### Viewing Diffs

```
Show me my changes to src/auth/login.ts
```

Claude will run `git diff` and explain what changed and its impact.

## Creating Commits

### Smart Commit Messages

Claude can analyze your changes and generate meaningful commit messages:

```
Create a commit for the current changes
```

Claude will:
1. Check all changed files
2. Analyze the nature of changes
3. Generate a message following Conventional Commits specification
4. Create the commit

Example commit message:
```
feat(auth): add JWT refresh token support

- Implement token refresh endpoint
- Add refresh token to user session
- Update authentication middleware
```

### Following Commit Conventions

Claude understands common commit message conventions:

- Conventional Commits
- Angular Commit Guidelines
- Semantic Commit Messages

You can specify the convention your project uses:

```
Create a commit using the Angular commit convention
```

### Phased Commits

For work containing multiple logical changes, create separate commits:

```
Create a commit for the authentication changes,
and another commit for the UI changes
```

Claude will:
1. Identify different types of changes
2. Stage related files separately
3. Create independent commits for each group

## Branch Management

### Creating Branches

```
Create a new branch feature/user-profile
```

Claude will:
- Check current branch status
- Create the new branch
- Switch to the new branch
- Confirm the operation succeeded

### Branch Naming Conventions

Claude can help follow branch naming conventions:

```
Create a branch for adding email notification feature
```

Claude will suggest names based on common conventions:
- `feature/email-notifications`
- `feat/email-notifications`
- `add-email-notifications`

### Switching Branches

```
Switch to the main branch
```

Claude will:
- Check for uncommitted changes
- Prompt to save or stash changes if necessary
- Switch branches
- Confirm the switch succeeded

### Merging Branches

```
Merge feature/user-profile into main
```

Claude will:
1. Switch to the target branch
2. Check for conflicts
3. Execute the merge
4. Provide resolution suggestions if there are conflicts

## Handling Merge Conflicts

### Identifying Conflicts

```
Check for merge conflicts
```

Claude will list all files with conflicts and explain the nature of each conflict.

### Resolving Conflicts

```
Help me resolve the merge conflict in src/config.ts
```

Claude will:
1. Show the conflicting content
2. Analyze the differences between both versions
3. Suggest a resolution
4. Apply the resolution
5. Mark the conflict as resolved

### Complex Conflict Resolution

For complex conflicts:

```
This conflict involves refactoring and a new feature,
keep the new feature but use the refactored structure
```

Claude will understand your intent and intelligently merge the code.

## Code Review Workflow

### Creating Pull Requests

```
Create a PR for the current branch
```

Claude will:
1. Push the current branch to remote
2. Analyze the commit history
3. Generate PR title and description
4. Create the PR using GitHub CLI

### PR Description Generation

Claude-generated PR descriptions typically include:

```markdown
## Changes
- Add user profile page
- Implement avatar upload feature
- Add profile edit form

## Testing
- 95% unit test coverage
- Manual testing of all form validations
- Tested file upload limits

## Screenshots
[If applicable]

## Related Issues
Closes #123
```

### Reviewing Others' PRs

```
Review PR #456
```

Claude will:
1. Fetch the PR changes
2. Analyze code quality
3. Check for potential issues
4. Provide improvement suggestions
5. Generate review comments

## History Management

### Viewing Commit History

```
Show the last 10 commits
```

```
View the commit history for the src/auth/ directory
```

### Finding Specific Changes

```
Find which commit introduced the User interface
```

Claude will use `git log` and `git blame` to trace changes.

### Reverting Changes

```
Revert the last commit but keep the changes
```

Claude will use `git reset --soft HEAD~1`.

```
Completely undo the last commit
```

Claude will use `git reset --hard HEAD~1` (after confirming).

## Stash Management

### Saving Work in Progress

```
Stash current changes, I need to switch branches
```

Claude will:
- Run `git stash push`
- Add a descriptive message
- Confirm the stash succeeded

### Restoring Work in Progress

```
Restore my previously stashed changes
```

Claude will:
- List available stashes
- Apply the most recent stash
- Handle possible conflicts

### Managing Multiple Stashes

```
List all stashes
```

```
Apply stash@{2}
```

## Remote Repository Operations

### Pushing Changes

```
Push the current branch to remote
```

Claude will:
- Check remote branch status
- Push changes
- Handle possible conflicts
- Confirm the push succeeded

### Pulling Updates

```
Pull latest changes from the main branch
```

Claude will:
- Run `git pull`
- Handle merge conflicts (if any)
- Update the local branch

### Syncing a Fork

```
Sync my fork with the upstream repository
```

Claude will:
1. Add the upstream remote (if not added)
2. Fetch upstream changes
3. Merge into the local branch
4. Push to your fork

## Git Best Practices

### Atomic Commits

Claude encourages creating atomic commits:

```
Should these changes be split into multiple commits?
```

Claude will analyze the changes and suggest logical groupings.

### Pre-commit Checks

Before creating a commit, Claude will:
- Run linters
- Run tests
- Check code formatting
- Verify the build succeeds

### Protecting Sensitive Information

Claude will detect and warn:

```
Warning: .env file contains sensitive information and should not be committed.
It has been added to .gitignore.
```

## Advanced Git Operations

### Interactive Rebase

```
Clean up the last 5 commits
```

Claude will help you:
- Squash related commits
- Rewrite commit messages
- Reorder commits
- Remove unnecessary commits

### Cherry-pick

```
Apply commit abc123 to the current branch
```

Claude will:
- Execute the cherry-pick
- Handle conflicts
- Verify the result

### Submodule Management

```
Add submodule https://github.com/user/repo
```

```
Update all submodules
```

## Git Hooks Integration

### Pre-commit Hooks

Claude can help set up pre-commit hooks:

```
Set up a pre-commit hook to run linter and tests
```

### Commit Message Validation

```
Add a commit-msg hook to validate commit message format
```

## Troubleshooting

### Resolving Detached HEAD

```
I'm in a detached HEAD state, what should I do?
```

Claude will:
1. Explain the current state
2. Provide recovery options
3. Help create a new branch or return to the original branch

### Recovering Lost Commits

```
I accidentally deleted a branch, how can I recover it?
```

Claude will use `git reflog` to find the lost commits.

### Cleaning the Repository

```
Clean up untracked files and directories
```

Claude will:
- First show what will be deleted
- Execute cleanup after confirmation
- Use `git clean`

## Team Collaboration Patterns

### Git Flow

```
Create a new feature branch using Git Flow
```

Claude understands the Git Flow pattern and will:
- Create a feature branch from develop
- Follow naming conventions
- Merge back to develop when complete

### GitHub Flow

```
Start a new feature using GitHub Flow
```

Claude will:
- Create a branch from main
- Create a PR when development is complete
- Delete the branch after merging

### Trunk-Based Development

```
Commit changes using the trunk-based pattern
```

Claude will:
- Create a short-lived branch
- Quickly merge to main
- Use feature flags to control functionality

## Performance Optimization

### Large Repository Handling

For large repositories, Claude will:
- Use shallow clones
- Enable sparse checkout
- Optimize Git configuration

### Cleaning History

```
Reduce the repository size
```

Claude will:
- Identify large files
- Use git-filter-repo to clean history
- Rewrite history (with confirmation)

## Best Practices Checklist

- [ ] Run tests before committing
- [ ] Use descriptive commit messages
- [ ] Keep commits atomic
- [ ] Push to remote regularly
- [ ] Resolve merge conflicts promptly
- [ ] Don't commit sensitive information
- [ ] Use branches for feature development
- [ ] Review code before merging
- [ ] Keep commit history clean
- [ ] Sync remote changes regularly

With Claude Code's Git integration, you can manage version control more efficiently, focusing on writing code rather than memorizing Git commands.
