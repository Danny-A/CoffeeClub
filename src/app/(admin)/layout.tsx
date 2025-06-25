import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { Separator } from '@/components/ui/Separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { SidebarInset } from '@/components/ui/Sidebar';
import Providers from '@/lib/providers';
import { createClient } from '@/lib/supabase/server';
import { isAdmin, isModerator } from '@/utils/getUserRole';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin - Latest Grind',
  description: 'Admin for Latest Grind',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

  if (!isUserAdmin && !isUserModerator) {
    redirect('/login');
  }

  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
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
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <main className="flex-1 px-6">{children}</main>
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
