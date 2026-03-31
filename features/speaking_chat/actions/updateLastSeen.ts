"use server"

import { createSupabaseServer } from "@/lib/supabaseServer"

export async function updateLastSeen(sessionId: string) {
  const supabase = await createSupabaseServer()

  await supabase
    .from("sessions")
    .update({
      last_seen: new Date().toISOString()
    })
    .eq("id", sessionId)
}