---
layout: default
title: Row Schema
---

# Row Schema

Defines a horizontal row container that holds columns. Rows stack vertically to create page structure.

## Properties

### `columns` (required)
- **Type:** array of [Column](/blueschema/schemas/column) objects
- **Description:** Columns in this row

Column widths must sum to 100.

## Example

```json
{
  "columns": [
    {
      "width": 50,
      "components": [/* left column */]
    },
    {
      "width": 50,
      "components": [/* right column */]
    }
  ]
}
```
