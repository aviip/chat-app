"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useChats } from "@/hooks/useChats";
import { useMessages } from "@/hooks/useMessages";

const CURRENT_USER_ID = "user-1";

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  // const [messages, setMessages] = useState<any[]>([]);

  const user = auth.currentUser!;
  const { chats } = useChats(user?.uid);
  const messages = useMessages(activeChatId);

  const openChat = (chatId: string) => {
    setActiveChatId(chatId);
    // setMessages(MOCK_MESSAGES[chatId]);
  };

  const sendMessage = (text: string) => {
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: crypto.randomUUID(),
    //     text,
    //     senderId: CURRENT_USER_ID,
    //     senderName: "Me",
    //   },
    // ]);
  };

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}

      <div
        className={`border-r w-full md:w-72 ${
          activeChatId ? "hidden md:block" : "block"
        }`}
      >
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId ?? ""}
          onSelectChat={openChat}
        />
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 flex flex-col ${
          !activeChatId ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="p-3 border-b flex items-center gap-2">
          {/* Mobile back */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setActiveChatId(null)}
          >
            <ArrowLeft size={18} />
          </Button>

          <span className="font-semibold">
            {activeChat?.name || "Select a chat"}
          </span>
        </div>

        {/* Messages */}
        {activeChatId && (
          <>
            <MessageList messages={messages} currentUserId={CURRENT_USER_ID} />
            <ChatInput onSend={sendMessage} />
          </>
        )}
      </div>
    </div>
  );
}
