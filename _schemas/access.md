---
layout: default
title: Access Schema
---

# Access Schema

The **Access** schema specifies access requirements for individual actions using roles, permissions, or custom authorization logic.

## Purpose

- **For AI:** Authorization specifications for generating access control code
- **For Humans:** Clear documentation of who can access what
- **For Both:** Unambiguous security requirements

## Properties

Either `role`, `permissions`, or `prompt` must be specified.

### `role` (optional)
- **Type:** string
- **Description:** Required role name

User must have this role to access the action.

### `permissions` (optional)
- **Type:** array of strings
- **Description:** Required permissions

User must have ALL listed permissions.

### `prompt` (optional)
- **Type:** string
- **Description:** Custom authorization logic as AI prompt

For complex authorization that can't be expressed with simple roles/permissions.

## Examples

### Role-Based Access

```json
{
  "role": "admin"
}
```

Only admins can access this action.

### Permission-Based Access

```json
{
  "permissions": ["posts:create", "posts:publish"]
}
```

User must have both permissions.

### Custom Authorization Logic

```json
{
  "prompt": "User must be authenticated and either the post author or have admin role. Check post.author_id matches user.id or user.role === 'admin'"
}
```

Complex logic that AI will generate as custom authorization code.

### Multiple Access Rules (OR Logic)

```json
[
  {
    "role": "admin"
  },
  {
    "permissions": ["posts:delete:own"],
    "prompt": "Additionally verify user owns the post"
  }
]
```

Multiple access objects create OR conditions.

## Best Practices

### Use Roles for Simple Cases

```json
{ "role": "admin" }
```

### Use Permissions for Fine-Grained Control

```json
{ "permissions": ["posts:update", "posts:publish"] }
```

### Use Prompts for Complex Logic

```json
{
  "prompt": "User must own the resource or be admin. Check resource.user_id === user.id || user.role === 'admin'"
}
```

## Related Schemas

- [Action](/blueschema/schemas/action) - Contains access rules
- [AccessControl](/blueschema/schemas/accessControl) - Application-wide roles
- [Permission](/blueschema/schemas/permission) - Permission definitions
