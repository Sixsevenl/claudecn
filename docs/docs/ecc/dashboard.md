---
title: Dashboard 仪表板
---

# Dashboard 仪表板

ECC 提供桌面 GUI 仪表板，可视化浏览和管理所有组件。

## 启动

```bash
npm run dashboard
# 或
python3 ./ecc_dashboard.py
```

## 功能

### 标签页界面

| 标签 | 说明 |
|------|------|
| **Agents** | 浏览所有 48 个子代理 |
| **Skills** | 查看 183 个技能 |
| **Commands** | 79 个命令参考 |
| **Rules** | 按语言分类的规则 |
| **Settings** | 仪表板设置 |

### 主题与外观

- **深色/浅色主题**切换
- **字体自定义**（字体族和大小）
- 项目 Logo 显示在标题栏和任务栏

### 搜索与过滤

- 跨所有组件搜索
- 按分类过滤
- 快速定位需要的 Agent 或 Skill

## 系统要求

- Python 3.6+
- Tkinter（通常随 Python 自带）

## 跨平台

Dashboard 基于 Tkinter 构建，支持 macOS、Linux 和 Windows。
