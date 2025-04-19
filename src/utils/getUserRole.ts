import { User } from "@supabase/auth-js";

import { createClient } from "@/lib/supabase/server";

export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error checking admin role:", error);
    return false;
  }

  return data?.some((role) => role.role === "admin") ?? false;
}

export async function isModerator(user: User | null): Promise<boolean> {
  if (!user) return false;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error checking moderator role:", error);
    return false;
  }

  return data?.some((role) => ["admin", "moderator"].includes(role.role)) ??
    false;
}

export async function isLocationOwner(user: User | null): Promise<boolean> {
  if (!user) return false;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error checking location owner role:", error);
    return false;
  }

  return data?.some((role) =>
    ["admin", "location_owner"].includes(role.role)
  ) ?? false;
}

export async function isRoasterOwner(user: User | null): Promise<boolean> {
  if (!user) return false;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error checking roaster owner role:", error);
    return false;
  }

  return data?.some((role) => ["admin", "roaster_owner"].includes(role.role)) ??
    false;
}
