---
layout: default
title: Card Component Schema
---

# Card Component Schema

Card component with optional header for displaying content blocks.

## Properties

### `type` (required)
- Value: `"card"`

### `header` (optional)
- **Type:** string
- **Description:** Card header text

### `description` (required)
- **Type:** string
- **Description:** What content to display in the card

## Examples

```json
{
  "type": "card",
  "header": "User Profile",
  "description": "Show user name, email, bio, and avatar"
}
```

```json
{
  "type": "card",
  "description": "Login form with email and password fields"
}
```
