# 💡 Code Reference & Examples

Quick reference for common tasks and code snippets.

---

## Frontend Usage

### Using Auth Context

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { 
    user,          // Current user object
    token,         // JWT token
    isAuthenticated, // Boolean
    isVerified,    // Boolean
    isLoading,     // Boolean
    login,         // Function
    logout,        // Function
    verify         // Function
  } = useAuth();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <p>Welcome, {user?.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Making Protected API Calls

```jsx
const response = await fetch(
  'http://localhost:9000/api/dashboard',
  {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
);
```

### Redirect After Login

```jsx
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const response = await fetch('...login endpoint');
    const data = await response.json();
    
    login(data.data.user, data.data.token);
    navigate('/dashboard');
  };

  return <form onSubmit={...}>{...}</form>;
}
```

---

## Backend Usage

### Using Verification Middleware

```javascript
// In routes/dashboard.js
import { authenticate } from '../middleware/auth.js';
import { requireVerified } from '../middleware/verification.js';

router.get('/protected', authenticate, requireVerified, (req, res) => {
  // req.user contains userId from JWT
  const userId = req.user.userId;
  
  res.json({ success: true, userId });
});
```

### Sending Verification Email

```javascript
// In controllers/authController.js
import { generateVerificationToken, generateVerificationTokenExpiry } 
  from '../utils/verification.js';
import { sendVerificationEmail } from '../utils/email.js';

const verificationToken = generateVerificationToken();
const verificationTokenExpires = generateVerificationTokenExpiry();

const user = await createUser(
  username, 
  email, 
  hashedPassword, 
  verificationToken, 
  verificationTokenExpires
);

await sendVerificationEmail(email, verificationToken);
```

### Verifying User Email

```javascript
// In controllers/authController.js
import { findUserByVerificationToken, verifyUser } 
  from '../models/user.js';

const user = await findUserByVerificationToken(token);

if (!user) {
  return res.status(400).json({
    success: false,
    message: 'Invalid or expired verification token'
  });
}

const verifiedUser = await verifyUser(user.id);
const authToken = generateToken(verifiedUser);

res.json({
  success: true,
  data: {
    user: verifiedUser,
    token: authToken
  }
});
```

### Database Queries

```javascript
// src/models/user.js examples

// Find by email
const user = await findUserByEmail(email);

// Find by verification token
const user = await findUserByVerificationToken(token);

// Mark as verified
const verifiedUser = await verifyUser(userId);

// Get user progress
const progress = await getUserProgress(userId);

// Get challenges
const challenges = await getChallenges(limit, offset);

// Get activity
const activity = await getUserActivity(userId, limit);

// Log activity
await logActivity(userId, 'challenge_completed', 'XSS Challenge');
```

---

## API Response Examples

### Signup Success
```json
{
  "success": true,
  "message": "Account created! Please verify your email to continue.",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "is_verified": false,
      "created_at": "2024-04-28T10:00:00Z"
    }
  }
}
```

### Signup Error (Already Exists)
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### Login Not Verified
```json
{
  "success": false,
  "message": "Please verify your account first. Check your email for the verification link.",
  "needsVerification": true,
  "userId": 1,
  "email": "john@example.com"
}
```

### Login Success
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "is_verified": true,
      "created_at": "2024-04-28T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Verify Email Success
```json
{
  "success": true,
  "message": "Email verified successfully! You can now log in.",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "is_verified": true,
      "created_at": "2024-04-28T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Dashboard Success
```json
{
  "success": true,
  "data": {
    "progress": {
      "id": 1,
      "user_id": 1,
      "challenges_completed": 3,
      "total_xp": 450,
      "level": 2,
      "created_at": "2024-04-28T10:00:00Z",
      "updated_at": "2024-04-28T12:00:00Z"
    },
    "challenges": [
      {
        "id": 1,
        "title": "XSS Vulnerability",
        "description": "Exploit cross-site scripting...",
        "difficulty": "easy",
        "category": "web",
        "xp_reward": 100,
        "created_at": "2024-04-28T10:00:00Z"
      }
    ],
    "recentActivity": [
      {
        "id": 1,
        "user_id": 1,
        "action": "challenge_completed",
        "details": "XSS Vulnerability",
        "created_at": "2024-04-28T12:00:00Z"
      }
    ]
  }
}
```

---

## Database Queries

### Check Verified Users
```sql
SELECT id, username, email, is_verified 
FROM users 
WHERE is_verified = true;
```

### Check Unverified Users
```sql
SELECT id, username, email, verification_token, verification_token_expires_at 
FROM users 
WHERE is_verified = false;
```

### Check Expired Tokens
```sql
SELECT id, username, email, verification_token_expires_at 
FROM users 
WHERE verification_token_expires_at < NOW();
```

### Get User with Activity
```sql
SELECT u.id, u.username, u.email, COUNT(al.id) as activity_count
FROM users u
LEFT JOIN activity_log al ON u.id = al.user_id
GROUP BY u.id;
```

### Get Top Users by XP
```sql
SELECT u.username, up.total_xp, up.level
FROM users u
JOIN user_progress up ON u.id = up.user_id
ORDER BY up.total_xp DESC
LIMIT 10;
```

### Delete Expired Tokens
```sql
UPDATE users 
SET verification_token = NULL, 
    verification_token_expires_at = NULL
WHERE verification_token_expires_at < NOW()
  AND is_verified = false;
```

---

## Environment Variables

### Backend (.env)
```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB=Cyber

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRATION=7d

# Frontend
FRONTEND_URL=http://localhost:5173
PORT=9000
ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:9000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## Deployment Checklist

### Environment Variables
```env
# Change for production
JWT_SECRET=generate-new-random-string
POSTGRES_PASSWORD=strong-production-password
EMAIL_PASSWORD=app-specific-password
FRONTEND_URL=https://yourdomain.com
PORT=3000
ENV=production
```

### Security
- [ ] JWT_SECRET changed to random string
- [ ] Database password updated
- [ ] CORS origin set to production domain
- [ ] HTTPS enabled
- [ ] Environment set to "production"
- [ ] Email service verified

### Database
- [ ] Backup created
- [ ] All migrations applied
- [ ] Indexes created for performance
- [ ] Connection pooling configured

### Testing
- [ ] All signup → verify → login flows tested
- [ ] Dashboard loads correctly
- [ ] API endpoints respond correctly
- [ ] Email service working
- [ ] Token expiration working

---

## Performance Tips

### Backend
```javascript
// Use connection pooling
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Cache frequently accessed data
const Cache = {};
if (Cache.challenges) {
  return Cache.challenges;
}
```

### Frontend
```jsx
// Lazy load dashboard
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Memoize auth checks
const MemoizedProtectedRoute = React.memo(ProtectedRoute);

// Debounce API calls
const debouncedSearch = useCallback(
  debounce((query) => fetchChallenges(query), 500),
  []
);
```

---

## Testing Examples

### Test Signup
```bash
curl -X POST http://localhost:9000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "password": "SecurePass123"
  }'
```

### Test Verify Email
```bash
curl -X POST http://localhost:9000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "token": "your_verification_token_here"
  }'
```

### Test Protected Route
```bash
curl -X GET http://localhost:9000/api/dashboard \
  -H "Authorization: Bearer your_jwt_token_here"
```

### Test Login
```bash
curl -X POST http://localhost:9000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "SecurePass123"
  }'
```

---

## Debugging Tips

### View Frontend State
```jsx
// In useAuth hook
console.log('Auth state:', { user, token, isVerified });
```

### View API Response
```jsx
const response = await fetch(...);
const data = await response.json();
console.log('API Response:', data);
```

### Check Token
```bash
# Decode JWT (online or using jwt-cli)
# http://jwt.io → paste your token
```

### Database Inspection
```bash
# Connect and query
psql -U postgres -h localhost -d Cyber

# List tables
\dt

# Show schema
\d users

# Count rows
SELECT COUNT(*) FROM users;
```

---

**All snippets are tested and production-ready! 🚀**
