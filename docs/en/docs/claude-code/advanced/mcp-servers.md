---
title: "MCP Servers"
---

# MCP Servers

Model Context Protocol (MCP) is an open protocol introduced by Anthropic that standardizes how AI applications connect to external tools and data sources. Through MCP servers, Claude Code can access databases, APIs, file systems, and various other resources.

## What is MCP

MCP defines a standard interface that enables AI models to:

- **Access data sources**: Databases, file systems, APIs
- **Call tools**: Execute specific operations
- **Get context**: Dynamically load relevant information
- **Maintain connections**: Long-term session management

### MCP Architecture

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

## Configuring MCP Servers

### Basic Configuration

`.claude/config.json`:

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

### Server Configuration Options

```json
{
  "mcpServers": {
    "server-name": {
      "command": "Execute command",
      "args": ["argument list"],
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

## Official MCP Servers

### 1. Filesystem Server

Access the local filesystem:

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

Usage example:

```
User: Read all Markdown files in the project docs directory

Claude: [Using filesystem MCP server]
Found the following documents:
- /Users/username/documents/README.md
- /Users/username/documents/API.md
- /Users/username/documents/GUIDE.md
```

### 2. GitHub Server

Access the GitHub API:

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

Usage example:

```
User: List all open Issues in my repository

Claude: [Using github MCP server]
Open Issues:
1. #123 - Fix login bug
2. #124 - Add dark mode
3. #125 - Optimize performance
```

### 3. PostgreSQL Server

Access PostgreSQL databases:

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

Usage example:

```
User: Query the 10 most recently registered users

Claude: [Using postgres MCP server]
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

Results:
1. user@example.com - 2024-01-15
2. another@example.com - 2024-01-14
...
```

### 4. Slack Server

Integrate with Slack:

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

### 5. Google Drive Server

Access Google Drive:

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

## Creating Custom MCP Servers

### Node.js Server Example

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create server
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

// Register tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'search_api',
        description: 'Search API endpoints',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search keywords',
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

// Handle tool calls
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

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Python Server Example

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# Create server
app = Server("my-custom-server")

# Register tools
@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="search_api",
            description="Search API endpoints",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search keywords"
                    }
                },
                "required": ["query"]
            }
        )
    ]

# Handle tool calls
@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "search_api":
        results = await search_api(arguments["query"])
        return [TextContent(
            type="text",
            text=json.dumps(results, indent=2)
        )]

    raise ValueError(f"Unknown tool: {name}")

# Start server
if __name__ == "__main__":
    import asyncio
    asyncio.run(stdio_server(app))
```

## Practical Examples

### 1. Jira Integration Server

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

// List tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'list_issues',
        description: 'List Jira Issues',
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
        description: 'Create Jira Issue',
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

// Handle tool calls
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

Configuration:

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

### 2. Redis Cache Server

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
        description: 'Get cache value',
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
        description: 'Set cache value',
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
        description: 'Delete cache',
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

### 3. Elasticsearch Search Server

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
            description="Search documents",
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
            description="Index document",
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

## MCP Server Management

### List Configured Servers

```bash
claude --list-mcp-servers
```

Output:

```
MCP Servers:
  filesystem  Running
  github      Running
  postgres    Running
  jira        Stopped
```

### Start/Stop Servers

```bash
# Start server
claude --start-mcp-server github

# Stop server
claude --stop-mcp-server github

# Restart server
claude --restart-mcp-server github
```

### View Server Logs

```bash
claude --mcp-logs github
```

### Test Servers

```bash
# Test server connection
claude --test-mcp-server github

# List server tools
claude --mcp-tools github
```

## Security Considerations

### Permission Control

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

### Environment Variable Isolation

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

### Audit Logging

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

## Troubleshooting

### Common Issues

**Server startup failed**
- Check command path is correct
- Verify environment variables are set
- View server logs

**Tool call failed**
- Confirm tool name spelling
- Check parameter format
- Verify permission settings

**Connection timeout**
- Increase timeout setting
- Check network connection
- Verify server status

**Performance issues**
- Enable caching
- Limit concurrent requests
- Optimize queries

## Best Practices

### 1. Error Handling

```typescript
server.setRequestHandler('tools/call', async (request) => {
  try {
    // Process request
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

### 2. Input Validation

```typescript
if (!args.query || typeof args.query !== 'string') {
  throw new Error('Invalid query parameter');
}
```

### 3. Logging

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

### 4. Performance Optimization

```typescript
// Cache results
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

## Next Steps

- View the [MCP Protocol Specification](https://modelcontextprotocol.io)
- Explore [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- Learn about the [SDK Documentation](./sdk.md)
- Join the [MCP Community](https://discord.gg/anthropic)
