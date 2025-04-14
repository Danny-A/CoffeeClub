'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { TextArea } from '@/components/ui/TextArea';
import { useCreateRoaster } from '@/hooks/useCreateRoaster';

const roasterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type RoasterFormData = z.infer<typeof roasterSchema>;

export default function NewRoasterPage() {
  const router = useRouter();
  const createRoaster = useCreateRoaster();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoasterFormData>({
    resolver: zodResolver(roasterSchema),
  });

  const onSubmit = async (data: RoasterFormData) => {
    try {
      await createRoaster.mutateAsync(data);
      router.push('/roasters');
    } catch (error) {
      console.error('Error creating roaster:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Heading level="h1">Add New Roaster</Heading>
        <Heading level="h2" muted className="mt-2">
          Share your favorite coffee roaster with the community
        </Heading>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          label="Name"
          id="name"
          {...register('name')}
          error={errors.name?.message}
        />

        <TextArea
          label="Description"
          id="description"
          {...register('description')}
          error={errors.description?.message}
        />

        <FormField
          label="Location"
          id="location"
          {...register('location')}
          error={errors.location?.message}
        />

        <FormField
          label="Website (optional)"
          id="website"
          type="url"
          {...register('website')}
          error={errors.website?.message}
        />

        <div className="flex justify-end space-x-4">
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
        </div>
      </form>
    </div>
  );
}
