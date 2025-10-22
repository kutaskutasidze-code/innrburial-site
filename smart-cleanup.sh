#!/bin/bash

echo "🧹 Starting Smart Cleanup..."

# Remove backup files ONLY
rm -f index-backup*.html
rm -f scroll-animations-backup*.js  
rm -f *-backup.html

# Remove redundant MD files (keeping essential ones)
rm -f AUTO-DEPLOY.md CLEANUP-BACKEND.md CONTACT-PAGE-DELETED.md
rm -f FIXES-APPLIED.md MANUAL-DEPLOY.md SECURITY-ALERT.md 
rm -f SUMMARY.md VIDEO-FIX.md

# Remove optimization-related files
rm -f index-optimized.html scroll-animations-optimized.js

# Remove old deployment scripts (Vercel handles it now)
rm -f DEPLOY-NOW.sh update-nav.sh deploy-optimizations.sh

# Remove temporary/test files
rm -f fix-nav.py
rm -f comprehensive-cleanup.sh

# Add .gitignore patterns to avoid tracking these
cat > .gitignore << 'GITEOF'
*-backup.html
*-backup*.js
*-optimized.html
*-optimized.js
node_modules/
.env.local
.DS_Store
*.log
GITEOF

echo "✅ Smart cleanup complete!"
