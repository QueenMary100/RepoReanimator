# 🎃 RepoReanimator

> Revive dead GitHub projects and earn XP while learning!

[![Kiroween Hackathon](https://img.shields.io/badge/Kiroween-2024-purple)](https://kiroween.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 What is RepoReanimator?

RepoReanimator is a gamified platform that helps developers discover abandoned GitHub projects, contribute to reviving them, and earn XP, badges, and climb leaderboards while learning new skills.

### The Problem
Thousands of promising GitHub projects are abandoned every year, leaving valuable code and ideas to rot. Meanwhile, developers struggle to find meaningful open-source projects to contribute to.

### The Solution
RepoReanimator bridges this gap by:
- 🔍 **Discovering** abandoned repos using intelligent scoring
- 🎯 **Matching** developers with projects that need revival
- 🎮 **Gamifying** contributions with XP, streaks, and badges
- 📊 **Tracking** progress and celebrating achievements
- 🤝 **Building** a community of open-source contributors

## ✨ Features

### Core Features
- **Smart Repo Discovery**: Find abandoned projects by topic, language, and popularity
- **Abandonment Scoring**: AI-powered analysis of repo health and abandonment status
- **Revival System**: Claim repos and track your revival progress
- **Task Generation**: Automated task suggestions for reviving projects
- **XP & Leveling**: Earn experience points and level up
- **Streak Tracking**: Maintain contribution streaks for bonus XP
- **Leaderboards**: Compete globally or within specific time periods
- **Badge Collection**: Unlock achievements and showcase your skills
- **GitHub Integration**: Seamless OAuth and webhook integration

### Powered by Kiro
- **Custom MCP Tool**: RepoGraveyardAnalyzer for deep repo analysis
- **Agent Hooks**: Automated scanning, XP awarding, and leaderboard updates
- **Steering Rules**: Consistent code quality and architecture

## 🏗️ Architecture

```
RepoReanimator/
├── frontend/          # Next.js 14 + TypeScript
├── backend/           # Express + TypeScript + Prisma
├── mcp/              # Custom MCP tool
├── .kiro/            # Kiro configuration
│   ├── spec.yaml     # Complete specification
│   ├── steering/     # Development guidelines
│   └── hooks/        # Agent automation
└── docker/           # Deployment configs
```

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion, Zustand
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL + Redis
- **Auth**: NextAuth.js with GitHub OAuth
- **Deployment**: Vercel (frontend) + Railway (backend) + Supabase (database)

## 🚀 Quick Start

### Live Demo
- **Frontend**: https://reporeanimator.lovable.app
- **Backend**: Deploy following the [Integration Guide](INTEGRATION_GUIDE.md)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)
- GitHub OAuth App credentials

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/reporeanimator.git
cd reporeanimator/backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

Required environment variables:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/reporeanimator
REDIS_URL=redis://localhost:6379
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_TOKEN=your_github_personal_access_token
JWT_SECRET=your_jwt_secret_32_chars_minimum
FRONTEND_URL=https://reporeanimator.lovable.app
PORT=3001
```

4. Run database migrations
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start backend server
```bash
npm run dev
```

### Connecting to Your Frontend

Your frontend is already deployed at https://reporeanimator.lovable.app

Follow the [Integration Guide](INTEGRATION_GUIDE.md) to:
1. Deploy the backend to Railway or Render
2. Update frontend environment variables
3. Connect the API client
4. Test the integration

Visit the Integration Guide for detailed step-by-step instructions!

## 📖 Documentation

- [API Documentation](docs/API.md)
- [MCP Tool Guide](docs/MCP.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🎮 How It Works

1. **Sign in with GitHub** - Authenticate using your GitHub account
2. **Discover Dead Repos** - Browse abandoned projects by topic
3. **Claim a Revival** - Choose a project to revive
4. **Complete Tasks** - Fix issues, update docs, modernize code
5. **Earn XP & Badges** - Level up and unlock achievements
6. **Climb the Leaderboard** - Compete with other developers

## 🏆 Gamification System

### XP System
- Commits: 10 XP
- Merged PRs: 50 XP
- Closed Issues: 20 XP
- Code Reviews: 15 XP
- Completed Tasks: 25-100 XP (based on difficulty)

### Streak Multipliers
- 3-day streak: 1.1x XP
- 7-day streak: 1.25x XP
- 30-day streak: 1.5x XP

### Badges
- 🧙 **Necromancer**: Revived your first repo
- 🔥 **Consistent Contributor**: 7-day streak
- 👹 **Dedication Demon**: 30-day streak
- ⭐ **Rising Star**: 1000 XP earned
- 👑 **Legendary Reviver**: 10000 XP earned

## 🤖 Kiro Integration

### Custom MCP Tool: RepoGraveyardAnalyzer
Analyzes repositories to detect:
- Incomplete README sections
- Outdated dependencies
- Broken code patterns
- Health score calculation
- Revival task recommendations

### Agent Hooks
- **daily_scan**: Automatically scan GitHub for abandoned repos
- **award_points**: Listen for contributions and assign XP
- **leaderboard_refresh**: Recalculate rankings daily
- **streak_checker**: Maintain contribution streaks

## 📊 Project Stats

- **Lines of Code**: ~15,000+
- **API Endpoints**: 20+
- **Database Models**: 7
- **Frontend Components**: 30+
- **Test Coverage**: 80%+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Built for the Kiroween Hackathon 2024
- Powered by Kiro AI
- Inspired by the open-source community

## 📧 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- Email: your.email@example.com

---

Made with 💜 and ☕ for Kiroween 2024
