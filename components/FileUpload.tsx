'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import { FileIcon, Loader2, X } from 'lucide-react';
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
      <div className="flex w-full items-center justify-center">
        <div className="relative h-20 w-20 justify-center rounded-full border bg-muted">
          <Image
            fill
            src={value}
            alt="Upload"
            className="rounded-full object-cover"
          />
          <button
            onClick={() => onChange('')}
            className="text-destructive-foregroundshadow-sm absolute right-0 top-0 rounded-full bg-destructive p-1 hover:bg-destructive/90"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="relative mt-2 flex items-center rounded-md bg-muted p-2">
          <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-500" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 hover:underline"
          >
            {value}
          </a>
          <button
            onClick={() => onChange('')}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="w-full border-border ut-button:hidden ut-allowed-content:text-muted-foreground ut-label:text-indigo-500 ut-upload-icon:text-indigo-500"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      config={{
        mode: 'auto',
      }}
      content={{
        label({ isUploading }) {
          return isUploading ? (
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
          ) : (
            'Выберите файлы или перетащите'
          );
        },
      }}
    />
  );
};
