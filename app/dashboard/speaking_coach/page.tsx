import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import SpeakingCoach from "@/components/dashboard/speaking_coach/speaking_coach"

export default async function SpeakingPage() {

  const user = await getUser()

  if (!user) {
    redirect("/")
  }
  
  return (
    <div>
      <SpeakingCoach />
    </div>
  );
}
