'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useModalStore } from '@/hooks/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChannelType } from '@prisma/client';
import { SelectValue } from '@radix-ui/react-select';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Это поле обязательно.',
    })
    .refine((name) => name.toLowerCase() !== 'основной', {
      message: 'Название канала не может быть "Основной".',
    }),
  type: z.nativeEnum(ChannelType),
});

type FormSchema = z.infer<typeof formSchema>;

const channelTypeMap = {
  [ChannelType.TEXT]: 'Текстовый',
  [ChannelType.AUDIO]: 'Голосовой',
  [ChannelType.VIDEO]: 'Видео',
};

export const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const router = useRouter();
  const params = useParams<{ serverId: string }>();

  const isModalOpen = isOpen && type === 'createChannel';
  const { channelType } = data;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channelType,
    },
  });

  useEffect(() => {
    if (channelType) {
      form.setValue('type', channelType);
    } else {
      form.setValue('type', ChannelType.TEXT);
    }
  }, [channelType, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchema) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params?.serverId,
        },
      });

      await axios.post(url, values);

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
          <DialogTitle>Создать канал</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название канала</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Введите название канала"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип канала</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип канала" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ChannelType).map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                        >
                          {channelTypeMap[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
