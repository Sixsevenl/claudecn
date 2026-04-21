---
title: "计算机控制"
---

# 计算机控制

Claude Code 支持计算机控制功能，允许 AI 直接与你的系统交互，执行复杂的自动化任务。

## 基本用法

```bash
# 启动 Claude Code
claude

# 请求执行系统操作
You: 帮我打开浏览器并访问 GitHub

Claude: 我会使用系统命令来完成这个任务...

Claude wants to:
  • Run command: open https://github.com
Allow? [y/n/always/never]

You: y

Claude: 已经打开浏览器并访问 GitHub。
```

## 文件系统操作

```bash
You: 在桌面创建一个新的项目文件夹，包含基本的 React 项目结构

Claude: 让我创建项目结构...

Claude wants to:
  • Run command: mkdir -p ~/Desktop/my-react-app/src/components
  • Run command: mkdir -p ~/Desktop/my-react-app/public
  • Write file: ~/Desktop/my-react-app/package.json
  • Write file: ~/Desktop/my-react-app/src/App.tsx
Allow? [y/n/always/never]

You: always

Claude: 项目结构已创建完成。我已经添加了：
- package.json 配置文件
- src/App.tsx 主组件
- 基本的文件夹结构
```

## 批量文件处理

```bash
You: 找出所有大于 10MB 的日志文件并压缩它们

Claude: 我会搜索并压缩大文件...

Claude wants to:
  • Run command: find . -name "*.log" -size +10M
Allow? [y/n/always/never]

You: y

Claude: 找到 3 个大日志文件：
- logs/app.log (15MB)
- logs/error.log (12MB)
- logs/debug.log (11MB)

Claude wants to:
  • Run command: gzip logs/app.log
  • Run command: gzip logs/error.log
  • Run command: gzip logs/debug.log
Allow? [y/n/always/never]

You: y

Claude: 已压缩所有大日志文件，节省了约 40MB 空间。
```

## 系统监控

```bash
You: 检查系统资源使用情况，如果内存使用超过 80% 就警告我

Claude: 让我检查系统资源...

Claude wants to:
  • Run command: top -l 1 | grep "PhysMem"
  • Run command: df -h
Allow? [y/n/always/never]

You: y

Claude: 系统资源状态：
- 内存使用: 12GB / 16GB (75%)
- 磁盘使用: 450GB / 500GB (90%)

⚠️ 警告：磁盘空间使用率已达 90%，建议清理。
```

## 自动化工作流

```bash
You: 每天自动备份 src 目录到 backups 文件夹

Claude: 我会创建一个备份脚本...

Claude wants to:
  • Write file: scripts/backup.sh
  • Run command: chmod +x scripts/backup.sh
Allow? [y/n/always/never]

You: y

Claude: 备份脚本已创建。内容如下：

#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backups/src-backup-$DATE.tar.gz src/
echo "Backup completed: src-backup-$DATE.tar.gz"

你可以手动运行：./scripts/backup.sh
或添加到 crontab 实现自动化。
```

## 开发环境设置

```bash
You: 设置一个新的 Node.js 项目，包含 TypeScript、ESLint 和 Prettier

Claude: 我会初始化项目并安装依赖...

Claude wants to:
  • Run command: npm init -y
  • Run command: npm install -D typescript @types/node
  • Run command: npm install -D eslint prettier
  • Write file: tsconfig.json
  • Write file: .eslintrc.json
  • Write file: .prettierrc
Allow? [y/n/always/never]

You: y

Claude: 项目设置完成！已配置：
- TypeScript (tsconfig.json)
- ESLint (.eslintrc.json)
- Prettier (.prettierrc)

你可以运行：
- npm run build - 编译 TypeScript
- npm run lint - 检查代码
```

## Git 操作自动化

```bash
You: 检查所有未提交的更改，创建一个有意义的提交

Claude: 让我检查 Git 状态...

Claude wants to:
  • Run command: git status
  • Run command: git diff
Allow? [y/n/always/never]

You: y

Claude: 发现以下更改：
- src/components/Button.tsx (修改)
- src/styles/theme.css (新增)
- tests/Button.test.tsx (修改)

这些更改涉及按钮组件的样式更新和测试。

Claude wants to:
  • Run command: git add src/components/Button.tsx src/styles/theme.css tests/Button.test.tsx
  • Run command: git commit -m "feat: update button component with new theme styles"
Allow? [y/n/always/never]

You: y

Claude: 提交已创建：feat: update button component with new theme styles
```

## 权限模式

```bash
# 按 Shift+Tab 切换到 Auto-Accept 模式
[底部显示: ⏵⏵ accept edits on]

You: 批量重命名所有测试文件，将 .spec.ts 改为 .test.ts

Claude: [自动执行，无需确认]
重命名完成：
- auth.spec.ts → auth.test.ts
- user.spec.ts → user.test.ts
- api.spec.ts → api.test.ts

# 再按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 重构整个项目结构

Claude: 让我制定一个重构计划...

计划：
1. 创建新的文件夹结构
2. 移动现有文件到新位置
3. 更新所有导入路径
4. 运行测试确保没有破坏

是否执行此计划？
```

## 安全注意事项

```bash
You: 删除所有 node_modules 文件夹

Claude: ⚠️ 这是一个破坏性操作。让我先确认...

Claude wants to:
  • Run command: find . -name "node_modules" -type d
Allow? [y/n/always/never]

You: y

Claude: 找到 5 个 node_modules 文件夹：
- ./node_modules
- ./packages/app/node_modules
- ./packages/lib/node_modules
- ./examples/demo/node_modules
- ./tools/scripts/node_modules

总大小约 2.3GB

确认要删除这些文件夹吗？这将需要重新运行 npm install。

Claude wants to:
  • Run command: rm -rf ./node_modules ./packages/*/node_modules ./examples/*/node_modules ./tools/*/node_modules
Allow? [y/n/always/never]

You: y

Claude: 已删除所有 node_modules 文件夹，释放了 2.3GB 空间。
记得运行 npm install 重新安装依赖。
```

## 常用命令

```bash
/model opus    # 切换到 Opus 4.6（更强大的推理能力）
/fast          # 快速模式（更快的响应）
/cost          # 查看 API 使用成本
```

## 快捷键

- `Shift+Tab` - 循环切换权限模式（Normal → Auto-Accept → Plan）
- `Ctrl+C` - 中断当前操作
- `Ctrl+D` - 退出 Claude Code

## 最佳实践

1. **谨慎使用 Auto-Accept 模式**：对于破坏性操作，建议使用 Normal 模式
2. **使用 Plan Mode 进行大型重构**：先查看计划，确认后再执行
3. **定期检查成本**：使用 `/cost` 命令监控 API 使用
4. **备份重要数据**：在执行批量操作前先备份

## 故障排除

```bash
# 如果命令执行失败
You: 为什么上一个命令失败了？

Claude: 让我检查错误信息...
错误原因：权限不足

建议解决方案：
1. 使用 sudo 运行命令
2. 或者修改文件权限

# 撤销操作
You: 撤销刚才的更改

Claude: 我会恢复之前的状态...

Claude wants to:
  • Run command: git checkout -- .
Allow? [y/n/always/never]
```
