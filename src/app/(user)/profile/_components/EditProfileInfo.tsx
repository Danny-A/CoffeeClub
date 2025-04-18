'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { useProfile } from '@/hooks/profile/useProfile';
import { Profiles } from '@/lib/graphql/generated/graphql';

type FormData = {
  display_name: string;
  bio: string;
  location: string;
  instagram: string;
  url: string;
};

export function EditProfileInfo({ profile }: { profile: Profiles | null }) {
  const router = useRouter();
  const { updateProfile, uploadProfileImage } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    values: {
      display_name: profile?.display_name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      instagram: profile?.instagram || '',
      url: profile?.url || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      updateProfile(data);

      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadProfileImage(file);
      if (imageUrl) {
        updateProfile({ profile_image_url: imageUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (!profile) return <div>No profile found</div>;

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              src={profile.profile_image_url || ''}
              alt={profile.display_name || 'Profile'}
              size="lg"
            />
            <div className="flex-1">
              <FormField
                type="file"
                label="Profile Image"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

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
