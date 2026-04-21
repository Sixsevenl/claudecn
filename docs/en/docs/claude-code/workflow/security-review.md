---
title: "Security Review Workflow"
---

# Security Review Workflow

Security is a critical aspect of software development that cannot be ignored. This guide covers how to use Claude Code to establish a systematic security review workflow.

## Importance of Security Review

### Common Security Issues

- Injection attacks (SQL, XSS, command injection)
- Authentication and authorization flaws
- Sensitive data exposure
- Insecure configurations
- Dependency vulnerabilities
- Encryption issues
- Access control defects

### Value of Security Review

- Early detection of security issues
- Reduced security risk
- Protection of user data
- Avoidance of financial loss
- Maintenance of brand reputation

## Using Claude for Security Review

### Comprehensive Security Review

Perform a comprehensive security review on code:

```
As a security reviewer, review this API endpoint:
@src/api/users.ts

Check items:
1. Input validation
2. Authentication and authorization
3. SQL injection risks
4. XSS risks
5. CSRF protection
6. Sensitive data handling
7. Error information leakage
8. Rate limiting

Output:
- Issues found (by severity)
- Detailed explanations
- Fix recommendations
- Code examples
```

### Specific Vulnerability Checks

Check for specific types of security vulnerabilities:

```
Check for SQL injection vulnerabilities:

File: @src/services/database.ts

Check:
- Whether parameterized queries are used
- Whether there is string concatenation
- Whether input is validated
- Whether an ORM is used

For each issue:
- Identify the specific location
- Explain the risk
- Provide a fix
```

## Security Review Checklist

### Input Validation

```markdown
## Input Validation Check

- [ ] All user input is validated
- [ ] Whitelist approach used instead of blacklist
- [ ] Data type and format validated
- [ ] Input length limited
- [ ] File uploads validated
- [ ] Input sanitized and escaped
```

### Authentication and Authorization

```markdown
## Authentication Authorization Check

- [ ] Strong password policy enforced
- [ ] Passwords correctly encrypted and stored
- [ ] Session management implemented
- [ ] Secure tokens used
- [ ] Permission checks implemented
- [ ] Privilege escalation prevented
- [ ] Account lockout implemented
```

### Data Protection

```markdown
## Data Protection Check

- [ ] Sensitive data encrypted at rest
- [ ] HTTPS used for transmission
- [ ] Sensitive information not logged
- [ ] Data masking implemented
- [ ] Sensitive data securely deleted
- [ ] Data access restricted
```

### Session Management

```markdown
## Session Management Check

- [ ] Secure session IDs used
- [ ] Reasonable timeout set
- [ ] Sessions destroyed on logout
- [ ] Session fixation prevented
- [ ] HttpOnly cookies used
- [ ] Secure cookies used
- [ ] CSRF protection implemented
```

## Common Vulnerability Detection

### SQL Injection

Detect and fix SQL injection:

```
Detect SQL injection vulnerabilities:

Unsafe code:
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.query(query);

Safe code:
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

Or use ORM:
const user = await User.findById(userId);

Check all database queries in the project
```

### XSS Attacks

Detect and fix XSS vulnerabilities:

```
Detect XSS vulnerabilities:

Unsafe code:
<div dangerouslySetInnerHTML={{__html: userInput}} />

Safe code:
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />

Or just use text:
<div>{userInput}</div>

Check all places where user input is rendered
```

### CSRF Attacks

Detect and fix CSRF vulnerabilities:

```
Detect CSRF vulnerabilities:

Check:
1. Whether CSRF tokens are used
2. Whether Origin/Referer is verified
3. Whether SameSite cookies are used

Implement CSRF protection:
- Use csurf middleware
- Include CSRF token in forms
- Verify the token

Example:
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

### Command Injection

Detect and fix command injection:

```
Detect command injection vulnerabilities:

Unsafe code:
exec(`convert ${userFile} output.png`);

Safe code:
import { execFile } from 'child_process';
execFile('convert', [userFile, 'output.png']);

Or use a library:
import sharp from 'sharp';
await sharp(userFile).toFile('output.png');

Check all places where system commands are executed
```

### Path Traversal

Detect and fix path traversal vulnerabilities:

```
Detect path traversal vulnerabilities:

Unsafe code:
const filePath = path.join(__dirname, userInput);
fs.readFile(filePath);

Safe code:
import path from 'path';
const filePath = path.join(__dirname, path.basename(userInput));
const realPath = fs.realpathSync(filePath);
if (!realPath.startsWith(__dirname)) {
  throw new Error('Invalid path');
}
fs.readFile(realPath);

Check all file operations
```

## Authentication and Authorization Review

### Password Security

Review password handling:

```
Review password security:

Check:
1. Password complexity requirements
2. Password encryption algorithm (bcrypt/argon2)
3. Salt usage
4. Password storage
5. Password reset flow

Unsafe:
const hash = md5(password);

Safe:
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash(password, 10);

Verify:
const valid = await bcrypt.compare(password, hash);
```

### JWT Security

Review JWT usage:

```
Review JWT security:

Check:
1. Use strong secrets
2. Set reasonable expiration
3. Verify signatures
4. Don't store sensitive information in JWT
5. Implement token revocation

Example:
import jwt from 'jsonwebtoken';

// Generate
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Access Control

Review access control:

```
Review access control:

Check:
1. Whether least privilege principle is implemented
2. Whether permissions are verified for each operation
3. Whether privilege escalation is prevented
4. Whether role management exists

Example middleware:
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

Usage:
app.delete('/api/users/:id',
  requirePermission('user:delete'),
  deleteUser
);
```

## Data Security Review

### Sensitive Data Handling

Review sensitive data handling:

```
Review sensitive data handling:

Check:
1. Is sensitive data encrypted
2. Is it logged
3. Is it exposed in error messages
4. Is it transmitted via HTTPS
5. Is data masking implemented

Example:
// Encryption
import crypto from 'crypto';
const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

// Log sanitization
function sanitizeLog(data) {
  const sanitized = { ...data };
  if (sanitized.password) sanitized.password = '***';
  if (sanitized.creditCard) sanitized.creditCard = '****';
  return sanitized;
}
```

### Database Security

Review database security:

```
Review database security:

Check:
1. Use parameterized queries
2. Least privilege database users
3. Encrypt sensitive fields
4. Regular backups
5. Access logging

Configuration example:
// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('/path/to/ca-cert.pem')
  }
});

// Query
async function getUser(id) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}
```

## Dependency Security Review

### Dependency Vulnerability Scanning

Scan for dependency vulnerabilities:

```
Scan dependency security vulnerabilities:

Using npm audit:
npm audit

Using Snyk:
npx snyk test

Analyze results:
- Vulnerability severity
- Affected packages
- Available fix versions
- Fix recommendations

Generate report:
- High-severity vulnerability list
- Fix plan
- Mitigation measures for unfixable vulnerabilities
```

### Dependency Update Strategy

Develop a dependency update strategy:

```
Dependency update strategy:

Principles:
1. Timely security patch updates
2. Regular dependency updates
3. Test functionality after updates
4. Use lock files

Process:
1. Weekly security update checks
2. Assess update impact
3. Verify in test environment
4. Deploy to production

Automation:
- Use Dependabot
- Configure auto PRs
- Set up CI testing
```

## Configuration Security Review

### Environment Variables

Review environment variable usage:

```
Review environment variable security:

Check:
1. No sensitive information in code
2. Using .env files
3. .env is in .gitignore
4. Production uses secure configuration management

Unsafe:
const apiKey = 'sk-1234567890';

Safe:
const apiKey = process.env.API_KEY;

.env file:
API_KEY=sk-1234567890
DB_PASSWORD=secure_password

.gitignore:
.env
.env.local
```

### Security Headers

Review HTTP security headers:

```
Review HTTP security headers:

Required security headers:
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security

Implementation:
import helmet from 'helmet';
app.use(helmet());

Or set manually:
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  next();
});
```

## Automated Security Review

### CI/CD Integration

Integrate security checks in CI/CD:

```yaml
# .github/workflows/security.yml
name: Security Check

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: Run ESLint security plugin
        run: npm run lint:security

      - name: Run SAST
        uses: github/codeql-action/analyze@v2
```

### Regular Security Scanning

Establish regular scanning mechanisms:

```
Regular security scanning schedule:

Daily:
- Dependency vulnerability scanning
- Automated security testing

Weekly:
- Code security review
- Configuration review

Monthly:
- Comprehensive security assessment
- Penetration testing
- Security training

Quarterly:
- Security policy review
- Third-party security audit
```

## Security Testing

### Security Test Cases

Write security test cases:

```typescript
describe('Security Tests', () => {
  describe('SQL Injection', () => {
    it('should prevent SQL injection in user query', async () => {
      const maliciousInput = "1' OR '1'='1";
      const result = await getUser(maliciousInput);
      expect(result).toBeNull();
    });
  });

  describe('XSS', () => {
    it('should sanitize user input', () => {
      const maliciousInput = '<script>alert("XSS")</script>';
      const sanitized = sanitizeInput(maliciousInput);
      expect(sanitized).not.toContain('<script>');
    });
  });

  describe('Authentication', () => {
    it('should reject weak passwords', () => {
      const weakPassword = '123456';
      expect(() => validatePassword(weakPassword))
        .toThrow('Password too weak');
    });

    it('should hash passwords', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash).toMatch(/^\$2[aby]\$/);
    });
  });

  describe('Authorization', () => {
    it('should deny access without permission', async () => {
      const user = { id: 1, permissions: ['read'] };
      const canDelete = hasPermission(user, 'delete');
      expect(canDelete).toBe(false);
    });
  });
});
```

## Security Documentation

### Security Policy Documentation

Maintain security policy documentation:

```markdown
# Security Policy

## Authentication
- Use bcrypt for password hashing (cost factor: 10)
- JWT token expiration: 1 hour
- Refresh token expiration: 7 days

## Authorization
- Implement role-based access control (RBAC)
- Principle of least privilege
- All API endpoints require permission checks

## Data Protection
- Sensitive data encrypted with AES-256-GCM
- All communication via HTTPS
- No sensitive information in logs

## Input Validation
- All user input must be validated
- Use whitelist validation
- Limit input length and format

## Dependency Management
- Weekly dependency vulnerability scanning
- Timely security patch updates
- Use lock files to pin versions

## Incident Response
- Security incident reporting process
- Incident response team
- Recovery plan
```

### Security Review Report

Generate security review reports:

```markdown
# Security Review Report

Date: 2024-01-15
Scope: User authentication module

## Issues Found

### High Severity
1. SQL Injection Risk
   - Location: src/services/user.ts:45
   - Description: Using string concatenation to build queries
   - Fix: Use parameterized queries

### Medium Severity
2. Weak Password Policy
   - Location: src/utils/validation.ts:12
   - Description: Only requires 6-character passwords
   - Fix: Require at least 8 characters with upper/lowercase and numbers

### Low Severity
3. Missing Rate Limiting
   - Location: src/api/auth.ts
   - Description: Login endpoint has no rate limiting
   - Fix: Add rate limiting middleware

## Fix Plan
- High severity: Fix immediately
- Medium severity: Fix within this week
- Low severity: Fix in next iteration

## Recommendations
- Implement regular security training
- Establish secure coding standards
- Add automated security testing
```

## Best Practices

1. Establish security review processes
2. Use automation tools
3. Regular security training
4. Keep dependencies updated
5. Implement defense in depth
6. Document security decisions
7. Regular security assessments
8. Establish incident response mechanisms

## Summary

Effective security review requires:

- Systematic review processes
- Comprehensive checklists
- Automation tool support
- Continuous security awareness
- Timely issue resolution

With Claude Code and security tools, you can build a comprehensive security review workflow to protect your application and user data.
