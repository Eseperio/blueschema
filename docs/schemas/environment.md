---
layout: default
title: Environment Schema
---

# Environment Schema

The **Environment** schema specifies required environment variables for configuration, API keys, and secrets.

## Purpose

- **For AI:** Configuration requirements for generating setup documentation
- **For Humans:** Clear documentation of required configuration
- **For Both:** Explicit configuration contracts

## Properties

### `name` (required)
- **Type:** string
- **Description:** Environment variable name

Use UPPERCASE_SNAKE_CASE (e.g., `DATABASE_URL`, `API_KEY`).

### `description` (required)
- **Type:** string
- **Description:** Human-readable explanation of the variable's purpose

### `required` (required)
- **Type:** boolean
- **Description:** Whether the variable must be set

### `default` (optional)
- **Type:** string
- **Description:** Default value if not provided

## Examples

### Required Database Configuration

```json
{
  "name": "DB_HOST",
  "description": "PostgreSQL database host address",
  "required": true
}
```

### With Default Value

```json
{
  "name": "DB_PORT",
  "description": "PostgreSQL database port",
  "required": true,
  "default": "5432"
}
```

### Optional Configuration

```json
{
  "name": "LOG_LEVEL",
  "description": "Application log level (debug, info, warn, error)",
  "required": false,
  "default": "info"
}
```

### API Key

```json
{
  "name": "STRIPE_API_KEY",
  "description": "Stripe API key for payment processing",
  "required": true
}
```

### Secret

```json
{
  "name": "JWT_SECRET",
  "description": "Secret key for signing JWT tokens (minimum 32 characters)",
  "required": true
}
```

## Common Environment Variables

### Database

```json
{ "name": "DB_HOST", "description": "Database host", "required": true },
{ "name": "DB_PORT", "description": "Database port", "required": true, "default": "5432" },
{ "name": "DB_NAME", "description": "Database name", "required": true },
{ "name": "DB_USER", "description": "Database username", "required": true },
{ "name": "DB_PASSWORD", "description": "Database password", "required": true }
```

### Application

```json
{ "name": "APP_URL", "description": "Base application URL", "required": true },
{ "name": "APP_ENV", "description": "Environment (development, production)", "required": true, "default": "development" },
{ "name": "PORT", "description": "HTTP server port", "required": false, "default": "3000" }
```

### Authentication

```json
{ "name": "JWT_SECRET", "description": "JWT signing secret", "required": true },
{ "name": "JWT_EXPIRY", "description": "JWT token expiry time", "required": false, "default": "24h" }
```

### Email

```json
{ "name": "SMTP_HOST", "description": "SMTP server host", "required": true },
{ "name": "SMTP_PORT", "description": "SMTP server port", "required": true, "default": "587" },
{ "name": "SMTP_USER", "description": "SMTP username", "required": true },
{ "name": "SMTP_PASSWORD", "description": "SMTP password", "required": true }
```

## Best Practices

### Use Descriptive Names

```json
// ✅ Good
"DB_HOST"

// ❌ Bad
"H"
```

### Provide Helpful Descriptions

```json
// ✅ Good
"description": "JWT signing secret key. Must be at least 32 characters. Keep this value secret."

// ❌ Bad
"description": "Secret"
```

### Set Reasonable Defaults

```json
// ✅ Good
"default": "5432"  // Standard PostgreSQL port

// ❌ Bad
"default": "password123"  // Never default sensitive values
```

### Document Sensitive Variables

Clearly indicate which variables are secrets:

```json
{
  "name": "API_KEY",
  "description": "API key for external service. Keep this value secret and never commit to version control.",
  "required": true
}
```

## Related Schemas

- [DataSource](/blueschema/schemas/dataSource) - Uses environment variables
- [Application](/blueschema/schemas/application) - Contains environment definitions
