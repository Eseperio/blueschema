---
layout: default
title: Service Schema
---

# Service Schema

The **Service** schema defines external services and integrations your application uses. Like actions, the `description` field acts as **an AI prompt** that guides service implementation.

## Purpose

Services create shared understanding of dependencies:

- **For AI:** Implementation prompts that specify exactly how to build the service
- **For Humans:** Clear documentation of what services do and how they work
- **For Both:** A contract for service behavior that eliminates ambiguity

## Properties

### `title` (required)
- **Type:** string
- **Description:** Service identifier

The service name used to reference it from actions. Use camelCase (e.g., `emailService`, `paymentService`).

**Example:**
```json
"title": "emailService"
```

### `description` (required)
- **Type:** string
- **Description:** **This is the AI prompt** - detailed explanation of what the service does

Write comprehensive descriptions that include:
- What the service does
- How it should work
- What methods/functions it provides
- Error handling expectations
- Integration details

**Example:**
```json
"description": "Send transactional emails including welcome emails, password reset emails, and notifications. Use templates for consistent formatting. Handle email delivery failures gracefully by logging errors and retrying up to 3 times with exponential backoff."
```

## Complete Examples

### Email Service

```json
{
  "title": "emailService",
  "description": "Send transactional emails including welcome emails, password reset emails, and notifications. Use templates for consistent formatting. Handle email delivery failures gracefully by logging errors and retrying up to 3 times with exponential backoff. Support both HTML and plain text formats."
}
```

**What AI generates:**
- Email sending functionality
- Template engine integration
- Retry logic with exponential backoff
- Error logging
- HTML and plain text support

**What humans understand:**
- Service handles all email communications
- Uses templates for consistency
- Has built-in retry mechanism
- Supports multiple formats

### Authentication Service

```json
{
  "title": "authService",
  "description": "Handle user authentication and authorization. Verify credentials by comparing hashed passwords using bcrypt with salt rounds of 10. Generate JWT tokens with user ID and role, valid for 24 hours. Validate tokens on protected routes. Manage user sessions. Support token refresh with 7-day refresh tokens."
}
```

**What AI generates:**
- Password hashing with bcrypt (10 rounds)
- JWT token generation (24 hour expiry)
- Token validation middleware
- Session management
- Refresh token logic (7 days)

**What humans understand:**
- Handles all auth operations
- Uses bcrypt for security
- JWT-based authentication
- 24-hour access tokens, 7-day refresh tokens

### Slug Generation Service

```json
{
  "title": "slugService",
  "description": "Generate URL-friendly slugs from strings. Convert to lowercase, replace spaces with hyphens, remove special characters except hyphens. Ensure uniqueness by checking database and appending incremental numbers if needed (e.g., my-post, my-post-2, my-post-3). Limit slug length to 255 characters."
}
```

**What AI generates:**
- String to slug conversion
- Character transformations
- Uniqueness checking
- Number appending logic
- Length limiting

**What humans understand:**
- Creates SEO-friendly URLs
- Handles duplicates automatically
- Follows standard conventions

### Payment Processing Service

```json
{
  "title": "paymentService",
  "description": "Process payments through Stripe API. Support credit card and ACH payments. Validate payment amounts and currency. Create payment intents and handle 3D Secure authentication. Process refunds with reason codes. Handle webhooks for payment status updates. Store transaction records securely. Implement idempotency to prevent duplicate charges using transaction IDs."
}
```

**What AI generates:**
- Stripe API integration
- Payment method support (card, ACH)
- 3D Secure handling
- Refund functionality
- Webhook processing
- Idempotency logic
- Transaction logging

### Storage Service

```json
{
  "title": "storageService",
  "description": "Manage file uploads to AWS S3. Support image, PDF, and document uploads. Validate file types and sizes (max 10MB). Generate unique filenames using UUIDs. Create presigned URLs for secure downloads valid for 1 hour. Automatically set appropriate content types. Organize files by date in folder structure (year/month/day). Support file deletion with confirmation."
}
```

**What AI generates:**
- S3 integration
- File validation (type, size)
- UUID filename generation
- Presigned URL creation
- Content type handling
- Folder organization
- Delete operations

### Notification Service

```json
{
  "title": "notificationService",
  "description": "Send in-app notifications to users about comment approvals, new comments on their posts, and system updates. Support multiple notification channels: email, push notifications, and in-app alerts. Queue notifications for batch processing. Allow users to set notification preferences. Mark notifications as read. Delete old notifications after 90 days."
}
```

**What AI generates:**
- Multi-channel notification system
- Notification queuing
- User preferences handling
- Read status tracking
- Cleanup job for old notifications

### Cache Service

```json
{
  "title": "cacheService",
  "description": "Provide caching layer using Redis. Support get, set, and delete operations. Allow setting TTL (time-to-live) for cached items. Implement cache invalidation patterns for entity updates. Use namespace prefixes to organize cache keys. Handle connection failures gracefully by falling back to direct database queries. Provide cache statistics for monitoring."
}
```

**What AI generates:**
- Redis client setup
- Basic cache operations
- TTL support
- Invalidation logic
- Namespacing
- Fallback handling
- Statistics tracking

## Writing Effective Service Descriptions

Service descriptions are AI prompts. Here's how to write effective ones:

### ✅ Good Descriptions

**Specific Implementation Details:**
```json
"description": "Send SMS messages via Twilio API. Format phone numbers to E.164 standard. Retry failed sends up to 3 times with 30-second delays. Log all attempts. Support both transactional (immediate) and marketing (scheduled) messages. Validate phone numbers before sending. Track delivery status via webhooks."
```

**Clear Behavior Specifications:**
```json
"description": "Search functionality using Elasticsearch. Index documents with full-text search on title and content fields. Support fuzzy matching with max edit distance of 2. Return results sorted by relevance score. Implement pagination with configurable page size. Highlight matching terms in results. Update index in real-time when documents change."
```

**Error Handling Included:**
```json
"description": "Process background jobs using a queue system. Execute jobs asynchronously with configurable concurrency (default 5 workers). Retry failed jobs up to 3 times with exponential backoff. Move permanently failed jobs to dead letter queue. Log all job executions. Support job prioritization. Provide job status monitoring endpoint."
```

### ❌ Bad Descriptions

**Too Vague:**
```json
"description": "Handle payments"  // How? What provider? What features?
```

**Missing Details:**
```json
"description": "Send emails to users"  // What about templates? Retries? Formats?
```

**Ambiguous:**
```json
"description": "Manage files"  // Upload? Download? Where? How?
```

## Best Practices

### 1. Be Comprehensive

Include all important details in the description:
- What the service does
- How it works
- Integration details
- Error handling
- Security considerations

### 2. Specify Third-Party Integrations

Mention specific services or APIs:

```json
{
  "title": "analyticsService",
  "description": "Track user events using Google Analytics 4. Send page views, custom events, and conversion tracking. Use measurement protocol for server-side tracking..."
}
```

### 3. Define Error Handling

Explain how errors should be handled:

```json
"description": "...Handle API rate limits by implementing exponential backoff. Log all errors with context. Fallback to local processing if external service is unavailable for more than 5 minutes."
```

### 4. Include Security Requirements

Specify security measures:

```json
"description": "...Encrypt sensitive data before storage using AES-256. Use secure random tokens for reset links valid for 1 hour. Never log passwords or tokens..."
```

### 5. Document Integration Points

Explain how the service integrates:

```json
"description": "...Connect to Stripe webhook endpoint at /webhooks/stripe. Verify webhook signatures. Process events asynchronously to prevent timeout..."
```

## Common Service Patterns

### Authentication & Authorization

```json
{
  "title": "authService",
  "description": "Handle authentication with JWT tokens. Hash passwords with bcrypt. Validate tokens. Manage sessions."
}
```

### Email & Communication

```json
{
  "title": "emailService",
  "description": "Send transactional emails with templates. Handle delivery failures with retries."
}
```

### File Storage

```json
{
  "title": "storageService",
  "description": "Upload files to cloud storage. Generate secure download URLs. Validate file types and sizes."
}
```

### Payment Processing

```json
{
  "title": "paymentService",
  "description": "Process payments through payment gateway. Handle refunds. Track transactions."
}
```

### Search

```json
{
  "title": "searchService",
  "description": "Full-text search with relevance ranking. Support filters and facets. Update index in real-time."
}
```

### Notifications

```json
{
  "title": "notificationService",
  "description": "Send multi-channel notifications. Support email, push, and in-app. Queue for batch processing."
}
```

## Using Services in Actions

Reference services in actions using `useServices`:

```json
{
  "name": "register",
  "description": "Register new user account...",
  "useServices": ["emailService", "authService"],  // ← Service dependencies
  "parameters": [/* ... */]
}
```

This tells AI that:
- The action needs these services
- Code should call service methods
- Services must be available/injected

## Related Schemas

- [Action](/blueschema/schemas/action) - Actions use services
- [Application](/blueschema/schemas/application) - Root schema containing services
- [Environment](/blueschema/schemas/environment) - Configuration for services

## Next Steps

- 📖 Learn about [Actions](/blueschema/schemas/action) that use services
- 🔧 Explore [Environment](/blueschema/schemas/environment) for service configuration
- 🎯 See the [Blog Example](/blueschema/examples/blog-app) for service examples

---

**Remember:** Service descriptions are AI prompts. Be specific, comprehensive, and include implementation details to get the best results.
