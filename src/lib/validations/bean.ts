import { z } from "zod";

import {
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from "@/lib/graphql/generated/graphql";

export const beanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roaster_id: z.string().min(1, "Roaster is required"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  roast_type: z.nativeEnum(Roast_Type).optional(),
  roast_level: z.nativeEnum(Roast_Level).optional(),
  bean_type: z.nativeEnum(Bean_Type).optional(),
  process: z.string().optional(),
  elevation_min: z.coerce.number().min(0).optional(),
  elevation_max: z.coerce.number().min(0).optional(),
  origin: z
    .array(z.object({ value: z.string() }))
    .refine((origins) => origins.some((o) => o.value.trim() !== ""), {
      message: "At least one origin is required",
    })
    .superRefine((origins, ctx) => {
      const formData = ctx.path.length > 0 ? ctx.path[0] : {};
      const beanType = (formData as { bean_type?: Bean_Type })?.bean_type;
      if (beanType === Bean_Type.SingleOrigin) {
        const nonEmptyOrigins = origins.filter((o) => o.value.trim() !== "");
        if (nonEmptyOrigins.length > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Single origin beans can only have one origin",
          });
          return false;
        }
      }
      return true;
    }),
  producer: z.string().optional(),
  notes: z.string().optional(),
  buy_urls: z
    .array(
      z.object({
        value: z.string().url("Must be a valid URL").or(z.literal("")),
      }),
    )
    .optional(),
  is_published: z.boolean().default(true),
});
