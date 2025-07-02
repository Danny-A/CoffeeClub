'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { use } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { TextArea } from '@/components/ui/TextArea';
import { useImageUpload } from '@/hooks/files/useImageUpload';
import { useRoaster } from '@/hooks/roasters/useRoaster';
import { useRoasterImage } from '@/hooks/roasters/useRoasterImage';
import { useUpdateRoaster } from '@/hooks/roasters/useUpdateRoaster';
import { roasterSchema } from '@/lib/validations/roaster';
import { extractIdFromSlug } from '@/utils/slug';

type RoasterFormData = z.infer<typeof roasterSchema>;

type EditRoasterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function EditRoasterPage({ params }: EditRoasterPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const id = extractIdFromSlug(slug);

  const { data: roaster, isLoading } = useRoaster(id);
  const updateRoaster = useUpdateRoaster();
  const { uploadRoasterImage, deleteRoasterImage } = useRoasterImage();

  const {
    previewUrl: profilePreviewUrl,
    setPreviewUrl: setProfilePreviewUrl,
    handleChange: handleProfileChange,
    handleRemove: handleProfileRemove,
    upload: uploadProfileImage,
  } = useImageUpload(uploadRoasterImage);

  const {
    previewUrl: logoPreviewUrl,
    setPreviewUrl: setLogoPreviewUrl,
    handleChange: handleLogoChange,
    handleRemove: handleLogoRemove,
    upload: uploadLogoImage,
  } = useImageUpload(uploadRoasterImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoasterFormData>({
    resolver: zodResolver(roasterSchema) as Resolver<RoasterFormData>,
  });

  useEffect(() => {
    if (roaster) {
      reset({
        name: roaster.name,
        description: roaster.description || undefined,
        location_country: roaster.country || '',
        location_city: roaster.city || undefined,
        location_state: roaster.state || undefined,
        url: roaster.url || undefined,
        instagram: roaster.instagram || undefined,
        is_published: roaster.isPublished,
        logo_url: roaster.logoUrl || undefined,
        profile_image_url: roaster.profileImageUrl || undefined,
      });
      if (roaster.profileImageUrl) {
        setProfilePreviewUrl(roaster.profileImageUrl);
      }
      if (roaster.logoUrl) {
        setLogoPreviewUrl(roaster.logoUrl);
      }
    }
  }, [roaster, reset, setProfilePreviewUrl, setLogoPreviewUrl]);

  const onSubmit = async (data: RoasterFormData) => {
    try {
      // Delete images from storage if removed
      if (profilePreviewUrl === null && roaster?.profileImageUrl) {
        await deleteRoasterImage(roaster.profileImageUrl);
      }
      if (logoPreviewUrl === null && roaster?.logoUrl) {
        await deleteRoasterImage(roaster.logoUrl);
      }

      const [profileImageUrl, logoUrl] = await Promise.all([
        uploadProfileImage(roaster?.profileImageUrl),
        uploadLogoImage(roaster?.logoUrl),
      ]);

      await updateRoaster.mutateAsync({
        id,
        ...data,
        profile_image_url: profileImageUrl,
        logo_url: logoUrl,
      });

      router.push('/admin/roasters');
    } catch (error) {
      console.error('Error updating roaster:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!roaster) {
    return <div>Roaster not found</div>;
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Heading level="h3">Edit roaster</Heading>
          <Heading level="h6" as="h2" muted>
            Update roaster information
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
                disabled={updateRoaster.isPending}
              />

              <ImageUpload
                onChange={handleProfileChange}
                previewUrl={profilePreviewUrl}
                onRemove={handleProfileRemove}
                accept="image/*"
                label="Upload roaster image"
                disabled={updateRoaster.isPending}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_published"
                  {...register('is_published')}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="is_published"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Published
                </label>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={updateRoaster.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateRoaster.isPending}>
                {updateRoaster.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
