'use client';

import { Heading } from '@/components/ui/Heading';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <Heading level="h1">Welcome to Daily Bean</Heading>
        <Heading level="h2" muted className="mt-2">
          Discover and share your favorite coffee beans
        </Heading>
      </div>
    </div>
  );
}
