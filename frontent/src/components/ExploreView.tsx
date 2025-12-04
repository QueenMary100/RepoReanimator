import { useState } from "react";
import { RepoCard } from "./RepoCard";
import { Button } from "./ui/button";
import { Search, Filter, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const mockRepos = [
  {
    name: "freeCodeCamp",
    description: "Open-source codebase and curriculum for learning to code for free. Help improve lessons and challenges!",
    language: "TypeScript",
    stars: 408000,
    forks: 38200,
    lastUpdate: "2 days ago",
    deadScore: 15,
    topics: ["education", "javascript", "curriculum"],
    url: "https://github.com/freeCodeCamp/freeCodeCamp",
    haunted: true,
  },
  {
    name: "30-seconds-of-code",
    description: "Short code snippets for all your development needs. Many snippets need updates for modern JS!",
    language: "JavaScript",
    stars: 122000,
    forks: 12000,
    lastUpdate: "3 months ago",
    deadScore: 45,
    topics: ["javascript", "snippets", "learning"],
    url: "https://github.com/Chalarangelo/30-seconds-of-code",
    haunted: false,
  },
  {
    name: "public-apis",
    description: "A collective list of free APIs for development. Help keep the list updated and add new APIs!",
    language: "Python",
    stars: 315000,
    forks: 33800,
    lastUpdate: "1 month ago",
    deadScore: 35,
    topics: ["api", "list", "resources"],
    url: "https://github.com/public-apis/public-apis",
    haunted: true,
  },
  {
    name: "the-art-of-command-line",
    description: "Master the command line in one page. Contribute translations and modern CLI tips!",
    language: "Markdown",
    stars: 154000,
    forks: 14500,
    lastUpdate: "6 months ago",
    deadScore: 55,
    topics: ["cli", "linux", "tutorial"],
    url: "https://github.com/jlevy/the-art-of-command-line",
    haunted: false,
  },
  {
    name: "build-your-own-x",
    description: "Master programming by recreating technologies from scratch. Add new tutorials and implementations!",
    language: "Markdown",
    stars: 312000,
    forks: 29000,
    lastUpdate: "2 months ago",
    deadScore: 40,
    topics: ["tutorials", "learning", "programming"],
    url: "https://github.com/codecrafters-io/build-your-own-x",
    haunted: true,
  },
  {
    name: "awesome-python",
    description: "Curated list of awesome Python frameworks, libraries and resources. Help maintain and expand!",
    language: "Python",
    stars: 227000,
    forks: 24900,
    lastUpdate: "2 weeks ago",
    deadScore: 25,
    topics: ["python", "awesome-list", "resources"],
    url: "https://github.com/vinta/awesome-python",
    haunted: false,
  },
];

const categories = [
  { id: "all", label: "All", count: 2847 },
  { id: "ml", label: "Machine Learning", count: 423 },
  { id: "web", label: "Web Dev", count: 892 },
  { id: "mobile", label: "Mobile", count: 234 },
  { id: "devops", label: "DevOps", count: 156 },
  { id: "gamedev", label: "Game Dev", count: 189 },
];

export const ExploreView = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Discover <span className="text-gradient">Dead Repos</span>
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Browse through abandoned projects waiting to be revived. Filter by topic, language, or dead score.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          <Button variant="neon" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
            <Sparkles className="h-4 w-4" />
            AI Search
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {cat.label}
              <span className="ml-2 text-xs opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Sort & Filter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-medium">{mockRepos.length}</span> repositories
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Repo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRepos.map((repo, index) => (
            <div
              key={repo.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RepoCard {...repo} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Repositories
          </Button>
        </div>
      </div>
    </div>
  );
};
