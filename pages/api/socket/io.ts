import type { NextApiResponseServerIO } from '@/types/types';
import type { NextApiRequest } from 'next';
import { Server } from 'socket.io';

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
