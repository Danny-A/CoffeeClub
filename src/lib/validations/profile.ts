import { z } from 'zod';

export const profileSchema = z.object({
  display_name: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().optional(),
  location: z.string().optional(),
  instagram: z.string().optional(),
  url: z.url('Must be a valid URL').optional().or(z.literal('')),
  profile_image_url: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
