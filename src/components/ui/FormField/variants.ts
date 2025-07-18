import { cva } from 'class-variance-authority';

export const formFieldVariants = cva(
  [
    'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
    'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'selection:bg-primary selection:text-primary-foreground',
    'dark:bg-input/30',
    'border-input',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
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
