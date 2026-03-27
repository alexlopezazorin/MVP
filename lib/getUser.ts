import { createSupabaseServer } from "./supabaseServer"

export async function getUser() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  return null
}


  
  const {data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  return { user, profile }

}