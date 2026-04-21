---
title: "Data Analysis"
---

# Data Analysis

Use Claude Code for data analysis, processing, and visualization.

## Basic Data Analysis

```bash
# Start Claude Code
claude

# Analyze a CSV file
You: Analyze data/sales.csv and give me a sales trend report

Claude: Let me read and analyze the data...

Claude wants to:
  • Read file: data/sales.csv
Allow? [y/n/always/never]

You: y

Claude: Data overview:
- Total records: 1,245
- Date range: 2025-01-01 to 2025-12-31
- Fields: date, product, quantity, revenue, region

Key findings:
1. Total revenue: $2,456,789
2. Average order: $1,972
3. Best-selling product: Product A (345 units)
4. Highest revenue region: North ($892,345)

Trend analysis:
- Q1: $456,789 (18.6%)
- Q2: $678,234 (27.6%) ↑
- Q3: $589,123 (24.0%) ↓
- Q4: $732,643 (29.8%) ↑

Would you like me to generate a detailed report or visualization?
```

## Data Cleaning

```bash
You: Clean data/users.csv, remove duplicates, fill missing values

Claude: Let me process the data...

Claude wants to:
  • Read file: data/users.csv
Allow? [y/n/always/never]

You: y

Claude: Data quality check:

Issues found:
1. Duplicate records: 23 (1.8%)
2. Missing emails: 45 (3.6%)
3. Invalid dates: 12 (0.9%)
4. Outlier ages: 8 (age > 120)

Cleaning plan:
```python
import pandas as pd

# Read data
df = pd.read_csv('data/users.csv')

# Remove duplicates
df = df.drop_duplicates(subset=['user_id'])

# Fill missing emails
df['email'] = df['email'].fillna('unknown@example.com')

# Fix invalid dates
df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')

# Filter outlier ages
df = df[(df['age'] >= 0) & (df['age'] <= 120)]

# Save cleaned data
df.to_csv('data/users_cleaned.csv', index=False)
```

Execute cleaning?

You: y

Claude wants to:
  • Write file: scripts/clean_data.py
  • Run command: python scripts/clean_data.py
Allow? [y/n/always/never]

You: y

Claude: Data cleaning complete!

Results:
- Original records: 1,267
- After cleaning: 1,224
- Duplicates removed: 23
- Missing values fixed: 45
- Outliers filtered: 20

Output file: data/users_cleaned.csv
```

## Statistical Analysis

```bash
You: Perform statistical analysis on data/experiments.csv, including mean, median, and standard deviation

Claude: Let me perform the statistical analysis...

Claude wants to:
  • Read file: data/experiments.csv
Allow? [y/n/always/never]

You: y

Claude: Statistical analysis report:

Descriptive statistics:
```
Variable: response_time (ms)
- Sample size: 500
- Mean: 245.6 ms
- Median: 238.0 ms
- Standard deviation: 45.3 ms
- Minimum: 156.2 ms
- Maximum: 412.8 ms
- 25th percentile: 215.4 ms
- 75th percentile: 268.9 ms

Variable: success_rate (%)
- Sample size: 500
- Mean: 94.2%
- Median: 95.0%
- Standard deviation: 3.8%
- Minimum: 78.5%
- Maximum: 100.0%
```

Distribution analysis:
- response_time follows a normal distribution
- success_rate is left-skewed

Outlier detection (IQR method):
- response_time: 8 outliers found (> 350ms)
- success_rate: 3 outliers found (< 85%)

Would you like me to generate visualization charts?
```

## Data Visualization

```bash
You: Create visualization charts for the sales data

Claude: I'll generate multiple charts...

Claude wants to:
  • Write file: scripts/visualize.py
Allow? [y/n/always/never]

You: y

Claude: Created visualization script:

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Read data
df = pd.read_csv('data/sales.csv')
df['date'] = pd.to_datetime(df['date'])

# Set style
sns.set_style('whitegrid')
plt.figure(figsize=(15, 10))

# 1. Time series chart
plt.subplot(2, 2, 1)
df.groupby('date')['revenue'].sum().plot()
plt.title('Revenue Over Time')
plt.xlabel('Date')
plt.ylabel('Revenue ($)')

# 2. Product sales bar chart
plt.subplot(2, 2, 2)
df.groupby('product')['quantity'].sum().plot(kind='bar')
plt.title('Sales by Product')
plt.xlabel('Product')
plt.ylabel('Quantity')

# 3. Revenue by region pie chart
plt.subplot(2, 2, 3)
df.groupby('region')['revenue'].sum().plot(kind='pie', autopct='%1.1f%%')
plt.title('Revenue by Region')

# 4. Correlation heatmap
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

Claude: Charts generated!

Output file: reports/sales_analysis.png

Contains 4 charts:
1. Revenue time series
2. Product sales comparison
3. Revenue distribution by region
4. Variable correlation

Would you like me to adjust chart styles or add other charts?
```

## JSON Data Analysis

```bash
You: Analyze logs/api_requests.json and summarize API usage

Claude: Let me analyze the API logs...

Claude wants to:
  • Read file: logs/api_requests.json
Allow? [y/n/always/never]

You: y

Claude: API usage analysis:

Overall statistics:
- Total requests: 15,678
- Date range: 2026-04-01 to 2026-04-15
- Unique users: 1,234
- Average response time: 156ms

Endpoint usage ranking:
1. GET /api/users - 5,234 (33.4%)
2. POST /api/orders - 3,456 (22.0%)
3. GET /api/products - 2,890 (18.4%)
4. PUT /api/users/:id - 1,678 (10.7%)
5. DELETE /api/orders/:id - 890 (5.7%)

Status code distribution:
- 200 OK: 14,234 (90.8%)
- 400 Bad Request: 678 (4.3%)
- 401 Unauthorized: 456 (2.9%)
- 500 Server Error: 310 (2.0%)

Performance analysis:
- Fastest endpoint: GET /api/health (12ms)
- Slowest endpoint: POST /api/reports (1,234ms)
- P95 response time: 345ms
- P99 response time: 678ms

Error analysis:
- Primary error: Invalid token (234 occurrences)
- Peak hours: 14:00-16:00
- Problem endpoint: POST /api/orders

Would you like me to generate a detailed report?
```

## Database Query Analysis

```bash
You: Connect to the database and analyze user activity

Claude: I'll create an analysis script...

Claude wants to:
  • Write file: scripts/analyze_users.py
Allow? [y/n/always/never]

You: y

Claude: Created database analysis script:

```python
import psycopg2
import pandas as pd
from datetime import datetime, timedelta

# Connect to database
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)

# Query user activity
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

# Analyze results
print("30-Day User Activity Analysis")
print("=" * 50)
print(f"Daily active users: {df['active_users'].mean():.0f}")
print(f"Daily logins: {df['total_logins'].mean():.0f}")
print(f"Average session duration: {df['avg_session_duration'].mean():.1f} minutes")

# Identify trends
trend = df['active_users'].pct_change().mean()
if trend > 0:
    print(f"Trend: Growing {trend*100:.1f}%")
else:
    print(f"Trend: Declining {abs(trend)*100:.1f}%")

# Save results
df.to_csv('reports/user_activity.csv', index=False)
conn.close()
```

Claude wants to:
  • Run command: python scripts/analyze_users.py
Allow? [y/n/always/never]

You: y

Claude: User activity analysis complete!

30-Day User Activity Analysis
==================================================
Daily active users: 1,234
Daily logins: 3,456
Average session duration: 23.5 minutes
Trend: Growing 5.2%

Key insights:
1. Weekend activity drops 30%
2. Weekday peaks: 10:00-11:00, 14:00-15:00
3. New user retention rate: 68%
4. Returning user ratio: 45%

Report saved: reports/user_activity.csv
```

## Real-Time Data Monitoring

```bash
You: Monitor logs/app.log and track error rate in real time

Claude: I'll create a real-time monitoring script...

Claude wants to:
  • Write file: scripts/monitor_logs.py
Allow? [y/n/always/never]

You: y

Claude: Created log monitoring script:

```python
import time
import re
from collections import defaultdict
from datetime import datetime

def monitor_logs(log_file, interval=60):
    """Monitor log file, output stats every minute"""

    stats = defaultdict(int)

    with open(log_file, 'r') as f:
        # Move to end of file
        f.seek(0, 2)

        print("Starting log monitoring...")
        print("=" * 60)

        while True:
            line = f.readline()

            if not line:
                time.sleep(1)
                continue

            # Track log levels
            if 'ERROR' in line:
                stats['errors'] += 1
            elif 'WARN' in line:
                stats['warnings'] += 1
            elif 'INFO' in line:
                stats['info'] += 1

            stats['total'] += 1

            # Output stats every 100 lines
            if stats['total'] % 100 == 0:
                error_rate = (stats['errors'] / stats['total']) * 100

                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Stats:")
                print(f"  Total logs: {stats['total']}")
                print(f"  Errors: {stats['errors']} ({error_rate:.2f}%)")
                print(f"  Warnings: {stats['warnings']}")
                print(f"  Info: {stats['info']}")

                # Alert on high error rate
                if error_rate > 5:
                    print(f"  ALERT: Error rate too high!")

if __name__ == '__main__':
    monitor_logs('logs/app.log')
```

This script will:
1. Read the log file in real time
2. Count logs by level
3. Calculate error rate
4. Alert when error rate exceeds 5%

How to run:
```bash
python scripts/monitor_logs.py
```

Would you like me to start monitoring?
```

## Using Auto-Accept Mode

```bash
# Press Shift+Tab to switch to Auto-Accept Mode
[Bottom shows: ⏵⏵ accept edits on]

You: Batch analyze all CSV files in the data directory

Claude: [Auto-executes]
Analysis complete:

1. sales.csv - 1,245 records
2. users.csv - 3,456 records
3. products.csv - 234 records
4. orders.csv - 5,678 records

Summary report generated: reports/batch_analysis.txt
```

## Common Commands

```bash
/model opus    # Use Opus for complex data analysis
/fast          # Use fast mode for simple statistics
/cost          # Check API usage cost
```

## Best Practices

1. **Large file handling**: Use chunked reading to avoid memory overflow
2. **Data validation**: Check data quality before analysis
3. **Save results**: Save analysis results to files
4. **Visualization**: Use charts to make data more intuitive
5. **Automation**: Create reusable analysis scripts
