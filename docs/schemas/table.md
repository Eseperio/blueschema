---
layout: default
title: Table Component Schema
---

# Table Component Schema

Data table component with support for sorting, filtering, and pagination.

## Properties

### `type` (required)
- Value: `"table"`

### `description` (required)
- **Type:** string
- **Description:** What data to display and how

### `sortable` (optional)
- **Type:** boolean
- **Description:** Enable column sorting

### `filterable` (optional)
- **Type:** boolean
- **Description:** Enable filtering

### `paginated` (optional)
- **Type:** boolean
- **Description:** Enable pagination

## Example

```json
{
  "type": "table",
  "description": "Blog posts with title, author, date, and status columns. Show 20 per page.",
  "sortable": true,
  "filterable": true,
  "paginated": true
}
```
