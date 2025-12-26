---
layout: default
title: Data Source Schema
---

# Data Source Schema

The **Data Source** schema configures database connections and data stores with driver-specific settings.

## Purpose

- **For AI:** Database connection specifications for generating configuration code
- **For Humans:** Clear documentation of data storage infrastructure
- **For Both:** Unambiguous connection details

## Properties

### `name` (required)
- **Type:** string
- **Description:** Data source identifier

### `type` (required)
- **Type:** string
- **Description:** Type of data source (usually "database")

### `config` (required)
- **Type:** object
- **Description:** Driver-specific configuration

Common config properties:
- `driver` - Database driver (postgresql, mysql, redis, mongodb)
- `host` - Server host
- `port` - Server port
- `database` - Database name
- `username` - Username
- `password` - Password

Use environment variables for sensitive values: `${ENV_VAR}`

## Examples

### PostgreSQL Database

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
    "password": "${DB_PASSWORD}",
    "ssl": true,
    "pool": {
      "min": 2,
      "max": 10
    }
  }
}
```

### Redis Cache

```json
{
  "name": "cacheStore",
  "type": "database",
  "config": {
    "driver": "redis",
    "host": "${REDIS_HOST}",
    "port": "${REDIS_PORT}",
    "password": "${REDIS_PASSWORD}",
    "ttl": 3600
  }
}
```

### MySQL Database

```json
{
  "name": "legacyDatabase",
  "type": "database",
  "config": {
    "driver": "mysql",
    "host": "${MYSQL_HOST}",
    "port": "3306",
    "database": "${MYSQL_DB}",
    "username": "${MYSQL_USER}",
    "password": "${MYSQL_PASSWORD}"
  }
}
```

### MongoDB

```json
{
  "name": "documentStore",
  "type": "database",
  "config": {
    "driver": "mongodb",
    "host": "${MONGO_HOST}",
    "port": "27017",
    "database": "${MONGO_DB}",
    "username": "${MONGO_USER}",
    "password": "${MONGO_PASSWORD}"
  }
}
```

## Best Practices

### Always Use Environment Variables

```json
// ✅ Good
"password": "${DB_PASSWORD}"

// ❌ Bad - never hardcode credentials
"password": "secret123"
```

### Include Connection Pooling

```json
"pool": {
  "min": 2,
  "max": 10
}
```

### Enable SSL for Production

```json
"ssl": true
```

## Related Schemas

- [Environment](/blueschema/schemas/environment) - Environment variables
- [Application](/blueschema/schemas/application) - Contains data sources
