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

## Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── auth/           # Authentication (register, login)
│   │   ├── users/          # User management
│   │   ├── profiles/       # User profiles
│   │   ├── cakes/          # Cake products
│   │   ├── cake-features/  # Cake specifications & nutrition
│   │   ├── categories/     # Cake categories
│   │   ├── orders/         # Order management
│   │   └── ratings/        # Cake ratings & reviews
│   ├── middlewares/        # Auth, error handling, validation
│   ├── errors/             # Custom error classes
│   ├── utils/              # Helper functions
│   └── config/             # Configuration
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
└── server.ts               # Server entry point
```

## Database Schema

**Models:**

- `User` - Authentication & user accounts
- `Profile` - Extended user info (name, phone, address)
- `Cake` - Cake products with pricing & stock
- `CakeFeatures` - Specifications, features, nutrition info
- `Category` - Cake categories
- `Order` - Customer orders with status tracking
- `Rating` - User reviews for cakes

**Enums:**

- `ROLE` - ADMIN, USER, DELIVERY_MAN, MODERATOR
- `CAKE_TYPE` - CUPCAKE, CAKE
- `STATUS` - PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- `PAYMENT_METHOD` - CASH_ON_DELIVERY, ONLINE

## API Endpoints

### Health Check

- `GET /` - Server status

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/change-password` - Change password
- `POST /api/v1/auth/refresh-token` - Refresh access token

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/update-user/:id` - Update user
- `DELETE /api/v1/users/delete-user/:id` - Delete user

### Profiles

- `GET /api/v1/profiles` - Get all profiles
- `POST /api/v1/profiles/create-profile` - Create profile
- `GET /api/v1/profiles/:id` - Get profile by ID
- `GET /api/v1/profiles/by-user/:userId` - Get profile by user ID
- `PATCH /api/v1/profiles/update-profile/:id` - Update profile
- `DELETE /api/v1/profiles/delete-profile/:id` - Delete profile

### Categories

- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories/create-category` - Create category
- `GET /api/v1/categories/:id` - Get category by ID
- `GET /api/v1/categories/by-name/:name` - Get category by name
- `PATCH /api/v1/categories/update-category/:id` - Update category
- `DELETE /api/v1/categories/delete-category/:id` - Delete category

### Cakes

- `GET /api/v1/cakes` - Get all cakes
- `POST /api/v1/cakes/create-cake` - Create cake
- `GET /api/v1/cakes/:id` - Get cake by ID
- `PATCH /api/v1/cakes/update-cake/:id` - Update cake
- `DELETE /api/v1/cakes/delete-cake/:id` - Delete cake

### Cake Features

- `GET /api/v1/cake-features` - Get all cake features
- `POST /api/v1/cake-features/create-cake-features` - Create cake features
- `GET /api/v1/cake-features/:id` - Get cake features by ID
- `GET /api/v1/cake-features/by-cake/:cakeId` - Get features by cake ID
- `PATCH /api/v1/cake-features/update-cake-features/:id` - Update features
- `DELETE /api/v1/cake-features/delete-cake-features/:id` - Delete features

### Orders

- `GET /api/v1/orders` - Get all orders
- `POST /api/v1/orders/create-order` - Create new order
- `GET /api/v1/orders/:id` - Get order by ID
- `PATCH /api/v1/orders/update-order/:id` - Update order status
- `DELETE /api/v1/orders/delete-order/:id` - Delete order

### Ratings

- `GET /api/v1/ratings` - Get all ratings
- `POST /api/v1/ratings/create-rating` - Create rating/review
- `GET /api/v1/ratings/:id` - Get rating by ID
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
npx ts-node test.ts
```

**Status:** ✅ 11/11 tests passing (100%)

See `TEST.md` for detailed results.

## Database Models

- **User** - Accounts & profiles
- **Cake** - Product catalog
- **Order** - Customer orders
- **Cart** - Shopping cart items
- **Rating** - Reviews & ratings

## Authentication System

- JWT access tokens (7 days)
- Refresh tokens (30 days)
- Password hashing with bcryptjs
- HttpOnly secure cookies

## Deployment

Deploy to Vercel(Manual):

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
