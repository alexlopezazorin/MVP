import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import StudentsStatistics from "@/components/dashboard/students_statistics/students_statistics"

export default async function StudentsStatisticsPage() {

  const userData = await getUser()

  if (!userData) {
    redirect("/")
  }

  
  if (userData.role !== "teacher") {
    redirect("/dashboard")
  }

  
  return (
    <div>
      <StudentsStatistics />
    </div>
  );
}
