import { supabase } from "./supabase";

export async function getAuthToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout failed:", error.message);
    return false;
  }
  return true;
}

