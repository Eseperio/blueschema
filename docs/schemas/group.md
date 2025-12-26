---
layout: default
title: Group Schema
---

# Group Schema

The **Group** schema organizes related actions under a shared route prefix for better structure and organization.

## Purpose

- **For AI:** Specification for generating route groups and middleware
- **For Humans:** Logical organization of related endpoints
- **For Both:** Clear API structure

## Properties

### `routeSuffix` (required)
- **Type:** string
- **Description:** Route prefix for all actions in this group

The prefix is prepended to all action routes in the group.

**Example:**
```json
"routeSuffix": "/auth"
```

### `actions` (required)
- **Type:** array of [Action](/blueschema/schemas/action) objects
- **Description:** Actions in this group

## Complete Example

```json
{
  "routeSuffix": "/auth",
  "actions": [
    {
      "name": "register",
      "route": "/register",
      "description": "Register new user account"
    },
    {
      "name": "login",
      "route": "/login",
      "description": "Authenticate user and return token"
    },
    {
      "name": "logout",
      "route": "/logout",
      "description": "Invalidate user session"
    }
  ]
}
```

**Result:** Routes become `/auth/register`, `/auth/login`, `/auth/logout`

## Common Grouping Patterns

### Authentication Group

```json
{
  "routeSuffix": "/auth",
  "actions": [
    /* login, register, logout, reset password */
  ]
}
```

### Resource Group

```json
{
  "routeSuffix": "/posts",
  "actions": [
    /* list, get, create, update, delete */
  ]
}
```

### Admin Group

```json
{
  "routeSuffix": "/admin",
  "actions": [
    /* dashboard, users, settings */
  ]
}
```

## Best Practices

### 1. Use Logical Groupings

Group related functionality together:
- `/auth` - Authentication actions
- `/posts` - Post CRUD operations
- `/admin` - Administrative functions

### 2. Keep Route Prefixes Short

```json
// ✅ Good
"routeSuffix": "/auth"

// ❌ Bad - too long
"routeSuffix": "/api/v1/authentication"
```

### 3. Consistent Naming

Use lowercase, plural nouns for resources:
- `/users`
- `/posts`
- `/categories`

## Related Schemas

- [Action](/blueschema/schemas/action) - Actions within groups
- [Application](/blueschema/schemas/application) - Contains action groups
