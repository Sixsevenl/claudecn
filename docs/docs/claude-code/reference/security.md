---
title: "安全指南"
---

# 安全指南

在使用 Claude Code 时，安全性至关重要。本指南介绍了保护您的代码、数据和 API 密钥的最佳实践。

## API 密钥管理

### 安全存储 API 密钥

**推荐方法：使用环境变量**

```bash
# 在 ~/.bashrc 或 ~/.zshrc 中设置
export ANTHROPIC_API_KEY="sk-ant-..."

# 或使用 .env 文件（不要提交到版本控制）
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
```

**使用系统密钥链（macOS）**

```bash
# 存储到 Keychain
security add-generic-password \
  -a "$USER" \
  -s "anthropic-api-key" \
  -w "sk-ant-..."

# 配置 Claude 使用 Keychain
claude config set api.keySource keychain
claude config set api.keychainService anthropic-api-key
```

**使用密钥管理器**

```bash
# 使用 1Password CLI
export ANTHROPIC_API_KEY=$(op read "op://Private/Anthropic/api_key")

# 使用 AWS Secrets Manager
export ANTHROPIC_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id anthropic-api-key \
  --query SecretString \
  --output text)
```

### 避免的做法

```bash
# ❌ 不要在代码中硬编码
const apiKey = "sk-ant-...";

# ❌ 不要在配置文件中明文存储
{
  "api": {
    "key": "sk-ant-..."
  }
}

# ❌ 不要在命令行中直接传递
claude --api-key sk-ant-... chat
```

### 密钥轮换

```bash
# 定期轮换 API 密钥
# 1. 在 Anthropic Console 生成新密钥
# 2. 更新环境变量
export ANTHROPIC_API_KEY="sk-ant-new-key"

# 3. 验证新密钥
claude ask "测试连接"

# 4. 撤销旧密钥
```

## 文件系统安全

### 访问控制

**配置允许的路径**

```json
{
  "security": {
    "allowedPaths": [
      "/home/user/projects",
      "/opt/workspace"
    ],
    "deniedPaths": [
      "/etc",
      "/root",
      "/home/user/.ssh"
    ],
    "readOnly": false
  }
}
```

**使用沙箱模式**

```bash
# 启用沙箱模式
claude --sandbox chat

# 配置沙箱
claude config set security.sandbox.enabled true
claude config set security.sandbox.allowNetwork false
claude config set security.sandbox.allowExec false
```

### 文件权限

```bash
# 设置配置文件权限
chmod 600 ~/.config/claude/config.json

# 设置日志文件权限
chmod 600 ~/.claude/logs/*.log

# 检查敏感文件权限
find ~/.config/claude -type f -exec ls -la {} \;
```

### 敏感文件保护

**配置文件排除规则**

```json
{
  "security": {
    "excludePatterns": [
      "**/.env",
      "**/.env.*",
      "**/secrets.json",
      "**/credentials.json",
      "**/*.key",
      "**/*.pem",
      "**/id_rsa*"
    ]
  }
}
```

**自动检测敏感文件**

```bash
# 启用敏感文件检测
claude config set security.detectSensitiveFiles true

# 配置检测规则
claude config set security.sensitivePatterns '["password","api_key","secret","token"]'
```

## 数据隐私

### 敏感数据过滤

**配置数据过滤器**

```json
{
  "security": {
    "filters": {
      "enabled": true,
      "patterns": [
        {
          "name": "email",
          "regex": "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
          "replacement": "[EMAIL]"
        },
        {
          "name": "phone",
          "regex": "\\d{3}-\\d{3}-\\d{4}",
          "replacement": "[PHONE]"
        },
        {
          "name": "ssn",
          "regex": "\\d{3}-\\d{2}-\\d{4}",
          "replacement": "[SSN]"
        },
        {
          "name": "credit_card",
          "regex": "\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}",
          "replacement": "[CARD]"
        }
      ]
    }
  }
}
```

**使用数据脱敏**

```bash
# 启用自动脱敏
claude config set security.autoRedact true

# 脱敏特定文件
claude ask "分析这个日志" --file error.log --redact
```

### 本地处理

```json
{
  "security": {
    "localProcessing": {
      "enabled": true,
      "preprocessLocally": true,
      "cacheLocally": true
    }
  }
}
```

## 代码执行安全

### 命令执行限制

**配置允许的命令**

```json
{
  "security": {
    "execution": {
      "allowedCommands": [
        "git",
        "npm",
        "node",
        "python"
      ],
      "deniedCommands": [
        "rm -rf",
        "dd",
        "mkfs",
        "sudo"
      ],
      "requireConfirmation": true
    }
  }
}
```

**使用白名单模式**

```bash
# 启用白名单模式
claude config set security.execution.whitelistMode true

# 添加允许的命令
claude config set security.execution.whitelist '["git","npm","yarn"]'
```

### 代码审查

**自动安全扫描**

```bash
# 扫描生成的代码
claude review --security-scan ./src

# 检查特定漏洞
claude review --check sql-injection,xss,command-injection ./src
```

**配置安全规则**

```json
{
  "security": {
    "codeReview": {
      "enabled": true,
      "rules": [
        "no-eval",
        "no-unsafe-regex",
        "no-sql-injection",
        "no-xss",
        "no-hardcoded-secrets"
      ],
      "severity": "error"
    }
  }
}
```

## 网络安全

### HTTPS 强制

```json
{
  "security": {
    "network": {
      "enforceHttps": true,
      "verifyCertificates": true,
      "allowedHosts": [
        "api.anthropic.com",
        "console.anthropic.com"
      ]
    }
  }
}
```

### 代理配置

**安全代理设置**

```json
{
  "api": {
    "proxy": {
      "enabled": true,
      "host": "proxy.company.com",
      "port": 8080,
      "protocol": "https",
      "auth": {
        "type": "basic",
        "username": "${PROXY_USER}",
        "password": "${PROXY_PASS}"
      },
      "verifyCertificate": true
    }
  }
}
```

### 防火墙规则

```bash
# 限制出站连接
claude config set security.network.allowOutbound false

# 配置允许的域名
claude config set security.network.allowedDomains '["anthropic.com"]'
```

## 审计和日志

### 审计日志

**启用审计日志**

```json
{
  "security": {
    "audit": {
      "enabled": true,
      "logFile": "~/.claude/audit.log",
      "logLevel": "info",
      "logActions": [
        "file_read",
        "file_write",
        "file_delete",
        "command_execute",
        "api_call"
      ],
      "includeTimestamp": true,
      "includeUser": true,
      "includeContext": true
    }
  }
}
```

**审计日志格式**

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "user": "username",
  "action": "file_write",
  "resource": "/path/to/file.ts",
  "result": "success",
  "metadata": {
    "size": 1024,
    "checksum": "abc123"
  }
}
```

### 日志安全

```bash
# 加密日志文件
claude config set security.audit.encrypt true
claude config set security.audit.encryptionKey "${LOG_ENCRYPTION_KEY}"

# 设置日志保留期
claude config set security.audit.retention 90

# 自动归档旧日志
claude config set security.audit.autoArchive true
```

### 监控和告警

```json
{
  "security": {
    "monitoring": {
      "enabled": true,
      "alerts": [
        {
          "type": "suspicious_activity",
          "threshold": 5,
          "action": "notify"
        },
        {
          "type": "failed_authentication",
          "threshold": 3,
          "action": "block"
        }
      ],
      "notificationEmail": "security@company.com"
    }
  }
}
```

## 合规性

### GDPR 合规

```json
{
  "security": {
    "compliance": {
      "gdpr": {
        "enabled": true,
        "dataRetention": 30,
        "rightToErasure": true,
        "dataPortability": true
      }
    }
  }
}
```

### SOC 2 合规

```json
{
  "security": {
    "compliance": {
      "soc2": {
        "enabled": true,
        "auditTrail": true,
        "accessControl": true,
        "encryption": true
      }
    }
  }
}
```

### 数据驻留

```json
{
  "security": {
    "compliance": {
      "dataResidency": {
        "region": "us-east-1",
        "enforceRegion": true
      }
    }
  }
}
```

## 加密

### 传输加密

```json
{
  "security": {
    "encryption": {
      "inTransit": {
        "enabled": true,
        "protocol": "TLS1.3",
        "cipherSuites": [
          "TLS_AES_256_GCM_SHA384",
          "TLS_CHACHA20_POLY1305_SHA256"
        ]
      }
    }
  }
}
```

### 静态加密

```json
{
  "security": {
    "encryption": {
      "atRest": {
        "enabled": true,
        "algorithm": "AES-256-GCM",
        "keySource": "kms",
        "kmsKeyId": "arn:aws:kms:..."
      }
    }
  }
}
```

### 端到端加密

```bash
# 启用端到端加密
claude config set security.encryption.e2e.enabled true

# 生成加密密钥对
claude security generate-keypair

# 配置公钥
claude config set security.encryption.e2e.publicKey "$(cat ~/.claude/public.key)"
```

## 身份验证和授权

### 多因素认证

```json
{
  "security": {
    "authentication": {
      "mfa": {
        "enabled": true,
        "method": "totp",
        "required": true
      }
    }
  }
}
```

### 基于角色的访问控制

```json
{
  "security": {
    "authorization": {
      "rbac": {
        "enabled": true,
        "roles": {
          "developer": {
            "permissions": ["read", "write", "execute"]
          },
          "reviewer": {
            "permissions": ["read"]
          },
          "admin": {
            "permissions": ["*"]
          }
        }
      }
    }
  }
}
```

### 会话管理

```json
{
  "security": {
    "session": {
      "timeout": 3600,
      "maxSessions": 5,
      "requireReauth": true,
      "reauthInterval": 86400
    }
  }
}
```

## 漏洞管理

### 依赖扫描

```bash
# 扫描依赖漏洞
claude security scan-dependencies

# 更新有漏洞的依赖
claude security update-dependencies --fix-vulnerabilities

# 生成安全报告
claude security report --output security-report.pdf
```

### 安全更新

```bash
# 检查安全更新
claude security check-updates

# 自动安装安全补丁
claude config set security.autoUpdate true
claude config set security.autoUpdateSecurity true
```

## 事件响应

### 安全事件处理

```json
{
  "security": {
    "incidentResponse": {
      "enabled": true,
      "autoBlock": true,
      "notifyAdmin": true,
      "logIncidents": true,
      "incidentLogPath": "~/.claude/incidents.log"
    }
  }
}
```

### 紧急响应

```bash
# 立即撤销所有会话
claude security revoke-all-sessions

# 锁定账户
claude security lock-account

# 生成事件报告
claude security incident-report --id incident-123
```

## 安全最佳实践

### 开发环境

1. **使用独立的开发 API 密钥**
2. **启用所有安全功能**
3. **定期审查审计日志**
4. **限制文件系统访问**
5. **使用沙箱模式测试**

### 生产环境

1. **使用生产级 API 密钥**
2. **启用所有审计功能**
3. **配置严格的访问控制**
4. **启用加密**
5. **定期安全审计**

### 团队协作

1. **为每个成员分配独立密钥**
2. **使用基于角色的访问控制**
3. **定期审查权限**
4. **培训安全意识**
5. **建立安全响应流程**

## 安全检查清单

### 初始设置

- [ ] API 密钥安全存储
- [ ] 配置文件权限正确
- [ ] 启用审计日志
- [ ] 配置访问控制
- [ ] 设置敏感数据过滤

### 日常使用

- [ ] 不在代码中硬编码密钥
- [ ] 审查生成的代码
- [ ] 检查文件权限
- [ ] 监控审计日志
- [ ] 定期更新 CLI

### 定期维护

- [ ] 轮换 API 密钥
- [ ] 审查访问日志
- [ ] 更新安全规则
- [ ] 扫描漏洞
- [ ] 备份配置

## 故障排除

### 权限被拒绝

```bash
# 检查文件权限
ls -la ~/.config/claude/

# 修复权限
chmod 600 ~/.config/claude/config.json
chmod 700 ~/.config/claude/

# 检查 SELinux（Linux）
getenforce
setenforce 0  # 临时禁用以测试
```

### API 密钥无效

```bash
# 验证密钥格式
echo $ANTHROPIC_API_KEY | grep -E '^sk-ant-'

# 测试密钥
claude ask "测试" --debug

# 重新配置密钥
claude config set api.key "sk-ant-..."
```

### 审计日志问题

```bash
# 检查日志文件
ls -la ~/.claude/audit.log

# 验证日志格式
tail -f ~/.claude/audit.log | jq .

# 清理旧日志
claude security cleanup-logs --older-than 90
```

## 安全资源

### 官方文档

- [Anthropic 安全白皮书](https://www.anthropic.com/security)
- [API 安全指南](https://docs.anthropic.com/security)
- [合规性文档](https://www.anthropic.com/compliance)

### 安全工具

```bash
# 安全扫描工具
npm install -g @anthropic/security-scanner

# 密钥管理工具
brew install 1password-cli

# 审计工具
pip install claude-audit-analyzer
```

### 报告安全问题

如果发现安全漏洞，请通过以下方式报告：

- 邮箱：security@anthropic.com
- Bug Bounty：https://hackerone.com/anthropic
- 紧急热线：+1-xxx-xxx-xxxx

## 总结

安全是使用 Claude Code 的首要考虑因素。遵循本指南中的最佳实践，可以确保您的代码、数据和 API 密钥得到充分保护。定期审查和更新安全配置，保持警惕，及时响应安全事件。
