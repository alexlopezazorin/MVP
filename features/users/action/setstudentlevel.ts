"use server"

import { createSupabaseServer } from "@/lib/supabaseServer"
import { revalidatePath } from "next/cache"

export async function setStudentLevel(formData: FormData) {
  let level = formData.get("level") as string

  const supabase = await createSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } = await supabase
    .from("profiles")
    .update({ student_level: level })
    .eq("id", user.id)
    .select()
    
  revalidatePath("/dashboard")
}