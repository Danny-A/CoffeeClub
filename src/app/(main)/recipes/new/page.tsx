'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useForm, Controller, Resolver } from 'react-hook-form';

import { ForwardRefEditor } from '@/components/mdx/ForwardRefEditor';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { ComboBox } from '@/components/ui/ComboBox';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import { ImageUpload } from '@/components/ui/ImageUpload';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/hooks/auth/useAuth';
import { useInfiniteBeanOptions } from '@/hooks/beans/useInfiniteBeanOptions';
import { useCreateRecipe } from '@/hooks/recipes/useCreateRecipe';
import { useRecipeImage } from '@/hooks/recipes/useRecipeImage';
import { Brew_Method } from '@/lib/graphql/generated/graphql';
import { recipeSchema, RecipeFormData } from '@/lib/validations/recipe';

const brewMethodOptions = Object.entries(Brew_Method).map(([, value]) => ({
  label: value.replace(/_/g, ' '),
  value,
}));

function NewRecipeForm() {
  const router = useRouter();
  const createRecipe = useCreateRecipe();
  const { uploadRecipeImage } = useRecipeImage();
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [beanSearch, setBeanSearch] = useState('');
  const {
    data: beanPages,
    isLoading: isBeansLoading,
    fetchNextPage: fetchNextBeans,
    hasNextPage: hasNextBeans,
    isFetchingNextPage: isFetchingNextBeans,
  } = useInfiniteBeanOptions(beanSearch);
  const beanOptions = (beanPages?.pages ?? [])
    .flatMap((page) => page?.edges ?? [])
    .map((edge) => edge.node);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema) as Resolver<RecipeFormData>,
  });

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

  const onSubmit = async (data: RecipeFormData) => {
    try {
      let imageUrl: string | undefined = data.image_url || undefined;
      if (imageFile) {
        imageUrl = await uploadRecipeImage(imageFile);
      }
      await createRecipe.mutateAsync({
        title: data.title,
        description: data.description,
        image_url: imageUrl,
        bean_id: data.bean_id || undefined,
        brew_method: data.brew_method,
        grind_size: data.grind_size || undefined,
        grind_weight:
          typeof data.grind_weight === 'number'
            ? String(data.grind_weight)
            : undefined,
        ratio: data.ratio || undefined,
        is_public: data.is_public,
        user_id: user?.id,
      });
      router.push('/profile/recipes');
    } catch {
      // error handled by react-query or form
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Heading level="h3">Create Recipe</Heading>
          <Heading level="h5" as="h2" muted className="mt-2">
            Share your coffee recipe with the community
          </Heading>
        </div>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-4">
              <FormField
                label="Title"
                error={errors.title?.message}
                {...register('title')}
              />
              <div className="space-y-2">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description (Markdown/MDX supported)
                      </label>
                      <ForwardRefEditor
                        markdown={field.value || ''}
                        onChange={field.onChange}
                        className="border rounded min-h-[200px]"
                      />
                      {errors.description?.message && (
                        <Text variant="error">
                          {errors.description.message}
                        </Text>
                      )}
                    </div>
                  )}
                />
              </div>
              <ImageUpload
                onChange={handleImageChange}
                previewUrl={previewUrl}
                onRemove={handleRemoveImage}
                accept="image/*"
                label="Upload image"
                disabled={isSubmitting}
              />
              <div className="space-y-2">
                <Text variant="label">Bean (optional)</Text>
                <Controller
                  name="bean_id"
                  control={control}
                  render={({ field }) => (
                    <ComboBox
                      options={beanOptions}
                      value={field.value || null}
                      onChange={(value) => field.onChange(value || '')}
                      onSearch={setBeanSearch}
                      onScrollEnd={() => {
                        if (hasNextBeans && !isFetchingNextBeans)
                          fetchNextBeans();
                      }}
                      isLoading={isBeansLoading || isFetchingNextBeans}
                      getOptionLabel={(opt) =>
                        `${opt.roasters?.name ? opt.roasters.name + ' - ' : ''}${opt.name}`
                      }
                      getOptionValue={(opt) => opt.id}
                      placeholder="Select a bean"
                    />
                  )}
                />
                {errors.bean_id?.message && (
                  <Text variant="error">{errors.bean_id.message}</Text>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Text variant="label">Brew Method</Text>
                  <Controller
                    name="brew_method"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          {field.value
                            ? brewMethodOptions.find(
                                (o) => o.value === field.value
                              )?.label
                            : 'Select brew method'}
                        </SelectTrigger>
                        <SelectContent>
                          {brewMethodOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.brew_method?.message && (
                    <Text variant="error">{errors.brew_method.message}</Text>
                  )}
                </div>
                <FormField
                  label="Ratio (optional)"
                  error={errors.ratio?.message}
                  {...register('ratio')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Grind Size (optional)"
                  error={errors.grind_size?.message}
                  {...register('grind_size')}
                />
                <FormField
                  label="Grind Weight (g, optional)"
                  error={errors.grind_weight?.message}
                  type="number"
                  min={0}
                  step={0.1}
                  {...register('grind_weight')}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_public"
                  {...register('is_public')}
                />
                <label htmlFor="is_public" className="text-sm">
                  Public recipe (visible to others)
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isSubmitting || createRecipe.isPending}
              >
                {isSubmitting || createRecipe.isPending
                  ? 'Creating...'
                  : 'Create Recipe'}
              </Button>
              {createRecipe.isError && (
                <Text variant="error" className="ml-4">
                  {createRecipe.error instanceof Error
                    ? createRecipe.error.message
                    : 'Failed to create recipe'}
                </Text>
              )}
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
      <NewRecipeForm />
    </Suspense>
  );
}
