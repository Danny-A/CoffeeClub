import { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { DashboardStats } from '../_components/DashboardStats';
import { TopRatedSection } from '../_components/TopRatedSection';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Latest Grind',
  description: 'Admin dashboard for Latest Grind',
};

export default async function AdminDashboard() {
  return (
    <div className="space-y-8">
      <Heading level="h3">Dashboard</Heading>
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TopRatedSection type="beans" />
        <TopRatedSection type="roasters" />
        <TopRatedSection type="locations" />
      </div>
    </div>
  );
}
