'use server';

import { unstable_update } from '@/auth';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { type ProfileProviderSchema } from '@/schemas';
import * as z from 'zod';

export const profileProvider = async (
  values: z.infer<typeof ProfileProviderSchema>,
) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Неавторизованный.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Неавторизованный.' };
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
    },
  });

  return { success: 'Профиль обновлен.' };
};
