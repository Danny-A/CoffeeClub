import { cn } from '@/utils/cn';

export function NewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'rounded-xs bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold',
        className
      )}
    >
      New
    </span>
  );
}
