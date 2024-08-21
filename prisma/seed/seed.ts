import { PrismaClient } from '@prisma/client';
import { userData } from './seed.const';

const db = new PrismaClient();

const main = async () => {
  await db.user.upsert({
    where: { email: userData.id },
    update: {
      email: userData.email,
      password: userData.password,
      nickname: userData.nickname,
    },
    create: userData,
  });
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
