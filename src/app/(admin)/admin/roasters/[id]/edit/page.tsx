'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { TextArea } from '@/components/ui/TextArea';
import { useRoaster } from '@/hooks/roasters/useRoaster';
import { useRoasterImage } from '@/hooks/roasters/useRoasterImage';
import { useUpdateRoaster } from '@/hooks/roasters/useUpdateRoaster';

const roasterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  location_country: z.string().min(1, 'Country is required'),
  location_city: z.string().optional(),
  location_state: z.string().optional(),
  url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  instagram: z.string().optional(),
  is_published: z.boolean().default(true),
});

type RoasterFormData = z.infer<typeof roasterSchema>;

type EditRoasterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditRoasterPage({ params }: EditRoasterPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: roaster, isLoading } = useRoaster(id);
  const updateRoaster = useUpdateRoaster();
  const { uploadRoasterImage } = useRoasterImage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoasterFormData>({
    resolver: zodResolver(roasterSchema),
  });

  useEffect(() => {
    if (roaster) {
      reset({
        name: roaster.name,
        description: roaster.description || undefined,
        location_country: roaster.location_country || '',
        location_city: roaster.location_city || undefined,
        location_state: roaster.location_state || undefined,
        url: roaster.url || undefined,
        instagram: roaster.instagram || undefined,
        is_published: roaster.is_published,
      });
      if (roaster.profile_image_url) {
        setPreviewUrl(roaster.profile_image_url);
      }
    }
  }, [roaster, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data: RoasterFormData) => {
    try {
      let imageUrl: string | undefined = undefined;

      if (imageFile) {
        const uploadedUrl = await uploadRoasterImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } else if (roaster?.profile_image_url) {
        imageUrl = roaster.profile_image_url;
      }

      await updateRoaster.mutateAsync({
        id,
        ...data,
        profile_image_url: imageUrl,
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
          <Heading level="h5" as="h2" muted className="mt-2">
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

              <div className="flex items-center gap-4">
                {previewUrl ? (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Roaster preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="flex-1">
                  <FormField
                    type="file"
                    label="Roaster Image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

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
