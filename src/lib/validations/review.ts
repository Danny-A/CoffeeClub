import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5).step(0.25),
  content: z.string().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
