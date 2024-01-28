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
        'group z-10 mb-1 flex w-[232px] items-center gap-x-2 rounded px-2 py-2 transition hover:bg-accent',
        params?.channelId === channel.id && 'bg-accent',
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="truncate text-sm font-semibold group-hover:text-accent-foreground">
        {channel.name}
      </p>
      {channel.name.toLowerCase() !== 'основной' &&
        role !== MemberRole.GUEST && (
          <div className="ml-auto hidden items-center gap-x-2 group-hover:flex">
            <ActionTooltip label="Редактировать">
              <Edit
                onClick={(e) => onAction(e, 'editChannel')}
                className="h-4 w-4 text-muted-foreground transition hover:text-foreground"
              />
            </ActionTooltip>
            <ActionTooltip label="Удалить">
              <Trash
                onClick={(e) => onAction(e, 'deleteChannel')}
                className="h-4 w-4 text-muted-foreground transition hover:text-foreground"
              />
            </ActionTooltip>
          </div>
        )}
      {channel.name.toLowerCase() === 'основной' && (
        <Lock className="ml-auto h-4 w-4" />
      )}
    </button>
  );
};
