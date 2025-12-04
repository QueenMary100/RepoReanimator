import { GhostIcon } from "./GhostIcon";
import { Heart, Code, Zap } from "lucide-react";

export const AboutUsSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-gradient">About Us</span>
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              RepoReanimator was born from a simple observation: thousands of promising open-source projects lie abandoned on GitHub, waiting for someone to breathe new life into them.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We're a community of developers, designers, and open-source enthusiasts who believe that every abandoned repo has untapped potential. Our mission is to connect passionate contributors with projects that need revival.
            </p>

            <div className="space-y-4">
              {[
                { icon: Heart, text: "Passionate about open source" },
                { icon: Code, text: "Built by developers, for developers" },
                { icon: Zap, text: "Making contributions fun & rewarding" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
            <div className="relative p-12 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <GhostIcon className="h-48 w-48 text-primary floating mx-auto" size={192} />
              <p className="text-center mt-6 font-spooky text-2xl text-gradient">
                Reviving code since 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
