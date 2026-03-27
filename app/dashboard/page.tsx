import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/dashboard"

export default async function DashboardPage() {

  const userData = await getUser()

  if (!userData) {
    redirect("/")
  }
  
    return (
      <div>
        <Dashboard role={userData.profile.role} />
      </div>
    )
}
