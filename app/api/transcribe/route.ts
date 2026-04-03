import { NextResponse } from "next/server"
import { writeFile, unlink } from "fs/promises"
import { spawn } from "child_process"
import path from "path"

export async function POST(req: Request) {
  const formData = await req.formData()
  const audio = formData.get("audio") as Blob

  const buffer = Buffer.from(await audio.arrayBuffer())
  const filePath = path.join(process.cwd(), "tmp_audio.webm")
  await writeFile(filePath, buffer)

  const python = spawn("python3", ["./whisper/transcribe.py", filePath])

  let transcription = ""

  python.stdout.on("data", (data) => {
    transcription += data.toString()
  })

  await new Promise((resolve) => python.on("close", resolve))
  await unlink(filePath)

  return NextResponse.json({ text: transcription })
}