import { auth } from '@/auth';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'DevSync',
  description:
    'DevSync — приложение для эффективного взаимодействия и коммуникации команды разработчиков ПО.',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={cn('font-sans', fontSans.variable, 'bg-backgorund')}>
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
    </SessionProvider>
  );
};

export default RootLayout;
