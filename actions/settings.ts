'use server';

import { unstable_update } from '@/auth';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';
import { compare, hash } from 'bcryptjs';
import * as z from 'zod';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: 'Неавторизованный.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Неавторизованный.' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
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

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: 'Неверный пароль.' };
    }

    const hashedPassword = await hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
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
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: 'Настройки обновлены.' };
};
