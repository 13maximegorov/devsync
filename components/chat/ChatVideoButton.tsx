'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { Video, VideoOff } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get('video');

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const Icon = isVideo ? Video : VideoOff;
  const tooltipLabel = isVideo ? 'Завершить видеозвонок' : 'Начать видеозвонок';

  return (
    <ActionTooltip
      side="bottom"
      label={tooltipLabel}
    >
      <button
        onClick={onClick}
        className="mr-4 transition hover:opacity-75"
      >
        <Icon className="h-6 w-6 text-muted-foreground" />
      </button>
    </ActionTooltip>
  );
};
