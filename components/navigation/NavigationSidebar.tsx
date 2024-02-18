import { ModeToggle } from '@/components/ModeToggle';
import { UserButton } from '@/components/auth/UserButton';
import { NavigationAction } from '@/components/navigation/NavigationAction';
import { NavigationItem } from '@/components/navigation/NavigationItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export const NavigationSidebar = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 border-r border-border bg-background py-3">
      <NavigationAction />
      <Separator className="mx-auto w-10" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div
            className="mb-4"
            key={server.id}
          >
            <NavigationItem
              id={server.id}
              name={server.name}
              image={server.image}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};
