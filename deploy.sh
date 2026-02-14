#!/bin/bash
# Valentine's Deploy Script
echo "💖 Starting Deployment for 'Will You Be My Valentine?'..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git..."
    git init
    git branch -M main
fi

# Check for remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
    # Hardcoded remote as provided by user
    NEW_REMOTE="https://github.com/snayan06/my-valentine.git"
    git remote add origin "$NEW_REMOTE" 2>/dev/null || git remote set-url origin "$NEW_REMOTE"
    echo "✅ Remote added: $NEW_REMOTE"
else
    echo "✅ Connected to: $REMOTE_URL"
fi

# Add all changes
echo "📦 Staging files..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy: Final Polish & Photo Update 💖"

# Push
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "---------------------------------------------------"
echo "✨ ALMOST DONE! ✨"
echo "1. Go to your repo on GitHub: $NEW_REMOTE"
echo "2. Click 'Settings' > 'Pages' (on the left)"
echo "3. Under 'Source', select 'Deploy from a branch'"
echo "4. Under 'Branch', select 'main' and click 'Save'"
echo "5. Wait 1-2 minutes, and your site will be live! 🌍"
echo "---------------------------------------------------"
