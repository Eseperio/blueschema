---
layout: default
title: Card with Icon Schema
---

# Card with Icon Schema

Enhanced card component that includes an icon, perfect for statistics and highlights.

## Properties

### `type` (required)
- Value: `"cardWithIcon"`

### `icon` (required)
- **Type:** string
- **Description:** Icon identifier

### `description` (required)
- **Type:** string
- **Description:** What stat/metric to display

## Example

```json
{
  "type": "cardWithIcon",
  "icon": "users",
  "description": "Total registered users: 1,234"
}
```

```json
{
  "type": "cardWithIcon",
  "icon": "dollar",
  "description": "Monthly revenue: $45,678"
}
```
