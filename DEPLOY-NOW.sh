#!/bin/bash

echo "🚀 INNRBURIAL Deployment Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Deploying Frontend to Vercel${NC}"
echo "--------------------------------------"
echo ""
echo "Please run these commands:"
echo ""
echo "  vercel login"
echo "  vercel --prod"
echo ""
read -p "Press Enter when frontend is deployed..."

# Get the deployed URL
read -p "Enter your Vercel frontend URL (e.g., https://innrburial.vercel.app): " FRONTEND_URL
echo ""

echo -e "${BLUE}Step 2: Deploy Backend to Railway${NC}"
echo "--------------------------------------"
echo ""
echo "1. Go to https://railway.app and sign up/login"
echo "2. Click 'New Project' → 'Empty Project'"
echo "3. Click 'New' → 'Database' → 'PostgreSQL'"
echo "4. Click 'New' → 'GitHub Repo' or 'Empty Service'"
echo ""
echo "5. In Railway, set these environment variables:"
echo "   NODE_ENV=production"
echo "   EMAIL_USER=your-gmail@gmail.com"
echo "   EMAIL_PASS=your-app-password (get from https://myaccount.google.com/apppasswords)"
echo "   ADMIN_EMAIL=admin@innrburial.com"
echo ""
echo "6. Deploy the backend folder:"
echo "   cd backend"
echo "   railway login"
echo "   railway link"
echo "   railway up"
echo ""
read -p "Press Enter when backend is deployed..."

# Get backend URL
read -p "Enter your Railway backend URL (e.g., https://innrburial-production.up.railway.app): " BACKEND_URL
echo ""

echo -e "${BLUE}Step 3: Connecting Frontend to Backend${NC}"
echo "--------------------------------------"
echo ""

# Update API URLs
API_URL="${BACKEND_URL}/api"
sed -i '' "s|http://localhost:3000/api|${API_URL}|g" app.js
sed -i '' "s|http://localhost:3000/api|${API_URL}|g" book-order-new.html

echo -e "${GREEN}✅ Updated API URLs to: ${API_URL}${NC}"
echo ""
echo "Now redeploying frontend with updated API URL..."
vercel --prod

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Your URLs:${NC}"
echo "  Frontend: ${FRONTEND_URL}"
echo "  Backend:  ${BACKEND_URL}"
echo "  API:      ${API_URL}"
echo ""
echo -e "${BLUE}Test your site:${NC}"
echo "  1. Visit: ${FRONTEND_URL}/contact.html"
echo "  2. Submit the contact form"
echo "  3. Check your email (ADMIN_EMAIL)"
echo ""
echo -e "${BLUE}Admin Dashboard:${NC}"
echo "  Contacts: ${BACKEND_URL}/api/contacts"
echo "  Orders:   ${BACKEND_URL}/api/orders"
echo ""
echo "🎊 Your INNRBURIAL website is LIVE!"
echo ""
