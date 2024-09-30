import { Prisma } from '@prisma/client';

export const userData: Prisma.UserUncheckedCreateInput[] = [
  {
    seq: 'ckv1q9z1e000001l5f7y8b9c0',
    email: 'test@test.net',
    password: 'test.net',
  },
  {
    seq: 'cm03hq8by0000jgttd2bomqgl',
    email: 'windofwind@addline.info',
    password: 'addline.info',
  },
];

export const userProfiles: Prisma.UserProfileUncheckedCreateInput[] = [
  {
    seq: 'ckv1q9z1e000001l5f7y8b9c0',
    nick: 'test',
    jobTitle: '테스트',
  },
  {
    seq: 'cm03hq8by0000jgttd2bomqgl',
    nick: '김개발',
    jobTitle: '개발자',
  },
];
