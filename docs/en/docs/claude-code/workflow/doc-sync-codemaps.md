---
title: "Doc Sync & Codemaps"
---

# Doc Sync & Codemaps

Keeping documentation in sync with code is a significant challenge in software development. This guide covers how to use Claude Code to maintain documentation, and how to create and use code maps (Codemaps) to understand project structure.

## The Importance of Doc Sync

### Why Documentation Becomes Outdated

Common reasons:
- Code updated but documentation not
- High documentation maintenance cost
- Lack of automation mechanisms
- Team members forget to update

### Harm of Outdated Documentation

- Misleads new members
- Increases learning cost
- Reduces development efficiency
- Affects decision quality

## Using Claude Code to Sync Documentation

### Automatically Detect Inconsistencies

Have Claude detect documentation and code inconsistencies:

```
Check documentation and code consistency:

Documentation: @docs/api/users.md
Code: @src/api/users.ts

Check:
- Whether API endpoints match
- Whether parameters are consistent
- Whether response format is correct
- Whether error codes are complete
```

### Automatically Update Documentation

Update documentation based on code changes:

```
Code has been updated, sync the documentation:

Changes:
- Added email field to User interface
- Added /api/users/verify endpoint
- Modified error response format

Documentation to update:
- docs/api/users.md
- docs/types/user.md
- README.md
```

### Generate Documentation

Generate documentation from code:

```
Generate API documentation from code:

Source file: @src/api/users.ts

Generate:
- OpenAPI specification
- Markdown documentation
- Usage examples

Output to: docs/api/users.md
```

## Documentation Types

### API Documentation

Maintain API documentation:

```markdown
# User API

## GET /api/users/:id

Get user information

### Parameters

- `id` (string, required): User ID

### Response

Success (200):
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

Error (404):
```json
{
  "error": "User not found"
}
```

### Example

```bash
curl https://api.example.com/api/users/123
```
```

### Architecture Documentation

Maintain architecture documentation:

```markdown
# System Architecture

## Overview

The e-commerce platform uses a microservices architecture with the following services:

- User Service: Handles user authentication and management
- Order Service: Handles order creation and management
- Payment Service: Handles payment integration
- Notification Service: Handles email and push notifications

## Tech Stack

- Backend: Node.js + Express
- Database: PostgreSQL
- Cache: Redis
- Message Queue: RabbitMQ

## Data Flow

1. User places order → Order Service
2. Order Service → Payment Service
3. Payment success → Notification Service
4. Notification Service → Send confirmation email
```

### Development Guide

Maintain development guides:

```markdown
# Development Guide

## Environment Setup

1. Install dependencies
```bash
npm install
```

2. Configure environment variables
```bash
cp .env.example .env
```

3. Start development server
```bash
npm run dev
```

## Code Standards

- Use ESLint (Airbnb config)
- Format with Prettier
- TypeScript strict mode
- Run tests before committing

## Workflow

1. Create feature branch
2. Develop feature
3. Write tests
4. Create PR
5. Code review
6. Merge to main
```

## Code Maps (Codemaps)

### What is a Codemap

A Codemap is a visual representation of project structure and key code that helps quickly understand the project.

### Creating a Project Codemap

Have Claude create a project map:

```
Create a Codemap for the project:

Analyze:
- Directory structure
- Main modules
- Dependencies
- Data flow

Output format:
- Directory tree
- Module relationship diagram
- Key file descriptions
- Data flow diagram

Save to: docs/codemap.md
```

### Codemap Example

```markdown
# Project Codemap

## Directory Structure

```
src/
├── api/              # API routes
│   ├── users.ts      # User-related APIs
│   ├── orders.ts     # Order-related APIs
│   └── payments.ts   # Payment-related APIs
├── services/         # Business logic
│   ├── auth.ts       # Authentication service
│   ├── user.ts       # User service
│   └── order.ts      # Order service
├── models/           # Data models
│   ├── user.ts       # User model
│   └── order.ts      # Order model
├── middleware/       # Middleware
│   ├── auth.ts       # Auth middleware
│   └── error.ts      # Error handling
└── utils/            # Utility functions
    ├── validation.ts # Validation utilities
    └── logger.ts     # Logging utilities
```

## Module Relationships

```
API Layer (api/)
    ↓
Service Layer (services/)
    ↓
Model Layer (models/)
    ↓
Database
```

## Key Files

### src/api/users.ts
User-related API endpoints:
- GET /api/users/:id - Get user
- POST /api/users - Create user
- PUT /api/users/:id - Update user

### src/services/auth.ts
Authentication service, provides:
- JWT token generation
- Token verification
- Password encryption

### src/middleware/auth.ts
Authentication middleware, protects routes requiring authentication

## Data Flow

1. Request → API route
2. API route → Middleware (auth, validation)
3. Middleware → Service layer
4. Service layer → Model layer
5. Model layer → Database
6. Response ← Reverse path
```

### Feature Module Map

Create maps for specific features:

```
Create a Codemap for the user authentication module:

Include:
- Related file list
- Function call relationships
- Data flow
- External dependencies

Output to: docs/modules/auth-codemap.md
```

### Dependency Graph

Visualize dependencies:

```
Generate dependency graph:

Analyze:
- Inter-module dependencies
- External package dependencies
- Circular dependencies

Output:
- Dependency tree
- Issue identification
- Optimization suggestions
```

## Automated Documentation Workflow

### Commit-time Updates

Automatically update documentation on commit:

```
Set up a pre-commit hook:

Check:
1. Whether code has JSDoc comments
2. Whether public APIs have documentation
3. Whether README needs updating

If needed, prompt to update documentation
```

### PR-time Checks

Check documentation in PRs:

```
PR documentation check:

Check items:
- Whether new APIs have documentation
- Whether modified API docs are updated
- Whether architecture changes have updated documentation
- Whether README needs updating

Output:
- Check report
- List of documentation to update
```

### Regular Reviews

Periodically review documentation quality:

```
Monthly documentation review:

Check:
- Documentation completeness
- Documentation accuracy
- Documentation readability
- Example code validity

Output:
- Review report
- Improvement suggestions
- Update plan
```

## Documentation Best Practices

### Keep It Concise

Documentation should be clear and concise:

```markdown
Good documentation:
## Create User

POST /api/users

Parameters:
- name: Username
- email: Email

Example:
curl -X POST https://api.example.com/api/users \
  -d '{"name":"John","email":"john@example.com"}'

Bad documentation:
## User Creation Interface

This interface is used to create new users. It accepts POST requests,
requires a username and email. The username should be a string type,
and the email should also be a string type. After successful creation...
(Too verbose)
```

### Use Examples

Provide practical examples:

```markdown
## Examples

### Create User

```javascript
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
  }),
});

const user = await response.json();
console.log(user);
```

### Response

```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```
```

### Keep Updated

Establish an update mechanism:

```
Documentation update process:

1. During code changes
   - Identify affected documentation
   - Update related documentation
   - Include documentation updates in PR

2. Regular reviews
   - Monthly documentation review
   - Fix outdated content
   - Improve documentation quality

3. User feedback
   - Collect documentation feedback
   - Improve unclear sections
   - Add missing content
```

## Documentation Tools

### JSDoc

Use JSDoc comments:

```typescript
/**
 * Create a new user
 *
 * @param userData - User data
 * @param userData.name - Username
 * @param userData.email - Email
 * @returns Created user object
 * @throws {ValidationError} When data validation fails
 * @throws {DuplicateError} When email already exists
 *
 * @example
 * const user = await createUser({
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 */
export async function createUser(userData: UserData): Promise<User> {
  // implementation
}
```

### TypeDoc

Generate TypeScript documentation:

```
Use TypeDoc to generate documentation:

Configuration:
- Input: src/
- Output: docs/api/
- Theme: default
- Include private members: no

Run: typedoc
```

### OpenAPI

Generate OpenAPI documentation:

```
Generate OpenAPI specification from code:

Source files: src/api/
Output: docs/openapi.yaml

Include:
- All endpoints
- Request/response schemas
- Authentication methods
- Error codes
```

### Storybook

Create documentation for components:

```
Create Storybook for React components:

Component: src/components/Button.tsx

Create:
- Basic examples
- Different states
- Interactive examples
- Props documentation
```

## Maintaining Codemaps

### Update Codemaps

Update when project structure changes:

```
Project structure has changed, update Codemap:

Changes:
- Added notifications/ directory
- Restructured services/
- Removed legacy/ directory

Update:
- docs/codemap.md
- Update directory tree
- Update module relationship diagram
- Update data flow diagram
```

### Versioned Codemaps

Maintain Codemaps for different versions:

```
docs/
  codemaps/
    v1.0-codemap.md
    v2.0-codemap.md
    current-codemap.md
```

### Interactive Codemaps

Create interactive code maps:

```
Generate interactive Codemap:

Format: HTML + JavaScript
Features:
- Clickable directory tree
- Module relationship visualization
- Search functionality
- Code preview

Output: docs/codemap.html
```

## Documentation Templates

### API Documentation Template

```markdown
# [API Name]

## Overview

[Brief description]

## Endpoints

### [Method] [Path]

[Description]

#### Parameters

- `param1` (type, required/optional): Description
- `param2` (type, required/optional): Description

#### Request Body

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

#### Response

Success (200):
```json
{
  "result": "success"
}
```

Error (400):
```json
{
  "error": "Error message"
}
```

#### Example

```bash
curl -X [METHOD] [URL] \
  -H "Content-Type: application/json" \
  -d '[REQUEST_BODY]'
```
```

### Module Documentation Template

```markdown
# [Module Name]

## Overview

[Module description]

## Responsibilities

- Responsibility 1
- Responsibility 2

## Dependencies

- Dependency module 1
- Dependency module 2

## Main Components

### [Component Name]

[Component description]

#### Interface

```typescript
interface ComponentInterface {
  method1(): void;
  method2(param: string): Promise<Result>;
}
```

#### Usage Example

```typescript
const component = new Component();
await component.method2('example');
```

## Data Flow

1. Step 1
2. Step 2
3. Step 3
```

## Common Issues

### Issue 1: Too Much Documentation to Maintain

Solution:
- Focus on core documentation
- Automate generation
- Use documentation tools
- Regularly clean up outdated documentation

### Issue 2: Documentation Out of Sync with Code

Solution:
- Automated checks
- Include documentation updates in PRs
- Regular reviews
- Use code comments to generate documentation

### Issue 3: Documentation Hard to Find

Solution:
- Clear directory structure
- Comprehensive index
- Search functionality
- Cross-references

### Issue 4: Inconsistent Documentation Quality

Solution:
- Use documentation templates
- Include documentation in code reviews
- Documentation quality standards
- Regular training

## Best Practices

1. Keep documentation and code in sync
2. Use automation tools
3. Provide practical examples
4. Keep documentation clear and concise
5. Regularly review and update
6. Use version control
7. Establish documentation standards
8. Collect and respond to feedback

## Summary

Effective documentation management requires:

- Automation tool support
- Clear documentation structure
- Regular maintenance mechanisms
- Team participation
- Continuous improvement

With Claude Code and the right tools, you can keep documentation in sync with code and improve project maintainability.
