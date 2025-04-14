import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { RegisterForm } from '@/app/(auth)/_components/RegisterForm';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Register - Coffee Club',
  description: 'Register for Coffee Club',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RegisterPage() {
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
          <Heading level="h2">Create your account</Heading>
          <Text className="mt-2 text-center">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your account
            </Link>
          </Text>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
