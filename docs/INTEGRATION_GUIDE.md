# Integration Guide - Connecting Lovable Frontend to Backend

## 🎯 Overview

Your frontend is deployed at: https://reporeanimator.lovable.app
This guide will help you connect it to the backend we've built.

## 🔗 Integration Steps

### Step 1: Deploy Backend

#### Option A: Deploy to Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your RepoReanimator repository
   - Select the `backend` folder as root

3. **Add PostgreSQL Database**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

4. **Add Redis (Optional but Recommended)**
   - Click "New" → "Database" → "Redis"
   - Railway will automatically set REDIS_URL

5. **Set Environment Variables**
   ```
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_TOKEN=your_github_personal_access_token
   JWT_SECRET=your_random_secret_32_chars_minimum
   GITHUB_WEBHOOK_SECRET=your_webhook_secret
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://reporeanimator.lovable.app
   ```

6. **Deploy**
   - Railway will automatically deploy
   - Note your backend URL (e.g., `https://reporeanimator-backend.up.railway.app`)

#### Option B: Deploy to Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && npm start`
5. Add PostgreSQL database
6. Set environment variables (same as Railway)
7. Deploy

### Step 2: Update Frontend Environment Variables

In your Lovable project, update the environment variables:

```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

Or if using Next.js:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
```

### Step 3: Update CORS in Backend

The backend is already configured to accept your frontend URL. Verify in `backend/src/index.ts`:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
```

Make sure `FRONTEND_URL` environment variable is set to `https://reporeanimator.lovable.app`

### Step 4: Update API Client in Frontend

If your Lovable frontend doesn't have an API client yet, add this:

**src/lib/api.ts**
```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Step 5: Implement API Calls

#### Fetch Abandoned Repos
```typescript
import { api } from '@/lib/api';

export async function fetchRepos(params: {
  topics?: string[];
  language?: string;
  page?: number;
  limit?: number;
}) {
  const response = await api.get('/repos/discover', { params });
  return response.data;
}
```

#### Claim a Revival
```typescript
export async function claimRevival(repoId: string) {
  const response = await api.post('/revivals/claim', { repoId });
  return response.data;
}
```

#### Get User Stats
```typescript
export async function getUserStats() {
  const response = await api.get('/users/me');
  return response.data;
}
```

#### Get Leaderboard
```typescript
export async function getLeaderboard(period: string = 'weekly') {
  const response = await api.get('/leaderboard', { 
    params: { period } 
  });
  return response.data;
}
```

### Step 6: Setup GitHub OAuth

1. **Update GitHub OAuth App**
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Update callback URL to: `https://your-backend-url.railway.app/api/auth/github/callback`

2. **Implement Auth Flow in Frontend**

```typescript
// Login button
const handleGitHubLogin = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = `${import.meta.env.VITE_API_URL}/api/auth/github/callback`;
  const scope = 'read:user user:email';
  
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
};

// Handle callback (in a callback page)
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  
  if (token) {
    localStorage.setItem('token', token);
    // Fetch user data
    api.get('/users/me').then(({ data }) => {
      setUser(data.user);
      navigate('/dashboard');
    });
  }
}, []);
```

### Step 7: Test Integration

1. **Health Check**
   ```bash
   curl https://your-backend-url.railway.app/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Test API Endpoint**
   ```bash
   curl https://your-backend-url.railway.app/api/repos/discover?limit=5
   ```

3. **Test from Frontend**
   - Open browser console on your Lovable app
   - Run:
   ```javascript
   fetch('https://your-backend-url.railway.app/api/repos/discover?limit=5')
     .then(r => r.json())
     .then(console.log)
   ```

### Step 8: Implement Key Features

#### Dashboard Page
```typescript
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [revivals, setRevivals] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/users/me'),
      api.get('/revivals/my')
    ]).then(([statsRes, revivalsRes]) => {
      setStats(statsRes.data);
      setRevivals(revivalsRes.data.revivals);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {stats && (
        <div className="grid grid-cols-4 gap-4">
          <StatsCard title="XP" value={stats.user.xp} />
          <StatsCard title="Level" value={stats.user.level} />
          <StatsCard title="Streak" value={stats.user.currentStreak} />
          <StatsCard title="Revivals" value={revivals.length} />
        </div>
      )}
    </div>
  );
}
```

#### Discover Page
```typescript
export default function Discover() {
  const [repos, setRepos] = useState([]);
  const [filters, setFilters] = useState({
    topics: [],
    language: '',
    page: 1
  });

  useEffect(() => {
    api.get('/repos/discover', { params: filters })
      .then(({ data }) => setRepos(data.repos));
  }, [filters]);

  return (
    <div>
      <h1>Discover Abandoned Repos</h1>
      <Filters onChange={setFilters} />
      <div className="grid grid-cols-3 gap-4">
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
```

#### Leaderboard Page
```typescript
export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [period, setPeriod] = useState('weekly');

  useEffect(() => {
    api.get('/leaderboard', { params: { period } })
      .then(({ data }) => setEntries(data.entries));
  }, [period]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <PeriodTabs value={period} onChange={setPeriod} />
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>XP</th>
            <th>Revivals</th>
            <th>Contributions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.userId}>
              <td>{entry.rank}</td>
              <td>{entry.username}</td>
              <td>{entry.xp}</td>
              <td>{entry.revivals}</td>
              <td>{entry.contributions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 🔐 Security Checklist

- [ ] HTTPS enabled on backend
- [ ] CORS configured for your frontend domain only
- [ ] Environment variables set securely
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] GitHub OAuth callback URL is correct
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints

## 🐛 Troubleshooting

### CORS Errors
**Problem**: "Access to fetch blocked by CORS policy"
**Solution**: 
- Verify FRONTEND_URL in backend environment variables
- Check CORS configuration in backend/src/index.ts
- Ensure credentials: true in both frontend and backend

### 401 Unauthorized
**Problem**: API returns 401 errors
**Solution**:
- Check if token is being sent in Authorization header
- Verify JWT_SECRET matches between requests
- Check token expiration

### Connection Refused
**Problem**: Cannot connect to backend
**Solution**:
- Verify backend is deployed and running
- Check backend URL is correct in frontend env
- Test backend health endpoint directly

### Database Errors
**Problem**: Prisma errors or database connection issues
**Solution**:
- Run migrations: `npx prisma migrate deploy`
- Check DATABASE_URL is correct
- Verify database is accessible from backend

## 📊 Monitoring

### Backend Health
```bash
# Check if backend is running
curl https://your-backend-url.railway.app/health

# Check database connection
curl https://your-backend-url.railway.app/api/repos/discover?limit=1
```

### Frontend Integration
```javascript
// In browser console on your Lovable app
localStorage.getItem('token') // Should show JWT token
```

## 🚀 Next Steps

1. Deploy backend to Railway/Render
2. Update frontend environment variables
3. Test authentication flow
4. Implement dashboard page
5. Implement discover page
6. Implement leaderboard page
7. Test end-to-end flow
8. Add error handling and loading states
9. Optimize performance
10. Launch! 🎃

## 📞 Support

If you encounter issues:
1. Check backend logs in Railway/Render dashboard
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test API endpoints with curl/Postman
5. Review this guide step by step

---

**Your backend is ready to power your Lovable frontend!** 🎃👻
