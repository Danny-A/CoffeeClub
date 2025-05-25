import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { createClient } from '@/lib/supabase/server';
import { isAdmin, isModerator } from '@/utils/getUserRole';

interface RecipeMetaActionsProps {
  slug: string;
  user_id: string;
  is_public: boolean;
}

export async function RecipeMetaActions({
  slug,
  user_id,
  is_public,
}: RecipeMetaActionsProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

  const isCreator = user?.id === user_id;
  if (!isCreator && !isUserAdmin && !isUserModerator) return null;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Text variant="label">Visibility</Text>
        <Text>{is_public ? 'Public' : 'Private'}</Text>
      </div>
      <Link href={`/recipes/${slug}/edit`}>
        <Button size="sm" variant="outline" className="w-full mt-2">
          Edit Recipe
        </Button>
      </Link>
    </div>
  );
}
