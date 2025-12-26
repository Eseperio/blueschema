---
layout: default
title: Entity Schema
---

# Entity Schema

The **Entity** schema defines data models in your application. Entities represent database tables and are the fundamental building blocks of your application's data structure. Each entity contains fields, relationships, and metadata that describe how data is stored and connected.

## Purpose

Entities provide a **shared understanding** of your data structure for both AI and humans:

- **For AI:** Precise specifications for generating database migrations, ORM models, and data access code
- **For Humans:** Clear documentation of data structure, relationships, and constraints
- **For Both:** A single source of truth that eliminates ambiguity

## Properties

### `name` (required)
- **Type:** string
- **Description:** Entity name in PascalCase format

The entity name should use PascalCase (e.g., `User`, `BlogPost`, `OrderItem`). This becomes the class name in generated code.

**Example:**
```json
"name": "User"
```

### `tableName` (required)
- **Type:** string
- **Description:** Database table name in snake_case format

The actual database table name, typically in snake_case (e.g., `users`, `blog_posts`, `order_items`).

**Example:**
```json
"tableName": "users"
```

### `fields` (required)
- **Type:** array of [Field](/blueschema/schemas/field) objects
- **Description:** List of entity fields (columns)

Define all columns for this table. At minimum, you should include a primary key field.

**Example:**
```json
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
  },
  {
    "name": "is_active",
    "type": "boolean",
    "default": true
  }
]
```

### `relations` (optional)
- **Type:** array of [Relation](/blueschema/schemas/relation) objects
- **Description:** Relationships with other entities

Define how this entity connects to others (hasOne, hasMany, belongsTo relationships).

**Example:**
```json
"relations": [
  {
    "type": "hasMany",
    "targetEntity": "Post",
    "sourceField": "id",
    "targetField": "author_id",
    "onDelete": "CASCADE"
  }
]
```

### `timestamps` (optional)
- **Type:** boolean
- **Default:** true
- **Description:** Whether to include created_at and updated_at timestamp fields

When true, automatically adds `created_at` and `updated_at` fields that track record creation and modification times.

**Example:**
```json
"timestamps": true
```

### `softDeletes` (optional)
- **Type:** boolean
- **Default:** false
- **Description:** Whether to support soft deletion with deleted_at field

When true, adds a `deleted_at` field. Instead of permanently deleting records, they're marked as deleted by setting this timestamp.

**Example:**
```json
"softDeletes": true
```

## Complete Examples

### Simple Entity: Category

```json
{
  "name": "Category",
  "tableName": "categories",
  "fields": [
    {
      "name": "id",
      "type": "uuid",
      "primaryKey": true,
      "required": true
    },
    {
      "name": "name",
      "type": "string",
      "length": 100,
      "unique": true,
      "required": true
    },
    {
      "name": "slug",
      "type": "string",
      "length": 100,
      "unique": true,
      "required": true
    },
    {
      "name": "description",
      "type": "text"
    }
  ],
  "relations": [
    {
      "type": "hasMany",
      "targetEntity": "Post",
      "sourceField": "id",
      "targetField": "category_id"
    }
  ],
  "timestamps": true,
  "softDeletes": false
}
```

**Purpose:** A category entity for organizing content. It has a unique name and slug, and can have many posts.

### Complex Entity: User

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
      "name": "username",
      "type": "string",
      "length": 100,
      "unique": true,
      "required": true
    },
    {
      "name": "password_hash",
      "type": "string",
      "length": 255,
      "required": true
    },
    {
      "name": "first_name",
      "type": "string",
      "length": 100
    },
    {
      "name": "last_name",
      "type": "string",
      "length": 100
    },
    {
      "name": "bio",
      "type": "text"
    },
    {
      "name": "is_active",
      "type": "boolean",
      "default": true
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
    },
    {
      "type": "hasMany",
      "targetEntity": "Comment",
      "sourceField": "id",
      "targetField": "user_id",
      "onDelete": "CASCADE"
    }
  ],
  "timestamps": true,
  "softDeletes": true
}
```

**Purpose:** A user entity with authentication fields, profile information, and relationships to posts and comments. Uses soft deletes to retain user data history.

### Entity with Foreign Keys: Post

```json
{
  "name": "Post",
  "tableName": "posts",
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
      "length": 255,
      "required": true,
      "index": true
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
      "required": true,
      "index": true,
      "foreignKey": {
        "targetEntity": "User",
        "targetField": "id",
        "onDelete": "CASCADE"
      }
    },
    {
      "name": "category_id",
      "type": "uuid",
      "index": true,
      "foreignKey": {
        "targetEntity": "Category",
        "targetField": "id",
        "onDelete": "SET NULL"
      }
    }
  ],
  "relations": [
    {
      "type": "hasOne",
      "targetEntity": "User",
      "sourceField": "author_id",
      "targetField": "id"
    },
    {
      "type": "hasOne",
      "targetEntity": "Category",
      "sourceField": "category_id",
      "targetField": "id"
    },
    {
      "type": "hasMany",
      "targetEntity": "Comment",
      "sourceField": "id",
      "targetField": "post_id",
      "onDelete": "CASCADE"
    }
  ],
  "timestamps": true,
  "softDeletes": true
}
```

**Purpose:** A blog post entity with foreign key relationships to User (author) and Category. Demonstrates different deletion behaviors: CASCADE for author (if user deleted, delete posts) and SET NULL for category (if category deleted, keep post but remove category reference).

## Common Patterns

### Audit Fields with Timestamps

```json
{
  "name": "AuditableEntity",
  "tableName": "auditable_entities",
  "fields": [
    {
      "name": "id",
      "type": "uuid",
      "primaryKey": true,
      "required": true
    }
    // ... other fields
  ],
  "timestamps": true,  // Adds created_at and updated_at
  "softDeletes": false
}
```

**Use when:** You need to track when records are created and modified.

### Soft Deletes for Data Retention

```json
{
  "name": "ImportantRecord",
  "tableName": "important_records",
  "fields": [
    {
      "name": "id",
      "type": "uuid",
      "primaryKey": true,
      "required": true
    }
    // ... other fields
  ],
  "timestamps": true,
  "softDeletes": true  // Adds deleted_at field
}
```

**Use when:** You want to "delete" records without actually removing them from the database, for audit trails or recovery.

### Lookup/Reference Tables

```json
{
  "name": "Status",
  "tableName": "statuses",
  "fields": [
    {
      "name": "id",
      "type": "integer",
      "primaryKey": true,
      "required": true
    },
    {
      "name": "code",
      "type": "string",
      "length": 50,
      "unique": true,
      "required": true
    },
    {
      "name": "label",
      "type": "string",
      "length": 100,
      "required": true
    }
  ],
  "timestamps": false,  // Static reference data doesn't need timestamps
  "softDeletes": false
}
```

**Use when:** Creating static reference data that rarely changes (statuses, types, categories).

## Best Practices

### Always Include a Primary Key

Every entity must have a primary key field:

```json
{
  "name": "id",
  "type": "uuid",  // or "integer" with auto-increment
  "primaryKey": true,
  "required": true
}
```

### Use Consistent Naming Conventions

- **Entity names:** PascalCase (`User`, `BlogPost`)
- **Table names:** snake_case (`users`, `blog_posts`)
- **Field names:** snake_case (`first_name`, `created_at`)

### Index Foreign Keys

Always add indexes to foreign key fields for better query performance:

```json
{
  "name": "author_id",
  "type": "uuid",
  "required": true,
  "index": true,  // ✅ Indexed for performance
  "foreignKey": {
    "targetEntity": "User",
    "targetField": "id"
  }
}
```

### Choose Appropriate Field Types

Match field types to your data:

- **UUIDs** for distributed systems and security
- **Integers** for simpler systems and auto-incrementing IDs
- **Text** for large content, **String** for constrained text
- **Boolean** for yes/no flags
- **DateTime** for timestamps

### Use Soft Deletes Wisely

Enable soft deletes for entities where you need:
- Audit trails
- Data recovery capabilities
- Historical records

Don't use soft deletes for:
- Reference data that should be truly deleted
- High-volume data where performance matters
- Simple applications without compliance requirements

### Define Relationships Carefully

Consider the impact of deletion:

```json
"foreignKey": {
  "targetEntity": "User",
  "targetField": "id",
  "onDelete": "CASCADE"  // ⚠️ Deleting user deletes all related records
}
```

- **CASCADE:** Delete related records (use for true dependencies)
- **SET NULL:** Keep record but remove reference (use for optional relationships)
- **RESTRICT:** Prevent deletion if related records exist (use for data integrity)

## Real-World Example: E-Commerce

```json
{
  "name": "Order",
  "tableName": "orders",
  "fields": [
    {
      "name": "id",
      "type": "uuid",
      "primaryKey": true,
      "required": true
    },
    {
      "name": "order_number",
      "type": "string",
      "length": 50,
      "unique": true,
      "required": true,
      "index": true
    },
    {
      "name": "customer_id",
      "type": "uuid",
      "required": true,
      "index": true,
      "foreignKey": {
        "targetEntity": "Customer",
        "targetField": "id",
        "onDelete": "RESTRICT"  // Can't delete customer with orders
      }
    },
    {
      "name": "total_amount",
      "type": "decimal",
      "precision": 10,
      "scale": 2,
      "required": true
    },
    {
      "name": "status",
      "type": "string",
      "length": 50,
      "required": true,
      "default": "pending"
    },
    {
      "name": "notes",
      "type": "text"
    }
  ],
  "relations": [
    {
      "type": "hasOne",
      "targetEntity": "Customer",
      "sourceField": "customer_id",
      "targetField": "id"
    },
    {
      "type": "hasMany",
      "targetEntity": "OrderItem",
      "sourceField": "id",
      "targetField": "order_id",
      "onDelete": "CASCADE"
    }
  ],
  "timestamps": true,
  "softDeletes": false  // Orders should never be truly deleted
}
```

## Related Schemas

- [Field](/blueschema/schemas/field) - Define entity properties
- [Relation](/blueschema/schemas/relation) - Define entity relationships
- [Validation](/blueschema/schemas/validation) - Add validation rules
- [Application](/blueschema/schemas/application) - Root schema containing entities

## Next Steps

- 📖 Learn about [Fields](/blueschema/schemas/field) to define entity properties
- 🔗 Explore [Relations](/blueschema/schemas/relation) to connect entities
- 🎯 See the [Blog Example](/blueschema/examples/blog-app) for complete entity definitions

---

**Remember:** Entities are the foundation of your data model. Well-defined entities create a shared understanding that both AI and humans can trust.
