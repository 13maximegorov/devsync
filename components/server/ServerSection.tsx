'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { useModalStore } from '@/hooks/useModalStore';
import { ServerWithMembersWithUsers } from '@/types/types';
import { ChannelType, MemberRole } from '@prisma/client';
import { Plus, Settings } from 'lucide-react';

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithUsers;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="Создать канал">
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className="text-muted-foreground transition hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="Управлять участниками">
          <button
            onClick={() => onOpen('members', { server })}
            className="text-muted-foreground transition hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
