# SportsLine – REST API (TypeScript + Express + Sequelize + Postgres)

SportsLine is a simple sales/orders API with JWT authentication, built on **TypeScript**, **Express**, **Sequelize** (PostgreSQL), **Zod** validation, and **JWT** for auth.

> **Heads-up**: In the current code, **all `/api` routes are protected by `requireAuth`**, and your `auth` routes are mounted **inside** `/api`. That means `/api/auth/register` and `/api/auth/login` will also require a token. If you want to allow public auth, expose `/auth` before applying the `requireAuth` middleware (see note in _Auth_ section).

---

## Tech Stack

- **Runtime:** Node.js 20, TypeScript
- **Web:** Express
- **ORM:** Sequelize (PostgreSQL)
- **Validation:** Zod
- **Auth:** JWT (Bearer)
- **Dev:** nodemon, ts-node
- **Containerization:** Docker & Docker Compose
- **Package manager:** pnpm

---

## Project Structure

```
SportsLine/
├─ Dockerfile
├─ docker-compose.yml
├─ docker-entrypoint.sh
├─ wait-for-db.sh
├─ nodemon.json
├─ package.json
├─ tsconfig.json
├─ tsconfig.build.json
├─ src/
│  ├─ app.ts
│  ├─ config/
│  │  └─ database.ts
│  ├─ controllers/
│  │  ├─ auth.controller.ts
│  │  ├─ customers.controller.ts
│  │  ├─ orders.controller.ts
│  │  └─ products.controller.ts
│  ├─ middlewares/
│  │  ├─ auth.middleware.ts
│  │  ├─ authorize.middleware.ts
│  │  ├─ unique-code.middleware.ts
│  │  ├─ unique-document.middleware.ts
│  │  └─ validate.middleware.ts
│  ├─ models/
│  │  ├─ customer.model.ts
│  │  ├─ product.model.ts
│  │  ├─ order.model.ts
│  │  ├─ user.model.ts
│  │  └─ index.models.ts
│  ├─ routes/
│  │  ├─ auth.route.ts
│  │  ├─ customers.route.ts
│  │  ├─ orders.route.ts
│  │  └─ main.routes.ts
│  ├─ schemas/
│  │  ├─ customer.schema.ts
│  │  ├─ product.schema.ts
│  │  └─ order.schema.ts
│  └─ seeders/
│     └─ index.seeders.ts
└─ .dockerignore / .gitignore / README.md
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=super_secret_change_me
SALT_ROUNDS=10
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sportsline
DB_USER=postgres
DB_PASSWORD=postgres
```

---

## Running Locally

```bash
git clone https://github.com/Susilvav03/SportsLine.git
cd SportsLine/
pnpm install
pnpm run dev
```

---

## Running with Docker

```bash
docker compose build --no-cache
docker compose up -d
docker compose logs -f app
```

Stop:
```bash
docker compose down
```

---

## Endpoints Summary

### Auth
`POST /auth/register` – Register user  
`POST /auth/login` – Login and get JWT

### Customers
`GET /api/customers` – List customers  
`POST /api/customers` – Create customer  
`GET /api/customers/:id` – Get customer  
`PATCH /api/customers/:id` – Update customer  
`DELETE /api/customers/:id` – Delete customer

### Products
`GET /api/products` – List products  
`POST /api/products` – Create product  
`PATCH /api/products/:id` – Update product  
`DELETE /api/products/:id` – Soft delete

### Orders
`GET /api/orders` – List orders  
`POST /api/orders` – Create order  
`GET /api/orders/:id` – Get order  
`PATCH /api/orders/:id/status` – Update status

---

## Common Status Codes

| Code | Description |
|------|--------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |
