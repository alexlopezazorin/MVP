import { getUser } from "@/lib/getUser"
import { redirect } from "next/navigation"
import SpeakingChat from "@/components/dashboard/speaking_chat/speaking_chat"
import { createSupabaseServer } from "@/lib/supabaseServer"

export default async function Page(props: { params: Promise<{ sessionId: string }> }) {

    const { sessionId } = await props.params

    const userData = await getUser()
    
    const supabase = await createSupabaseServer()

    const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .single()

    if (!userData) {
    redirect("/")
    }

    if (!userData.profile.student_level) {
    redirect("/dashboard")
    }

    if (!session) {
    redirect("/dashboard")
    }

    if (session.user_id !== userData.user.id) {
    redirect("/dashboard")
    }

    if (session.ended_at !== null) {
    redirect("/dashboard")
    }

    return (
    <div>
        <SpeakingChat sessionId={sessionId} />
    </div>
    )
}