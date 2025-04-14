import { Inter } from 'next/font/google';

import { Navigation } from '@/components/layout/Navigation';
import { Providers } from '@/lib/providers';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Profile - Coffee Club',
  description: 'Profile for Coffee Club',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
