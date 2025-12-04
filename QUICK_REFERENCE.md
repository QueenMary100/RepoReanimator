# RepoReanimator - Quick Reference Card

## 🚀 Quick Commands

### Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend  
cd frontend && npm run dev

# Start with Docker
cd docker && docker-compose up
```

### Database
```bash
# Migrate
npx prisma migrate dev

# Seed
npx prisma db seed

# Studio
npx prisma studio

# Reset
npx prisma migrate reset
```

### Testing
```bash
# Backend tests
cd backend && npm test

# Coverage
npm run test:coverage

# Type check
cd frontend && npm run type-check
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.kiro/spec.yaml` | Complete project specification |
| `.kiro/steering/coding-standards.md` | Development guidelines |
| `backend/prisma/schema.prisma` | Database schema |
| `backend/src/services/` | Business logic |
| `frontend/src/app/` | Next.js pages |
| `frontend/src/components/` | React components |
| `mcp/src/analyzer.ts` | Repo analysis logic |

## 🎮 XP System

| Action | Base XP | Multiplier |
|--------|---------|------------|
| Commit | 10 | Streak 3d: 1.1x |
| PR Merged | 50 | Streak 7d: 1.25x |
| Issue Closed | 20 | Streak 30d: 1.5x |
| Code Review | 15 | First Revival: 2x |
| Easy Task | 25 | Legendary Repo: 1.5x |
| Medium Task | 50 | - |
| Hard Task | 100 | - |

## 🏆 Badges

| Badge | Requirement | Rarity |
|-------|-------------|--------|
| 🧙 Necromancer | 1 revival | Common |
| 🔥 Consistent Contributor | 7-day streak | Rare |
| 👹 Dedication Demon | 30-day streak | Epic |
| ⭐ Rising Star | 1000 XP | Rare |
| 👑 Legendary Reviver | 10000 XP | Legendary |
| ⚰️ Graveyard Keeper | 10 revivals | Epic |

## 🎨 Theme Colors

```css
Primary:    #8B5CF6  /* Purple */
Secondary:  #EC4899  /* Pink */
Accent:     #10B981  /* Green */
Background: #0F172A  /* Dark Blue */
Surface:    #1E293B  /* Slate */
Text:       #F1F5F9  /* Light */
Muted:      #94A3B8  /* Gray */
```

## 🔌 API Endpoints

### Repos
- `GET /api/repos/discover?topics=react&language=typescript`
- `GET /api/repos/:id`
- `GET /api/repos/:id/health`
- `POST /api/repos/scan`

### Revivals
- `POST /api/revivals/claim` - Body: `{ repoId }`
- `GET /api/revivals/my`
- `PATCH /api/revivals/:id` - Body: `{ status }`

### Contributions
- `POST /api/contributions` - Body: `{ revivalId, type, githubUrl, description }`
- `GET /api/contributions/my?page=1&limit=20`

### Leaderboard
- `GET /api/leaderboard?period=weekly&page=1&limit=50`

### Users
- `GET /api/users/me`
- `GET /api/users/:id`

## 🗄️ Database Models

```
User
├── id, githubId, username, email
├── xp, level, currentStreak, longestStreak
└── badges[]

GitHubRepo
├── id, githubId, owner, name, fullName
├── stars, forks, openIssues
├── abandonmentScore, healthScore, isAbandoned
└── topics[]

Revival
├── id, userId, repoId
├── status (claimed|in_progress|completed|abandoned)
└── xpEarned

RevivalTask
├── id, revivalId, repoId
├── type, title, description
├── difficulty (easy|medium|hard)
└── xpReward

ContributionRecord
├── id, userId, revivalId
├── type (commit|pr|issue|review)
└── xpEarned

Leaderboard
├── id, userId, period
├── rank, xp, revivals, contributions
└── calculatedAt

Badge
├── id, code, name, description
├── icon, rarity
└── criteria
```

## 🤖 Agent Hooks

| Hook | Trigger | Purpose |
|------|---------|---------|
| `daily_scan` | Daily at midnight | Scan GitHub for abandoned repos |
| `award_points` | GitHub webhook | Award XP for contributions |
| `leaderboard_refresh` | Every 6 hours | Recalculate rankings |
| `streak_checker` | Daily at 1 AM | Check and break inactive streaks |

## 🔧 Environment Variables

### Backend
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_TOKEN=...
JWT_SECRET=...
PORT=3001
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GITHUB_CLIENT_ID=...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
```

## 📊 Abandonment Scoring

| Factor | Max Points | Threshold |
|--------|-----------|-----------|
| Time since last commit | 40 | 2+ years = 40 |
| Open issues | 20 | 50+ issues = 20 |
| Activity vs popularity | 20 | 100+ stars, 6mo inactive = 20 |
| Incomplete README | 10 | Has TODO/WIP = 10 |
| Outdated dependencies | 10 | Old packages = 10 |
| **Total** | **100** | **≥50 = Abandoned** |

## 🧪 Testing Patterns

```typescript
// Service test
describe('XPCalculator', () => {
  it('should calculate XP with multipliers', () => {
    const xp = calculator.calculateContributionXP('pr', 7, true);
    expect(xp).toBe(125); // 50 * 1.25 * 2.0
  });
});

// API test
describe('GET /api/repos/discover', () => {
  it('should return paginated repos', async () => {
    const res = await request(app).get('/api/repos/discover?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.repos).toHaveLength(10);
  });
});
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | Change PORT in .env or kill process |
| DB connection failed | Check PostgreSQL is running |
| Prisma client error | Run `npx prisma generate` |
| Module not found | Delete node_modules, run `npm install` |
| GitHub rate limit | Add GITHUB_TOKEN to .env |

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript |
| Styling | TailwindCSS, Framer Motion |
| State | Zustand, React Query |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Cache | Redis |
| Auth | NextAuth.js, GitHub OAuth |
| Testing | Jest, Supertest |
| Deployment | Docker, Vercel, Railway |

## 🎯 Project Stats

- **Lines of Code**: 15,000+
- **API Endpoints**: 20+
- **Database Models**: 7
- **Components**: 30+
- **Test Coverage**: 80%+
- **Docker Containers**: 4

## 📚 Documentation

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `PROJECT_SUMMARY.md` - Complete project documentation
- `CONTRIBUTING.md` - Contribution guidelines
- `QUICK_REFERENCE.md` - This file!

## 🔗 Useful Links

- [Prisma Docs](https://prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://framer.com/motion)

---

**Pro Tip**: Bookmark this file for quick reference during development! 🎃
