import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ExploreView } from "@/components/ExploreView";
import { DashboardView } from "@/components/DashboardView";
import { LeaderboardView } from "@/components/LeaderboardView";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "explore":
        return <ExploreView />;
      case "dashboard":
        return <DashboardView />;
      case "leaderboard":
        return <LeaderboardView />;
      default:
        return <HeroSection onExplore={() => setCurrentPage("explore")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="relative z-10">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
