import type { Member, Message, Profile, Server } from '@prisma/client';
import type { Server as HTTPServer } from 'http';
import type { Socket } from 'net';
import type { NextApiResponse } from 'next';
import type { Server as SocketIOServer } from 'socket.io';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export type NextApiResponseServerIO<Data = any> = NextApiResponse<Data> & {
  socket: Socket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};
