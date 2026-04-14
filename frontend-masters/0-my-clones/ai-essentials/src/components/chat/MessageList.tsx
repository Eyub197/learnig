import MessageBubble from "./MessageBubble";
import type { Message } from "./types";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const containerRer = useRef<HTMLDivElement>(null)
  const wasAtBottomeRer = useRef(true)

  const handleScroll = () => {
    const el = containerRer.current
    if (!el) return

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    wasAtBottomeRer.current = distanceFromBottom < 50
  }

  useEffect(() => {
    const el = containerRer.current
    if (!el) return

    if (wasAtBottomeRer.current) {
      el.scrollTop = el.scrollHeight
    }

  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="message-list empty">
        <p className="placeholder-text">
          Describe a diagram and the AI will create it for you.
        </p>
      </div>
    );
  }

  return (
    <div className="message-list" ref={containerRer} onScroll={handleScroll}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
