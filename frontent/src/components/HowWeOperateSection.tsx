import { Search, GitBranch, Trophy, Users } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Dead Repos",
    description: "Our AI scans GitHub for abandoned projects with potential, analyzing activity, issues, and community interest.",
  },
  {
    icon: GitBranch,
    title: "Claim & Revive",
    description: "Choose a repo that matches your skills, fork it, and start contributing fixes, features, or documentation.",
  },
  {
    icon: Trophy,
    title: "Earn XP & Badges",
    description: "Every contribution earns you experience points. Level up, unlock badges, and climb the leaderboard.",
  },
  {
    icon: Users,
    title: "Join the Community",
    description: "Connect with fellow reanimators, collaborate on revivals, and build your open-source reputation.",
  },
];

export const HowWeOperateSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">How We Operate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to become a legendary Repo Reanimator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/30">
                {index + 1}
              </div>
              
              <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
