# 📋 Development Checklist - CyberLab Setup

Use this checklist to ensure everything is properly configured before testing.

## ✅ Backend Configuration

### Database Setup
- [ ] PostgreSQL/MySQL installed and running
- [ ] Database "Cyber" created
- [ ] User "postgres" exists with password
- [ ] Ran `database.sql` to create tables
  ```bash
  psql -U postgres -h localhost < backend/database.sql
  ```
- [ ] Verify tables exist:
  ```bash
  psql -U postgres -h localhost -d Cyber -c "\dt"
  ```

### Backend Dependencies
- [ ] Ran `npm install` in backend directory
- [ ] `nodemailer` installed (for email)
- [ ] `bcrypt` installed (for password hashing)
- [ ] `jsonwebtoken` installed (for JWT)
- [ ] All packages in `package.json` are installed

### Environment Variables (backend/.env)
- [ ] `POSTGRES_HOST` = localhost
- [ ] `POSTGRES_USER` = postgres
- [ ] `POSTGRES_PASSWORD` = your_password
- [ ] `POSTGRES_DB` = Cyber
- [ ] `EMAIL_USER` = your-email@gmail.com
- [ ] `EMAIL_PASSWORD` = App Password (not regular password)
- [ ] `SMTP_HOST` = smtp.gmail.com
- [ ] `SMTP_PORT` = 587
- [ ] `FRONTEND_URL` = http://localhost:5173
- [ ] `JWT_SECRET` = something-random-and-long
- [ ] `JWT_EXPIRATION` = 7d

### Backend Server
- [ ] Start backend with `npm run dev`
- [ ] See message: "Server running on port 9000"
- [ ] Test health endpoint:
  ```bash
  curl http://localhost:9000/api/health
  ```
- [ ] Should return: `{"success": true, "message": "Server is running", ...}`

---

## ✅ Frontend Configuration

### Dependencies
- [ ] Ran `npm install` in project root
- [ ] `react-router` installed
- [ ] `lucide-react` installed
- [ ] `@radix-ui` components installed
- [ ] All packages in `package.json` are installed

### Environment Variables (.env)
- [ ] Created `.env` file in project root
- [ ] `VITE_API_BASE_URL` = http://localhost:9000/api
- [ ] Optional: Supabase config (for future use)

### Frontend Server
- [ ] Start frontend with `npm run dev`
- [ ] Should say: "Local: http://localhost:5173"
- [ ] Can access http://localhost:5173 in browser

---

## ✅ Email Configuration (Gmail)

### Gmail Setup
- [ ] Go to https://myaccount.google.com/apppasswords
- [ ] Select "Mail" and "Windows Computer"
- [ ] Google generates 16-character password
- [ ] Copy this password
- [ ] Put in `EMAIL_PASSWORD` in backend/.env
- [ ] Put your Gmail in `EMAIL_USER` in backend/.env

### Test Email Sending
- [ ] Check NODE_ENV is not "production" (or emails will fail silently)
- [ ] Watch backend console logs when signup happens
- [ ] Should see: "Connected to PostgreSQL database"
- [ ] Should NOT see email errors

---

## ✅ Pre-Testing Checklist

Before running the signup flow:

### Backend Files Exist
- [ ] `backend/src/utils/email.js` - exists
- [ ] `backend/src/utils/verification.js` - exists
- [ ] `backend/src/middleware/verification.js` - exists
- [ ] `backend/src/controllers/dashboardController.js` - exists
- [ ] `backend/src/routes/dashboard.js` - exists
- [ ] `backend/src/models/user.js` - updated with verification functions
- [ ] `backend/src/controllers/authController.js` - updated with verification

### Frontend Files Exist
- [ ] `src/app/contexts/AuthContext.jsx` - exists
- [ ] `src/app/pages/VerifyAccount.tsx` - exists
- [ ] `src/app/pages/Dashboard.tsx` - exists
- [ ] `src/app/App.tsx` - updated with AuthProvider and routes
- [ ] `src/app/pages/Login.tsx` - updated
- [ ] `src/app/pages/Signup.tsx` - updated

### Database Tables Exist
- [ ] `users` table has `is_verified` column
- [ ] `users` table has `verification_token` column
- [ ] `users` table has `verification_token_expires_at` column
- [ ] `user_progress` table exists
- [ ] `challenges` table exists
- [ ] `activity_log` table exists

---

## ✅ Testing Checklist

### Test 1: Server Connectivity
- [ ] Both servers running without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can see homepage with navbar
- [ ] Backend health check works

### Test 2: Signup Flow
- [ ] Click "Sign Up" on homepage
- [ ] Fill form: First name, Last name, Email, Password
- [ ] Submit form
- [ ] See success message "Account created! Check your email..."
- [ ] Redirected to `/verify-account`
- [ ] Check email inbox (may take 30 seconds)
- [ ] Receive email from your EMAIL_USER address

### Test 3: Verification Flow
- [ ] Option A: Click verification link in email
  - [ ] Should land on `/verify-account?token=xxx`
  - [ ] See "Email verified successfully!"
  - [ ] Auto-logged in
  - [ ] Redirected to `/dashboard`
  
- [ ] Option B: Manual token
  - [ ] Copy token from verification email
  - [ ] Go to http://localhost:5173/verify-account
  - [ ] Paste token in input
  - [ ] Click "Verify Email"
  - [ ] See success message
  - [ ] Auto-logged in → dashboard

### Test 4: Dashboard
- [ ] See your profile name/email
- [ ] See stats (Level, XP, Challenges, Active Days)
- [ ] See "Recent Activity" section
- [ ] See "Available Challenges" section
- [ ] See "Logout" button works

### Test 5: Login Flow (Unverified User)
- [ ] Create new account
- [ ] Don't verify
- [ ] Try to login with that email/password
- [ ] See warning: "Please verify your account first"
- [ ] See yellow message instead of red
- [ ] See link: "Verify your account now"

### Test 6: Login Flow (Verified User)
- [ ] Use verified account from Test 3
- [ ] Log out first
- [ ] Go to `/login`
- [ ] Enter email/password
- [ ] See success message
- [ ] Redirected to `/dashboard`

### Test 7: Resend Verification Email
- [ ] Go to `/verify-account`
- [ ] Click "Resend Email" tab
- [ ] Enter unverified user's email
- [ ] Click "Resend Verification Email"
- [ ] See success message
- [ ] New email received with new token

---

## 🔍 Debug Commands

### Check Backend Logs
```bash
# Terminal where backend is running
# Should see no errors on requests
```

### Test API Directly
```bash
# Test signup
curl -X POST http://localhost:9000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'

# Test health
curl http://localhost:9000/api/health
```

### Check Database
```bash
# Connect to database
psql -U postgres -h localhost -d Cyber

# View users
SELECT id, username, email, is_verified FROM users;

# View verification tokens
SELECT id, email, verification_token FROM users WHERE verification_token IS NOT NULL;

# View user progress
SELECT * FROM user_progress;

# Exit with \q
```

### Check Node Modules
```bash
# Verify modules are installed
ls node_modules | grep nodemailer
ls node_modules | grep bcrypt
ls node_modules | grep jsonwebtoken
```

---

## 🚨 Common Issues & Quick Fixes

### ❌ "Cannot find module 'nodemailer'"
**Solution:**
```bash
cd backend
npm install nodemailer
```

### ❌ "ECONNREFUSED - Cannot connect to database"
**Solution:**
- Check PostgreSQL is running
- Check POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD in .env
- Try: `psql -U postgres -h localhost`

### ❌ "Email failed to send"
**Solution:**
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Make sure using Gmail App Password, not regular password
- Check SMTP_HOST = smtp.gmail.com, SMTP_PORT = 587

### ❌ "Verification token invalid or expired"
**Solution:**
- Token expires in 24 hours
- Check verification_token_expires_at in database
- Try resending verification email

### ❌ "404 on /dashboard"
**Solution:**
- Make sure AuthProvider wraps app in App.tsx
- Check user has is_verified = true
- Clear localStorage and try again

### ❌ "CORS error"
**Solution:**
- Check FRONTEND_URL in backend/.env
- Verify CORS settings in backend/server.js
- Restart both servers

---

## 📝 Notes

- Default test email: Use a real email (verification is actually sent)
- Tokens expire in 24 hours (configurable in verification.js)
- JWT tokens expire in 7 days (configurable in .env)
- Passwords are hashed with bcrypt (never stored plain text)
- All sensitive data in .env, not in code

---

## ✨ Success Indicators

If all tests pass:
- ✅ User creates account
- ✅ Verification email sent & received
- ✅ Email verification works
- ✅ User auto-logged in after verification
- ✅ Dashboard displays correctly
- ✅ Logout works
- ✅ Can't access dashboard without verification
- ✅ Resend verification works
- ✅ Database records created correctly

---

**You're ready to start testing! 🚀**

If you get stuck, check:
1. Logs in terminal windows
2. `SETUP.md` for detailed instructions
3. `AUTHENTICATION_GUIDE.md` for troubleshooting
4. Database state with psql commands above
