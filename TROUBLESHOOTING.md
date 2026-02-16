# 🔧 Troubleshooting Guide - White Page Issue

**Date**: February 16, 2026  
**Issue**: Application showing white/blank page in development  
**Status**: ✅ RESOLVED

---

## 🐛 Problem Analysis

### Symptoms
- ❌ Application showing white/blank page
- ❌ No errors displayed on screen
- ❌ Changes to code not reflecting

### Root Causes
1. **Frontend dev server not running** - Most common issue
2. **Port mismatch** - Using wrong localhost port
3. **Code not saved** - Changes not being picked up
4. **Cache issues** - Browser cache serving old code
5. **API configuration issue** - Backend not responding

---

## ✅ Solution Applied

### Step 1: Start the Frontend Dev Server

```bash
# Navigate to Frontend directory
cd Frontend

# Start development server
npm run dev
```

**Expected Output:**
```
VITE v7.0.0  ready in 350 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.124.108.141:5173/
  ➜  press h + enter to show help
```

### Step 2: Verify Both Services Running

```bash
# Check if backend is running on port 8000
lsof -i :8000
# Should show: node Server.js

# Check if frontend is running on port 5173
lsof -i :5173
# Should show: vite dev server
```

### Step 3: Clear Browser Cache

1. Open DevTools: **F12** or **Cmd+Option+I**
2. **Network** tab → Check "Disable cache"
3. **Application** → **Storage** → Clear All
4. Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)

### Step 4: Visit the Correct URL

```
✅ CORRECT: http://localhost:5173
❌ WRONG:  http://localhost:5174 (old port)
❌ WRONG:  http://localhost:3000
```

---

## 🚨 Comprehensive Troubleshooting Checklist

### 1. **Is the Frontend Server Running?**

```bash
# Check port 5173
lsof -i :5173

# If empty, restart frontend
cd Frontend && npm run dev
```

### 2. **Is the Backend Server Running?**

```bash
# Check port 8000
lsof -i :8000

# If not running, go to Backend terminal and run:
npm start
# or
node Server.js
```

### 3. **Are you using the correct URL?**

| URL | Status | Port |
|-----|--------|------|
| http://localhost:5173 | ✅ CORRECT | 5173 |
| http://localhost:5174 | ❌ WRONG | 5174 |
| http://localhost:3000 | ❌ WRONG | 3000 |
| http://127.0.0.1:5173 | ✅ OK | 5173 |

### 4. **Clear Browser Cache & Cookies**

**Option A: DevTools Method**
1. Open DevTools: **F12**
2. Settings → **Storage** → **Clear All**
3. Hard refresh: **Cmd+Shift+R**

**Option B: Browser Settings**
1. Chrome/Edge: Settings → Privacy → Clear browsing data
2. Safari: Develop menu → Empty Web Storage
3. Firefox: History → Clear Recent History

### 5. **Check Console for Errors**

1. Open DevTools: **F12**
2. **Console** tab
3. Look for any error messages in red
4. Check **Network** tab for failed requests

**Common Errors:**
- `Failed to fetch from localhost:8000` → Backend not running
- `Uncaught TypeError` → Code syntax error
- `CORS error` → Backend CORS misconfigured

### 6. **Verify API Configuration**

Check `Frontend/src/config/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     (import.meta.env.MODE === 'production' 
                       ? 'https://task-manager-by-anil.onrender.com'
                       : 'http://localhost:8000');
```

Should use `http://localhost:8000` in development.

### 7. **Check Backend Health**

```bash
# Test if backend is responding
curl http://localhost:8000/health

# Or open in browser
curl -v http://localhost:8000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🎯 Quick Fix Checklist

When you see a white page:

- [ ] Backend running on port 8000? → `npm start` in Backend/
- [ ] Frontend running on port 5173? → `npm run dev` in Frontend/
- [ ] Using http://localhost:5173? → Check URL bar
- [ ] Hard refresh browser? → **Cmd+Shift+R** (Mac)
- [ ] Open DevTools console? → Check for errors **F12**
- [ ] MongoDB connected? → Check Backend logs
- [ ] API_BASE_URL correct? → Should be `http://localhost:8000`

---

## 🔄 Complete Restart Steps

If still seeing white page, do a complete restart:

### Terminal 1: Backend
```bash
# Kill any existing process on port 8000
lsof -ti :8000 | xargs kill -9

# Navigate to Backend
cd Backend

# Install dependencies (if needed)
npm install

# Start server
npm start
```

### Terminal 2: Frontend
```bash
# Kill any existing process on port 5173
lsof -ti :5173 | xargs kill -9

# Navigate to Frontend
cd Frontend

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev
```

### Terminal 3: Browser
```bash
# Clear cache and restart
# 1. Open http://localhost:5173
# 2. Press Cmd+Shift+R (hard refresh)
# 3. Open DevTools with F12
# 4. Check Network tab for errors
```

---

## 📊 Port Configuration

### Development Ports
| Service | Port | URL | Status |
|---------|------|-----|--------|
| Backend | 8000 | http://localhost:8000 | Node/Express |
| Frontend | 5173 | http://localhost:5173 | Vite Dev Server |
| MongoDB | 27017 | mongodb://localhost:27017 | Local (if installed) |

### Important
- **DO NOT** use port 5174 (old/incorrect)
- **ALWAYS** use port 5173 for Vite development
- **Backend must be running** for API calls to work

---

## 🧪 Test the Application

### 1. Verify Frontend Loads
```bash
# Visit in browser
http://localhost:5173

# Should see: Login/Home page (NOT blank)
```

### 2. Test API Connection
```bash
# In browser DevTools console:
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(d => console.log(d))
  
# Should show: { "status": "OK" }
```

### 3. Test Login
```bash
# Go to: http://localhost:5173/login
# Try logging in with valid credentials
# Should redirect to /home page
# Should load tasks/data
```

### 4. Check Network Requests
```bash
# Open DevTools → Network tab
# Perform an action (login, create task, etc)
# Check that requests go to: http://localhost:8000
# Status should be 200 OK (not 404 or 500)
```

---

## 🆘 If Still Not Working

### Step 1: Check Logs
```bash
# Backend logs
# Should show: "✅ MongoDB is connected successfully!"
# Should show: "Server running on port 8000"

# Frontend logs in DevTools Console
# Should show: No red errors
# Should show: Network requests to localhost:8000
```

### Step 2: MongoDB Connection
```bash
# Verify MONGO_URI in Backend/.env is correct
# Test by checking Backend console output
# Should NOT show: "❌ MongoDB connection error"
```

### Step 3: Reinstall Dependencies
```bash
# Backend
cd Backend
rm -rf node_modules package-lock.json
npm install
npm start

# Frontend
cd Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Step 4: Check Environment Variables

**Backend .env file:**
```env
MONGO_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_secret
PORT=8000
```

**Verify these are set and correct!**

---

## 📋 DevTools Debugging

### Console Tab
```javascript
// Check if page is loading
console.log('Page loaded successfully');

// Check API_BASE_URL
fetch('http://localhost:8000/health').then(r => r.json()).then(console.log);

// Check localStorage
console.log(localStorage.getItem('account-user'));
```

### Network Tab
1. Open Network tab before loading page
2. Reload: **Cmd+R** or **F5**
3. Look for requests to:
   - ✅ `http://localhost:5173` (HTML/CSS/JS)
   - ✅ `http://localhost:8000` (API calls)
4. Check response status:
   - 200 = Success
   - 404 = Not found
   - 500 = Server error
   - CORS error = Configuration issue

### Application Tab
1. **Cookies** → Check for auth tokens
2. **Local Storage** → Check for `account-user`
3. **Session Storage** → Check for `tm_session_id`
4. **Cache Storage** → Clear if needed

---

## 🎯 Common Error Solutions

### Error: "Cannot GET /home"
**Cause**: React Router not configured  
**Fix**: Make sure you're visiting `http://localhost:5173` not a direct HTML file

### Error: "Failed to fetch from localhost:8000"
**Cause**: Backend not running  
**Fix**: Run `npm start` in Backend folder

### Error: "CORS error" in Console
**Cause**: Backend CORS not configured for localhost:5173  
**Fix**: Check `Backend/Server.js` CORS configuration includes `http://localhost:5173`

### Error: "API_BASE_URL is undefined"
**Cause**: api.js not imported correctly  
**Fix**: Check import: `import API_BASE_URL from '../config/api';`

### Error: "MongoNetworkError"
**Cause**: MongoDB Atlas connection failed  
**Fix**: Check MONGO_URI in .env, IP whitelist, cluster status

---

## 📝 Summary

**White page issue fixed by:**
1. ✅ Starting the frontend dev server on port 5173
2. ✅ Verifying backend is running on port 8000
3. ✅ Using correct URL: `http://localhost:5173`
4. ✅ Clearing browser cache and hard refreshing
5. ✅ Checking DevTools console for errors

**Next time if white page appears:**
- Check if `npm run dev` is still running in Frontend/
- Use correct port: 5173 (not 5174)
- Hard refresh: **Cmd+Shift+R**
- Check DevTools: **F12**

---

<div align="center">

### ✅ Application Should Now Be Working!

If you still see issues, check the error message in DevTools console (F12) and match it above.

**Running on**: http://localhost:5173  
**Backend on**: http://localhost:8000  
**Database**: MongoDB Atlas (Cloud)

</div>
