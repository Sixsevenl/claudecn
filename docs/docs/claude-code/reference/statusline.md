---
title: "Statusline"
---

# Statusline

Claude Code 的状态栏（Statusline）显示在终端底部，提供当前会话的实时状态信息和快捷操作提示。

## 状态栏布局

```
[模式] [模型] [成本] [快捷键提示]
```

### 示例

```
⏸ plan mode on | claude-sonnet-4-6 | $0.05 | Shift+Tab: 切换模式
```

## 权限模式指示器

状态栏左侧显示当前的权限模式：

### Normal Mode（默认）

```
[无特殊标识]
```

- 每次操作需要确认
- 默认模式，最安全
- 适合重要操作和不确定的任务

### Auto-Accept Mode

```
⏵⏵ accept edits on
```

- 自动接受所有编辑操作
- 按 `Shift+Tab` 一次进入
- 适合快速迭代和信任的任务
- 仍会询问危险操作（如删除文件、git push）

### Plan Mode

```
⏸ plan mode on
```

- 只读模式，Claude 只制定计划不执行
- 按 `Shift+Tab` 两次进入
- 适合复杂任务，先审查计划再执行
- 可以安全地探索大型重构或不确定的任务

## 模式切换

### Shift+Tab 快捷键

按 `Shift+Tab` 循环切换三种权限模式：

```
Normal Mode → Auto-Accept Mode → Plan Mode → Normal Mode
```

**使用场景**：

1. **Normal → Auto-Accept**：快速开发，无需每次确认
2. **Auto-Accept → Plan**：暂停执行，先看计划
3. **Plan → Normal**：审查完计划，开始执行

### 命令行启动

```bash
# 以 Auto-Accept 模式启动
claude --permission-mode auto

# 以 Normal 模式启动（默认）
claude --permission-mode ask

# 以自定义模式启动
claude --permission-mode custom
```

## 模型信息

状态栏中间显示当前使用的模型：

### 模型标识

```
claude-opus-4-6      # Opus 4.6 - 最强大
claude-sonnet-4-6    # Sonnet 4.6 - 默认，平衡
claude-haiku-4-5-20251001  # Haiku 4.5 - 最快速
```

### 切换模型

使用 `/model` 命令切换：

```bash
/model opus    # 切换到 Opus 4.6
/model sonnet  # 切换到 Sonnet 4.6
/model haiku   # 切换到 Haiku 4.5
```

### 快速模式

```bash
/fast          # 使用相同的 Opus 4.6 但输出更快
```

**注意**：`/fast` 不会切换到不同模型，而是使用相同的 Opus 4.6 模型但输出更快。

## 成本显示

状态栏显示当前会话的 API 使用成本：

```
$0.05          # 当前会话总成本
```

### 查看详细成本

使用 `/cost` 命令查看详细信息：

```bash
/cost
```

显示内容包括：
- 输入 tokens
- 输出 tokens
- 缓存命中情况
- 总成本（美元）

## 快捷键提示

状态栏右侧显示常用快捷键：

```
Shift+Tab: 切换模式
```

### 其他快捷键

虽然不在状态栏显示，但以下快捷键也很有用：

- `Ctrl+C` - 中断当前操作
- `Ctrl+D` - 退出 Claude Code
- `↑/↓` - 浏览历史命令

## 配置状态栏

### 自定义显示

在 `.claude/settings.json` 中配置：

```json
{
  "statusline": {
    "enabled": true,
    "showModel": true,
    "showCost": true,
    "showMode": true,
    "position": "bottom",
    "format": "[{mode}] {model} | ${cost} | {hints}"
  }
}
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | `true` | 是否显示状态栏 |
| `showModel` | boolean | `true` | 显示模型信息 |
| `showCost` | boolean | `true` | 显示成本信息 |
| `showMode` | boolean | `true` | 显示权限模式 |
| `position` | string | `bottom` | 位置（top/bottom） |
| `format` | string | 自定义 | 自定义格式 |

### 格式变量

可用的格式变量：

- `{mode}` - 权限模式指示器
- `{model}` - 当前模型
- `{cost}` - 当前成本
- `{hints}` - 快捷键提示
- `{tokens}` - Token 使用情况
- `{time}` - 会话时长

### 示例配置

**最小化状态栏**：

```json
{
  "statusline": {
    "format": "{mode} | {model}"
  }
}
```

**详细状态栏**：

```json
{
  "statusline": {
    "format": "[{mode}] {model} | ${cost} | {tokens} tokens | {time} | {hints}"
  }
}
```

## 状态栏颜色

### 主题配置

```json
{
  "statusline": {
    "theme": {
      "normalMode": "green",
      "autoAcceptMode": "yellow",
      "planMode": "blue",
      "background": "black",
      "foreground": "white"
    }
  }
}
```

### 可用颜色

- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- 或使用 RGB 值：`"#00ff00"`

## 实用技巧

### 1. 快速切换到 Auto-Accept

适合快速迭代：

```
按 Shift+Tab 一次 → 底部显示 ⏵⏵ accept edits on
```

### 2. 使用 Plan Mode 审查复杂任务

适合大型重构：

```
按 Shift+Tab 两次 → 底部显示 ⏸ plan mode on
Claude 制定详细计划但不执行
审查计划后，再按 Shift+Tab 返回 Normal Mode 执行
```

### 3. 监控成本

随时查看 API 使用情况：

```
状态栏显示实时成本
使用 /cost 查看详细信息
```

### 4. 快速切换模型

根据任务复杂度选择模型：

```
/model haiku   # 简单任务，快速响应
/model sonnet  # 平衡任务，默认选择
/model opus    # 复杂任务，最强大
```

### 5. 使用快速模式

需要快速输出时：

```
/fast          # 使用相同的 Opus 4.6 但输出更快
```

## 故障排除

### 状态栏不显示

检查配置：

```bash
# 查看配置
cat ~/.config/claude/config.json

# 确保 statusline.enabled 为 true
```

### 状态栏显示错误

重置配置：

```bash
# 删除配置文件
rm ~/.config/claude/config.json

# 重新启动 Claude Code
claude
```

### 颜色显示异常

检查终端支持：

```bash
# 检查终端颜色支持
echo $TERM

# 应该显示 xterm-256color 或类似值
```

## 最佳实践

1. **关注模式指示器** - 始终注意当前处于哪种权限模式
2. **监控成本** - 定期查看成本，避免意外超支
3. **合理使用 Auto-Accept** - 仅在信任的任务中使用
4. **善用 Plan Mode** - 复杂任务先制定计划
5. **选择合适的模型** - 根据任务复杂度选择模型

## 相关命令

- `/help` - 查看帮助
- `/model` - 切换模型
- `/cost` - 查看成本
- `/fast` - 快速模式
- `/clear` - 清空历史
- `/quit` - 退出

## 参考资料

- [CLI 参考](/docs/claude-code/reference/cli) - 完整的 CLI 命令参考
- [配置参考](/docs/claude-code/reference/config) - 详细的配置选项
- [CLI 参考](/docs/claude-code/reference/cli) - 常用命令和快捷键
