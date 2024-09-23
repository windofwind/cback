import { PrismaClient } from '@prisma/client';
import { userData, userProfiles } from './seed.const';

const db = new PrismaClient();

const main = async () => {
  userData.forEach(async (user) => {
    await db.user.upsert({
      where: { seq: user.seq },
      update: {
        email: user.email,
        password: user.password,
      },
      create: user,
    });
  });

  userProfiles.forEach(async (profile) => {
    await db.userProfile.upsert({
      where: { seq: profile.seq },
      update: {
        nick: profile.nick,
      },
      create: profile,
    });
  });
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
