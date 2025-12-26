---
layout: default
title: Field Schema
---

# Field Schema

The **Field** schema defines individual properties within an entity. Fields are the building blocks of your data model, specifying types, constraints, indexes, and relationships. Each field creates a column in the database table.

## Purpose

Fields provide **precise specifications** that both AI and humans understand:

- **For AI:** Exact database column definitions with types, constraints, and indexes
- **For Humans:** Clear documentation of what each property stores and its rules
- **For Both:** Unambiguous data contracts that eliminate confusion

## Properties

### `name` (required)
- **Type:** string
- **Description:** Field name in snake_case format

Use snake_case for field names (e.g., `first_name`, `created_at`, `author_id`). This is the actual database column name.

**Example:**
```json
"name": "email_address"
```

### `type` (required)
- **Type:** string
- **Enum:** Multiple types available
- **Description:** Data type of the field

**Available Types:**

| Type | Description | Use For |
|------|-------------|---------|
| `string` | Variable-length text | Names, titles, short text |
| `text` | Unlimited text | Long content, descriptions |
| `integer` | Whole numbers | Counts, IDs, quantities |
| `bigInteger` | Large whole numbers | Large counts, timestamps |
| `float` | Decimal numbers | Measurements, percentages |
| `decimal` | Precise decimal | Money, financial data |
| `boolean` | True/false | Flags, states |
| `date` | Date only | Birth dates, deadlines |
| `datetime` | Date and time | Events, schedules |
| `timestamp` | Unix timestamp | System timestamps |
| `uuid` | UUID identifier | Distributed IDs |
| `json` | JSON data | Complex structures |
| `binary` | Binary data | Files, images |

**Example:**
```json
"type": "string"
```

### `primaryKey` (optional)
- **Type:** boolean
- **Default:** false
- **Description:** Whether this field is the primary key

Mark exactly one field per entity as the primary key.

**Example:**
```json
{
  "name": "id",
  "type": "uuid",
  "primaryKey": true,
  "required": true
}
```

### `unique` (optional)
- **Type:** boolean
- **Default:** false
- **Description:** Whether the field value must be unique across all records

Use for fields that should never have duplicates like email addresses, usernames, slugs.

**Example:**
```json
{
  "name": "email",
  "type": "string",
  "unique": true
}
```

### `required` (optional)
- **Type:** boolean
- **Default:** false
- **Description:** Whether the field is required (NOT NULL)

Required fields cannot be null. Use for essential data.

**Example:**
```json
{
  "name": "title",
  "type": "string",
  "required": true
}
```

### `default` (optional)
- **Type:** string, number, boolean, or null
- **Description:** Default value for the field

The value used when no value is provided during record creation.

**Example:**
```json
{
  "name": "is_active",
  "type": "boolean",
  "default": true
}
```

### `length` (optional)
- **Type:** integer (minimum: 1)
- **Description:** Maximum length for string-based fields

Specify the maximum number of characters for string fields.

**Example:**
```json
{
  "name": "username",
  "type": "string",
  "length": 100
}
```

### `precision` (optional)
- **Type:** integer
- **Description:** Total number of digits for decimal fields

Used with decimal type to specify total digits.

**Example:**
```json
{
  "name": "price",
  "type": "decimal",
  "precision": 10,
  "scale": 2
}
```

### `scale` (optional)
- **Type:** integer
- **Description:** Number of decimal places for decimal fields

Used with decimal type to specify digits after the decimal point.

**Example:**
```json
{
  "name": "tax_rate",
  "type": "decimal",
  "precision": 5,
  "scale": 4
}
```

### `index` (optional)
- **Type:** boolean
- **Default:** false
- **Description:** Whether to create a database index on this field

Indexes improve query performance for fields frequently used in WHERE clauses, JOINs, or ORDER BY.

**Example:**
```json
{
  "name": "email",
  "type": "string",
  "index": true
}
```

### `foreignKey` (optional)
- **Type:** object
- **Description:** Foreign key reference to another entity

Defines a relationship to another entity's field.

**Properties:**

- `targetEntity` (required) - Name of the related entity
- `targetField` (required) - Name of the field in the related entity
- `onDelete` (optional) - Action on delete: `CASCADE`, `SET NULL`, `RESTRICT`, `NO ACTION`

**Example:**
```json
{
  "name": "author_id",
  "type": "uuid",
  "foreignKey": {
    "targetEntity": "User",
    "targetField": "id",
    "onDelete": "CASCADE"
  }
}
```

## Complete Examples

### Primary Key Field (UUID)

```json
{
  "name": "id",
  "type": "uuid",
  "primaryKey": true,
  "required": true
}
```

**Purpose:** Unique identifier using UUID format, ideal for distributed systems.

### Primary Key Field (Auto-increment Integer)

```json
{
  "name": "id",
  "type": "integer",
  "primaryKey": true,
  "required": true
}
```

**Purpose:** Traditional auto-incrementing ID, simpler for single-database systems.

### Unique Email Field

```json
{
  "name": "email",
  "type": "string",
  "length": 255,
  "unique": true,
  "required": true,
  "index": true
}
```

**Purpose:** Email address that must be unique and indexed for fast lookups.

### Optional Text Field

```json
{
  "name": "bio",
  "type": "text"
}
```

**Purpose:** Large text field that's optional (can be null).

### Boolean Flag with Default

```json
{
  "name": "is_active",
  "type": "boolean",
  "default": true
}
```

**Purpose:** Status flag that defaults to true if not specified.

### Foreign Key Field

```json
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
}
```

**Purpose:** Reference to User entity. When user is deleted, this record is also deleted (CASCADE).

### Decimal Money Field

```json
{
  "name": "price",
  "type": "decimal",
  "precision": 10,
  "scale": 2,
  "required": true
}
```

**Purpose:** Monetary value with 2 decimal places (e.g., $99.99). Total 10 digits, 2 after decimal.

### Slug Field

```json
{
  "name": "slug",
  "type": "string",
  "length": 255,
  "unique": true,
  "required": true,
  "index": true
}
```

**Purpose:** URL-friendly identifier that must be unique and indexed for routing.

### Timestamp with Default

```json
{
  "name": "published_at",
  "type": "datetime"
}
```

**Purpose:** Publication timestamp, nullable until published.

### JSON Data Field

```json
{
  "name": "metadata",
  "type": "json"
}
```

**Purpose:** Flexible JSON storage for complex, varying data structures.

## Field Type Selection Guide

### Use `string` for:
- Names (first_name, last_name)
- Titles and headlines
- Usernames
- Email addresses
- Short descriptions
- Codes and identifiers

### Use `text` for:
- Long descriptions
- Article content
- Comments
- Biographies
- Any unlimited-length text

### Use `integer` for:
- Counts (view_count, like_count)
- Small IDs
- Quantities
- Years

### Use `uuid` for:
- Primary keys in distributed systems
- Public identifiers
- Secure random IDs

### Use `decimal` for:
- Money and prices
- Financial calculations
- Any value requiring exact precision

### Use `float` for:
- Measurements
- Percentages
- Scientific calculations (where precision loss is acceptable)

### Use `boolean` for:
- Flags (is_active, is_published)
- Yes/no questions
- Feature toggles

### Use `datetime` for:
- Timestamps (created_at, updated_at)
- Scheduled times
- Event dates with times

### Use `date` for:
- Birth dates
- Deadlines
- Events without specific times

## Best Practices

### 1. Always Define a Primary Key

Every entity needs exactly one primary key:

```json
{
  "name": "id",
  "type": "uuid",
  "primaryKey": true,
  "required": true
}
```

### 2. Index Foreign Keys

Always index foreign key fields for join performance:

```json
{
  "name": "category_id",
  "type": "uuid",
  "index": true,  // ✅ Always index foreign keys
  "foreignKey": { /* ... */ }
}
```

### 3. Index Frequently Queried Fields

Add indexes to fields used in WHERE clauses:

```json
{
  "name": "email",
  "type": "string",
  "index": true  // ✅ Email is often used for lookups
}
```

### 4. Set Appropriate Field Lengths

Don't use excessive lengths:

```json
// ✅ Good
{
  "name": "username",
  "type": "string",
  "length": 100
}

// ❌ Bad - unnecessarily large
{
  "name": "username",
  "type": "string",
  "length": 10000
}
```

### 5. Use Decimal for Money

Never use float for financial data:

```json
// ✅ Good - exact precision
{
  "name": "price",
  "type": "decimal",
  "precision": 10,
  "scale": 2
}

// ❌ Bad - floating point errors
{
  "name": "price",
  "type": "float"
}
```

### 6. Choose Appropriate Deletion Behavior

Think carefully about `onDelete`:

```json
// CASCADE - Delete related records
{
  "foreignKey": {
    "targetEntity": "User",
    "targetField": "id",
    "onDelete": "CASCADE"  // Delete posts when user deleted
  }
}

// SET NULL - Keep record, remove reference
{
  "foreignKey": {
    "targetEntity": "Category",
    "targetField": "id",
    "onDelete": "SET NULL"  // Keep post, remove category
  }
}

// RESTRICT - Prevent deletion if referenced
{
  "foreignKey": {
    "targetEntity": "Order",
    "targetField": "id",
    "onDelete": "RESTRICT"  // Can't delete order if items exist
  }
}
```

### 7. Use Defaults Wisely

Provide defaults for optional fields with sensible defaults:

```json
{
  "name": "role",
  "type": "string",
  "default": "user"  // ✅ Sensible default
}

{
  "name": "email",
  "type": "string",
  "default": "none@example.com"  // ❌ Don't use fake defaults
}
```

## Common Patterns

### Standard ID Field

```json
{
  "name": "id",
  "type": "uuid",
  "primaryKey": true,
  "required": true
}
```

### Email Field

```json
{
  "name": "email",
  "type": "string",
  "length": 255,
  "unique": true,
  "required": true,
  "index": true
}
```

### Boolean Flag

```json
{
  "name": "is_active",
  "type": "boolean",
  "default": true
}
```

### Foreign Key Reference

```json
{
  "name": "user_id",
  "type": "uuid",
  "required": true,
  "index": true,
  "foreignKey": {
    "targetEntity": "User",
    "targetField": "id",
    "onDelete": "CASCADE"
  }
}
```

### Money Field

```json
{
  "name": "amount",
  "type": "decimal",
  "precision": 10,
  "scale": 2,
  "required": true
}
```

## Related Schemas

- [Entity](/blueschema/schemas/entity) - Contains fields
- [Relation](/blueschema/schemas/relation) - Alternative way to define relationships
- [Validation](/blueschema/schemas/validation) - Add validation rules to fields

## Next Steps

- 📖 Learn about [Relations](/blueschema/schemas/relation) for entity relationships
- 🔐 Explore [Validation](/blueschema/schemas/validation) for data quality rules
- 🎯 See the [Blog Example](/blueschema/examples/blog-app) for field examples

---

**Remember:** Fields are the foundation of your data model. Well-defined fields with appropriate types, constraints, and indexes create a database that both AI and humans can trust.
