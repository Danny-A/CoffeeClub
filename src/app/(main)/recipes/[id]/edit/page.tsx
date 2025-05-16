import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { fetchRecipeById } from '@/lib/api/recipes/fetchRecipeById';
import { createClient } from '@/lib/supabase/server';
import { isAdmin, isModerator } from '@/utils/getUserRole';

import { EditRecipeForm } from '../../_components/EditRecipeForm';

type EditRecipePageProps = {
  params: Promise<{ id: string }>;
};

async function EditRecipeFormLoader({ id }: { id: string }) {
  const recipe = await fetchRecipeById(id);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!recipe) return notFound();

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

  if (user?.id !== recipe.user_id && !isUserAdmin && !isUserModerator) {
    return redirect('/profile/recipes');
  }

  return <EditRecipeForm recipe={recipe} />;
}

export default async function Page({ params }: EditRecipePageProps) {
  const { id } = await params;

  return (
    <Suspense>
      <EditRecipeFormLoader id={id} />
    </Suspense>
  );
}
