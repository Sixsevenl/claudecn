---
title: "Subagents"
---

# Subagents

Subagents are an advanced feature of Claude Code that allows the main Agent to create specialized task executors. Through task decomposition and parallel execution, Subagents can handle complex multi-step workflows, improving efficiency and focus.

## What are Subagents

Subagents are independent Claude instances created and assigned specific tasks by the main Agent. Each Subagent has:

- **Independent context**: Does not share the main Agent's conversation history
- **Specialized responsibility**: Focused on a single, clear task
- **Restricted permissions**: Configurable tool access
- **Result return**: Returns results to the main Agent upon completion

### Use Cases

- **Parallel tasks**: Process multiple independent tasks simultaneously
- **Specialized division of labor**: Use different prompt strategies for different tasks
- **Context isolation**: Avoid overloading the main Agent's context
- **Recursive decomposition**: Break complex tasks down layer by layer

## Basic Usage

### Creating a Subagent

In a conversation, Claude can automatically create Subagents:

```
User: Please analyze this project's frontend and backend architecture, and generate documentation

Claude: I'll create two Subagents to process in parallel:
1. Frontend Analyzer - Analyze frontend architecture
2. Backend Analyzer - Analyze backend architecture

[Creating Subagent: frontend-analyzer]
Task: Analyze src/frontend directory architecture
Tools: read, glob, grep
Context: src/frontend/**

[Creating Subagent: backend-analyzer]
Task: Analyze src/backend directory architecture
Tools: read, glob, grep
Context: src/backend/**
```

### Subagent Configuration

Configure Subagent behavior via `.claude/config.json`:

```json
{
  "subagents": {
    "enabled": true,
    "maxConcurrent": 3,
    "maxDepth": 2,
    "defaultTimeout": 300000,
    "defaultTools": ["read", "grep", "glob"],
    "templates": {
      "analyzer": {
        "systemPrompt": "You are a code analysis expert, focusing on architecture analysis and documentation generation.",
        "tools": ["read", "grep", "glob"],
        "temperature": 0.3
      },
      "coder": {
        "systemPrompt": "You are a code generation expert, focusing on writing high-quality code.",
        "tools": ["read", "write", "edit"],
        "temperature": 0.7
      },
      "tester": {
        "systemPrompt": "You are a testing expert, focusing on writing comprehensive test cases.",
        "tools": ["read", "write", "bash"],
        "temperature": 0.5
      }
    }
  }
}
```

## Subagent Templates

### 1. Code Analysis Template

`.claude/subagents/analyzer.md`:

```markdown
---
name: analyzer
description: Code analysis expert
tools:
  - read
  - grep
  - glob
temperature: 0.3
---

# Code Analysis Subagent

You are a code analysis expert, focusing on:

## Core Responsibilities
1. Analyze code structure and architecture
2. Identify design patterns
3. Evaluate code quality
4. Generate analysis reports

## Analysis Methods
- Top-down: Start from entry points and trace
- Dependency analysis: Identify module relationships
- Pattern recognition: Discover common design patterns
- Quality assessment: Code complexity, maintainability

## Output Format
- Structured Markdown report
- Include code examples
- Highlight key findings
- Provide improvement suggestions
```

### 2. Code Generation Template

`.claude/subagents/coder.md`:

```markdown
---
name: coder
description: Code generation expert
tools:
  - read
  - write
  - edit
temperature: 0.7
---

# Code Generation Subagent

You are a code generation expert, focusing on:

## Core Responsibilities
1. Generate code based on specifications
2. Follow project coding conventions
3. Ensure code quality
4. Add appropriate comments

## Generation Principles
- Follow DRY principles
- Keep code concise
- Use meaningful naming
- Consider edge cases
- Handle error conditions

## Quality Standards
- Type safety
- No linter warnings
- Match project style
- Testability
```

### 3. Test Generation Template

`.claude/subagents/tester.md`:

```markdown
---
name: tester
description: Testing expert
tools:
  - read
  - write
  - bash
temperature: 0.5
---

# Test Generation Subagent

You are a testing expert, focusing on:

## Core Responsibilities
1. Generate comprehensive test cases
2. Ensure test coverage
3. Write maintainable tests
4. Verify tests pass

## Testing Strategy
- Unit tests: Test individual functions
- Integration tests: Test module interactions
- Boundary tests: Test edge cases
- Error tests: Test exception handling

## Test Quality
- Clear test descriptions
- Meaningful assertions
- Reasonable use of mocks
- Test independence
```

## Practical Examples

### Example 1: Full-Stack Feature Development

```markdown
Task: Implement user authentication

Main Agent decomposition:
1. [Subagent: backend-coder] Implement backend API
2. [Subagent: frontend-coder] Implement frontend components
3. [Subagent: tester] Generate end-to-end tests
4. [Main Agent] Integrate and verify

Execution flow:
```

```json
{
  "task": "User authentication feature",
  "subagents": [
    {
      "id": "backend-coder",
      "template": "coder",
      "task": "Implement /api/auth endpoints",
      "context": ["src/backend/routes/", "src/backend/models/"],
      "deliverables": [
        "src/backend/routes/auth.ts",
        "src/backend/middleware/auth.ts"
      ]
    },
    {
      "id": "frontend-coder",
      "template": "coder",
      "task": "Implement login/register components",
      "context": ["src/frontend/components/", "src/frontend/api/"],
      "deliverables": [
        "src/frontend/components/Login.tsx",
        "src/frontend/components/Register.tsx"
      ]
    },
    {
      "id": "tester",
      "template": "tester",
      "task": "Generate authentication tests",
      "dependencies": ["backend-coder", "frontend-coder"],
      "deliverables": [
        "tests/e2e/auth.test.ts"
      ]
    }
  ]
}
```

### Example 2: Codebase Refactoring

```markdown
Task: Refactor payment module

Main Agent strategy:
1. [Subagent: analyzer] Analyze existing code
2. [Main Agent] Create refactoring plan
3. [Subagent: refactor-1] Refactor core logic
4. [Subagent: refactor-2] Refactor helper functions
5. [Subagent: tester] Verify refactoring results
```

### Example 3: Documentation Generation

```markdown
Task: Generate project documentation

Parallel execution:
- [Subagent: api-doc] Generate API documentation
- [Subagent: arch-doc] Generate architecture documentation
- [Subagent: user-doc] Generate user guide
- [Subagent: dev-doc] Generate developer guide

Main Agent integration:
- Merge all documentation
- Generate table of contents
- Unify formatting
- Add navigation
```

## Advanced Features

### 1. Subagent Communication

Subagents can communicate through the main Agent:

```json
{
  "communication": {
    "enabled": true,
    "protocol": "message-passing",
    "channels": {
      "frontend-backend": {
        "participants": ["frontend-coder", "backend-coder"],
        "purpose": "API interface coordination"
      }
    }
  }
}
```

### 2. Dependency Management

Define Subagent execution order:

```json
{
  "subagents": [
    {
      "id": "schema-designer",
      "dependencies": []
    },
    {
      "id": "backend-coder",
      "dependencies": ["schema-designer"]
    },
    {
      "id": "frontend-coder",
      "dependencies": ["backend-coder"]
    }
  ]
}
```

### 3. Result Aggregation

The main Agent aggregates Subagent results:

```markdown
## Aggregation Strategy

1. **Collect Results**
   - Wait for all Subagents to complete
   - Collect output and metadata
   - Check for errors and warnings

2. **Verify Consistency**
   - Check interface matching
   - Verify data formats
   - Confirm dependencies are satisfied

3. **Integrate Output**
   - Merge code changes
   - Generate unified report
   - Update documentation
```

### 4. Error Handling

```json
{
  "errorHandling": {
    "strategy": "retry-or-escalate",
    "maxRetries": 2,
    "retryDelay": 5000,
    "onFailure": "escalate-to-main",
    "fallback": {
      "enabled": true,
      "action": "manual-intervention"
    }
  }
}
```

## Performance Optimization

### Parallel Execution

```json
{
  "execution": {
    "mode": "parallel",
    "maxConcurrent": 3,
    "scheduling": "priority-based",
    "priorities": {
      "critical": ["schema-designer"],
      "high": ["backend-coder"],
      "normal": ["frontend-coder"],
      "low": ["doc-generator"]
    }
  }
}
```

### Resource Limits

```json
{
  "resources": {
    "perSubagent": {
      "maxTokens": 100000,
      "maxDuration": 300000,
      "maxToolCalls": 50
    },
    "total": {
      "maxSubagents": 10,
      "maxTotalTokens": 500000
    }
  }
}
```

### Context Optimization

```json
{
  "context": {
    "sharing": "minimal",
    "isolation": "strict",
    "preload": {
      "enabled": true,
      "patterns": ["*.config.js", "package.json"]
    }
  }
}
```

## Monitoring and Debugging

### Execution Logs

```bash
# View Subagent execution logs
claude --subagent-logs

# Output example
[2024-01-15 10:30:00] Main Agent: Creating task plan
[2024-01-15 10:30:05] Subagent[analyzer]: Starting execution
[2024-01-15 10:30:15] Subagent[analyzer]: Analysis complete
[2024-01-15 10:30:20] Subagent[coder]: Starting execution
[2024-01-15 10:30:45] Subagent[coder]: Code generation complete
[2024-01-15 10:30:50] Main Agent: Aggregating results
```

### Performance Analysis

```bash
# View Subagent performance statistics
claude --subagent-stats

# Output example
Subagent Performance:
  analyzer:
    Duration: 10s
    Tokens: 15,000
    Tool Calls: 8
  coder:
    Duration: 25s
    Tokens: 35,000
    Tool Calls: 12
  Total:
    Duration: 35s (15s parallel)
    Tokens: 50,000
    Efficiency: 57% time saved
```

### Debug Mode

```bash
# Enable Subagent debugging
claude --debug-subagents

# Step-by-step execution
claude --subagent-step-mode
```

## Best Practices

### 1. Task Decomposition Principles

- **Single responsibility**: Each Subagent does only one thing
- **Clear boundaries**: Clearly define inputs and outputs
- **Minimal dependencies**: Reduce dependencies between Subagents
- **Parallelizable**: Prioritize designing parallelizable tasks

### 2. Template Design

- **Specialization**: Create dedicated templates for different task types
- **Reusable**: Templates should apply to multiple scenarios
- **Parameterized**: Support flexible configuration
- **Documented**: Clearly explain template purposes

### 3. Error Handling

- **Graceful degradation**: Subagent failure should not cause overall failure
- **Retry mechanism**: Retry on temporary errors
- **Error reporting**: Clearly report error causes
- **Rollback support**: Support undoing failed operations

### 4. Performance Considerations

- **Avoid over-decomposition**: Too many Subagents increases overhead
- **Reasonable parallelism**: Set concurrency based on task characteristics
- **Minimize context**: Only pass necessary context
- **Result caching**: Cache reusable results

## Security Considerations

### Permission Control

```json
{
  "security": {
    "subagentPermissions": {
      "analyzer": {
        "allowedTools": ["read", "grep", "glob"],
        "allowedPaths": ["src/**", "tests/**"],
        "deniedPaths": [".env", "secrets/**"]
      },
      "coder": {
        "allowedTools": ["read", "write", "edit"],
        "requireApproval": ["write", "edit"],
        "allowedPaths": ["src/**"],
        "deniedPaths": ["node_modules/**"]
      }
    }
  }
}
```

### Audit Logging

```json
{
  "audit": {
    "enabled": true,
    "logLevel": "detailed",
    "logPath": ".claude/logs/subagents/",
    "retention": "30d",
    "events": [
      "subagent-created",
      "tool-called",
      "file-modified",
      "subagent-completed"
    ]
  }
}
```

## Troubleshooting

### Common Issues

**Subagent creation failed**
- Check configuration file syntax
- Verify template exists
- Confirm permission settings

**Subagent timeout**
- Increase `maxDuration` setting
- Simplify task complexity
- Check for infinite loops

**Inconsistent results**
- Check dependencies between Subagents
- Verify data passing
- Confirm execution order

**Resource exhaustion**
- Reduce concurrency
- Optimize context size
- Limit token usage

## Next Steps

- Learn about [Skills](./skills.md) to create reusable Subagent templates
- Explore [Hooks](./hooks.md) to automatically trigger Subagents
- Check the [Pattern Library](./pattern-library.md) for more examples
