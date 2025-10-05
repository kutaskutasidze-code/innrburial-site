#!/bin/bash

echo "🚀 INNRBURIAL Deployment Script"
echo "================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel
echo "📝 Step 1: Login to Vercel"
vercel login

# Deploy frontend
echo ""
echo "🎨 Step 2: Deploying Frontend to Vercel..."
vercel --prod

echo ""
echo "✅ Frontend deployed!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Railway or Render"
echo "2. Set up PostgreSQL database"
echo "3. Configure environment variables (see README.md)"
echo "4. Update API_URL in app.js with your backend URL"
echo "5. Redeploy frontend with: vercel --prod"
echo ""
echo "📖 Full instructions in README.md"
