'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Fragment, use, useEffect, useMemo, useState } from 'react';
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
import { useBean } from '@/hooks/beans/useBean';
import { useBeanImage } from '@/hooks/beans/useBeanImage';
import { useUpdateBean } from '@/hooks/beans/useUpdateBean';
import { useInfiniteRoasterOptions } from '@/hooks/roasters/useInfiniteRoasterOptions';
import {
  Bean_Type,
  Bean_Status,
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

  const { data: bean, isLoading } = useBean(id, true);
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
    resolver: zodResolver(beanSchema) as Resolver<BeanFormData>,
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

  // Initialize with one empty URL field if there are no fields
  useEffect(() => {
    if (buyUrlFields.length === 0) {
      appendBuyUrl({ value: '' });
    }
  }, [appendBuyUrl, buyUrlFields.length]);

  useEffect(() => {
    if (bean && bean.id) {
      reset({
        name: bean.name,
        roasterId: bean.roaster?.id || '',
        description: bean.description || undefined,
        roastType: bean.roastType || undefined,
        roastLevel: bean.roastLevel || undefined,
        beanType: bean.beanType || undefined,
        process: bean.process || undefined,
        elevationMin: bean.elevationMin || undefined,
        elevationMax: bean.elevationMax || undefined,
        origin: bean.origin
          ? bean.origin.split(',').map((o) => ({ value: o.trim() }))
          : undefined,
        producer: bean.producer || undefined,
        notes: bean.notes || undefined,
        buyUrls: (bean.buyUrls || [])
          .filter((url): url is string => typeof url === 'string')
          .map((url) => ({ value: url })),
        status: bean.status,
      });

      if (bean.imageUrl) {
        setPreviewUrl(bean.imageUrl);
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
      bean.roaster &&
      !roasters.some((r) => r.id === bean.roaster?.id)
    ) {
      return [{ id: bean.roaster.id, name: bean.roaster.name }, ...roasters];
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
      } else if (bean?.imageUrl) {
        imageUrl = bean.imageUrl;
      }

      await updateBean.mutateAsync({
        id,
        ...data,
        image_url: imageUrl,
        roaster_id: data.roasterId,
        origin: data.origin
          .filter((o) => o.value.trim() !== '')
          .map((o) => o.value.trim())
          .join(', '),
        buy_urls: data.buyUrls?.map((url) => url.value).filter(Boolean),
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
          <form
            key={bean.id}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
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
                  name="roasterId"
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
                {errors.roasterId?.message && (
                  <Text variant="error">{errors.roasterId.message}</Text>
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
                    name="roastType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value || ''}
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
                        value={field.value || ''}
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
                  {errors.roastLevel?.message && (
                    <Text variant="error">{errors.roastLevel.message}</Text>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Text variant="label">Bean Type</Text>
                <Controller
                  name="beanType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || ''}
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
                {errors.beanType?.message && (
                  <Text variant="error">{errors.beanType.message}</Text>
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
                  id="elevationMin"
                  type="number"
                  {...register('elevationMin')}
                  error={errors.elevationMin?.message}
                />

                <FormField
                  label="Maximum Elevation (m)"
                  id="elevationMax"
                  type="number"
                  {...register('elevationMax')}
                  error={errors.elevationMax?.message}
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

              <ImageUpload
                onChange={handleImageChange}
                previewUrl={previewUrl}
                onRemove={handleRemoveImage}
                accept="image/*"
                label="Upload bean image"
                disabled={updateBean.isPending}
              />

              <div className="space-y-2">
                <Text variant="label">Status</Text>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || ''}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Bean_Status.PendingReview}>
                          Pending Review
                        </SelectItem>
                        <SelectItem value={Bean_Status.Approved}>
                          Approved
                        </SelectItem>
                        <SelectItem value={Bean_Status.Published}>
                          Published
                        </SelectItem>
                        <SelectItem value={Bean_Status.Rejected}>
                          Rejected
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status?.message && (
                  <Text variant="error">{errors.status.message}</Text>
                )}
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
