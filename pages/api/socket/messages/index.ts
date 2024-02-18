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
    serverId: string;
    channelId: string;
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
    const { userId, serverId, channelId } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!serverId) {
      return res.status(400).json({ error: 'Server ID missing' });
    }

    if (!channelId) {
      return res.status(400).json({ error: 'Channel ID missing' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content missing' });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            userId,
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

    const member = server.members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId,
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

    const channelKey = `chat:${channelId}:messages`;

    res.socket.server.io.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Error' });
  }
};

export default handler;
