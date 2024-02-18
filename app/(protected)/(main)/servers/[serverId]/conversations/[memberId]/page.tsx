import { MediaRoom } from '@/components/MediaRoom';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { currentUser } from '@/lib/auth';
import { getOrCreateConversation } from '@/lib/conversation';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

interface ConversationPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const ConversationPage = async ({
  params,
  searchParams,
}: ConversationPageProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect('/auth/login');
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  if (!currentMember) {
    return redirect('/');
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId,
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.userId === user.id ? memberTwo : memberOne;

  const redirectUrlDisconnect = `/servers/${params.serverId}/conversations/${memberTwo.id}`;

  return (
    <div className="bg-backgorund flex h-full flex-col">
      <ChatHeader
        image={otherMember.user.image}
        name={otherMember.user.name}
        serverId={params.serverId}
        type="conversation"
      />
      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
          redirectUrlDisconnect={redirectUrlDisconnect}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            name={otherMember.user.name}
            member={currentMember}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              userId: user.id,
              conversationId: conversation.id,
            }}
            paramKey="conversationId"
            paramValue={conversation.id}
          />
          <ChatInput
            name={otherMember.user.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              userId: user.id,
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default ConversationPage;
