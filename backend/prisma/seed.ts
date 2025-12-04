import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create badges
  const badges = [
    {
      code: 'first_revival',
      name: 'Necromancer',
      description: 'Revived your first dead repo',
      icon: '🧙',
      rarity: 'common' as const,
      criteria: { revivals: 1 },
    },
    {
      code: 'streak_7',
      name: 'Consistent Contributor',
      description: 'Maintained a 7-day streak',
      icon: '🔥',
      rarity: 'rare' as const,
      criteria: { currentStreak: 7 },
    },
    {
      code: 'streak_30',
      name: 'Dedication Demon',
      description: 'Maintained a 30-day streak',
      icon: '👹',
      rarity: 'epic' as const,
      criteria: { currentStreak: 30 },
    },
    {
      code: 'xp_1000',
      name: 'Rising Star',
      description: 'Earned 1000 XP',
      icon: '⭐',
      rarity: 'rare' as const,
      criteria: { xp: 1000 },
    },
    {
      code: 'xp_10000',
      name: 'Legendary Reviver',
      description: 'Earned 10000 XP',
      icon: '👑',
      rarity: 'legendary' as const,
      criteria: { xp: 10000 },
    },
    {
      code: 'revivals_10',
      name: 'Graveyard Keeper',
      description: 'Revived 10 repos',
      icon: '⚰️',
      rarity: 'epic' as const,
      criteria: { revivals: 10 },
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: badge,
      create: badge,
    });
  }

  console.log('✅ Badges seeded');
  console.log('✅ Database seeding complete');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
