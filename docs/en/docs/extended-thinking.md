---
title: "Extended Thinking"
---

# Extended Thinking

Extended thinking mode allows Claude to think more deeply before answering complex questions, providing more accurate and comprehensive solutions.

## Basic Usage

```bash
# Launch Claude Code
claude

# Request a complex analysis task
You: Analyze the time complexity of this algorithm and suggest optimizations

Claude: Let me think carefully about this...

[Thinking process]
1. First analyze the current implementation structure
2. Identify nested loops and recursive calls
3. Calculate worst-case time complexity
4. Consider possible optimization strategies
5. Evaluate trade-offs for each optimization

Claude: After analysis, the current algorithm's time complexity is O(n²)...
```

## Enabling Extended Thinking

```bash
You: /model opus

Claude: Switched to Opus 4.6 model

You: Use extended thinking mode to analyze this architecture design

Claude: [Entering deep thinking mode]

Thinking steps:
1. Understand the core components of the current architecture
2. Analyze dependencies between components
3. Identify potential bottlenecks and single points of failure
4. Consider scalability and maintainability
5. Evaluate security and performance implications
6. Propose improvements

[Detailed analysis results...]
```

## Complex Problem Solving

```bash
You: My application's performance degrades under high concurrency, help me find the cause

Claude: This requires systematic analysis, let me think deeply...

Claude wants to:
  • Read file: src/server.ts
  • Read file: src/database/connection.ts
  • Read file: src/middleware/auth.ts
Allow? [y/n/always/never]

You: always

Claude: [Extended thinking analysis]

Step 1: Check server configuration
- Finding: Single thread handling all requests
- Impact: Low CPU utilization, long response times

Step 2: Analyze database connections
- Finding: Connection pool size is only 5
- Impact: Connection waiting under high concurrency

Step 3: Check middleware
- Finding: Each request re-validates JWT
- Impact: Unnecessary computational overhead

Step 4: Comprehensive evaluation
Root causes:
1. Missing cluster mode
2. Database connection pool too small
3. No caching mechanism

Suggested optimizations:
1. Enable Node.js cluster mode
2. Increase connection pool to 20-50
3. Add Redis cache for JWT verification results
4. Implement request rate limiting

Expected improvements:
- 5-10x throughput increase
- 60-80% response time reduction
```

## Architecture Design Review

```bash
You: Review this microservice architecture design, point out potential issues

Claude: Let me perform a comprehensive architecture analysis...

Claude wants to:
  • Read file: docs/architecture.md
  • Read file: docker-compose.yml
  • Read file: kubernetes/deployment.yaml
Allow? [y/n/always/never]

You: y

Claude: [Deep thinking in progress...]

Architecture review report:

1. Service decomposition analysis
   ✓ Strength: Clear service boundaries
   ✗ Issue: High coupling between user service and order service
   Suggestion: Consider merging or using event-driven decoupling

2. Data consistency
   ✗ Issue: Missing distributed transaction handling
   Suggestion: Implement Saga pattern or use message queues

3. Service discovery
   ✓ Strength: Using Kubernetes service discovery
   ⚠️ Note: Health checks need to be configured

4. Observability
   ✗ Issue: Missing unified logging and monitoring
   Suggestion: Integrate ELK or Prometheus + Grafana

5. Security
   ✗ Issue: Unencrypted inter-service communication
   Suggestion: Implement mTLS or use a service mesh

6. Scalability
   ✓ Strength: Supports horizontal scaling
   ⚠️ Note: Database may become a bottleneck

Priority recommendations:
High: Data consistency, security
Medium: Observability, service decoupling
Low: Performance optimization
```

## Code Refactoring Suggestions

```bash
You: This code needs refactoring, give me a detailed refactoring plan

Claude: Let me analyze the code quality in depth...

Claude wants to:
  • Read file: src/services/UserService.ts
Allow? [y/n/always/never]

You: y

Claude: [Extended thinking analysis]

Current code issues:

1. Too many responsibilities (violates Single Responsibility Principle)
   - User validation
   - Database operations
   - Email sending
   - Logging

2. Missing error handling
   - Database errors not caught
   - Network errors not handled

3. Hardcoded configuration
   - Email server address
   - Database connection string

4. Missing tests
   - No unit tests
   - Dependencies difficult to mock

Refactoring plan:

Step 1: Split responsibilities
```typescript
// Create independent service classes
class UserRepository {
  // Only responsible for database operations
}

class EmailService {
  // Only responsible for email sending
}

class UserValidator {
  // Only responsible for validation logic
}
```

Step 2: Dependency injection
```typescript
class UserService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService,
    private validator: UserValidator
  ) {}
}
```

Step 3: Externalize configuration
```typescript
// Use environment variables
const config = {
  email: process.env.EMAIL_SERVER,
  db: process.env.DATABASE_URL
}
```

Step 4: Add error handling
```typescript
try {
  await this.userRepo.save(user);
} catch (error) {
  logger.error('Failed to save user', error);
  throw new UserServiceError('Save failed');
}
```

Should I execute this refactoring plan?
```

## Performance Optimization Analysis

```bash
You: Analyze the performance issues with this query and optimize it

Claude: Let me perform a performance analysis...

Claude wants to:
  • Read file: src/queries/getUserOrders.ts
  • Read file: prisma/schema.prisma
Allow? [y/n/always/never]

You: y

Claude: [Deep performance analysis]

Current query analysis:

```sql
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
WHERE u.id = ?
```

Issues identified:

1. N+1 query problem
   - Each order triggers additional queries
   - Estimated: 100 orders = 100+ queries

2. Selecting all fields
   - Transferring unnecessary data
   - Impact: Network and memory overhead

3. Missing indexes
   - orders.user_id has no index
   - order_items.order_id has no index

4. No pagination
   - Loading all data at once
   - Large data sets cause significant overhead

Optimization solutions:

Solution 1: Use JOIN eager loading
```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    orders: {
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    }
  }
});
```

Solution 2: Add database indexes
```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

Solution 3: Implement pagination
```typescript
const orders = await prisma.order.findMany({
  where: { userId },
  take: 20,
  skip: page * 20,
  orderBy: { createdAt: 'desc' }
});
```

Solution 4: Select necessary fields
```typescript
select: {
  id: true,
  name: true,
  orders: {
    select: {
      id: true,
      total: true,
      createdAt: true
    }
  }
}
```

Expected improvements:
- Query time: from 2000ms down to 50ms
- Memory usage: reduced by 80%
- Database load: reduced by 95%
```

## Security Audit

```bash
You: Audit the security of this API

Claude: Let me perform a comprehensive security audit...

Claude wants to:
  • Read file: src/api/routes/auth.ts
  • Read file: src/middleware/auth.ts
  • Read file: src/config/security.ts
Allow? [y/n/always/never]

You: y

Claude: [Security audit analysis]

Security issues found:

Critical 🔴
1. SQL injection risk
   Location: src/api/routes/user.ts:45
   ```typescript
   const query = `SELECT * FROM users WHERE email = '${email}'`;
   ```
   Fix: Use parameterized queries

2. Plaintext password storage
   Location: src/models/User.ts:23
   Fix: Use bcrypt hashing

3. Missing CSRF protection
   Location: All POST endpoints
   Fix: Implement CSRF tokens

High 🟠
4. JWT without expiration
   Location: src/middleware/auth.ts:12
   Fix: Set reasonable expiration time

5. Sensitive information leakage
   Location: Error responses contain stack traces
   Fix: Hide detailed errors in production

6. Missing rate limiting
   Location: Login endpoint
   Fix: Implement rate limiting

Medium 🟡
7. Weak password policy
   Fix: Require minimum length and complexity

8. Missing HTTPS enforcement
   Fix: Add HSTS headers

Fix priority:
1. Fix immediately: SQL injection, password storage
2. Fix this week: CSRF, JWT expiration
3. Fix this month: Other issues

Should I generate fix code?
```

## Using Plan Mode

```bash
# Press Shift+Tab to switch to Plan Mode
[Bottom shows: ⏸ plan mode on]

You: Refactor the entire authentication system using best practices

Claude: [Extended thinking + Plan mode]

Refactoring plan:

Phase 1: Preparation (1-2 hours)
- Back up current code
- Create new branch
- Install necessary dependencies (bcrypt, jsonwebtoken, express-rate-limit)

Phase 2: Data model updates (2-3 hours)
- Add password hash field
- Add refresh token table
- Add login attempt tracking table
- Run database migration

Phase 3: Core functionality implementation (4-6 hours)
- Implement password hashing service
- Implement JWT generation and verification
- Implement refresh token mechanism
- Add rate limiting middleware

Phase 4: Security hardening (2-3 hours)
- Add CSRF protection
- Implement account lockout mechanism
- Add audit logging
- Configure security response headers

Phase 5: Testing (3-4 hours)
- Write unit tests
- Write integration tests
- Perform security testing
- Performance testing

Phase 6: Deployment (1-2 hours)
- Update environment variables
- Deploy to staging environment
- Verify functionality
- Deploy to production

Total estimated time: 13-20 hours

Risk assessment:
- High: Database migration may affect existing users
- Medium: JWT changes require users to re-login
- Low: Performance impact

Begin execution?
```

## Common Commands

```bash
/model opus    # Use Opus 4.6 for best thinking capabilities
/fast          # Fast mode (less thinking time)
/cost          # View usage cost
```

## Keyboard Shortcuts

- `Shift+Tab` - Switch to Plan Mode to view detailed plans
- `Ctrl+C` - Interrupt the thinking process

## Best Practices

1. **Use Opus model for complex problems**: Stronger reasoning capabilities
2. **Combine with Plan Mode**: Review the plan first, then execute after confirmation
3. **Provide sufficient context**: Let Claude understand the full background
4. **Process step by step**: Break large problems into smaller ones

## Use Cases

- Architecture design and review
- Performance optimization analysis
- Security auditing
- Complex refactoring
- Algorithm optimization
- System debugging
- Technology selection
