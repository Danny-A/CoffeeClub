'use client';

import { signOut } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/Button';

export function SignOutButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      {children}
    </Button>
  );
}
