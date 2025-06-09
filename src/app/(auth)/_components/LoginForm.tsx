'use client';

import { useState, useActionState } from 'react';

import { GoogleSignInButton } from '@/components/features/GoogleSignInButton/GoogleSignInButton';
import { SubmitButton } from '@/components/features/SubmitButton';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Text } from '@/components/ui/Text';

import { login } from '../actions';
import { LoginFormData, loginSchema } from './schema';

const initialState = {
  error: '' as string | null,
};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);
  const [validationErrors, setValidationErrors] = useState<
    Partial<LoginFormData>
  >({});

  const validateForm = (formData: FormData) => {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.path[0]]: issue.message,
        }),
        {}
      );

      setValidationErrors(errors);
      return false;
    }

    setValidationErrors({});
    return true;
  };

  return (
    <Card>
      <form
        action={formAction}
        onSubmit={(e) => {
          const data = new FormData(e.currentTarget);
          if (!validateForm(data)) {
            e.preventDefault();
          }
        }}
        className="space-y-6"
      >
        <CardContent className="space-y-4">
          <GoogleSignInButton />

          <FormField
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email"
            error={validationErrors.email}
          />
          <FormField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            error={validationErrors.password}
          />

          {state?.error && <Text variant="error">{state.error}</Text>}
        </CardContent>
        <CardFooter>
          <SubmitButton label="Sign in" pendingLabel="Signing in..." />
        </CardFooter>
      </form>
    </Card>
  );
}
