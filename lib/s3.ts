import { type NextUploadConfig } from 'next-upload/client';

export const config: NextUploadConfig = {
  maxSize: '4mb',
  bucket: process.env.S3_BUCKET,
  client: {
    region: 'es-west-1',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      secretAccessKey: process.env.S3_SECRET_KEY as string,
      accessKeyId: process.env.S3_ACCESS_KEY as string,
    },
  },
};
