# 🚨 SECURITY ALERT - ACTION REQUIRED

## Exposed Credentials Detected

The following files contained sensitive credentials and have been committed to Git:

- `.env.production` - Database password exposed
- `.env.local` - Cloudinary API keys exposed

## Immediate Actions Required:

### 1. Rotate Database Password

**Neon PostgreSQL:**
1. Go to: https://console.neon.tech
2. Select your project
3. Go to Settings → Reset Password
4. Update the new password in Vercel environment variables

### 2. Rotate Cloudinary Keys (Optional)

If using Cloudinary features:
1. Go to: https://cloudinary.com/console
2. Settings → Security → Reset API Secret
3. Update in Vercel environment variables

### 3. Update Vercel Environment Variables

1. Go to: https://vercel.com/kutaskutasidze-code/innrburial-site/settings/environment-variables
2. Delete old variables
3. Add new credentials from step 1 & 2
4. Redeploy site

## Prevention

The following files are now in `.gitignore` and won't be committed:
- `.env`
- `.env.local`
- `.env.production`
- `.env.development`
- `.env*.local`

## Status

- ✅ Files removed from future commits via .gitignore
- ⚠️ Old commits still contain credentials (can't be removed from history)
- ⚠️ **Action Required:** Rotate all exposed credentials

## Best Practices

1. **Never** commit .env files
2. Use `.env.example` for templates
3. Store secrets only in Vercel dashboard
4. Rotate credentials if exposed
5. Use different credentials for dev/prod
