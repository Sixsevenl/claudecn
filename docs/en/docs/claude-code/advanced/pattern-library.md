---
title: "Pattern Library: Skills Crystallization"
---

# Pattern Library: Skills Crystallization

The pattern library is a collection of Skills and best practices accumulated by the team. By crystallizing solutions for common scenarios, teams can quickly reuse experience and improve overall efficiency.

## What is a Pattern Library

The pattern library contains:

- **Skills templates**: Reusable task templates
- **Workflow patterns**: Common workflow processes
- **Best practices**: Verified methods
- **Anti-patterns**: Practices to avoid

## Code Generation Patterns

### 1. CRUD Generator

`.claude/patterns/crud-generator.md`:

```markdown
---
name: crud-gen
description: Generate complete CRUD functionality
args:
  - name: entity
    description: Entity name
    required: true
  - name: fields
    description: Field definitions (JSON)
    required: true
---

# CRUD Generator

Generate complete CRUD functionality for a specified entity.

## Generated Content

1. **Data Model**
   - TypeScript interface
   - Database Schema
   - Validation rules

2. **Backend API**
   - GET /api/{entity} - List
   - GET /api/{entity}/:id - Detail
   - POST /api/{entity} - Create
   - PUT /api/{entity}/:id - Update
   - DELETE /api/{entity}/:id - Delete

3. **Frontend Components**
   - List page
   - Detail page
   - Create/Edit form

4. **Tests**
   - API tests
   - Component tests

## Usage Example

```bash
claude /crud-gen user '{"name":"string","email":"string","age":"number"}'
```

## Generated Files

- `src/models/{entity}.ts`
- `src/api/{entity}.ts`
- `src/components/{Entity}List.tsx`
- `src/components/{Entity}Form.tsx`
- `tests/api/{entity}.test.ts`
```

### 2. API Endpoint Generator

`.claude/patterns/api-endpoint.md`:

```markdown
---
name: api-endpoint
description: Generate RESTful API endpoint
args:
  - name: resource
    description: Resource name
    required: true
  - name: method
    description: HTTP method
    choices: [GET, POST, PUT, DELETE, PATCH]
    required: true
---

# API Endpoint Generator

Generate API endpoints conforming to RESTful standards.

## Generated Content

1. **Route Handler**
   - Parameter validation
   - Business logic
   - Error handling
   - Response formatting

2. **Request/Response Types**
   - TypeScript interfaces
   - Validation Schema

3. **API Documentation**
   - OpenAPI specification
   - Usage examples

4. **Tests**
   - Unit tests
   - Integration tests

## Template

```typescript
/**
 * {{Method}} {{Path}}
 * @description {{Description}}
 */
export async function {{handlerName}}(
  req: Request,
  res: Response
) {
  try {
    // Validation
    const validated = validate{{Resource}}Input(req.body);

    // Business logic
    const result = await {{service}}.{{method}}(validated);

    // Response
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
}
```
```

### 3. React Component Generator

`.claude/patterns/react-component.md`:

```markdown
---
name: react-component
description: Generate React component
args:
  - name: name
    description: Component name
    required: true
  - name: type
    description: Component type
    choices: [functional, class, hook]
    default: functional
---

# React Component Generator

Generate React components conforming to team standards.

## Component Structure

```typescript
// 1. Imports
import React from 'react';
import styles from './{{Name}}.module.css';

// 2. Type definitions
interface I{{Name}}Props {
  // Props
}

// 3. Component
export function {{Name}}(props: I{{Name}}Props) {
  // Hooks

  // Event handlers

  // Render
  return (
    <div className={styles.container}>
      {/* Content */}
    </div>
  );
}
```

## Also Generates

- Component file: `{{Name}}.tsx`
- Style file: `{{Name}}.module.css`
- Test file: `{{Name}}.test.tsx`
- Storybook: `{{Name}}.stories.tsx`
```

## Testing Patterns

### 1. Test Suite Generator

`.claude/patterns/test-suite.md`:

```markdown
---
name: test-suite
description: Generate complete test suite
args:
  - name: target
    description: Test target
    required: true
---

# Test Suite Generator

Generate comprehensive test suites for specified code.

## Test Types

1. **Unit Tests**
   - Function-level tests
   - Boundary conditions
   - Error handling

2. **Integration Tests**
   - Module interaction
   - API calls
   - Database operations

3. **E2E Tests**
   - User flows
   - Critical paths

## Test Structure

```typescript
describe('{{Module}}', () => {
  // Setup
  beforeEach(() => {});
  afterEach(() => {});

  // Feature tests
  describe('{{Feature}}', () => {
    it('should work in normal case', () => {});
    it('should handle edge cases', () => {});
    it('should handle errors', () => {});
  });
});
```

## Coverage Targets

- Statement coverage: 80%+
- Branch coverage: 75%+
- Function coverage: 90%+
```

### 2. Mock Data Generator

`.claude/patterns/mock-data.md`:

```markdown
---
name: mock-data
description: Generate mock data for testing
args:
  - name: schema
    description: Data Schema
    required: true
  - name: count
    description: Number to generate
    default: 10
---

# Mock Data Generator

Generate mock data for testing based on a Schema.

## Supported Types

- string: Random string
- number: Random number
- boolean: Random boolean
- date: Random date
- email: Random email
- url: Random URL
- uuid: UUID

## Example

```typescript
// Schema
interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

// Generated Mock data
export const mockUsers: IUser[] = [
  {
    id: 'uuid-1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    createdAt: new Date('2024-01-01')
  },
  // ... more data
];
```
```

## Refactoring Patterns

### 1. Extract Function

`.claude/patterns/extract-function.md`:

```markdown
---
name: extract-function
description: Extract function refactoring
args:
  - name: file
    description: Target file
    required: true
  - name: selection
    description: Code range to extract
    required: false
---

# Extract Function Refactoring

Extract code snippets into standalone functions.

## Refactoring Steps

1. Identify extractable code blocks
2. Analyze dependencies and parameters
3. Generate function signature
4. Extract code
5. Replace original code with function call
6. Run tests for verification

## Extraction Principles

- Single responsibility per function
- No more than 3 parameters
- Clear function names describing functionality
- Avoid side effects

## Example

```typescript
// Before refactoring
function processUser(user: User) {
  // Validate email
  if (!user.email.includes('@')) {
    throw new Error('Invalid email');
  }

  // Format name
  const formattedName = user.name.trim().toLowerCase();

  // Save
  await db.save({ ...user, name: formattedName });
}

// After refactoring
function processUser(user: User) {
  validateEmail(user.email);
  const formattedName = formatName(user.name);
  await saveUser({ ...user, name: formattedName });
}

function validateEmail(email: string) {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
}

function formatName(name: string): string {
  return name.trim().toLowerCase();
}

function saveUser(user: User) {
  return db.save(user);
}
```
```

### 2. Extract Component

`.claude/patterns/extract-component.md`:

```markdown
---
name: extract-component
description: Extract React component
args:
  - name: file
    description: Target file
    required: true
---

# Extract Component Refactoring

Extract JSX snippets into standalone components.

## When to Extract

- JSX exceeds 50 lines
- Logic is reusable
- Independent responsibility
- Improves readability

## Refactoring Steps

1. Identify extractable JSX
2. Analyze Props requirements
3. Create new component file
4. Move code and styles
5. Replace with component call
6. Update tests

## Example

```typescript
// Before refactoring
function UserProfile() {
  return (
    <div>
      <div className="avatar">
        <img src={user.avatar} />
        <span>{user.name}</span>
      </div>
      {/* More content */}
    </div>
  );
}

// After refactoring
function UserProfile() {
  return (
    <div>
      <UserAvatar user={user} />
      {/* More content */}
    </div>
  );
}

function UserAvatar({ user }: { user: User }) {
  return (
    <div className="avatar">
      <img src={user.avatar} />
      <span>{user.name}</span>
    </div>
  );
}
```
```

## Documentation Patterns

### 1. API Documentation Generator

`.claude/patterns/api-docs.md`:

```markdown
---
name: api-docs
description: Generate API documentation
args:
  - name: format
    description: Documentation format
    choices: [openapi, markdown, postman]
    default: openapi
---

# API Documentation Generator

Scan code and generate API documentation.

## Generated Content

1. **Endpoint List**
   - Path and method
   - Description
   - Parameters
   - Responses

2. **Data Models**
   - Schema definitions
   - Example data

3. **Authentication**
   - Authentication method
   - Permission requirements

4. **Error Codes**
   - Error list
   - Error descriptions

## OpenAPI Format

```yaml
openapi: 3.0.0
info:
  title: API Documentation
  version: 1.0.0
paths:
  /api/users:
    get:
      summary: Get user list
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
```
```

### 2. README Generator

`.claude/patterns/readme-gen.md`:

```markdown
---
name: readme-gen
description: Generate project README
---

# README Generator

Analyze project and generate complete README documentation.

## Document Structure

1. **Project Overview**
   - Project name
   - Brief description
   - Key features

2. **Quick Start**
   - Installation steps
   - Basic usage
   - Example code

3. **Documentation**
   - API documentation
   - Configuration guide
   - FAQ

4. **Development**
   - Development environment setup
   - Build and test
   - Contributing guide

5. **License**

## Template

```markdown
# {{ProjectName}}

{{Description}}

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install {{package-name}}
\`\`\`

## Usage

\`\`\`typescript
import { feature } from '{{package-name}}';

feature();
\`\`\`

## Documentation

For detailed documentation, visit [Documentation Site](https://docs.example.com)

## Development

\`\`\`bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
\`\`\`

## License

MIT
```
```

## Database Patterns

### 1. Migration Generator

`.claude/patterns/db-migration.md`:

```markdown
---
name: db-migration
description: Generate database migration
args:
  - name: action
    description: Migration action
    choices: [create_table, add_column, remove_column, modify_column]
    required: true
  - name: table
    description: Table name
    required: true
---

# Database Migration Generator

Generate database migration scripts.

## Supported Operations

1. **Create Table**
2. **Add Column**
3. **Remove Column**
4. **Modify Column**
5. **Add Index**
6. **Add Foreign Key**

## Example

```typescript
// Create table
export async function up(knex: Knex) {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('users');
}
```

## Best Practices

- Migrations must be reversible
- Include rollback logic
- Test migrations
- Backup data
```

### 2. Seed Data Generator

`.claude/patterns/db-seed.md`:

```markdown
---
name: db-seed
description: Generate database seed data
args:
  - name: table
    description: Table name
    required: true
---

# Seed Data Generator

Generate database initialization data.

## Generated Content

1. **Test Data**
   - Development environment
   - Testing environment

2. **Base Data**
   - Configuration data
   - Dictionary data

## Example

```typescript
export async function seed(knex: Knex) {
  // Clear table
  await knex('users').del();

  // Insert data
  await knex('users').insert([
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin'
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'User',
      role: 'user'
    }
  ]);
}
```
```

## Deployment Patterns

### 1. Deploy Script Generator

`.claude/patterns/deploy-script.md`:

```markdown
---
name: deploy-script
description: Generate deployment script
args:
  - name: environment
    description: Deployment environment
    choices: [staging, production]
    required: true
---

# Deploy Script Generator

Generate automated deployment scripts.

## Deployment Flow

1. **Pre-checks**
   - Environment verification
   - Dependency check
   - Permission verification

2. **Build**
   - Install dependencies
   - Run build
   - Run tests

3. **Deploy**
   - Backup current version
   - Upload new version
   - Restart service

4. **Verification**
   - Health check
   - Smoke tests

5. **Rollback** (if failed)
   - Restore backup
   - Restart service

## Example

```bash
#!/bin/bash
set -e

ENV=$1

echo "Deploying to $ENV environment..."

# Pre-checks
./scripts/pre-deploy-check.sh $ENV

# Build
npm ci
npm run build
npm test

# Deploy
./scripts/deploy.sh $ENV

# Verify
./scripts/health-check.sh $ENV

echo "Deployment complete"
```
```

## Pattern Library Management

### Adding New Patterns

```bash
# 1. Create pattern file
vim .claude/patterns/new-pattern.md

# 2. Test pattern
claude /new-pattern --test

# 3. Document
vim .claude/patterns/README.md

# 4. Commit
git add .claude/patterns/
git commit -m "feat: add new pattern"
```

### Pattern Version Control

```markdown
# Pattern Changelog

## v1.1.0 - 2024-01-15

### Added
- crud-generator: Support for relationships
- api-endpoint: Support for pagination

### Improved
- test-suite: Optimized test structure
- mock-data: Support for more data types

### Fixed
- extract-function: Fixed parameter identification issue
```

### Pattern Usage Statistics

```bash
# View pattern usage
claude --pattern-stats

# Output
Pattern Usage Statistics:
  crud-gen: 45 times
  api-endpoint: 32 times
  test-suite: 28 times
  react-component: 25 times
```

## Best Practices

### 1. Pattern Naming

- Use verb-noun format
- Clearly describe functionality
- Avoid abbreviations

### 2. Pattern Documentation

- Include usage examples
- Explain applicable scenarios
- List注意事项

### 3. Pattern Testing

- Verify across multiple projects
- Collect user feedback
- Continuously improve

### 4. Pattern Sharing

- Include in version control
- Promote within team
- Regularly review and update

## Next Steps

- Check out the [Config Snippets](./config-snippets.md)
- Learn about [Hooks Recipes](./hooks-recipes.md)
- Explore the [Team Rules Library](./team-rules.md)
