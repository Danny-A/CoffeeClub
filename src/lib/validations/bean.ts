import { z } from 'zod';

import {
  Bean_Status,
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';

export const beanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roasterId: z.string().min(1, 'Roaster is required'),
  imageUrl: z.url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  roastType: z.enum(Roast_Type).optional(),
  roastLevel: z.enum(Roast_Level).optional(),
  beanType: z.enum(Bean_Type).optional(),
  process: z.string().optional(),
  elevationMin: z.coerce.number().min(0).optional(),
  elevationMax: z.coerce.number().min(0).optional(),
  origin: z
    .array(z.object({ value: z.string() }))
    .refine((origins) => origins.some((o) => o.value.trim() !== ''), {
      message: 'At least one origin is required',
    })
    .superRefine((origins, ctx) => {
      // Note: This validation assumes single origin check is handled elsewhere
      // since we can't access parent form data from this context
      const nonEmptyOrigins = origins.filter((o) => o.value.trim() !== '');
      if (nonEmptyOrigins.length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'At least one origin is required',
        });
      }
    }),
  producer: z.string().optional(),
  notes: z.string().optional(),
  buyUrls: z
    .array(
      z.object({
        value: z.url('Must be a valid URL').or(z.literal('')),
      })
    )
    .optional(),
  status: z.enum(Bean_Status).default(Bean_Status.Published),
});
