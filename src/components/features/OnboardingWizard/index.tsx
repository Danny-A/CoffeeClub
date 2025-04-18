'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/hooks/auth/useAuth';
import { useProfile } from '@/hooks/profile/useProfile';

const profileSchema = z.object({
  display_name: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().optional(),
  location: z.string().optional(),
  instagram: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function OnboardingWizard() {
  const router = useRouter();
  const { user } = useAuth();
  const { updateProfile, uploadProfileImage } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;

    try {
      let profileImageUrl: string | undefined;

      if (profileImage) {
        const { data: imageData, error: uploadError } =
          await uploadProfileImage(profileImage);
        if (uploadError) throw uploadError;
        profileImageUrl = imageData;
      }

      const { error: updateError } = await updateProfile(user.id, {
        ...data,
        profile_image_url: profileImageUrl,
      });

      if (updateError) throw updateError;

      router.push('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Heading level="h2">Complete your profile</Heading>
          <Text className="mt-2 text-center">
            Let us get to know you better
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="display_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Display Name
                </label>
                <input
                  {...register('display_name')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.display_name && (
                  <Text variant="small" className="text-red-500 mt-1">
                    {errors.display_name.message}
                  </Text>
                )}
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Location
                </label>
                <input
                  {...register('location')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Instagram
                </label>
                <input
                  {...register('instagram')}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Website
                </label>
                <input
                  {...register('url')}
                  type="url"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.url && (
                  <Text variant="small" className="text-red-500 mt-1">
                    {errors.url.message}
                  </Text>
                )}
              </div>

              <div>
                <label
                  htmlFor="profile_image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
            </div>
          )}

          {error && (
            <Text variant="small" className="text-red-500">
              {error.message}
            </Text>
          )}

          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isLoading}
              >
                Previous
              </Button>
            )}
            {currentStep < 2 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={isLoading}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Complete Profile'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
