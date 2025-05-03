'use client';

import { signOut } from '@/app/(auth)/actions';

export function SignOutButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="cursor-pointer w-full" onClick={() => signOut()}>
      {children}
    </span>
  );
}
