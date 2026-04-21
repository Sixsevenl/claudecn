---
title: "MCP 服务器"
---

# MCP 服务器

Model Context Protocol (MCP) 是 Anthropic 推出的开放协议，用于标准化 AI 应用与外部工具、数据源的连接方式。通过 MCP 服务器，Claude Code 可以访问数据库、API、文件系统等各种资源。

## 什么是 MCP

MCP 定义了一套标准接口，让 AI 模型能够：

- **访问数据源**：数据库、文件系统、API
- **调用工具**：执行特定操作
- **获取上下文**：动态加载相关信息
- **保持连接**：长期会话管理

### MCP 架构

```
┌─────────────┐
│ Claude Code │
└──────┬──────┘
       │ MCP Protocol
       ├──────────────┐
       │              │
┌──────▼──────┐ ┌────▼─────┐
│ MCP Server  │ │ MCP Server│
│ (Database)  │ │ (GitHub)  │
└─────────────┘ └───────────┘
```

## 配置 MCP 服务器

### 基础配置

`.claude/config.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"],
      "enabled": true
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${env.GITHUB_TOKEN}"
      },
      "enabled": true
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${env.DATABASE_URL}"
      },
      "enabled": true
    }
  }
}
```

### 服务器配置选项

```json
{
  "mcpServers": {
    "server-name": {
      "command": "执行命令",
      "args": ["参数列表"],
      "env": {
        "ENV_VAR": "value"
      },
      "enabled": true,
      "timeout": 30000,
      "retries": 3,
      "autoRestart": true
    }
  }
}
```

## 官方 MCP 服务器

### 1. 文件系统服务器

访问本地文件系统：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects",
        "/Users/username/documents"
      ]
    }
  }
}
```

使用示例：

```
用户：读取项目文档目录的所有 Markdown 文件

Claude：[使用 filesystem MCP 服务器]
找到以下文档：
- /Users/username/documents/README.md
- /Users/username/documents/API.md
- /Users/username/documents/GUIDE.md
```

### 2. GitHub 服务器

访问 GitHub API：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${env.GITHUB_TOKEN}"
      }
    }
  }
}
```

使用示例：

```
用户：列出我的仓库中所有开放的 Issues

Claude：[使用 github MCP 服务器]
开放的 Issues：
1. #123 - 修复登录 bug
2. #124 - 添加暗色模式
3. #125 - 优化性能
```

### 3. PostgreSQL 服务器

访问 PostgreSQL 数据库：

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/mydb"
      }
    }
  }
}
```

使用示例：

```
用户：查询最近注册的 10 个用户

Claude：[使用 postgres MCP 服务器]
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

结果：
1. user@example.com - 2024-01-15
2. another@example.com - 2024-01-14
...
```

### 4. Slack 服务器

集成 Slack：

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${env.SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${env.SLACK_TEAM_ID}"
      }
    }
  }
}
```

### 5. Google Drive 服务器

访问 Google Drive：

```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GOOGLE_CLIENT_ID": "${env.GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${env.GOOGLE_CLIENT_SECRET}"
      }
    }
  }
}
```

## 创建自定义 MCP 服务器

### Node.js 服务器示例

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// 创建服务器
const server = new Server(
  {
    name: 'my-custom-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// 注册工具
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'search_api',
        description: '搜索 API 端点',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: '搜索关键词',
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'search_api') {
    const results = await searchAPI(args.query);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// 启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Python 服务器示例

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# 创建服务器
app = Server("my-custom-server")

# 注册工具
@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="search_api",
            description="搜索 API 端点",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "搜索关键词"
                    }
                },
                "required": ["query"]
            }
        )
    ]

# 处理工具调用
@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "search_api":
        results = await search_api(arguments["query"])
        return [TextContent(
            type="text",
            text=json.dumps(results, indent=2)
        )]

    raise ValueError(f"Unknown tool: {name}")

# 启动服务器
if __name__ == "__main__":
    import asyncio
    asyncio.run(stdio_server(app))
```

## 实战示例

### 1. Jira 集成服务器

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import JiraClient from 'jira-client';

const jira = new JiraClient({
  host: process.env.JIRA_HOST,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_API_TOKEN,
});

const server = new Server({
  name: 'jira-server',
  version: '1.0.0',
});

// 列出工具
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'list_issues',
        description: '列出 Jira Issues',
        inputSchema: {
          type: 'object',
          properties: {
            project: { type: 'string' },
            status: { type: 'string' },
          },
        },
      },
      {
        name: 'create_issue',
        description: '创建 Jira Issue',
        inputSchema: {
          type: 'object',
          properties: {
            project: { type: 'string' },
            summary: { type: 'string' },
            description: { type: 'string' },
            issueType: { type: 'string' },
          },
          required: ['project', 'summary', 'issueType'],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'list_issues') {
    const issues = await jira.searchJira(
      `project = ${args.project} AND status = "${args.status}"`
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(issues.issues, null, 2),
        },
      ],
    };
  }

  if (name === 'create_issue') {
    const issue = await jira.addNewIssue({
      fields: {
        project: { key: args.project },
        summary: args.summary,
        description: args.description,
        issuetype: { name: args.issueType },
      },
    });

    return {
      content: [
        {
          type: 'text',
          text: `Created issue: ${issue.key}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});
```

配置：

```json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["./mcp-servers/jira-server.js"],
      "env": {
        "JIRA_HOST": "${env.JIRA_HOST}",
        "JIRA_USERNAME": "${env.JIRA_USERNAME}",
        "JIRA_API_TOKEN": "${env.JIRA_API_TOKEN}"
      }
    }
  }
}
```

### 2. Redis 缓存服务器

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const server = new Server({
  name: 'redis-server',
  version: '1.0.0',
});

server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'get',
        description: '获取缓存值',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string' },
          },
          required: ['key'],
        },
      },
      {
        name: 'set',
        description: '设置缓存值',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string' },
            value: { type: 'string' },
            ttl: { type: 'number' },
          },
          required: ['key', 'value'],
        },
      },
      {
        name: 'delete',
        description: '删除缓存',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string' },
          },
          required: ['key'],
        },
      },
    ],
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get':
      const value = await redis.get(args.key);
      return {
        content: [{ type: 'text', text: value || 'null' }],
      };

    case 'set':
      if (args.ttl) {
        await redis.setex(args.key, args.ttl, args.value);
      } else {
        await redis.set(args.key, args.value);
      }
      return {
        content: [{ type: 'text', text: 'OK' }],
      };

    case 'delete':
      await redis.del(args.key);
      return {
        content: [{ type: 'text', text: 'OK' }],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});
```

### 3. Elasticsearch 搜索服务器

```python
from mcp.server import Server
from mcp.types import Tool, TextContent
from elasticsearch import Elasticsearch
import json
import os

es = Elasticsearch([os.environ['ELASTICSEARCH_URL']])
app = Server("elasticsearch-server")

@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="search",
            description="搜索文档",
            inputSchema={
                "type": "object",
                "properties": {
                    "index": {"type": "string"},
                    "query": {"type": "string"},
                    "size": {"type": "number", "default": 10}
                },
                "required": ["index", "query"]
            }
        ),
        Tool(
            name="index_document",
            description="索引文档",
            inputSchema={
                "type": "object",
                "properties": {
                    "index": {"type": "string"},
                    "document": {"type": "object"}
                },
                "required": ["index", "document"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "search":
        result = es.search(
            index=arguments["index"],
            body={
                "query": {
                    "multi_match": {
                        "query": arguments["query"],
                        "fields": ["*"]
                    }
                },
                "size": arguments.get("size", 10)
            }
        )
        return [TextContent(
            type="text",
            text=json.dumps(result["hits"]["hits"], indent=2)
        )]

    if name == "index_document":
        result = es.index(
            index=arguments["index"],
            body=arguments["document"]
        )
        return [TextContent(
            type="text",
            text=f"Indexed document: {result['_id']}"
        )]

    raise ValueError(f"Unknown tool: {name}")
```

## MCP 服务器管理

### 列出已配置的服务器

```bash
claude --list-mcp-servers
```

输出：

```
MCP Servers:
  filesystem  ✓ Running
  github      ✓ Running
  postgres    ✓ Running
  jira        ✗ Stopped
```

### 启动/停止服务器

```bash
# 启动服务器
claude --start-mcp-server github

# 停止服务器
claude --stop-mcp-server github

# 重启服务器
claude --restart-mcp-server github
```

### 查看服务器日志

```bash
claude --mcp-logs github
```

### 测试服务器

```bash
# 测试服务器连接
claude --test-mcp-server github

# 列出服务器提供的工具
claude --mcp-tools github
```

## 安全考虑

### 权限控制

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"],
      "permissions": {
        "read": true,
        "write": false,
        "execute": false
      }
    }
  }
}
```

### 环境变量隔离

```json
{
  "mcpServers": {
    "database": {
      "command": "node",
      "args": ["./mcp-servers/db-server.js"],
      "env": {
        "DATABASE_URL": "${env.DATABASE_URL}"
      },
      "isolateEnv": true
    }
  }
}
```

### 审计日志

```json
{
  "mcpServers": {
    "audit": {
      "enabled": true,
      "logPath": ".claude/logs/mcp-audit.log",
      "logLevel": "detailed"
    }
  }
}
```

## 故障排查

### 常见问题

**服务器启动失败**
- 检查命令路径是否正确
- 验证环境变量是否设置
- 查看服务器日志

**工具调用失败**
- 确认工具名称拼写
- 检查参数格式
- 验证权限设置

**连接超时**
- 增加 timeout 设置
- 检查网络连接
- 验证服务器状态

**性能问题**
- 启用缓存
- 限制并发请求
- 优化查询

## 最佳实践

### 1. 错误处理

```typescript
server.setRequestHandler('tools/call', async (request) => {
  try {
    // 处理请求
    return result;
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});
```

### 2. 输入验证

```typescript
if (!args.query || typeof args.query !== 'string') {
  throw new Error('Invalid query parameter');
}
```

### 3. 日志记录

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'mcp-server.log' }),
  ],
});

logger.info('Tool called', { name, arguments: args });
```

### 4. 性能优化

```typescript
// 缓存结果
const cache = new Map();

server.setRequestHandler('tools/call', async (request) => {
  const cacheKey = JSON.stringify(request.params);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const result = await processRequest(request);
  cache.set(cacheKey, result);

  return result;
});
```

## 下一步

- 查看 [MCP 协议规范](https://modelcontextprotocol.io)
- 探索 [官方 MCP 服务器](https://github.com/modelcontextprotocol/servers)
- 学习 [SDK 文档](./sdk.md)
- 加入 [MCP 社区](https://discord.gg/anthropic)
