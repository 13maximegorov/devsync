'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

interface NavigationItemProps {
  id: string;
  image: string;
  name: string;
}

export const NavigationItem = ({ id, image, name }: NavigationItemProps) => {
  const params = useParams<{ serverId: string }>();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip
      side="right"
      align="center"
      label={name}
    >
      <button
        onClick={onClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            'absolute left-0 w-[4px] rounded-r-full bg-foreground transition-all',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]',
          )}
        />
        <div
          className={cn(
            'group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
            params?.serverId === id &&
              'rounded-[16px] bg-muted text-foreground',
          )}
        >
          <Image
            fill
            src={image}
            alt="Server"
            className="object-cover"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
