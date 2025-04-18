import { Metadata } from 'next';
import Link from 'next/link';

import { BeanFeed } from '@/components/features/BeanFeed';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Beans - Daily Bean',
  description: 'Explore a collection of coffee beans',
  openGraph: {
    title: 'Beans - Daily Bean',
    description: 'Explore a collection of coffee beans',
  },
};

export async function generateStaticParams() {
  const { beansCollection } = await fetchBeans();

  if (!beansCollection?.edges) {
    return [];
  }

  return beansCollection.edges.map(({ node }) => ({
    id: node.id,
  }));
}

export default async function BeansPage() {
  const beans = await fetchBeans();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Heading level="h1">Coffee Beans</Heading>
          <Heading level="h2" muted className="mt-2">
            Explore our collection of coffee beans
          </Heading>
        </div>
        {user && (
          <Button asChild>
            <Link href="/beans/new">Add New Bean</Link>
          </Button>
        )}
      </div>
      <BeanFeed beans={beans} />
    </div>
  );
}
