"use server"

import { createSupabaseServer } from "@/lib/supabaseServer"

export async function createSession(userId: string) {
  const supabase = await createSupabaseServer()

  const cutoff = new Date(Date.now() - 60000).toISOString()

  
  const { data: oldSessions } = await supabase
    .from("sessions")
    .select("id, last_seen")
    .eq("user_id", userId)
    .is("ended_at", null)
    .lt("last_seen", cutoff)

  if (oldSessions && oldSessions.length > 0) {
    for (const s of oldSessions) {
      await supabase
        .from("sessions")
        .update({
          ended_at: s.last_seen,
        })
        .eq("id", s.id)
    }
  }


  const { data, error } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      started_at: new Date().toISOString(),
      last_seen: new Date().toISOString(),
      assistant_version: "v1"
    })
    .select("id")
    .single()

  return data.id
}