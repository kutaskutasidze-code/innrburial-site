# 🚀 Manual Deployment Guide - INNRBURIAL

Follow these steps to deploy your website.

## Part 1: Deploy Frontend (5 minutes)

Open Terminal and run:

```bash
cd /Users/macintoshi/Desktop/innrburial-site
vercel login
```

1. A browser will open - login with GitHub, GitLab, or email
2. Once logged in, return to Terminal
3. Run:

```bash
vercel --prod
```

4. Answer the prompts:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name? **innrburial** (or press Enter)
   - Directory? **.** (press Enter)
   - Override settings? **N**

5. ✅ Your frontend is now live! Copy the URL (e.g., `https://innrburial.vercel.app`)

---

## Part 2: Deploy Backend (10 minutes)

### A. Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Empty Project"**

### B. Add PostgreSQL Database

1. Click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway will create the database and auto-add `DATABASE_URL`

### C. Deploy Backend

Open a **new Terminal** window:

```bash
cd /Users/macintoshi/Desktop/innrburial-site/backend
railway login
```

Browser opens - login, then return to Terminal:

```bash
railway init
```

- Enter project name: **innrburial-backend**
- Select the project you just created

```bash
railway up
```

This will deploy your backend!

### D. Add Environment Variables

1. Go to your Railway dashboard
2. Click on your service (not the database)
3. Go to **"Variables"** tab
4. Click **"New Variable"** and add these:

```
NODE_ENV=production
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@innrburial.com
```

#### Getting Gmail App Password:

1. Go to https://myaccount.google.com/apppasswords
2. Enable 2-Factor Auth if not enabled
3. Create app password:
   - App: **Mail**
   - Device: **Other** → type "INNRBURIAL"
4. Copy the 16-character password
5. Use this as `EMAIL_PASS`

### E. Get Backend URL

1. In Railway, go to **"Settings"** tab
2. Find **"Domains"** section
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://innrburial-production.up.railway.app`)

---

## Part 3: Connect Frontend to Backend (2 minutes)

Replace `YOUR_BACKEND_URL` with your actual Railway URL:

```bash
cd /Users/macintoshi/Desktop/innrburial-site

# Update API URLs
sed -i '' 's|http://localhost:3000/api|https://YOUR_BACKEND_URL/api|g' app.js
sed -i '' 's|http://localhost:3000/api|https://YOUR_BACKEND_URL/api|g' book-order-new.html

# Redeploy frontend
vercel --prod
```

---

## Part 4: Test Your Site (2 minutes)

1. **Visit your site:** `https://innrburial.vercel.app/contact.html`
2. **Fill out the contact form** and submit
3. **Check:**
   - Success message appears?
   - Email received at `ADMIN_EMAIL`?
   - Database entry: `https://YOUR_BACKEND_URL/api/contacts`

4. **Test book order:** Visit `/book-order-new.html`

---

## ✅ Deployment Complete!

Your INNRBURIAL website is now LIVE!

### Your URLs:
- **Website:** https://innrburial.vercel.app
- **Backend:** https://YOUR_BACKEND_URL
- **Contacts:** https://YOUR_BACKEND_URL/api/contacts
- **Orders:** https://YOUR_BACKEND_URL/api/orders

### Troubleshooting:

**Form not working?**
- Check Railway logs for errors
- Verify environment variables are set
- Check backend health: `https://YOUR_BACKEND_URL/health`

**Email not sending?**
- Verify Gmail app password is correct (16 chars, no spaces)
- Check 2FA is enabled on Gmail
- Check Railway logs for email errors

---

## Optional: Custom Domain

### Vercel (Frontend):
1. Go to Vercel dashboard → Your project
2. Settings → Domains
3. Add your custom domain (e.g., innrburial.com)
4. Update DNS records as shown

### Railway (Backend):
1. Railway dashboard → Your service
2. Settings → Domains
3. Add custom domain for API

---

🎊 **Congratulations! Your site is live!** 🎊
