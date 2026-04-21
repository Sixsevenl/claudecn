---
title: "Context Roles: Development/Research/Review"
---

# Context Roles: Development/Research/Review

By assigning different roles to Claude Code, you can get more specialized and targeted assistance. This guide covers how to use role-based context to improve work efficiency.

## The Value of Roles

### Why Use Roles

Different tasks require different mindsets:

- Development role: Focus on implementation and code quality
- Research role: Focus on exploration and learning
- Review role: Focus on quality and best practices
- Architecture role: Focus on design and decisions

### Advantages of Roles

- Get more specialized advice
- Maintain task focus
- Improve response relevance
- Optimize context usage

## Development Role

### Role Definition

Set up a development role:

```
As a development engineer, help me implement the user authentication feature.

Tech stack:
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT

Requirements:
- Follow RESTful design
- Complete error handling
- Input validation
- Unit tests
```

### Development Role Characteristics

Focus on:
- Feature implementation
- Code quality
- Test coverage
- Performance optimization
- Error handling

### Development Task Examples

**Implementing new features:**

```
As a development engineer, implement the order management feature:

Requirements:
- Create orders
- Query orders
- Update order status
- Cancel orders

Technical requirements:
- Use transactions for data consistency
- Add optimistic locking for concurrency
- Implement order state machine
- Complete unit tests
```

**Fixing bugs:**

```
As a development engineer, fix the login failure issue:

Issue description:
- Users cannot log in
- Error message: Invalid credentials
- Only occurs in production

Debugging steps:
1. Reproduce the issue
2. Check logs
3. Compare dev and production environments
4. Identify root cause
5. Implement fix
6. Verify fix
```

**Refactoring code:**

```
As a development engineer, refactor the user service:

Goals:
- Improve code readability
- Reduce code duplication
- Improve error handling
- Enhance type safety

Constraints:
- Keep API interface unchanged
- Keep tests passing
- No performance impact
```

## Research Role

### Role Definition

Set up a research role:

```
As a technical researcher, help me evaluate state management solutions.

Background:
- React project
- Medium complexity
- 5-person team

Need to compare:
- Redux
- Zustand
- Jotai
- Recoil

Evaluation dimensions:
- Learning curve
- Performance
- Developer experience
- Ecosystem
- Maintenance cost
```

### Research Role Characteristics

Focus on:
- Technology comparison
- Pros and cons analysis
- Use cases
- Best practices
- Learning resources

### Research Task Examples

**Technology selection:**

```
As a technical researcher, help me choose a database solution:

Project requirements:
- User data storage
- High concurrency read/write
- Complex queries
- High data consistency requirements

Candidates:
- PostgreSQL
- MySQL
- MongoDB

Please provide:
- Detailed comparison
- Recommended solution
- Reasoning
```

**Learning new technology:**

```
As a technical researcher, help me learn React Server Components:

Goals:
- Understand how they work
- Learn use cases
- Master best practices
- Assess migration cost

Please provide:
- Concept explanation
- Code examples
- Practical advice
- Learning resources
```

**Problem research:**

```
As a technical researcher, investigate solutions for performance issues:

Problem:
- Slow list rendering
- 1000+ data items
- Complex cells

Research directions:
- Virtual scrolling
- Paginated loading
- Lazy loading
- Web Workers

Please provide:
- Pros and cons of each approach
- Implementation difficulty
- Performance comparison
- Recommended approach
```

## Review Role

### Role Definition

Set up a review role:

```
As a code reviewer, review this PR:

Review focus:
- Code quality
- Security
- Performance
- Maintainability
- Test coverage

Project standards:
- ESLint (Airbnb)
- TypeScript strict
- Test coverage > 80%
```

### Review Role Characteristics

Focus on:
- Code standards
- Best practices
- Potential issues
- Improvement suggestions
- Quality assurance

### Review Task Examples

**Code review:**

```
As a code reviewer, review the user authentication module:

Files:
- src/auth/login.ts
- src/auth/register.ts
- src/middleware/auth.ts

Review checklist:
- [ ] Input validation
- [ ] Error handling
- [ ] Security
- [ ] Performance
- [ ] Code style
- [ ] Test coverage
- [ ] Documentation completeness
```

**Security review:**

```
As a security reviewer, review the API endpoint security:

Endpoint: POST /api/users

Check items:
- Authentication and authorization
- Input validation and sanitization
- SQL injection protection
- XSS protection
- CSRF protection
- Rate limiting
- Sensitive data handling
```

**Performance review:**

```
As a performance reviewer, review this component's performance:

Component: ProductList

Focus areas:
- Unnecessary re-renders
- Large data handling
- Memory leak risks
- Network request optimization
- Image loading optimization
```

## Architecture Role

### Role Definition

Set up an architecture role:

```
As an architect, design the system architecture for an e-commerce platform:

Requirements:
- Support 100K daily active users
- High availability (99.9%)
- Scalability
- Security

Tech stack:
- Microservices architecture
- Containerized deployment
- Cloud native

Please provide:
- System architecture diagram
- Technology selection
- Scaling strategy
- Risk assessment
```

### Architecture Role Characteristics

Focus on:
- System design
- Technology selection
- Scalability
- Maintainability
- Risk management

### Architecture Task Examples

**System design:**

```
As an architect, design the order system:

Functional requirements:
- Create orders
- Payment processing
- Inventory management
- Order status tracking

Non-functional requirements:
- High concurrency (1000 TPS)
- Data consistency
- High availability
- Scalability

Please provide:
- Architecture design
- Data model
- Interface design
- Technical solution
```

**Technical decisions:**

```
As an architect, decide on the caching strategy:

Scenario:
- Product information queries
- High-frequency access
- Infrequent data updates

Considerations:
- Cache location (client/CDN/server)
- Cache strategy (LRU/LFU/TTL)
- Cache update (active/passive)
- Cache consistency

Please provide:
- Recommended approach
- Implementation details
- Risks and mitigations
```

## Role Switching

### When to Switch Roles

Use different roles at different stages:

```
Phase 1 (Architecture role):
Design system architecture

Phase 2 (Research role):
Evaluate technical solutions

Phase 3 (Development role):
Implement features

Phase 4 (Review role):
Code review and optimization
```

### Smooth Switching

Switch roles within a session:

```
Previously implemented the feature as a development engineer,
now switching to the reviewer role,
to review the code just implemented
```

## Multi-role Collaboration

### Simulating Team Collaboration

Use multiple sessions to simulate a team:

```
Session 1 (Architect):
Design system architecture

Session 2 (Developer):
Implement features

Session 3 (Reviewer):
Code review

Session 4 (Test engineer):
Write tests
```

### Role Discussion

Have different roles discuss approaches:

```
As an architect, I suggest using a microservices architecture.

Now as a development engineer, evaluate the implementation difficulty of this approach.

Then as an operations engineer, evaluate the operational complexity.
```

## Specialized Roles

### Frontend Developer Role

```
As a frontend development engineer:

Specialties:
- React/Vue development
- Responsive design
- Performance optimization
- User experience

Focus areas:
- Component design
- State management
- Style implementation
- Interaction experience
```

### Backend Developer Role

```
As a backend development engineer:

Specialties:
- API design
- Database design
- Performance optimization
- Security

Focus areas:
- Interface design
- Data models
- Business logic
- System integration
```

### DevOps Role

```
As a DevOps engineer:

Specialties:
- CI/CD
- Containerization
- Monitoring and alerting
- Automated operations

Focus areas:
- Deployment process
- Environment configuration
- Performance monitoring
- Incident handling
```

### Test Engineer Role

```
As a test engineer:

Specialties:
- Test design
- Automated testing
- Performance testing
- Security testing

Focus areas:
- Test coverage
- Edge cases
- Performance metrics
- Security vulnerabilities
```

## Role Templates

### Development Role Template

```
As a [frontend/backend] development engineer, implement [feature name]:

Tech stack:
- [Technology list]

Requirements:
- [Requirement 1]
- [Requirement 2]

Technical requirements:
- [Requirement 1]
- [Requirement 2]

Acceptance criteria:
- [Criteria 1]
- [Criteria 2]
```

### Research Role Template

```
As a technical researcher, research [topic]:

Background:
- [Project background]
- [Current situation]

Goals:
- [Research goals]

Research scope:
- [Scope 1]
- [Scope 2]

Output requirements:
- [Requirement 1]
- [Requirement 2]
```

### Review Role Template

```
As a [code/security/performance] reviewer, review [target]:

Review scope:
- [Scope 1]
- [Scope 2]

Review criteria:
- [Criteria 1]
- [Criteria 2]

Output requirements:
- Issue list
- Severity levels
- Improvement suggestions
```

## Best Practices

### Define Roles Clearly

Clearly define the role's responsibilities and focus:

```
As a security reviewer (not a development engineer),
only focus on security issues, do not provide implementation suggestions
```

### Maintain Role Consistency

Keep the role consistent within a task:

```
In this session, I will always work as a development engineer
```

### Switch Roles at the Right Time

Switch roles at appropriate moments:

```
Feature implementation complete, now switching to reviewer role,
to review code quality
```

### Record Role Decisions

Record decisions from different roles:

```
Architect decision: Use microservices architecture
Developer feedback: High implementation complexity
Final decision: Start with monolithic architecture, leave room for microservices migration
```

## Common Scenarios

### Scenario 1: New Feature Development

```
1. Architect: Design feature architecture
2. Developer: Implement feature
3. Reviewer: Code review
4. Test engineer: Write tests
```

### Scenario 2: Technology Selection

```
1. Researcher: Research technical solutions
2. Architect: Evaluate and decide
3. Developer: Assess implementation difficulty
4. Operations engineer: Assess operational cost
```

### Scenario 3: Performance Optimization

```
1. Performance reviewer: Identify bottlenecks
2. Architect: Design optimization plan
3. Developer: Implement optimization
4. Test engineer: Verify results
```

### Scenario 4: Security Hardening

```
1. Security reviewer: Identify security issues
2. Architect: Design security plan
3. Developer: Implement hardening
4. Security reviewer: Verify results
```

## Summary

Role-based context management can:

- Get more specialized advice
- Maintain task focus
- Improve work efficiency
- Simulate team collaboration
- Enhance decision quality

By mastering the use of different roles, you can fully leverage Claude Code's potential and get higher-quality assistance.
