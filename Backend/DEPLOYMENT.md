# Backend Deployment Guide for Render

## Steps to Deploy on Render

### 1. Push Code to GitHub
Make sure your backend code is pushed to your GitHub repository.

### 2. Create New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository: `Anil-sai0418/Task-manager`

### 3. Configure the Web Service

**Basic Settings:**
- **Name**: `task-manager-by-anil` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `Backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Settings:**
- **Instance Type**: Free (or paid for better performance)

### 4. Add Environment Variables
Click "Advanced" → "Add Environment Variable" and add:

```
JWT_SECRET=anil_super_secret_key_123
MONGO_URI=mongodb+srv://anil:anil@main.ehfvc5q.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Main
PORT=8000
```

### 5. Deploy
Click "Create Web Service" and wait for deployment to complete.

### 6. Test Your Backend
Once deployed, visit:
- `https://task-manager-by-anil.onrender.com/` - Should show API status
- `https://task-manager-by-anil.onrender.com/health` - Should show health status

### 7. MongoDB Atlas Configuration
Make sure your MongoDB Atlas allows connections from Render:
1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (Allow access from anywhere)

## Important Notes

⚠️ **Free Tier Limitations:**
- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Consider upgrading to paid tier for production apps

🔧 **CORS Configuration:**
The backend is configured to accept requests from:
- `http://localhost:5173` (local dev)
- `http://localhost:3000` (local dev)
- `https://task-manager-anil.vercel.app` (production)

If you change your Vercel domain, update the CORS settings in `Server.js`.

## Troubleshooting

### 502 Bad Gateway
- Service might be sleeping (free tier) - wait 30-60 seconds
- Check Render logs for errors
- Verify MongoDB connection string is correct

### CORS Errors
- Ensure your Vercel domain is added to `corsOptions` in `Server.js`
- Redeploy after making changes

### MongoDB Connection Issues
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string has correct credentials
- Ensure cluster is not paused
