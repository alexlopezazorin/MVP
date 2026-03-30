import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import { createSession } from "@/features/speaking_chat/actions/createSession"

export default async function SpeakingChatEntryPage() {

  const userData = await getUser()

  if (!userData) {
    redirect("/")
  }

  if (!userData.profile.student_level) {
    redirect("/dashboard")
  }

  const sessionId = await createSession(userData.user.id)

  redirect(`/dashboard/speaking_chat/${sessionId}`)
}