'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';

import QueryProvider from '@/providers/queryProvider';
import { PostHogProvider } from '@/providers/PostHogProvider';

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
