'use client';

import { UserAvatar } from '@/components/UserAvatar';
import { cn } from '@/lib/utils';
import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { Crown, ShieldCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="ml-auto h-4 w-4 shrink-0 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <Crown className="ml-auto h-4 w-4 shrink-0 text-yellow-500" />
  ),
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams<{ serverId: string; memberId: string }>();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'group mb-1 flex w-[231px] items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-accent',
        params?.memberId === member.id && 'bg-accent',
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p className="truncate text-sm font-semibold transition group-hover:text-accent-foreground">
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};
