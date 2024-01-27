'use client';

import { useSocket } from '@/components/providers/SocketProvider';
import { Badge } from '@/components/ui/badge';

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="border-none bg-yellow-600 text-white"
      >
        Идет попытка подключения
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-none bg-green-600 text-white"
    >
      Стабильное соединение
    </Badge>
  );
};
