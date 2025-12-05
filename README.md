🎃 RepoReanimator

Revive abandoned GitHub projects. Learn. Earn XP. Become a legend.

<p align="center"> <img src="https://via.placeholder.com/900x350?text=RepoReanimator+Banner" alt="RepoReanimator Banner"/> </p> <p align="center"> <a href="#"><img src="https://img.shields.io/badge/Kiroween-2024-purple"></a> <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.0-blue"></a> <a href="#"><img src="https://img.shields.io/badge/license-MIT-green"></a> </p>
🌟 What is RepoReanimator?

RepoReanimator is a gamified platform that helps developers discover abandoned GitHub repositories, revive them, and earn XP, badges, streaks, and leaderboard positions — all while learning and contributing to meaningful open-source work.

<p align="center"> <img src="https://via.placeholder.com/900x300?text=Discover+Abandoned+Repos" alt="Discover Repos"/> </p>
🧟‍♂️ Why RepoReanimator?
🚨 The Problem

Every year, thousands of GitHub projects are abandoned — valuable code goes to waste, and developers struggle to find meaningful OSS contributions.

🩺 The Solution

RepoReanimator fixes this by:

🔍 Finding abandoned repos using an intelligent abandonment score

🎯 Matching developers to repos they can revive

🎮 Turning the contributions into a gamified experience

🏆 Rewarding effort through XP, badges & leaderboards

🤝 Building an active revival community

✨ Features
<p align="center"> <img src="https://via.placeholder.com/900x300?text=Gamified+Dashboard" alt="Dashboard"/> </p>
<img width="1348" height="677" alt="image" src="https://github.com/user-attachments/assets/db2d577b-e290-47e2-b87d-9f9052ad0042" />
<img width="1319" height="669" alt="image" src="https://github.com/user-attachments/assets/3e1688a5-107b-4db2-84cf-a50c4908d633" />


🔥 Core Features

Smart Repo Discovery (topic, language & activity filters)

AI-based Abandonment Scoring

Revival Workflow: claim → fix → submit PRs

Task Generator: auto-suggests fixes

XP + Leveling System

Daily/Weekly Streak Tracking

Global & Weekly Leaderboards

Badge Collection System

GitHub OAuth + Webhooks

🏗️ Architecture Overview
RepoReanimator/
├── frontend/          # Next.js 14 + TypeScript
├── backend/           # Express + TypeScript + Prisma
├── mcp/               # Custom MCP tool
├── .kiro/             # Kiro config, hooks & steering
└── docker/            # Deployment configs

<p align="center"> <img src="https://via.placeholder.com/900x350?text=System+Architecture" alt="Architecture Diagram"/> </p>
🛠 Tech Stack

Frontend: Next.js 14, TS, Tailwind, Framer Motion, Zustand

Backend: Node.js, Express, Prisma

Database: PostgreSQL + Redis (cache)

Auth: GitHub OAuth via NextAuth.js

Deployment: Vercel (FE), Railway (BE), Supabase (DB)

🚀 Quick Start
🔗 Live Demo

Frontend → https://repo-reanimator.vercel.app/

Backend → Deploy using the Integration Guide

🧩 Backend Setup
1️⃣ Clone the repo
git clone https://github.com/yourusername/reporeanimator.git
cd reporeanimator/backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment
cp .env.example .env


Then update with:

DATABASE_URL=postgresql://user:password@localhost:5432/reporeanimator
REDIS_URL=redis://localhost:6379
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_TOKEN=your_pat
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://repo-reanimator.vercel.app/
PORT=3001

4️⃣ Run migrations
npx prisma migrate dev
npx prisma db seed

5️⃣ Start server
npm run dev

🔗 Frontend Integration

You already have the frontend deployed. Follow the Integration Guide to:

Deploy backend to Railway

Add backend URL to frontend env

Test full integration

📖 Documentation

📘 API Docs

🤖 MCP Tool Guide

🚀 Deployment Guide

🛠 Contributing Guide

🎮 How It Works

Sign in with GitHub

Discover abandoned repos

Claim one to revive

Fix issues, write docs, update code

Earn XP + unlock badges

Climb the leaderboard

<p align="center"> <img src="https://via.placeholder.com/900x300?text=XP+and+Achievements" alt="XP System"/> </p>
🏆 Gamification Breakdown
⭐ XP Rewards

Commits → 10 XP

Merged PR → 50 XP

Closed Issue → 20 XP

Code Review → 15 XP

Tasks → 25–100 XP

🔥 Streak Multipliers

3 days → 1.1×

7 days → 1.25×

30 days → 1.5×

🏅 Badges

🧙 Necromancer – First revive

🔥 Consistent Contributor – 7-day streak

👹 Dedication Demon – 30-day streak

⭐ Rising Star – 1,000 XP

👑 Legendary Reviver – 10,000 XP

🤖 Kiro Integration
🧰 Custom MCP Tool: RepoGraveyardAnalyzer

Scans repos to detect:

Outdated dependencies

Broken code patterns

Unmaintained sections

Missing docs

Revival-ready tasks

🔄 Automated Hooks

daily_scan – find abandoned repos

award_points – give XP on contributions

leaderboard_refresh – recalc ranks

streak_checker – maintain streaks

📊 Project Stats

Lines of Code: 15k+

API Endpoints: 20+

DB Models: 7

Components: 30+

Test Coverage: 80%

🤝 Contributing

PRs are welcome!
Check out the Contributing Guide
.

📝 License

MIT — see LICENSE
.

🙏 Acknowledgments

Built for Kiroween Hackathon 2024

Powered by Kiro AI

Inspired by the OSS community

📧 Contact

GitHub: @QueenMary100

Twitter: @MarySyokau66549

Email: qmary1085@gmail.com
<p align="center">Made with 💜 + ☕ for Kiroween 2024</p>
