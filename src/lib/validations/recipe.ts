import { z } from "zod";

import { Brew_Method } from "@/lib/graphql/generated/graphql";

export const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  brew_method: z.nativeEnum(Brew_Method, {
    errorMap: () => ({ message: "Brew method is required" }),
  }),
  is_public: z.boolean().default(false),
  bean_id: z.string().uuid("Invalid bean ID").optional().or(z.literal("")),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  grind_size: z.string().optional(),
  grind_weight: z.coerce.number().min(0, "Must be positive").optional(),
  ratio: z.string().optional(),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
