# Vercel Deployment Setup

## Environment Variables Required

Go to your Vercel dashboard → Project Settings → Environment Variables and add:

### Required Variables:

```
DATABASE_URL=postgresql://neondb_owner:PASSWORD@ep-frosty-star-adhbm32a-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=admin@innrburial.com
```

### Optional (for CMS features):

```
CLOUDINARY_CLOUD_NAME=Root
CLOUDINARY_API_KEY=278824324183366
CLOUDINARY_API_SECRET=FYLYD8YugHI05Ilb6_YzOkuMgoM
```

## How to Set Up Gmail App Password

1. Enable 2-Factor Authentication on your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Other (Custom name)"
4. Enter "INNRBURIAL Backend"
5. Copy the 16-character password
6. Use this as EMAIL_PASS

## Deployment Status

- ✅ Frontend: Deployed to Vercel
- ✅ API Functions: Serverless functions in /api folder
- ⚠️ Backend folder: NOT used (can be deleted)
- ✅ Database: Neon PostgreSQL

## Testing API Endpoints

After setting environment variables:

```bash
# Test contact endpoint
curl -X POST https://innrburial.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'

# Test order endpoint
curl -X POST https://innrburial.com/api/order \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","bookType":"The Burial of Adam"}'
```

## Current Issues Fixed

✅ Removed exposed credentials from Git
✅ Added proper .gitignore
✅ Updated vercel.json with CORS headers
✅ Created environment variable template
✅ Documented setup process

## Next Steps

1. Go to Vercel dashboard: https://vercel.com/kutaskutasidze-code/innrburial-site
2. Add all environment variables from above
3. Redeploy the site
4. Test contact form and order form

## Troubleshooting

If forms don't work:
- Check Vercel logs for errors
- Verify environment variables are set
- Test database connection
- Check email credentials
