---
title: "Security Guide"
---

# Security Guide

Security is critical when using Claude Code. This guide covers best practices for protecting your code, data, and API keys.

## API Key Management

### Secure API Key Storage

**Recommended: Use environment variables**

```bash
# Set in ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-..."

# Or use .env file (don't commit to version control)
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
```

**Using system keychain (macOS)**

```bash
# Store to Keychain
security add-generic-password \
  -a "$USER" \
  -s "anthropic-api-key" \
  -w "sk-ant-..."

# Configure Claude to use Keychain
claude config set api.keySource keychain
claude config set api.keychainService anthropic-api-key
```

**Using key managers**

```bash
# Using 1Password CLI
export ANTHROPIC_API_KEY=$(op read "op://Private/Anthropic/api_key")

# Using AWS Secrets Manager
export ANTHROPIC_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id anthropic-api-key \
  --query SecretString \
  --output text)
```

### Practices to Avoid

```bash
# ❌ Don't hardcode in code
const apiKey = "sk-ant-...";

# ❌ Don't store in plaintext in config files
{
  "api": {
    "key": "sk-ant-..."
  }
}

# ❌ Don't pass directly on command line
claude --api-key sk-ant-... chat
```

### Key Rotation

```bash
# Regularly rotate API keys
# 1. Generate new key in Anthropic Console
# 2. Update environment variable
export ANTHROPIC_API_KEY="sk-ant-new-key"

# 3. Verify new key
claude ask "Test connection"

# 4. Revoke old key
```

## File System Security

### Access Control

**Configure allowed paths**

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

**Using sandbox mode**

```bash
# Enable sandbox mode
claude --sandbox chat

# Configure sandbox
claude config set security.sandbox.enabled true
claude config set security.sandbox.allowNetwork false
claude config set security.sandbox.allowExec false
```

### File Permissions

```bash
# Set configuration file permissions
chmod 600 ~/.config/claude/config.json

# Set log file permissions
chmod 600 ~/.claude/logs/*.log

# Check sensitive file permissions
find ~/.config/claude -type f -exec ls -la {} \;
```

### Sensitive File Protection

**Configure file exclusion rules**

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

**Auto-detect sensitive files**

```bash
# Enable sensitive file detection
claude config set security.detectSensitiveFiles true

# Configure detection patterns
claude config set security.sensitivePatterns '["password","api_key","secret","token"]'
```

## Data Privacy

### Sensitive Data Filtering

**Configure data filters**

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

**Using data redaction**

```bash
# Enable auto-redaction
claude config set security.autoRedact true

# Redact specific files
claude ask "Analyze this log" --file error.log --redact
```

### Local Processing

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

## Code Execution Security

### Command Execution Limits

**Configure allowed commands**

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

**Using whitelist mode**

```bash
# Enable whitelist mode
claude config set security.execution.whitelistMode true

# Add allowed commands
claude config set security.execution.whitelist '["git","npm","yarn"]'
```

### Code Review

**Automatic security scanning**

```bash
# Scan generated code
claude review --security-scan ./src

# Check for specific vulnerabilities
claude review --check sql-injection,xss,command-injection ./src
```

**Configure security rules**

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

## Network Security

### HTTPS Enforcement

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

### Proxy Configuration

**Secure proxy settings**

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

### Firewall Rules

```bash
# Restrict outbound connections
claude config set security.network.allowOutbound false

# Configure allowed domains
claude config set security.network.allowedDomains '["anthropic.com"]'
```

## Audit and Logging

### Audit Logs

**Enable audit logging**

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

**Audit log format**

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

### Log Security

```bash
# Encrypt log files
claude config set security.audit.encrypt true
claude config set security.audit.encryptionKey "${LOG_ENCRYPTION_KEY}"

# Set log retention period
claude config set security.audit.retention 90

# Auto-archive old logs
claude config set security.audit.autoArchive true
```

### Monitoring and Alerts

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

## Compliance

### GDPR Compliance

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

### SOC 2 Compliance

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

### Data Residency

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

## Encryption

### In-Transit Encryption

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

### At-Rest Encryption

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

### End-to-End Encryption

```bash
# Enable end-to-end encryption
claude config set security.encryption.e2e.enabled true

# Generate encryption key pair
claude security generate-keypair

# Configure public key
claude config set security.encryption.e2e.publicKey "$(cat ~/.claude/public.key)"
```

## Authentication and Authorization

### Multi-Factor Authentication

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

### Role-Based Access Control

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

### Session Management

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

## Vulnerability Management

### Dependency Scanning

```bash
# Scan dependency vulnerabilities
claude security scan-dependencies

# Update vulnerable dependencies
claude security update-dependencies --fix-vulnerabilities

# Generate security report
claude security report --output security-report.pdf
```

### Security Updates

```bash
# Check for security updates
claude security check-updates

# Auto-install security patches
claude config set security.autoUpdate true
claude config set security.autoUpdateSecurity true
```

## Incident Response

### Security Incident Handling

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

### Emergency Response

```bash
# Immediately revoke all sessions
claude security revoke-all-sessions

# Lock account
claude security lock-account

# Generate incident report
claude security incident-report --id incident-123
```

## Security Best Practices

### Development Environment

1. **Use separate development API keys**
2. **Enable all security features**
3. **Regularly review audit logs**
4. **Restrict file system access**
5. **Use sandbox mode for testing**

### Production Environment

1. **Use production-grade API keys**
2. **Enable all audit features**
3. **Configure strict access control**
4. **Enable encryption**
5. **Regular security audits**

### Team Collaboration

1. **Assign separate keys for each member**
2. **Use role-based access control**
3. **Regularly review permissions**
4. **Security awareness training**
5. **Establish security response processes**

## Security Checklist

### Initial Setup

- [ ] API key securely stored
- [ ] Configuration file permissions correct
- [ ] Audit logging enabled
- [ ] Access control configured
- [ ] Sensitive data filtering set up

### Daily Use

- [ ] No hardcoded keys in code
- [ ] Review generated code
- [ ] Check file permissions
- [ ] Monitor audit logs
- [ ] Regularly update CLI

### Periodic Maintenance

- [ ] Rotate API keys
- [ ] Review access logs
- [ ] Update security rules
- [ ] Scan for vulnerabilities
- [ ] Backup configuration

## Troubleshooting

### Permission Denied

```bash
# Check file permissions
ls -la ~/.config/claude/

# Fix permissions
chmod 600 ~/.config/claude/config.json
chmod 700 ~/.config/claude/

# Check SELinux (Linux)
getenforce
setenforce 0  # Temporarily disable for testing
```

### Invalid API Key

```bash
# Verify key format
echo $ANTHROPIC_API_KEY | grep -E '^sk-ant-'

# Test key
claude ask "Test" --debug

# Reconfigure key
claude config set api.key "sk-ant-..."
```

### Audit Log Issues

```bash
# Check log file
ls -la ~/.claude/audit.log

# Verify log format
tail -f ~/.claude/audit.log | jq .

# Clean up old logs
claude security cleanup-logs --older-than 90
```

## Security Resources

### Official Documentation

- [Anthropic Security Whitepaper](https://www.anthropic.com/security)
- [API Security Guide](https://docs.anthropic.com/security)
- [Compliance Documentation](https://www.anthropic.com/compliance)

### Security Tools

```bash
# Security scanning tool
npm install -g @anthropic/security-scanner

# Key management tool
brew install 1password-cli

# Audit tool
pip install claude-audit-analyzer
```

### Reporting Security Issues

If you discover a security vulnerability, please report it through:

- Email: security@anthropic.com
- Bug Bounty: https://hackerone.com/anthropic
- Emergency hotline: +1-xxx-xxx-xxxx

## Summary

Security is a primary consideration when using Claude Code. Following the best practices in this guide ensures your code, data, and API keys are adequately protected. Regularly review and update security configurations, stay vigilant, and respond promptly to security incidents.
