---
layout: default
title: View Schema
---

# View Schema

The **View** schema defines user interface layouts composed of rows, columns, and components. Views describe how data and UI elements should be arranged on a page.

## Purpose

Views create **shared understanding** of UI structure:

- **For AI:** Specifications for generating UI code and templates
- **For Humans:** Visual layout documentation
- **For Both:** A clear contract for how interfaces are organized

## Properties

### `description` (required)
- **Type:** string
- **Description:** Human-readable description of the view's purpose

Explain what the view displays and its purpose.

**Example:**
```json
"description": "Dashboard with statistics cards and recent activity table"
```

### `rows` (required)
- **Type:** array of [Row](/blueschema/schemas/row) objects
- **Description:** Horizontal rows that make up the view

Rows stack vertically to create the page structure. Each row contains columns.

**Example:**
```json
"rows": [
  {
    "columns": [
      {
        "width": 50,
        "components": [/* ... */]
      },
      {
        "width": 50,
        "components": [/* ... */]
      }
    ]
  }
]
```

## Complete Example

### Dashboard View

```json
{
  "description": "Admin dashboard with statistics and recent activity",
  "rows": [
    {
      "columns": [
        {
          "width": 25,
          "components": [
            {
              "type": "cardWithIcon",
              "icon": "users",
              "description": "Total users count"
            }
          ]
        },
        {
          "width": 25,
          "components": [
            {
              "type": "cardWithIcon",
              "icon": "posts",
              "description": "Total posts count"
            }
          ]
        },
        {
          "width": 25,
          "components": [
            {
              "type": "cardWithIcon",
              "icon": "comments",
              "description": "Total comments count"
            }
          ]
        },
        {
          "width": 25,
          "components": [
            {
              "type": "cardWithIcon",
              "icon": "views",
              "description": "Total post views"
            }
          ]
        }
      ]
    },
    {
      "columns": [
        {
          "width": 100,
          "components": [
            {
              "type": "table",
              "description": "Recent activity with posts, comments, and registrations",
              "sortable": true,
              "paginated": true
            }
          ]
        }
      ]
    }
  ]
}
```

**Result:** A dashboard with four stat cards in the first row (25% width each) and a full-width table in the second row.

### Two-Column Layout

```json
{
  "description": "Blog post with sidebar",
  "rows": [
    {
      "columns": [
        {
          "width": 70,
          "components": [
            {
              "type": "card",
              "description": "Post content with title, author, and body"
            },
            {
              "type": "list",
              "description": "Comments list",
              "ordered": false
            }
          ]
        },
        {
          "width": 30,
          "components": [
            {
              "type": "cardWithIcon",
              "icon": "user",
              "description": "Author bio"
            },
            {
              "type": "card",
              "header": "Related Posts",
              "description": "List of related posts"
            }
          ]
        }
      ]
    }
  ]
}
```

**Result:** Main content area (70%) with post and comments, sidebar (30%) with author info and related posts.

### Form Layout

```json
{
  "description": "User registration form",
  "rows": [
    {
      "columns": [
        {
          "width": 100,
          "components": [
            {
              "type": "card",
              "header": "Create Account",
              "description": "Registration form with email, username, password fields and submit button"
            }
          ]
        }
      ]
    }
  ]
}
```

**Result:** Centered form card taking full width.

## Layout Patterns

### Single Column (Full Width)

```json
{
  "rows": [
    {
      "columns": [
        {
          "width": 100,
          "components": [/* ... */]
        }
      ]
    }
  ]
}
```

### Two Equal Columns

```json
{
  "rows": [
    {
      "columns": [
        {
          "width": 50,
          "components": [/* ... */]
        },
        {
          "width": 50,
          "components": [/* ... */]
        }
      ]
    }
  ]
}
```

### Three Equal Columns

```json
{
  "rows": [
    {
      "columns": [
        {
          "width": 33.33,
          "components": [/* ... */]
        },
        {
          "width": 33.33,
          "components": [/* ... */]
        },
        {
          "width": 33.34,
          "components": [/* ... */]
        }
      ]
    }
  ]
}
```

### Four Equal Columns

```json
{
  "rows": [
    {
      "columns": [
        { "width": 25, "components": [/* ... */] },
        { "width": 25, "components": [/* ... */] },
        { "width": 25, "components": [/* ... */] },
        { "width": 25, "components": [/* ... */] }
      ]
    }
  ]
}
```

### Main Content with Sidebar (70/30)

```json
{
  "rows": [
    {
      "columns": [
        {
          "width": 70,
          "components": [/* main content */]
        },
        {
          "width": 30,
          "components": [/* sidebar */]
        }
      ]
    }
  ]
}
```

### Multiple Rows

```json
{
  "rows": [
    {
      "columns": [/* header row */]
    },
    {
      "columns": [/* content row */]
    },
    {
      "columns": [/* footer row */]
    }
  ]
}
```

## Best Practices

### 1. Column Widths Must Sum to 100

```json
// ✅ Good - adds up to 100
{ "width": 70 }, { "width": 30 }

// ❌ Bad - adds up to 120
{ "width": 70 }, { "width": 50 }
```

### 2. Use Semantic Descriptions

```json
// ✅ Good - explains purpose
"description": "User dashboard showing account stats and recent activity"

// ❌ Bad - not helpful
"description": "A view"
```

### 3. Consider Responsive Design

Use percentage-based widths that adapt well:

```json
// Mobile-friendly widths
{ "width": 100 }  // Full width on mobile
{ "width": 50 }   // Half width on larger screens
```

### 4. Group Related Components

Put related components in the same column:

```json
{
  "width": 30,
  "components": [
    { "type": "cardWithIcon", "description": "User stats" },
    { "type": "card", "description": "User activity" }
  ]
}
```

## Related Schemas

- [Row](/blueschema/schemas/row) - Horizontal containers
- [Column](/blueschema/schemas/column) - Vertical divisions
- [Component](/blueschema/schemas/component) - UI elements
- [Action](/blueschema/schemas/action) - Actions can have views

## Next Steps

- 📖 Learn about [Components](/blueschema/schemas/component) for UI elements
- 🎨 Explore [Row](/blueschema/schemas/row) and [Column](/blueschema/schemas/column) for layout
- 🎯 See the [Blog Example](/blueschema/examples/blog-app) for view examples

---

**Remember:** Views provide a declarative way to define UI layouts that both AI and humans can understand and implement consistently.
