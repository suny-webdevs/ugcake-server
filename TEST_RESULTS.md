# API Test Results

**Test Date:** 2026-03-09T21:28:13.358Z

**Total Tests:** 7
**Passed:** 7
**Failed:** 0

## Test Details

### Test 1: GET http://localhost:5555/

- **Status:** 200 OK
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:12.154Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"Welcome to RESTful API Server of UG Cake!"}
```

---

### Test 2: POST http://localhost:5555/api/v1/auth/register

- **Status:** 201 Created
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:12.956Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"User registered successfully","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhZjljMDlhLWJiOTUtNGIxZC04MzQwLTljOWQwZDUzOTE5NSIsImVtYWlsIjoidGVzdDE3NzMwOTE2OTIxMzRAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MzA5MTY5MiwiZXhwIjoxNzczNjk2NDkyfQ.II4MWftC436UOEsrCLUdw0SBTjBh27iq9MZlqLxNJOo"}}
```

---

### Test 3: GET http://localhost:5555/api/v1/cakes

- **Status:** 200 OK
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:13.038Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"Cakes fetched successfully","data":[]}
```

---

### Test 4: GET http://localhost:5555/api/v1/carts

- **Status:** 200 OK
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:13.119Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"Carts fetched successfully","data":[]}
```

---

### Test 5: GET http://localhost:5555/api/v1/orders

- **Status:** 200 OK
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:13.198Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"Orders fetched successfully","data":[]}
```

---

### Test 6: GET http://localhost:5555/api/v1/users

- **Status:** 200 OK
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:13.279Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"Users fetched successfully","data":[{"id":"fc24613e-1a50-424f-a207-d6c68111b6a6","name":"Test","email":"test@example.com","password":"$2a$10$gORNAS1F4o138uzKPfjl7urIYc2CwJ4maIXq37ekHKNIVkjYpYbEO","role":"USER","address":"","phone":"","image":"","isActive":true,"isVerified":false,"isDeleted":false,"isBlocked":false,"isSuspended":false,"createdAt":"2026-03-09T21:22:50.190Z","updatedAt":"2026-03-09T21:22:50.190Z"},{"id":"a6a0482d-8093-495e-9b3e-d0655678af13","name":"Test"
```

---

### Test 7: GET http://localhost:5555/api/v1/ratings

- **Status:** 200 OK
- **Success:** ✅ Yes
- **Timestamp:** 2026-03-09T21:28:13.358Z
- **Response (first 500 chars):**
```json
{"success":true,"message":"Ratings fetched successfully","data":[]}
```

---

