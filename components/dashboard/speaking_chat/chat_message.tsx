"use client"

export default function ChatMessage({ sender, text }: { sender: "user" | "ai", text: string }) {
  return (
    <div
      className={
        sender === "user"
          ? "self-end bg-primary text-primary-foreground px-4 py-2 rounded-xl max-w-[80%]"
          : "self-start bg-muted px-4 py-2 rounded-xl max-w-[80%]"
      }
    >
      {text}
    </div>
  )
}