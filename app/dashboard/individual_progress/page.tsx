import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import IndividualProgress from "@/components/dashboard/individual_progress/individual_progress"

export default async function IndividualProgressPage() {

  const userData = await getUser()

  if (!userData) {
    redirect("/")
  }

  if (!userData.profile.student_level) {
    redirect("/dashboard")
  }
  
  return (
    <div>
      <IndividualProgress />
    </div>
  );
}
