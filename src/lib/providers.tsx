'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';

import { PostHogProvider } from '@/providers/PostHogProvider';
import QueryProvider from '@/providers/queryProvider';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <PostHogProvider>
      <QueryProvider>
        {children}
        <ReactQueryDevtools />
      </QueryProvider>
    </PostHogProvider>
  );
};

export default Providers;
