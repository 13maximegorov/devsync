import db from '@/lib/db';
import { NextApiResponseServerIO } from '@/types/types';
import { NextApiRequest } from 'next';

interface NextApiRequestExtends extends NextApiRequest {
  body: {
    content: string;
    fileUrl?: string;
  };
  query: {
    userId: string;
    conversationId: string;
  };
}

const handler = async (
  req: NextApiRequestExtends,
  res: NextApiResponseServerIO,
) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content, fileUrl } = req.body;
    const { userId, conversationId } = req.query;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID missing' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content missing' });
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

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    const conversationKey = `chat:${conversation.id}:messages`;

    res.socket.server.io.emit(conversationKey, message);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Error' });
  }
};

export default handler;
