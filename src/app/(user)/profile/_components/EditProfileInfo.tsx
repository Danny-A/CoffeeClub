'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useProfile } from '@/hooks/profile/useProfile';
import { profileSchema, ProfileFormData } from '@/lib/validations/profile';

export function EditProfileInfo() {
  const router = useRouter();
  const { profile, updateProfile, uploadProfileImage } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      display_name: profile?.display_name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      instagram: profile?.instagram || '',
      url: profile?.url || '',
      profile_image_url: profile?.profile_image_url || '',
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile?.profile_image_url || null
  );

  const handleImageChange = async (file: File | null) => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const imageUrl = await uploadProfileImage(file);
        if (imageUrl) {
          updateProfile({ profile_image_url: imageUrl });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    updateProfile({ profile_image_url: '' });
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      updateProfile(data);
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) return <div>No profile found</div>;

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <CardContent className="flex flex-col gap-6">
          <ImageUpload
            onChange={handleImageChange}
            previewUrl={previewUrl}
            onRemove={handleRemoveImage}
            accept="image/*"
            label="Upload profile image"
            disabled={false}
          />

          <FormField
            label="Display Name"
            error={errors.display_name?.message}
            defaultValue={profile.display_name || ''}
            {...register('display_name', {
              required: 'Display name is required',
            })}
          />

          <FormField
            label="Bio"
            error={errors.bio?.message}
            defaultValue={profile.bio || ''}
            {...register('bio')}
          />

          <FormField
            label="Location"
            error={errors.location?.message}
            defaultValue={profile.location || ''}
            {...register('location')}
          />

          <FormField
            label="Instagram"
            error={errors.instagram?.message}
            defaultValue={profile.instagram || ''}
            {...register('instagram')}
            placeholder="@username"
          />

          <FormField
            label="Website"
            error={errors.url?.message}
            defaultValue={profile?.url || ''}
            {...register('url')}
            placeholder="https://"
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" asChild>
            <Link href="/profile">Cancel</Link>
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
