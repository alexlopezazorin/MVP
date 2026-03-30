"use server"

import { createSupabaseServer } from "@/lib/supabaseServer"

export async function endSession(sessionId: string) {
  const supabase = await createSupabaseServer()

  const endedAt = new Date()

  await supabase
    .from("sessions")
    .update({
      ended_at: endedAt.toISOString()
    })
    .eq("id", sessionId)
    
}