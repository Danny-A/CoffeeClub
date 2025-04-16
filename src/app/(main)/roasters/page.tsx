import { Metadata } from 'next';
import Link from 'next/link';

import { RoastersList } from '@/components/features/RoastersList';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchRoasters } from '@/lib/api/fetchRoasters';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Roasters - Coffee Club',
  description: 'Explore our collection of coffee roasters',
};

export async function generateStaticParams() {
  const { roastersCollection } = await fetchRoasters();

  if (!roastersCollection?.edges?.length) {
    return [];
  }

  return roastersCollection.edges.map((edge) => ({
    id: edge.node.id,
  }));
}

export default async function RoastersPage() {
  const roasters = await fetchRoasters();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Heading level="h1">Coffee Roasters</Heading>
          <Heading level="h2" muted className="mt-2">
            Discover coffee roasters from around the world
          </Heading>
        </div>
        {user && (
          <Button asChild>
            <Link href="/roasters/new">Add New Roaster</Link>
          </Button>
        )}
      </div>
      <RoastersList roasters={roasters} />
    </div>
  );
}
