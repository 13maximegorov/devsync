'use server';

import { unstable_update } from '@/auth';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import type { SecuritySchema } from '@/schemas';
import { compare, hash } from 'bcryptjs';
import * as z from 'zod';

export const security = async (values: z.infer<typeof SecuritySchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Неавторизованный.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Неавторизованный.' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: 'Неверный пароль.' };
    }

    const hashedPassword = await hash(values.newPassword, 10);

    values.password = hashedPassword;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      password: values.password,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
    },
  });

  unstable_update({
    user: {
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: 'Настройки по безопасности обновлены.' };
};
