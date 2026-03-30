import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import SpeakingChat from "@/components/dashboard/speaking_chat/speaking_chat"

export default async function SpeakingPage() {

  const userData = await getUser()

  if (!userData) {
    redirect("/")
  }
  

  if (!userData.profile.student_level) {
    redirect("/dashboard")
  }


  return (
    <div>
      <SpeakingChat />
    </div>
  );
}
