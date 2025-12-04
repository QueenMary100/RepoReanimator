'use client';

import { motion } from 'framer-motion';
import { Ghost, Zap, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <Ghost className="w-24 h-24 text-primary mx-auto" />
          </motion.div>

          <h1 className="text-6xl font-bold mb-6">
            <span className="text-gradient">RepoReanimator</span>
          </h1>
          
          <p className="text-xl text-textMuted mb-8 max-w-2xl mx-auto">
            Revive dead GitHub projects and earn XP while learning. 
            Join the community of developers bringing abandoned code back to life! 🎃
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/discover">
              <button className="btn-primary">
                Start Reviving
              </button>
            </Link>
            <Link href="/leaderboard">
              <button className="btn-secondary">
                View Leaderboard
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={Ghost}
            title="Discover Dead Repos"
            description="Find abandoned projects that need your help"
            delay={0.1}
          />
          <FeatureCard
            icon={Zap}
            title="Earn XP & Level Up"
            description="Get rewarded for every contribution you make"
            delay={0.2}
          />
          <FeatureCard
            icon={Trophy}
            title="Unlock Badges"
            description="Collect achievements and showcase your skills"
            delay={0.3}
          />
          <FeatureCard
            icon={Users}
            title="Climb Leaderboards"
            description="Compete with developers worldwide"
            delay={0.4}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="card text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gradient mb-8">
            Join the Revival Movement
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">1,234</p>
              <p className="text-textMuted">Repos Revived</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-secondary mb-2">5,678</p>
              <p className="text-textMuted">Active Revivers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent mb-2">12,345</p>
              <p className="text-textMuted">Contributions Made</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="card text-center hover:shadow-glow transition-all duration-300"
    >
      <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-textMuted text-sm">{description}</p>
    </motion.div>
  );
}
