#!/bin/bash
echo "🧹 Starting cleanup..."
cd /Users/macintoshi/Desktop/Claude/innrburial-site
find . -name "*.backup" -delete
find . -name "*-e" -delete
find . -name ".DS_Store" -delete
echo "✅ Cleanup done"
