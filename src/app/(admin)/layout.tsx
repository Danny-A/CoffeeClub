import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { Separator } from '@/components/ui/Separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { SidebarInset } from '@/components/ui/Sidebar';
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
          <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
                  <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mx-2 data-[orientation=vertical]:h-4"
                    />
                    <h1 className="text-base font-medium">Documents</h1>
                  </div>
                </header>
                <main className="flex-1 container mx-auto max-w-7xl py-6 px-4 lg:px-8">
                  {children}
                </main>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
