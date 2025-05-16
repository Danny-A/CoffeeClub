import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/utils/cn';

const textAreaVariants = cva(
  [
    'block w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
    'placeholder:text-muted-foreground',
    'selection:bg-primary selection:text-primary-foreground',
    'dark:bg-input/30',
    'border-input',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'resize-y', // allow vertical resizing
    'min-h-[96px]', // ensure multiline height
  ],
  {
    variants: {
      error: {
        true: [
          'border-destructive',
          'ring-destructive/20 dark:ring-destructive/40',
          'ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        ],
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  description?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block">
            <Text
              variant="label"
              className="text-gray-700 dark:text-gray-300 font-medium"
            >
              {label}
            </Text>
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(textAreaVariants({ error: !!error }), className)}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error ? (
          <Text
            variant="small"
            className="text-red-600 dark:text-red-400 block mt-1"
          >
            {error}
          </Text>
        ) : description ? (
          <Text
            variant="small"
            className="text-gray-500 dark:text-gray-400 block mt-1"
          >
            {description}
          </Text>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
