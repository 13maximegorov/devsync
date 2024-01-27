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
import { useState } from 'react';

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteServer';
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.push('/');
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
          <DialogTitle>Удалить сервер</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите безвозвратно удалить сервер{' '}
            <span className="font-semibold text-indigo-500">
              {server?.name}
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
