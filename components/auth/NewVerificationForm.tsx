'use client';

import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { CardWrapper } from '@/components/auth/CardWrapper';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();

  const token = searchParams?.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Ошибка отсутствия.');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Что-то пошло не так.');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Подтверждение верификации"
      backButtonLabel="Вернуться на страницу входа"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && (
          <Loader2 className="my-4 h-7 w-7 animate-spin text-muted-foreground" />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
