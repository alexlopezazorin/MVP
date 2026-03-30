"use client"

import { ArrowLeft } from "lucide-react";
import { endSession } from "@/features/speaking_chat/actions/endSession";
import { useRouter } from "next/navigation"

export default function SpeakingChat({ sessionId }: { sessionId: string }) {
  
  const router = useRouter()

  const handleBack = async () => {
    await endSession(sessionId)
    router.push("/dashboard")
  }

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="wrapper">

        <button onClick={handleBack}>
          <ArrowLeft size={28} />
        </button>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
            Speaking Chat - Session ID: {sessionId}
          </h1>

        </div>
      </div>
    </section>
  );
}