import type { Member, Message, Server, User } from '@prisma/client';
import type { Server as HTTPServer } from 'http';
import type { Socket } from 'net';
import type { NextApiResponse } from 'next';
import type { Server as SocketIOServer } from 'socket.io';

export type ServerWithMembersWithUsers = Server & {
  members: (Member & { user: User })[];
};

export type MessageWithMemberWithUser = Message & {
  member: Member & {
    user: User;
  };
};

export type NextApiResponseServerIO<Data = any> = NextApiResponse<Data> & {
  socket: Socket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};
