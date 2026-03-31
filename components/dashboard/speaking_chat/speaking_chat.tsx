"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Mic } from "lucide-react"
import { useRouter } from "next/navigation"
import ChatMessage from "@/components/dashboard/speaking_chat/chat_message"
import ChatTyping from "@/components/dashboard/speaking_chat/chat_typing"
import { endSession } from "@/features/speaking_chat/actions/endSession"
import { updateLastSeen } from "@/features/speaking_chat/actions/updateLastSeen"
import type { ChatMessageType } from "./chat_types"
import { getStudentLevel } from "@/features/users/action/getstudentLevel"
import { getVapi } from "@/features/speaking_chat/actions/startVapi"

export default function SpeakingChat({ sessionId }: { sessionId: string }) {
  const router = useRouter()

  const [messages, setMessages] = useState<ChatMessageType[]>([ {sender: "ai", text: "Wait for the assistant to say something..."},{sender: "ai", text: "Then press the microphone to respond."} ])
  
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const chatRef = useRef<HTMLDivElement>(null)

  const handleBack = async () => {
    getVapi().stop()
    await endSession(sessionId)
    router.push("/dashboard")
  }

  const initializedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      updateLastSeen(sessionId)
    }, 15000)
    return () => clearInterval(interval)
  }, [sessionId])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const initVapi = async () => {
    const level = await getStudentLevel()
    const message = `The student's level is ${level} and the sessionId is ${sessionId}.`
    const vapi = getVapi()

    vapi.on("message", (msg: any) => {

      if (msg.type === "transcript" && msg.role === "user") {
        setMessages(prev => [...prev, { sender: "user", text: msg.transcript }])
        setIsTyping(true)
      }

      if (msg.type === "transcript" &&  msg.role === "assistant") {
        setMessages(prev => [...prev, { sender: "ai", text: msg.transcript }])
        setIsTyping(false)
      }
    })

    vapi.on("call-start", () => {
      vapi.send({
        type: "add-message",
        message: {
          role: "user",
          content: message
        }
      })
    })

    vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
    }

    initVapi()
  }, [sessionId])


  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleMicPress = () => {
    setIsListening((prev) => !prev)
  }

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="wrapper">

        <button onClick={handleBack} className="cursor-pointer">
          <ArrowLeft size={28} />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-0">
            <img src="/icons/gui.png" alt="Gui icon" className="w-10 h-10" />
            <span className="text-xl font-bold">Gui</span>
          </div>

          <div ref={chatRef} className="flex flex-col gap-4 bg-muted/20 rounded-xl p-4 w-full max-w-xl h-[65vh] overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} sender={msg.sender as "user" | "ai"} text={msg.text} />
            ))}

            {isTyping && <ChatTyping />}
          </div>
          
          <div className="w-full max-w-xl flex justify-center mt-6">
            <button onClick={handleMicPress} className={"cursor-pointer w-14 h-14 flex items-center justify-center rounded-full shadow-lg " + (isListening? "bg-red-500 text-white": "bg-primary text-primary-foreground")}>
              <Mic size={26} />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}