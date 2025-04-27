import { forwardRef } from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/utils/cn';

import { formFieldVariants } from './variants';

type FormFieldProps = React.ComponentProps<'input'> & {
  label?: string;
  error?: string;
  description?: string;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ type, label, error, description, className, ...props }, ref) => {
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
          type={type}
          data-slot="input"
          className={cn(formFieldVariants({ error: !!error }), className)}
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

FormField.displayName = 'FormField';
