# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Umikyo REST API — an Express 5 + MongoDB e-commerce backend (CommonJS). Manages users, products, categories, and orders. Ported from a Go version.

## Commands

```bash
npm start          # Run the server (node index.js)
npm install        # Install dependencies
```

No test framework is configured. No linter is configured.

## Environment

Requires a `.env` file (see `.env.example`):
- `PORT` — server port (default 5000)
- `DATABASE_HOST` — MongoDB Atlas connection string
- `PRIVATE_KEY_TOKEN` — JWT signing secret

## Architecture

**Entry point:** `index.js` — creates Express app, connects to MongoDB, mounts all routes under `/api`.

**Request flow:** `index.js` → `routes/index.js` → `handlers/*` → `db/services.js` → `db/connection.js` → MongoDB

### Key layers

- **`db/connection.js`** — singleton MongoDB client. `dbConnect()` initializes the connection; `collection(name)` returns a collection handle from the `umikyodb` database.
- **`db/services.js`** — `Field` class wraps a collection name and provides `getOne`, `getMany`, `getAll`, `insert`, `insertBulk`, `update`, `updateBulk`. All handlers instantiate `new Field("CollectionName")` to interact with the database.
- **`handlers/`** — each file exports a single Express route handler function. Handlers use `Field` for DB access and helpers from `libs/` for responses.
- **`libs/errorHandler.js`** — `sendErrorResponse`, `errorAuthorization`, `errorAuthentication` for standardized error responses.
- **`libs/successHandler.js`** — `responseSuccess(data)` wraps data in `{ status: 202, msg: "Created", data }`.
- **`libs/tokenHandler.js`** — `generateToken(email)` creates a JWT with 30-minute expiry.
- **`middleware/authorization.js`** — authorization middleware (currently disabled/commented out).
- **`routes/index.js`** — single flat router, all endpoints registered here.

### MongoDB collections used

`Users`, `Products`, `Categories`, `Testing` (used by createProduct, createCategory, submitOrder, getStatusOrder as a staging/test collection).

### API endpoints (all under `/api`)

| Method | Path | Handler |
|--------|------|---------|
| POST | /registerUser | registerUser (stub) |
| POST | /userLogin | userLogin |
| GET | /getUsers | getUsers |
| POST | /changeStatUser | changeStatUser |
| POST | /validationToken | validationToken |
| POST | /addProduct | createProduct |
| GET | /getProducts | getProducts |
| POST | /addCategory | createCategory |
| GET | /getCategories | getCategories |
| POST | /submitOrder | submitOrder |
| GET | /getStatusOrder | getStatusOrder |

### Conventions

- CommonJS modules (`require`/`module.exports`), not ESM.
- Handlers are one-function-per-file, exported directly (not as named export on an object).
- Password hashing uses `bcryptjs`.
- No request validation library; validation is done manually in handlers.
