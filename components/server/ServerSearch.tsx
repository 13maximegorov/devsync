'use client';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface ServerSearchProps {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: ReactNode;
          name: string | null;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams<{ serverId: string }>();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: 'channel' | 'member';
  }) => {
    setOpen(false);

    if (type === 'member') {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === 'channel') {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-9 w-full justify-start bg-background text-sm font-normal text-muted-foreground shadow-none',
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="absolute left-2 h-4 w-4" />
        <span className="ml-3">Поиск</span>
        <kbd className="pointer-events-none absolute right-1 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Поиск по всем каналам и участникам" />
        <CommandList>
          <CommandEmpty>Не найдено результатов.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup
                key={label}
                heading={label}
              >
                {data.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
