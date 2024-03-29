import { Hash } from 'lucide-react';

interface ChatWelcomeProps {
  name: string | null;
  type: 'channel' | 'conversation';
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === 'channel' && (
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-zinc-500 dark:bg-zinc-700">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl font-bold md:text-3xl">
        {type === 'channel' ? 'Добро пожаловать в #' : ''}
        {name}
      </p>
      <p className="text-sm text-muted-foreground">
        {type === 'channel'
          ? `Это начало канала #${name}`
          : `Это начало Вашего разговора с ${name}`}
      </p>
    </div>
  );
};
