import { cn } from "@/lib/utils";
import { Trophy, Flame, Zap, Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  xp: number;
  reposRevived: number;
  streak: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  className?: string;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-muted-foreground font-mono">#{rank}</span>;
};

export const LeaderboardTable = ({ entries, className }: LeaderboardTableProps) => {
  return (
    <div className={cn("rounded-xl border border-border/50 bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-muted/50 border-b border-border/50 text-sm font-medium text-muted-foreground">
        <div>Rank</div>
        <div className="col-span-2">Developer</div>
        <div className="text-center">XP</div>
        <div className="text-center">Streak</div>
      </div>

      {/* Entries */}
      <div className="divide-y divide-border/30">
        {entries.map((entry, index) => (
          <div
            key={entry.username}
            className={cn(
              "grid grid-cols-5 gap-4 px-6 py-4 items-center transition-all duration-300 hover:bg-muted/30",
              entry.rank <= 3 && "bg-gradient-to-r from-primary/5 to-transparent"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
              {getRankIcon(entry.rank)}
            </div>

            {/* User */}
            <div className="col-span-2 flex items-center gap-3">
              <img
                src={entry.avatar}
                alt={entry.username}
                className="h-10 w-10 rounded-full border-2 border-primary/30"
              />
              <div>
                <p className="font-medium text-foreground">{entry.username}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.reposRevived} repos revived
                </p>
              </div>
            </div>

            {/* XP */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-bold text-foreground">{entry.xp.toLocaleString()}</span>
              </div>
            </div>

            {/* Streak */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="font-bold text-foreground">{entry.streak}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
