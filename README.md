# UG Cake Server

API server for the UG Cake application. Built with Express, TypeScript, and Prisma.

## Base URL

All API routes are prefixed with:

```
/api/v1
```

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
