import { cva, type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

type TextElement = 'p' | 'span' | 'div' | 'label';

const textVariants = cva('leading-relaxed', {
  variants: {
    variant: {
      default: 'text-base text-gray-700 dark:text-gray-300',
      small: 'text-sm text-gray-600 dark:text-gray-400',
      large: 'text-lg text-gray-700 dark:text-gray-300',
      label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
      error: 'text-sm text-red-600 dark:text-red-400',
      description: 'text-sm text-gray-500 dark:text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: TextElement;
  children: ReactNode;
  className?: string;
}

export function Text({
  as: Component = 'p',
  variant,
  children,
  className,
}: TextProps) {
  return (
    <Component className={cn(textVariants({ variant, className }))}>
      {children}
    </Component>
  );
}
