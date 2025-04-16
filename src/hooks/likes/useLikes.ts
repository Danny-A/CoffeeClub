import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/auth/useAuth";
import {
  likeBean,
  likeLocation,
  likeRoaster,
  unlikeBean,
  unlikeLocation,
  unlikeRoaster,
} from "@/lib/api/likes";

export function useBeanLikes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const likeBeanMutation = useMutation({
    mutationFn: async (beanId: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      return likeBean(beanId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beans"] });
    },
  });

  const unlikeBeanMutation = useMutation({
    mutationFn: async (beanId: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      return unlikeBean(beanId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beans"] });
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
      if (!user?.id) throw new Error("User not authenticated");
      return likeRoaster(roasterId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roasters"] });
    },
  });

  const unlikeRoasterMutation = useMutation({
    mutationFn: async (roasterId: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      return unlikeRoaster(roasterId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roasters"] });
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
      if (!user?.id) throw new Error("User not authenticated");
      return likeLocation(locationId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  const unlikeLocationMutation = useMutation({
    mutationFn: async (locationId: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      return unlikeLocation(locationId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  return {
    likeLocation: likeLocationMutation.mutate,
    unlikeLocation: unlikeLocationMutation.mutate,
    isLiking: likeLocationMutation.isPending,
    isUnliking: unlikeLocationMutation.isPending,
  };
}
