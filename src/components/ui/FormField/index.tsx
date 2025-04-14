import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/utils/cn';

const formFieldVariants = cva(
  'block w-full px-4 py-3 text-base rounded-lg border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      state: {
        default:
          'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-400',
        error:
          'border-red-500 bg-white text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-red-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-400 dark:focus:ring-red-400',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof formFieldVariants> {
  label: string;
  error?: string;
  description?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={props.id} className="block">
          <Text
            variant="label"
            className="text-gray-700 dark:text-gray-300 font-medium"
          >
            {label}
          </Text>
        </label>
        <input
          ref={ref}
          className={cn(
            formFieldVariants({ state: error ? 'error' : 'default', className })
          )}
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

FormField.displayName = 'FormField';
