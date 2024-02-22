import { APIRoute } from 'next-s3-upload';

export default APIRoute.configure({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
  bucket: process.env.S3_BUCKET,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
});
