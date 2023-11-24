import { Button } from '@/components/ui/button';
import { YandexIcon } from '@/components/ui/icons';

export const YandexSignInButton = () => {
  return (
    <Button variant="outline">
      <YandexIcon className="mr-2 h-6 w-6" /> Яндекс
    </Button>
  );
};
