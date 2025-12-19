# BlueSchema Example: Blog Application

This example demonstrates how to use BlueSchema to define a complete blog application. The example showcases all the features and schemas available in BlueSchema.

## Overview

The example `example-application.json` defines a full-featured blog platform with:

- **User management** with authentication and role-based access control
- **Blog posts** with categories, publishing workflow, and view tracking
- **Comments** with moderation system
- **Categories** for organizing posts
- **Admin dashboard** for managing the platform

## Structure

### Application Metadata

```json
{
  "id": "blog-app-001",
  "name": "Blog Application",
  "version": "1.0.0",
  "description": "A complete blog application demonstrating all BlueSchema features",
  "license": "MIT"
}
```

The root application object contains basic metadata about the application.

### Entities

The application defines four main entities:

#### 1. User Entity
- Stores user information including email, username, password hash, and role
- Has relationships with Posts and Comments
- Uses UUID as primary key
- Includes soft deletes and timestamps
- Fields demonstrate various data types: string, text, boolean, uuid

#### 2. Post Entity
- Represents blog posts with title, content, slug, and publication status
- Links to User (author) and Category
- Has a one-to-many relationship with Comments
- Tracks view count and publication date
- Uses foreign keys with cascade delete for author relationship

#### 3. Category Entity
- Organizes posts into categories
- Simple structure with name, slug, and description
- One-to-many relationship with Posts
- No soft deletes (permanent categories)

#### 4. Comment Entity
- User comments on blog posts
- Includes approval system for moderation
- Links to both User and Post entities
- Uses cascade delete when user or post is deleted

### Actions and Groups

Actions are organized into logical groups using the `routeSuffix` feature:

#### `/auth` - Authentication Actions
- **register**: User registration with email verification
- **login**: User authentication with JWT tokens
- **logout**: Session termination

#### `/posts` - Blog Post Management
- **listPosts**: Paginated list with filtering and sorting
- **getPost**: Single post view with comments
- **createPost**: Create new posts (authors only)
- **updatePost**: Edit existing posts (owner or admin)
- **publishPost**: Publish posts (owner or admin)
- **deletePost**: Soft delete posts (owner or admin)

#### `/comments` - Comment Management
- **createComment**: Add comments to posts (authenticated users)
- **approveComment**: Approve comments for display (admins)
- **deleteComment**: Remove comments (owner, post author, or admin)

#### `/categories` - Category Management
- **listCategories**: View all categories
- **createCategory**: Create new categories (admins only)

#### `/admin` - Administration
- **dashboard**: Admin overview with statistics
- **moderateComments**: Comment moderation interface

### Parameters

Actions use parameters to define their inputs:

- **Path parameters**: `{id}`, `{slug}` for resource identification
- **Query parameters**: filtering, pagination, and data submission
- **Parameter validation**: using JSON Schema (minLength, maxLength, format, etc.)

**Note**: The current parameter schema supports "query", "path", "header", and "cookie" parameter locations, following OpenAPI conventions. In this example, some parameters use "query" location for simplicity and demonstration purposes. In a production REST API, you would typically use request body payloads for POST/PUT operations and sensitive data. The schema descriptions serve as prompts for AI code generators, which can interpret these appropriately for the target framework and generate proper request body handling.

### Services

The application defines four services that actions can use:

1. **authService**: Authentication and authorization operations
2. **emailService**: Transactional email sending
3. **slugService**: URL-friendly slug generation
4. **notificationService**: Multi-channel notifications

Each service includes a `description` that acts as a prompt for AI tools to understand what the service should do.

### Data Sources

Two data sources are configured:

1. **mainDatabase**: PostgreSQL database with connection pooling
2. **cacheStore**: Redis cache for performance optimization

Both use environment variables for configuration, following the twelve-factor app methodology.

### Environment Variables

The application requires several environment variables:

- Database configuration (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
- Redis configuration (REDIS_HOST, REDIS_PORT, REDIS_PASSWORD)
- Authentication (JWT_SECRET)
- Email service (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD)
- Application URL (APP_URL)

Each variable includes a description and indicates whether it's required or has a default value.

### Access Control

Three roles are defined with different permission sets:

1. **reader**: Can read posts, create and delete own comments
2. **author**: Can create and manage own posts, moderate comments on their posts
3. **admin**: Full access to all resources and admin features

Permissions follow a consistent naming pattern: `resource:action:scope`

### Views

Several actions include view definitions demonstrating the view system:

- **Card layouts** for forms and content display
- **Tables** with sorting, filtering, and pagination
- **Lists** for simple item display
- **Cards with icons** for statistics and highlights
- **Multi-column layouts** for complex pages

## Key Features Demonstrated

### 1. Entity Relationships
- One-to-many relationships (User → Posts, Post → Comments)
- Many-to-one relationships (Post → User, Comment → Post)
- Foreign keys with different deletion behaviors (CASCADE, SET NULL)

### 2. Field Types and Constraints
- Various data types: string, text, integer, boolean, uuid, datetime
- Field constraints: unique, required, length limits, default values
- Primary keys and indexes
- Foreign key relationships

### 3. Action Features
- Route parameters and query parameters
- Service dependencies
- Response format specification
- Access control rules (role-based and prompt-based)
- View definitions for UI generation

### 4. Access Control Patterns
- Role-based access control (RBAC)
- Prompt-based access (custom authorization logic)
- Ownership checks (users can modify their own resources)

### 5. Service Integration
- Multiple services working together
- Service descriptions as prompts for AI tools
- Clear separation of concerns

### 6. View System
- Responsive layouts with column widths
- Multiple component types
- Nested row and column structure
- Component-specific options (sortable, filterable, paginated)

## Using This Example

To use this example as a starting point for your own application:

1. **Copy the structure**: Use the same organization for your entities, actions, and services
2. **Customize entities**: Modify fields to match your domain
3. **Update actions**: Change action descriptions to match your business logic
4. **Configure services**: Define the services your application needs
5. **Set environment variables**: Configure for your deployment environment
6. **Define roles and permissions**: Adjust access control for your security requirements

## Validation

This example conforms to all BlueSchema schemas:

- `application.json` - Root schema
- `core/entity.json` - Entity definitions
- `core/field.json` - Field specifications
- `core/relation.json` - Entity relationships
- `core/action.json` - Action definitions
- `core/group.json` - Action grouping
- `core/parameter.json` - Action parameters
- `core/service.json` - Service definitions
- `core/dataSource.json` - Data source configuration
- `core/environment.json` - Environment variables
- `core/access.json` - Access rules
- `core/accessControl.json` - Role definitions
- `view/view.json` - View layouts
- `view/row.json` - Row definitions
- `view/column.json` - Column definitions
- `view/component.json` - Component types
- `view/table.json` - Table components
- `view/list.json` - List components
- `view/card.json` - Card components
- `view/cardWithIcon.json` - Icon card components
- `view/menuHorizontal.json` - Horizontal menu components
- `view/menuVertical.json` - Vertical menu components

## Next Steps

After defining your application using BlueSchema:

1. **Validate your JSON**: Ensure it conforms to the schemas
2. **Generate code**: Use BlueSchema-compatible code generators
3. **Customize prompts**: Refine action and service descriptions for better AI assistance
4. **Extend the schema**: Add custom properties as needed for your use case

## Learn More

- See the main [BlueSchema README](../README.md) for schema documentation
- Explore individual schemas in the `schemas/` directory
- Check schema references and validation rules in each schema file
