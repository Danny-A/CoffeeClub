'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';

import QueryProvider from '@/providers/queryProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      {children}
      <ReactQueryDevtools />
    </QueryProvider>
  );
};

export default Providers;
