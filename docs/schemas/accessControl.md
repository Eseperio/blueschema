---
layout: default
title: Access Control Schema
---

# Access Control Schema

The **Access Control** schema defines the complete security model for your application with roles and permissions.

## Purpose

- **For AI:** Complete specification for generating authorization code
- **For Humans:** Clear documentation of security structure
- **For Both:** Unambiguous security contracts

## Properties

### `roles` (required)
- **Type:** array of role objects
- **Description:** All roles in the application

Each role has:
- `name` (required) - Role identifier
- `permissions` (required) - Array of permission strings

## Complete Example

```json
{
  "roles": [
    {
      "name": "admin",
      "permissions": [
        "users:read",
        "users:create",
        "users:update",
        "users:delete",
        "posts:*",
        "admin:access"
      ]
    },
    {
      "name": "author",
      "permissions": [
        "posts:read",
        "posts:create",
        "posts:update:own",
        "posts:delete:own"
      ]
    },
    {
      "name": "reader",
      "permissions": [
        "posts:read",
        "comments:read",
        "comments:create"
      ]
    }
  ]
}
```

## Permission Naming Convention

Use the pattern: `resource:action:scope`

- `posts:read` - Read any post
- `posts:create` - Create posts
- `posts:update:own` - Update own posts only
- `posts:delete:all` - Delete any post
- `posts:*` - All post permissions

## Related Schemas

- [Access](/blueschema/schemas/access) - Action-level access rules
- [Permission](/blueschema/schemas/permission) - Individual permissions
- [Application](/blueschema/schemas/application) - Contains access control
