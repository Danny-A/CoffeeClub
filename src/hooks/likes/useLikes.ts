import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/hooks/auth/useAuth';
import {
  likeBean,
  likeLocation,
  likeRecipe,
  likeRoaster,
  unlikeBean,
  unlikeLocation,
  unlikeRecipe,
  unlikeRoaster,
} from '@/lib/api/likes';

export function useBeanLikes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const likeBeanMutation = useMutation({
    mutationFn: async (beanId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return likeBean(beanId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['beans'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['bean', data.id] });
      }
    },
  });

  const unlikeBeanMutation = useMutation({
    mutationFn: async (beanId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return unlikeBean(beanId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['beans'] });
      queryClient.invalidateQueries({ queryKey: ['bean', data.id] });
    },
  });

  return {
    likeBean: likeBeanMutation.mutate,
    unlikeBean: unlikeBeanMutation.mutate,
    isLiking: likeBeanMutation.isPending,
    isUnliking: unlikeBeanMutation.isPending,
  };
}

export function useRoasterLikes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const likeRoasterMutation = useMutation({
    mutationFn: async (roasterId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return likeRoaster(roasterId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roasters'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['roaster', data.id] });
      }
    },
  });

  const unlikeRoasterMutation = useMutation({
    mutationFn: async (roasterId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return unlikeRoaster(roasterId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roasters'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['roaster', data.id] });
      }
    },
  });

  return {
    likeRoaster: likeRoasterMutation.mutate,
    unlikeRoaster: unlikeRoasterMutation.mutate,
    isLiking: likeRoasterMutation.isPending,
    isUnliking: unlikeRoasterMutation.isPending,
  };
}

export function useLocationLikes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const likeLocationMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return likeLocation(locationId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['location', data.id] });
      }
    },
  });

  const unlikeLocationMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return unlikeLocation(locationId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['location', data.id] });
    },
  });

  return {
    likeLocation: likeLocationMutation.mutate,
    unlikeLocation: unlikeLocationMutation.mutate,
    isLiking: likeLocationMutation.isPending,
    isUnliking: unlikeLocationMutation.isPending,
  };
}

export function useRecipeLikes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const likeRecipeMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return likeRecipe(recipeId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['recipe', data.id] });
      }
    },
  });

  const unlikeRecipeMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      return unlikeRecipe(recipeId, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe', data.id] });
    },
  });

  return {
    likeRecipe: likeRecipeMutation.mutate,
    unlikeRecipe: unlikeRecipeMutation.mutate,
    isLiking: likeRecipeMutation.isPending,
    isUnliking: unlikeRecipeMutation.isPending,
  };
}
