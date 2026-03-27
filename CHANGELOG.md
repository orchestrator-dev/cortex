# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Upgraded `@typescript-eslint` from v7 to v8 to support TypeScript 5.9
- Fixed 26 ESLint errors across `cortex-server` (unused imports, unused vars, explicit `any`)
- Added `httpx` dev dependency to `cortex-ai-worker` for FastAPI test client support

## [0.1.0] - 2026-03-12

### Added
- Initial monorepo scaffold with Turborepo (cortex-server, cortex-admin, cortex-ai-worker, cortex-cli)
- **cortex-server**: Fastify server with Drizzle ORM, PostgreSQL, and content engine
- **cortex-server**: GraphQL layer (Pothos + graphql-yoga) with queries, mutations, and subscriptions
- **cortex-server**: Webhook delivery system with BullMQ and HMAC-SHA256 signing
- **cortex-server**: Authentication (Lucia v3 session-based) and API key authentication
- **cortex-server**: Role-Based Access Control (RBAC) engine with field-level permissions
- **cortex-admin**: React 19 admin panel scaffold with Vite
- **cortex-ai-worker**: FastAPI-based AI pipeline worker with uv package management
- Comprehensive unit test suites for all server modules (86 tests passing)
- README with architecture overview and quick-start guide
