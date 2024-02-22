'use client';

import { isImage } from '@/lib/is-image';
import { cn } from '@/lib/utils';
import { FileIcon, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { usePresignedUpload } from 'next-s3-upload';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  accept?: Accept;
}

export const FileUpload = ({ onChange, value, accept }: FileUploadProps) => {
  const [loading, setLoading] = useState(false);
  const { uploadToS3 } = usePresignedUpload();

  const onDropAccepted = async (acceptedFiles: File[]) => {
    setLoading(true);
    const { url } = await uploadToS3(acceptedFiles[0]);
    onChange(url);
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragReject, isDragActive } =
    useDropzone({
      onDropAccepted,
      accept,
      multiple: false,
      maxSize: 4000000,
    });

  const className = useMemo(
    () =>
      cn(
        'flex items-center justify-center flex-col border border-border border-dashed text-center p-8 rounded-md text-sm gap-8',
        isDragActive ? 'border-indigo-500 bg-indigo-500/10' : '',
        isDragReject ? 'border-destructive bg-destructive/10' : '',
      ),
    [isDragActive, isDragReject],
  );

  if (value && isImage(value)) {
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
            className="absolute right-0 top-0 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (value && !isImage(value)) {
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
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      <ImageIcon className="h-8 w-8 text-indigo-500" />
      {loading ? (
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-indigo-500" />
      ) : (
        <>
          <p>Перетащите или нажмите на это поле, чтобы выбрать файл</p>
          <p className="text-xs text-muted-foreground">
            Максимальный размер файла: 4MB
          </p>
        </>
      )}
    </div>
  );
};
