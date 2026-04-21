---
title: "Plan Mode"
---

# Plan Mode

Plan mode is a powerful Claude Code feature that allows Claude to create a detailed plan before executing complex tasks, then execute it step by step. This approach improves the quality and predictability of task completion.

## What is Plan Mode

Plan mode is a structured way of working with three phases:

1. Analysis phase: Understand task requirements and constraints
2. Planning phase: Create a detailed execution plan
3. Execution phase: Implement step by step according to the plan

This approach is particularly suitable for complex, multi-step tasks.

## When to Use Plan Mode

### Good Candidates for Plan Mode

- Large feature development
- System refactoring
- Architecture changes
- Multi-file modifications
- Complex bug fixes
- Data migration
- Performance optimization
- Security hardening

### When Plan Mode is Not Needed

- Simple single-file modifications
- Quick bug fixes
- Adding simple features
- Documentation updates
- Configuration adjustments

## Enabling Plan Mode

### Explicit Request

Explicitly ask Claude to create a plan:

```
Create a detailed plan for refactoring the user authentication system,
then wait for my approval before executing
```

### Automatic Trigger

For complex tasks, Claude may automatically suggest using plan mode:

```
This is a complex task, I recommend creating a plan first.
Let me analyze the requirements and propose an execution plan.
```

## Plan Structure

### Standard Plan Format

A good plan typically includes:

```
Task: Refactor user authentication system

Goals:
- Improve security
- Enhance code maintainability
- Maintain backward compatibility

Analysis:
- Current implementation uses simple sessions
- Missing refresh token mechanism
- Password encryption algorithm is outdated
- No rate limiting

Plan:
1. Preparation phase
   - Back up current code
   - Create feature branch
   - Set up test environment

2. Implementation phase
   - Step 1: Update password encryption (bcrypt)
   - Step 2: Implement JWT tokens
   - Step 3: Add refresh tokens
   - Step 4: Implement rate limiting
   - Step 5: Update middleware

3. Testing phase
   - Unit tests
   - Integration tests
   - Security tests

4. Deployment phase
   - Update documentation
   - Data migration
   - Gradual rollout

Risks and mitigations:
- Risk: Breaking existing functionality
  Mitigation: Maintain backward compatibility, gradual migration
- Risk: Performance degradation
  Mitigation: Performance testing, optimize critical paths

Estimated time: 2-3 days
```

## Plan Review

### Review Checklist

Before approving a plan, check:

- Are the goals clear and specific
- Are the steps complete and reasonable
- Is the order correct
- Are risks identified
- Are mitigations adequate
- Are time estimates reasonable

### Providing Feedback

If the plan needs adjustments:

```
The plan looks good, but a few suggestions:
1. Add performance testing between steps 2 and 3
2. Step 4 should come before step 2 - rate limit first, then change auth
3. Add a rollback plan
```

### Approving Execution

When satisfied with the plan:

```
Plan approved, please begin execution
```

Or execute in phases:

```
Execute the preparation phase first, wait for my confirmation when done
```

## Execution Process

### Step-by-Step Execution

Claude will execute the plan step by step:

```
Executing step 1: Update password encryption

1. Install bcrypt package
2. Create encryption utility functions
3. Update registration logic
4. Update login verification
5. Add unit tests

Step 1 complete. Continue to step 2?
```

### Checkpoint Confirmation

Confirm after critical steps:

```
Step 2 complete: JWT tokens implemented

Please test the following:
- User login
- Token verification
- Token expiration handling

Once confirmed, I'll proceed to step 3.
```

### Handling Issues

If issues arise during execution:

```
Issue found during step 3:
The existing session middleware conflicts with JWT

Suggested solutions:
A. Remove session middleware first
B. Create a compatibility layer supporting both approaches
C. Adjust JWT implementation to be compatible with sessions

Please choose a solution or provide other suggestions.
```

## Plan Adjustment

### Dynamic Adjustment

Adjust the plan based on execution progress:

```
During step 2, I found an additional step is needed:
- Step 2.5: Implement token blacklist mechanism

Updated plan:
1. Update password encryption ✓
2. Implement JWT tokens ✓
2.5. Implement token blacklist (new)
3. Add refresh tokens
4. Implement rate limiting
5. Update middleware
```

### Priority Adjustment

Adjust priorities as needed:

```
Found an urgent bug in production,
pause current plan, fix the bug first
```

## Advantages of Plan Mode

### Higher Success Rate

- Identify issues and risks early
- Ensure steps are complete and properly ordered
- Reduce rework and errors

### Better Communication

- Clear execution path
- Defined checkpoints
- Facilitates team collaboration

### Controllability

- Can pause at any step
- Can adjust the plan
- Can roll back changes

### Traceability

- Records decision-making process
- Facilitates future review
- Helps with knowledge transfer

## Advanced Techniques

### Layered Planning

For extra-large tasks, use layered plans:

```
High-level plan:
1. Refactor authentication system
2. Refactor authorization system
3. Refactor session management

Detailed plan for step 1:
1.1 Update password encryption
1.2 Implement JWT
1.3 Add refresh tokens
...
```

### Parallel Execution

Identify steps that can be executed in parallel:

```
Can execute in parallel:
- Branch A: Backend API refactoring
- Branch B: Frontend component updates
- Branch C: Database migration scripts

Final merge and integration testing
```

### Rollback Plan

Prepare a rollback plan for each step:

```
Step 2: Implement JWT tokens
Rollback plan:
- Restore old session middleware
- Roll back database changes
- Restore configuration files
```

### Dependency Management

Clarify dependencies between steps:

```
Dependencies:
- Step 3 depends on Step 2
- Step 5 depends on Steps 3 and 4
- Step 6 can execute independently
```

## Plan Templates

### Feature Development Template

```
Task: [Feature name]

Requirements analysis:
- Feature description
- User stories
- Acceptance criteria

Technical approach:
- Technology selection
- Architecture design
- Interface design

Implementation plan:
1. Data model design
2. Backend API implementation
3. Frontend interface development
4. Integration and testing
5. Documentation and deployment

Test plan:
- Unit tests
- Integration tests
- E2E tests

Deployment plan:
- Environment preparation
- Data migration
- Gradual rollout
- Monitoring and rollback
```

### Refactoring Template

```
Task: [Refactoring target]

Current issues:
- Issue 1
- Issue 2
- Issue 3

Refactoring goals:
- Goal 1
- Goal 2
- Goal 3

Refactoring plan:
1. Preparation phase
   - Add test coverage
   - Create refactoring branch
   - Back up data

2. Refactoring phase
   - Step 1
   - Step 2
   - Step 3

3. Verification phase
   - Run tests
   - Performance comparison
   - Code review

4. Cleanup phase
   - Delete old code
   - Update documentation
   - Merge branch

Risk control:
- Maintain backward compatibility
- Gradual migration
- Prepare rollback plan
```

### Bug Fix Template

```
Bug: [Bug description]

Impact scope:
- Affected features
- Affected users
- Severity

Root cause analysis:
- Cause
- Trigger conditions
- Related code

Fix plan:
1. Reproduce the issue
2. Write test case
3. Implement fix
4. Verify fix
5. Regression testing

Prevention measures:
- Add monitoring
- Improve tests
- Update documentation
```

## Best Practices

### Keep Plans Concise

Avoid overly detailed plans:

```
Good granularity:
1. Implement user authentication API
2. Add frontend login form
3. Integration testing

Too detailed:
1. Open auth.ts file
2. Import bcrypt package
3. Create hashPassword function
4. Add export keyword
...
```

### Be Flexible

Plans are not set in stone:

```
Adjusting plans based on reality is normal,
don't be rigid about the initial plan
```

### Document Changes

Record plan changes and reasons:

```
Plan change log:
- 2024-01-15: Added step 2.5 (token blacklist)
  Reason: Found need to handle token revocation scenarios
- 2024-01-16: Adjusted order of steps 4 and 5
  Reason: Rate limiting should come before middleware updates
```

### Summarize Experience

Summarize lessons after task completion:

```
Task summary:
Completion:
- 80% completed as planned
- 2 new steps added
- 1 step order adjusted

Lessons learned:
- Should have considered token revocation earlier
- Test coverage was insufficient
- Documentation updates should have been done concurrently

Improvement suggestions:
- Consider edge cases more comprehensively during planning
- Update documentation immediately after each step
```

## FAQ

### Issue 1: Plan Too Complex

Solution: Break into multiple subtasks, plan each independently

### Issue 2: Execution Deviates from Plan

Solution: Adjust the plan promptly, document reasons for changes

### Issue 3: Plan Not Detailed Enough

Solution: Refine critical steps before execution

### Issue 4: Plan Outdated

Solution: Regularly review and update the plan

## Summary

Core values of Plan Mode:

- Think ahead, reduce rework
- Structured execution, improve quality
- Controllable and traceable, easy to manage
- Facilitate communication, enhance collaboration

By mastering Plan Mode, you can tackle complex tasks with confidence, improving development efficiency and code quality.
