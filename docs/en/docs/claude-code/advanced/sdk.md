---
title: "Claude Code SDK"
---

# Claude Code SDK

The Claude Code SDK allows you to programmatically integrate Claude Code's capabilities into your own applications, tools, and workflows. With the SDK, you can build custom AI-powered tools.

## Installing the SDK

### Node.js / TypeScript

```bash
npm install @anthropic-ai/claude-code-sdk
```

### Python

```bash
pip install claude-code-sdk
```

### Go

```bash
go get github.com/anthropics/claude-code-sdk-go
```

## Quick Start

### TypeScript Example

```typescript
import { ClaudeCode } from '@anthropic-ai/claude-code-sdk';

// Initialize client
const claude = new ClaudeCode({
  apiKey: process.env.ANTHROPIC_API_KEY,
  workingDir: process.cwd()
});

// Execute task
async function analyzeCode() {
  const result = await claude.chat({
    message: 'Analyze this project architecture',
    tools: ['read', 'grep', 'glob']
  });

  console.log(result.response);
}

analyzeCode();
```

### Python Example

```python
from claude_code_sdk import ClaudeCode
import os

# Initialize client
claude = ClaudeCode(
    api_key=os.environ['ANTHROPIC_API_KEY'],
    working_dir=os.getcwd()
)

# Execute task
result = claude.chat(
    message='Analyze this project architecture',
    tools=['read', 'grep', 'glob']
)

print(result.response)
```

## Core API

### Initializing the Client

```typescript
const claude = new ClaudeCode({
  apiKey: string,              // Anthropic API key
  workingDir: string,          // Working directory
  model: string,               // Model name (default: claude-3-5-sonnet-20241022)
  temperature: number,         // Temperature parameter (0-1)
  maxTokens: number,           // Max tokens
  configPath: string,          // Config file path
  timeout: number              // Timeout in milliseconds
});
```

### Chat Interface

```typescript
interface ChatOptions {
  message: string;             // User message
  tools?: string[];            // Allowed tools list
  context?: string[];          // Context file paths
  systemPrompt?: string;       // System prompt
  stream?: boolean;            // Whether to stream output
  onProgress?: (chunk) => void; // Progress callback
}

const result = await claude.chat(options);
```

### Tool Calls

```typescript
// Read file
const content = await claude.tools.read({
  filePath: '/path/to/file.ts'
});

// Write file
await claude.tools.write({
  filePath: '/path/to/file.ts',
  content: 'console.log("Hello");'
});

// Edit file
await claude.tools.edit({
  filePath: '/path/to/file.ts',
  oldString: 'old code',
  newString: 'new code'
});

// Execute command
const output = await claude.tools.bash({
  command: 'npm test'
});

// Search files
const files = await claude.tools.glob({
  pattern: '**/*.ts'
});

// Search content
const matches = await claude.tools.grep({
  pattern: 'function.*test',
  path: 'src/'
});
```

## Advanced Usage

### Streaming Output

```typescript
const stream = await claude.chat({
  message: 'Refactor this function',
  stream: true,
  onProgress: (chunk) => {
    if (chunk.type === 'text') {
      process.stdout.write(chunk.content);
    } else if (chunk.type === 'tool_use') {
      console.log(`\n[Calling tool: ${chunk.tool}]`);
    }
  }
});
```

### Session Management

```typescript
// Create session
const session = await claude.createSession({
  id: 'my-session',
  persistent: true
});

// Chat in session
await session.chat({
  message: 'Create a user model'
});

await session.chat({
  message: 'Now add authentication'
});

// Get session history
const history = await session.getHistory();

// Save session
await session.save();

// Restore session
const restored = await claude.loadSession('my-session');
```

### Skill Invocation

```typescript
// Call a predefined Skill
const result = await claude.skill('commit', {
  type: 'feat'
});

// Register custom Skill
claude.registerSkill({
  name: 'analyze-performance',
  description: 'Analyze performance bottlenecks',
  handler: async (args) => {
    // Implementation logic
    return {
      bottlenecks: [],
      recommendations: []
    };
  }
});
```

### Hooks Integration

```typescript
// Register Hook
claude.hooks.on('preWrite', async (event) => {
  console.log(`About to write file: ${event.filePath}`);

  // Can modify or block operation
  if (event.filePath.includes('node_modules')) {
    throw new Error('Modifying node_modules is not allowed');
  }
});

claude.hooks.on('postCommit', async (event) => {
  console.log(`Commit completed: ${event.commitHash}`);

  // Trigger follow-up actions
  await notifyTeam(event.commitMessage);
});
```

### Error Handling

```typescript
try {
  const result = await claude.chat({
    message: 'Execute task'
  });
} catch (error) {
  if (error instanceof ClaudeCodeError) {
    console.error('Claude Code error:', error.message);
    console.error('Error code:', error.code);
    console.error('Details:', error.details);
  } else if (error instanceof ToolError) {
    console.error('Tool execution failed:', error.tool);
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Practical Examples

### 1. Automated Code Review Tool

```typescript
import { ClaudeCode } from '@anthropic-ai/claude-code-sdk';
import { execSync } from 'child_process';

class CodeReviewer {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async reviewPR(prNumber: number) {
    // Get PR changes
    const diff = execSync(`gh pr diff ${prNumber}`).toString();

    // Have Claude review
    const result = await this.claude.chat({
      message: `Please review the following PR changes:\n\n${diff}`,
      systemPrompt: `You are a code review expert. Focus on:
        1. Code quality and best practices
        2. Potential bugs and edge cases
        3. Performance issues
        4. Security vulnerabilities

        Provide specific improvement suggestions.`
    });

    // Post review comment
    await this.postReview(prNumber, result.response);

    return result;
  }

  private async postReview(prNumber: number, review: string) {
    execSync(`gh pr review ${prNumber} --comment -b "${review}"`);
  }
}

// Usage
const reviewer = new CodeReviewer();
await reviewer.reviewPR(123);
```

### 2. Smart Test Generator

```typescript
class TestGenerator {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async generateTests(filePath: string) {
    // Read source file
    const sourceCode = await this.claude.tools.read({
      filePath
    });

    // Generate tests
    const result = await this.claude.chat({
      message: `Generate comprehensive unit tests for:\n\n${sourceCode}`,
      context: [filePath],
      systemPrompt: `Generate high-quality unit tests:
        - Cover all public functions
        - Test normal paths and edge cases
        - Test error handling
        - Use clear test descriptions
        - Mock external dependencies`
    });

    // Save test file
    const testPath = filePath.replace(/\.ts$/, '.test.ts');
    await this.claude.tools.write({
      filePath: testPath,
      content: result.response
    });

    // Run tests to verify
    const testResult = await this.claude.tools.bash({
      command: `npm test ${testPath}`
    });

    return {
      testPath,
      testResult
    };
  }
}
```

### 3. Documentation Sync Tool

```typescript
class DocSyncer {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // Listen for code changes
    this.claude.hooks.on('postCommit', async (event) => {
      await this.syncDocs(event);
    });
  }

  async syncDocs(event: CommitEvent) {
    // Check for API changes
    const apiFiles = event.files.filter(f =>
      f.includes('src/api') || f.includes('src/routes')
    );

    if (apiFiles.length === 0) return;

    // Generate API documentation
    const result = await this.claude.chat({
      message: 'Update API documentation to reflect latest changes',
      context: apiFiles,
      tools: ['read', 'write', 'grep']
    });

    console.log('Documentation updated:', result.filesModified);
  }
}
```

### 4. CI/CD Integration

```typescript
import { ClaudeCode } from '@anthropic-ai/claude-code-sdk';

class CIHelper {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async analyzeBuildFailure(buildLog: string) {
    const result = await this.claude.chat({
      message: `Analyze the build failure and provide fix suggestions:\n\n${buildLog}`,
      systemPrompt: `You are a CI/CD expert. Analyze the build log:
        1. Identify the root cause of failure
        2. Provide specific fix steps
        3. Suggest preventive measures`
    });

    return result.response;
  }

  async suggestOptimizations() {
    const result = await this.claude.chat({
      message: 'Analyze CI configuration and provide optimization suggestions',
      context: ['.github/workflows/*.yml'],
      tools: ['read', 'grep']
    });

    return result.response;
  }
}

// Use in GitHub Actions
const ci = new CIHelper();
const analysis = await ci.analyzeBuildFailure(process.env.BUILD_LOG);
console.log(analysis);
```

### 5. Code Migration Assistant

```typescript
class MigrationHelper {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async migrateToNewAPI(pattern: string) {
    // Find files that need migration
    const files = await this.claude.tools.grep({
      pattern,
      outputMode: 'files_with_matches'
    });

    // Migrate one by one
    for (const file of files) {
      await this.claude.chat({
        message: `Migrate this file to the new API`,
        context: [file],
        systemPrompt: `Migration guide:
          - Old API: oldFunction()
          - New API: newFunction()
          - Keep functionality unchanged
          - Update import statements
          - Add migration comments`
      });
    }

    // Run tests to verify
    await this.claude.tools.bash({
      command: 'npm test'
    });
  }
}
```

## Configuration Management

### Loading Configuration

```typescript
const claude = new ClaudeCode({
  configPath: '.claude/config.json'
});

// Or pass configuration directly
const claude = new ClaudeCode({
  config: {
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.7,
    tools: ['read', 'write', 'bash'],
    hooks: {
      preWrite: './scripts/validate.sh'
    }
  }
});
```

### Dynamic Configuration

```typescript
// Update configuration
claude.updateConfig({
  temperature: 0.5,
  maxTokens: 4096
});

// Get current configuration
const config = claude.getConfig();
```

## Type Definitions

### TypeScript Types

```typescript
interface ClaudeCodeOptions {
  apiKey: string;
  workingDir?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  configPath?: string;
  timeout?: number;
}

interface ChatResult {
  response: string;
  toolCalls: ToolCall[];
  filesRead: string[];
  filesModified: string[];
  tokensUsed: number;
  duration: number;
}

interface ToolCall {
  tool: string;
  args: Record<string, any>;
  result: any;
  duration: number;
}

interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  chat(options: ChatOptions): Promise<ChatResult>;
  getHistory(): Message[];
  save(): Promise<void>;
  clear(): void;
}
```

## Best Practices

### 1. Error Handling

```typescript
async function safeExecute() {
  try {
    const result = await claude.chat({
      message: 'Execute task',
      timeout: 30000
    });
    return result;
  } catch (error) {
    if (error.code === 'TIMEOUT') {
      console.error('Task timed out');
    } else if (error.code === 'RATE_LIMIT') {
      console.error('API rate limited, retrying later');
      await sleep(60000);
      return safeExecute();
    } else {
      throw error;
    }
  }
}
```

### 2. Resource Management

```typescript
// Clean up when done
const claude = new ClaudeCode({...});

try {
  await claude.chat({...});
} finally {
  await claude.dispose();
}
```

### 3. Batch Operations

```typescript
async function batchProcess(files: string[]) {
  const results = await Promise.all(
    files.map(file =>
      claude.chat({
        message: `Process file: ${file}`,
        context: [file]
      })
    )
  );

  return results;
}
```

### 4. Progress Tracking

```typescript
const progress = {
  total: 100,
  current: 0
};

await claude.chat({
  message: 'Large task',
  onProgress: (chunk) => {
    progress.current++;
    console.log(`Progress: ${progress.current}/${progress.total}`);
  }
});
```

## Testing

### Unit Tests

```typescript
import { ClaudeCode } from '@anthropic-ai/claude-code-sdk';
import { jest } from '@jest/globals';

describe('ClaudeCode SDK', () => {
  let claude: ClaudeCode;

  beforeEach(() => {
    claude = new ClaudeCode({
      apiKey: 'test-key',
      workingDir: '/tmp/test'
    });
  });

  afterEach(async () => {
    await claude.dispose();
  });

  test('should read file', async () => {
    const content = await claude.tools.read({
      filePath: '/tmp/test/file.txt'
    });

    expect(content).toBeDefined();
  });

  test('should handle errors', async () => {
    await expect(
      claude.tools.read({
        filePath: '/nonexistent/file.txt'
      })
    ).rejects.toThrow();
  });
});
```

### Mock Tests

```typescript
jest.mock('@anthropic-ai/claude-code-sdk');

const mockChat = jest.fn().mockResolvedValue({
  response: 'Mocked response',
  toolCalls: [],
  filesRead: [],
  filesModified: []
});

ClaudeCode.prototype.chat = mockChat;
```

## Troubleshooting

### Common Issues

**API key error**
```typescript
// Verify API key
if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY not set');
}
```

**Timeout issues**
```typescript
// Increase timeout
const claude = new ClaudeCode({
  timeout: 120000  // 2 minutes
});
```

**Memory leak**
```typescript
// Ensure cleanup
process.on('exit', async () => {
  await claude.dispose();
});
```

## Next Steps

- View the [API Reference](https://docs.anthropic.com/claude-code/sdk)
- Explore [Example Projects](https://github.com/anthropics/claude-code-examples)
- Join the [Developer Community](https://discord.gg/anthropic)
