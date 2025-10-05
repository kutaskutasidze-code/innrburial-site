# INNRBURIAL Website

A philosophical exploration through visual art and literature.

## 🚀 Quick Start

### Frontend (Local Development)
```bash
# Just open index.html in your browser
open index.html
```

### Backend (Local Development)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

## 📦 Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
# From the project root
vercel

# Follow prompts - it will auto-detect your project
# Set up project and deploy
vercel --prod
```

Your site will be live at: `https://innrburial.vercel.app`

### Backend Deployment (Railway)

1. **Sign up at** [railway.app](https://railway.app)

2. **Create New Project:**
   - Click "New Project"
   - Choose "Deploy from GitHub repo" or "Empty Project"

3. **Add PostgreSQL:**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will auto-create `DATABASE_URL` variable

4. **Deploy Backend:**
```bash
cd backend
railway login
railway init
railway up
```

5. **Set Environment Variables in Railway Dashboard:**
```
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@innrburial.com
```

6. **Get your backend URL:**
   - Find it in Railway dashboard (e.g., `https://innrburial-backend.railway.app`)

7. **Update Frontend:**
   - Edit `app.js` and change `API_URL` to your Railway backend URL
   - Redeploy frontend with `vercel --prod`

### Alternative: Deploy Backend to Render

1. **Sign up at** [render.com](https://render.com)

2. **Create New Web Service:**
   - Connect GitHub or upload code
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

3. **Add PostgreSQL:**
   - Create new PostgreSQL database
   - Copy DATABASE_URL to environment variables

4. **Set Environment Variables:**
```
NODE_ENV=production
DATABASE_URL=(from Render PostgreSQL)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@innrburial.com
```

## 🔐 Email Setup (Gmail)

1. **Enable 2-Factor Authentication** in your Google Account

2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → "INNRBURIAL Backend"
   - Copy the 16-character password
   - Use this as `EMAIL_PASS` in your environment variables

## 🗄️ Database Schema

### Contacts Table
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
email           VARCHAR(255) NOT NULL
subject         VARCHAR(500) NOT NULL
message         TEXT NOT NULL
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Orders Table
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(255) NOT NULL
email           VARCHAR(255) NOT NULL
book_type       VARCHAR(100) NOT NULL
address         TEXT
phone           VARCHAR(50)
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

## 🎨 Features

### Current Features
- ✅ Apple-inspired design system
- ✅ Responsive layout
- ✅ Video hero sections
- ✅ Gallery with image grid
- ✅ Contact form with backend API
- ✅ Book ordering system
- ✅ Email notifications
- ✅ PostgreSQL database

### Backend API Endpoints

#### POST /api/contact
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

#### POST /api/order
Place book order
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "bookType": "The Burial of Adam",
  "address": "123 Main St",
  "phone": "+1234567890"
}
```

#### GET /api/contacts
Get all contacts (admin only)

#### GET /api/orders
Get all orders (admin only)

#### GET /health
Health check

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (Apple-inspired design)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- Nodemailer

**Deployment:**
- Vercel (Frontend)
- Railway/Render (Backend)

## 📁 Project Structure

```
innrburial-site/
├── index.html              # Homepage
├── gallery.html            # Gallery page
├── book.html              # Book page
├── contact.html           # Contact page
├── book-order.html        # Order page
├── book-burial.html       # Book: Burial of Adam
├── book-instruction.html  # Book: Instruction to Reality
├── style.css              # Main stylesheet
├── app.js                 # Frontend JavaScript
├── vercel.json           # Vercel config
├── images/               # Image assets
├── videos/               # Video assets
└── backend/
    ├── server.js         # Express server
    ├── package.json      # Dependencies
    ├── .env.example      # Environment template
    └── railway.json      # Railway config
```

## 🚀 One-Command Deploy

```bash
# Deploy everything at once
cd /Users/macintoshi/Desktop/innrburial-site
vercel --prod && cd backend && railway up
```

## 📝 Environment Variables Checklist

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `EMAIL_USER` - Gmail address
- [ ] `EMAIL_PASS` - Gmail app password (16 characters)
- [ ] `ADMIN_EMAIL` - Admin notification email
- [ ] `NODE_ENV` - Set to "production"

## 🎯 Next Steps

1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Set up Gmail app password
4. Configure environment variables
5. Update `API_URL` in `app.js`
6. Test contact form
7. Test book orders
8. Set up custom domain (optional)

## 📧 Support

For issues or questions, contact: admin@innrburial.com

---

Built with ❤️ for INNRBURIAL
