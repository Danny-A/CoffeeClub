'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/hooks/auth/useAuth';

import { RegisterForm as RegisterFormType } from './schema';
import { registerSchema } from './schema';

export const RegisterForm = () => {
  const router = useRouter();
  const { signUp, isSigningIn, signInError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormType) => {
    const { error } = await signUp(data.email, data.password, data.displayName);
    if (!error) {
      router.push('/');
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <FormField
          {...register('displayName')}
          type="text"
          label="Display Name"
          placeholder="Enter your display name"
          error={errors.displayName?.message}
        />
        <FormField
          {...register('email')}
          type="email"
          label="Email address"
          placeholder="Enter your email"
          error={errors.email?.message}
        />
        <FormField
          {...register('password')}
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
        />
        <FormField
          {...register('confirmPassword')}
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
        />
      </div>

      {signInError && (
        <Text variant="small" className="text-red-500">
          {signInError.message}
        </Text>
      )}

      <div>
        <Button type="submit" disabled={isSigningIn} className="w-full">
          {isSigningIn ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
    </form>
  );
};
