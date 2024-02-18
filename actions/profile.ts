'use server';

import { unstable_update } from '@/auth';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { type ProfileSchema } from '@/schemas';
import * as z from 'zod';

export const profile = async (values: z.infer<typeof ProfileSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Неавторизованный.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Неавторизованный.' };
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Электронная почта уже используется.' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: 'Письмо с подтверждением отправлено.' };
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
      email: updatedUser.email,
    },
  });

  return { success: 'Профиль обновлен.' };
};
