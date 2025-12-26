---
layout: default
title: Validation Schema
---

# Validation Schema

Specifies validation rules for fields including length constraints, patterns, formats, and value ranges.

## Purpose

- **For AI:** Validation specifications for generating validation code
- **For Humans:** Clear data quality rules
- **For Both:** Unambiguous validation contracts

## Properties

### String Validation

- `minLength` - Minimum string length
- `maxLength` - Maximum string length
- `pattern` - Regular expression pattern
- `format` - Predefined format (email, url, uuid, date, etc.)

### Numeric Validation

- `minimum` - Minimum value
- `maximum` - Maximum value
- `multipleOf` - Value must be multiple of this number

### Array Validation

- `minItems` - Minimum array length
- `maxItems` - Maximum array length
- `uniqueItems` - All items must be unique

## Examples

### Email Validation

```json
{
  "type": "string",
  "format": "email",
  "maxLength": 255
}
```

### Password Validation

```json
{
  "type": "string",
  "minLength": 8,
  "maxLength": 100,
  "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
}
```

### Age Validation

```json
{
  "type": "integer",
  "minimum": 0,
  "maximum": 150
}
```

### Price Validation

```json
{
  "type": "number",
  "minimum": 0,
  "multipleOf": 0.01
}
```

### URL Validation

```json
{
  "type": "string",
  "format": "url"
}
```

## Common Formats

- `email` - Email address
- `url` - URL
- `uri` - URI
- `uuid` - UUID
- `date` - Date (YYYY-MM-DD)
- `date-time` - ISO 8601 date-time
- `ipv4` - IPv4 address
- `ipv6` - IPv6 address

## Related Schemas

- [Field](/blueschema/schemas/field) - Field definitions
- [Parameter](/blueschema/schemas/parameter) - Parameter validation
