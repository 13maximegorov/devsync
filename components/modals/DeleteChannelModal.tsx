'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/useModalStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteChannel';
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.push(`/servers/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить канал</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите безвозвратно удалить канал{' '}
            <span className="font-semibold text-indigo-500">
              #{channel?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={isLoading}
              onClick={onClose}
            >
              Отменить
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
            >
              Подтвердить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
