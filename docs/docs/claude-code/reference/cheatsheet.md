---
title: "速查表"
---

# Claude Code 速查表

快速参考 Claude Code 的常用命令、快捷键和操作。

## 快捷键

### Shift+Tab - 权限模式切换

循环切换三种权限模式：

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode
```

- **Normal Mode**: 默认模式，每次操作需要确认
- **Auto-Accept Mode**: 自动接受编辑（底部显示 `⏵⏵ accept edits on`）
- **Plan Mode**: 只读模式（底部显示 `⏸ plan mode on`），只制定计划不执行

## 内置命令

### 基础命令

```bash
/help          # 查看帮助信息
/clear         # 清空对话历史
/quit          # 退出 Claude Code
```

### 模型切换

```bash
/model         # 查看当前模型
/model opus    # 切换到 Opus 4.6（最强大）
/model sonnet  # 切换到 Sonnet 4.6（默认，平衡）
/model haiku   # 切换到 Haiku 4.5（最快速）
```

**模型详情**：
- **Opus 4.6** (`claude-opus-4-6`): 最强大，适合复杂任务
- **Sonnet 4.6** (`claude-sonnet-4-6`): 默认，平衡性能和成本
- **Haiku 4.5** (`claude-haiku-4-5-20251001`): 最快速，适合简单任务

### 快速模式

```bash
/fast          # 切换快速模式（使用相同的 Opus 4.6 但输出更快）
```

**注意**: `/fast` 不会切换到不同模型，而是使用相同的 Opus 4.6 模型但输出更快。

### 成本管理

```bash
/cost          # 查看当前会话的 API 使用成本
```

显示信息包括：
- 输入 tokens
- 输出 tokens
- 总成本（美元）

### Skills 调用

```bash
/<skill-name>  # 调用用户技能
```

常用 Skills：
- `/commit` - 智能提交
- `/review` - 代码审查
- `/test` - 生成测试
- `/docs` - 生成文档

## 权限响应选项

当 Claude 请求权限时，你可以选择：

```
Claude wants to:
  • Read file: src/config.ts
  • Write file: src/auth.ts
  • Run command: npm test

Allow? [y/n/always/never]
```

- `y` - 允许这次操作
- `n` - 拒绝这次操作
- `always` - 本次会话总是允许此类操作
- `never` - 本次会话总是拒绝此类操作

## 命令行启动选项

### 基础启动

```bash
# 在当前目录启动
claude

# 指定工作目录
claude /path/to/project
```

### 权限模式

```bash
# 自动接受模式
claude --permission-mode auto

# 询问模式（默认）
claude --permission-mode ask

# 自定义模式
claude --permission-mode custom
```

### 模型选择

```bash
# 使用 Opus 模型
claude --model opus

# 使用 Sonnet 模型（默认）
claude --model sonnet

# 使用 Haiku 模型
claude --model haiku
```

### Headless 模式

```bash
# 用于 CI/CD
claude --headless "运行测试并生成报告"
```

### 其他选项

```bash
# 查看版本
claude --version

# 查看帮助
claude --help
```

## 配置文件

### 全局配置

位置：`~/.config/claude/config.json`

```json
{
  "apiKey": "sk-ant-...",
  "defaultModel": "claude-sonnet-4-6",
  "permissionMode": "ask",
  "theme": "dark",
  "autoSave": true
}
```

### 项目配置

位置：`.claude/settings.json`

```json
{
  "model": "claude-sonnet-4-6",
  "permissionMode": "custom",
  "allowedPaths": ["src/**", "tests/**"],
  "blockedPaths": [".env", "secrets/**"],
  "allowedCommands": ["npm test", "npm run build"],
  "blockedCommands": ["rm -rf", "git push --force"]
}
```

### 项目说明

位置：`CLAUDE.md`（自动加载到上下文）

```markdown
# 项目名称

## 技术栈
- React 18
- TypeScript 5

## 代码规范
- 使用函数组件和 Hooks
- 所有组件必须有 TypeScript 类型

## 常用命令
- 开发：`npm run dev`
- 测试：`npm test`
```

## 自动内存系统

### 内存目录

位置：`~/.claude/projects/<project-hash>/memory/`

### MEMORY.md

- 自动加载到上下文（前 200 行）
- 用于存储项目相关的持久化信息
- 跨会话保持

### 主题文件

可创建主题文件组织内存：
- `debugging.md` - 调试经验
- `patterns.md` - 代码模式
- `conventions.md` - 项目约定

## 环境变量

### API Key

```bash
# Anthropic API
export ANTHROPIC_API_KEY='sk-ant-...'
```

### AWS Bedrock

```bash
export AWS_ACCESS_KEY_ID='...'
export AWS_SECRET_ACCESS_KEY='...'
export AWS_REGION='us-east-1'
```

### 代理设置

```bash
export HTTP_PROXY='http://proxy:8080'
export HTTPS_PROXY='http://proxy:8080'
```

### 调试模式

```bash
export ANTHROPIC_LOG=debug
```

## 常用操作模式

### 快速迭代

1. 按 `Shift+Tab` 切换到 Auto-Accept Mode
2. 快速开发，无需每次确认
3. 完成后按 `Shift+Tab` 返回 Normal Mode

### 复杂任务规划

1. 按 `Shift+Tab` 两次切换到 Plan Mode
2. Claude 制定详细计划但不执行
3. 审查计划后按 `Shift+Tab` 返回 Normal Mode
4. 确认后 Claude 执行计划

### 成本控制

1. 使用 `/cost` 查看当前成本
2. 对简单任务使用 `/model haiku`
3. 对复杂任务使用 `/model opus`
4. 使用 `/fast` 加快输出速度

## 文件操作

### 读取文件

```
You: 读取 src/App.tsx
```

### 创建文件

```
You: 创建 src/utils/helper.ts，实现日期格式化函数
```

### 修改文件

```
You: 在 src/App.tsx 的第 20 行后添加一个新的路由
```

### 批量操作

```
You: 读取 src/components/ 目录下的所有 .tsx 文件
```

## 命令执行

### 运行测试

```
You: 运行所有测试
```

### 安装依赖

```
You: 安装 axios 和 @types/axios
```

### Git 操作

```
You: 查看 git 状态
You: 提交所有更改，commit 信息是 "Add user authentication"
```

## 代码生成

### 组件生成

```
You: 创建一个 React 组件 UserCard，props 包括 name, email, avatar
```

### API 接口

```
You: 创建一个 Express API 接口 POST /api/users
```

### 测试生成

```
You: 为 src/utils/helper.ts 生成单元测试
```

## 故障排除

### 权限被拒绝

- 检查 `.claude/settings.json` 中的权限配置
- 使用 `always` 选项允许类似操作

### API Key 无效

```bash
# 检查环境变量
echo $ANTHROPIC_API_KEY

# 重新设置
export ANTHROPIC_API_KEY='sk-ant-...'
```

### 网络连接问题

```bash
# 测试连接
curl https://api.anthropic.com/v1/messages

# 使用代理
export HTTPS_PROXY=http://proxy:8080
```

### 命令未找到

```bash
# 检查安装
which claude

# 重新安装
npm install -g @anthropic-ai/claude-code
```

## 最佳实践

### 1. 明确指定文件路径

✅ 好：`修改 src/components/Button.tsx`
❌ 差：`修改 Button 组件`

### 2. 提供足够的上下文

✅ 好：`在登录表单中添加"记住我"复选框，使用 localStorage 保存状态`
❌ 差：`添加记住我功能`

### 3. 使用 CLAUDE.md

在项目根目录创建 `CLAUDE.md`，记录：
- 项目说明
- 技术栈
- 代码规范
- 常用命令

### 4. 合理使用权限模式

- **Normal Mode**: 重要操作、不确定的任务
- **Auto-Accept Mode**: 信任的任务、快速迭代
- **Plan Mode**: 复杂任务、需要先审查

### 5. 定期查看成本

使用 `/cost` 命令监控 API 使用情况。

## 快速参考卡片

### 启动 Claude Code

```bash
claude                    # 当前目录
claude /path/to/project   # 指定目录
claude --model opus       # 使用 Opus 模型
```

### 切换模式

```bash
Shift+Tab                 # 循环切换权限模式
/model opus               # 切换到 Opus
/fast                     # 快速模式
```

### 查看信息

```bash
/help                     # 帮助
/cost                     # 成本
/model                    # 当前模型
```

### 权限响应

```bash
y                         # 允许这次
n                         # 拒绝这次
always                    # 总是允许
never                     # 总是拒绝
```

## 获取帮助

- 命令行帮助：`claude --help`
- 在线帮助：`/help`
- 问题反馈：https://github.com/anthropics/claude-code/issues
- 完整文档：[Claude Code 文档](/docs/claude-code/getting-started/)
