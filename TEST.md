# API Testing Guide

**Last Updated:** Mar 11, 2026  
**API Base URL:** `http://localhost:5555/api/v1`

---

## Quick Start

```bash
# 1. Start the development server
npm run dev

# 2. Run test suite (in another terminal)
npx ts-node test.ts
```

---

## Testing Strategy

### 1. **System Tests**

- Server health check
- Error handling for invalid endpoints

### 2. **Authentication Tests**

- User registration with role assignment
- User login with JWT token generation
- Password change flow
- Token refresh mechanism

### 3. **CRUD Operations**

Test all modules with Create, Read, Update, Delete operations:

- Users & Profiles
- Categories
- Cakes & Cake Features
- Orders
- Ratings

---

## Sample API Requests

### Authentication

**Register User**

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "USER"
}
```

**Login User**

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Users & Profiles

**Create Profile**

```bash
POST /api/v1/profiles/create-profile
Content-Type: application/json

{
  "userId": "user-uuid",
  "name": "John Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City",
  "image": "https://example.com/image.jpg"
}
```

### Categories

**Create Category**

```bash
POST /api/v1/categories/create-category
Content-Type: application/json

{
  "name": "Wedding Cakes",
  "image": "https://example.com/wedding.jpg"
}
```

### Cakes

**Create Cake**

```bash
POST /api/v1/cakes/create-cake
Content-Type: application/json

{
  "sku": "CAKE-001",
  "title": "Chocolate Cake",
  "description": "Rich chocolate cake",
  "images": ["https://example.com/cake1.jpg"],
  "price": 2500,
  "category": "Wedding Cakes",
  "type": "CAKE",
  "customizable": true,
  "stock": 10,
  "size": "Medium",
  "flavour": "Chocolate"
}
```

**Create Cake Features**

```bash
POST /api/v1/cake-features/create-cake-features
Content-Type: application/json

{
  "cakeId": "cake-uuid",
  "specificationsLabel": ["Size", "Flavor"],
  "specificationValue": ["Medium", "Chocolate"],
  "features": ["Customizable", "Delivery Available"],
  "nutritionLabel": ["Calories", "Sugar"],
  "nutritionValue": ["250 kcal", "20g"]
}
```

### Orders

**Create Order**

```bash
POST /api/v1/orders/create-order
Content-Type: application/json

{
  "userId": "user-uuid",
  "cakeId": "cake-uuid",
  "quantity": 1,
  "totalPrice": 2500,
  "status": "PENDING",
  "paymentMethod": "CASH_ON_DELIVERY",
  "message": "Please deliver before 5 PM"
}
```

### Ratings

**Create Rating**

```bash
POST /api/v1/ratings/create-rating
Content-Type: application/json

{
  "userId": "user-uuid",
  "cakeId": "cake-uuid",
  "rating": 5,
  "review": "Excellent cake! Highly recommended."
}
```

---

## Expected Response Format

All API responses follow this structure:

**Success Response**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    /* response data */
  }
}
```

**Error Response**

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## HTTP Status Codes

| Code | Meaning               | Use Case                   |
| ---- | --------------------- | -------------------------- |
| 200  | OK                    | GET/PATCH successful       |
| 201  | Created               | POST successful            |
| 400  | Bad Request           | Invalid request data       |
| 401  | Unauthorized          | Missing/invalid auth token |
| 403  | Forbidden             | Insufficient permissions   |
| 404  | Not Found             | Resource doesn't exist     |
| 500  | Internal Server Error | Server error               |

---

## Database Models

### User

- `id` (UUID, primary key)
- `email` (unique)
- `password` (hashed)
- `role` (ADMIN, USER, DELIVERY_MAN, MODERATOR)
- `isDeleted` (soft delete)
- Timestamps

### Profile

- `id` (UUID, primary key)
- `userId` (FK to User)
- `name`
- `image`
- `phone`
- `address`

### Cake

- `id` (UUID, primary key)
- `sku` (unique)
- `title`
- `description`
- `images` (array)
- `price`
- `category` (FK)
- `type` (CUPCAKE, CAKE)
- `customizable` (boolean)
- `stock`
- `size`
- `flavour`
- `soldAmount`
- `isBestSeller`

### CakeFeatures

- `id` (UUID, primary key)
- `cakeId` (FK, unique)
- Specification arrays
- Feature arrays
- Nutrition arrays

### Category

- `id` (UUID, primary key)
- `name` (unique)
- `image`

### Order

- `id` (UUID, primary key)
- `userId` (FK)
- `cakeId` (FK)
- `quantity`
- `totalPrice`
- `status` (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- `paymentMethod` (CASH_ON_DELIVERY, ONLINE)
- `message`
- Timestamps

### Rating

- `id` (UUID, primary key)
- `userId` (FK)
- `cakeId` (FK)
- `rating` (1-5)
- `review`
- Timestamps

````

### ✅ User Login

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/login`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"User logged in successfully","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMjg5N2JmLTQ4NjgtNGY4NC05MTljLTY4YmM1ZTJlNjlkOSIsImVtYWlsIjoidGVzdHVzZXIxNzczMTcyNDgzNzMwQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NzMxNzI0ODQsImV4cCI6MTc3Mzc3NzI4NH0.yR_zeWvy0Y4JGbGuatIN79iZNlIXSjDPZpGiRmee9m0"}}
````

### ✅ Login with Invalid Credentials (Negative Test)

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/login`
- **Status Code:** 400 Bad Request
- **Response:**

```json
{
  "success": false,
  "message": "Invalid email or password",
  "errorSources": [{ "path": "", "message": "Invalid email or password" }],
  "stack": "Error: Invalid email or password\n    at Object.loginUser (/Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/auth/auth.service.ts:43:11)\n    at /Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/auth/auth.controller.ts:23:16"
}
```

## Cakes Tests (1/4 Passed) ⚠️

### ❌ CREATE Cake

- **Endpoint:** `POST http://localhost:5555/api/v1/cakes/create-cake`
- **Status Code:** 500 Internal Server Error
- **Response:**

```json
{"success":false,"message":"\nInvalid `prisma.cake.create()` invocation in\n/Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/cakes/cake.service.ts:9:34\n\n  6 const create_cake = async (req: Request) => {\n  7   const body = req.body\n  8 \n→ 9   const cake = await prisma.cake.create({\n        data: {\n          sku: \"TEST-CAKE-1773172483730\",\n          title: \"Test Chocolate Cake\",\n          description: \"Delicious chocolate cake for testing\",\n          images: [],\n
```

### ✅ GET All Cakes

- **Endpoint:** `GET http://localhost:5555/api/v1/cakes`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Cakes fetched successfully", "data": [] }
```

### ❌ UPDATE Cake

- **Endpoint:** `PATCH http://localhost:5555/api/v1/cakes/update-cake/#CAKE_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

### ❌ DELETE Cake

- **Endpoint:** `DELETE http://localhost:5555/api/v1/cakes/delete-cake/#CAKE_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

## Carts Tests (0/4 Passed) ⚠️

### ❌ CREATE Cart

- **Endpoint:** `POST http://localhost:5555/api/v1/carts/create-cart`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

### ❌ GET All Carts

- **Endpoint:** `GET http://localhost:5555/api/v1/carts`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

### ❌ UPDATE Cart

- **Endpoint:** `PATCH http://localhost:5555/api/v1/carts/update-cart/#CART_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

### ❌ DELETE Cart

- **Endpoint:** `DELETE http://localhost:5555/api/v1/carts/delete-cart/#CART_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

## Orders Tests (1/4 Passed) ⚠️

### ❌ CREATE Order

- **Endpoint:** `POST http://localhost:5555/api/v1/orders/create-order`
- **Status Code:** 500 Internal Server Error
- **Response:**

```json
{"success":false,"message":"\nInvalid `prisma.order.create()` invocation in\n/Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/orders/order.service.ts:17:36\n\n  14   message,\n  15 } = req.body\n  16 \n→ 17 const order = await prisma.order.create({\n       data: {\n         userId: \"722897bf-4868-4f84-919c-68bc5e2e69d9\",\n         cakeId: \"\",\n         quantity: 2,\n         totalPrice: 51.98,\n         status: \"PENDING\",\n         paymentMethod: \"COD\",\n
```

### ✅ GET All Orders

- **Endpoint:** `GET http://localhost:5555/api/v1/orders`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Orders fetched successfully", "data": [] }
```

### ❌ UPDATE Order

- **Endpoint:** `PATCH http://localhost:5555/api/v1/orders/update-order/#ORDER_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

### ❌ DELETE Order

- **Endpoint:** `DELETE http://localhost:5555/api/v1/orders/delete-order/#ORDER_ID#`
- **Status Code:** 0 Connection Error
- **Response:**

```json
read ECONNRESET
```

## Ratings Tests (1/4 Passed) ⚠️

### ❌ CREATE Rating

- **Endpoint:** `POST http://localhost:5555/api/v1/ratings/create-rating`
- **Status Code:** 400 Bad Request
- **Response:**

```json
{"success":false,"message":"Database error","errorSources":[{"path":"","message":"\nInvalid `prisma.rating.create()` invocation in\n/Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/ratings/rating.service.ts:9:38\n\n  6 const create_rating = async (req: Request) => {\n  7   const body = req.body\n  8 \n→ 9   const rating = await prisma.rating.create(\nInvalid input value: invalid input syntax for type uuid: \"\""}],"stack":"PrismaClientKnownRequestError: \nInvalid `prisma.rating.c
```

### ✅ GET All Ratings

- **Endpoint:** `GET http://localhost:5555/api/v1/ratings`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Ratings fetched successfully", "data": [] }
```

### ❌ UPDATE Rating

- **Endpoint:** `PATCH http://localhost:5555/api/v1/ratings/update-rating/#RATING_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

### ❌ DELETE Rating

- **Endpoint:** `DELETE http://localhost:5555/api/v1/ratings/delete-rating/#RATING_ID#`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

---

## API Endpoints Reference

### System

- `GET /` - Server health check endpoint

### Authentication

- `POST /api/v1/auth/register` - Register a new user
  - Body: `{ email, password, name? }`
  - Returns: User token

- `POST /api/v1/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: Access token and refresh token

- `POST /api/v1/auth/change-password` - Change user password
  - Auth: Required
  - Body: `{ oldPassword, newPassword }`

- `POST /api/v1/auth/refresh-token` - Refresh access token
  - Body: Cookie `refreshToken`

### Cakes

- `POST /api/v1/cakes` - Create a new cake
  - Body: `{ name, description, price, image, category, inStock }`
  - Returns: Created cake object

- `GET /api/v1/cakes` - Get all cakes
  - Query Params: `limit?`, `page?`
  - Returns: Array of cake objects

- `PATCH /api/v1/cakes/:id` - Update a cake
  - Params: Cake ID
  - Body: Fields to update
  - Returns: Updated cake object

- `DELETE /api/v1/cakes/:id` - Delete a cake
  - Params: Cake ID
  - Returns: Success message

### Carts

- `POST /api/v1/carts` - Create cart item
  - Body: `{ userId, cakeId, quantity }`
  - Returns: Created cart item

- `GET /api/v1/carts` - Get all cart items
  - Returns: Array of cart items

- `PATCH /api/v1/carts/:id` - Update cart item
  - Params: Cart ID
  - Body: Fields to update
  - Returns: Updated cart item

- `DELETE /api/v1/carts/:id` - Delete cart item
  - Params: Cart ID
  - Returns: Success message

### Orders

- `POST /api/v1/orders` - Create an order
  - Body: `{ userId, totalPrice, paymentMethod, orderStatus, items }`
  - Returns: Created order object

- `GET /api/v1/orders` - Get all orders
  - Returns: Array of order objects

- `PATCH /api/v1/orders/:id` - Update an order
  - Params: Order ID
  - Body: Fields to update
  - Returns: Updated order object

- `DELETE /api/v1/orders/:id` - Delete an order
  - Params: Order ID
  - Returns: Success message

### Ratings

- `POST /api/v1/ratings` - Create a rating
  - Body: `{ cakeId, userId, rating, review }`
  - Returns: Created rating object

- `GET /api/v1/ratings` - Get all ratings
  - Returns: Array of rating objects

- `PATCH /api/v1/ratings/:id` - Update a rating
  - Params: Rating ID
  - Body: Fields to update
  - Returns: Updated rating object

- `DELETE /api/v1/ratings/:id` - Delete a rating
  - Params: Rating ID
  - Returns: Success message
