import { Metadata } from 'next';

import EditBeanPage from '@/app/(admin)/_pages/EditBeanPage';

type EditBeanPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Edit Bean - Latest Grind',
  description: 'Edit bean information for Latest Grind',
};

export default async function Page({ params }: EditBeanPageProps) {
  const { slug } = await params;

  return <EditBeanPage slug={slug} />;
}
