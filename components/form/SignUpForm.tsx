'use client';

import { YandexSignInButton } from '@/components/YandexSignInButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'Это поле обязательно' })
      .max(50, { message: 'Поле не должно превышать 50 символов' }),
    lastName: z
      .string()
      .min(1, { message: 'Это поле обязательно' })
      .max(50, { message: 'Поле не должно превышать 50 символов' }),
    email: z
      .string()
      .min(1, { message: 'Это поле обязательно' })
      .email({ message: 'Неверный адрес электронной почты' }),
    password: z
      .string()
      .min(1, { message: 'Это поле обязательно' })
      .min(8, { message: 'Пароль должен содержать не менее 8 символов' }),
    confirmPassword: z.string().min(1, { message: 'Это поле обязательно' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Введенные пароли не совпадают',
  });

type FormSchema = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ваше имя"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ваша фамилия"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Электронная почта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@devsync.ru"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтвердить пароль</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Подтвердите пароль"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Зарегистрироваться</Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Или продолжить с
          </span>
        </div>
      </div>
      <YandexSignInButton />
    </div>
  );
};
