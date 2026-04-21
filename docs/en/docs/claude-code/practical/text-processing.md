---
title: "Text Processing"
---

# Text Processing

Efficiently process and transform text using Claude Code.

## Basic Text Operations

```bash
# Start Claude Code
claude

# Text format conversion
You: Convert README.txt to Markdown format

Claude: Let me read the file and convert the format...

Claude wants to:
  • Read file: README.txt
Allow? [y/n/always/never]

You: y

Claude: Content read, now converting to Markdown...

Claude wants to:
  • Write file: README.md
Allow? [y/n/always/never]

You: y

Claude: Conversion complete!

Created README.md, containing:
- Formatted headings
- List items
- Code blocks
- Links

Original file README.txt remains unchanged.
```

## Batch Text Replacement

```bash
You: Replace "Github" with "GitHub" in all Markdown files

Claude: Let me search for files that need replacement...

Claude wants to:
  • Run command: grep -r "Github" docs/ --include="*.md" -l
Allow? [y/n/always/never]

You: y

Claude: Found 15 files containing "Github":

- docs/guide/intro.md
- docs/api/reference.md
- docs/tutorial/setup.md
... (15 files total)

Claude wants to:
  • Run command: find docs -name "*.md" -exec sed -i '' 's/Github/GitHub/g' {} +
Allow? [y/n/always/never]

You: y

Claude: Replacement complete!

Replaced "Github" with "GitHub" in 15 files.
47 occurrences replaced in total.
```

## Text Extraction

```bash
You: Extract all error messages from logs/app.log

Claude: Let me extract the error logs...

Claude wants to:
  • Run command: grep "ERROR" logs/app.log
Allow? [y/n/always/never]

You: y

Claude: Found 23 error log entries:

[2026-04-16 10:23:45] ERROR: Database connection failed
[2026-04-16 10:24:12] ERROR: Invalid user token
[2026-04-16 11:15:33] ERROR: Payment processing timeout
[2026-04-16 12:45:21] ERROR: File not found: /data/users.csv
... (23 entries total)

Error type breakdown:
- Database errors: 8
- Authentication errors: 6
- Payment errors: 5
- File errors: 4

Would you like me to generate a detailed report?
```

## Text Formatting

```bash
You: Format data.json to make it more readable

Claude: Let me format the JSON file...

Claude wants to:
  • Read file: data.json
Allow? [y/n/always/never]

You: y

Claude: The current file is minified single-line JSON. I'll format it...

Claude wants to:
  • Run command: cat data.json | jq '.' > data_formatted.json
Allow? [y/n/always/never]

You: y

Claude: Formatting complete!

Original file: data.json (1 line, 15.2 KB)
New file: data_formatted.json (234 lines, 16.8 KB)

New file contains:
- Proper indentation
- Line breaks
- Better readability

Replace the original file?

You: y

Claude wants to:
  • Run command: mv data_formatted.json data.json
Allow? [y/n/always/never]

You: y

Claude: Original file replaced. data.json is now well-formatted.
```

## Text Merging

```bash
You: Merge all log files in the logs directory

Claude: Let me merge the log files...

Claude wants to:
  • Run command: find logs -name "*.log" -type f
Allow? [y/n/always/never]

You: y

Claude: Found 12 log files:

- logs/app.log (2.3 MB)
- logs/error.log (456 KB)
- logs/access.log (5.6 MB)
- logs/debug.log (1.2 MB)
... (12 files total)

Total size: 15.8 MB

Claude wants to:
  • Run command: cat logs/*.log > logs/combined.log
Allow? [y/n/always/never]

You: y

Claude: Merge complete!

Output file: logs/combined.log
Size: 15.8 MB
Contains: content from all 12 log files

Logs merged in filename order.
```

## Text Splitting

```bash
You: Split large_file.txt into smaller files of 1000 lines each

Claude: I'll split the file...

Claude wants to:
  • Run command: wc -l large_file.txt
Allow? [y/n/always/never]

You: y

Claude: File contains 5,678 lines.

Will split into 6 files (1000 lines each).

Claude wants to:
  • Run command: split -l 1000 large_file.txt large_file_part_
Allow? [y/n/always/never]

You: y

Claude: Split complete!

Created files:
- large_file_part_aa (1000 lines)
- large_file_part_ab (1000 lines)
- large_file_part_ac (1000 lines)
- large_file_part_ad (1000 lines)
- large_file_part_ae (1000 lines)
- large_file_part_af (678 lines)

6 files created in total.
```

## Text Search and Statistics

```bash
You: Count lines of code by programming language in the codebase

Claude: Let me count the lines of code...

Claude wants to:
  • Run command: find src -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.py" -o -name "*.go" | xargs wc -l
Allow? [y/n/always/never]

You: y

Claude: Code statistics:

TypeScript (.ts, .tsx):
- Files: 145
- Total lines: 23,456
- Average per file: 162 lines

JavaScript (.js, .jsx):
- Files: 34
- Total lines: 4,567
- Average per file: 134 lines

Python (.py):
- Files: 12
- Total lines: 2,345
- Average per file: 195 lines

Go (.go):
- Files: 8
- Total lines: 1,234
- Average per file: 154 lines

Totals:
- Files: 199
- Total lines: 31,602
- Codebase size: Medium

Primary language: TypeScript (74.2%)
```

## Text Encoding Conversion

```bash
You: Convert all files from GBK encoding to UTF-8

Claude: Let me detect and convert the encoding...

Claude wants to:
  • Run command: find . -name "*.txt" -type f
Allow? [y/n/always/never]

You: y

Claude: Found 23 text files.

Detecting encoding...

Claude wants to:
  • Run command: file -I *.txt
Allow? [y/n/always/never]

You: y

Claude: Encoding detection results:

GBK encoding: 8 files
UTF-8 encoding: 15 files

Files to convert:
- data/users_cn.txt
- docs/readme_cn.txt
- logs/app_cn.txt
... (8 files total)

Claude wants to:
  • Run command: iconv -f GBK -t UTF-8 data/users_cn.txt > data/users_cn_utf8.txt
  • Run command: mv data/users_cn_utf8.txt data/users_cn.txt
  [... repeated for other files]
Allow? [y/n/always/never]

You: y

Claude: Encoding conversion complete!

Converted 8 files from GBK to UTF-8.
All text files are now UTF-8 encoded.
```

## Regular Expression Processing

```bash
You: Extract all email addresses from the text

Claude: Let me extract emails using regex...

Claude wants to:
  • Run command: grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' data/contacts.txt
Allow? [y/n/always/never]

You: y

Claude: Extracted 45 email addresses:

john.doe@example.com
jane.smith@company.org
admin@website.net
support@service.io
... (45 total)

Claude wants to:
  • Write file: data/emails.txt
Allow? [y/n/always/never]

You: y

Claude: Email list saved to data/emails.txt

Statistics:
- Total: 45
- Unique emails: 42
- Duplicate emails: 3
- Domain distribution:
  - example.com: 12
  - company.org: 8
  - website.net: 6
  - Other: 19
```

## Text Deduplication

```bash
You: Remove duplicate lines from list.txt

Claude: Let me remove the duplicates...

Claude wants to:
  • Read file: list.txt
Allow? [y/n/always/never]

You: y

Claude: File analysis:

- Total lines: 1,234
- Unique lines: 892
- Duplicate lines: 342

Claude wants to:
  • Run command: sort list.txt | uniq > list_unique.txt
Allow? [y/n/always/never]

You: y

Claude: Deduplication complete!

Original file: list.txt (1,234 lines)
New file: list_unique.txt (892 lines)
Removed: 342 duplicate lines

Replace the original file?

You: y

Claude wants to:
  • Run command: mv list_unique.txt list.txt
Allow? [y/n/always/never]

You: y

Claude: Original file replaced. list.txt now contains only unique lines.
```

## CSV Processing

```bash
You: Extract the email column from users.csv and save as a new file

Claude: Let me extract the email column...

Claude wants to:
  • Read file: users.csv
Allow? [y/n/always/never]

You: y

Claude: CSV file structure:

Columns: id, name, email, age, city
Rows: 1,234

Claude wants to:
  • Run command: cut -d',' -f3 users.csv > emails.txt
Allow? [y/n/always/never]

You: y

Claude: Extraction complete!

Output file: emails.txt
Contains: 1,234 email addresses (including header)

Remove the header?

You: y

Claude wants to:
  • Run command: tail -n +2 emails.txt > emails_no_header.txt && mv emails_no_header.txt emails.txt
Allow? [y/n/always/never]

You: y

Claude: Header removed. emails.txt now contains only email addresses.
```

## Markdown Processing

```bash
You: Extract headings from all Markdown files and generate a table of contents

Claude: Let me extract the Markdown headings...

Claude wants to:
  • Run command: grep -h "^#" docs/**/*.md
Allow? [y/n/always/never]

You: y

Claude: Extracted 156 headings.

Generating table of contents structure...

Claude wants to:
  • Write file: docs/TABLE_OF_CONTENTS.md
Allow? [y/n/always/never]

You: y

Claude: Table of contents generated: docs/TABLE_OF_CONTENTS.md

Content preview:

```markdown
# Table of Contents

## Getting Started
- [Installation Guide](guide/installation.md)
- [Basic Usage](guide/basics.md)
- [Configuration](guide/configuration.md)

## API Reference
- [Authentication](api/auth.md)
- [User Management](api/users.md)
- [Order Processing](api/orders.md)

## Tutorials
- [First Application](tutorial/first-app.md)
- [Advanced Features](tutorial/advanced.md)

... (156 entries total)
```

Table of contents organized by folder and heading hierarchy.
```

## Log Analysis

```bash
You: Analyze access.log, show the top 10 IPs by visit count

Claude: Let me analyze the access log...

Claude wants to:
  • Run command: awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10
Allow? [y/n/always/never]

You: y

Claude: Top 10 IPs by visit count:

1. 192.168.1.100 - 5,234 visits
2. 10.0.0.50 - 3,456 visits
3. 172.16.0.25 - 2,890 visits
4. 192.168.1.101 - 2,345 visits
5. 10.0.0.51 - 1,987 visits
6. 172.16.0.26 - 1,654 visits
7. 192.168.1.102 - 1,432 visits
8. 10.0.0.52 - 1,234 visits
9. 172.16.0.27 - 1,098 visits
10. 192.168.1.103 - 987 visits

Total visits: 45,678
Unique IPs: 1,234

Would you like me to generate a detailed report?
```

## Using Auto-Accept Mode

```bash
# Press Shift+Tab to switch to Auto-Accept Mode
[Bottom shows: ⏵⏵ accept edits on]

You: Batch process all text files in the data directory, normalize formats

Claude: [Auto-executes]
Processing complete:

1. Converted encoding to UTF-8
2. Normalized line endings to LF
3. Removed trailing whitespace
4. Added trailing newlines

Files processed: 34
Total time: 2.3 seconds
```

## Common Commands

```bash
/model opus    # Use Opus for complex text analysis
/fast          # Use fast mode for simple operations
/cost          # Check usage cost
```

## Best Practices

1. **Back up original files**: Back up before batch replacements
2. **Test regex patterns**: Test on a small range first
3. **Check encoding**: Confirm file encoding before processing
4. **Use pipes**: Combine multiple commands for efficiency
5. **Save results**: Save processing results to new files
