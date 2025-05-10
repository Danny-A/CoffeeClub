'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/hooks/auth/useAuth';
import { useProfile } from '@/hooks/profile/useProfile';

const profileSchema = z.object({
  display_name: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().optional(),
  location: z.string().optional(),
  instagram: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  profile_image_url: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function OnboardingWizard() {
  const router = useRouter();
  const { user } = useAuth();
  const { updateProfile, uploadProfileImage } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const handleImageChange = async (file: File | null) => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const imageUrl = await uploadProfileImage(file);
        if (imageUrl) {
          setProfileImageUrl(imageUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      setPreviewUrl(null);
      setProfileImageUrl(undefined);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    // setValue('profile_image_url', '');
  };

  const validateStep = async () => {
    let fieldsToValidate: (keyof ProfileForm)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['display_name', 'bio', 'location'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['instagram', 'url'];
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    const isValid = await validateStep();
    if (!isValid) return;

    if (!user) return;
    setIsLoading(true);

    try {
      updateProfile({
        ...data,
        profile_image_url: profileImageUrl,
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Heading level="h2" className="text-center">
            Complete your profile
          </Heading>
          <Text className="mt-2 text-center">
            Let us get to know you better
          </Text>
          <Text variant="small" className="mt-2 text-center text-gray-500">
            Step {currentStep} of 2
          </Text>
        </div>

        <Card>
          <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      label="Display Name"
                      error={errors.display_name?.message}
                      {...register('display_name')}
                    />

                    <FormField
                      label="Bio"
                      type="textarea"
                      {...register('bio')}
                      error={errors.bio?.message}
                    />

                    <FormField
                      label="Location"
                      {...register('location')}
                      error={errors.location?.message}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField
                      label="Instagram"
                      {...register('instagram')}
                      error={errors.instagram?.message}
                      placeholder="@username"
                    />

                    <FormField
                      label="Website"
                      error={errors.url?.message}
                      {...register('url')}
                      placeholder="https://"
                    />

                    <ImageUpload
                      onChange={handleImageChange}
                      previewUrl={previewUrl}
                      onRemove={handleRemoveImage}
                      accept="image/*"
                      label="Upload profile image"
                      disabled={isLoading}
                    />
                  </div>
                )}
              </CardContent>
            </form>

            <CardFooter className="flex justify-between">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isLoading}
                >
                  Previous
                </Button>
              )}
              {currentStep < 2 ? (
                <Button type="button" onClick={handleNext} disabled={isLoading}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Complete Profile'}
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}
