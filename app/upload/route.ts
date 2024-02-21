import { config } from '@/lib/s3';
import { NextUpload } from 'next-upload';
import { NextRequest } from 'next/server';

const nup = new NextUpload(config);

export const POST = (request: NextRequest) => nup.handler(request);

export const dynamic = 'force-dynamic';
