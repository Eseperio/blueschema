---
layout: default
title: Application Schema
---

# Application Schema

The **Application** schema is the root of every BlueSchema definition. It serves as the entry point that ties together all components of your application, providing a complete, structured description that both AI and humans can understand.

## Purpose

The Application schema creates a **unified context** for your entire application. It acts as:

- **The single source of truth** for your application structure
- **A complete manifest** of all entities, actions, services, and configuration
- **The foundation** for AI-powered code generation
- **Living documentation** that stays in sync with your codebase

## Properties

### `id` (required)
- **Type:** string
- **Description:** Unique identifier for the application

A unique ID helps distinguish between different applications and versions. Use a consistent naming scheme.

**Example:**
```json
"id": "blog-app-001"
```

### `name` (required)
- **Type:** string (minimum length: 1)
- **Description:** Human-readable application name

The display name of your application.

**Example:**
```json
"name": "Blog Application"
```

### `version` (required)
- **Type:** string
- **Description:** Application version following semantic versioning

Track your application's evolution. Follow [Semantic Versioning](https://semver.org/): MAJOR.MINOR.PATCH.

**Example:**
```json
"version": "1.0.0"
```

### `description` (optional)
- **Type:** string
- **Description:** Brief description of what the application does

Explain your application's purpose in one or two sentences. This helps both humans and AI understand the context.

**Example:**
```json
"description": "A complete blog application demonstrating all BlueSchema features"
```

### `license` (optional)
- **Type:** string
- **Description:** Software license identifier

Specify the license under which your application is distributed.

**Example:**
```json
"license": "MIT"
```

### `entities` (required)
- **Type:** array of [Entity](/blueschema/schemas/entity) objects
- **Description:** All data models in the application
- **Minimum items:** 1
- **Unique items:** Yes

Define every data model your application uses. Entities represent database tables and the core data structures of your application.

**Example:**
```json
"entities": [
  {
    "name": "User",
    "tableName": "users",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "primaryKey": true,
        "required": true
      },
      {
        "name": "email",
        "type": "string",
        "length": 255,
        "unique": true,
        "required": true
      }
    ],
    "timestamps": true
  }
]
```

### `actions` (required)
- **Type:** array of [Action](/blueschema/schemas/action) or [Group](/blueschema/schemas/group) objects
- **Description:** All operations and endpoints in the application
- **Minimum items:** 1

Define every operation your application can perform. Actions can be standalone or organized into groups. Each action's description serves as an AI prompt for code generation.

**Example:**
```json
"actions": [
  {
    "routeSuffix": "/auth",
    "actions": [
      {
        "name": "login",
        "route": "/login",
        "description": "Authenticate a user with email and password. Verify the password hash matches. Generate and return a JWT token.",
        "parameters": [
          {
            "name": "email",
            "in": "query",
            "required": true,
            "schema": { "type": "string", "format": "email" }
          }
        ],
        "responseFormat": "json"
      }
    ]
  }
]
```

### `dataSources` (required)
- **Type:** array of [DataSource](/blueschema/schemas/dataSource) objects
- **Description:** Database and storage connections
- **Minimum items:** 1
- **Unique items:** Yes

Specify all data sources your application uses, including databases, caches, and storage services.

**Example:**
```json
"dataSources": [
  {
    "name": "mainDatabase",
    "type": "database",
    "config": {
      "driver": "postgresql",
      "host": "${DB_HOST}",
      "port": "${DB_PORT}",
      "database": "${DB_NAME}"
    }
  }
]
```

### `services` (optional)
- **Type:** array of [Service](/blueschema/schemas/service) objects
- **Description:** External services and integrations
- **Unique items:** Yes

Define services your application depends on. Each service's description acts as a prompt for AI to implement the service logic.

**Example:**
```json
"services": [
  {
    "title": "emailService",
    "description": "Send transactional emails including welcome emails and password resets. Use templates for consistent formatting. Handle delivery failures gracefully."
  }
]
```

### `environment` (optional)
- **Type:** array of [Environment](/blueschema/schemas/environment) objects
- **Description:** Required environment variables
- **Unique items:** Yes

List all environment variables your application needs, making configuration requirements explicit.

**Example:**
```json
"environment": [
  {
    "name": "JWT_SECRET",
    "description": "Secret key for signing JWT tokens",
    "required": true
  },
  {
    "name": "DB_PORT",
    "description": "Database port",
    "required": true,
    "default": "5432"
  }
]
```

### `accessControl` (optional)
- **Type:** [AccessControl](/blueschema/schemas/accessControl) object
- **Description:** Application-wide access control configuration

Define roles and permissions for your application's security model.

**Example:**
```json
"accessControl": {
  "roles": [
    {
      "name": "admin",
      "permissions": [
        "users:read",
        "users:create",
        "users:update",
        "users:delete",
        "posts:*"
      ]
    },
    {
      "name": "user",
      "permissions": [
        "posts:read",
        "posts:create:own"
      ]
    }
  ]
}
```

## Complete Example

Here's a minimal but complete BlueSchema application:

```json
{
  "id": "task-app-001",
  "name": "Task Manager",
  "version": "1.0.0",
  "description": "Simple task management application",
  "license": "MIT",
  "entities": [
    {
      "name": "Task",
      "tableName": "tasks",
      "fields": [
        {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "required": true
        },
        {
          "name": "title",
          "type": "string",
          "length": 200,
          "required": true
        },
        {
          "name": "completed",
          "type": "boolean",
          "default": false
        }
      ],
      "timestamps": true
    }
  ],
  "actions": [
    {
      "name": "listTasks",
      "route": "/tasks",
      "description": "Retrieve all tasks, with optional filtering by completion status",
      "responseFormat": "json"
    },
    {
      "name": "createTask",
      "route": "/tasks",
      "description": "Create a new task with a title. The task is initially marked as not completed.",
      "parameters": [
        {
          "name": "title",
          "in": "query",
          "required": true,
          "schema": {
            "type": "string",
            "minLength": 1,
            "maxLength": 200
          }
        }
      ],
      "responseFormat": "json"
    }
  ],
  "dataSources": [
    {
      "name": "mainDatabase",
      "type": "database",
      "config": {
        "driver": "postgresql",
        "host": "${DB_HOST}",
        "port": "${DB_PORT}",
        "database": "${DB_NAME}"
      }
    }
  ],
  "environment": [
    {
      "name": "DB_HOST",
      "description": "Database host address",
      "required": true
    },
    {
      "name": "DB_PORT",
      "description": "Database port",
      "required": true,
      "default": "5432"
    },
    {
      "name": "DB_NAME",
      "description": "Database name",
      "required": true
    }
  ]
}
```

## Best Practices

### Keep It Organized

Group related actions together using [Groups](/blueschema/schemas/group):

```json
"actions": [
  {
    "routeSuffix": "/auth",
    "actions": [/* authentication actions */]
  },
  {
    "routeSuffix": "/posts",
    "actions": [/* post management actions */]
  }
]
```

### Use Environment Variables

Never hardcode sensitive values. Always use environment variable references:

```json
"config": {
  "apiKey": "${API_KEY}",  // ✅ Good
  "apiKey": "sk-abc123"     // ❌ Bad
}
```

### Write Clear Descriptions

Action and service descriptions are AI prompts. Be specific and include implementation details:

```json
// ✅ Good - specific and actionable
"description": "Authenticate user by verifying email and password. Hash the password using bcrypt. Return a JWT token valid for 24 hours."

// ❌ Bad - vague and unclear
"description": "Login user"
```

### Define All Dependencies

Explicitly list services that actions use:

```json
{
  "name": "sendPasswordReset",
  "description": "Send password reset email with a secure token",
  "useServices": ["emailService", "tokenService"],  // ✅ Clear dependencies
  "responseFormat": "json"
}
```

### Document Everything

Use description fields liberally to create self-documenting schemas that both humans and AI can understand.

## Related Schemas

- [Entity](/blueschema/schemas/entity) - Define data models
- [Action](/blueschema/schemas/action) - Define operations
- [Group](/blueschema/schemas/group) - Organize actions
- [DataSource](/blueschema/schemas/dataSource) - Configure data storage
- [Service](/blueschema/schemas/service) - Define external services
- [AccessControl](/blueschema/schemas/accessControl) - Set up security

## Next Steps

- 📖 Learn about [Entities](/blueschema/schemas/entity) to define your data models
- 🎯 Explore the [Blog Example](/blueschema/examples/blog-app) to see a complete application
- 🏗️ Start building your own application with the [Getting Started Guide](/blueschema/getting-started)

---

**Remember:** The Application schema is your application's blueprint. It provides the shared context that makes AI-human collaboration possible.
