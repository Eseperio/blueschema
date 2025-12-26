---
layout: default
title: List Component Schema
---

# List Component Schema

List component for displaying ordered or unordered collections of items.

## Properties

### `type` (required)
- Value: `"list"`

### `description` (required)
- **Type:** string
- **Description:** What items to display

### `ordered` (optional)
- **Type:** boolean
- **Description:** Whether the list is ordered (numbered) or unordered (bullets)

## Examples

```json
{
  "type": "list",
  "description": "Recent blog posts with title and date",
  "ordered": false
}
```

```json
{
  "type": "list",
  "description": "Step-by-step installation instructions",
  "ordered": true
}
```
