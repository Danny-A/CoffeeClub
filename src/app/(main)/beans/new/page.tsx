'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
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
import { useAllRoasters } from '@/hooks/roasters/useAllRoasters';
import { useBeanImage } from '@/hooks/useBeanImage';
import { useCreateBean } from '@/hooks/useCreateBean';
import {
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';
import { COFFEE_REGIONS } from '@/utils/coffeeOrigins';

const beanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roaster_id: z.string().min(1, 'Roaster is required'),
  description: z.string().optional(),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  roast_type: z.nativeEnum(Roast_Type).optional(),
  process: z.string().optional(),
  roast_level: z.nativeEnum(Roast_Level).optional(),
  bean_type: z.nativeEnum(Bean_Type).optional(),
  elevation_min: z.coerce.number().min(0).optional(),
  elevation_max: z.coerce.number().min(0).optional(),
  origins: z
    .array(z.object({ value: z.string() }))
    .refine((origins) => origins.some((o) => o.value.trim() !== ''), {
      message: 'At least one origin is required',
    })
    .superRefine((origins, ctx) => {
      const formData = ctx.path.length > 0 ? ctx.path[0] : {};
      const beanType = (formData as { bean_type?: Bean_Type })?.bean_type;
      if (beanType === Bean_Type.SingleOrigin) {
        const nonEmptyOrigins = origins.filter((o) => o.value.trim() !== '');
        if (nonEmptyOrigins.length > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Single origin beans can only have one origin',
          });
          return false;
        }
      }
      return true;
    }),
  producer: z.string().optional(),
  notes: z.string().optional(),
  is_published: z.boolean().default(true),
  buy_urls: z.array(z.object({ value: z.string().url('Must be a valid URL') })),
});

type BeanFormData = z.infer<typeof beanSchema>;

interface OriginField {
  id: string;
  value: string;
}

function NewBeanForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: roasters, isLoading: isLoadingRoasters } = useAllRoasters();
  const createBean = useCreateBean();
  const { uploadBeanImage } = useBeanImage();
  const roasterId = searchParams.get('roasterId');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BeanFormData>({
    resolver: zodResolver(beanSchema),
    defaultValues: {
      roaster_id: roasterId || undefined,
      buy_urls: [],
      origins: [{ value: '' }],
    },
  });

  const {
    fields: buyUrlFields,
    append: appendBuyUrl,
    remove: removeBuyUrl,
  } = useFieldArray({
    control,
    name: 'buy_urls',
  });

  const {
    fields: originFields,
    append: appendOrigin,
    remove: removeOrigin,
  } = useFieldArray({
    control,
    name: 'origins',
  });

  // Initialize with one empty URL field if there are no fields
  useEffect(() => {
    if (buyUrlFields.length === 0) {
      appendBuyUrl({ value: '' });
    }
    if (originFields.length === 0) {
      appendOrigin({ value: '' });
    }
  }, [appendBuyUrl, appendOrigin, buyUrlFields.length, originFields.length]);

  useEffect(() => {
    if (roasterId && roasters) {
      const selectedRoaster = roasters.find(
        (roaster) => roaster.id === roasterId
      );
      if (selectedRoaster) {
        setValue('roaster_id', roasterId);
      }
    }
  }, [roasterId, roasters, setValue]);

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
      let imageUrl: string | undefined;

      if (imageFile) {
        imageUrl = await uploadBeanImage(imageFile);
      }

      // Filter out empty URLs and transform to string array
      const filteredData = {
        ...data,
        image_url: imageUrl,
        buy_urls: data.buy_urls.map((url) => url.value).filter(Boolean),
        origins: data.origins.filter((origin) => origin.value.trim() !== ''),
      };

      await createBean.mutateAsync(filteredData);
      router.push('/beans');
    } catch (error) {
      console.error('Error creating bean:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Heading level="h3">Add new bean</Heading>
          <Heading level="h5" as="h2" muted className="mt-2">
            Share your favorite coffee bean with the community
          </Heading>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-4">
              <FormField
                label="Name"
                error={errors.name?.message}
                {...register('name')}
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

              <TextArea
                label="Description"
                error={errors.description?.message}
                {...register('description')}
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
                              {type}
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
                              {level}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Process"
                  error={errors.process?.message}
                  {...register('process')}
                />

                <FormField
                  label="Producer"
                  error={errors.producer?.message}
                  {...register('producer')}
                />
              </div>

              <hr className="my-8" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Text variant="label">Bean Type</Text>
                  <Controller
                    name="bean_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          // If switching to single origin and multiple origins exist,
                          // keep only the first non-empty origin
                          if (value === Bean_Type.SingleOrigin) {
                            const nonEmptyOrigins = originFields
                              .filter(
                                (f: OriginField) =>
                                  f.value && f.value.trim() !== ''
                              )
                              .slice(0, 1)
                              .map((f) => ({ value: f.value }));
                            if (nonEmptyOrigins.length > 0) {
                              setValue('origins', nonEmptyOrigins);
                            }
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bean type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Bean_Type).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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

                <Text variant="label">Origins</Text>
                {originFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <div className="flex-1">
                      <Controller
                        name={`origins.${index}.value`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an origin" />
                            </SelectTrigger>
                            <SelectContent>
                              {COFFEE_REGIONS.map((region) => (
                                <>
                                  <SelectItem
                                    key={`region-${region.name}`}
                                    value={`region-${region.name}`}
                                    disabled
                                    className="font-semibold"
                                  >
                                    {region.name}
                                  </SelectItem>
                                  {region.origins.map((origin) => (
                                    <SelectItem
                                      key={origin.value}
                                      value={origin.value}
                                      title={origin.description}
                                    >
                                      {origin.label}
                                    </SelectItem>
                                  ))}
                                </>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.origins?.[index]?.value?.message && (
                        <Text variant="error">
                          {String(errors.origins[index]?.value?.message)}
                        </Text>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeOrigin(index)}
                      disabled={index === 0 && originFields.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendOrigin({ value: '' })}
                  disabled={
                    watch('bean_type') === Bean_Type.SingleOrigin &&
                    originFields.length > 0
                  }
                >
                  Add Origin
                </Button>
                {errors.origins?.message && (
                  <Text variant="error" className="mt-2">
                    {String(errors.origins.message)}
                  </Text>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Minimum Elevation (m)"
                  type="number"
                  min="0"
                  error={errors.elevation_min?.message}
                  {...register('elevation_min')}
                />

                <FormField
                  label="Maximum Elevation (m)"
                  type="number"
                  min="0"
                  error={errors.elevation_max?.message}
                  {...register('elevation_max')}
                />
              </div>

              <hr className="my-8" />

              <TextArea
                label="Notes"
                error={errors.notes?.message}
                {...register('notes')}
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
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Bean'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <NewBeanForm />
    </Suspense>
  );
}
