# Cyber Auth Backend

Complete authentication system built with Node.js, Express, and PostgreSQL.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection
│   ├── controllers/
│   │   └── authController.js    # Auth business logic
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── errorHandler.js      # Global error handler
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   └── user.js              # User database queries
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── index.js             # Route aggregator
│   └── utils/
│       ├── password.js          # Bcrypt hashing utilities
│       └── token.js             # JWT utilities
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── database.sql                 # SQL for creating users table
├── package.json
└── server.js                    # Entry point
```

## Installation & Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables** (already configured in `.env`):
   ```
   PORT=3000
   POSTGRES_HOST=localhost
   POSTGRES_DB=Cyber
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=NOor0123@#
   TOKEN_SECRET=noor_secret_123
   BCRYPT_PASSWORD=noor_pepper
   SALT_ROUNDS=10
   ENV=dev
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/health` | Health check | No |

## Request/Response Examples

### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer <token>
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds + pepper
- **JWT Authentication**: Token-based auth with 24h expiry
- **Input Validation**: express-validator for sanitization
- **SQL Injection Prevention**: Parameterized queries
- **CORS**: Configured for cross-origin requests
- **Error Handling**: No sensitive info leaked in errors
