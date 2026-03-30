import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpeakingChat() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="wrapper">

        <Link href="/dashboard">
          <ArrowLeft size={28} />
        </Link>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
            Speaking Chat
          </h1>

        </div>
      </div>
    </section>
  );
}