# Deployment Checklist for RepoReanimator

## 🎯 Current Status
- ✅ Frontend: Deployed at https://reporeanimator.lovable.app
- ⏳ Backend: Ready to deploy
- ⏳ Database: Needs setup
- ⏳ Integration: Pending

## 📋 Pre-Deployment Checklist

### 1. GitHub OAuth App Setup
- [ ] Create GitHub OAuth App
- [ ] Set Homepage URL: `https://reporeanimator.lovable.app`
- [ ] Set Authorization callback URL: `https://YOUR-BACKEND-URL/api/auth/github/callback`
- [ ] Save Client ID and Client Secret
- [ ] Create Personal Access Token for GitHub API (Settings → Developer settings → Personal access tokens)

### 2. Backend Deployment (Railway - Recommended)

#### Railway Setup
- [ ] Create Railway account at https://railway.app
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`

#### Add Databases
- [ ] Add PostgreSQL database
  - Click "New" → "Database" → "PostgreSQL"
  - Note: DATABASE_URL is automatically set
- [ ] Add Redis (optional but recommended)
  - Click "New" → "Database" → "Redis"
  - Note: REDIS_URL is automatically set

#### Set Environment Variables
```env
GITHUB_CLIENT_ID=<from_github_oauth_app>
GITHUB_CLIENT_SECRET=<from_github_oauth_app>
GITHUB_TOKEN=<your_personal_access_token>
GITHUB_WEBHOOK_SECRET=<generate_random_string>
JWT_SECRET=<generate_32_char_random_string>
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://reporeanimator.lovable.app
```

**Generate secrets:**
```bash
# JWT_SECRET (32 characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# GITHUB_WEBHOOK_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Note your backend URL (e.g., `https://reporeanimator-production.up.railway.app`)
- [ ] Test health endpoint: `https://YOUR-BACKEND-URL/health`

### 3. Update Frontend Environment Variables

In your Lovable project settings:
- [ ] Set `VITE_API_URL` to your Railway backend URL
- [ ] Set `VITE_GITHUB_CLIENT_ID` to your GitHub OAuth Client ID
- [ ] Redeploy frontend if needed

### 4. Update GitHub OAuth Callback

- [ ] Go back to GitHub OAuth App settings
- [ ] Update Authorization callback URL to: `https://YOUR-BACKEND-URL/api/auth/github/callback`
- [ ] Save changes

### 5. Database Migrations

Railway will automatically run migrations on deploy, but verify:
- [ ] Check Railway logs for "Prisma migrate deploy"
- [ ] Verify tables are created
- [ ] Run seed command if needed:
  ```bash
  # In Railway dashboard, open terminal and run:
  npx prisma db seed
  ```

### 6. Testing Integration

#### Backend Health Check
```bash
curl https://YOUR-BACKEND-URL/health
# Expected: {"status":"ok","timestamp":"..."}
```

#### Test API Endpoint
```bash
curl https://YOUR-BACKEND-URL/api/repos/discover?limit=5
# Expected: {"repos":[],"total":0,"page":1,...}
```

#### Test from Frontend
1. [ ] Open https://reporeanimator.lovable.app
2. [ ] Open browser console
3. [ ] Run:
```javascript
fetch('https://YOUR-BACKEND-URL/api/repos/discover?limit=5')
  .then(r => r.json())
  .then(console.log)
```
4. [ ] Should see response without CORS errors

#### Test Authentication Flow
- [ ] Click "Sign in with GitHub" on frontend
- [ ] Should redirect to GitHub
- [ ] After authorization, should redirect back with token
- [ ] Should see user dashboard

### 7. Scan Initial Repositories

Once backend is running, trigger initial repo scan:
```bash
curl -X POST https://YOUR-BACKEND-URL/api/repos/scan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "topics": ["javascript", "typescript", "python", "react", "nodejs"],
    "forceRescan": false
  }'
```

Or use the MCP tool to analyze specific repos.

### 8. Setup Monitoring

#### Railway Dashboard
- [ ] Check deployment logs
- [ ] Monitor resource usage
- [ ] Set up alerts for errors

#### Application Monitoring
- [ ] Test all API endpoints
- [ ] Verify database connections
- [ ] Check Redis cache (if enabled)
- [ ] Monitor response times

### 9. Security Verification

- [ ] HTTPS enabled on backend ✓ (Railway provides this)
- [ ] CORS configured for frontend domain only
- [ ] Environment variables are secure (not in code)
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] GitHub OAuth callback URL is correct
- [ ] Rate limiting is enabled
- [ ] Input validation on all endpoints

### 10. Performance Optimization

- [ ] Enable Redis caching for leaderboards
- [ ] Set up database indexes (already in schema)
- [ ] Monitor API response times
- [ ] Optimize slow queries if needed

## 🚀 Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Test complete user flow (signup → discover → claim → contribute)
- [ ] Verify XP calculation works
- [ ] Test leaderboard updates
- [ ] Check streak tracking

### Short-term (Week 1)
- [ ] Set up agent hooks for automation
- [ ] Configure GitHub webhooks
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Fix any critical bugs

### Medium-term (Month 1)
- [ ] Analyze usage patterns
- [ ] Optimize performance bottlenecks
- [ ] Add more features
- [ ] Improve documentation
- [ ] Scale infrastructure if needed

## 📊 Success Metrics

Track these metrics to ensure successful deployment:

- [ ] Backend uptime > 99%
- [ ] API response time < 500ms
- [ ] Zero critical errors
- [ ] Users can sign up and claim repos
- [ ] XP and streaks are calculated correctly
- [ ] Leaderboard updates properly

## 🐛 Troubleshooting

### Backend won't start
1. Check Railway logs for errors
2. Verify all environment variables are set
3. Check database connection
4. Ensure migrations ran successfully

### CORS errors
1. Verify FRONTEND_URL in backend env vars
2. Check it matches exactly: `https://reporeanimator.lovable.app`
3. No trailing slash
4. Redeploy backend after changes

### Database connection errors
1. Check DATABASE_URL is set by Railway
2. Verify PostgreSQL service is running
3. Check network connectivity
4. Review Railway database logs

### Authentication not working
1. Verify GitHub OAuth callback URL
2. Check GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
3. Ensure JWT_SECRET is set
4. Check token is being sent in requests

## 📞 Support Resources

- Railway Docs: https://docs.railway.app
- Prisma Docs: https://www.prisma.io/docs
- GitHub OAuth: https://docs.github.com/en/developers/apps/building-oauth-apps

## ✅ Final Verification

Before announcing launch:
- [ ] All checklist items completed
- [ ] End-to-end user flow tested
- [ ] No critical bugs
- [ ] Performance is acceptable
- [ ] Documentation is updated
- [ ] Monitoring is in place

## 🎉 Ready to Launch!

Once all items are checked:
1. Announce on social media
2. Submit to Kiroween hackathon
3. Share with developer communities
4. Gather feedback
5. Iterate and improve

---

**Good luck with your deployment!** 🎃👻
