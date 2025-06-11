'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { TextArea } from '@/components/ui/TextArea';
import { useImageUpload } from '@/hooks/files/useImageUpload';
import { useCreateRoaster } from '@/hooks/roasters/useCreateRoaster';
import { useRoasterImage } from '@/hooks/roasters/useRoasterImage';
import { roasterSchema } from '@/lib/validations/roaster';

type RoasterFormData = z.infer<typeof roasterSchema>;

export default function Page() {
  const router = useRouter();
  const createRoaster = useCreateRoaster();
  const { uploadRoasterImage } = useRoasterImage();

  const {
    previewUrl: profilePreviewUrl,
    handleChange: handleProfileChange,
    handleRemove: handleProfileRemove,
    upload: uploadProfileImage,
  } = useImageUpload(uploadRoasterImage);

  const {
    previewUrl: logoPreviewUrl,
    handleChange: handleLogoChange,
    handleRemove: handleLogoRemove,
    upload: uploadLogoImage,
  } = useImageUpload(uploadRoasterImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoasterFormData>({
    resolver: zodResolver(roasterSchema) as Resolver<RoasterFormData>,
  });

  const onSubmit = async (data: RoasterFormData) => {
    try {
      const [profileImageUrl, logoUrl] = await Promise.all([
        uploadProfileImage(),
        uploadLogoImage(),
      ]);

      await createRoaster.mutateAsync({
        ...data,
        profile_image_url: profileImageUrl,
        logo_url: logoUrl,
      });

      router.push('/roasters');
    } catch (error) {
      console.error('Error creating roaster:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Heading level="h3">Add new roaster</Heading>
          <Heading level="h5" as="h2" muted className="mt-2">
            Share your favorite coffee roaster with the community
          </Heading>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-4">
              <FormField
                label="Name"
                id="name"
                {...register('name')}
                error={errors.name?.message}
              />

              <TextArea
                label="Description (optional)"
                id="description"
                {...register('description')}
                error={errors.description?.message}
              />

              <FormField
                label="Country"
                id="location_country"
                {...register('location_country')}
                error={errors.location_country?.message}
              />

              <FormField
                label="City (optional)"
                id="location_city"
                {...register('location_city')}
                error={errors.location_city?.message}
              />

              <FormField
                label="State/Region (optional)"
                id="location_state"
                {...register('location_state')}
                error={errors.location_state?.message}
              />

              <FormField
                label="Website (optional)"
                id="url"
                type="url"
                {...register('url')}
                error={errors.url?.message}
                placeholder="https://"
              />

              <FormField
                label="Instagram (optional)"
                id="instagram"
                {...register('instagram')}
                error={errors.instagram?.message}
                placeholder="@username"
              />

              <ImageUpload
                onChange={handleLogoChange}
                previewUrl={logoPreviewUrl}
                onRemove={handleLogoRemove}
                accept="image/*"
                label="Upload roaster logo"
                disabled={createRoaster.isPending}
              />

              <ImageUpload
                onChange={handleProfileChange}
                previewUrl={profilePreviewUrl}
                onRemove={handleProfileRemove}
                accept="image/*"
                label="Upload roaster image"
                disabled={createRoaster.isPending}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={createRoaster.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createRoaster.isPending}>
                {createRoaster.isPending ? 'Creating...' : 'Create Roaster'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
