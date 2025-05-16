'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

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
import { useInfiniteBeanOptions } from '@/hooks/beans/useInfiniteBeanOptions';
import { useRecipeImage } from '@/hooks/recipes/useRecipeImage';
import { useUpdateRecipe } from '@/hooks/recipes/useUpdateRecipe';
import { Brew_Method } from '@/lib/graphql/generated/graphql';
import type { GetRecipeByIdQuery } from '@/lib/graphql/generated/graphql';
import { recipeSchema, RecipeFormData } from '@/lib/validations/recipe';

type RecipeNode = NonNullable<
  NonNullable<GetRecipeByIdQuery['recipesCollection']>['edges'][number]
>['node'];

type EditRecipeFormProps = {
  recipe: RecipeNode;
};

const brewMethodOptions = Object.entries(Brew_Method).map(([, value]) => ({
  label: value.replace(/_/g, ' '),
  value,
}));

export function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  const router = useRouter();
  const updateRecipe = useUpdateRecipe();
  const { uploadRecipeImage } = useRecipeImage();
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    recipe.image_url || null
  );
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [beanSearch, setBeanSearch] = React.useState('');
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
    setValue,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ...recipe,
      grind_weight: recipe.grind_weight
        ? Number(recipe.grind_weight)
        : undefined,
      bean_id: recipe.bean_id ?? '',
      image_url: recipe.image_url ?? '',
      is_public: recipe.is_public ?? false,
      brew_method: recipe.brew_method ?? undefined,
      description: recipe.description ?? '',
      title: recipe.title ?? '',
      grind_size: recipe.grind_size ?? '',
      ratio: recipe.ratio ?? '',
    },
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
    setValue('image_url', '');
  };

  const onSubmit = async (data: RecipeFormData) => {
    try {
      let imageUrl: string | undefined = data.image_url || undefined;
      if (imageFile) {
        imageUrl = await uploadRecipeImage(imageFile);
      }

      await updateRecipe.mutateAsync({
        id: recipe.id,
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
      });
      router.push(`/profile/recipes/${recipe.id}`);
    } catch {
      // error handled by react-query or form
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Heading level="h3">Edit Recipe</Heading>
          <Heading level="h5" as="h2" muted className="mt-2">
            Update your coffee recipe
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
                disabled={isSubmitting || updateRecipe.isPending}
              >
                {isSubmitting || updateRecipe.isPending
                  ? 'Updating...'
                  : 'Update Recipe'}
              </Button>
              {updateRecipe.isError && (
                <Text variant="error" className="ml-4">
                  {updateRecipe.error instanceof Error
                    ? updateRecipe.error.message
                    : 'Failed to update recipe'}
                </Text>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
