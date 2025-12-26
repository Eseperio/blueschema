---
layout: default
title: Relation Schema
---

# Relation Schema

The **Relation** schema models relationships between entities, defining how data connects across your application.

## Purpose

- **For AI:** Precise specifications for generating ORM relationships and JOIN queries
- **For Humans:** Clear documentation of how entities connect
- **For Both:** Unambiguous relationship contracts

## Properties

### `type` (required)
- **Type:** string
- **Enum:** `"hasOne"`, `"hasMany"`, `"belongsTo"`
- **Description:** Type of relationship

**Relationship Types:**

| Type | Description | Example |
|------|-------------|---------|
| `hasOne` | One-to-one | User hasOne Profile |
| `hasMany` | One-to-many | User hasMany Posts |
| `belongsTo` | Many-to-one (inverse) | Post belongsTo User |

### `targetEntity` (required)
- **Type:** string
- **Description:** Name of the related entity

### `sourceField` (required)
- **Type:** string
- **Description:** Field in this entity used for the relationship

### `targetField` (required)
- **Type:** string
- **Description:** Field in the target entity

### `onDelete` (optional)
- **Type:** string
- **Enum:** `"CASCADE"`, `"SET NULL"`, `"RESTRICT"`, `"NO ACTION"`
- **Description:** Action when related record is deleted

## Examples

### HasMany Relationship

```json
{
  "type": "hasMany",
  "targetEntity": "Post",
  "sourceField": "id",
  "targetField": "author_id",
  "onDelete": "CASCADE"
}
```

User has many Posts. Deleting user deletes all their posts.

### HasOne Relationship

```json
{
  "type": "hasOne",
  "targetEntity": "Profile",
  "sourceField": "id",
  "targetField": "user_id",
  "onDelete": "CASCADE"
}
```

User has one Profile. Deleting user deletes their profile.

### BelongsTo Relationship

```json
{
  "type": "hasOne",
  "targetEntity": "User",
  "sourceField": "author_id",
  "targetField": "id"
}
```

Post belongs to User (references author).

## Deletion Behaviors

- **CASCADE:** Delete related records when parent is deleted
- **SET NULL:** Keep related records but set foreign key to NULL
- **RESTRICT:** Prevent deletion if related records exist
- **NO ACTION:** Database-level default behavior

## Related Schemas

- [Entity](/blueschema/schemas/entity) - Contains relations
- [Field](/blueschema/schemas/field) - Foreign key fields
