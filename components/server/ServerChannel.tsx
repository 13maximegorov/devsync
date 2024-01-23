'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { ModalType, useModalStore } from '@/hooks/useModalStore';
import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModalStore();
  const params = useParams<{ serverId: string; channelId: string }>();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { server, channel });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'group mb-1 flex w-[232px] items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700',
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          'truncate text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params?.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {channel.name}
      </p>
      {channel.name.toLowerCase() !== 'основной' &&
        role !== MemberRole.GUEST && (
          <div className="ml-auto hidden items-center gap-x-2 group-hover:flex">
            <ActionTooltip label="Редактировать">
              <Edit
                onClick={(e) => onAction(e, 'editChannel')}
                className="h-4 w-4 text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
            <ActionTooltip label="Удалить">
              <Trash
                onClick={(e) => onAction(e, 'deleteChannel')}
                className="h-4 w-4 text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              />
            </ActionTooltip>
          </div>
        )}
      {channel.name.toLowerCase() === 'основной' && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};
