---
title: "数据分析"
---

# 数据分析

使用 Claude Code 进行数据分析、处理和可视化。

## 基本数据分析

```bash
# 启动 Claude Code
claude

# 分析 CSV 文件
You: 分析 data/sales.csv，给我销售趋势报告

Claude: 让我读取并分析数据...

Claude wants to:
  • Read file: data/sales.csv
Allow? [y/n/always/never]

You: y

Claude: 数据概览：
- 总记录数：1,245 条
- 时间范围：2025-01-01 到 2025-12-31
- 字段：date, product, quantity, revenue, region

关键发现：
1. 总收入：$2,456,789
2. 平均订单：$1,972
3. 最畅销产品：Product A (345 单)
4. 最高收入地区：North ($892,345)

趋势分析：
- Q1: $456,789 (18.6%)
- Q2: $678,234 (27.6%) ↑
- Q3: $589,123 (24.0%) ↓
- Q4: $732,643 (29.8%) ↑

需要生成详细报告或可视化吗？
```

## 数据清洗

```bash
You: 清洗 data/users.csv，删除重复项，填充缺失值

Claude: 让我处理数据...

Claude wants to:
  • Read file: data/users.csv
Allow? [y/n/always/never]

You: y

Claude: 数据质量检查：

问题发现：
1. 重复记录：23 条 (1.8%)
2. 缺失邮箱：45 条 (3.6%)
3. 无效日期：12 条 (0.9%)
4. 异常年龄：8 条 (年龄 > 120)

清洗方案：
```python
import pandas as pd

# 读取数据
df = pd.read_csv('data/users.csv')

# 删除重复项
df = df.drop_duplicates(subset=['user_id'])

# 填充缺失邮箱
df['email'] = df['email'].fillna('unknown@example.com')

# 修正无效日期
df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')

# 过滤异常年龄
df = df[(df['age'] >= 0) & (df['age'] <= 120)]

# 保存清洗后的数据
df.to_csv('data/users_cleaned.csv', index=False)
```

是否执行清洗？

You: y

Claude wants to:
  • Write file: scripts/clean_data.py
  • Run command: python scripts/clean_data.py
Allow? [y/n/always/never]

You: y

Claude: 数据清洗完成！

结果：
- 原始记录：1,267 条
- 清洗后：1,224 条
- 删除重复：23 条
- 修正缺失值：45 条
- 过滤异常：20 条

输出文件：data/users_cleaned.csv
```

## 统计分析

```bash
You: 对 data/experiments.csv 进行统计分析，包括均值、中位数、标准差

Claude: 让我进行统计分析...

Claude wants to:
  • Read file: data/experiments.csv
Allow? [y/n/always/never]

You: y

Claude: 统计分析报告：

描述性统计：
```
变量：response_time (ms)
- 样本数：500
- 均值：245.6 ms
- 中位数：238.0 ms
- 标准差：45.3 ms
- 最小值：156.2 ms
- 最大值：412.8 ms
- 25% 分位：215.4 ms
- 75% 分位：268.9 ms

变量：success_rate (%)
- 样本数：500
- 均值：94.2%
- 中位数：95.0%
- 标准差：3.8%
- 最小值：78.5%
- 最大值：100.0%
```

分布分析：
- response_time 呈正态分布
- success_rate 呈左偏分布

异常值检测（IQR 方法）：
- response_time：发现 8 个异常值 (> 350ms)
- success_rate：发现 3 个异常值 (< 85%)

需要生成可视化图表吗？
```

## 数据可视化

```bash
You: 创建销售数据的可视化图表

Claude: 我会生成多个图表...

Claude wants to:
  • Write file: scripts/visualize.py
Allow? [y/n/always/never]

You: y

Claude: 创建可视化脚本：

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 读取数据
df = pd.read_csv('data/sales.csv')
df['date'] = pd.to_datetime(df['date'])

# 设置样式
sns.set_style('whitegrid')
plt.figure(figsize=(15, 10))

# 1. 时间序列图
plt.subplot(2, 2, 1)
df.groupby('date')['revenue'].sum().plot()
plt.title('Revenue Over Time')
plt.xlabel('Date')
plt.ylabel('Revenue ($)')

# 2. 产品销量柱状图
plt.subplot(2, 2, 2)
df.groupby('product')['quantity'].sum().plot(kind='bar')
plt.title('Sales by Product')
plt.xlabel('Product')
plt.ylabel('Quantity')

# 3. 地区收入饼图
plt.subplot(2, 2, 3)
df.groupby('region')['revenue'].sum().plot(kind='pie', autopct='%1.1f%%')
plt.title('Revenue by Region')

# 4. 相关性热图
plt.subplot(2, 2, 4)
corr = df[['quantity', 'revenue']].corr()
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title('Correlation Matrix')

plt.tight_layout()
plt.savefig('reports/sales_analysis.png', dpi=300)
print('Charts saved to reports/sales_analysis.png')
```

Claude wants to:
  • Run command: python scripts/visualize.py
Allow? [y/n/always/never]

You: y

Claude: 图表已生成！

输出文件：reports/sales_analysis.png

包含 4 个图表：
1. 收入时间序列
2. 产品销量对比
3. 地区收入分布
4. 变量相关性

需要调整图表样式或添加其他图表吗？
```

## JSON 数据分析

```bash
You: 分析 logs/api_requests.json，统计 API 使用情况

Claude: 让我分析 API 日志...

Claude wants to:
  • Read file: logs/api_requests.json
Allow? [y/n/always/never]

You: y

Claude: API 使用分析：

总体统计：
- 总请求数：15,678
- 时间范围：2026-04-01 到 2026-04-15
- 唯一用户：1,234
- 平均响应时间：156ms

端点使用排名：
1. GET /api/users - 5,234 (33.4%)
2. POST /api/orders - 3,456 (22.0%)
3. GET /api/products - 2,890 (18.4%)
4. PUT /api/users/:id - 1,678 (10.7%)
5. DELETE /api/orders/:id - 890 (5.7%)

状态码分布：
- 200 OK: 14,234 (90.8%)
- 400 Bad Request: 678 (4.3%)
- 401 Unauthorized: 456 (2.9%)
- 500 Server Error: 310 (2.0%)

性能分析：
- 最快端点：GET /api/health (12ms)
- 最慢端点：POST /api/reports (1,234ms)
- P95 响应时间：345ms
- P99 响应时间：678ms

错误分析：
- 主要错误：Invalid token (234 次)
- 高峰时段：14:00-16:00
- 问题端点：POST /api/orders

需要生成详细报告吗？
```

## 数据库查询分析

```bash
You: 连接数据库并分析用户活跃度

Claude: 我会创建分析脚本...

Claude wants to:
  • Write file: scripts/analyze_users.py
Allow? [y/n/always/never]

You: y

Claude: 创建数据库分析脚本：

```python
import psycopg2
import pandas as pd
from datetime import datetime, timedelta

# 连接数据库
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)

# 查询用户活跃度
query = """
SELECT
    DATE(last_login) as date,
    COUNT(DISTINCT user_id) as active_users,
    COUNT(*) as total_logins,
    AVG(session_duration) as avg_session_duration
FROM user_sessions
WHERE last_login >= NOW() - INTERVAL '30 days'
GROUP BY DATE(last_login)
ORDER BY date DESC
"""

df = pd.read_sql(query, conn)

# 分析结果
print("30 天用户活跃度分析")
print("=" * 50)
print(f"日均活跃用户：{df['active_users'].mean():.0f}")
print(f"日均登录次数：{df['total_logins'].mean():.0f}")
print(f"平均会话时长：{df['avg_session_duration'].mean():.1f} 分钟")

# 识别趋势
trend = df['active_users'].pct_change().mean()
if trend > 0:
    print(f"趋势：增长 {trend*100:.1f}%")
else:
    print(f"趋势：下降 {abs(trend)*100:.1f}%")

# 保存结果
df.to_csv('reports/user_activity.csv', index=False)
conn.close()
```

Claude wants to:
  • Run command: python scripts/analyze_users.py
Allow? [y/n/always/never]

You: y

Claude: 用户活跃度分析完成！

30 天用户活跃度分析
==================================================
日均活跃用户：1,234
日均登录次数：3,456
平均会话时长：23.5 分钟
趋势：增长 5.2%

关键洞察：
1. 周末活跃度下降 30%
2. 工作日高峰：10:00-11:00, 14:00-15:00
3. 新用户留存率：68%
4. 回访用户比例：45%

报告已保存：reports/user_activity.csv
```

## 实时数据监控

```bash
You: 监控 logs/app.log，实时统计错误率

Claude: 我会创建实时监控脚本...

Claude wants to:
  • Write file: scripts/monitor_logs.py
Allow? [y/n/always/never]

You: y

Claude: 创建日志监控脚本：

```python
import time
import re
from collections import defaultdict
from datetime import datetime

def monitor_logs(log_file, interval=60):
    """监控日志文件，每分钟统计一次"""

    stats = defaultdict(int)

    with open(log_file, 'r') as f:
        # 移动到文件末尾
        f.seek(0, 2)

        print("开始监控日志...")
        print("=" * 60)

        while True:
            line = f.readline()

            if not line:
                time.sleep(1)
                continue

            # 统计日志级别
            if 'ERROR' in line:
                stats['errors'] += 1
            elif 'WARN' in line:
                stats['warnings'] += 1
            elif 'INFO' in line:
                stats['info'] += 1

            stats['total'] += 1

            # 每分钟输出统计
            if stats['total'] % 100 == 0:
                error_rate = (stats['errors'] / stats['total']) * 100

                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 统计:")
                print(f"  总日志: {stats['total']}")
                print(f"  错误: {stats['errors']} ({error_rate:.2f}%)")
                print(f"  警告: {stats['warnings']}")
                print(f"  信息: {stats['info']}")

                # 错误率告警
                if error_rate > 5:
                    print(f"  警告：错误率过高！")

if __name__ == '__main__':
    monitor_logs('logs/app.log')
```

这个脚本会：
1. 实时读取日志文件
2. 统计不同级别的日志
3. 计算错误率
4. 错误率超过 5% 时告警

运行方式：
```bash
python scripts/monitor_logs.py
```

需要我启动监控吗？
```

## 使用 Auto-Accept 模式

```bash
# 按 Shift+Tab 切换到 Auto-Accept 模式
[底部显示: ⏵⏵ accept edits on]

You: 批量分析 data 目录下的所有 CSV 文件

Claude: [自动执行]
分析完成：

1. sales.csv - 1,245 条记录
2. users.csv - 3,456 条记录
3. products.csv - 234 条记录
4. orders.csv - 5,678 条记录

汇总报告已生成：reports/batch_analysis.txt
```

## 常用命令

```bash
/model opus    # 复杂数据分析使用 Opus
/fast          # 简单统计使用快速模式
/cost          # 查看 API 使用成本
```

## 最佳实践

1. **大文件处理**：使用分块读取，避免内存溢出
2. **数据验证**：分析前先检查数据质量
3. **结果保存**：将分析结果保存到文件
4. **可视化**：使用图表让数据更直观
5. **自动化**：创建可重用的分析脚本
