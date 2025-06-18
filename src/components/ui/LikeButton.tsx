'use client';

import { HeartIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  useBeanLikes,
  useLocationLikes,
  useRoasterLikes,
  useRecipeLikes,
} from '@/hooks/likes/useLikes';

type LikeButtonProps = {
  type: 'bean' | 'roaster' | 'location' | 'recipe';
  id: string;
  isLiked: boolean;
  className?: string;
};

export function LikeButton({ type, id, isLiked, className }: LikeButtonProps) {
  const {
    likeBean,
    unlikeBean,
    isLiking: isBeanLiking,
    isUnliking: isBeanUnliking,
  } = useBeanLikes();
  const {
    likeRoaster,
    unlikeRoaster,
    isLiking: isRoasterLiking,
    isUnliking: isRoasterUnliking,
  } = useRoasterLikes();
  const {
    likeLocation,
    unlikeLocation,
    isLiking: isLocationLiking,
    isUnliking: isLocationUnliking,
  } = useLocationLikes();
  const {
    likeRecipe,
    unlikeRecipe,
    isLiking: isRecipeLiking,
    isUnliking: isRecipeUnliking,
  } = useRecipeLikes();

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
      case 'recipe':
        if (isLiked) {
          unlikeRecipe(id);
        } else {
          likeRecipe(id);
        }
        break;
    }
  };

  // Get the appropriate loading states based on type
  const getLoadingStates = () => {
    switch (type) {
      case 'bean':
        return { isLiking: isBeanLiking, isUnliking: isBeanUnliking };
      case 'roaster':
        return { isLiking: isRoasterLiking, isUnliking: isRoasterUnliking };
      case 'location':
        return { isLiking: isLocationLiking, isUnliking: isLocationUnliking };
      case 'recipe':
        return { isLiking: isRecipeLiking, isUnliking: isRecipeUnliking };
      default:
        return { isLiking: false, isUnliking: false };
    }
  };

  const { isLiking, isUnliking } = getLoadingStates();

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
