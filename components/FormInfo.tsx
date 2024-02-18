import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface FormInfoProps {
  title: string;
  message: string;
}

export const FormInfo = ({ title, message }: FormInfoProps) => {
  if (!message) return null;

  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
