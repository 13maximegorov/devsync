import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { ruRU } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DevSync',
  description:
    'DevSync — это приложение мгновенного обмена сообщениями, организации аудио- и видеоконференций для команд разработки программного обеспечения.',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ClerkProvider localization={ruRU}>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body
          className={cn(
            'font-sans',
            fontSans.variable,
            'bg-white dark:bg-[#313338]',
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="devsync-theme"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
