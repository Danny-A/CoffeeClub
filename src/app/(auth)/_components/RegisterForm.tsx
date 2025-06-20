'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { GoogleSignInButton } from '@/components/features/GoogleSignInButton/GoogleSignInButton';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
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
    const { error } = await signUp(data.email, data.password, data.userName);

    if (!error) {
      router.push('/');
    }
  };

  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <GoogleSignInButton label="Sign up with Google" />
          <div className="space-y-4">
            <FormField
              {...register('userName')}
              type="text"
              label="Username"
              placeholder="Enter your username"
              error={errors.userName?.message}
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

          {signInError && <Text variant="error">{signInError.message}</Text>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSigningIn} className="w-full">
            {isSigningIn ? 'Creating account...' : 'Create account'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
