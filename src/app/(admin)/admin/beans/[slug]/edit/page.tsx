'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Fragment, use, useEffect, useMemo, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
import { useBean } from '@/hooks/beans/useBean';
import { useBeanImage } from '@/hooks/beans/useBeanImage';
import { useUpdateBean } from '@/hooks/beans/useUpdateBean';
import { useInfiniteRoasterOptions } from '@/hooks/roasters/useInfiniteRoasterOptions';
import {
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';
import { beanSchema } from '@/lib/validations/bean';
import { COFFEE_REGIONS } from '@/utils/coffeeOrigins';
import { extractIdFromSlug } from '@/utils/slug';

type BeanFormData = z.infer<typeof beanSchema>;

type EditBeanPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function EditBeanPage({ params }: EditBeanPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const id = extractIdFromSlug(slug);

  const { data: bean, isLoading } = useBean(id);
  const [search, setSearch] = useState('');
  const {
    options: roasters,
    isLoading: isLoadingRoasters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRoasterOptions(search);
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
    watch,
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

  const {
    fields: originFields,
    append: appendOrigin,
    remove: removeOrigin,
  } = useFieldArray({
    control,
    name: 'origin',
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
        roaster_id: bean.roasters?.id || '',
        description: bean.description || undefined,
        roast_type: bean.roast_type || undefined,
        roast_level: bean.roast_level || undefined,
        bean_type: bean.bean_type || undefined,
        process: bean.process || undefined,
        elevation_min: bean.elevation_min || undefined,
        elevation_max: bean.elevation_max || undefined,
        origin: bean.origin
          ? bean.origin.split(',').map((o) => ({ value: o.trim() }))
          : undefined,
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

  // Ensure the current bean's roaster is in the options for prefill
  const roasterOptions = useMemo(() => {
    if (
      bean &&
      bean.roasters &&
      !roasters.some((r) => r.id === bean.roasters?.id)
    ) {
      return [{ id: bean.roasters.id, name: bean.roasters.name }, ...roasters];
    }
    return roasters;
  }, [bean, roasters]);

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
        origin: data.origin
          .filter((o) => o.value.trim() !== '')
          .map((o) => o.value.trim())
          .join(', '),
        buy_urls: data.buy_urls?.map((url) => url.value).filter(Boolean),
      });

      router.push('/admin/beans');
    } catch (error) {
      console.error('Error updating bean:', error);
    }
  };

  if (isLoading || isLoadingRoasters) {
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
          <Heading level="h6" as="h2" muted>
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
                    <ComboBox
                      options={roasterOptions}
                      value={field.value}
                      onChange={field.onChange}
                      onSearch={setSearch}
                      onScrollEnd={() => {
                        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                      }}
                      isLoading={isLoadingRoasters || isFetchingNextPage}
                      getOptionLabel={(opt) => opt.name}
                      getOptionValue={(opt) => opt.id}
                      placeholder="Select a roaster"
                    />
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
                        value={field.value ?? undefined}
                        onValueChange={(val) =>
                          field.onChange(val === '' ? undefined : val)
                        }
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
                        value={field.value ?? undefined}
                        onValueChange={(val) =>
                          field.onChange(val === '' ? undefined : val)
                        }
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
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(val) =>
                        field.onChange(val === '' ? undefined : val)
                      }
                    >
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
                  {...register('elevation_min')}
                  error={errors.elevation_min?.message}
                />

                <FormField
                  label="Maximum Elevation (m)"
                  id="elevation_max"
                  type="number"
                  {...register('elevation_max')}
                  error={errors.elevation_max?.message}
                />
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
                  watch('bean_type') === Bean_Type.SingleOrigin &&
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

              <ImageUpload
                onChange={handleImageChange}
                previewUrl={previewUrl}
                onRemove={handleRemoveImage}
                accept="image/*"
                label="Upload bean image"
                disabled={updateBean.isPending}
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
