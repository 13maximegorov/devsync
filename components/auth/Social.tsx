'use client';

import { YandexIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const onClick = (provider: 'yandex') => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex w-full items-center">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick('yandex')}
      >
        <YandexIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};
