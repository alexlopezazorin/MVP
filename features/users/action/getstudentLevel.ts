"use server"

import { createSupabaseServer } from "@/lib/supabaseServer"

export async function getStudentLevel() {
  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("student_level")
    .eq("id", user.id)
    .single()

  return profile?.student_level || null
}