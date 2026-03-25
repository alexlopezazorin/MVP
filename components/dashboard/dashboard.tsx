import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
            Dashboard
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/dashboard/speaking_coach">
              <Button variant="primary">
                Go to Speaking Coach
              </Button>
            </Link>

            <Link href="/dashboard/individual_progress">
              <Button variant="primary">
                Go to Individual Progress
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}