---
layout: default
title: Column Schema
---

# Column Schema

Defines a column within a row with percentage-based width and nested components.

## Properties

### `width` (required)
- **Type:** number
- **Description:** Column width as percentage (1-100)

Widths in a row must sum to 100.

### `components` (required)
- **Type:** array of [Component](/blueschema/schemas/component) objects
- **Description:** UI components in this column

## Example

```json
{
  "width": 70,
  "components": [
    {
      "type": "card",
      "description": "Main content"
    },
    {
      "type": "list",
      "description": "Related items"
    }
  ]
}
```
