import { SignInForm } from '@/components/form/SignInForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="container relative flex h-full items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/sign-up"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-8 top-8',
        )}
      >
        Регистрация
      </Link>
      <div className="hidden h-full bg-muted lg:flex"></div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Войдите в учетную запись
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите данные ниже, чтобы войти в свою учетную запись
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
