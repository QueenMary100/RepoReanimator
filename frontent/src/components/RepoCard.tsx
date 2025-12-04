import { cn } from "@/lib/utils";
import { GitFork, Star, Clock, AlertTriangle, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { GhostIcon } from "./GhostIcon";

interface RepoCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdate: string;
  deadScore: number;
  topics: string[];
  url?: string;
  haunted?: boolean;
  className?: string;
}

const getDeadScoreColor = (score: number) => {
  if (score >= 80) return "text-red-400";
  if (score >= 50) return "text-orange-400";
  return "text-yellow-400";
};

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    Rust: "bg-orange-500",
    Go: "bg-cyan-400",
    Java: "bg-red-500",
    "C++": "bg-pink-500",
    default: "bg-gray-400",
  };
  return colors[language] || colors.default;
};

export const RepoCard = ({
  name,
  description,
  language,
  stars,
  forks,
  lastUpdate,
  deadScore,
  topics,
  url,
  haunted = false,
  className,
}: RepoCardProps) => {
  const handleRevive = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-500 hover:border-primary/50 card-glow",
        haunted && "hover:animate-[haunted-shake_0.5s_ease-in-out] hover:shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--accent)/0.3)] hover:border-accent/70",
        className
      )}
    >
      {/* Dead score indicator */}
      <div className={cn(
        "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl transition-all duration-500 group-hover:from-primary/30 group-hover:to-accent/30",
        haunted && "group-hover:from-accent/50 group-hover:to-primary/50 group-hover:blur-3xl group-hover:h-32 group-hover:w-32"
      )} />
      
      {/* Haunted ghost overlay */}
      {haunted && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          <GhostIcon className="absolute -right-4 -top-4 h-16 w-16 text-accent/30 animate-float" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
        </div>
      )}
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "rounded-lg bg-muted p-2 transition-all duration-300 group-hover:bg-primary/10",
              haunted && "group-hover:bg-accent/20 group-hover:shadow-[0_0_15px_hsl(var(--accent)/0.5)]"
            )}>
              <GhostIcon className={cn(
                "h-5 w-5 text-primary floating",
                haunted && "group-hover:text-accent group-hover:animate-pulse"
              )} />
            </div>
            <div>
              <h3 className={cn(
                "font-semibold text-foreground transition-colors group-hover:text-primary",
                haunted && "group-hover:text-accent"
              )}>
                {name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "h-3 w-3 rounded-full",
                    getLanguageColor(language)
                  )}
                />
                <span className="text-xs text-muted-foreground">{language}</span>
              </div>
            </div>
          </div>
          
          {/* Dead Score Badge */}
          <div className={cn(
            "flex items-center gap-1 rounded-full bg-muted px-3 py-1 transition-all duration-300",
            haunted && "group-hover:bg-accent/20 group-hover:shadow-[0_0_10px_hsl(var(--accent)/0.4)]"
          )}>
            <AlertTriangle className={cn("h-4 w-4", getDeadScoreColor(deadScore))} />
            <span className={cn("text-sm font-bold", getDeadScoreColor(deadScore))}>
              {deadScore}%
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Topics */}
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className={cn(
                "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-all duration-300",
                haunted && "group-hover:bg-accent/20 group-hover:text-accent"
              )}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{stars >= 1000 ? `${(stars / 1000).toFixed(0)}k` : stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{forks >= 1000 ? `${(forks / 1000).toFixed(1)}k` : forks}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{lastUpdate}</span>
          </div>
        </div>

        {/* Action */}
        <Button
          variant="neon"
          size="sm"
          className={cn(
            "mt-4 w-full opacity-0 transition-all duration-300 group-hover:opacity-100",
            haunted && "group-hover:bg-accent group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.6)]"
          )}
          onClick={handleRevive}
        >
          <Zap className="h-4 w-4" />
          Revive This Repo
        </Button>
      </div>
    </div>
  );
};
