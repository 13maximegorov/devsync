'use client';

import { useUser } from '@clerk/nextjs';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  redirectUrlDisconnect: string;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  redirectUrlDisconnect,
}: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user?.firstName || !user.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`,
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chatId, user?.firstName, user?.lastName]);

  const onDisconnected = () => {
    router.push(redirectUrlDisconnect);
  };

  if (token === '') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      onDisconnected={onDisconnected}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
