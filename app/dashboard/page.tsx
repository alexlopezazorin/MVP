import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/dashboard"

export default async function DashboardPage() {

  const user = await getUser()

  if (!user) {
    redirect("/")
  }
  
    return (
      <div>
        <Dashboard />
      </div>
    )
}
