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
import qs from 'query-string';
import { useState } from 'react';

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === 'deleteMessage';
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });

      await axios.delete(url);

      onClose();
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
          <DialogTitle>Удалить сообщение</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите это сделать? Сообщение будет удалено
            безвозвратно.
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
