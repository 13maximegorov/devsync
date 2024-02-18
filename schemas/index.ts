import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Это поле обязательно.',
  }),
  password: z.string().min(1, { message: 'Это поле обязательно.' }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Это поле обязательно.',
  }),
  email: z.string().email({
    message: 'Это поле обязательно.',
  }),
  password: z.string().min(6, { message: 'Требуется минимум 6 символов.' }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Это поле обязательно.',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Требуется минимум 6 символов.',
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: 'Это поле обязательно.',
  }),
  email: z.string().email({
    message: 'Это поле обязательно.',
  }),
});

export const ProfileProviderSchema = z.object({
  name: z.string().min(1, {
    message: 'Это поле обязательно.',
  }),
});

export const SecuritySchema = z
  .object({
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(
      z.string().min(6, { message: 'Требуется минимум 6 символов.' }),
    ),
    newPassword: z.optional(
      z.string().min(6, { message: 'Требуется минимум 6 символов.' }),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'Это поле обязательно.',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Это поле обязательно.',
      path: ['password'],
    },
  );
