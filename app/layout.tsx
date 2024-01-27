import { ModalProvider } from '@/components/providers/ModalProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
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
            'bg-backgorund',
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="devsync-theme"
            disableTransitionOnChange
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
