import { ArrowUpCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { AdminUserNav } from '@/components/features/Navigation/Admin/AdminNavUser';
import { Button } from '@/components/ui/Button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/Sidebar';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';

import { AdminNavAdd } from '../features/Navigation/Admin/AdminNavAdd';
import { AdminNavMain } from '../features/Navigation/Admin/AdminNavMain';

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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Latest Grind.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <AdminNavMain />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Add New</SidebarGroupLabel>
          <SidebarGroupContent>
            <AdminNavAdd />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {profile && <AdminUserNav user={profile} />}
      </SidebarFooter>
    </Sidebar>
  );
}
