import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <Alert variant="success">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Успешно</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
