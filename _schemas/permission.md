---
layout: default
title: Permission Schema
---

# Permission Schema

Permission identifier schema supporting built-in permissions (guest, logged, any) and custom permissions.

## Purpose

- **For AI:** Permission definitions for authorization code
- **For Humans:** Clear permission documentation
- **For Both:** Unambiguous permission identifiers

## Built-in Permissions

- `guest` - Unauthenticated users
- `logged` - Any authenticated user
- `any` - Anyone (authenticated or not)

## Custom Permissions

Use the pattern: `resource:action:scope`

Examples:
- `posts:read`
- `posts:create`
- `posts:update:own`
- `posts:delete:all`
- `users:*` (wildcard)

## Examples

```json
"permissions": ["guest"]
```

```json
"permissions": ["logged"]
```

```json
"permissions": ["posts:create", "posts:update:own"]
```

## Related Schemas

- [Access](/blueschema/schemas/access) - Uses permissions
- [AccessControl](/blueschema/schemas/accessControl) - Contains permissions
