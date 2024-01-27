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
          <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-secondary transition-all group-hover:rounded-[16px] group-hover:bg-indigo-500">
            <Plus
              className="text-indigo-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
