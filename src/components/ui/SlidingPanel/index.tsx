import { X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

export function SlidingPanel({
  isOpen,
  onClose,
  children,
  trigger,
}: SlidingPanelProps) {
  return (
    <>
      {trigger}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
          'z-[var(--z-modal)]',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed top-2 left-2 h-[calc(100%-16px)]',
          'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
          'transform transition-transform duration-300 ease-in-out',
          'overflow-y-auto',
          'z-[var(--z-panel)]',
          'w-[calc(100%-16px)]',
          'md:w-[25%] md:max-w-[400px]',
          isOpen
            ? 'translate-x-0'
            : '-translate-x-[calc(100%+16px)] pointer-events-none'
        )}
      >
        <div className="p-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
