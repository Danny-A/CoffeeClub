import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { LoginForm } from '@/app/(auth)/_components/LoginForm';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Login - Coffee Club',
  description: 'Login for Coffee Club',
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Heading level="h2">Sign in to your account</Heading>
          <Text className="mt-2 text-center">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </Text>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
