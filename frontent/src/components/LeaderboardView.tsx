import { LeaderboardTable } from "./LeaderboardTable";
import { Button } from "./ui/button";
import { Trophy, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mockLeaderboard = [
  { rank: 1, username: "ghostcoder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ghost", xp: 45230, reposRevived: 87, streak: 45 },
  { rank: 2, username: "reanimator_pro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=reanimate", xp: 42100, reposRevived: 76, streak: 32 },
  { rank: 3, username: "code_necro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=necro", xp: 38900, reposRevived: 65, streak: 28 },
  { rank: 4, username: "revival_master", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=revival", xp: 35200, reposRevived: 58, streak: 21 },
  { rank: 5, username: "zombie_dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zombie", xp: 32800, reposRevived: 52, streak: 19 },
  { rank: 6, username: "undead_coder", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=undead", xp: 29500, reposRevived: 48, streak: 15 },
  { rank: 7, username: "spirit_hacker", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=spirit", xp: 27100, reposRevived: 43, streak: 12 },
  { rank: 8, username: "phantom_dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phantom", xp: 24800, reposRevived: 39, streak: 10 },
];

const timeFilters = [
  { id: "all", label: "All Time" },
  { id: "month", label: "This Month" },
  { id: "week", label: "This Week" },
];

export const LeaderboardView = () => {
  const [timeFilter, setTimeFilter] = useState("all");

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 animate-glow-pulse">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Top Repo Reanimators ranked by XP and contributions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">892</p>
            <p className="text-xs text-muted-foreground">Active Reanimators</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <Trophy className="h-5 w-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">45.2K</p>
            <p className="text-xs text-muted-foreground">Total XP Earned</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <Calendar className="h-5 w-5 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">1,234</p>
            <p className="text-xs text-muted-foreground">Repos Revived</p>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                timeFilter === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <LeaderboardTable entries={mockLeaderboard} />

        {/* Your Position */}
        <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-mono text-muted-foreground">#42</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Your Position</p>
              <p className="text-sm text-muted-foreground">12,450 XP • 23 repos revived</p>
            </div>
          </div>
          <Button variant="neon" size="sm">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
