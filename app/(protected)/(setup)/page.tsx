import { InitialModal } from '@/components/modals/InitialModal';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect('/auth/login');
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
