'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useModalStore } from '@/hooks/useModalStore';
import { isImage } from '@/lib/is-image';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member, MemberRole, User } from '@prisma/client';
import axios from 'axios';
import { Crown, Edit, FileIcon, ShieldCheck, Trash } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    user: User;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleMap = {
  [MemberRole.GUEST]: 'Гость',
  [MemberRole.MODERATOR]: 'Модератор',
  [MemberRole.ADMIN]: 'Администратор',
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <Crown className="ml-2 h-4 w-4 text-yellow-500" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModalStore();
  const params = useParams<{ serverId: string }>();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchema) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.reset({
      content,
    });
  }, [content, form]);

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isFile = fileUrl && !isImage(fileUrl);
  const isImg = fileUrl && isImage(fileUrl);

  return (
    <div className="group relative flex w-full items-center p-4 transition hover:bg-accent/50">
      <div className="group flex w-full items-start gap-x-2">
        <div
          onClick={onMemberClick}
          className="cursor-pointer transition hover:drop-shadow-md"
        >
          <UserAvatar src={member.user.image} />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="cursor-pointer text-sm font-semibold hover:underline"
              >
                {member.user.name}
              </p>
              <ActionTooltip label={roleMap[member.role]}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          {isImg && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-2 flex aspect-square h-48 w-48 items-center overflow-hidden rounded-md border bg-muted"
            >
              <Image
                fill
                src={fileUrl}
                alt={content}
                className="object-cover"
              />
            </a>
          )}
          {isFile && (
            <div className="relative mt-2 flex items-center rounded-md bg-muted p-2">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-500" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 hover:underline"
              >
                ...{fileUrl.split('/')[fileUrl.split('/').length - 1]}
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                'text-sm',
                deleted && 'mt-1 text-xs italic text-muted-foreground',
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-[10px] text-muted-foreground">
                  (изменено)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className="flex w-full items-center gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            placeholder="Изменить сообщение"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  variant="primary"
                >
                  Сохранить
                </Button>
              </form>
              <span className="mt-1 text-[10px] text-muted-foreground">
                Нажмите Escape для отмены, Enter для сохранения
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-x-2 rounded-sm border bg-background p-1 group-hover:flex">
          {canEditMessage && (
            <ActionTooltip label="Изменить">
              <Edit
                onClick={() => setIsEditing(true)}
                className="ml-auto h-4 w-4 cursor-pointer text-muted-foreground transition hover:text-foreground"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Удалить">
            <Trash
              onClick={() =>
                onOpen('deleteMessage', {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="ml-auto h-4 w-4 cursor-pointer text-red-500 transition hover:text-foreground"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
