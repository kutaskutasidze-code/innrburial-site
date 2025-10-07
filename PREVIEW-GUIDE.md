# Preview Changes Before Deployment

## Method 1: Local Preview (Recommended)
```bash
cd /Users/macintoshi/Desktop/innrburial-site
npx vercel dev
```
Then open: http://localhost:3000

## Method 2: Vercel Preview Deployment
```bash
vercel --prod=false
```
This creates a temporary preview URL that expires

## Method 3: Direct File Preview
Simply open HTML files in your browser:
```bash
open /Users/macintoshi/Desktop/innrburial-site/index.html
```

Note: API functions won't work in direct file preview
