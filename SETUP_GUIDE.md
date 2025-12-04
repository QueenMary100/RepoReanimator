# RepoReanimator Setup Guide

## 🎃 Quick Start (5 Minutes)

### Step 1: Prerequisites Check

Ensure you have installed:
- Node.js 18+ (`node --version`)
- PostgreSQL 14+ (`psql --version`)
- Git (`git --version`)
- npm or yarn

### Step 2: GitHub OAuth App Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: RepoReanimator Local
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Save the **Client ID** and **Client Secret**

### Step 3: Clone and Install

```bash
# Clone repository
git clone <your-repo-url>
cd RepoReanimator

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install MCP tool dependencies
cd ../mcp
npm install
```

### Step 4: Environment Configuration

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL="postgresql://reporeanimator:password@localhost:5432/reporeanimator"
REDIS_URL="redis://localhost:6379"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GITHUB_TOKEN="your_github_personal_access_token"
GITHUB_WEBHOOK_SECRET="your_webhook_secret"
JWT_SECRET="generate_a_random_secret_here"
PORT=3001
NODE_ENV="development"
```

**Frontend (.env.local)**
```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_secret_here
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Step 5: Database Setup

```bash
cd backend

# Create database
createdb reporeanimator

# Run migrations
npx prisma migrate dev

# Seed database with badges
npx prisma db seed

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### Step 6: Start Development Servers

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 3 - MCP Tool (Optional)**
```bash
cd mcp
npm run dev
```

### Step 7: Verify Installation

1. Backend: Visit `http://localhost:3001/health` - should return `{"status":"ok"}`
2. Frontend: Visit `http://localhost:3000` - should see landing page
3. Database: Run `npx prisma studio` - should open database viewer

## 🐳 Docker Setup (Alternative)

### Quick Start with Docker

```bash
# Copy environment file
cp docker/.env.example docker/.env

# Edit docker/.env with your credentials

# Start all services
cd docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## 🧪 Running Tests

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- AbandonmentScorer.test.ts
```

### Frontend Tests
```bash
cd frontend

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 🔧 Common Issues & Solutions

### Issue: Database connection failed
**Solution**: 
- Ensure PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in .env
- Verify database exists: `psql -l`

### Issue: Port already in use
**Solution**:
```bash
# Find process using port 3001
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Kill the process or change PORT in .env
```

### Issue: Prisma client not generated
**Solution**:
```bash
cd backend
npx prisma generate
```

### Issue: GitHub API rate limit
**Solution**:
- Create a GitHub Personal Access Token
- Add to .env as GITHUB_TOKEN
- This increases rate limit from 60 to 5000 requests/hour

### Issue: Module not found errors
**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)

```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Deploy to Railway (Backend)

1. Create account at railway.app
2. Create new project
3. Add PostgreSQL database
4. Deploy from GitHub
5. Add environment variables
6. Deploy!

### Deploy to Render (Backend Alternative)

1. Create account at render.com
2. New Web Service from GitHub
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

## 🎯 Development Workflow

### 1. Create a new feature

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ...

# Run tests
npm test

# Commit with clear message
git commit -m "feat: add user profile page"

# Push and create PR
git push origin feature/your-feature-name
```

### 2. Database changes

```bash
# Edit prisma/schema.prisma
# ...

# Create migration
npx prisma migrate dev --name add_new_field

# Generate Prisma client
npx prisma generate
```

### 3. Adding new API endpoint

1. Create route in `backend/src/routes/`
2. Create controller in `backend/src/controllers/`
3. Create service in `backend/src/services/`
4. Add tests in `backend/tests/`
5. Update API documentation

### 4. Adding new component

1. Create component in `frontend/src/components/`
2. Add types in `frontend/src/types/`
3. Use in pages
4. Add tests (optional)

## 📚 Useful Commands

### Backend
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Database
npx prisma studio          # Open database GUI
npx prisma migrate dev     # Run migrations
npx prisma db seed         # Seed database
npx prisma generate        # Generate client

# Testing
npm test                   # Run tests
npm run test:coverage      # Coverage report
```

### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Docker
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild
docker-compose up -d --build

# Remove volumes
docker-compose down -v
```

## 🔐 Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Keep dependencies updated
- [ ] Use GitHub webhook secret
- [ ] Enable database backups

## 📊 Monitoring

### Health Checks
- Backend: `GET /health`
- Database: `npx prisma db execute --stdin < "SELECT 1"`

### Logs
- Backend: `logs/combined.log` and `logs/error.log`
- Frontend: Browser console
- Docker: `docker-compose logs -f`

## 🎓 Learning Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🆘 Getting Help

1. Check this guide
2. Review PROJECT_SUMMARY.md
3. Check existing issues
4. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details

## 🎉 You're Ready!

Your RepoReanimator instance should now be running. Start by:
1. Signing in with GitHub
2. Discovering abandoned repos
3. Claiming your first revival
4. Earning XP and badges!

Happy reviving! 🎃👻
