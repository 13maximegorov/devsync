'use client';

import { profileProvider } from '@/actions/profile-provider';
import { FormError } from '@/components/FormError';
import { FormInfo } from '@/components/FormInfo';
import { FormSuccess } from '@/components/FormSuccess';
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
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ProfileProviderSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const ProfileProviderForm = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileProviderSchema>>({
    resolver: zodResolver(ProfileProviderSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileProviderSchema>) => {
    startTransition(() => {
      profileProvider(values)
        .then((data) => {
          if (data.error) {
            setSuccess('');
            setError(data.error);
          }

          if (data.success) {
            update();
            setError('');
            setSuccess(data.success);
            router.refresh();
          }
        })
        .catch(() => setError('Что-то пошло не так.'));
    });
  };

  return (
    <>
      <FormInfo
        title="Провайдер"
        message="Вы подключены через Яндекс"
      />
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Иван Иванов"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit">Сохранить</Button>
        </form>
      </Form>
    </>
  );
};
