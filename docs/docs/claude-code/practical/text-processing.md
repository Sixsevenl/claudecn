---
title: "文本处理"
---

# 文本处理

使用 Claude Code 进行高效的文本处理和转换。

## 基本文本操作

```bash
# 启动 Claude Code
claude

# 文本格式转换
You: 将 README.txt 转换为 Markdown 格式

Claude: 让我读取文件并转换格式...

Claude wants to:
  • Read file: README.txt
Allow? [y/n/always/never]

You: y

Claude: 已读取内容，现在转换为 Markdown...

Claude wants to:
  • Write file: README.md
Allow? [y/n/always/never]

You: y

Claude: 转换完成！

已创建 README.md，包含：
- 格式化的标题
- 列表项
- 代码块
- 链接

原文件 README.txt 保持不变。
```

## 批量文本替换

```bash
You: 在所有 Markdown 文件中，将 "Github" 替换为 "GitHub"

Claude: 让我搜索需要替换的文件...

Claude wants to:
  • Run command: grep -r "Github" docs/ --include="*.md" -l
Allow? [y/n/always/never]

You: y

Claude: 找到 15 个文件包含 "Github"：

- docs/guide/intro.md
- docs/api/reference.md
- docs/tutorial/setup.md
... (共 15 个文件)

Claude wants to:
  • Run command: find docs -name "*.md" -exec sed -i '' 's/Github/GitHub/g' {} +
Allow? [y/n/always/never]

You: y

Claude: 替换完成！

已在 15 个文件中将 "Github" 替换为 "GitHub"。
总共替换了 47 处。
```

## 文本提取

```bash
You: 从 logs/app.log 中提取所有错误信息

Claude: 让我提取错误日志...

Claude wants to:
  • Run command: grep "ERROR" logs/app.log
Allow? [y/n/always/never]

You: y

Claude: 找到 23 条错误日志：

[2026-04-16 10:23:45] ERROR: Database connection failed
[2026-04-16 10:24:12] ERROR: Invalid user token
[2026-04-16 11:15:33] ERROR: Payment processing timeout
[2026-04-16 12:45:21] ERROR: File not found: /data/users.csv
... (共 23 条)

错误类型统计：
- Database errors: 8
- Authentication errors: 6
- Payment errors: 5
- File errors: 4

需要生成详细报告吗？
```

## 文本格式化

```bash
You: 格式化 data.json，使其更易读

Claude: 让我格式化 JSON 文件...

Claude wants to:
  • Read file: data.json
Allow? [y/n/always/never]

You: y

Claude: 当前文件是压缩的单行 JSON。我会格式化它...

Claude wants to:
  • Run command: cat data.json | jq '.' > data_formatted.json
Allow? [y/n/always/never]

You: y

Claude: 格式化完成！

原文件：data.json (1 行，15.2 KB)
新文件：data_formatted.json (234 行，16.8 KB)

新文件包含：
- 适当的缩进
- 换行符
- 更好的可读性

是否替换原文件？

You: y

Claude wants to:
  • Run command: mv data_formatted.json data.json
Allow? [y/n/always/never]

You: y

Claude: 已替换原文件。data.json 现在格式良好。
```

## 文本合并

```bash
You: 合并 logs 目录下所有日志文件

Claude: 让我合并日志文件...

Claude wants to:
  • Run command: find logs -name "*.log" -type f
Allow? [y/n/always/never]

You: y

Claude: 找到 12 个日志文件：

- logs/app.log (2.3 MB)
- logs/error.log (456 KB)
- logs/access.log (5.6 MB)
- logs/debug.log (1.2 MB)
... (共 12 个文件)

总大小：15.8 MB

Claude wants to:
  • Run command: cat logs/*.log > logs/combined.log
Allow? [y/n/always/never]

You: y

Claude: 合并完成！

输出文件：logs/combined.log
大小：15.8 MB
包含：所有 12 个日志文件的内容

日志按文件名顺序合并。
```

## 文本分割

```bash
You: 将 large_file.txt 分割成每个 1000 行的小文件

Claude: 我会分割文件...

Claude wants to:
  • Run command: wc -l large_file.txt
Allow? [y/n/always/never]

You: y

Claude: 文件包含 5,678 行。

将分割为 6 个文件（每个 1000 行）。

Claude wants to:
  • Run command: split -l 1000 large_file.txt large_file_part_
Allow? [y/n/always/never]

You: y

Claude: 分割完成！

创建的文件：
- large_file_part_aa (1000 行)
- large_file_part_ab (1000 行)
- large_file_part_ac (1000 行)
- large_file_part_ad (1000 行)
- large_file_part_ae (1000 行)
- large_file_part_af (678 行)

总共 6 个文件。
```

## 文本搜索和统计

```bash
You: 统计代码库中各种编程语言的行数

Claude: 让我统计代码行数...

Claude wants to:
  • Run command: find src -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" -o -name "*.go" | xargs wc -l
Allow? [y/n/always/never]

You: y

Claude: 代码统计：

TypeScript (.ts, .tsx):
- 文件数：145
- 总行数：23,456
- 平均每文件：162 行

JavaScript (.js, .jsx):
- 文件数：34
- 总行数：4,567
- 平均每文件：134 行

Python (.py):
- 文件数：12
- 总行数：2,345
- 平均每文件：195 行

Go (.go):
- 文件数：8
- 总行数：1,234
- 平均每文件：154 行

总计：
- 文件数：199
- 总行数：31,602
- 代码库规模：中型

主要语言：TypeScript (74.2%)
```

## 文本编码转换

```bash
You: 将所有文件从 GBK 编码转换为 UTF-8

Claude: 让我检测并转换编码...

Claude wants to:
  • Run command: find . -name "*.txt" -type f
Allow? [y/n/always/never]

You: y

Claude: 找到 23 个文本文件。

检测编码中...

Claude wants to:
  • Run command: file -I *.txt
Allow? [y/n/always/never]

You: y

Claude: 编码检测结果：

GBK 编码：8 个文件
UTF-8 编码：15 个文件

需要转换的文件：
- data/users_cn.txt
- docs/readme_cn.txt
- logs/app_cn.txt
... (共 8 个文件)

Claude wants to:
  • Run command: iconv -f GBK -t UTF-8 data/users_cn.txt > data/users_cn_utf8.txt
  • Run command: mv data/users_cn_utf8.txt data/users_cn.txt
  [... 对其他文件重复]
Allow? [y/n/always/never]

You: y

Claude: 编码转换完成！

已将 8 个文件从 GBK 转换为 UTF-8。
所有文本文件现在都是 UTF-8 编码。
```

## 正则表达式处理

```bash
You: 从文本中提取所有邮箱地址

Claude: 让我使用正则表达式提取邮箱...

Claude wants to:
  • Run command: grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' data/contacts.txt
Allow? [y/n/always/never]

You: y

Claude: 提取到 45 个邮箱地址：

john.doe@example.com
jane.smith@company.org
admin@website.net
support@service.io
... (共 45 个)

Claude wants to:
  • Write file: data/emails.txt
Allow? [y/n/always/never]

You: y

Claude: 邮箱列表已保存到 data/emails.txt

统计：
- 总数：45
- 唯一邮箱：42
- 重复邮箱：3
- 域名分布：
  - example.com: 12
  - company.org: 8
  - website.net: 6
  - 其他: 19
```

## 文本去重

```bash
You: 删除 list.txt 中的重复行

Claude: 让我去除重复行...

Claude wants to:
  • Read file: list.txt
Allow? [y/n/always/never]

You: y

Claude: 文件分析：

- 总行数：1,234
- 唯一行数：892
- 重复行数：342

Claude wants to:
  • Run command: sort list.txt | uniq > list_unique.txt
Allow? [y/n/always/never]

You: y

Claude: 去重完成！

原文件：list.txt (1,234 行)
新文件：list_unique.txt (892 行)
删除：342 个重复行

是否替换原文件？

You: y

Claude wants to:
  • Run command: mv list_unique.txt list.txt
Allow? [y/n/always/never]

You: y

Claude: 已替换原文件。list.txt 现在只包含唯一行。
```

## CSV 处理

```bash
You: 从 users.csv 中提取邮箱列，保存为新文件

Claude: 让我提取邮箱列...

Claude wants to:
  • Read file: users.csv
Allow? [y/n/always/never]

You: y

Claude: CSV 文件结构：

列：id, name, email, age, city
行数：1,234

Claude wants to:
  • Run command: cut -d',' -f3 users.csv > emails.txt
Allow? [y/n/always/never]

You: y

Claude: 提取完成！

输出文件：emails.txt
包含：1,234 个邮箱地址（包含表头）

需要删除表头吗？

You: y

Claude wants to:
  • Run command: tail -n +2 emails.txt > emails_no_header.txt && mv emails_no_header.txt emails.txt
Allow? [y/n/always/never]

You: y

Claude: 已删除表头。emails.txt 现在只包含邮箱地址。
```

## Markdown 处理

```bash
You: 从所有 Markdown 文件中提取标题，生成目录

Claude: 让我提取 Markdown 标题...

Claude wants to:
  • Run command: grep -h "^#" docs/**/*.md
Allow? [y/n/always/never]

You: y

Claude: 提取到 156 个标题。

生成目录结构...

Claude wants to:
  • Write file: docs/TABLE_OF_CONTENTS.md
Allow? [y/n/always/never]

You: y

Claude: 目录已生成：docs/TABLE_OF_CONTENTS.md

内容预览：

```markdown
# 目录

## 快速入门
- [安装指南](guide/installation.md)
- [基本用法](guide/basics.md)
- [配置](guide/configuration.md)

## API 参考
- [认证](api/auth.md)
- [用户管理](api/users.md)
- [订单处理](api/orders.md)

## 教程
- [第一个应用](tutorial/first-app.md)
- [高级功能](tutorial/advanced.md)

... (共 156 个条目)
```

目录已按文件夹和标题层级组织。
```

## 日志分析

```bash
You: 分析 access.log，统计访问最多的 10 个 IP

Claude: 让我分析访问日志...

Claude wants to:
  • Run command: awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10
Allow? [y/n/always/never]

You: y

Claude: 访问最多的 10 个 IP：

1. 192.168.1.100 - 5,234 次
2. 10.0.0.50 - 3,456 次
3. 172.16.0.25 - 2,890 次
4. 192.168.1.101 - 2,345 次
5. 10.0.0.51 - 1,987 次
6. 172.16.0.26 - 1,654 次
7. 192.168.1.102 - 1,432 次
8. 10.0.0.52 - 1,234 次
9. 172.16.0.27 - 1,098 次
10. 192.168.1.103 - 987 次

总访问次数：45,678
唯一 IP 数：1,234

需要生成详细报告吗？
```

## 使用 Auto-Accept 模式

```bash
# 按 Shift+Tab 切换到 Auto-Accept 模式
[底部显示: ⏵⏵ accept edits on]

You: 批量处理 data 目录下的所有文本文件，统一格式

Claude: [自动执行]
处理完成：

1. 转换编码为 UTF-8
2. 统一换行符为 LF
3. 删除行尾空格
4. 添加文件末尾换行符

处理文件：34 个
总耗时：2.3 秒
```

## 常用命令

```bash
/model opus    # 复杂文本分析使用 Opus
/fast          # 简单操作使用快速模式
/cost          # 查看使用成本
```

## 最佳实践

1. **备份原文件**：批量替换前先备份
2. **测试正则表达式**：先在小范围测试
3. **检查编码**：处理前确认文件编码
4. **使用管道**：组合多个命令提高效率
5. **保存结果**：将处理结果保存到新文件
