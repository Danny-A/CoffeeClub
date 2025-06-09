import { User as SupabaseUser } from '@supabase/auth-js';

import { User } from '@/lib/graphql/types';

export function transformUser(user: SupabaseUser | null): User | null {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email || '',
    username: user.user_metadata?.username || '',
    displayName: user.user_metadata?.name || user.email || '',
    avatarUrl: user.user_metadata?.avatar_url,
    createdAt: user.created_at,
    updatedAt: user.last_sign_in_at || user.created_at,
  };
}
