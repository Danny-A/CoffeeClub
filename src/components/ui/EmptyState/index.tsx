import { cn } from '@/utils/cn';

import { Heading } from '../Heading';
import { Text } from '../Text';
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('text-center py-12', className)}>
      {icon && <div className="mb-4">{icon}</div>}
      <Heading level="h3" className="mb-2">
        {title}
      </Heading>
      <Text>{description}</Text>
    </div>
  );
}
