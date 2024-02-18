'use client';

import { ProfileForm } from '@/components/auth/ProfileForm';
import { ProfileProviderForm } from '@/components/auth/ProfileProviderForm';
import { SecurityForm } from '@/components/auth/SecurityForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useModalStore } from '@/hooks/useModalStore';

export const ProfileModal = () => {
  const user = useCurrentUser();
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === 'profile';

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Профиль</DialogTitle>
        </DialogHeader>
        {user?.isOAuth === false && (
          <Tabs
            defaultValue="profile"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>
            <TabsContent value="security">
              <SecurityForm />
            </TabsContent>
          </Tabs>
        )}
        {user?.isOAuth === true && <ProfileProviderForm />}
      </DialogContent>
    </Dialog>
  );
};
