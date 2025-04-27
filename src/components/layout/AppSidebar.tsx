import { ChevronDownIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { AdminUserNav } from '@/components/features/Navigation/AdminUserNav';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from '@/components/ui/Sidebar';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';

import { AppSidebarMenu } from './AppSidebarMenu';

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  const profile = await fetchProfile(user.id);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="min-h-screen border-r bg-white dark:bg-gray-900"
      {...props}
    >
      <SidebarHeader>
        <Link
          href="/admin"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Daily Bean Admin
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Add New</SidebarGroupLabel>
          <SidebarGroupContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex justify-start gap-2"
                >
                  <PlusCircleIcon className="h-4 w-4" />
                  Add New
                  <ChevronDownIcon className="h-4 w-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/beans/new" className="w-full">
                    Add Bean
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/roasters/new" className="w-full">
                    Add Roaster
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AdminUserNav user={profile} />
      </SidebarFooter>
    </Sidebar>
  );
}
