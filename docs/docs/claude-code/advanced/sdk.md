---
title: "Claude Code SDK"
---

# Claude Code SDK

Claude Code SDK 允许你以编程方式集成 Claude Code 的能力到自己的应用、工具和工作流中。通过 SDK，你可以构建自定义的 AI 驱动工具。

## 安装 SDK

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

## 快速开始

### TypeScript 示例

```typescript
import { ClaudeCode } from '@anthropic-ai/claude-code-sdk';

// 初始化客户端
const claude = new ClaudeCode({
  apiKey: process.env.ANTHROPIC_API_KEY,
  workingDir: process.cwd()
});

// 执行任务
async function analyzeCode() {
  const result = await claude.chat({
    message: '分析这个项目的架构',
    tools: ['read', 'grep', 'glob']
  });

  console.log(result.response);
}

analyzeCode();
```

### Python 示例

```python
from claude_code_sdk import ClaudeCode
import os

# 初始化客户端
claude = ClaudeCode(
    api_key=os.environ['ANTHROPIC_API_KEY'],
    working_dir=os.getcwd()
)

# 执行任务
result = claude.chat(
    message='分析这个项目的架构',
    tools=['read', 'grep', 'glob']
)

print(result.response)
```

## 核心 API

### 初始化客户端

```typescript
const claude = new ClaudeCode({
  apiKey: string,              // Anthropic API 密钥
  workingDir: string,          // 工作目录
  model: string,               // 模型名称（默认：claude-3-5-sonnet-20241022）
  temperature: number,         // 温度参数（0-1）
  maxTokens: number,           // 最大 token 数
  configPath: string,          // 配置文件路径
  timeout: number              // 超时时间（毫秒）
});
```

### 对话接口

```typescript
interface ChatOptions {
  message: string;             // 用户消息
  tools?: string[];            // 允许的工具列表
  context?: string[];          // 上下文文件路径
  systemPrompt?: string;       // 系统提示词
  stream?: boolean;            // 是否流式输出
  onProgress?: (chunk) => void; // 进度回调
}

const result = await claude.chat(options);
```

### 工具调用

```typescript
// 读取文件
const content = await claude.tools.read({
  filePath: '/path/to/file.ts'
});

// 写入文件
await claude.tools.write({
  filePath: '/path/to/file.ts',
  content: 'console.log("Hello");'
});

// 编辑文件
await claude.tools.edit({
  filePath: '/path/to/file.ts',
  oldString: 'old code',
  newString: 'new code'
});

// 执行命令
const output = await claude.tools.bash({
  command: 'npm test'
});

// 搜索文件
const files = await claude.tools.glob({
  pattern: '**/*.ts'
});

// 搜索内容
const matches = await claude.tools.grep({
  pattern: 'function.*test',
  path: 'src/'
});
```

## 高级用法

### 流式输出

```typescript
const stream = await claude.chat({
  message: '重构这个函数',
  stream: true,
  onProgress: (chunk) => {
    if (chunk.type === 'text') {
      process.stdout.write(chunk.content);
    } else if (chunk.type === 'tool_use') {
      console.log(`\n[调用工具: ${chunk.tool}]`);
    }
  }
});
```

### 会话管理

```typescript
// 创建会话
const session = await claude.createSession({
  id: 'my-session',
  persistent: true
});

// 在会话中对话
await session.chat({
  message: '创建一个用户模型'
});

await session.chat({
  message: '现在添加认证功能'
});

// 获取会话历史
const history = await session.getHistory();

// 保存会话
await session.save();

// 恢复会话
const restored = await claude.loadSession('my-session');
```

### 技能调用

```typescript
// 调用预定义的 Skill
const result = await claude.skill('commit', {
  type: 'feat'
});

// 注册自定义 Skill
claude.registerSkill({
  name: 'analyze-performance',
  description: '分析性能瓶颈',
  handler: async (args) => {
    // 实现逻辑
    return {
      bottlenecks: [],
      recommendations: []
    };
  }
});
```

### Hooks 集成

```typescript
// 注册 Hook
claude.hooks.on('preWrite', async (event) => {
  console.log(`准备写入文件: ${event.filePath}`);

  // 可以修改或阻止操作
  if (event.filePath.includes('node_modules')) {
    throw new Error('不允许修改 node_modules');
  }
});

claude.hooks.on('postCommit', async (event) => {
  console.log(`提交完成: ${event.commitHash}`);

  // 触发后续操作
  await notifyTeam(event.commitMessage);
});
```

### 错误处理

```typescript
try {
  const result = await claude.chat({
    message: '执行任务'
  });
} catch (error) {
  if (error instanceof ClaudeCodeError) {
    console.error('Claude Code 错误:', error.message);
    console.error('错误代码:', error.code);
    console.error('详细信息:', error.details);
  } else if (error instanceof ToolError) {
    console.error('工具执行失败:', error.tool);
    console.error('错误:', error.message);
  } else {
    console.error('未知错误:', error);
  }
}
```

## 实战示例

### 1. 自动化代码审查工具

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
    // 获取 PR 变更
    const diff = execSync(`gh pr diff ${prNumber}`).toString();

    // 让 Claude 审查
    const result = await this.claude.chat({
      message: `请审查以下 PR 变更：\n\n${diff}`,
      systemPrompt: `你是代码审查专家。请关注：
        1. 代码质量和最佳实践
        2. 潜在的 bug 和边界条件
        3. 性能问题
        4. 安全隐患

        提供具体的改进建议。`
    });

    // 发布审查评论
    await this.postReview(prNumber, result.response);

    return result;
  }

  private async postReview(prNumber: number, review: string) {
    execSync(`gh pr review ${prNumber} --comment -b "${review}"`);
  }
}

// 使用
const reviewer = new CodeReviewer();
await reviewer.reviewPR(123);
```

### 2. 智能测试生成器

```typescript
class TestGenerator {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async generateTests(filePath: string) {
    // 读取源文件
    const sourceCode = await this.claude.tools.read({
      filePath
    });

    // 生成测试
    const result = await this.claude.chat({
      message: `为以下代码生成全面的单元测试：\n\n${sourceCode}`,
      context: [filePath],
      systemPrompt: `生成高质量的单元测试：
        - 覆盖所有公共函数
        - 测试正常路径和边界条件
        - 测试错误处理
        - 使用清晰的测试描述
        - Mock 外部依赖`
    });

    // 保存测试文件
    const testPath = filePath.replace(/\.ts$/, '.test.ts');
    await this.claude.tools.write({
      filePath: testPath,
      content: result.response
    });

    // 运行测试验证
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

### 3. 文档同步工具

```typescript
class DocSyncer {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // 监听代码变更
    this.claude.hooks.on('postCommit', async (event) => {
      await this.syncDocs(event);
    });
  }

  async syncDocs(event: CommitEvent) {
    // 检查是否有 API 变更
    const apiFiles = event.files.filter(f =>
      f.includes('src/api') || f.includes('src/routes')
    );

    if (apiFiles.length === 0) return;

    // 生成 API 文档
    const result = await this.claude.chat({
      message: '更新 API 文档以反映最新变更',
      context: apiFiles,
      tools: ['read', 'write', 'grep']
    });

    console.log('文档已更新:', result.filesModified);
  }
}
```

### 4. CI/CD 集成

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
      message: `分析构建失败原因并提供修复建议：\n\n${buildLog}`,
      systemPrompt: `你是 CI/CD 专家。分析构建日志：
        1. 识别失败的根本原因
        2. 提供具体的修复步骤
        3. 建议预防措施`
    });

    return result.response;
  }

  async suggestOptimizations() {
    const result = await this.claude.chat({
      message: '分析 CI 配置并提供优化建议',
      context: ['.github/workflows/*.yml'],
      tools: ['read', 'grep']
    });

    return result.response;
  }
}

// 在 GitHub Actions 中使用
const ci = new CIHelper();
const analysis = await ci.analyzeBuildFailure(process.env.BUILD_LOG);
console.log(analysis);
```

### 5. 代码迁移助手

```typescript
class MigrationHelper {
  private claude: ClaudeCode;

  constructor() {
    this.claude = new ClaudeCode({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async migrateToNewAPI(pattern: string) {
    // 查找需要迁移的文件
    const files = await this.claude.tools.grep({
      pattern,
      outputMode: 'files_with_matches'
    });

    // 逐个迁移
    for (const file of files) {
      await this.claude.chat({
        message: `将此文件迁移到新 API`,
        context: [file],
        systemPrompt: `迁移指南：
          - 旧 API: oldFunction()
          - 新 API: newFunction()
          - 保持功能不变
          - 更新导入语句
          - 添加迁移注释`
      });
    }

    // 运行测试验证
    await this.claude.tools.bash({
      command: 'npm test'
    });
  }
}
```

## 配置管理

### 加载配置

```typescript
const claude = new ClaudeCode({
  configPath: '.claude/config.json'
});

// 或者直接传递配置
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

### 动态配置

```typescript
// 更新配置
claude.updateConfig({
  temperature: 0.5,
  maxTokens: 4096
});

// 获取当前配置
const config = claude.getConfig();
```

## 类型定义

### TypeScript 类型

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

## 最佳实践

### 1. 错误处理

```typescript
async function safeExecute() {
  try {
    const result = await claude.chat({
      message: '执行任务',
      timeout: 30000
    });
    return result;
  } catch (error) {
    if (error.code === 'TIMEOUT') {
      console.error('任务超时');
    } else if (error.code === 'RATE_LIMIT') {
      console.error('API 限流，稍后重试');
      await sleep(60000);
      return safeExecute();
    } else {
      throw error;
    }
  }
}
```

### 2. 资源管理

```typescript
// 使用完毕后清理
const claude = new ClaudeCode({...});

try {
  await claude.chat({...});
} finally {
  await claude.dispose();
}
```

### 3. 批量操作

```typescript
async function batchProcess(files: string[]) {
  const results = await Promise.all(
    files.map(file =>
      claude.chat({
        message: `处理文件: ${file}`,
        context: [file]
      })
    )
  );

  return results;
}
```

### 4. 进度跟踪

```typescript
const progress = {
  total: 100,
  current: 0
};

await claude.chat({
  message: '大型任务',
  onProgress: (chunk) => {
    progress.current++;
    console.log(`进度: ${progress.current}/${progress.total}`);
  }
});
```

## 测试

### 单元测试

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

### Mock 测试

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

## 故障排查

### 常见问题

**API 密钥错误**
```typescript
// 验证 API 密钥
if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY 未设置');
}
```

**超时问题**
```typescript
// 增加超时时间
const claude = new ClaudeCode({
  timeout: 120000  // 2 分钟
});
```

**内存泄漏**
```typescript
// 确保清理资源
process.on('exit', async () => {
  await claude.dispose();
});
```

## 下一步

- 查看 [API 参考文档](https://docs.anthropic.com/claude-code/sdk)
- 探索 [示例项目](https://github.com/anthropics/claude-code-examples)
- 加入 [开发者社区](https://discord.gg/anthropic)
