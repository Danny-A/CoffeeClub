import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { RegisterForm } from '@/app/(auth)/_components/RegisterForm';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Register - Daily Bean',
  description: 'Register for Daily Bean',
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
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Heading level="h2" className="text-center">
            Create your account
          </Heading>
          <Text className="mt-2 text-center">
            Or{' '}
            <Link
              href="/login"
              className="font-medium underline text-blue-600 hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
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
