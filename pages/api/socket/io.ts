import type { NextApiResponseServerIO } from '@/types';
import type { Server as HTTPServer } from 'http';
import type { NextApiRequest } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: HTTPServer = res.socket.server;
    const io = new SocketIOServer(httpServer, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
