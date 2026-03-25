import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import IndividualProgress from "@/components/dashboard/individual_progress/individual_progress"

export default async function IndividualProgressPage() {

  const user = await getUser()

  if (!user) {
    redirect("/")
  }
  
  return (
    <div>
      <IndividualProgress />
    </div>
  );
}
