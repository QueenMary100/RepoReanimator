import { StatCard } from "./StatCard";
import { RepoCard } from "./RepoCard";
import { Zap, Flame, GitFork, Trophy, Target, Calendar } from "lucide-react";
import { Progress } from "./ui/progress";

const mockRecentActivity = [
  {
    name: "abandoned-ml-project",
    description: "A machine learning project for image classification that was left incomplete with partial model training code",
    language: "Python",
    stars: 234,
    forks: 45,
    lastUpdate: "2 years ago",
    deadScore: 85,
    topics: ["machine-learning", "tensorflow", "python"],
  },
  {
    name: "old-react-dashboard",
    description: "Admin dashboard built with React 16 that needs migration to modern hooks and updated dependencies",
    language: "TypeScript",
    stars: 567,
    forks: 123,
    lastUpdate: "18 months ago",
    deadScore: 72,
    topics: ["react", "dashboard", "typescript"],
  },
];

export const DashboardView = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient">Reanimator</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your progress and discover new repos to revive
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total XP"
            value="12,450"
            subtitle="Level 24"
            icon={Zap}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Current Streak"
            value="7 days"
            subtitle="Best: 14 days"
            icon={Flame}
          />
          <StatCard
            title="Repos Revived"
            value="23"
            subtitle="This month: 5"
            icon={GitFork}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Global Rank"
            value="#42"
            subtitle="Top 5%"
            icon={Trophy}
          />
        </div>

        {/* XP Progress */}
        <div className="rounded-xl border border-border/50 bg-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Level Progress</h2>
              <p className="text-sm text-muted-foreground">2,450 / 5,000 XP to Level 25</p>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">49% complete</span>
            </div>
          </div>
          <Progress value={49} className="h-3" />
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Est. 12 days to next level</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Revival Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRecentActivity.map((repo) => (
              <RepoCard key={repo.name} {...repo} />
            ))}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Skills Unlocked</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Python", level: 8, color: "bg-green-500" },
              { name: "TypeScript", level: 6, color: "bg-blue-500" },
              { name: "React", level: 5, color: "bg-cyan-400" },
              { name: "Machine Learning", level: 3, color: "bg-orange-500" },
            ].map((skill) => (
              <div key={skill.name} className="text-center">
                <div className={`mx-auto h-16 w-16 rounded-full ${skill.color}/20 flex items-center justify-center mb-2 border-2 border-current`} style={{ borderColor: `var(--tw-${skill.color})` }}>
                  <span className="text-xl font-bold text-foreground">{skill.level}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
