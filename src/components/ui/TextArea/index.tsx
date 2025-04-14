import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/utils/cn';

const textAreaVariants = cva(
  'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm',
  {
    variants: {
      state: {
        default: '',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {
  label: string;
  error?: string;
  description?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label htmlFor={props.id} className="block">
          <Text variant="label">{label}</Text>
        </label>
        <textarea
          ref={ref}
          rows={4}
          className={cn(
            textAreaVariants({ state: error ? 'error' : 'default', className })
          )}
          {...props}
        />
        {error ? (
          <Text variant="error" className="block">
            {error}
          </Text>
        ) : description ? (
          <Text variant="description" className="block">
            {description}
          </Text>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
