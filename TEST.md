# API Test Results & Documentation

**Generated:** Mar 10, 2026  
**Status:** ✅ ALL TESTS PASSED (100%)

---

## Test Summary

| Metric           | Result  |
| ---------------- | ------- |
| **Total Tests**  | 11      |
| **Passed**       | 11 ✅   |
| **Failed**       | 0       |
| **Success Rate** | 100.00% |

---

## System Tests (2/2 Passed) ✅

### ✅ Server Health Check

- **Endpoint:** `GET http://localhost:5555/`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Welcome to RESTful API Server of UG Cake!" }
```

### ✅ Invalid Endpoint (Negative Test)

- **Endpoint:** `GET http://localhost:5555/api/v1/nonexistent`
- **Status Code:** 404 Not Found
- **Response:**

```json
{ "success": false, "message": "API not found" }
```

## Authentication Tests (3/3 Passed) ✅

### ✅ User Registration

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/register`
- **Status Code:** 201 Created
- **Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "19ee4247-a215-4067-b42b-624c1e973ecf",
    "name": "Test User",
    "email": "testuser1773093700040@example.com",
    "password": "$2a$10$xfDoMpP0ASQeU0x88vUK3OWYzrECoeank1Cw/GBX/dhtmFt3Q7E7q",
    "role": "USER",
    "address": "",
    "phone": "",
    "image": "",
    "isActive": true,
    "isVerified": false,
    "isDeleted": false,
    "isBlocked": false,
    "isSuspended": false,
    "createdAt": "2026-03-09T22:01:41.310Z",
    "updatedAt": "2026-03-09T22:01:41.310Z"
  }
}
```

### ✅ User Login

- **Endpoint:** `POST http://localhost:5555/api/v1/auth/login`
- **Status Code:** 200 OK
- **Response:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ZWU0MjQ3LWEyMTUtNDA2Ny1iNDJiLTYyNGMxZTk3M2VjZiIsImVtYWlsIjoidGVzdHVzZXIxNzczMDkzNzAwMDQwQGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NzMwOTM3MDEsImV4cCI6MTc3MzY5ODUwMX0.afCWwbzKcfHYdfnMB3qemy5EPQjAKX-Mo6xnelCx_IE"
  }
}
```

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

## Cakes Tests (2/2 Passed) ✅

### ✅ Get All Cakes

- **Endpoint:** `GET http://localhost:5555/api/v1/cakes`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Cakes fetched successfully", "data": [] }
```

### ✅ Get Cakes with Pagination

- **Endpoint:** `GET http://localhost:5555/api/v1/cakes?limit=5&page=1`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Cakes fetched successfully", "data": [] }
```

## Carts Tests (1/1 Passed) ✅

### ✅ Get All Carts

- **Endpoint:** `GET http://localhost:5555/api/v1/carts`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Carts fetched successfully", "data": [] }
```

## Orders Tests (1/1 Passed) ✅

### ✅ Get All Orders

- **Endpoint:** `GET http://localhost:5555/api/v1/orders`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Orders fetched successfully", "data": [] }
```

## Users Tests (1/1 Passed) ✅

### ✅ Get All Users

- **Endpoint:** `GET http://localhost:5555/api/v1/users`
- **Status Code:** 200 OK
- **Response:**

```json
{"success":true,"message":"Users fetched successfully","data":[{"id":"fc24613e-1a50-424f-a207-d6c68111b6a6","name":"Test","email":"test@example.com","password":"$2a$10$gORNAS1F4o138uzKPfjl7urIYc2CwJ4maIXq37ekHKNIVkjYpYbEO","role":"USER","address":"","phone":"","image":"","isActive":true,"isVerified":false,"isDeleted":false,"isBlocked":false,"isSuspended":false,"createdAt":"2026-03-09T21:22:50.190Z","updatedAt":"2026-03-09T21:22:50.190Z"},{"id":"a6a0482d-8093-495e-9b3e-d0655678af13","name":"Test"
```

## Ratings Tests (1/1 Passed) ✅

### ✅ Get All Ratings

- **Endpoint:** `GET http://localhost:5555/api/v1/ratings`
- **Status Code:** 200 OK
- **Response:**

```json
{ "success": true, "message": "Ratings fetched successfully", "data": [] }
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

- `GET /api/v1/cakes` - Get all cakes
  - Query Params: `limit?`, `page?`
  - Returns: Array of cake objects

### Orders

- `GET /api/v1/orders` - Get all orders
  - Returns: Array of order objects

### Carts

- `GET /api/v1/carts` - Get all carts
  - Returns: Array of cart items

### Users

- `GET /api/v1/users` - Get all users
  - Returns: Array of user objects

### Ratings

- `GET /api/v1/ratings` - Get all ratings
  - Returns: Array of rating objects
