---
layout: default
title: Action Schema
---

# Action Schema

The **Action** schema defines operations and endpoints in your application. Actions represent the business logic and API endpoints that your application exposes. Importantly, the `description` field in each action serves as **an AI prompt** that guides code generation.

## Purpose

Actions create a **shared understanding** of your application's behavior:

- **For AI:** Precise prompts that specify exactly what code to generate, including business rules and edge cases
- **For Humans:** Clear documentation of what each endpoint does and how it behaves
- **For Both:** A contract that ensures generated code matches intended functionality

## Properties

### `name` (required)
- **Type:** string
- **Description:** Action name in camelCase format

The action name should use camelCase (e.g., `login`, `createPost`, `updateUserProfile`). This becomes the function/method name in generated code.

**Example:**
```json
"name": "createPost"
```

### `route` (optional)
- **Type:** string
- **Description:** URL path or endpoint for this action

The route can include path parameters using curly braces: `/posts/{id}`, `/users/{userId}/posts/{postId}`.

**Example:**
```json
"route": "/posts/{id}"
```

### `description` (optional)
- **Type:** string
- **Description:** **This is the AI prompt** - detailed explanation of what the action does

**This is the most important property for AI-assisted development.** Write clear, detailed descriptions that include:
- What the action does
- Business rules to enforce
- Validations to perform
- What to return
- Error conditions to handle

**Example:**
```json
"description": "Create a new blog post with title, content, and optional category. Generate a unique slug from the title. The post is initially unpublished. Validate that the title is unique and content is not empty. Return the created post with its generated ID and slug."
```

### `parameters` (optional)
- **Type:** array of [Parameter](/blueschema/schemas/parameter) objects
- **Description:** Input parameters accepted by this action
- **Unique items:** Yes

Define all inputs the action accepts, including query params, path params, headers, and cookies.

**Example:**
```json
"parameters": [
  {
    "name": "title",
    "in": "query",
    "description": "Post title",
    "required": true,
    "schema": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    }
  },
  {
    "name": "id",
    "in": "path",
    "description": "Post UUID",
    "required": true,
    "schema": {
      "type": "string",
      "format": "uuid"
    }
  }
]
```

### `useServices` (optional)
- **Type:** array of strings
- **Description:** Services this action depends on (referenced by title)
- **Unique items:** Yes

List services by their title that this action uses. This helps AI understand dependencies.

**Example:**
```json
"useServices": ["emailService", "slugService", "notificationService"]
```

### `responseFormat` (optional)
- **Type:** string
- **Enum:** `"json"`, `"xml"`, `"html"`, `"text"`
- **Description:** Expected response format

Specify the format of the action's response.

**Example:**
```json
"responseFormat": "json"
```

### `access` (optional)
- **Type:** array of [Access](/blueschema/schemas/access) objects
- **Description:** Access control requirements for this action
- **Unique items:** Yes

Define who can execute this action using roles, permissions, or custom authorization logic.

**Example:**
```json
"access": [
  {
    "role": "admin"
  }
]
```

Or with custom logic:

```json
"access": [
  {
    "prompt": "User must be authenticated and either the post author or have admin role"
  }
]
```

### `view` (optional)
- **Type:** [View](/blueschema/schemas/view) object
- **Description:** Optional UI view definition for this action

Define the user interface layout for this action, specifying how data should be displayed.

**Example:**
```json
"view": {
  "description": "Login form with email and password fields",
  "rows": [
    {
      "columns": [
        {
          "width": 100,
          "components": [
            {
              "type": "card",
              "header": "Sign In",
              "description": "Display login form with email and password fields"
            }
          ]
        }
      ]
    }
  ]
}
```

## Complete Examples

### Simple Read Action

```json
{
  "name": "listPosts",
  "route": "/",
  "description": "Retrieve a paginated list of published blog posts. Include author name and category for each post. Sort by publication date, newest first. Support pagination with page and limit parameters.",
  "parameters": [
    {
      "name": "page",
      "in": "query",
      "description": "Page number for pagination",
      "required": false,
      "schema": {
        "type": "integer",
        "minimum": 1,
        "default": 1
      }
    },
    {
      "name": "limit",
      "in": "query",
      "description": "Number of posts per page",
      "required": false,
      "schema": {
        "type": "integer",
        "minimum": 1,
        "maximum": 100,
        "default": 10
      }
    }
  ],
  "responseFormat": "json"
}
```

**Purpose:** Lists blog posts with pagination. The description tells AI exactly how to query, sort, and paginate the data.

### Create Action with Validation

```json
{
  "name": "register",
  "route": "/register",
  "description": "Register a new user account with email, username, and password. Validate that email is unique and in valid format. Validate that username is unique and at least 3 characters. Hash the password securely using bcrypt. Send a welcome email to the user. Return the created user object (without password hash) and a JWT token.",
  "parameters": [
    {
      "name": "email",
      "in": "query",
      "description": "User's email address",
      "required": true,
      "schema": {
        "type": "string",
        "format": "email"
      }
    },
    {
      "name": "username",
      "in": "query",
      "description": "Desired username",
      "required": true,
      "schema": {
        "type": "string",
        "minLength": 3,
        "maxLength": 100
      }
    },
    {
      "name": "password",
      "in": "query",
      "description": "User's password",
      "required": true,
      "schema": {
        "type": "string",
        "minLength": 8
      }
    }
  ],
  "useServices": ["emailService", "authService"],
  "responseFormat": "json"
}
```

**Purpose:** User registration with comprehensive validation, security, and email notifications. The description provides all details AI needs to generate secure, complete code.

### Update Action with Authorization

```json
{
  "name": "updatePost",
  "route": "/{id}",
  "description": "Update an existing blog post. Only the author or an admin can update the post. If the title changes, regenerate the slug ensuring uniqueness. Validate that the post exists and user has permission. Return the updated post.",
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "description": "Post UUID",
      "required": true,
      "schema": {
        "type": "string",
        "format": "uuid"
      }
    },
    {
      "name": "title",
      "in": "query",
      "description": "Post title",
      "required": false,
      "schema": {
        "type": "string",
        "maxLength": 255
      }
    },
    {
      "name": "content",
      "in": "query",
      "description": "Post content",
      "required": false,
      "schema": {
        "type": "string"
      }
    }
  ],
  "useServices": ["slugService"],
  "responseFormat": "json",
  "access": [
    {
      "prompt": "User must be the post author or have admin role"
    }
  ]
}
```

**Purpose:** Update operation with custom authorization logic. The access prompt tells AI to generate code checking ownership or admin role.

### Action with Service Dependencies

```json
{
  "name": "createComment",
  "route": "/",
  "description": "Create a new comment on a blog post. Comments are initially unapproved and require moderation. Validate that the post exists and is published. Validate that content is not empty and under 1000 characters. Send a notification to the post author about the new comment. Return the created comment.",
  "parameters": [
    {
      "name": "postId",
      "in": "query",
      "description": "Post UUID to comment on",
      "required": true,
      "schema": {
        "type": "string",
        "format": "uuid"
      }
    },
    {
      "name": "content",
      "in": "query",
      "description": "Comment content",
      "required": true,
      "schema": {
        "type": "string",
        "minLength": 1,
        "maxLength": 1000
      }
    }
  ],
  "useServices": ["notificationService"],
  "responseFormat": "json",
  "access": [
    {
      "prompt": "User must be authenticated"
    }
  ]
}
```

**Purpose:** Comment creation with validation, moderation workflow, and notifications. The AI knows to use the notificationService based on useServices array.

## Writing Effective Action Descriptions

The description field is your AI prompt. Here's how to write effective ones:

### ✅ Good Descriptions

**Specific and Actionable:**
```json
"description": "Authenticate user by verifying email and password. Check that email exists in database. Use bcrypt to verify the password hash matches. If valid, generate a JWT token with user ID and role, valid for 24 hours. Return the token and user object. If invalid, return 401 error with message 'Invalid credentials'."
```

**Includes Business Rules:**
```json
"description": "Publish a blog post by setting published flag to true and recording the publication timestamp. Only authors and admins can publish posts. The post must have a title and content. Automatically send notifications to all post subscribers. Return the published post with publication date."
```

**Specifies Error Handling:**
```json
"description": "Delete a user account. Check that user exists. Soft delete the user by setting deleted_at timestamp. Cascade delete: set all their posts and comments to 'deleted user'. Send a goodbye email. Return success message. If user has active subscriptions, return 400 error asking to cancel first."
```

### ❌ Bad Descriptions

**Too Vague:**
```json
"description": "Login user"  // AI doesn't know how to authenticate
```

**Missing Details:**
```json
"description": "Create a post"  // What validations? What to return? 
```

**Ambiguous:**
```json
"description": "Update user data"  // Which fields? What rules? Who can update?
```

## Best Practices

### 1. Write Detailed Descriptions

Your descriptions are AI prompts. Include:
- **What** the action does
- **How** it should work
- **Validations** to perform
- **What to return**
- **Error conditions**

### 2. Use Path Parameters for Resources

```json
"route": "/posts/{id}"  // ✅ Resource identifier in path
"route": "/posts?id=123"  // ❌ Avoid query params for IDs
```

### 3. Declare Service Dependencies

Always list services the action uses:

```json
{
  "name": "sendPasswordReset",
  "useServices": ["emailService", "tokenService"],  // ✅ Clear dependencies
  "description": "..."
}
```

### 4. Be Consistent with Naming

- Use camelCase for action names
- Use HTTP conventions for routes
- Use descriptive parameter names

### 5. Specify Response Formats

Always specify what format the action returns:

```json
"responseFormat": "json"  // Most common
```

### 6. Add Access Control

Protect sensitive actions with access requirements:

```json
"access": [
  {
    "role": "admin"  // Role-based
  }
]
```

Or:

```json
"access": [
  {
    "prompt": "User must own the resource or be an admin"  // Custom logic
  }
]
```

## Common Patterns

### CRUD Operations

```json
// Create
{
  "name": "createResource",
  "route": "/",
  "description": "Create a new resource. Validate required fields. Return created resource with ID."
}

// Read
{
  "name": "getResource",
  "route": "/{id}",
  "description": "Retrieve a single resource by ID. Return 404 if not found."
}

// Update
{
  "name": "updateResource",
  "route": "/{id}",
  "description": "Update an existing resource. Validate ownership. Return updated resource."
}

// Delete
{
  "name": "deleteResource",
  "route": "/{id}",
  "description": "Soft delete a resource. Validate ownership. Return success message."
}

// List
{
  "name": "listResources",
  "route": "/",
  "description": "List all resources with pagination. Support filtering and sorting."
}
```

### Authentication Actions

```json
{
  "name": "login",
  "description": "Authenticate user with email and password. Verify credentials. Generate JWT token. Return token and user data."
},
{
  "name": "logout",
  "description": "Invalidate user session. Clear authentication token. Return success message."
},
{
  "name": "refreshToken",
  "description": "Generate new JWT token from valid refresh token. Validate refresh token. Return new access token."
}
```

## Related Schemas

- [Parameter](/blueschema/schemas/parameter) - Define action inputs
- [Service](/blueschema/schemas/service) - Define service dependencies
- [Access](/blueschema/schemas/access) - Control action access
- [View](/blueschema/schemas/view) - Define UI for actions
- [Group](/blueschema/schemas/group) - Organize related actions

## Next Steps

- 📖 Learn about [Parameters](/blueschema/schemas/parameter) for action inputs
- 🔒 Explore [Access Control](/blueschema/schemas/access) for authorization
- 🎯 See the [Blog Example](/blueschema/examples/blog-app) for complete action definitions

---

**Remember:** Action descriptions are AI prompts. The more detailed and specific you are, the better the generated code will match your requirements.
