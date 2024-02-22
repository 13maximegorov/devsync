'use client';

import { FileUpload } from '@/components/FileUpload';
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
import { useModalStore } from '@/hooks/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModalStore();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'createServer';

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
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать сервер</DialogTitle>
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
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={field.onChange}
                      accept={{ 'image/*': [] }}
                    />
                  </FormControl>
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
