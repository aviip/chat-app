import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
};

type Props = {
  messages: Message[];
  currentUserId: string;
};

export function MessageList({ messages, currentUserId }: Props) {
  return (
    <ScrollArea className="h-[calc(100vh-140px)] px-4">
      <div className="space-y-3">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            senderName={msg.senderName}
            isOwnMessage={msg.senderId === currentUserId}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
