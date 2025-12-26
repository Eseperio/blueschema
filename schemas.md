---
layout: default
title: Schema Reference
---

# BlueSchema Reference

This reference guide provides detailed documentation for every schema in BlueSchema. Each schema page includes:

- **Purpose** - What the schema represents and why it exists
- **Properties** - Detailed explanation of each property
- **Examples** - Real-world usage demonstrations
- **Best Practices** - Tips for effective use

## Core Schemas

These schemas define your application's business logic, data structures, and behavior.

### Foundation

<div class="schema-card">
  <h4><a href="/blueschema/schemas/application">Application</a></h4>
  <p>The root schema that ties together all components of your application. This is your starting point and contains references to all entities, actions, services, and configuration.</p>
  <p><strong>Use when:</strong> Defining the complete structure of your application</p>
</div>

### Data Model

<div class="schema-card">
  <h4><a href="/blueschema/schemas/entity">Entity</a></h4>
  <p>Describes data models and database tables. Entities contain fields and relations that define your application's data structure.</p>
  <p><strong>Use when:</strong> Creating data models like User, Post, Product, Order</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/field">Field</a></h4>
  <p>Defines individual properties within an entity, including type, constraints, indexes, and foreign keys. Fields are the building blocks of your data model.</p>
  <p><strong>Use when:</strong> Specifying entity properties like email, title, price, quantity</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/relation">Relation</a></h4>
  <p>Models relationships between entities (hasOne, hasMany, belongsTo). Defines how data connects and what happens on deletion.</p>
  <p><strong>Use when:</strong> Creating relationships like User has many Posts, Post belongs to Category</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/validation">Validation</a></h4>
  <p>Specifies validation rules for fields including length constraints, patterns, formats, and value ranges.</p>
  <p><strong>Use when:</strong> Enforcing data quality rules like email format, minimum password length</p>
</div>

### Business Logic

<div class="schema-card">
  <h4><a href="/blueschema/schemas/action">Action</a></h4>
  <p>Models operations and endpoints in your application. The description field acts as an AI prompt for code generation.</p>
  <p><strong>Use when:</strong> Defining operations like login, createPost, placeOrder</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/group">Group</a></h4>
  <p>Organizes actions under a shared route prefix for better structure and organization.</p>
  <p><strong>Use when:</strong> Grouping related actions like /auth, /posts, /admin</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/parameter">Parameter</a></h4>
  <p>Defines input parameters for actions, including location (query, path, header), validation, and documentation.</p>
  <p><strong>Use when:</strong> Specifying inputs for your actions like userId, page, limit</p>
</div>

### Services & Integration

<div class="schema-card">
  <h4><a href="/blueschema/schemas/service">Service</a></h4>
  <p>Defines services available to your application. The description acts as a prompt for AI service implementation.</p>
  <p><strong>Use when:</strong> Defining external integrations like emailService, paymentService, storageService</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/dataSource">Data Source</a></h4>
  <p>Configures database connections and data stores with driver-specific settings and environment variable references.</p>
  <p><strong>Use when:</strong> Connecting to PostgreSQL, MySQL, Redis, MongoDB</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/environment">Environment</a></h4>
  <p>Specifies required environment variables for configuration, API keys, and secrets.</p>
  <p><strong>Use when:</strong> Declaring configuration like DATABASE_URL, API_KEY, JWT_SECRET</p>
</div>

### Security

<div class="schema-card">
  <h4><a href="/blueschema/schemas/accessControl">Access Control</a></h4>
  <p>Defines the complete access control structure with roles and permissions for your application.</p>
  <p><strong>Use when:</strong> Setting up role-based access control with roles like admin, editor, viewer</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/access">Access</a></h4>
  <p>Specifies access requirements for individual actions using roles, permissions, or custom prompts.</p>
  <p><strong>Use when:</strong> Protecting actions with authorization rules</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/permission">Permission</a></h4>
  <p>Defines individual permissions including built-in permissions (guest, logged, any) and custom permissions.</p>
  <p><strong>Use when:</strong> Creating permissions like posts:create, users:delete, admin:access</p>
</div>

## Visual Schemas {#visual-schemas}

These schemas define your application's user interface and layout.

### Layout Structure

<div class="schema-card">
  <h4><a href="/blueschema/schemas/view">View</a></h4>
  <p>Defines the complete layout structure composed of rows, columns, and components. Views describe how UI elements are arranged.</p>
  <p><strong>Use when:</strong> Creating page layouts and UI structure</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/row">Row</a></h4>
  <p>Defines a horizontal container that holds columns. Rows stack vertically to create page structure.</p>
  <p><strong>Use when:</strong> Creating horizontal sections in your layout</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/column">Column</a></h4>
  <p>Defines a column within a row with percentage-based width and nested components.</p>
  <p><strong>Use when:</strong> Dividing rows into responsive columns</p>
</div>

### Components

<div class="schema-card">
  <h4><a href="/blueschema/schemas/component">Component</a></h4>
  <p>Base schema that references all available UI component types. This is the entry point for all visual elements.</p>
  <p><strong>Use when:</strong> Adding any UI element to your layout</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/table">Table</a></h4>
  <p>Data table component with support for sorting, filtering, and pagination.</p>
  <p><strong>Use when:</strong> Displaying structured data in rows and columns</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/list">List</a></h4>
  <p>List component for displaying ordered or unordered collections of items.</p>
  <p><strong>Use when:</strong> Showing bullet lists, numbered lists, or item collections</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/card">Card</a></h4>
  <p>Card component with optional header for displaying content blocks in a contained format.</p>
  <p><strong>Use when:</strong> Creating content cards, info boxes, or grouped information</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/cardWithIcon">Card with Icon</a></h4>
  <p>Enhanced card component that includes an icon alongside content, perfect for statistics and highlights.</p>
  <p><strong>Use when:</strong> Showing metrics, stats, or highlighted information</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/menuHorizontal">Horizontal Menu</a></h4>
  <p>Horizontal navigation menu component for top navigation bars.</p>
  <p><strong>Use when:</strong> Creating header navigation or tab-style menus</p>
</div>

<div class="schema-card">
  <h4><a href="/blueschema/schemas/menuVertical">Vertical Menu</a></h4>
  <p>Vertical navigation menu component for sidebars and side navigation.</p>
  <p><strong>Use when:</strong> Creating sidebar navigation or vertical menu lists</p>
</div>

## How to Use This Reference

Each schema documentation page follows a consistent structure:

1. **Overview** - High-level explanation of the schema's purpose
2. **Properties** - Detailed breakdown of every property with types and requirements
3. **Examples** - Practical examples showing real-world usage
4. **Related Schemas** - Links to connected schemas
5. **Best Practices** - Tips and recommendations

## Quick Navigation

Jump directly to commonly used schemas:

- [Application →](/blueschema/schemas/application)
- [Entity →](/blueschema/schemas/entity)
- [Action →](/blueschema/schemas/action)
- [View →](/blueschema/schemas/view)

Or browse all schemas using the links above.

<style>
.schema-card {
  background-color: #f6f8fa;
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid #0366d6;
  margin-bottom: 15px;
}

.schema-card h4 {
  margin-top: 0;
  margin-bottom: 10px;
}

.schema-card p {
  margin-bottom: 8px;
}

.schema-card p:last-child {
  margin-bottom: 0;
  color: #586069;
  font-size: 0.9em;
}
</style>
