import { Logo } from '@/components/icons';

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Logo className="w-40" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
