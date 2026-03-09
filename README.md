# UG Cake Server

A RESTful API server for the UG Cake e-commerce application. Built with **Express**, **TypeScript**, and **Prisma** (PostgreSQL).

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
echo 'PORT=5555
NODE_ENV=development
DATABASE_URL="postgresql://user:password@host/database"
JWT_ACCESS_SECRET="905e1bb017a5bf6b8c5fe4b0bd62e4a2fac56cc606702665218540d084ce0b0e"
JWT_REFRESH_SECRET="e37fe6d86e9ccde7ec257e3261b127b03d282495557b1290395a649c6b136ef2"' > .env

# 3. Setup database
npx prisma generate
npx prisma migrate dev

# 4. Start server
npm run dev
```

API runs at `http://localhost:5555/api/v1`

## Prerequisites

- **Node.js** v18+
- **PostgreSQL** database
- **npm** or **yarn**

## Installation & Configuration

```bash
git clone <repo-url>
cd ug-cake-server
npm install
```

Create `.env` file with your database and JWT configuration.

## Running the Server

| Command          | Description           |
| ---------------- | --------------------- |
| `npm run dev`    | Start with hot reload |
| `npm run build`  | Build TypeScript      |
| `npm run deploy` | Deploy to Vercel      |

## Base URL

```
http://localhost:5555/api/v1
```

## API Endpoints

### Health Check

- `GET /` - Server status

### Authentication

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/change-password` - Change password
- `POST /api/v1/auth/refresh-token` - Refresh token

### Cakes

- `GET /api/v1/cakes` - Get all cakes
- `POST /api/v1/cakes/create-cake` - Create cake
- `GET /api/v1/cakes/:id` - Get cake
- `PATCH /api/v1/cakes/update-cake/:id` - Update cake
- `DELETE /api/v1/cakes/delete-cake/:id` - Delete cake

### Orders

- `GET /api/v1/orders` - Get all orders
- `POST /api/v1/orders/create-order` - Create order
- `GET /api/v1/orders/:id` - Get order
- `PATCH /api/v1/orders/update-order/:id` - Update order
- `DELETE /api/v1/orders/delete-order/:id` - Delete order

### Carts

- `GET /api/v1/carts` - Get all carts
- `POST /api/v1/carts/create-cart` - Create cart
- `GET /api/v1/carts/:id` - Get cart
- `PATCH /api/v1/carts/update-cart/:id` - Update cart
- `DELETE /api/v1/carts/delete-cart/:id` - Delete cart

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user
- `PATCH /api/v1/users/update-user/:id` - Update user
- `DELETE /api/v1/users/delete-user/:id` - Delete user

### Ratings

- `GET /api/v1/ratings` - Get all ratings
- `POST /api/v1/ratings/create-rating` - Create rating
- `GET /api/v1/ratings/:id` - Get rating
- `PATCH /api/v1/ratings/update-rating/:id` - Update rating
- `DELETE /api/v1/ratings/delete-rating/:id` - Delete rating

## Usage Examples

### Register

```bash
curl -X POST http://localhost:5555/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123!","name":"User"}'
```

### Login

```bash
curl -X POST http://localhost:5555/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Pass123!"}'
```

### Get Cakes

```bash
curl http://localhost:5555/api/v1/cakes
```

### Use Token

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5555/api/v1/users
```

## Error Format

All errors follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "errorSources": [{ "path": "field", "message": "Details" }]
}
```

## Testing

Run tests with:

```bash
npm run build
npx ts-node comprehensive-test.ts
```

**Status:** ✅ 11/11 tests passing (100%)

See `TEST.md` for detailed results.

## Database Models

- **User** - Accounts & profiles
- **Cake** - Product catalog
- **Order** - Customer orders
- **Cart** - Shopping cart items
- **Rating** - Reviews & ratings

## Authentication

- JWT access tokens (7 days)
- Refresh tokens (30 days)
- Password hashing with bcryptjs
- HttpOnly secure cookies

## Project Structure

```
src/
├── modules/       # Feature modules
├── middlewares/   # Express middlewares
├── routes/        # Route aggregation
├── utils/         # Utilities
├── errors/        # Error handling
└── lib/           # Libraries
prisma/           # Database schema & migrations
TEST.md           # Test results & examples
README.md         # This file
```

## Deployment

Deploy to Vercel:

```bash
npm run deploy
```

Set environment variables in Vercel dashboard.

## Security

- ✅ Password hashing
- ✅ JWT authentication
- ✅ CORS configured
- ✅ Input validation
- ✅ Error handling
- ✅ Role-based access

## License

ISC
