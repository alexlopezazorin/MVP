"use client"

import { useState, useRef } from "react"

export default function SttTest() {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)

    recorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data)
    }

    recorder.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" })
      audioChunks.current = []

      const formData = new FormData()
      formData.append("audio", blob, "audio.webm")

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      console.log("📝 TRANSCRIPCIÓN:", data.text)
    }

    mediaRecorderRef.current = recorder
    recorder.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  return (
    <div className="p-6">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isRecording ? "Detener grabación" : "Comenzar grabación"}
      </button>
    </div>
  )
}