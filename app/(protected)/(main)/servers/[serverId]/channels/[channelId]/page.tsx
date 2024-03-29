import { MediaRoom } from '@/components/MediaRoom';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';

interface ChannelPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelPage = async ({ params }: ChannelPageProps) => {
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
      channels: true,
    },
  });

  if (!server) {
    return redirect('/');
  }

  const channel = server.channels.find(
    (channel) => channel.id === params.channelId,
  );

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id,
    },
  });

  if (!channel || !member) {
    redirect('/');
  }

  const generalChannel = server.channels.find(
    (channel) => channel.name === 'Основной',
  );
  const redirectUrlDisconnect = `/servers/${params.serverId}/channels/${generalChannel?.id}`;

  return (
    <div className="bg-backgorund flex h-full flex-col">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            name={channel.name}
            member={member}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              userId: user.id,
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              userId: user.id,
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
          chatId={channel.id}
          video={false}
          audio={true}
          redirectUrlDisconnect={redirectUrlDisconnect}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
          chatId={channel.id}
          video={true}
          audio={true}
          redirectUrlDisconnect={redirectUrlDisconnect}
        />
      )}
    </div>
  );
};

export default ChannelPage;
