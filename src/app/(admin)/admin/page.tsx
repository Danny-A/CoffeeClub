import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Heading } from '@/components/ui/Heading';
import { createClient } from '@/lib/supabase/server';

import { DashboardStats } from '../_components/DashboardStats';
import { TopRatedSection } from '../_components/TopRatedSection';

export const metadata: Metadata = {
  title: 'Admin - Coffee Club',
  description: 'Admin for Coffee Club',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="space-y-8">
      <Heading>Dashboard</Heading>
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TopRatedSection type="beans" />
        <TopRatedSection type="roasters" />
        <TopRatedSection type="locations" />
      </div>
    </div>
  );
}
