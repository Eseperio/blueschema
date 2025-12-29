<p align="center">
  <img src="docs/blueschema-logo.jpeg" alt="Blueschema library logo" width="128"/>
</p>


> [!NOTE]
> TL;DR; Manipulate large applications with any AI in a controlled and confident way.   

# BlueSchema

BlueSchema is a collection of JSON Schemas that describe an application in a structured way so AI tools can easily understand every component. The schemas capture entities, actions, groups, services, data sources, environment variables, access control, and basic views. Each action and service includes a `description` that explains what it does, acting as the prompt for AI-assisted tooling.

## Why BlueSchema?

Using a schema-driven approach for code generation offers several advantages over direct AI-based code generation:
- **Speed** – Generating code from a well-defined schema is significantly faster than relying on an AI to write everything from scratch.
- **Accuracy** – AI-generated code often varies based on the framework, leading to inconsistencies. A standardized schema ensures precise output.
- **Cost-Effective** – AI-powered coding requires more processing time and iterations, making it more expensive compared to structured generation.
- **Robustness** – Code generators built on BlueSchema enforce best practices and consistency across different programming languages and frameworks.

## Schemas

BlueSchema provides two main kinds of schemas that work together to define your application:

### Application Flow Schemas
These schemas define the core business logic, data structures, and application behavior:

| Schema | Purpose |
| --- | --- |
| `application.json` | Entry point that ties together all components of an app, including actions and groups. |
| `core/entity.json` | Describes entities and their fields. Supports lifecycle hooks for custom logic at key moments (beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDelete, afterDelete, beforeValidate, afterValidate). |
| `core/field.json` | Defines individual field properties including type, constraints, foreign keys, indexes, and computed/virtual fields. |
| `core/relation.json` | Models relationships between entities (hasOne, hasMany) with support for cascading and join tables. |
| `core/validation.json` | Specifies validation rules for fields including length, pattern, format, and value constraints. |
| `core/action.json` | Models an action. The `description` acts as the action's prompt, and `useServices` lists dependent services. |
| `core/group.json` | Groups actions or other groups under a shared `routeSuffix`. |
| `core/parameter.json` | Defines parameters accepted by actions. |
| `core/service.json` | Defines services available to the application. The `description` acts as the service's prompt. |
| `core/dataSource.json` | Lists available data sources. |
| `core/environment.json` | Specifies required environment variables. |
| `core/access.json` | Access rule for individual actions specifying required role, permissions, or custom prompt. |
| `core/accessControl.json` | Application-wide access control structure defining roles and their associated permissions. |
| `core/permission.json` | Permission identifier schema supporting built-in permissions (guest, logged, any) and custom permissions. |

### Application Visuals Schemas
These schemas define the user interface layout and visual components:

| Schema | Purpose |
| --- | --- |
| `view/view.json` | View layout composed of rows, columns, and components. |
| `view/row.json` | Defines a horizontal row container that holds columns. |
| `view/column.json` | Defines a column within a row with percentage-based width and nested components. |
| `view/component.json` | Base component schema that references all available UI component types. |
| `view/table.json` | Table component with support for sorting, filtering, and pagination. |
| `view/list.json` | List component for displaying ordered or unordered lists. |
| `view/card.json` | Card component with optional header for displaying content blocks. |
| `view/cardWithIcon.json` | Enhanced card component that includes an icon. |
| `view/menuHorizontal.json` | Horizontal navigation menu component. |
| `view/menuVertical.json` | Vertical navigation menu component. |

## Key Features

### Lifecycle Hooks

Entities can define lifecycle hooks to execute custom logic at specific moments. Each hook uses a prompt-based description, following the same pattern as actions and services:

```json
{
  "name": "User",
  "tableName": "users",
  "fields": [...],
  "hooks": {
    "beforeCreate": "Generate a unique username if not provided. Hash the password using bcrypt with salt rounds of 10.",
    "afterCreate": "Send a welcome email to the user. Log the user registration event.",
    "beforeUpdate": "If password is being changed, hash it with bcrypt. Validate that email changes are to valid, non-duplicate addresses.",
    "afterUpdate": "If email was changed, send a confirmation email to the new address.",
    "beforeDelete": "Check if user has any active subscriptions. Prevent deletion if subscriptions exist.",
    "afterDelete": "Anonymize all user's comments. Remove user from all mailing lists.",
    "beforeValidate": "Trim whitespace from email and username fields. Convert email to lowercase.",
    "afterValidate": "Check email against spam database. Flag suspicious registrations for review."
  }
}
```

Available lifecycle hooks:
- `beforeCreate`: Executed before creating a new entity instance
- `afterCreate`: Executed after successfully creating a new entity instance
- `beforeUpdate`: Executed before updating an entity instance
- `afterUpdate`: Executed after successfully updating an entity instance
- `beforeDelete`: Executed before deleting an entity instance
- `afterDelete`: Executed after successfully deleting an entity instance
- `beforeValidate`: Executed before validating an entity instance
- `afterValidate`: Executed after successfully validating an entity instance

### Computed Fields

Fields can be marked as computed/virtual, meaning they are calculated at runtime and not stored in the database:

```json
{
  "name": "User",
  "tableName": "users",
  "fields": [
    {
      "name": "first_name",
      "type": "string",
      "length": 100
    },
    {
      "name": "last_name",
      "type": "string",
      "length": 100
    },
    {
      "name": "full_name",
      "type": "string",
      "computed": true,
      "computeLogic": "Concatenate first_name and last_name with a space between them. Return empty string if both are null."
    },
    {
      "name": "age",
      "type": "integer",
      "computed": true,
      "computeLogic": "Calculate age based on date_of_birth field. Return the number of complete years between date_of_birth and current date."
    }
  ]
}
```

Computed fields:
- Are not stored in the database
- Are calculated dynamically when the entity is accessed
- Use `computeLogic` to describe how the value should be calculated
- Can reference other fields in the same entity
- Are useful for derived data, concatenations, calculations, and formatting

## How to Use

BlueSchema defines the structure of an application. To get started, create a JSON file that conforms to these schemas; tools can use it to build your application.

BlueSchema is still under development and not yet ready for production use. Stay tuned for updates as we refine the schemas.

🤝 **Want to contribute?** Feel free to collaborate, suggest improvements, or support the project!
