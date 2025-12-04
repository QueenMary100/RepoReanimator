import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'accent' | 'warning';
  subtitle?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  subtitle 
}: StatsCardProps) {
  const colorClasses = {
    primary: 'text-primary bg-primary/20',
    secondary: 'text-secondary bg-secondary/20',
    accent: 'text-accent bg-accent/20',
    warning: 'text-warning bg-warning/20',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card hover:shadow-glow transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-textMuted text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-gradient mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-textMuted">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
