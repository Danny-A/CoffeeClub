'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Slider } from '@/components/ui/Slider';
import { Text } from '@/components/ui/Text';
import { TextArea } from '@/components/ui/TextArea';
import { useCreateBeanReview } from '@/hooks/reviews/useCreateBeanReview';
import {
  CreateReviewInput,
  createReviewSchema,
} from '@/lib/validations/review';

interface ReviewDialogProps {
  beanId: string;
  userId: string;
  beanName: string;
  trigger?: React.ReactNode;
}

export function ReviewDialog({
  beanId,
  userId,
  beanName,
  trigger,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const createReview = useCreateBeanReview();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 3,
      content: '',
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: CreateReviewInput) => {
    try {
      await createReview.mutateAsync({
        beanId,
        userId,
        input: data,
      });
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create review:', error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Write a Review
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Review {beanName}</DialogTitle>
          <DialogDescription>
            Share your thoughts about this coffee bean. Your rating and review
            will help other coffee enthusiasts.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Text variant="label">Rating *</Text>
              <div className="space-y-2">
                <Slider
                  value={[rating]}
                  onValueChange={([value]) => setValue('rating', value)}
                  max={5}
                  min={1}
                  step={0.25}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <Text variant="small" className="text-gray-600">
                    {rating.toFixed(2)} / 5
                  </Text>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {errors.rating && (
                <Text variant="error">{errors.rating.message}</Text>
              )}
            </div>

            <div className="space-y-2">
              <Text variant="label">Review (optional)</Text>
              <TextArea
                {...register('content')}
                placeholder="Share your experience with this coffee bean..."
                rows={4}
              />
              {errors.content && (
                <Text variant="error">{errors.content.message}</Text>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createReview.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createReview.isPending}>
              {createReview.isPending ? 'Submitting...' : 'Submit Review'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
