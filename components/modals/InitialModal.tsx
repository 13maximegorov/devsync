'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  image: z.string().min(1, {
    message: 'Это поле обязательно.',
  }),
  name: z.string().min(1, {
    message: 'Это поле обязательно.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
      name: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchema) => {
    try {
      await axios.post('/api/servers', values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent closeButton={false}>
        <DialogHeader>
          <DialogTitle>Создайте сервер</DialogTitle>
          <DialogDescription>
            Дайте название и изображение серверу. Вы всегда можете изменить его
            настройки.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображение сервера</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название сервера</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Введите название сервера"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="primary"
                disabled={isLoading}
              >
                Создать
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
