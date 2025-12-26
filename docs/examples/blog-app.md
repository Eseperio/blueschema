---
layout: default
title: Blog Application Example
---

<div class="quick-nav">
  <h4>📚 Example Sections</h4>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#structure">Structure</a></li>
    <li><a href="#key-features-demonstrated">Key Features</a></li>
    <li><a href="#using-this-example">Using This Example</a></li>
  </ul>
</div>

# Blog Application Example

This comprehensive example demonstrates how BlueSchema creates a **shared context** that both AI and humans can understand. The blog application showcases all major features of BlueSchema in a real-world scenario.

## Overview

The blog application is a complete content management system featuring:

- 👥 **User Management** - Registration, authentication, and role-based access
- 📝 **Blog Posts** - Creation, editing, publishing workflow, and view tracking
- 💬 **Comments** - User comments with moderation system
- 🏷️ **Categories** - Content organization with categories
- 🛡️ **Security** - Role-based access control with three permission levels
- 🎨 **UI Views** - Predefined layouts for forms, tables, and dashboards

[View the complete source JSON →](https://github.com/Eseperio/blueschema/tree/main/docs/example-application.json)

## Why This Example Matters

This example demonstrates the **core value proposition** of BlueSchema: creating a shared understanding between AI and humans. Notice how:

1. **AI can parse it** - Every entity, relationship, and operation is machine-readable
2. **Humans can read it** - The structure is intuitive and descriptions are clear
3. **Both understand it** - There's no ambiguity about what the application does

This is the **only way** to ensure AI and humans share the same context when building applications.

## Application Structure

### The Big Picture

```
Blog Application (blog-app-001)
├── Entities (4)
│   ├── User - User accounts and authentication
│   ├── Post - Blog content
│   ├── Category - Content organization
│   └── Comment - User feedback
├── Actions (16 grouped in 5 categories)
│   ├── /auth - Authentication (register, login, logout)
│   ├── /posts - Post management (CRUD operations)
│   ├── /comments - Comment management
│   ├── /categories - Category management
│   └── /admin - Administration dashboard
├── Services (4)
│   ├── authService - Authentication & authorization
│   ├── emailService - Transactional emails
│   ├── slugService - URL-friendly slug generation
│   └── notificationService - User notifications
├── Data Sources (2)
│   ├── mainDatabase - PostgreSQL primary database
│   └── cacheStore - Redis caching layer
└── Access Control
    ├── reader - Basic user permissions
    ├── author - Content creation permissions
    └── admin - Full system access
```

## Entity Deep Dive

### User Entity

The User entity demonstrates key BlueSchema concepts:

```json
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
      "required": true,
      "index": true
    },
    {
      "name": "password_hash",
      "type": "string",
      "length": 255,
      "required": true
    },
    {
      "name": "role",
      "type": "string",
      "length": 50,
      "default": "reader"
    }
  ],
  "relations": [
    {
      "type": "hasMany",
      "targetEntity": "Post",
      "sourceField": "id",
      "targetField": "author_id",
      "onDelete": "CASCADE"
    }
  ],
  "timestamps": true,
  "softDeletes": true
}
```

**What AI understands:**
- Create a users table with UUID primary key
- Email must be unique and indexed
- User can have many posts
- Deleting a user cascades to their posts
- Track creation/update times
- Support soft deletion

**What humans understand:**
- Users are identified by UUID
- Email is the unique identifier for login
- Passwords are hashed (not stored plain text)
- Users have roles for access control
- User data is audited and recoverable

**Shared understanding:** Both know exactly what the User entity is and how it behaves.

### Post Entity with Relationships

The Post entity shows complex relationships:

```json
{
  "name": "Post",
  "tableName": "posts",
  "fields": [
    {
      "name": "id",
      "type": "uuid",
      "primaryKey": true
    },
    {
      "name": "title",
      "type": "string",
      "length": 255,
      "required": true
    },
    {
      "name": "content",
      "type": "text",
      "required": true
    },
    {
      "name": "published",
      "type": "boolean",
      "default": false
    },
    {
      "name": "author_id",
      "type": "uuid",
      "foreignKey": {
        "targetEntity": "User",
        "targetField": "id",
        "onDelete": "CASCADE"
      }
    },
    {
      "name": "category_id",
      "type": "uuid",
      "foreignKey": {
        "targetEntity": "Category",
        "targetField": "id",
        "onDelete": "SET NULL"
      }
    }
  ]
}
```

**Key Patterns:**

1. **Different Deletion Behaviors:**
   - `author_id` uses CASCADE: If user deleted, delete their posts
   - `category_id` uses SET NULL: If category deleted, keep post but remove category

2. **Publishing Workflow:**
   - Posts start unpublished (`published: false`)
   - Explicit action required to publish

3. **Rich Content:**
   - Title is constrained (255 chars)
   - Content is unlimited text

## Action Examples: AI Prompts in Practice

### Authentication Action

```json
{
  "name": "register",
  "route": "/register",
  "description": "Register a new user account with email and password. Hash the password securely before storing. Send a welcome email to the user.",
  "parameters": [
    {
      "name": "email",
      "in": "query",
      "required": true,
      "schema": {
        "type": "string",
        "format": "email"
      }
    },
    {
      "name": "password",
      "in": "query",
      "required": true,
      "schema": {
        "type": "string",
        "minLength": 8
      }
    }
  ],
  "useServices": ["emailService", "authService"],
  "responseFormat": "json"
}
```

**What makes this powerful:**

- **Description as prompt:** AI knows to hash password and send welcome email
- **Service dependencies:** AI knows it needs emailService and authService
- **Validation:** Password must be at least 8 characters
- **Clear contract:** Both AI and humans know exactly what happens

### Complex Business Logic Action

```json
{
  "name": "createPost",
  "route": "/",
  "description": "Create a new blog post. Generate a unique slug from the title. The post is initially unpublished. Validate that the title is unique and content is not empty.",
  "parameters": [
    {
      "name": "title",
      "in": "query",
      "required": true,
      "schema": {
        "type": "string",
        "minLength": 1,
        "maxLength": 255
      }
    }
  ],
  "useServices": ["slugService"],
  "access": [
    {
      "role": "author"
    }
  ]
}
```

**Business rules encoded:**

1. Slug generation is automatic (using slugService)
2. Title must be unique
3. Post starts unpublished
4. Only authors can create posts
5. Content validation required

**Shared understanding:** No ambiguity about the workflow.

### Authorization with Custom Logic

```json
{
  "name": "updatePost",
  "route": "/{id}",
  "description": "Update an existing blog post. Only the author or an admin can update the post. Update the slug if the title changes.",
  "access": [
    {
      "prompt": "User must be the post author or have admin role"
    }
  ]
}
```

**The power of prompts:** The access prompt tells AI to generate custom authorization logic checking ownership or admin role. Both AI and humans understand the security requirement.

## Service Definitions: Guiding AI Implementation

Services in BlueSchema use descriptions as implementation prompts:

```json
{
  "title": "slugService",
  "description": "Generate URL-friendly slugs from strings. Ensure uniqueness by appending numbers if needed. Convert to lowercase, replace spaces with hyphens, and remove special characters."
}
```

**What AI generates from this:**
- Function that converts strings to slugs
- Uniqueness checking logic
- Number appending for duplicates
- Specific character transformations

**What humans understand:**
- The service creates URL-safe identifiers
- Handles duplicate titles automatically
- Follows standard slug conventions

## Access Control: Clear Security Model

The access control system defines three roles:

### Reader Role
```json
{
  "name": "reader",
  "permissions": [
    "posts:read",
    "comments:read",
    "comments:create",
    "comments:delete:own"
  ]
}
```

Basic user can read content and manage their own comments.

### Author Role
```json
{
  "name": "author",
  "permissions": [
    "posts:create",
    "posts:update:own",
    "posts:publish:own",
    "comments:approve:own-post"
  ]
}
```

Content creators can manage their own posts and moderate comments on their posts.

### Admin Role
```json
{
  "name": "admin",
  "permissions": [
    "posts:*",
    "comments:*",
    "categories:*",
    "users:*",
    "admin:access"
  ]
}
```

Full access to all resources.

**Shared understanding:** Both AI and humans see the complete permission model. No surprises about who can do what.

## Views: UI Generation

Actions can include view definitions for UI generation:

```json
{
  "name": "dashboard",
  "view": {
    "rows": [
      {
        "columns": [
          {
            "width": 25,
            "components": [
              {
                "type": "cardWithIcon",
                "icon": "users",
                "description": "Total users count"
              }
            ]
          },
          {
            "width": 25,
            "components": [
              {
                "type": "cardWithIcon",
                "icon": "posts",
                "description": "Total posts count"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**Result:** A four-column layout with stat cards, automatically generated from the schema.

## Key Takeaways

### 1. Shared Context is Everything

BlueSchema creates a single source of truth that both AI and humans understand equally well. There's no room for misinterpretation.

### 2. Descriptions are Prompts

Every description field serves double duty:
- Documentation for humans
- Instructions for AI

### 3. Relationships Matter

Foreign keys, cascade behaviors, and relations create a data model that both AI and humans can trust.

### 4. Security is Explicit

Access control is never ambiguous. Both AI and humans know exactly who can do what.

### 5. Services Define Dependencies

Service definitions with descriptions as prompts ensure AI generates consistent, correct implementations.

## Running the Example

To use this example:

1. **Download the schema:** [example-application.json](https://github.com/Eseperio/blueschema/tree/main/docs/example-application.json)

2. **Validate:** Ensure it conforms to BlueSchema schemas

3. **Generate code:** Use a BlueSchema-compatible code generator:
   - Database migrations
   - API endpoints
   - Authentication logic
   - UI components

4. **Deploy:** Configure environment variables and deploy

## What Makes This Different

Traditional documentation:
- ❌ Humans read it, AI guesses from code
- ❌ Gets out of sync with code
- ❌ Ambiguous descriptions
- ❌ Missing details

BlueSchema:
- ✅ Both AI and humans read the same thing
- ✅ Schema IS the documentation
- ✅ Precise, unambiguous definitions
- ✅ Complete picture of the application

## Next Steps

- 📖 Study the [complete JSON file](https://github.com/Eseperio/blueschema/tree/main/docs/example-application.json)
- 🏗️ Use it as a template for your own application
- 🔍 Explore individual [schema documentation](/blueschema/schemas/)
- 🚀 Start building with the [Getting Started Guide](/blueschema/getting-started)

---

**This example proves:** BlueSchema is the only way to create a shared context that both AI and humans can understand. It's not just documentation—it's the foundation of collaborative AI development.
