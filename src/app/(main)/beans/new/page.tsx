'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Fragment, Suspense } from 'react';
import React from 'react';
import { useForm, Controller, useFieldArray, Resolver } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ComboBox } from '@/components/ui/ComboBox';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { ImageUpload } from '@/components/ui/ImageUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { TextArea } from '@/components/ui/TextArea';
import { useBeanImage } from '@/hooks/beans/useBeanImage';
import { useCreateBean } from '@/hooks/beans/useCreateBean';
import { useInfiniteRoasterOptions } from '@/hooks/roasters/useInfiniteRoasterOptions';
import {
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';
import { beanSchema } from '@/lib/validations/bean';
import { COFFEE_REGIONS } from '@/utils/coffeeOrigins';

type BeanFormData = z.infer<typeof beanSchema>;

interface OriginField {
  id: string;
  value: string;
}

export default function Page() {
  return (
    <Suspense>
      <NewBeanPage />
    </Suspense>
  );
}

function NewBeanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    resolver: zodResolver(beanSchema) as Resolver<BeanFormData>,
    defaultValues: {
      roasterId: roasterId || '',
      buyUrls: [],
      origin: [{ value: '' }],
    },
  });

  const {
    fields: buyUrlFields,
    append: appendBuyUrl,
    remove: removeBuyUrl,
  } = useFieldArray({
    control,
    name: 'buyUrls',
  });

  const {
    fields: originFields,
    append: appendOrigin,
    remove: removeOrigin,
  } = useFieldArray({
    control,
    name: 'origin',
  });

  const [search, setSearch] = React.useState('');
  const {
    options: roasters,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRoasterOptions(search);

  useEffect(() => {
    if (originFields.length === 0) {
      appendOrigin({ value: '' });
    }
  }, [appendOrigin, originFields.length]);

  useEffect(() => {
    if (roasterId && roasterId) {
      setValue('roasterId', roasterId);
    }
  }, [roasterId, setValue]);

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
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
        imageUrl: imageUrl,
        buyUrls: data.buyUrls?.map((url) => url.value).filter(Boolean),
        origin: data.origin
          .filter((o) => o.value.trim() !== '')
          .map((o) => o.value.trim())
          .join(', '),
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
                  name="roasterId"
                  control={control}
                  render={({ field }) => (
                    <ComboBox
                      options={roasters}
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      onSearch={setSearch}
                      onScrollEnd={() => {
                        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                      }}
                      isLoading={isLoading || isFetchingNextPage}
                      getOptionLabel={(opt) => opt.name}
                      getOptionValue={(opt) => opt.id}
                      placeholder="Select a roaster"
                    />
                  )}
                />
                {errors.roasterId?.message && (
                  <Text variant="error">{errors.roasterId.message}</Text>
                )}
              </div>
              <ImageUpload
                onChange={handleImageChange}
                previewUrl={previewUrl}
                onRemove={handleRemoveImage}
                accept="image/*"
                label="Upload bean image"
                disabled={isSubmitting}
              />

              <TextArea
                label="Description"
                error={errors.description?.message}
                {...register('description')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Text variant="label">Roast Type</Text>
                  <Controller
                    name="roastType"
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
                  {errors.roastType?.message && (
                    <Text variant="error">{errors.roastType.message}</Text>
                  )}
                </div>

                <div className="space-y-2">
                  <Text variant="label">Roast Level</Text>
                  <Controller
                    name="roastLevel"
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
                  {errors.roastLevel?.message && (
                    <Text variant="error">{errors.roastLevel.message}</Text>
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
                    name="beanType"
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
                              setValue('origin', nonEmptyOrigins);
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
                  {errors.beanType?.message && (
                    <Text variant="error">{errors.beanType.message}</Text>
                  )}
                </div>

                <Text variant="label">Origin</Text>
                {originFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <div className="flex-1">
                      <Controller
                        name={`origin.${index}.value`}
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
                                <Fragment key={`region-${region.name}`}>
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
                                </Fragment>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.origin?.[index]?.value?.message && (
                        <Text variant="error">
                          {String(errors.origin[index]?.value?.message)}
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
                    watch('beanType') === Bean_Type.SingleOrigin &&
                    originFields.length > 0
                  }
                >
                  Add Origin
                </Button>
                {errors.origin?.message && (
                  <Text variant="error" className="mt-2">
                    {String(errors.origin.message)}
                  </Text>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Minimum Elevation (m)"
                  type="number"
                  min="0"
                  error={errors.elevationMin?.message}
                  {...register('elevationMin')}
                />

                <FormField
                  label="Maximum Elevation (m)"
                  type="number"
                  min="0"
                  error={errors.elevationMax?.message}
                  {...register('elevationMax')}
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
                      error={errors.buyUrls?.[index]?.value?.message}
                      {...register(`buyUrls.${index}.value` as const)}
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
