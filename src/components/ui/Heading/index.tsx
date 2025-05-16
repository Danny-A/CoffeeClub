import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType } from 'react';

import { cn } from '@/utils/cn';

const headingVariants = cva(
  'font-bold tracking-tight text-gray-900 dark:text-white',
  {
    variants: {
      level: {
        h1: 'text-4xl sm:text-5xl',
        h2: 'text-3xl sm:text-4xl',
        h3: 'text-2xl sm:text-3xl',
        h4: 'text-xl sm:text-2xl',
        h5: 'text-lg sm:text-xl',
        h6: 'text-base sm:text-lg',
      },
      muted: {
        true: 'text-gray-600 dark:text-gray-400',
      },
    },
    defaultVariants: {
      level: 'h1',
    },
  }
);

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

export function Heading({
  className,
  level = 'h1',
  muted = false,
  as,
  ...props
}: HeadingProps) {
  const Component = (as || level) as ElementType;
  return (
    <Component
      className={cn(headingVariants({ level, muted, className }))}
      {...props}
    />
  );
}
