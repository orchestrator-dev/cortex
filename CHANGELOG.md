# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-27

### Added
- **cortex-ai-worker**: Full service bootstrap — FastAPI app factory with lifespan management
- **cortex-ai-worker**: Pydantic Settings configuration with env var loading
- **cortex-ai-worker**: asyncpg connection pool with FastAPI dependency injection
- **cortex-ai-worker**: Embedding providers — Ollama, OpenAI, and Cohere with abstract base class
- **cortex-ai-worker**: pgvector index manager with HNSW indexing (m=16, ef_construction=64)
- **cortex-ai-worker**: BullMQ-compatible Redis queue consumer for async job processing
- **cortex-ai-worker**: Embedding worker with sentence-boundary chunking
- **cortex-ai-worker**: Health (`GET /health`) and readiness (`GET /ready`) endpoints
- **cortex-ai-worker**: Semantic search endpoint (`POST /search`) with ACL filtering
- **cortex-ai-worker**: Multi-stage Dockerfile for production builds
- **cortex-ai-worker**: Docker Compose service configuration
- **cortex-ai-worker**: 23 unit tests covering providers, index manager, consumer, and health

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
