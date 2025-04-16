'use client';

import { HeartIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  useBeanLikes,
  useLocationLikes,
  useRoasterLikes,
} from '@/hooks/likes/useLikes';

type LikeButtonProps = {
  type: 'bean' | 'roaster' | 'location';
  id: string;
  isLiked: boolean;
  className?: string;
};

export function LikeButton({ type, id, isLiked, className }: LikeButtonProps) {
  const { likeBean, unlikeBean, isLiking, isUnliking } = useBeanLikes();
  const { likeRoaster, unlikeRoaster } = useRoasterLikes();
  const { likeLocation, unlikeLocation } = useLocationLikes();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    switch (type) {
      case 'bean':
        if (isLiked) {
          unlikeBean(id);
        } else {
          likeBean(id);
        }
        break;
      case 'roaster':
        if (isLiked) {
          unlikeRoaster(id);
        } else {
          likeRoaster(id);
        }
        break;
      case 'location':
        if (isLiked) {
          unlikeLocation(id);
        } else {
          likeLocation(id);
        }
        break;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isLiking || isUnliking}
      className={className}
    >
      {isLiked ? (
        <HeartIcon fill="red" className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
