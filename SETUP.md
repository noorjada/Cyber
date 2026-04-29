# Quick Start Guide - CyberLab with Email Verification

## Prerequisites

- Node.js 16+
- PostgreSQL or MySQL database running
- Gmail account (for email verification) OR other SMTP service

---

## Step 1: Backend Setup

### 1.1 Install Dependencies
```bash
cd backend
npm install
```

### 1.2 Configure Environment Variables
Edit `backend/.env`:
```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=Cyber

# Email (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_password  # Use App Password, not regular password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRATION=7d
```

### 1.3 Create Database Tables
Run this SQL or execute database.sql:
```bash
# Using psql
psql -U postgres -h localhost < backend/database.sql
```

### 1.4 Start Backend Server
```bash
npm run dev
# Server will run on http://localhost:9000
```

---

## Step 2: Frontend Setup

### 2.1 Install Dependencies
```bash
# In project root
npm install
```

### 2.2 Configure Frontend Environment
Create/update `.env`:
```env
VITE_API_BASE_URL=http://localhost:9000/api
```

### 2.3 Start Frontend
```bash
npm run dev
# App will run on http://localhost:5173
```

---

## Step 3: Test the Flow

### 3.1 Sign Up
1. Open http://localhost:5173
2. Click "Sign Up"
3. Fill in the form
4. Submit

**Expected Result:**
- Account created (not verified)
- Redirected to `/verify-account`
- Email sent to your inbox

### 3.2 Verify Email
1. Check your email inbox for verification link
2. Click the link (should have token in URL)
3. OR go to `/verify-account` and paste token manually

**Expected Result:**
- "Email verified successfully" message
- Auto-redirected to `/dashboard`
- Logged in automatically

### 3.3 View Dashboard
1. See your profile info
2. View stats (level, XP, challenges)
3. See recent activity
4. Browse available challenges

### 3.4 Logout & Test Login
1. Click "Logout" button
2. Go to `/login`
3. Enter email/password
4. If NOT verified: Error message + link to verify
5. If verified: Logged in + redirected to dashboard

---

## Gmail Setup (If Using)

### Using App Password (Recommended)
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or any device)
3. Google will generate 16-character password
4. Copy this password to `EMAIL_PASSWORD` in `.env`
5. Use your email in `EMAIL_USER`

### Using Less Secure Apps (Legacy)
1. Enable at https://myaccount.google.com/lesssecureapps
2. Use your Gmail password in `EMAIL_PASSWORD`

---

## Debugging

### Check Backend Logs
```bash
# Should see:
# Server running on port 9000
# Environment: development
```

### Test API Directly
```bash
# Test health
curl http://localhost:9000/api/health

# Test signup
curl -X POST http://localhost:9000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### Check Database
```bash
# Connect to database
psql -U postgres -h localhost -d Cyber

# Check users
SELECT id, username, email, is_verified FROM users;

# Check if verification token exists
SELECT id, email, verification_token FROM users WHERE verification_token IS NOT NULL;
```

### Common Issues

**Emails not sending:**
- Check EMAIL_USER and EMAIL_PASSWORD are correct
- Make sure Gmail App Password, not regular password
- Check SMTP_HOST and SMTP_PORT

**Token verification fails:**
- Token expires in 24 hours
- Check token hasn't been used already
- Verify token matches in database

**Protected routes return 403:**
- User not verified (is_verified = false)
- JWT token expired
- Missing Authorization header

---

## Project Structure

```
Cyber-first-main/
├── backend/
│   ├── .env                          # Configuration
│   ├── database.sql                  # Database schema
│   ├── server.js                     # Express server
│   ├── src/
│   │   ├── config/database.js        # DB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Auth logic (UPDATED)
│   │   │   └── dashboardController.js # Dashboard (NEW)
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT check
│   │   │   ├── verification.js       # Email verification check (NEW)
│   │   │   └── validation.js         # Input validation
│   │   ├── models/user.js            # Database queries (UPDATED)
│   │   ├── routes/
│   │   │   ├── auth.js               # Auth endpoints (UPDATED)
│   │   │   └── dashboard.js          # Dashboard endpoints (NEW)
│   │   └── utils/
│   │       ├── email.js              # Email service (NEW)
│   │       ├── password.js           # Password hashing
│   │       ├── token.js              # JWT generation
│   │       └── verification.js       # Token generation (NEW)
│   └── package.json                  # Dependencies (UPDATED)
│
├── src/
│   ├── app/
│   │   ├── App.tsx                   # Routes (UPDATED)
│   │   ├── pages/
│   │   │   ├── Login.tsx             # Login (UPDATED)
│   │   │   ├── Signup.tsx            # Signup (UPDATED)
│   │   │   ├── VerifyAccount.tsx     # Verification (NEW)
│   │   │   └── Dashboard.tsx         # Dashboard (NEW)
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx       # Auth state (NEW)
│   │   └── components/               # Existing UI components
│   └── styles/                       # Existing styles
│
├── .env                              # Frontend env (UPDATED)
├── package.json                      # Frontend deps
├── AUTHENTICATION_GUIDE.md           # Detailed documentation (NEW)
└── README.md                         # Original README
```

---

## Next: Deploy & Production

### Environment Variables Checklist
- [ ] Change `JWT_SECRET` to random strong string
- [ ] Change database credentials
- [ ] Use production email service
- [ ] Set `FRONTEND_URL` to production domain
- [ ] Enable HTTPS in production
- [ ] Add CORS origin for production domain

### Database Backup
```bash
# Backup PostgreSQL
pg_dump -U postgres -h localhost Cyber > backup.sql

# Restore from backup
psql -U postgres -h localhost Cyber < backup.sql
```

---

## Support & Troubleshooting

See `AUTHENTICATION_GUIDE.md` for detailed documentation, API endpoints, and troubleshooting.

---

**You're all set! Happy hacking! 🚀**
