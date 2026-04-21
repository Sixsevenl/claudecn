---
title: "发现和安装插件"
---

# 发现和安装插件

搜索和安装 Claude Code 插件。本文提供完整的代码示例和终端操作演示。

## 快速开始

在终端中启动 Claude Code：

```bash
claude

You: 帮我实现搜索和安装 Claude Code 插件

Claude: 好的，让我先看看项目结构...

Claude wants to:
  • Read file: src/main.py
Allow? [y/n/always/never]

You: y

Claude: 让我为你实现这个功能...
```

按 **Shift+Tab** 切换权限模式：

```bash
# Normal Mode → Auto-Accept Mode → Plan Mode

# Auto-Accept: 自动执行（底部显示 ⏵⏵ accept edits on）
You: 快速实现
Claude: [自动执行，无需确认]

# Plan Mode: 只读（底部显示 ⏸ plan mode on）
You: 先制定计划
Claude: [只制定计划，不执行]
```

## 基本概念

```bash
You: 解释一下发现和安装插件的核心概念

Claude: 搜索和安装 Claude Code 插件的核心概念包括...
```

```python
from anthropic import Anthropic

client = Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "搜索和安装 Claude Code 插件"}]
)
print(response.content[0].text)
```

## 实现步骤

### 1. 环境准备

```bash
# 安装依赖
pip install anthropic

# 配置 API Key
export ANTHROPIC_API_KEY="your-api-key"
```

### 2. 核心实现

```bash
You: 帮我实现发现和安装插件的核心功能

Claude: 好的，让我创建实现文件...

Claude wants to:
  • Write file: src/发现和安装插件.py
Allow? [y/n/always/never]

You: y

Claude: 文件已创建。
```

```python
# 发现和安装插件 核心实现
from anthropic import Anthropic

client = Anthropic()

def process(query: str) -> str:
    """处理用户请求"""
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        messages=[{"role": "user", "content": query}]
    )
    return response.content[0].text

if __name__ == "__main__":
    result = process("搜索和安装 Claude Code 插件")
    print(result)
```

### 3. 测试验证

```bash
You: 运行测试验证实现

Claude: 好的，让我运行测试...

Claude wants to:
  • Run command: python -m pytest tests/
Allow? [y/n/always/never]

You: y

Claude: 所有测试通过 ✅
```

## 高级用法

```python
# 使用流式输出
with client.messages.stream(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    messages=[{"role": "user", "content": "搜索和安装 Claude Code 插件"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

```bash
# 使用工具调用
tools = [{
    "name": "process",
    "description": "搜索和安装 Claude Code 插件",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string"}
        },
        "required": ["query"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "搜索和安装 Claude Code 插件"}]
)
```

## 性能优化

```python
# 使用 Prompt Caching 降低成本
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": "你是一个搜索和安装 Claude Code 插件专家...",
        "cache_control": {"type": "ephemeral"}
    }],
    messages=[...]
)
```

```bash
# 查看成本
/cost

# 切换到更快的模型
/model haiku

# 使用快速模式
/fast
```

## 错误处理

```python
from anthropic import APIError, APITimeoutError

try:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": "请求"}]
    )
except APITimeoutError:
    print("请求超时，请重试")
except APIError as e:
    print(f"API 错误: {e.status_code} - {e.message}")
```

## 最佳实践

1. **明确任务描述** - 告诉 Claude 具体要做什么
2. **提供上下文** - 使用 CLAUDE.md 或直接提供相关代码
3. **逐步验证** - 每完成一步就验证结果
4. **使用 Plan Mode** - 复杂任务先制定计划
5. **监控成本** - 使用 `/cost` 查看 API 用量
6. **合理选择模型** - 简单任务用 Haiku，复杂任务用 Opus

## 权限模式速查

| 模式 | 快捷键 | 底部显示 | 行为 |
|------|--------|----------|------|
| Normal | 默认 | 无标识 | 每次操作需确认 |
| Auto-Accept | Shift+Tab ×1 | ⏵⏵ accept edits on | 自动执行编辑 |
| Plan | Shift+Tab ×2 | ⏸ plan mode on | 只制定计划 |

## 常用命令速查

```bash
/help          # 查看帮助
/clear         # 清空历史
/model opus    # 切换到 Opus 4.6
/model sonnet  # 切换到 Sonnet 4.6
/model haiku   # 切换到 Haiku 4.5
/cost          # 查看成本
/fast          # 快速模式
/quit          # 退出
```

## 相关资源

- [Claude Code 快速开始](/docs/claude-code/getting-started/)
- [基础使用](/docs/claude-code/getting-started/)
- [速查表](/docs/claude-code/reference/cli)