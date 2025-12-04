import { Button } from "./ui/button";
import { GhostIcon } from "./GhostIcon";
import { Search, Github, ArrowRight } from "lucide-react";
import { HowWeOperateSection } from "./HowWeOperateSection";
import { AboutUsSection } from "./AboutUsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Ghost mascot */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-glow-pulse" />
            <GhostIcon className="relative h-24 w-24 text-primary floating" size={96} />
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-muted-foreground">Kiroween Hackathon 2024</span>
        </div>

        {/* Headline */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-foreground">Revive the </span>
          <span className="font-spooky text-gradient glow-text">Dead</span>
          <br />
          <span className="text-foreground">Open Source Projects</span>
        </h1>

        {/* Subheadline */}
        <p 
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Discover abandoned GitHub repositories, bring them back to life, 
          earn XP, climb the leaderboard, and become a legendary{" "}
          <span className="text-primary font-medium">Repo Reanimator</span>.
        </p>

        {/* CTA Buttons */}
        <div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button variant="hero" size="xl" onClick={onExplore}>
            <Search className="h-5 w-5" />
            Explore Dead Repos
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="xl">
            <Github className="h-5 w-5" />
            Connect GitHub
          </Button>
        </div>

        {/* Stats */}
        <div 
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { value: "2,847", label: "Dead Repos Found" },
            { value: "1,234", label: "Repos Revived" },
            { value: "892", label: "Active Reanimators" },
            { value: "45.2K", label: "Total XP Earned" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gradient glow-text">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>

    <HowWeOperateSection />
    <AboutUsSection />
    <TestimonialsSection />
    <ContactSection />
    <Footer />
    </>
  );
};
