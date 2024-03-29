import db from '@/lib/db';
import { NextApiResponseServerIO } from '@/types/types';
import { MemberRole } from '@prisma/client';
import { NextApiRequest } from 'next';

interface NextApiRequestExtends extends NextApiRequest {
  body: {
    content: string;
  };
  query: {
    userId: string;
    messageId: string;
    serverId: string;
    channelId: string;
  };
}

const handler = async (
  req: NextApiRequestExtends,
  res: NextApiResponseServerIO,
) => {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body;
    const { userId, messageId, serverId, channelId } = req.query;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!serverId) {
      return res.status(400).json({ error: 'Server ID missing' });
    }

    if (!channelId) {
      return res.status(400).json({ error: 'Channel ID missing' });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ error: 'Server not found' });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId,
      },
    });

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const member = server.members.find((member) => member.userId === user.id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId,
        channelId,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const isMessageOwner = message.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'DELETE') {
      message = await db.message.update({
        where: {
          id: messageId,
        },
        data: {
          fileUrl: null,
          content: 'Это сообщение было удалено.',
          deleted: true,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      });
    }

    if (req.method === 'PATCH') {
      if (!isMessageOwner) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      message = await db.message.update({
        where: {
          id: messageId,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;

    res.socket.server.io.emit(updateKey, message);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Error' });
  }
};

export default handler;
