# API Test Results & Documentation

**Generated:** Mar 10, 2026  
**Status:** ⚠️ SOME TESTS FAILED

---

## Test Summary

| Metric           | Result |
| ---------------- | ------ |
| **Total Tests**  | 21     |
| **Passed**       | 19 ✅  |
| **Failed**       | 2      |
| **Success Rate** | 90.48%   |

---

## System Tests (2/2 Passed) ✅

### ✅ Server Health Check

- **Endpoint:** `GET http://localhost:5555/`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Welcome to RESTful API Server of UG Cake!"}
```

### ✅ Invalid Endpoint (Negative Test)

- **Endpoint:** `GET http://localhost:5555/api/v1/nonexistent`
- **Status Code:** 404 Not Found
- **Response:**

```json
{"success":false,"message":"API not found"}
```

## Authentication Tests (3/3 Passed) ✅

### ✅ User Registration

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/register`
- **Status Code:** 201 Created
- **Response:**

```json
{"success":true,"message":"User registered successfully","data":{"id":"3d5c9265-778c-46b5-862e-34a3469bc751","name":"Test User","email":"testuser1773094870758@example.com","password":"$2a$10$eEGwKJk3ocLrVpVPYUAcFeEma8R4pHlaTDQbq2tyUwrVS5umzRj/i","role":"USER","address":"","phone":"","image":"","isActive":true,"isVerified":false,"isDeleted":false,"isBlocked":false,"isSuspended":false,"createdAt":"2026-03-09T22:21:10.902Z","updatedAt":"2026-03-09T22:21:10.902Z"}}
```

### ✅ User Login

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/login`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"User logged in successfully","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWM5MjY1LTc3OGMtNDZiNS04NjJlLTM0YTM0NjliYzc1MSIsImVtYWlsIjoidGVzdHVzZXIxNzczMDk0ODcwNzU4QGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NzMwOTQ4NzEsImV4cCI6MTc3MzY5OTY3MX0.dMZAcfr4xQ3kkZUvXCJpS3y5EfrfbpDG5CzBO-tsyek"}}
```

### ✅ Login with Invalid Credentials (Negative Test)

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/login`
- **Status Code:** 400 Bad Request
- **Response:**

```json
{"success":false,"message":"Invalid email or password","errorSources":[{"path":"","message":"Invalid email or password"}],"stack":"Error: Invalid email or password\n    at Object.loginUser (/Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/auth/auth.service.ts:43:11)\n    at /Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/auth/auth.controller.ts:23:16"}
```

## Cakes Tests (3/4 Passed) ⚠️

### ✅ CREATE Cake

- **Endpoint:** `POST http://localhost:5555/api/v1/cakes/create-cake`
- **Status Code:** 201 Created
- **Response:**

```json
{"success":true,"message":"Cake created successfully","data":{"id":"671fb529-e951-4b26-8787-40a547f80904","sku":"TEST-CAKE-1773094870758","title":"Test Chocolate Cake","description":"Delicious chocolate cake for testing","price":"25.99","avatar":"https://example.com/cake.jpg","type":"Chocolate","flavors":["Chocolate","Vanilla"],"weights":["500g","1kg","2kg"],"features":[],"additionalImages":[],"category":"Chocolate","stock":10,"specificationLabel":[],"specificationValue":[],"isActive":true,"isCu
```

### ✅ GET All Cakes

- **Endpoint:** `GET http://localhost:5555/api/v1/cakes`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Cakes fetched successfully","data":[{"id":"4761f894-10d4-47cb-b577-c39d1fd1b743","sku":"TEST-CAKE-1773094853898","title":"Test Chocolate Cake","description":"Delicious chocolate cake for testing","price":"29.99","avatar":"https://example.com/cake.jpg","type":"Chocolate","flavors":["Chocolate","Vanilla"],"weights":["500g","1kg","2kg"],"features":[],"additionalImages":[],"category":"Chocolate","stock":5,"specificationLabel":[],"specificationValue":[],"isActive":true,"isC
```

### ✅ UPDATE Cake

- **Endpoint:** `PATCH http://localhost:5555/api/v1/cakes/update-cake/#CAKE_ID#`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Cake updated successfully","data":{"id":"671fb529-e951-4b26-8787-40a547f80904","sku":"TEST-CAKE-1773094870758","title":"Test Chocolate Cake","description":"Delicious chocolate cake for testing","price":"29.99","avatar":"https://example.com/cake.jpg","type":"Chocolate","flavors":["Chocolate","Vanilla"],"weights":["500g","1kg","2kg"],"features":[],"additionalImages":[],"category":"Chocolate","stock":5,"specificationLabel":[],"specificationValue":[],"isActive":true,"isCus
```

### ❌ DELETE Cake

- **Endpoint:** `DELETE http://localhost:5555/api/v1/cakes/delete-cake/#CAKE_ID#`
- **Status Code:** 400 Bad Request
- **Response:**

```json
{"success":false,"message":"Invalid reference","errorSources":[{"path":"","message":"\nInvalid `prisma.cake.delete()` invocation in\n/Users/macminim4/Desktop/Projects/ug-cake-server/src/app/modules/cakes/cake.service.ts:60:40\n\n  57 \n  58 const delete_cake = async (req: Request) => {\n  59   const id = req.params.id ?? req.body?.id\n→ 60   const cake = await prisma.cake.delete(\nForeign key constraint violated on the constraint: `carts_cakeId_fkey`"}],"stack":"PrismaClientKnownRequestError: \n
```

## Carts Tests (3/4 Passed) ⚠️

### ✅ CREATE Cart

- **Endpoint:** `POST http://localhost:5555/api/v1/carts/create-cart`
- **Status Code:** 201 Created
- **Response:**

```json
{"success":true,"message":"Cart created successfully","data":{"id":"78beccbf-caff-48e3-bb33-39bf799a2342","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":2,"createdAt":"2026-03-09T22:21:11.543Z","updatedAt":"2026-03-09T22:21:11.543Z"}}
```

### ✅ GET All Carts

- **Endpoint:** `GET http://localhost:5555/api/v1/carts`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Carts fetched successfully","data":[{"id":"05e4189d-e36b-4732-b724-f750e5411975","userId":"ef91f8e5-ebe2-465f-9ed6-8b5bcd660b69","cakeId":"4761f894-10d4-47cb-b577-c39d1fd1b743","quantity":5,"createdAt":"2026-03-09T22:20:55.252Z","updatedAt":"2026-03-09T22:20:55.677Z"},{"id":"78beccbf-caff-48e3-bb33-39bf799a2342","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":2,"createdAt":"2026-03-09T22:21:11.543Z","updatedAt"
```

### ✅ UPDATE Cart

- **Endpoint:** `PATCH http://localhost:5555/api/v1/carts/update-cart/#CART_ID#`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Carts updated successfully","data":{"id":"78beccbf-caff-48e3-bb33-39bf799a2342","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":5,"createdAt":"2026-03-09T22:21:11.543Z","updatedAt":"2026-03-09T22:21:11.950Z"}}
```

### ❌ DELETE Cart

- **Endpoint:** `DELETE http://localhost:5555/api/v1/carts/delete-cart/#CART_ID#`
- **Status Code:** 400 Bad Request
- **Response:**

```json
No response
```

## Orders Tests (4/4 Passed) ✅

### ✅ CREATE Order

- **Endpoint:** `POST http://localhost:5555/api/v1/orders/create-order`
- **Status Code:** 201 Created
- **Response:**

```json
{"success":true,"message":"Order created successfully","data":{"id":"5c2ec65b-bf1d-4448-9297-31524ab0013b","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":2,"totalPrice":"51.98","status":"PENDING","paymentMethod":"COD","message":null,"createdAt":"2026-03-09T22:21:11.611Z","updatedAt":"2026-03-09T22:21:11.611Z"}}
```

### ✅ GET All Orders

- **Endpoint:** `GET http://localhost:5555/api/v1/orders`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Orders fetched successfully","data":[{"id":"5c2ec65b-bf1d-4448-9297-31524ab0013b","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":2,"totalPrice":"51.98","status":"PENDING","paymentMethod":"COD","message":null,"createdAt":"2026-03-09T22:21:11.611Z","updatedAt":"2026-03-09T22:21:11.611Z"}]}
```

### ✅ UPDATE Order

- **Endpoint:** `PATCH http://localhost:5555/api/v1/orders/update-order/#ORDER_ID#`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Order updated successfully","data":{"id":"5c2ec65b-bf1d-4448-9297-31524ab0013b","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":2,"totalPrice":"51.98","status":"PROCESSING","paymentMethod":"COD","message":null,"createdAt":"2026-03-09T22:21:11.611Z","updatedAt":"2026-03-09T22:21:12.084Z"}}
```

### ✅ DELETE Order

- **Endpoint:** `DELETE http://localhost:5555/api/v1/orders/delete-order/#ORDER_ID#`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Order deleted successfully","data":{"id":"5c2ec65b-bf1d-4448-9297-31524ab0013b","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","quantity":2,"totalPrice":"51.98","status":"PROCESSING","paymentMethod":"COD","message":null,"createdAt":"2026-03-09T22:21:11.611Z","updatedAt":"2026-03-09T22:21:12.084Z"}}
```

## Ratings Tests (4/4 Passed) ✅

### ✅ CREATE Rating

- **Endpoint:** `POST http://localhost:5555/api/v1/ratings/create-rating`
- **Status Code:** 201 Created
- **Response:**

```json
{"success":true,"message":"Rating created successfully","data":{"id":"b76bfd46-5bac-41b5-a148-c9df6436b4d6","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","rating":5,"maxRating":5,"review":"Excellent cake! Highly recommended.","createdAt":"2026-03-09T22:21:11.680Z","updatedAt":"2026-03-09T22:21:11.680Z"}}
```

### ✅ GET All Ratings

- **Endpoint:** `GET http://localhost:5555/api/v1/ratings`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Ratings fetched successfully","data":[{"id":"b76bfd46-5bac-41b5-a148-c9df6436b4d6","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","rating":5,"maxRating":5,"review":"Excellent cake! Highly recommended.","createdAt":"2026-03-09T22:21:11.680Z","updatedAt":"2026-03-09T22:21:11.680Z"}]}
```

### ✅ UPDATE Rating

- **Endpoint:** `PATCH http://localhost:5555/api/v1/ratings/update-rating/#RATING_ID#`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Rating updated successfully","data":{"id":"b76bfd46-5bac-41b5-a148-c9df6436b4d6","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","rating":4,"maxRating":5,"review":"Very good cake!","createdAt":"2026-03-09T22:21:11.680Z","updatedAt":"2026-03-09T22:21:12.215Z"}}
```

### ✅ DELETE Rating

- **Endpoint:** `DELETE http://localhost:5555/api/v1/ratings/delete-rating/#RATING_ID#`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Rating deleted successfully","data":{"id":"b76bfd46-5bac-41b5-a148-c9df6436b4d6","userId":"3d5c9265-778c-46b5-862e-34a3469bc751","cakeId":"671fb529-e951-4b26-8787-40a547f80904","rating":4,"maxRating":5,"review":"Very good cake!","createdAt":"2026-03-09T22:21:11.680Z","updatedAt":"2026-03-09T22:21:12.215Z"}}
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

