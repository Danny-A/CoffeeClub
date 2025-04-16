'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { useAllRoasters } from '@/hooks/roasters/useAllRoasters';
import { useCreateBean } from '@/hooks/useCreateBean';

const beanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  origin: z.string().min(1, 'Origin is required'),
  process: z.string().min(1, 'Process is required'),
  roastLevel: z.enum(['Light', 'Medium', 'Dark']),
  roasterId: z.string().min(1, 'Roaster is required'),
});

type BeanFormData = z.infer<typeof beanSchema>;

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: roasters, isLoading: isLoadingRoasters } = useAllRoasters();
  const createBean = useCreateBean();
  const roasterId = searchParams.get('roasterId');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BeanFormData>({
    resolver: zodResolver(beanSchema),
    defaultValues: {
      roasterId: roasterId || undefined,
    },
  });

  useEffect(() => {
    if (roasterId && roasters) {
      const selectedRoaster = roasters.find(
        (roaster) => roaster.id === roasterId
      );
      if (selectedRoaster) {
        setValue('roasterId', roasterId);
      }
    }
  }, [roasterId, roasters, setValue]);

  const onSubmit = async (data: BeanFormData) => {
    try {
      await createBean.mutateAsync(data);
      router.push('/beans');
    } catch (error) {
      console.error('Error creating bean:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Heading level="h1">Add New Bean</Heading>
        <Heading level="h2" muted className="mt-2">
          Share your favorite coffee bean with the community
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
          label="Origin"
          id="origin"
          {...register('origin')}
          error={errors.origin?.message}
        />

        <FormField
          label="Process"
          id="process"
          {...register('process')}
          error={errors.process?.message}
        />

        <div className="space-y-2">
          <label htmlFor="roastLevel" className="text-sm font-medium">
            Roast Level
          </label>
          <Controller
            name="roastLevel"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a roast level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Light">Light</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.roastLevel?.message && (
            <p className="text-sm text-red-600">{errors.roastLevel.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="roasterId" className="text-sm font-medium">
            Roaster
          </label>
          <Controller
            name="roasterId"
            control={control}
            defaultValue={roasterId || ''}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!!roasterId || isLoadingRoasters}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a roaster">
                    {roasters?.find((r) => r.id === field.value)?.name ||
                      'Select a roaster'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {roasters?.map((roaster) => (
                    <SelectItem key={roaster.id} value={roaster.id}>
                      {roaster.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.roasterId?.message && (
            <p className="text-sm text-red-600">{errors.roasterId.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={createBean.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={createBean.isPending}>
            {createBean.isPending ? 'Creating...' : 'Create Bean'}
          </Button>
        </div>
      </form>
    </div>
  );
}
