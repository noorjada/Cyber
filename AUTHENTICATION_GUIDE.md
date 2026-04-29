# CyberLab - Authentication, Verification & Dashboard Implementation Guide

This document outlines the complete implementation of advanced authentication with email verification and a dashboard in your CyberLab application.

## 🚀 Overview

Your application now includes:
- **Email Verification Flow**: Users must verify their email before accessing the system
- **JWT Authentication**: Token-based authentication with verification checks
- **Protected Routes**: Dashboard accessible only to verified users
- **TryHackMe-Style Dashboard**: User profile, progress tracking, and challenges
- **Backend Integration**: Node.js/Express with PostgreSQL

---nnnnnnnnnnnnn

## 📋 Database Schema

The database has been updated with the following tables:

### **users** table
```sql
- id: SERIAL PRIMARY KEY
- username: VARCHAR(50)
- email: VARCHAR(100) UNIQUE
- password: TEXT (hashed)
- is_verified: BOOLEAN (default: FALSE)
- verification_token: VARCHAR(255) (auto-generated)
- verification_token_expires_at: TIMESTAMP (24-hour expiry)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### **user_progress** table
```sql
- id: SERIAL PRIMARY KEY
- user_id: FOREIGN KEY
- challenges_completed: INTEGER
- total_xp: INTEGER
- level: INTEGER
- timestamps
```

### **challenges** table
```sql
- id: SERIAL PRIMARY KEY
- title: VARCHAR(200)
- description: TEXT
- difficulty: VARCHAR(20) (easy/medium/hard)
- category: VARCHAR(50)
- xp_reward: INTEGER
- timestamps
```

### **activity_log** table
```sql
- id: SERIAL PRIMARY KEY
- user_id: FOREIGN KEY
- action: VARCHAR(100)
- details: TEXT
- timestamps
```

---

## ⚙️ Backend Setup

### **Dependencies Added**
```bash
npm install @supabase/supabase-js nodemailer
```

### **New Backend Files**

#### 1. **src/utils/email.js** - Email Service
- `sendVerificationEmail()` - Sends HTML-formatted verification emails
- `sendResendVerificationEmail()` - Resend verification email

#### 2. **src/utils/verification.js** - Token Generation
- `generateVerificationToken()` - Creates random 64-char tokens
- `generateVerificationTokenExpiry()` - Sets 24-hour expiry

#### 3. **src/middleware/verification.js** - Verification Middleware
- `requireVerified` middleware protects routes that need email verification

#### 4. **src/models/user.js** - Updated Model
- `findUserByVerificationToken()` - Verify user by token
- `verifyUser()` - Mark user as verified
- `updateVerificationToken()` - Resend logic
- `getUserProgress()`, `getChallenges()`, `getUserActivity()` - Dashboard data

#### 5. **src/controllers/dashboardController.js** - Dashboard Routes
- `getDashboard()` - All dashboard data
- `getUserDashboard()` - User stats only

#### 6. **src/routes/dashboard.js** - Dashboard Routes
Protected routes using `authenticate` and `requireVerified` middleware

### **Updated Files**

#### **src/controllers/authController.js**
- `signup()` - Now sends verification email, doesn't log in user
- `login()` - Checks if user is verified, returns error if not
- `verifyEmail()` - Takes verification token, marks user verified, returns JWT
- `resendVerificationEmail()` - Generates new token and sends email
- `getMe()` - Gets current user info

#### **backend/.env**
Add these configuration variables:
```env
# Supabase Config (optional for future use)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

---

## 🎨 Frontend Components

### **New Pages/Components**

#### 1. **src/app/contexts/AuthContext.jsx** - Auth State Management
```jsx
- useAuth() hook for accessing auth state globally
- Methods: login(), logout(), verify()
- Properties: user, token, isAuthenticated, isVerified, isLoading
```

#### 2. **src/app/pages/VerifyAccount.tsx** - Email Verification Page
- Auto-verify if token in URL
- Manual token input option
- Resend email functionality
- Auto-redirects to dashboard after verification

#### 3. **src/app/pages/Dashboard.tsx** - Main Dashboard (TryHackMe-style)
- User profile section
- Stats cards (Level, XP, Challenges, Streak)
- Recent activity feed
- Available challenges list
- Logout functionality

#### 4. **Updated src/app/pages/Login.tsx**
- Checks verification status
- Shows warning if user not verified
- Link to verification page if needed
- Redirects to dashboard on success

#### 5. **Updated src/app/pages/Signup.tsx**
- NO longer logs user in after signup
- Redirects to verification page
- Clear messaging about verification requirement

#### 6. **Updated src/app/App.tsx**
- Wraps app with `<AuthProvider>`
- `<ProtectedRoute>` component for dashboard access
- Routes:
  - `/` - Homepage
  - `/login` - Login
  - `/signup` - Signup
  - `/verify-account` - Email verification
  - `/dashboard` - Protected dashboard

---

## 🔄 Authentication Flow

### **Signup Flow**
```
1. User fills form and submits
   ↓
2. Backend creates user with is_verified = FALSE
   ↓
3. Verification token generated (expires in 24h)
   ↓
4. Verification email sent with link
   ↓
5. User redirected to /verify-account
```

### **Verification Flow**
```
1. User opens email link → /verify-account?token=xyz
   OR manually enters token
   ↓
2. Frontend sends token to /api/auth/verify-email
   ↓
3. Backend verifies token:
   - Token valid?
   - Token not expired?
   - User not already verified?
   ↓
4. If valid: User marked as verified, JWT returned
   ↓
5. User auto-logged in and redirected to /dashboard
```

### **Login Flow**
```
1. User enters email/password
   ↓
2. Backend checks:
   - User exists?
   - Password correct?
   - User verified? ← NEW CHECK
   ↓
3. If not verified → 403 error with message
   User can click link to go to verification page
   ↓
4. If verified → Return JWT + user data
   ↓
5. Frontend stores token, redirects to /dashboard
```

### **Protected Routes**
```
All /api/dashboard/* routes require:
- authenticate middleware (valid JWT)
- requireVerified middleware (is_verified = true)

ProtectedRoute component checks:
- isAuthenticated
- isVerified
- Redirects if either false
```

---

## 📧 Email Configuration

### **Using Gmail**
1. Enable "Less secure app access" or use "App Password"
2. In `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### **Using Other Services**
Update the SMTP config in `.env` accordingly.

---

## 🔌 API Endpoints

### **Authentication**
| Method | Endpoint | Body | Returns |
|--------|----------|------|---------|
| POST | `/api/auth/signup` | `{firstName, lastName, email, password}` | User info (not verified) |
| POST | `/api/auth/login` | `{email, password}` | JWT + user info OR error if not verified |
| POST | `/api/auth/verify-email` | `{token}` | JWT + user info (now verified) |
| POST | `/api/auth/resend-verification` | `{email}` | Success message |
| GET | `/api/auth/me` | - | Current user (requires JWT) |

### **Dashboard**
| Method | Endpoint | Headers | Returns |
|--------|----------|---------|---------|
| GET | `/api/dashboard` | `Authorization: Bearer {token}` | Progress + challenges + activity |
| GET | `/api/dashboard/stats` | `Authorization: Bearer {token}` | User progress only |

---

## 💾 Frontend Environment Variables

Create `.env` in project root:
```env
VITE_API_BASE_URL=http://localhost:9000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🚀 Running the Application

### **Backend**
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:9000`

### **Frontend**
```bash
npm install
npm run dev
```
App runs on `http://localhost:5173`

---

## 📝 Workflow - Testing

### **Test Complete Flow**

1. **Signup**
   - Go to `/signup`
   - Fill form and submit
   - Check email for verification link
   - Or copy token from console logs (in dev)

2. **Email Verification**
   - Click verification link
   - OR paste token on `/verify-account`
   - See success message
   - Auto-redirected to `/dashboard`

3. **Dashboard Access**
   - View user profile
   - See progress stats
   - Browse challenges
   - View activity log

4. **Logout & Re-login**
   - Logout from dashboard
   - Login with email/password
   - Verify working verification check

---

## 🔒 Security Features

✅ Password hashing with bcrypt
✅ JWT token expiration (7 days default)
✅ Email verification tokens expire in 24 hours
✅ Middleware protection on sensitive routes
✅ CORS enabled for frontend origin
✅ Environment variables for secrets

---

## 📱 Frontend Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/` | HomePage | No | Landing page |
| `/login` | Login | No | Login form |
| `/signup` | Signup | No | Registration form |
| `/verify-account` | VerifyAccount | No | Email verification |
| `/dashboard` | Dashboard | **YES** | User dashboard (requires verified account) |

---

## 🎯 Next Steps (Optional Enhancements)

1. **Supabase Integration**
   - Replace PostgreSQL with Supabase for easier management
   - Use Supabase Auth for OAuth (Google, GitHub)

2. **Challenge System**
   - Populate challenges table with actual challenges
   - Track user progress on challenges
   - Award XP and update level

3. **Notifications**
   - Email notifications for achievements
   - In-app notification system
   - Activity notifications

4. **Profile Customization**
   - Allow users to update profile
   - Profile picture uploads
   - Bio/about section

5. **Leaderboards**
   - Global user rankings
   - Weekly/monthly leaderboards
   - Achievement badges

---

## 🐛 Troubleshooting

### **Emails not sending**
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`
- Gmail: Use App Password, not regular password
- Check SMTP_HOST and SMTP_PORT

### **Token verification fails**
- Token may be expired (24-hour limit)
- User may already be verified
- Check database for verification_token_expires_at

### **Protected routes returning 403**
- User JWT may be expired
- User may not be verified (is_verified = false)
- Send them to /verify-account

### **Frontend can't connect to backend**
- Ensure backend running on port 9000
- Check CORS settings in server.js
- Verify API_BASE_URL in .env

---

## 📚 Key Files Reference

**Backend:**
- `backend/.env` - Configuration
- `backend/database.sql` - Schema
- `backend/src/controllers/authController.js` - Auth logic
- `backend/src/middleware/verification.js` - Verification check
- `backend/src/models/user.js` - Database queries
- `backend/src/utils/email.js` - Email sending

**Frontend:**
- `src/app/contexts/AuthContext.jsx` - Auth state
- `src/app/pages/Login.tsx` - Login page
- `src/app/pages/Signup.tsx` - Signup page
- `src/app/pages/VerifyAccount.tsx` - Verification page
- `src/app/pages/Dashboard.tsx` - Dashboard
- `src/app/App.tsx` - Routing & ProtectedRoute

---

## ✨ Summary

You now have a **production-ready authentication system** with:
- ✅ Email verification requirement
- ✅ Protected dashboard
- ✅ JWT-based security
- ✅ User progress tracking
- ✅ Challenge system foundation
- ✅ Activity logging
- ✅ TryHackMe-style UI

All components are modular, secure, and ready for scaling! 🚀
