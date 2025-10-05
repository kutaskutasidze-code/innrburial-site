# 🚀 INNRBURIAL Complete Deployment Guide

## ✅ What's Been Built

### Frontend (Polished & Ready)
- ✨ Apple-inspired design system
- 📱 Fully responsive layout
- 🎬 Video hero sections with overlay
- 🖼️ Gallery with hover effects
- 📝 Contact form with validation
- 📚 Book ordering system
- 🎨 Smooth animations & transitions

### Backend (Production-Ready)
- 🔌 RESTful API with Express.js
- 💾 PostgreSQL database integration
- 📧 Email notifications (Nodemailer)
- ✅ Form validation & error handling
- 🔒 Environment-based configuration
- 📊 Admin endpoints for data retrieval

### Database Schema
- **Contacts Table**: Stores all contact form submissions
- **Orders Table**: Manages book orders and pre-orders

## 🎯 Quick Deploy (5 Minutes)

### Step 1: Deploy Frontend to Vercel
```bash
cd /Users/macintoshi/Desktop/innrburial-site
vercel login
vercel --prod
```
Your site will be at: `https://innrburial.vercel.app`

### Step 2: Deploy Backend to Railway

1. **Create Railway Account**: https://railway.app
2. **Create New Project** → "Empty Project"
3. **Add PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the `DATABASE_URL` from variables tab

4. **Deploy Backend**:
```bash
cd backend
railway login
railway init
railway link
railway up
```

5. **Add Environment Variables** in Railway Dashboard:
```
NODE_ENV=production
DATABASE_URL=(auto-generated)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=admin@innrburial.com
```

6. **Get Backend URL**:
   - Find in Railway dashboard (e.g., `https://innrburial-production.up.railway.app`)

### Step 3: Connect Frontend to Backend

1. **Update API URL** in both files:
```bash
# Update app.js
sed -i '' 's|http://localhost:3000/api|https://YOUR-BACKEND-URL/api|' app.js

# Update book-order-new.html
sed -i '' 's|http://localhost:3000/api|https://YOUR-BACKEND-URL/api|' book-order-new.html
```

2. **Redeploy Frontend**:
```bash
vercel --prod
```

## 📧 Gmail Setup (Required for Email)

1. **Enable 2FA** on your Google Account
2. **Create App Password**:
   - Visit: https://myaccount.google.com/apppasswords
   - App: "Mail"
   - Device: "Other" → "INNRBURIAL"
   - Copy 16-character password
3. **Add to Railway** as `EMAIL_PASS`

## 🔄 Alternative: Deploy Backend to Render

1. **Sign up**: https://render.com
2. **New Web Service** → Connect GitHub or upload
3. **Settings**:
   - Build: `cd backend && npm install`
   - Start: `cd backend && npm start`
4. **Add PostgreSQL** (separate service)
5. **Environment Variables** (same as Railway)

## 📋 Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] PostgreSQL database created
- [ ] Gmail app password generated
- [ ] All environment variables set
- [ ] API_URL updated in frontend files
- [ ] Frontend redeployed with correct API URL
- [ ] Test contact form
- [ ] Test book order form
- [ ] Verify email notifications

## 🧪 Testing Your Deployment

### Test Contact Form:
1. Go to `/contact.html`
2. Fill out form
3. Check: Email received at `ADMIN_EMAIL`
4. Check: Confirmation in browser
5. Verify: Database entry at `https://YOUR-BACKEND/api/contacts`

### Test Book Orders:
1. Go to `/book-order-new.html`
2. Select book and fill form
3. Check: Email confirmation to customer
4. Check: Admin notification email
5. Verify: Database entry at `https://YOUR-BACKEND/api/orders`

## 🛠️ File Structure

```
innrburial-site/
├── index.html                 # Main landing page
├── gallery.html              # Gallery showcase
├── book.html                 # Book information
├── contact.html              # Contact form (integrated)
├── book-order-new.html       # Order form (integrated)
├── book-burial.html          # Book detail page
├── book-instruction.html     # Book detail page
├── style.css                 # Global styles
├── app.js                    # Frontend JavaScript
├── vercel.json              # Vercel config
├── deploy.sh                # Deployment script
├── README.md                # Full documentation
├── DEPLOYMENT-GUIDE.md      # This file
├── images/                  # Image assets
├── videos/                  # Video assets
└── backend/
    ├── server.js           # Express API
    ├── package.json        # Dependencies
    ├── .env.example        # Environment template
    └── railway.json        # Railway config
```

## 🚀 One-Command Local Test

```bash
# Terminal 1: Start backend
cd /Users/macintoshi/Desktop/innrburial-site/backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev

# Terminal 2: Start frontend
cd /Users/macintoshi/Desktop/innrburial-site
python3 -m http.server 8000
# Open: http://localhost:8000
```

## 🎨 Polishing Features Added

### Contact Form:
- ✅ Real-time validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Auto-clear after submission
- ✅ Email notifications

### Book Order Form:
- ✅ Visual book selection
- ✅ Complete order flow
- ✅ Customer confirmation emails
- ✅ Admin notifications
- ✅ Database persistence

### UI Enhancements:
- ✅ Smooth transitions
- ✅ Hover effects
- ✅ Loading indicators
- ✅ Toast notifications
- ✅ Form validation feedback

## 📊 API Endpoints

### POST `/api/contact`
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

### POST `/api/order`
Place book order
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "bookType": "The Burial of Adam",
  "address": "123 Main St...",
  "phone": "+1234567890"
}
```

### GET `/api/contacts`
Get all contacts (admin)

### GET `/api/orders`
Get all orders (admin)

### GET `/health`
Health check

## 🔐 Security Notes

- Environment variables stored securely
- No sensitive data in frontend
- CORS enabled for your domain
- Gmail app passwords (not main password)
- PostgreSQL with SSL in production
- Input validation on backend
- XSS protection via sanitization

## 🎯 Custom Domain (Optional)

1. **Buy domain** (e.g., innrburial.com)
2. **In Vercel**:
   - Settings → Domains
   - Add `innrburial.com`
   - Add DNS records as shown
3. **Update CORS** in backend to allow your domain

## 📞 Support

Issues? Check:
1. Environment variables are correct
2. Backend is running (visit `/health`)
3. API_URL is updated in frontend
4. Gmail app password is correct
5. Database is connected

---

**You're all set!** 🎉

Run `./deploy.sh` to start deployment, or follow the steps above manually.
