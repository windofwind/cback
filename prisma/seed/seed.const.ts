import { Prisma } from '@prisma/client';

export const userData: Prisma.UserUncheckedCreateInput[] = [
  {
    seq: 'cm03hq8by0000jgttd2bomqgl',
    email: 'windofwind@addline.info',
    password: 'addline.info',
  },
];

export const userProfiles: Prisma.UserProfileUncheckedCreateInput[] = [
  {
    seq: 'cm03hq8by0000jgttd2bomqgl',
    nick: '김개발',
  },
];
