import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';
import { forwardRef, type ReactNode } from 'react';

import { Button } from '@/components/ui/Button';

export interface ButtonLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'children'> {
  href: string;
  children: ReactNode;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <Link href={href} ref={ref}>
        <Slot>
          <Button {...props}>{children}</Button>
        </Slot>
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
