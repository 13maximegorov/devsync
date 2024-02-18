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
import { useModalStore } from '@/hooks/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Это поле обязательно.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'messageFile';
  const { apiUrl, query } = data;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchema) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });

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
          <DialogTitle>Добавить вложение</DialogTitle>
          <DialogDescription>
            Отправить файл в виде сообщения.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Файл</FormLabel>
                  <FormControl>
                    <FileUpload
                      endpoint="messageFile"
                      value={field.value}
                      onChange={field.onChange}
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
                Отправить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
