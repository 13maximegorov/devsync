import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

interface ServerPageProps {
  params: {
    serverId: string;
  };
}

const ServerPage = async ({ params }: ServerPageProps) => {
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
    include: {
      channels: {
        where: {
          name: 'Основной',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name.toLowerCase() !== 'основной') {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`);
};

export default ServerPage;
