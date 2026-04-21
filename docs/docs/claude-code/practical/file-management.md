---
title: "文件管理"
---

# 文件管理

使用 Claude Code 高效管理文件和目录。

## 基本文件操作

```bash
# 启动 Claude Code
claude

# 创建文件
You: 创建一个新的配置文件 config/app.json

Claude: 我会创建配置文件...

Claude wants to:
  • Write file: config/app.json
Allow? [y/n/always/never]

You: y

Claude: 已创建 config/app.json：

```json
{
  "app": {
    "name": "My Application",
    "version": "1.0.0",
    "port": 3000
  },
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```

配置文件已创建完成。
```

## 批量文件操作

```bash
You: 在 src/components 目录下创建 5 个 React 组件

Claude: 我会创建组件文件...

Claude wants to:
  • Write file: src/components/Header.tsx
  • Write file: src/components/Footer.tsx
  • Write file: src/components/Sidebar.tsx
  • Write file: src/components/Navigation.tsx
  • Write file: src/components/Content.tsx
Allow? [y/n/always/never]

You: always

Claude: 已创建 5 个组件：

1. Header.tsx - 页头组件
2. Footer.tsx - 页脚组件
3. Sidebar.tsx - 侧边栏组件
4. Navigation.tsx - 导航组件
5. Content.tsx - 内容组件

每个组件都包含基本的 TypeScript 类型定义和导出。
```

## 文件搜索

```bash
You: 找出所有包含 "TODO" 注释的文件

Claude: 让我搜索 TODO 注释...

Claude wants to:
  • Run command: grep -r "TODO" src/ --include="*.ts" --include="*.tsx"
Allow? [y/n/always/never]

You: y

Claude: 找到 12 个 TODO 注释：

src/utils/auth.ts:23
  // TODO: 实现刷新令牌逻辑

src/components/UserProfile.tsx:45
  // TODO: 添加头像上传功能

src/api/orders.ts:67
  // TODO: 优化查询性能

src/hooks/useData.ts:89
  // TODO: 添加错误重试

需要我帮你处理这些 TODO 吗？
```

## 文件重命名

```bash
You: 将所有 .js 文件重命名为 .ts

Claude: 让我先找出所有 .js 文件...

Claude wants to:
  • Run command: find src -name "*.js" -type f
Allow? [y/n/always/never]

You: y

Claude: 找到 8 个 .js 文件：

- src/utils/helper.js
- src/config/env.js
- src/api/client.js
- src/hooks/useAuth.js
- src/components/Button.js
- src/components/Input.js
- src/services/api.js
- src/lib/format.js

Claude wants to:
  • Run command: mv src/utils/helper.js src/utils/helper.ts
  • Run command: mv src/config/env.js src/config/env.ts
  • Run command: mv src/api/client.js src/api/client.ts
  • Run command: mv src/hooks/useAuth.js src/hooks/useAuth.ts
  • Run command: mv src/components/Button.js src/components/Button.ts
  • Run command: mv src/components/Input.js src/components/Input.ts
  • Run command: mv src/services/api.js src/services/api.ts
  • Run command: mv src/lib/format.js src/lib/format.ts
Allow? [y/n/always/never]

You: y

Claude: 重命名完成！所有 8 个文件已从 .js 转换为 .ts。

注意：你可能需要添加 TypeScript 类型注解。
```

## 文件复制和移动

```bash
You: 将 src/components/old 目录下的所有组件移动到 src/components/legacy

Claude: 让我移动文件...

Claude wants to:
  • Run command: mkdir -p src/components/legacy
  • Run command: mv src/components/old/* src/components/legacy/
  • Run command: rmdir src/components/old
Allow? [y/n/always/never]

You: y

Claude: 移动完成！

已移动 15 个文件从 old 到 legacy 目录。
old 目录已删除。

文件列表：
- Button.tsx
- Input.tsx
- Form.tsx
- Modal.tsx
- Dropdown.tsx
... (共 15 个文件)
```

## 文件删除

```bash
You: 删除所有 .test.js 文件

Claude: 让我先找出测试文件...

Claude wants to:
  • Run command: find . -name "*.test.js" -type f
Allow? [y/n/always/never]

You: y

Claude: 找到 23 个测试文件。

警告：这是一个破坏性操作，将删除以下文件：
- src/utils/auth.test.js
- src/components/Button.test.js
- src/api/users.test.js
... (共 23 个文件)

确认删除吗？

You: y

Claude wants to:
  • Run command: find . -name "*.test.js" -type f -delete
Allow? [y/n/always/never]

You: y

Claude: 已删除 23 个测试文件。

建议：考虑将测试迁移到 TypeScript (.test.ts)。
```

## 目录结构管理

```bash
You: 创建标准的 Node.js 项目结构

Claude: 我会创建项目结构...

Claude wants to:
  • Run command: mkdir -p src/{controllers,models,routes,middleware,utils,config}
  • Run command: mkdir -p tests/{unit,integration,e2e}
  • Run command: mkdir -p public/{css,js,images}
  • Run command: mkdir -p docs
Allow? [y/n/always/never]

You: y

Claude: 项目结构已创建：

project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── config/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
└── docs/

需要我添加基础文件吗？
```

## 文件内容替换

```bash
You: 将所有文件中的 "localhost:3000" 替换为 "api.example.com"

Claude: 让我搜索并替换...

Claude wants to:
  • Run command: grep -r "localhost:3000" src/ --include="*.ts" --include="*.tsx" -l
Allow? [y/n/always/never]

You: y

Claude: 找到 7 个文件包含 "localhost:3000"：

- src/config/api.ts
- src/utils/fetch.ts
- src/services/auth.ts
- src/components/ApiClient.tsx
- src/hooks/useApi.ts
- tests/api.test.ts
- .env.example

Claude wants to:
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/config/api.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/utils/fetch.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/services/auth.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/components/ApiClient.tsx
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' src/hooks/useApi.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' tests/api.test.ts
  • Run command: sed -i '' 's/localhost:3000/api.example.com/g' .env.example
Allow? [y/n/always/never]

You: y

Claude: 替换完成！已在 7 个文件中将 "localhost:3000" 替换为 "api.example.com"。
```

## 文件压缩和解压

```bash
You: 压缩 src 目录为 backup.tar.gz

Claude: 我会创建压缩包...

Claude wants to:
  • Run command: tar -czf backup.tar.gz src/
Allow? [y/n/always/never]

You: y

Claude: 压缩完成！

文件：backup.tar.gz
大小：2.3 MB
包含：src 目录的所有内容

You: 解压 backup.tar.gz 到 restore 目录

Claude wants to:
  • Run command: mkdir -p restore
  • Run command: tar -xzf backup.tar.gz -C restore/
Allow? [y/n/always/never]

You: y

Claude: 解压完成！

文件已解压到 restore/src 目录。
```

## 文件权限管理

```bash
You: 将所有 .sh 脚本设置为可执行

Claude: 让我找出所有脚本文件...

Claude wants to:
  • Run command: find . -name "*.sh" -type f
Allow? [y/n/always/never]

You: y

Claude: 找到 5 个脚本文件：

- scripts/build.sh
- scripts/deploy.sh
- scripts/test.sh
- scripts/backup.sh
- scripts/clean.sh

Claude wants to:
  • Run command: chmod +x scripts/*.sh
Allow? [y/n/always/never]

You: y

Claude: 已将所有脚本设置为可执行。

现在可以直接运行：
./scripts/build.sh
./scripts/deploy.sh
等等...
```

## 文件大小分析

```bash
You: 找出最大的 10 个文件

Claude: 让我分析文件大小...

Claude wants to:
  • Run command: find . -type f -exec du -h {} + | sort -rh | head -10
Allow? [y/n/always/never]

You: y

Claude: 最大的 10 个文件：

1. 45M  ./node_modules/.cache/webpack/bundle.js
2. 23M  ./dist/app.bundle.js
3. 12M  ./logs/app.log
4. 8.5M ./public/images/hero.png
5. 6.2M ./coverage/lcov-report/index.html
6. 4.8M ./docs/api-reference.pdf
7. 3.9M ./src/assets/video.mp4
8. 2.1M ./package-lock.json
9. 1.8M ./yarn.lock
10. 1.5M ./dist/vendor.js

总大小：109.8M

建议：
- 清理 node_modules/.cache
- 压缩图片和视频
- 归档旧日志文件
```

## 文件同步

```bash
You: 将 src 目录同步到 backup/src，保持增量更新

Claude: 我会使用 rsync 进行同步...

Claude wants to:
  • Run command: rsync -av --delete src/ backup/src/
Allow? [y/n/always/never]

You: y

Claude: 同步完成！

统计：
- 发送文件：234
- 更新文件：12
- 删除文件：3
- 总大小：15.6 MB
- 传输大小：2.3 MB (增量)

backup/src 现在与 src 完全同步。
```

## 使用 Auto-Accept 模式

```bash
# 按 Shift+Tab 切换到 Auto-Accept 模式
[底部显示: ⏵⏵ accept edits on]

You: 批量创建 20 个测试文件

Claude: [自动执行，无需确认]
已创建 20 个测试文件：
- tests/unit/auth.test.ts
- tests/unit/user.test.ts
- tests/unit/order.test.ts
... (共 20 个文件)

# 再按 Shift+Tab 切换到 Plan Mode
[底部显示: ⏸ plan mode on]

You: 重组整个项目结构

Claude: 重组计划：

1. 创建新的目录结构
2. 移动现有文件到新位置
3. 更新所有导入路径
4. 更新配置文件
5. 运行测试验证

预计影响：
- 移动文件：150+
- 更新导入：300+
- 修改配置：10+

是否执行此计划？
```

## 常用命令

```bash
/model opus    # 复杂文件操作使用 Opus
/fast          # 简单操作使用快速模式
/cost          # 查看使用成本
```

## 最佳实践

1. **备份重要文件**：批量操作前先备份
2. **使用 Git**：文件操作前提交更改
3. **谨慎删除**：删除前先预览文件列表
4. **测试命令**：大规模操作前先小范围测试
5. **使用 Plan Mode**：复杂操作先查看计划
