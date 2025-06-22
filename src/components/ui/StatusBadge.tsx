import { Badge } from '@/components/ui/Badge';

type BeanStatus = 'pending_review' | 'approved' | 'rejected' | 'published';

interface StatusBadgeProps {
  status: BeanStatus;
  className?: string;
}

const statusConfig = {
  pending_review: {
    label: 'Pending Review',
    className:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  approved: {
    label: 'Approved',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
  published: {
    label: 'Published',
    className:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={`${config.className} ${className}`}>{config.label}</Badge>
  );
}
