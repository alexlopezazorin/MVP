"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Mic, SendHorizontal } from "lucide-react"
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

  const [messages, setMessages] = useState<ChatMessageType[]>([ {sender: "ai", text: "Wait for the assistant to say something..."}])
  
  const [isTyping, setIsTyping] = useState(false)
  const [inputText, setInputText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const chatRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  const handleBack = async () => {
    getVapi().stop()
    await endSession(sessionId)
    router.push("/dashboard")
  }

  const handleMicPress = async () => {
    // Si NO estamos grabando → comenzar grabación
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      audioChunks.current = []

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data)
      }

      recorder.start()
      mediaRecorderRef.current = recorder

      setIsRecording(true)
      return
    }

    // Si YA estamos grabando → detener, transcribir, enviar
    mediaRecorderRef.current?.stop()

    mediaRecorderRef.current!.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" })

      const formData = new FormData()
      formData.append("audio", blob, "audio.webm")

      //Transcribir vía Whisper API
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      const text = data.text || ""

      if (!text.trim()) return

      //Añadir mensaje del usuario al chat
      setMessages(prev => [...prev, { sender: "user", text }])
      setIsTyping(true)

      //Enviar texto al agente de VAPI
      const vapi = getVapi()
      vapi.send({
        type: "add-message",
        message: { role: "user", content: text }
      })
    }
    setIsRecording(false)
  } 


  useEffect(() => {
    const interval = setInterval(() => {
      updateLastSeen(sessionId)
    }, 15000)
    return () => clearInterval(interval)
  }, [sessionId])


  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])


  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const initVapi = async () => {
    const level = await getStudentLevel()
    const message = `The student's level is ${level} and the sessionId is ${sessionId}.`
    const vapi = getVapi()


    vapi.on("message", (msg: any) => {
      if (msg.type === "transcript" &&  msg.role === "assistant") {
        setMessages(prev => [...prev, { sender: "ai", text: msg.transcript }])
        setIsTyping(false)
      }
    })

    vapi.on("call-start", () => {
      vapi.setMuted(true)
      vapi.send({type: "add-message", message: {role: "user", content: message}})
    })

    vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!)
    }

    initVapi()
  }, [sessionId])

  
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
          
          <div className="w-full max-w-xl flex items-center gap-3 mt-6">

            {isRecording ? (
              <div className="flex-1 flex items-center justify-center bg-red-100 text-red-600 rounded-xl py-3 border border-red-300">
                <div className="animate-pulse font-semibold">
                  Recording audio...
                </div>
              </div>
            ) : (
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message or press the microphone to speak"
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}

            {inputText.trim().length === 0 ? (
              <button
                onClick={handleMicPress}
                className={"cursor-pointer w-14 h-14 flex items-center justify-center rounded-full shadow-lg " + (isRecording? "bg-red-500 text-white": "bg-primary text-primary-foreground")}
              >
                <Mic size={26} />
              </button>
            ) : (
              <button
                onClick={() => {
                  const vapi = getVapi()
                  setMessages(prev => [...prev, { sender: "user", text: inputText }])
                  setIsTyping(true)
                  vapi.send({ type: "add-message", message: { role: "user", content: inputText }})
                  setInputText("")
                }}
                className="cursor-pointer w-14 h-14 flex items-center justify-center rounded-full shadow-lg bg-primary text-primary-foreground"
              >
                <SendHorizontal size={26} />
              </button>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}