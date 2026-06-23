# Vercel Deployment Troubleshooting Guide

## 🚨 404 Not Found Error

### Quick Diagnostic Steps

1. **Test locally first**
   ```bash
   npm run build
   npm run start
   ```
   If this works locally, the issue is likely environment-specific.

2. **Check deployment URL format**
   - ✅ Correct: `https://crypto-advisor-xyz.vercel.app`
   - ✅ Correct: `https://crypto-advisor.vercel.app`
   - ❌ Wrong: `https://crypto-advisor.vercel.app/undefined`

3. **Test the debug page**
   ```
   https://your-deployment.vercel.app/debug
   ```
   If this shows, the app is deploying correctly.

### Common Issues & Fixes

#### Issue 1: Root Path Returns 404
**Symptoms**: Root URL shows 404, but `/debug` works

**Solution**: Check `next.config.js`
```js
// ✅ Correct
module.exports = {
  reactStrictMode: true,
};

// ❌ Wrong (causes 404)
module.exports = {
  basePath: '/crypto',  // Don't add this unless needed
};
```

#### Issue 2: Environment Variables Missing
**Symptoms**: API returns 500, but `/debug` loads

**Fix**: Add to Vercel Project Settings
1. Go to Project Settings → Environment Variables
2. Add: `GROQ_API_KEY=your_key`
3. Redeploy

```bash
vercel env pull  # Pull from Vercel to local .env.local
```

#### Issue 3: Build Errors Not Showing
**Symptoms**: Deployment says "Success" but 404 on all routes

**Debug**:
```bash
# Check build output locally
npm run build 2>&1 | head -100

# Check for TypeScript errors
npx tsc --noEmit

# Verify all files are committed
git status
```

#### Issue 4: Static Files 404 (manifest.json, robots.txt)
**Symptoms**: 404 for `/manifest.json` or `/robots.txt`

**Solution**: Files must be in `/public` directory
```
✅ /public/manifest.json
✅ /public/robots.txt
❌ /manifest.json (root directory)
```

### Step-by-Step Redeployment

If still getting 404 after fixes:

```bash
# 1. Clean everything locally
rm -rf node_modules .next
npm install

# 2. Test build locally
npm run build
npm run start
# Visit http://localhost:3000

# 3. Verify git state
git status
git log --oneline -3

# 4. Create fresh Vercel deployment
npm i -g vercel
vercel  # This creates new deployment

# 5. Set environment variables
vercel env add GROQ_API_KEY
# Follow the prompts

# 6. Trigger rebuild
vercel --prod
```

### Vercel Build Settings

Go to **Project Settings → Build & Development Settings**:

```
Build Command:        npm run build
Output Directory:     .next
Install Command:      npm install
Development Command:  npm run dev
```

If these differ, update them to match.

### Check Deployment Logs

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Click "Deployments" tab
3. Click the failed deployment
4. Scroll to "Build Logs" section
5. Look for errors like:
   - `ERR_MODULE_NOT_FOUND`
   - `ENOENT: no such file`
   - `Cannot find module`

### TypeScript Build Issues

If logs show TypeScript errors:

```bash
# Fix locally first
npx tsc --noEmit

# Common fixes:
# 1. Check for unused imports
# 2. Verify all files are saved
# 3. Clear Next.js cache
rm -rf .next
npm run build
```

### Turbopack Specific Issues

Vercel uses Turbopack for faster builds. If issues:

1. **Clear Vercel cache**
   - Project Settings → Git → Clear build cache
   - Redeploy

2. **Check Turbopack compatibility**
   ```bash
   # If using incompatible features:
   npm run build -- --no-turbopack  # Local test only
   ```

### API Routes Not Working

If `/api/analyze` returns 404:

```bash
# 1. Verify file exists
ls -la app/api/analyze/route.ts

# 2. Test locally
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"market_data":{},"news":""}'

# 3. Check for errors in deployment
vercel logs --tail
```

### Network Issues

If deployment succeeds but app is slow/unresponsive:

1. **Check Vercel status**: https://vercel-status.com
2. **Use debug page**: Visit `/debug` endpoint
3. **Check API limits**: Monitor Groq API rate limits
4. **Enable Vercel Analytics**:
   ```bash
   # Add to next.config.js
   const { withVercelAnalytics } = require('@vercel/analytics/next')
   module.exports = withVercelAnalytics(nextConfig)
   ```

### Reset Everything

Nuclear option (starts fresh):

```bash
# 1. Delete Vercel deployment
vercel remove

# 2. Clean local cache
rm -rf .vercel .next node_modules
npm install

# 3. Test locally
npm run build
npm run start

# 4. Deploy fresh
vercel --prod
```

### Real-Time Debugging

Enable verbose logging:

```bash
# Deploy with debug output
vercel deploy --prod --debug

# Watch Vercel logs in real-time
vercel logs --tail --follow
```

### Common HTTP Error Codes

| Code | Cause | Fix |
|------|-------|-----|
| 404 | Route not found | Check file structure in `/app` |
| 500 | Server error | Check logs, verify GROQ_API_KEY |
| 503 | Service unavailable | Wait for Vercel/Groq API recovery |
| 502 | Bad gateway | Redeploy or check external APIs |

### Verify Deployment Structure

SSH into Vercel to check what was deployed:

```bash
# Get deployment ID
vercel list

# View files (if available)
vercel inspect <deployment-id>
```

### File Structure Checklist

Ensure these exist:

```
✅ app/
  ✅ layout.tsx
  ✅ page.tsx
  ✅ globals.css
  ✅ api/
    ✅ analyze/route.ts
  ✅ feed/page.tsx
  ✅ terminal/page.tsx
  ✅ settings/page.tsx
  ✅ debug/page.tsx
✅ components/
  ✅ BottomNavigation.tsx
  ✅ Dashboard.tsx
  ✅ ... (all .tsx files)
✅ public/
  ✅ manifest.json
  ✅ robots.txt
✅ package.json
✅ tsconfig.json
✅ next.config.js
✅ tailwind.config.js
✅ postcss.config.js
✅ vercel.json
```

### Still Stuck?

1. Check Vercel docs: https://vercel.com/docs/frameworks/nextjs
2. View full build logs in Vercel dashboard
3. Try deploying to a new Vercel project
4. Verify Node.js version compatibility

```bash
# Check Node version
node --version
npm --version

# Vercel supports Node 18, 20 (not 16)
```

---

**If all else fails**: Delete the Vercel project and redeploy from scratch. This usually fixes mysterious 404 issues.
