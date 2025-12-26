---
layout: default
title: Component Schema
---

# Component Schema

The **Component** schema is the base schema that references all available UI component types.

## Purpose

- **For AI:** Specification for generating UI components
- **For Humans:** Clear component documentation
- **For Both:** Unambiguous UI element definitions

## Available Component Types

Components can be one of the following types:

- `table` - Data table with sorting and filtering
- `list` - Ordered or unordered list
- `card` - Content card with optional header
- `cardWithIcon` - Card with icon for stats/highlights
- `menuHorizontal` - Horizontal navigation menu
- `menuVertical` - Vertical navigation menu

## Common Properties

All components have:

### `type` (required)
- **Type:** string
- **Description:** Component type identifier

### `description` (optional)
- **Type:** string
- **Description:** What the component should display

The description tells AI what content to show and how.

## Examples

### Table Component

```json
{
  "type": "table",
  "description": "User list with name, email, and registration date columns",
  "sortable": true,
  "filterable": true,
  "paginated": true
}
```

### List Component

```json
{
  "type": "list",
  "description": "Recent blog posts with titles and dates",
  "ordered": false
}
```

### Card Component

```json
{
  "type": "card",
  "header": "User Profile",
  "description": "Display user name, email, bio, and registration date"
}
```

### Card with Icon

```json
{
  "type": "cardWithIcon",
  "icon": "users",
  "description": "Total active users count: 1,234"
}
```

### Menu Components

```json
{
  "type": "menuHorizontal",
  "description": "Main navigation with Home, Posts, About, Contact links"
}
```

## Related Schemas

- [View](/blueschema/schemas/view) - Contains components
- [Table](/blueschema/schemas/table) - Table component details
- [List](/blueschema/schemas/list) - List component details
- [Card](/blueschema/schemas/card) - Card component details
