import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { SlidingPanel } from '@/components/ui/SlidingPanel';
import { cn } from '@/utils/cn';

type FilterLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
};

export function FilterLayout({
  children,
  sidebar,
  className,
}: FilterLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('flex flex-col md:flex-row gap-2 md:gap-8', className)}>
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full justify-start gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="md:hidden">
        <SlidingPanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {sidebar}
          <div className="mt-4">
            <Button
              variant="default"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Show Results
            </Button>
          </div>
        </SlidingPanel>
      </div>

      <aside className="hidden md:block w-80 flex-shrink-0">
        <div className="sticky top-8">{sidebar}</div>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
