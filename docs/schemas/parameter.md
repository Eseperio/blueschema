---
layout: default
title: Parameter Schema
---

# Parameter Schema

The **Parameter** schema defines inputs for actions, including their location, type, validation rules, and documentation.

## Purpose

- **For AI:** Exact specifications for generating parameter validation and handling code
- **For Humans:** Clear API documentation
- **For Both:** Unambiguous input contracts

## Properties

### `name` (required)
- **Type:** string
- **Description:** Parameter name

### `in` (required)
- **Type:** string
- **Enum:** `"query"`, `"path"`, `"header"`, `"cookie"`
- **Description:** Where the parameter is located

### `description` (optional)
- **Type:** string
- **Description:** Human-readable description

### `required` (optional)
- **Type:** boolean
- **Default:** false
- **Description:** Whether the parameter is required

### `schema` (optional)
- **Type:** JSON Schema object
- **Description:** Validation schema for the parameter value

## Examples

### Path Parameter

```json
{
  "name": "id",
  "in": "path",
  "description": "Resource UUID",
  "required": true,
  "schema": {
    "type": "string",
    "format": "uuid"
  }
}
```

### Query Parameter with Validation

```json
{
  "name": "email",
  "in": "query",
  "description": "User email address",
  "required": true,
  "schema": {
    "type": "string",
    "format": "email",
    "maxLength": 255
  }
}
```

### Optional Query Parameter with Default

```json
{
  "name": "page",
  "in": "query",
  "description": "Page number for pagination",
  "required": false,
  "schema": {
    "type": "integer",
    "minimum": 1,
    "default": 1
  }
}
```

### Header Parameter

```json
{
  "name": "Authorization",
  "in": "header",
  "description": "Bearer token for authentication",
  "required": true,
  "schema": {
    "type": "string",
    "pattern": "^Bearer .+"
  }
}
```

## Parameter Locations

- **path:** Part of the URL path (`/posts/{id}`)
- **query:** Query string (`?page=1&limit=10`)
- **header:** HTTP headers (`Authorization: Bearer token`)
- **cookie:** Browser cookies

## Validation with JSON Schema

Use standard JSON Schema validation:

```json
{
  "schema": {
    "type": "string",
    "minLength": 8,
    "maxLength": 100,
    "pattern": "^[a-zA-Z0-9]+$"
  }
}
```

## Related Schemas

- [Action](/blueschema/schemas/action) - Contains parameters
