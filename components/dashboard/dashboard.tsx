import Link from "next/link"
import { Button } from "@/components/ui/button"
import { setStudentLevel } from "@/features/users/action/setstudentlevel"

export default function Dashboard({ role, studentLevel }: { role: string, studentLevel: string | null }) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="wrapper">

        {!studentLevel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg flex flex-col gap-4 text-center">
              <h2 className="text-xl font-bold">Select your level</h2>

              <form action={setStudentLevel}>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button type="submit" name="level" value="A1" variant="primary">A1</Button>
                  <Button type="submit" name="level" value="A2" variant="primary">A2</Button>
                  <Button type="submit" name="level" value="B1" variant="primary">B1</Button>
                  <Button type="submit" name="level" value="B2" variant="primary">B2</Button>
                  <Button type="submit" name="level" value="C1" variant="primary">C1</Button>
                  <Button type="submit" name="level" value="C2" variant="primary">C2</Button>
                </div>
              </form>

            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
            Dashboard
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/dashboard/speaking_chat">
              <Button variant="primary">
                Go to Speaking Chat
              </Button>
            </Link>

            <Link href="/dashboard/individual_progress">
              <Button variant="primary">
                Go to Individual Progress
              </Button>
            </Link>

            {role === "teacher" && (
              <Link href="/dashboard/students_statistics">
                <Button variant="primary">
                  Go to Students Statistics
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
