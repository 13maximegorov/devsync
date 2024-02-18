import { ServerSidebar } from '@/components/server/ServerSidebar';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface ServerLayoutProps {
  children: ReactNode;
  params: {
    serverId: string;
  };
}

const ServerLayout = async ({ children, params }: ServerLayoutProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect('/auth/login');
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!server) {
    return redirect('/');
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-64 flex-col md:flex">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-64">{children}</main>
    </div>
  );
};

export default ServerLayout;
