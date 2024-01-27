import { MobileToggle } from '@/components/MobileToggle';
import { SocketIndicator } from '@/components/SocketIndicator';
import { UserAvatar } from '@/components/UserAvatar';
import { ChatVideoButton } from '@/components/chat/ChatVideoButton';
import { Hash } from 'lucide-react';

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="flex h-12 items-center border-b border-border px-3">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="mr-2 h-5 w-5 text-muted-foreground" />
      )}
      {type === 'conversation' && (
        <UserAvatar
          src={imageUrl}
          className="mr-2 h-8 w-8 md:h-8 md:w-8"
        />
      )}
      <p className="font-bold">{name}</p>
      <div className="ml-auto flex items-center">
        {type === 'conversation' && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};
