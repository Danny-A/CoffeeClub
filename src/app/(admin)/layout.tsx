import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AdminNavigation } from '@/components/layout/AdminNavigation';
import { Providers } from '@/lib/providers';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin - Daily Bean',
  description: 'Admin for Daily Bean',
  robots: {
    index: false,
    follow: false,
  },
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
            <AdminNavigation />
            <main className="container mx-auto max-w-7xl py-6 px-4 lg:px-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
