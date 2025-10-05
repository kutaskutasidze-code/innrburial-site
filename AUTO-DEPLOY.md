# Auto-Deploy Setup (One-Time)

## Make Vercel Non-Interactive:

1. Login once:
   ```bash
   vercel login
   ```

2. Get your token:
   ```bash
   vercel whoami
   ```

3. Set token as environment variable:
   ```bash
   echo 'export VERCEL_TOKEN=your-token-here' >> ~/.zshrc
   source ~/.zshrc
   ```

Now Claude can deploy with: `vercel --token $VERCEL_TOKEN --prod --yes`

## Make Railway Non-Interactive:

1. Login once:
   ```bash
   railway login
   ```

2. Get token:
   ```bash
   railway whoami
   ```

3. Set token:
   ```bash
   echo 'export RAILWAY_TOKEN=your-token-here' >> ~/.zshrc
   source ~/.zshrc
   ```

Now Claude can deploy with: `railway up --token $RAILWAY_TOKEN`

## Then I Can Deploy Automatically!
