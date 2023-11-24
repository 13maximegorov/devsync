import { ModeToggle } from '@/components/ModeToggle';
import { SignUpForm } from '@/components/form/SignUpForm';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/icons';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="container h-full">
      <div className="flex w-full items-center justify-between pt-4">
        <Logo className="w-36 text-black dark:text-white" />
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
          >
            <Link href="/sign-in">Вход</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className="flex h-[calc(100%-56px)] items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-[450px]">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            Зарегистрируйте учетную запись
          </h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
