import { z } from "zod";

export const roasterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  location_country: z.string().min(1, "Country is required"),
  location_city: z.string().optional(),
  location_state: z.string().optional(),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagram: z.string().optional(),
  logo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  profile_image_url: z.string().url("Must be a valid URL").optional().or(
    z.literal(""),
  ),
  is_published: z.boolean().default(true),
});
