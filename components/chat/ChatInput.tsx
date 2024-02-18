'use client';

import { EmojiPicker } from '@/components/EmojiPicker';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useModalStore } from '@/hooks/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, string>;
  name: string | null;
  type: 'conversation' | 'channel';
}

const formSchema = z.object({
  content: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModalStore();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchema) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen('messageFile', { apiUrl, query })}
                    className="absolute left-8 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-primary p-1 text-primary-foreground transition hover:bg-primary/90"
                  >
                    <Plus />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6"
                    placeholder={`Сообщение ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                    {...field}
                  />
                  <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
