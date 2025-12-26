---
layout: default
title: Getting Started with BlueSchema
---

<div class="quick-nav">
  <h4>📚 Quick Navigation</h4>
  <ul>
    <li><a href="#what-is-blueschema">What is BlueSchema?</a></li>
    <li><a href="#core-concepts">Core Concepts</a></li>
    <li><a href="#your-first-blueschema-application">Your First Application</a></li>
    <li><a href="#next-steps">Next Steps</a></li>
  </ul>
</div>

# Getting Started with BlueSchema

Welcome to BlueSchema! This guide will help you understand how to use BlueSchema to define your application in a way that both AI tools and human developers can understand.

## What is BlueSchema?

BlueSchema is a collection of JSON Schemas that describe an application in a structured, semantic way. It creates **a shared context** that both AI and humans can understand, making it the only true bridge for collaborative AI development.

### The Problem BlueSchema Solves

When developing applications with AI assistance, three major challenges emerge:

1. **Context Gap** - AI tools don't understand your application's full structure
2. **Inconsistency** - Generated code varies based on framework and AI interpretation
3. **Communication Overhead** - Explaining your application architecture repeatedly is time-consuming

BlueSchema eliminates these issues by providing a single source of truth that serves as the shared context between you and AI tools.

## Core Concepts

### 1. Schemas as Context

Every BlueSchema is a JSON Schema that defines a specific aspect of your application. Together, they form a complete picture that:

- **AI can parse** to generate accurate, consistent code
- **Humans can read** to understand the application structure
- **Tools can validate** to ensure correctness

### 2. Descriptions as Prompts

Throughout BlueSchema, `description` fields serve dual purposes:

- **Documentation** for human readers
- **Prompts** for AI code generators

For example, an action description tells AI tools exactly what code to generate:

```json
{
  "name": "login",
  "description": "Authenticate a user with email and password. Verify the password hash matches. Generate and return a JWT token for the session."
}
```

This description is precise enough for AI to generate correct authentication code and clear enough for humans to understand the business logic.

### 3. Structure Creates Understanding

BlueSchema's hierarchical structure mirrors how applications are built:

```
Application
├── Entities (Data Models)
│   ├── Fields (Properties)
│   └── Relations (Connections)
├── Actions (Business Logic)
│   ├── Parameters (Inputs)
│   ├── Services (Dependencies)
│   └── Views (UI)
├── Data Sources (Databases)
├── Environment (Configuration)
└── Access Control (Security)
```

This structure provides context at every level, making it easy for both humans and AI to understand how pieces fit together.

## Your First BlueSchema Application

Let's create a simple task management application to demonstrate BlueSchema's core concepts.

### Step 1: Define the Application Root

Every BlueSchema application starts with the `application.json` schema:

```json
{
  "id": "task-manager-001",
  "name": "Task Manager",
  "version": "1.0.0",
  "description": "A simple task management application",
  "license": "MIT",
  "entities": [],
  "actions": [],
  "dataSources": []
}
```

This provides basic metadata and containers for all other components.

### Step 2: Define Your Entities

Entities represent your data models. Let's create a `Task` entity:

```json
{
  "name": "Task",
  "tableName": "tasks",
  "fields": [
    {
      "name": "id",
      "type": "uuid",
      "primaryKey": true,
      "required": true
    },
    {
      "name": "title",
      "type": "string",
      "length": 200,
      "required": true
    },
    {
      "name": "description",
      "type": "text"
    },
    {
      "name": "completed",
      "type": "boolean",
      "default": false
    },
    {
      "name": "due_date",
      "type": "date"
    }
  ],
  "timestamps": true,
  "softDeletes": false
}
```

**For AI**: This entity definition tells the AI exactly what database table to create, with specific field types and constraints.

**For Humans**: This is immediately readable documentation showing your data structure.

### Step 3: Define Actions

Actions describe what your application does. Let's add an action to create tasks:

```json
{
  "name": "createTask",
  "route": "/tasks",
  "description": "Create a new task with a title and optional description and due date. Validate that the title is not empty. Return the created task with its generated ID.",
  "parameters": [
    {
      "name": "title",
      "in": "query",
      "description": "Task title",
      "required": true,
      "schema": {
        "type": "string",
        "minLength": 1,
        "maxLength": 200
      }
    },
    {
      "name": "description",
      "in": "query",
      "description": "Task description",
      "required": false,
      "schema": {
        "type": "string"
      }
    },
    {
      "name": "due_date",
      "in": "query",
      "description": "Due date for the task",
      "required": false,
      "schema": {
        "type": "string",
        "format": "date"
      }
    }
  ],
  "responseFormat": "json"
}
```

The `description` field is the AI prompt. It tells the AI tool:
- What the action does (create a task)
- What validations to apply (title not empty)
- What to return (created task with ID)

### Step 4: Configure Data Sources

Define where your data lives:

```json
{
  "name": "mainDatabase",
  "type": "database",
  "config": {
    "driver": "postgresql",
    "host": "${DB_HOST}",
    "port": "${DB_PORT}",
    "database": "${DB_NAME}",
    "username": "${DB_USER}",
    "password": "${DB_PASSWORD}"
  }
}
```

### Step 5: Set Up Environment Variables

List required configuration:

```json
{
  "name": "DB_HOST",
  "description": "PostgreSQL database host address",
  "required": true
},
{
  "name": "DB_PORT",
  "description": "PostgreSQL database port",
  "required": true,
  "default": "5432"
}
```

## Complete Example

Putting it all together, here's your complete BlueSchema application:

```json
{
  "id": "task-manager-001",
  "name": "Task Manager",
  "version": "1.0.0",
  "description": "A simple task management application",
  "license": "MIT",
  "entities": [
    {
      "name": "Task",
      "tableName": "tasks",
      "fields": [
        {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "required": true
        },
        {
          "name": "title",
          "type": "string",
          "length": 200,
          "required": true
        },
        {
          "name": "completed",
          "type": "boolean",
          "default": false
        }
      ],
      "timestamps": true
    }
  ],
  "actions": [
    {
      "name": "createTask",
      "route": "/tasks",
      "description": "Create a new task with a title. Validate that the title is not empty. Return the created task with its generated ID.",
      "parameters": [
        {
          "name": "title",
          "in": "query",
          "description": "Task title",
          "required": true,
          "schema": {
            "type": "string",
            "minLength": 1,
            "maxLength": 200
          }
        }
      ],
      "responseFormat": "json"
    }
  ],
  "dataSources": [
    {
      "name": "mainDatabase",
      "type": "database",
      "config": {
        "driver": "postgresql",
        "host": "${DB_HOST}",
        "port": "${DB_PORT}",
        "database": "${DB_NAME}"
      }
    }
  ],
  "environment": [
    {
      "name": "DB_HOST",
      "description": "Database host",
      "required": true
    }
  ]
}
```

## Using Your Schema

Once you've defined your application in BlueSchema format:

1. **Validate** - Ensure your JSON conforms to BlueSchema schemas
2. **Generate Code** - Use BlueSchema-compatible code generators to create your application
3. **Iterate** - Update your schema as requirements change, regenerate code
4. **Share** - Use the schema as documentation for your team and AI tools

## Next Steps

- 📖 **[Explore All Schemas](/blueschema/schemas/)** - Deep dive into every schema available
- 🎯 **[See the Blog Example](/blueschema/examples/blog-app)** - Study a comprehensive real-world application
- 🏗️ **Build Your Own** - Start defining your application with BlueSchema
- 💡 **[Schema Reference](/blueschema/schemas/application)** - Detailed documentation for each schema

## Key Takeaways

✅ **BlueSchema creates shared context** between AI and humans  
✅ **Descriptions are prompts** that guide AI code generation  
✅ **Structure provides understanding** at every level  
✅ **Schemas are self-documenting** and immediately readable  
✅ **One definition, multiple outputs** - generate code for any framework  

---

<div style="background-color: #f6f8fa; padding: 20px; border-radius: 6px; border-left: 3px solid #28a745; margin: 20px 0;">
  <p style="margin: 0;"><strong>💡 Pro Tip</strong></p>
  <p style="margin: 10px 0 0 0;">Start small with a few entities and actions, then expand. BlueSchema grows with your application!</p>
</div>

Ready to explore more? Check out the [complete schema documentation](/blueschema/schemas/) or dive into the [blog application example](/blueschema/examples/blog-app).
