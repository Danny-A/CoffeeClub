'use client';

import { useState, useActionState } from 'react';

import { SubmitButton } from '@/components/features/SubmitButton';
import { FormField } from '@/components/ui/FormField';

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
    <form
      action={formAction}
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        if (!validateForm(data)) {
          e.preventDefault();
        }
      }}
    >
      <div className="space-y-4">
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

        {state?.error && (
          <div className="text-red-500 text-sm mt-2">{state.error}</div>
        )}

        <SubmitButton label="Sign in" pendingLabel="Signing in..." />
      </div>
    </form>
  );
}
