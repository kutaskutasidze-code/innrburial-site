# Backend Cleanup Instructions

## Problem

Your site has TWO conflicting backend systems:

1. **/backend/** - Full Express server (NOT used on Vercel)
2. **/api/** - Vercel serverless functions (ACTIVE and working)

## Solution: Delete /backend folder

The `/backend` folder is not being used because:
- Vercel uses serverless functions from `/api` folder
- The Express server in `/backend` requires separate hosting (Railway/Render)
- Current setup: Vercel frontend + Vercel API functions = fully working

## How to Clean Up

### Option 1: Delete backend folder (Recommended)

```bash
# This removes the unused backend entirely
rm -rf backend/
git add -A
git commit -m "Remove unused Express backend folder"
git push origin master
```

### Option 2: Keep for reference (Archive)

```bash
# Rename to indicate it's not active
mv backend backend-UNUSED-archive
git add -A
git commit -m "Archive unused Express backend"
git push origin master
```

## What Stays Active

- ✅ `/api/contact.js` - Handles contact form
- ✅ `/api/order.js` - Handles book orders
- ✅ `/api/*.js` - All other serverless functions
- ✅ Vercel serverless architecture
- ✅ Neon PostgreSQL database

## Files That Should Be Removed

```
backend/
├── server.js (not used)
├── package.json (duplicates root)
├── .env.example (use root .env.example instead)
├── railway.json (not using Railway)
└── node_modules/ (taking up space)
```

## After Cleanup

Your clean structure will be:

```
innrburial-site/
├── api/              # ✅ Active serverless functions
├── images/           # ✅ Static assets
├── videos/           # ✅ Static assets
├── index.html        # ✅ Frontend
├── contact.html      # ✅ Frontend
├── book-order.html   # ✅ Frontend
├── app.js            # ✅ Frontend JS
├── style.css         # ✅ Styles
├── package.json      # ✅ Dependencies for /api
├── vercel.json       # ✅ Vercel config
└── .env.example      # ✅ Environment template
```

## Current Status

- 🟢 Site is live and functional at innrburial.com
- 🟡 Cleanup will reduce confusion and repo size
- 🟢 No functionality will be lost
