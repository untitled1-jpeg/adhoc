---
description: How to initialize and push the Adhoc project to GitHub
---

# GitHub Setup Guide

Follow these steps to push your local `adhoc` project to a new GitHub repository for client sharing.

## 1. Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name the repository `adhoc`.
3. Keep it **Public** (or Private if you prefer client-only access).
4. **Do NOT** initialize with a README, license, or .gitignore (we already have these).

## 2. Connect Local Code to GitHub
Open your terminal in `/Users/joshcarroll/.gemini/antigravity/scratch/adhoc` and run:

```bash
# Add the remote (Replace YOUR_USERNAME with your GitHub handle)
git remote add origin https://github.com/YOUR_USERNAME/adhoc.git

# Rename branch to main (standard)
git branch -M main

# Push the code
git push -u origin main
```

## 3. Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import the `adhoc` repository you just pushed.
3. Keep default settings (Next.js preset).
4. Click **Deploy**.

> [!NOTE]
> Vercel will automatically detect our SEO metadata and production optimizations.
