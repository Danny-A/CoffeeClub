'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { TextArea } from '@/components/ui/TextArea';
import { useBean } from '@/hooks/beans/useBean';
import { useBeanImage } from '@/hooks/beans/useBeanImage';
import { useUpdateBean } from '@/hooks/beans/useUpdateBean';
import { useAllRoasters } from '@/hooks/roasters/useAllRoasters';
import {
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';

const beanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roaster_id: z.string().min(1, 'Roaster is required'),
  description: z.string().optional(),
  roast_type: z.nativeEnum(Roast_Type).optional(),
  roast_level: z.nativeEnum(Roast_Level).optional(),
  bean_type: z.nativeEnum(Bean_Type).optional(),
  process: z.string().optional(),
  elevation_min: z.number().optional(),
  elevation_max: z.number().optional(),
  origin: z.string().optional(),
  producer: z.string().optional(),
  notes: z.string().optional(),
  buy_urls: z.array(z.object({ value: z.string().url('Must be a valid URL') })),
  is_published: z.boolean().default(false),
});

type BeanFormData = z.infer<typeof beanSchema>;

type EditBeanPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditBeanPage({ params }: EditBeanPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: bean, isLoading } = useBean(id);
  const { data: roasters, isLoading: isLoadingRoasters } = useAllRoasters();
  const updateBean = useUpdateBean();
  const { uploadBeanImage } = useBeanImage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BeanFormData>({
    resolver: zodResolver(beanSchema),
  });

  const {
    fields: buyUrlFields,
    append: appendBuyUrl,
    remove: removeBuyUrl,
  } = useFieldArray({
    control,
    name: 'buy_urls',
  });

  // Initialize with one empty URL field if there are no fields
  useEffect(() => {
    if (buyUrlFields.length === 0) {
      appendBuyUrl({ value: '' });
    }
  }, [appendBuyUrl, buyUrlFields.length]);

  useEffect(() => {
    if (bean) {
      reset({
        name: bean.name,
        roaster_id: bean.roasters?.id,
        description: bean.description || undefined,
        roast_type: bean.roast_type || undefined,
        roast_level: bean.roast_level || undefined,
        bean_type: bean.bean_type || undefined,
        process: bean.process || undefined,
        elevation_min: bean.elevation_min || undefined,
        elevation_max: bean.elevation_max || undefined,
        origin: bean.origin || undefined,
        producer: bean.producer || undefined,
        notes: bean.notes || undefined,
        buy_urls: (bean.buy_urls || [])
          .filter((url): url is string => typeof url === 'string')
          .map((url) => ({ value: url })),
        is_published: bean.is_published,
      });
      if (bean.image_url) {
        setPreviewUrl(bean.image_url);
      }
    }
  }, [bean, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data: BeanFormData) => {
    try {
      let imageUrl: string | undefined = undefined;

      if (imageFile) {
        const uploadedUrl = await uploadBeanImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } else if (bean?.image_url) {
        imageUrl = bean.image_url;
      }

      await updateBean.mutateAsync({
        id,
        ...data,
        image_url: imageUrl,
        roaster_id: data.roaster_id,
        buy_urls: data.buy_urls.map((url) => url.value).filter(Boolean),
      });

      router.push('/admin/beans');
    } catch (error) {
      console.error('Error updating bean:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!bean) {
    return <div>Bean not found</div>;
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Heading level="h3">Edit bean</Heading>
          <Heading level="h5" as="h2" muted className="mt-2">
            Update bean information
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

              <div className="space-y-2">
                <Text variant="label">Roaster</Text>
                <Controller
                  name="roaster_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoadingRoasters}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a roaster" />
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
                {errors.roaster_id?.message && (
                  <Text variant="error">{errors.roaster_id.message}</Text>
                )}
              </div>

              <TextArea
                label="Description (optional)"
                id="description"
                {...register('description')}
                error={errors.description?.message}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Text variant="label">Roast Type</Text>
                  <Controller
                    name="roast_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select roast type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Roast_Type).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replace('_', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.roast_type?.message && (
                    <Text variant="error">{errors.roast_type.message}</Text>
                  )}
                </div>

                <div className="space-y-2">
                  <Text variant="label">Roast Level</Text>
                  <Controller
                    name="roast_level"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select roast level" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Roast_Level).map((level) => (
                            <SelectItem key={level} value={level}>
                              {level.replace('_', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.roast_level?.message && (
                    <Text variant="error">{errors.roast_level.message}</Text>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Text variant="label">Bean Type</Text>
                <Controller
                  name="bean_type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bean type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Bean_Type).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.bean_type?.message && (
                  <Text variant="error">{errors.bean_type.message}</Text>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Process"
                  id="process"
                  {...register('process')}
                  error={errors.process?.message}
                />

                <FormField
                  label="Producer"
                  id="producer"
                  {...register('producer')}
                  error={errors.producer?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Minimum Elevation (m)"
                  id="elevation_min"
                  type="number"
                  {...register('elevation_min', { valueAsNumber: true })}
                  error={errors.elevation_min?.message}
                />

                <FormField
                  label="Maximum Elevation (m)"
                  id="elevation_max"
                  type="number"
                  {...register('elevation_max', { valueAsNumber: true })}
                  error={errors.elevation_max?.message}
                />
              </div>

              <FormField
                label="Origin"
                id="origin"
                {...register('origin')}
                error={errors.origin?.message}
              />

              <TextArea
                label="Tasting Notes (optional)"
                id="notes"
                {...register('notes')}
                error={errors.notes?.message}
              />

              <div className="space-y-4">
                <Text variant="label">Buy URLs</Text>
                {buyUrlFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-2 items-end justify-between"
                  >
                    <FormField
                      label={`URL ${index + 1}`}
                      type="url"
                      error={errors.buy_urls?.[index]?.value?.message}
                      {...register(`buy_urls.${index}.value` as const)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeBuyUrl(index)}
                      disabled={index === 0 && buyUrlFields.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendBuyUrl({ value: '' })}
                >
                  Add URL
                </Button>
              </div>

              <div className="flex items-center gap-4">
                {previewUrl ? (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Bean preview"
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
                    label="Bean Image"
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
                disabled={updateBean.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateBean.isPending}>
                {updateBean.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
