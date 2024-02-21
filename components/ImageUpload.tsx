'use client';

import { FileIcon, X } from 'lucide-react';
import { useNextUpload } from 'next-upload/react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const fileType = value?.split('.').pop();

  const nup = useNextUpload();

  const onDropAccepted = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    nup.upload(
      acceptedFiles.map((file) => ({
        file,
      })),
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
  });

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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
      {nup.isUploading && <p>Uploading...</p>}
    </div>
  );
};
