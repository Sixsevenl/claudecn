---
title: "CLI 参考"
---

# CLI 参考

Claude Code 提供了强大的命令行界面（CLI），让您可以直接从终端与 Claude 进行交互。本指南详细介绍了所有可用的 CLI 命令和选项。

## 安装和设置

### 安装 CLI

```bash
# 使用 npm 全局安装
npm install -g @anthropic-ai/claude-code

# 或使用 yarn
yarn global add @anthropic-ai/claude-code

# 验证安装
claude --version
```

### 初始化配置

```bash
# 首次运行时配置 API 密钥
claude init

# 指定配置文件路径
claude init --config ~/.claude/config.json
```

## 核心命令

### `claude chat`

启动交互式对话会话。

```bash
# 基本用法
claude chat

# 指定模型
claude chat --model claude-sonnet-4

# 使用系统提示
claude chat --system "你是一个 Python 专家"

# 从文件加载上下文
claude chat --context ./src/**/*.py
```

**选项：**

- `--model, -m <model>` - 指定使用的模型（默认：claude-sonnet-4）
- `--system, -s <prompt>` - 设置系统提示
- `--context, -c <pattern>` - 加载文件作为上下文
- `--max-tokens <number>` - 设置最大输出令牌数
- `--temperature <number>` - 设置温度参数（0.0-1.0）
- `--stream` - 启用流式输出（默认开启）
- `--no-stream` - 禁用流式输出

### `claude ask`

发送单次查询并获取响应。

```bash
# 基本查询
claude ask "如何在 Python 中读取 JSON 文件？"

# 包含文件上下文
claude ask "这段代码有什么问题？" --file ./src/main.py

# 使用管道输入
cat error.log | claude ask "分析这个错误日志"

# 输出到文件
claude ask "生成一个 React 组件" > Component.jsx
```

**选项：**

- `--file, -f <path>` - 包含文件内容作为上下文
- `--output, -o <path>` - 将响应保存到文件
- `--json` - 以 JSON 格式输出响应
- `--quiet, -q` - 静默模式，只输出响应内容

### `claude code`

在代码库上下文中工作。

```bash
# 在当前目录启动代码会话
claude code

# 指定项目目录
claude code --project ./my-app

# 自动分析代码库
claude code --analyze

# 执行特定任务
claude code --task "重构 auth 模块"
```

**选项：**

- `--project, -p <path>` - 指定项目根目录
- `--analyze` - 自动分析代码库结构
- `--task, -t <description>` - 执行特定任务
- `--watch` - 监视文件变化
- `--exclude <pattern>` - 排除文件模式

### `claude review`

代码审查功能。

```bash
# 审查单个文件
claude review ./src/api.ts

# 审查整个目录
claude review ./src --recursive

# 审查 Git 变更
claude review --git-diff

# 生成审查报告
claude review ./src --output review-report.md
```

**选项：**

- `--recursive, -r` - 递归审查子目录
- `--git-diff` - 审查 Git 未提交的变更
- `--severity <level>` - 设置报告严重级别（info/warning/error）
- `--format <type>` - 输出格式（text/json/markdown）

### `claude test`

生成和运行测试。

```bash
# 为文件生成测试
claude test generate ./src/utils.ts

# 运行测试并分析失败
claude test analyze

# 修复失败的测试
claude test fix --file ./tests/api.test.ts
```

**选项：**

- `generate` - 生成测试用例
- `analyze` - 分析测试结果
- `fix` - 修复失败的测试
- `--framework <name>` - 指定测试框架（jest/vitest/mocha）

### `claude refactor`

代码重构工具。

```bash
# 重构函数
claude refactor --function calculateTotal --file ./src/cart.ts

# 提取组件
claude refactor --extract-component UserProfile --file ./src/App.tsx

# 重命名变量
claude refactor --rename oldName:newName --file ./src/index.ts
```

**选项：**

- `--function <name>` - 重构指定函数
- `--extract-component <name>` - 提取 React 组件
- `--rename <old:new>` - 重命名符号
- `--dry-run` - 预览变更而不应用

## 配置管理

### `claude config`

管理 CLI 配置。

```bash
# 查看当前配置
claude config list

# 设置配置项
claude config set api_key YOUR_API_KEY
claude config set default_model claude-sonnet-4

# 获取配置项
claude config get api_key

# 删除配置项
claude config unset api_key

# 重置所有配置
claude config reset
```

**常用配置项：**

- `api_key` - Anthropic API 密钥
- `default_model` - 默认使用的模型
- `max_tokens` - 默认最大令牌数
- `temperature` - 默认温度参数
- `editor` - 首选编辑器
- `theme` - CLI 主题（light/dark）

### 配置文件位置

```bash
# macOS/Linux
~/.config/claude/config.json

# Windows
%APPDATA%\claude\config.json

# 自定义位置
export CLAUDE_CONFIG_PATH=/path/to/config.json
```

## 高级功能

### 使用提示模板

```bash
# 创建提示模板
claude template create code-review

# 使用模板
claude ask --template code-review --file ./src/api.ts

# 列出所有模板
claude template list

# 编辑模板
claude template edit code-review
```

### 会话管理

```bash
# 保存会话
claude chat --save-session my-session

# 加载会话
claude chat --load-session my-session

# 列出所有会话
claude session list

# 删除会话
claude session delete my-session

# 导出会话
claude session export my-session --output session.json
```

### 批处理模式

```bash
# 从文件读取多个查询
claude batch --input queries.txt

# 并行处理
claude batch --input queries.txt --parallel 5

# 输出到目录
claude batch --input queries.txt --output-dir ./results
```

## 环境变量

```bash
# API 密钥
export ANTHROPIC_API_KEY=your_api_key

# 自定义配置路径
export CLAUDE_CONFIG_PATH=/path/to/config.json

# 默认模型
export CLAUDE_DEFAULT_MODEL=claude-sonnet-4

# 日志级别
export CLAUDE_LOG_LEVEL=debug

# 代理设置
export HTTPS_PROXY=http://proxy.example.com:8080
```

## 输出格式

### JSON 输出

```bash
# 获取 JSON 格式响应
claude ask "什么是 REST API？" --json

# 输出示例
{
  "id": "msg_123",
  "model": "claude-sonnet-4",
  "content": "REST API 是...",
  "usage": {
    "input_tokens": 15,
    "output_tokens": 250
  }
}
```

### Markdown 输出

```bash
# 生成 Markdown 文档
claude ask "创建 API 文档" --format markdown > API.md
```

## 调试和日志

### 启用详细日志

```bash
# 调试模式
claude --debug chat

# 指定日志级别
claude --log-level debug ask "测试查询"

# 保存日志到文件
claude --log-file ./claude.log chat
```

### 查看请求详情

```bash
# 显示 API 请求详情
claude --verbose ask "测试"

# 输出包含：
# - 请求参数
# - 响应头
# - 令牌使用情况
# - 响应时间
```

## 插件系统

### 安装插件

```bash
# 安装官方插件
claude plugin install @claude/git-tools

# 安装社区插件
claude plugin install claude-plugin-docker

# 从本地安装
claude plugin install ./my-plugin
```

### 管理插件

```bash
# 列出已安装插件
claude plugin list

# 启用/禁用插件
claude plugin enable git-tools
claude plugin disable git-tools

# 更新插件
claude plugin update git-tools

# 卸载插件
claude plugin uninstall git-tools
```

## 实用示例

### 代码生成工作流

```bash
# 1. 分析需求
claude ask "我需要一个用户认证 API" --save-context

# 2. 生成代码
claude code --task "实现 JWT 认证" --output ./src/auth

# 3. 生成测试
claude test generate ./src/auth/*.ts

# 4. 审查代码
claude review ./src/auth --format markdown > review.md
```

### Git 集成工作流

```bash
# 1. 审查变更
claude review --git-diff

# 2. 生成提交消息
git diff | claude ask "生成提交消息" --quiet

# 3. 代码审查
claude review --git-diff --severity error
```

### 文档生成

```bash
# 生成 README
claude ask "为这个项目生成 README" \
  --context "./src/**/*.ts" \
  --output README.md

# 生成 API 文档
claude ask "生成 API 文档" \
  --file ./src/api.ts \
  --format markdown \
  --output API.md
```

## 性能优化

### 缓存策略

```bash
# 启用提示缓存
claude chat --cache-prompts

# 设置缓存 TTL
claude config set cache_ttl 3600
```

### 并发控制

```bash
# 限制并发请求
claude batch --parallel 3 --input queries.txt

# 设置请求间隔
claude batch --delay 1000 --input queries.txt
```

## 故障排除

### 常见问题

**API 密钥错误：**

```bash
# 验证 API 密钥
claude config get api_key

# 重新设置
claude config set api_key YOUR_NEW_KEY
```

**网络问题：**

```bash
# 使用代理
export HTTPS_PROXY=http://proxy.example.com:8080
claude chat

# 增加超时时间
claude --timeout 60000 ask "查询"
```

**权限问题：**

```bash
# 检查配置文件权限
ls -la ~/.config/claude/

# 修复权限
chmod 600 ~/.config/claude/config.json
```

## 最佳实践

1. **使用配置文件**：将常用设置保存到配置文件中
2. **利用模板**：为重复任务创建提示模板
3. **会话管理**：保存重要对话以便后续参考
4. **上下文优化**：只包含相关文件以减少令牌使用
5. **批处理**：对多个类似任务使用批处理模式
6. **版本控制**：将生成的代码纳入版本控制
7. **安全性**：不要在命令行中直接暴露 API 密钥

## 更新和维护

```bash
# 检查更新
claude --version
npm outdated -g @anthropic-ai/claude-code

# 更新到最新版本
npm update -g @anthropic-ai/claude-code

# 清理缓存
claude cache clear
```

## 获取帮助

```bash
# 查看帮助
claude --help

# 查看特定命令帮助
claude chat --help
claude ask --help

# 查看版本信息
claude --version

# 查看诊断信息
claude doctor
```
