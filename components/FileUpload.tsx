'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: keyof OurFileRouter;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20 overflow-hidden">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      config={{
        mode: 'auto',
      }}
      content={{
        label() {
          return 'Выберите файлы или перетащите';
        },
      }}
    />
  );
};
