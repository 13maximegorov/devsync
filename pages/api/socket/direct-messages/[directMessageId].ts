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
    conversationId: string;
    directMessageId: string;
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
    const { userId, conversationId, directMessageId } = req.query;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation  ID missing' });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          {
            memberOne: {
              userId: user.id,
            },
          },
          {
            memberTwo: {
              userId: user.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const member =
      conversation.memberOne.userId === user.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    let message = await db.directMessage.findFirst({
      where: {
        id: directMessageId,
        conversationId,
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
      message = await db.directMessage.update({
        where: {
          id: directMessageId,
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

      message = await db.directMessage.update({
        where: {
          id: directMessageId,
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

    const updateKey = `chat:${conversation.id}:messages:update`;

    res.socket.server.io.emit(updateKey, message);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Error' });
  }
};

export default handler;
