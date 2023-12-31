'use client';

import { ActionTooltip } from '@/components/ActionTooltip';
import { useModalStore } from '@/hooks/useModalStore';
import { Plus } from 'lucide-react';

export const NavigationAction = () => {
  const { onOpen } = useModalStore();

  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Создать сервер"
      >
        <button
          onClick={() => onOpen('createServer')}
          className="group flex items-center"
        >
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
