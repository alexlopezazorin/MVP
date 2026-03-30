"use server"

import { createSupabaseServer } from "@/lib/supabaseServer"

export async function createSession(userId: string) {
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      started_at: new Date().toISOString(),
      assistant_version: "v1"
    })
    .select("id")
    .single()

  return data.id
}