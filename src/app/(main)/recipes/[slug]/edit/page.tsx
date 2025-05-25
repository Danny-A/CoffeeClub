import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { fetchRecipeById } from '@/lib/api/fetchRecipeById';
import { createClient } from '@/lib/supabase/server';
import { isAdmin, isModerator } from '@/utils/getUserRole';
import { extractIdFromSlug } from '@/utils/slug';

import { EditRecipeForm } from '../../_components/EditRecipeForm';

type EditRecipePageProps = {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  return (
    <Suspense>
      <EditRecipeFormLoader id={id} />
    </Suspense>
  );
}
