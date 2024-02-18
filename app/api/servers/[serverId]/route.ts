import { currentUser } from '@/lib/auth';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const { name, image } = await req.json();
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        userId: user.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
