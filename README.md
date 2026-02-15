# UG Cake Server

API server for the UG Cake application. Built with **Express**, **TypeScript**, and **Prisma** (PostgreSQL).

## Getting started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Install and run

```bash
npm install
# Create .env and set DATABASE_URL (PostgreSQL connection string)
npx prisma generate
npx prisma migrate dev   # or push for existing DB
npm run dev
```

The server runs at `http://localhost:3000` (or the port in your config).

### Scripts

| Script           | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start dev server (ts-node-dev)     |
| `npm run build`  | Prisma generate + TypeScript build |
| `npm run deploy` | Deploy to Vercel (prod)            |

---

## Base URL

All API routes are prefixed with:

```
/api/v1
```

---

## API Routes overview

| Resource | Base path | Create               | List    | Get one    | Update                    | Delete                     |
| -------- | --------- | -------------------- | ------- | ---------- | ------------------------- | -------------------------- |
| Carts    | `/carts`  | `POST /create-cart`  | `GET /` | `GET /:id` | `PATCH /update-cart/:id`  | `DELETE /delete-cart/:id`  |
| Cakes    | `/cakes`  | `POST /create-cake`  | `GET /` | `GET /:id` | `PATCH /update-cake/:id`  | `DELETE /delete-cake/:id`  |
| Orders   | `/orders` | `POST /create-order` | `GET /` | `GET /:id` | `PATCH /update-order/:id` | `DELETE /delete-order/:id` |
| Users    | `/users`  | `POST /create-user`  | `GET /` | `GET /:id` | `PATCH /update-user/:id`  | `DELETE /delete-user/:id`  |

---

## API Routes

### Carts

| Method   | Endpoint                        | Description                  |
| -------- | ------------------------------- | ---------------------------- |
| `POST`   | `/api/v1/carts/create-cart`     | Create a new cart item       |
| `GET`    | `/api/v1/carts`                 | Get all cart items           |
| `GET`    | `/api/v1/carts/:id`             | Get a single cart item by ID |
| `PATCH`  | `/api/v1/carts/update-cart/:id` | Update a cart item           |
| `DELETE` | `/api/v1/carts/delete-cart/:id` | Delete a cart item           |

#### `POST /api/v1/carts/create-cart`

Create a new cart entry for the authenticated user.

**Request body:**

```json
{
  "cakeId": "uuid",
  "quantity": 1
}
```

- `cakeId` (required): UUID of the cake to add
- `quantity` (required): Number of items (must be between 1 and cake stock)

**Response:** `201 Created` — Cart created successfully.

---

#### `GET /api/v1/carts`

Returns all cart items.

**Response:** `200 OK` — List of cart items.

---

#### `GET /api/v1/carts/:id`

Returns a single cart item by ID.

**URL parameters:**

- `id` — Cart item UUID

**Response:** `200 OK` — Cart item details.

---

#### `PATCH /api/v1/carts/update-cart/:id`

Update an existing cart item.

**URL parameters:**

- `id` — Cart item UUID

**Request body:**

```json
{
  "payload": {
    "quantity": 2
  }
}
```

- `payload`: Object with fields to update (e.g. `quantity`).

**Response:** `200 OK` — Updated cart item.

---

#### `DELETE /api/v1/carts/delete-cart/:id`

Remove a cart item.

**URL parameters:**

- `id` — Cart item UUID

**Response:** `200 OK` — Cart deleted successfully.

---

### Cakes

| Method   | Endpoint                        | Description             |
| -------- | ------------------------------- | ----------------------- |
| `POST`   | `/api/v1/cakes/create-cake`     | Create a new cake       |
| `GET`    | `/api/v1/cakes`                 | Get all cakes           |
| `GET`    | `/api/v1/cakes/:id`             | Get a single cake by ID |
| `PATCH`  | `/api/v1/cakes/update-cake/:id` | Update a cake           |
| `DELETE` | `/api/v1/cakes/delete-cake/:id` | Delete a cake           |

#### `POST /api/v1/cakes/create-cake`

**Request body:**

```json
{
  "title": "Chocolate Cake",
  "description": "Rich chocolate cake",
  "price": 29.99,
  "image": "https://...",
  "type": "birthday",
  "flavors": ["chocolate", "vanilla"],
  "weights": ["1kg", "2kg"],
  "category": "birthday",
  "stock": 10,
  "isActive": true,
  "isCustomizable": false,
  "isNew": true,
  "isBestSeller": false,
  "isSale": false,
  "isTrending": false,
  "isSpecial": false
}
```

Required: `title`, `description`, `price`, `image`, `type`, `category`. Others have defaults.

**Response:** `201 Created` — Cake created successfully.

---

#### `GET /api/v1/cakes` — List all cakes. **Response:** `200 OK`

#### `GET /api/v1/cakes/:id` — Get one cake by ID. **Response:** `200 OK` or `404 Not Found`

#### `PATCH /api/v1/cakes/update-cake/:id`

**Request body:** `{ "payload": { "stock": 5, "title": "..." } }` — fields to update.

**Response:** `200 OK` — Updated cake.

#### `DELETE /api/v1/cakes/delete-cake/:id` — **Response:** `200 OK`

---

### Orders

| Method   | Endpoint                          | Description              |
| -------- | --------------------------------- | ------------------------ |
| `POST`   | `/api/v1/orders/create-order`     | Create a new order       |
| `GET`    | `/api/v1/orders`                  | Get all orders           |
| `GET`    | `/api/v1/orders/:id`              | Get a single order by ID |
| `PATCH`  | `/api/v1/orders/update-order/:id` | Update an order          |
| `DELETE` | `/api/v1/orders/delete-order/:id` | Delete an order          |

#### `POST /api/v1/orders/create-order`

**Request body:**

```json
{
  "userId": "uuid",
  "cakeId": "uuid",
  "quantity": 2,
  "totalPrice": 59.98,
  "status": "PENDING",
  "paymentMethod": "COD",
  "message": "Optional note"
}
```

Required: `userId`, `cakeId`, `totalPrice`. Defaults: `quantity` 1, `status` `"PENDING"`, `paymentMethod` `"COD"`.  
`status`: `PENDING` \| `PROCESSING` \| `SHIPPED` \| `DELIVERED` \| `CANCELLED`.  
`paymentMethod`: `COD` \| `ONLINE`.

**Response:** `201 Created` — Order created successfully.

---

#### `GET /api/v1/orders` — List all orders. **Response:** `200 OK`

#### `GET /api/v1/orders/:id` — Get one order. **Response:** `200 OK` or `404 Not Found`

#### `PATCH /api/v1/orders/update-order/:id` — Body: `{ "payload": { "status": "SHIPPED" } }`. **Response:** `200 OK`

#### `DELETE /api/v1/orders/delete-order/:id` — **Response:** `200 OK`

---

### Users

| Method   | Endpoint                        | Description             |
| -------- | ------------------------------- | ----------------------- |
| `POST`   | `/api/v1/users/create-user`     | Create a new user       |
| `GET`    | `/api/v1/users`                 | Get all users           |
| `GET`    | `/api/v1/users/:id`             | Get a single user by ID |
| `PATCH`  | `/api/v1/users/update-user/:id` | Update a user           |
| `DELETE` | `/api/v1/users/delete-user/:id` | Delete a user           |

#### `POST /api/v1/users/create-user`

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret",
  "address": "123 Main St",
  "phone": "+1234567890",
  "role": "USER",
  "image": "",
  "isActive": true,
  "isVerified": false,
  "isDeleted": false,
  "isBlocked": false,
  "isSuspended": false
}
```

Required: `name`, `email`, `password`, `address`, `phone`. Defaults: `role` `"USER"`, `image` `""`, booleans as above.  
`role`: `ADMIN` \| `USER` \| `MODERATOR`.

**Response:** `201 Created` — User created successfully.

---

#### `GET /api/v1/users` — List all users. **Response:** `200 OK`

#### `GET /api/v1/users/:id` — Get one user. **Response:** `200 OK` or `404 Not Found`

#### `PATCH /api/v1/users/update-user/:id` — Body: `{ "payload": { "name": "..." } }`. **Response:** `200 OK`

#### `DELETE /api/v1/users/delete-user/:id` — **Response:** `200 OK`

---

## Root

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| `GET`  | `/`      | Welcome message |

#### `GET /`

Returns a simple welcome response.

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Welcome to api of ug-cake!"
}
```

---

## Response format

Success responses use a consistent shape:

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

Errors are handled by the global error handler and return appropriate HTTP status codes and error messages.

## Authentication

Cart create/update/delete operations expect an authenticated user (`req.user`). Ensure a valid auth middleware or JWT is in place when calling those endpoints.

---

## Deploy with Vercel

The project is set up for [Vercel](https://vercel.com) (zero-config Express). The app entry is `src/app.ts`, which exports the Express app.

### Prerequisites

- [Vercel CLI](https://vercel.com/docs/cli) (e.g. `npm i -g vercel` or use `npx vercel`)
- Environment variables (e.g. `DATABASE_URL`) configured in the [Vercel project settings](https://vercel.com/docs/projects/environment-variables)

### Deploy to production

1. Log in (if needed): `vercel login`
2. From the project root, deploy:
   ```bash
   vercel --prod
   ```
   Or with npx: `npx vercel --prod`
3. When prompted, link the project to your Vercel account/team and confirm. Your API will be available at the URL Vercel prints (e.g. `https://ug-cake-server-xxx.vercel.app`).

### Build on Vercel

- **Build command:** `prisma generate && npm run build` (set in `vercel.json`)
- **Output:** Express runs as a serverless function; no custom output directory is required.
