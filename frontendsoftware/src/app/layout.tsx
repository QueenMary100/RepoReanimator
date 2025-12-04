import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RepoReanimator - Revive Dead GitHub Projects',
  description: 'Discover abandoned GitHub projects, contribute to reviving them, and earn XP while learning',
  keywords: ['github', 'open-source', 'gamification', 'learning', 'coding'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
