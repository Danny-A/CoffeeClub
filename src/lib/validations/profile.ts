import { z } from "zod";

export const editProfileSchema = z.object({
  display_name: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  instagram: z.string().optional(),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  profile_image_url: z.string().optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
